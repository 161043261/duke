package com.bronya.concurrent;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.concurrent.*;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

@Slf4j
public class SomeTest {

  // 类似于 waitGroup.Add(10)
  // 等待 10 个子线程运行结束，主线程继续运行
  static CountDownLatch waitGroup = new CountDownLatch(10); // 计数器 =10

  @Test // mvn test -Dtest=SomeTest#testSemaphore -q
  void testSemaphore() {
    record TaskThread(Semaphore semaphore) implements Runnable {

      @Override
      public void run() {
        try {
          semaphore.acquire(); // 申请（获取） permit，申请失败时，线程入队阻塞
          Thread.sleep(3000);
          // ! semaphore.acquire(n); // 可以申请（获取）多个 permit
          System.out.printf(
              "Thread name: %s, available permits: %d, queue length: %d\n",
              Thread.currentThread().getName(),
              this.semaphore.availablePermits(),
              this.semaphore.getQueueLength());
        } catch (InterruptedException ignored) {
        } finally {

          // 类似于 waitGroup.Done()
          waitGroup.countDown(); // 计数器 -1

          semaphore.release(); // 释放一个 permit
          // ! semaphore.release(n); // 可以释放多个 permit
        }
      }
    } // record

    // ! Semaphore 限制线程数
    Semaphore semaphore = new Semaphore(3 /* 允许的线程数 permit = 3 */, false /* fair 是否公平，默认非公平 */);
    for (int i = 0; i < 10; i++) {
      new Thread(new TaskThread(semaphore), "sub-" + i).start();
    }
    // 获取当前等待的线程数
    System.out.printf("Wait for %d threads\n", waitGroup.getCount());
    try {
      // 类似于 waitGroup.Wait()
      waitGroup.await(/* long timeout, TimeUnit unit */ ); // 计数器 =0 时，主线程继续运行
    } catch (InterruptedException ignored) {
    }
    System.out.println("Done!");
  }

  @Test // mvn test -Dtest=SomeTest#testExchanger -q
  void testExchanger() {
    Exchanger<String> exchanger = new Exchanger<>();
    var t1 =
        new Thread(
            () -> {
              try {
                System.out.println(
                    "Thread name: "
                        + Thread.currentThread().getName()
                        + ", receives data: "
                        + exchanger.exchange("[&] Data from thread-1"));
              } catch (InterruptedException ignored) {
              }
            },
            "thread-1");
    t1.start();

    // 主线程睡眠 3s
    try {
      Thread.sleep(3000);
    } catch (InterruptedException ignored) {
    }

    var t2 =
        new Thread(
            () -> {
              try {
                System.out.println(
                    "Thread name: "
                        + Thread.currentThread().getName()
                        + ", receives data: "
                        + exchanger.exchange("[=] Data from thread-2"));
              } catch (InterruptedException ignored) {
              }
            },
            "thread-2");

    t2.start();
    try {
      t1.join();
      t2.join();
    } catch (InterruptedException ignored) {
    }
  }

  @Test // mvn test -Dtest=SomeTest#testCountDownLatch -q
  void testCountDownLatch() {
    String osName = System.getProperty("os.name");

    // switch (osName) {
    //   case "Linux":
    //     mvn = "/usr/share/maven/bin/mvn";
    //     break;
    //   case "Mac OS X":
    //     mvn = "/Applications/IntelliJ IDEA.app/Contents/plugins/maven/lib/maven3/bin/mvn";
    //     break;
    //   default:
    //     mvn = "C:/Users/admin/AppData/Local/Programs"
    //         + "/IntelliJ IDEA Ultimate/plugins/maven/lib/maven3/bin/mvn.cmd";
    //     break;
    // }

    String mvn =
        switch (osName) {
          case "Linux" -> "/usr/share/maven/bin/mvn"; // 无需 return，自动 break
          case "Mac OS X" ->
              "/Applications/IntelliJ IDEA.app/Contents/plugins/maven/lib/maven3/bin/mvn";
          // Windows 11
          default ->
              "C:/Users/admin/AppData/Local/Programs"
                  + "/IntelliJ IDEA Ultimate/plugins/maven/lib/maven3/bin/mvn.cmd";
        };

    String[] cmd = {mvn, "test", "-Dtest=SomeTest#testSemaphore", "-q"};
    try {
      Process process = Runtime.getRuntime().exec(cmd);
      BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
      String newLine;
      while ((newLine = reader.readLine()) != null) {
        System.out.println(newLine);
      }
      process.waitFor();
      int exitValue = process.exitValue();
      System.out.println("Exit value: " + exitValue);
    } catch (IOException | InterruptedException e) {
      log.error(e.getMessage());
    }
  }

  @Test // mvn test -Dtest=SomeTest#testCyclicBarrier -q
  void testCyclicBarrier() {
    // 类似于 waitGroup.Add(10)
    CyclicBarrier cyclicBarrier =
        new CyclicBarrier(
            10,
            () -> { // 调用 cyclicBarrier.await(); 10 次后，执行该任务
              System.out.printf(
                  "Thread name: %s starts cyclicBarrier\n", Thread.currentThread().getName());
            });
    for (int i = 0; i < 10; i++) {
      new Thread(
              () -> {
                try {
                  Thread.sleep(3000); // 子线程睡眠 3s
                  System.out.println("Thread name: " + Thread.currentThread().getName());
                  cyclicBarrier.await(); // 类似于 waitGroup.Done()
                } catch (InterruptedException | BrokenBarrierException ignored) {
                }
              },
              "sub-" + i)
          .start();
    }
    try {
      Thread.sleep(5000); // 主线程睡眠 5s
      System.out.println("Main thread: All sub-threads completed");
    } catch (InterruptedException ignored) {
    }
  }

  @Test // mvn test -Dtest=SomeTest#testPhaser -q
  void testPhaser() {
    record TaskThread(String task, Phaser phaser) implements Runnable {

      @Override
      public void run() {
        for (int phase = 0; phase < 4; phase++) {
          if (phase > 0 && "Loading tutorial".equals(task)) {
            log.warn("[phase-{}] Skip {}", phase, task.toLowerCase());
            continue;
          }
          try {
            Thread.sleep(1000);
          } catch (InterruptedException ignored) {
          }
          log.info("[phase-{}] {}", phase, task);
          if (phase == 0 && "Loading tutorial".equals(task)) {
            log.warn("[phase-0] Will skip loading tutorial");
            phaser.arriveAndDeregister(); // 参与者 party 到达 arrive 并取消注册
          } else {
            phaser.arrive(); // 参与者 party 到达 arrive
            // phaser.arriveAndAwaitAdvance();
          }
        }
      }
    } // record

    // 创建一个 Phaser 对象
    Phaser phaser = new Phaser(4) { // 4 个未到达 unarrived 的参与者 party
          // 当参与者 party 全部到达 arrive 时，自动调用 onAdvance 方法
          // 若 onAdvance 方法返回 true，则 phaser 终止
          // 若 onAdvance 方法返回 false，则 phaser 进入下一个阶段
          @Override
          protected boolean onAdvance(int phase, int registeredParties) {
            log.info("[phase-{}] Loading tasks completed", phase);
            return phase == 3 || registeredParties == 0;
          }
        };

    new Thread(new TaskThread("Loading map", phaser)).start();
    new Thread(new TaskThread("Loading character", phaser)).start();
    new Thread(new TaskThread("Loading music", phaser)).start();
    new Thread(new TaskThread("Loading tutorial", phaser)).start();

    try {
      Thread.sleep(5000); // 主线程睡眠 5s
      log.info("[main] Done!");
    } catch (InterruptedException ignored) {
    }
  }
}
