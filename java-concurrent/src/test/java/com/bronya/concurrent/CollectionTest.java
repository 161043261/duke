package com.bronya.concurrent;

import java.util.concurrent.*;
import org.junit.jupiter.api.Test;

/** ConcurrentHashMap ConcurrentLinkedQueue LinkedBlockingQueue */
public class CollectionTest {

  private final ConcurrentHashMap<String, Integer> concurrentHashMap = new ConcurrentHashMap<>();

  @Test
  public void testConcurrentHashMap() {
    interface Compute {
      void computeDo(String name);
    }

    interface Counter {
      int counterDo(String name);
    }

    Compute compute =
        (String name) -> this.concurrentHashMap.compute(name, (k, v) -> v == null ? 1 : v + 1);
    Counter counter = (String name) -> this.concurrentHashMap.getOrDefault(name, 0);

    var t1 = new Thread(() -> compute.computeDo("Meow")); // t1 子线程
    var t2 = new Thread(() -> compute.computeDo("Meow")); // t2 子线程
    t1.start();
    t2.start();
    compute.computeDo("Meow"); // 主线程
    try {
      t1.join();
      t2.join();
    } catch (InterruptedException ignored) {
    }
    System.out.println("Meow compute counter: " + counter.counterDo("Meow")); // 3
  }

  @Test
  void testConcurrentLinkedQueue() {
    var concurrentLinkedQueue = new ConcurrentLinkedQueue<>();
    Thread t1 =
        new Thread(
            () -> {
              concurrentLinkedQueue.offer(1);
              concurrentLinkedQueue.offer(3);
              concurrentLinkedQueue.poll();
            });

    Thread t2 =
        new Thread(
            () -> {
              concurrentLinkedQueue.offer(2);
              concurrentLinkedQueue.offer(4);
              concurrentLinkedQueue.poll();
            });
    t1.start();
    t2.start();
    try {
      t1.join();
      t2.join();
    } catch (InterruptedException ignored) {
    }
    System.out.println("Queue is empty: " + concurrentLinkedQueue.isEmpty()); // false
    System.out.println("Queue size: " + concurrentLinkedQueue.size()); // 2
  }

  private static ArrayBlockingQueue<Integer> arrayBlockingQueue =
      new ArrayBlockingQueue<>(10 /* capacity */, true /* fair */);

  @Test
  void testArrayBlockingQueue() {
    Thread producer =
        new Thread(
            () -> {
              for (int i = 0; i < 100; i++) {
                try {
                  arrayBlockingQueue.put(i);
                  System.out.println("Producer puts " + i);
                } catch (InterruptedException ignored) {
                }
              }
            },
            "Producer");

    Thread consumer =
        new Thread(
            () -> {
              for (int i = 0; i < 100; i++) {
                try {
                  Integer data = arrayBlockingQueue.take();
                  System.out.println("Consumer takes " + data);
                } catch (InterruptedException ignored) {
                }
              }
            },
            "Consumer");

    producer.start();
    consumer.start();
    try {
      producer.join();
      consumer.join();
    } catch (InterruptedException ignored) {
    }
  }

  private static LinkedBlockingQueue<Integer> linkedBlockingQueue = new LinkedBlockingQueue<>(10);

  @Test
  void testLinkedBlockingQueue() {
    Thread producer =
        new Thread(
            () -> {
              for (int i = 0; i < 100; i++) {
                try {
                  linkedBlockingQueue.put(i);
                  System.out.println("Producer puts " + i);
                } catch (InterruptedException ignored) {
                }
              }
            },
            "Producer");
    Thread consumer =
        new Thread(
            () -> {
              for (int i = 0; i < 100; i++) {
                try {
                  Integer data = linkedBlockingQueue.take();
                  System.out.println("Consumer takes " + data);
                } catch (InterruptedException ignored) {
                }
              }
            },
            "Consumer");
    producer.start();
    consumer.start();
    try {
      producer.join();
      consumer.join();
    } catch (InterruptedException ignored) {
    }
  }

  @Test
  void testCopyOnWriteArrayList() {
    CopyOnWriteArrayList<String> copyOnWriteArrayList = new CopyOnWriteArrayList<>();
    copyOnWriteArrayList.add("bh3");
    copyOnWriteArrayList.add("ys");
    copyOnWriteArrayList.add("hsr");
    for (String elem : copyOnWriteArrayList) {
      System.out.println(elem);
    }
  }

  record User(String name, int age) {}

  private static ThreadLocal<User> threadLocal = ThreadLocal.withInitial(() -> null);

  @Test
  void testThreadLocal() {
    interface Login {
      void loginDo(User user);
    }
    Login login = (User user) -> threadLocal.set(user);

    interface GetUser {
      User getUserDo();
    }
    GetUser getUser = () -> threadLocal.get();

    login.loginDo(new User("ys", 1));
    System.out.println(
        "Thread: " + Thread.currentThread().getName() + ", Login: " + getUser.getUserDo());
    Thread t =
        new Thread(
            () -> {
              login.loginDo(new User("hsr", 2));
              System.out.println(
                  "Thread: "
                      + Thread.currentThread().getName()
                      + ", Login: "
                      + getUser.getUserDo());
            },
            "sub-thread");
    t.start();
    try {
      t.join();
    } catch (InterruptedException ignored) {
    }
  }
}
