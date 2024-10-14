package com.bronya.concurrent;

import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicIntegerArray;
import java.util.concurrent.atomic.AtomicIntegerFieldUpdater;
import java.util.concurrent.atomic.AtomicReference;
import org.junit.jupiter.api.Test;

public class AtomicTest {
  private int initInt = 0;
  private AtomicInteger atomicInt = new AtomicInteger(initInt);

  @Test
  void testAtomicInteger() {
    // nonAtomicInt++ 不是原子操作，有并发安全问题
    System.out.println("Get and increment: atomicInt = " + atomicInt.getAndIncrement()); // 0
    System.out.println("Increment and get: atomicInt = " + atomicInt.incrementAndGet()); // 2
    System.out.println("Get: atomicInt = " + atomicInt.get()); // 2
  }

  private static int[] initArr = new int[] {1, 2, 3};
  private static AtomicIntegerArray atomicIntArr = new AtomicIntegerArray(initArr);

  @Test
  void testAtomicIntegerArray() {
    // Get: atomicIntArr[1] = 2
    System.out.println("Get: atomicIntArr[1] = " + atomicIntArr.getAndAdd(1, 5));
    // initArr[1] = 2, atomicIntArr.get(1) = 7
    System.out.println(
        "initArr[1] = " + initArr[1] + ", atomicIntArr.get(1) = " + atomicIntArr.get(1));
  }

  static class User {
    public String name;
    public volatile int age;

    public User(String name, int age) {
      this.name = name;
      this.age = age;
    }

    @Override
    public String toString() {
      return "User{" + "name='" + name + '\'' + ", age=" + age + '}';
    }
  }

  private static AtomicReference<User> userAtomicRef = new AtomicReference<User>();

  @Test
  void testAtomicReference() {
    User user1 = new User("ys", 4);
    userAtomicRef.set(user1);
    User user2 = new User("hsr", 2);
    // User = User{name='ys', age=4}
    // New user = User{name='hsr', age=2}
    System.out.println("User = " + userAtomicRef.getAndSet(user2));
    System.out.println("New user = " + userAtomicRef.get());
  }

  // 创建一个原子更新器，指定更新的类、字段（volatile 修饰）
  private static final AtomicIntegerFieldUpdater<User> atomicIntFieldUpdater =
      AtomicIntegerFieldUpdater.newUpdater(User.class, "age" /* volatile 修饰 */);

  @Test
  void testAtomicIntegerFieldUpdater() {
    User user = new User("br3", 1);
    // user.age = 1
    System.out.println("user.age = " + atomicIntFieldUpdater.getAndAdd(user, 5));
    // New user.age = 6
    System.out.println("New user.age = " + atomicIntFieldUpdater.get(user));
  }
}
