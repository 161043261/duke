package com.bronya.concurrent;

import java.util.Arrays;
import org.junit.jupiter.api.Test;

public class ThreadGroupTest {
  @Test // ! mvn -Dtest=ThreadGroupTest#testThreadGroup1 test -q
  public void testThreadGroup1() {
    Thread t =
        new Thread(
            () -> {
              // Sub concurrent group name: main
              System.out.println(
                  "Sub concurrent group name: "
                      + Thread.currentThread().getThreadGroup().getName());
              // Sub concurrent name: Thread-1
              System.out.println("Sub concurrent name: " + Thread.currentThread().getName());
            });
    t.start();
    // Main concurrent group name: main
    System.out.println(
        "Main concurrent group name: " + Thread.currentThread().getThreadGroup().getName());
    // Main concurrent name: main
    System.out.println("Main concurrent name: " + Thread.currentThread().getName());
  }

  @Test // ! mvn -Dtest=ThreadGroupTest#testThreadGroup2 test -q
  public void testThreadGroup2() {
    ThreadGroup threadGroup = Thread.currentThread().getThreadGroup();
    Thread[] threadArr = new Thread[threadGroup.activeCount()];
    // 将线程组 threadGroup 的每个活动线程复制到指定的线程数组 threadArr
    threadGroup.enumerate(threadArr);
    System.out.println(Arrays.toString(threadArr));
  }

  @Test // ! mvn -Dtest=ThreadGroupTest#testThreadGroup3 test -q
  public void testThreadGroup3() {
    ThreadGroup threadGroup =
        new ThreadGroup("test") {
          @Override // 线程组的未捕获异常处理
          public void uncaughtException(Thread t, Throwable e) {
            System.out.println(t.getName() + ": " + e.getMessage());
          }
        };

    new Thread(
            threadGroup,
            () -> {
              throw new RuntimeException("An uncaught exception");
            })
        .start();
  }
}
