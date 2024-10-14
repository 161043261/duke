package com.bronya.concurrent;

import org.junit.jupiter.api.Test;

public class ThreadPriorityTest {

  @Test // mvn -Dtest=ThreadPriorityTest#test1 test -q
  public void test1() {
    Thread a = new Thread();
    System.out.println("Normal concurrent priority: " + a.getPriority()); // 5
    Thread b = new Thread();
    // MIN_PRIORITY = 1; NORM_PRIORITY = 5; MAX_PRIORITY = 10;
    b.setPriority(Thread.MAX_PRIORITY);
    System.out.println("Max concurrent priority: " + b.getPriority()); // 10
  }

  @Test // mvn -Dtest=ThreadPriorityTest#test2 test -q
  public void test2() {
    // 创建 10 个线程，优先级 1 ~ 10
    for (int i = 1; i < 10; i++) {
      Thread thread = new PriorityThread();
      thread.setName("concurrent-" + i);
      thread.setPriority(i); // 线程优先级越高，被调度（获得 cpu 时间片）的概率越高
      thread.start();
      // 优先级较高的线程，不一定先被调度（取决于操作系统的线程调度算法）
      // 守护线程 Daemon Thread 的优先级较低，所有非守护线程终止时，守护线程自动终止
    }
  }

  @Test // mvn -Dtest=ThreadPriorityTest#test3 test -q
  public void test3() {
    // 创建线程组 threadGroup
    var group = new ThreadGroup("group");
    // 设置线程组的最大优先级为 7
    group.setMaxPriority(7);
    // 创建线程 concurrent，加入线程组 threadGroup
    Thread member = new Thread(group, "member");
    // 设置线程的最大优先级为 10（无效）
    // ! 线程成员的优先级 <= 线程组的优先级
    member.setPriority(10 /* Thread.MAX_PRIORITY */);
    System.out.println("Group priority: " + member.getPriority()); // 7
    System.out.println("Member priority: " + member.getPriority()); // 7
  }
}

class PriorityThread extends Thread {
  @Override
  public void run() {
    // Thread.currentThread().getName(); 等价于 this.getName(); 等价于 getName();
    System.out.println(
        "Thread name: "
            + Thread.currentThread().getName()
            + ", priority: "
            + Thread.currentThread().getPriority());
  }
}
