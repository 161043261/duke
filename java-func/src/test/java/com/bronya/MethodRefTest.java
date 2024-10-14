package com.bronya;

import java.util.stream.Stream;
import org.junit.jupiter.api.Test;

public class MethodRefTest {

  /**
   *
   *
   * <h1>类名::静态方法名</h1>
   */
  static boolean isOdd(Stu stu) {
    return stu.getAge() % 2 == 1;
  }

  // ! mvn test -Dtest=MethodRefTest#testClassToStaticMethod
  @Test
  void testClassToStaticMethod() {
    Stream.of(
            new Stu("miHoYo", 1),
            new Stu("HoYoverse", 2),
            new Stu("HoYoMix", 3),
            new Stu("HoYoLab", 4))
        .filter(MethodRefTest::isOdd) // 类名::静态方法名
        .forEach(stu -> System.out.println(stu));
  }

  /**
   *
   *
   * <h1>类名::实例方法名</h1>
   */
  interface Lambda {
    String transfer(Stu stu, String msg);
  }

  static void startStuSay(Lambda fn) {
    System.out.println(
        fn.transfer(
            new Stu("Susan", 1), // instance 提供一个实例
            "David Tao")); // argument
  }

  // ! mvn test -Dtest=MethodRefTest#testClassToInstanceMethod1
  @Test
  void testClassToInstanceMethod1() {
    startStuSay(Stu::say /* pass and assign to fn */); // 类名::实例方法名
  }

  // ! mvn test -Dtest=MethodRefTest#testClassToInstanceMethod2
  @Test
  void testClassToInstanceMethod2() {
    // ! 定义 Staff 记录类（不可修改的数据类）
    // ! 属性：name, version
    // ! 方法：staff.startWithHoYo();
    // ! 自动生成的构造方法
    // ! 自动生成的 getter: staff.name(); staff.version();
    // ! 自动生成的 staff.equals(); staff.hashCode(); staff.toString();
    record Staff(String name, int version) {
      boolean startWithHoYo() {
        return this.name.startsWith("HoYo");
      }
    }

    Stream.of(
            new Staff("miHoYo", 1),
            new Staff("HoYoverse", 2),
            new Staff("HoYoMix", 3),
            new Staff("HoYoLab", 4))
        .map(Staff::startWithHoYo) // 类名::实例方法名
        .forEach(staff -> System.out.println(staff));
  }

  /**
   *
   *
   * <h1>对象::实例方法名</h1>
   */
  // ! mvn test -Dtest=MethodRefTest#testObjectToStaticMethod
  @Test
  void testObjectToInstanceMethod() {
    // ! 声明一个 Staff 记录类型
    // ! 属性：name, version
    // ! 方法：staff.startWithHoYo();
    // ! 自动生成的 getter: staff.name(); staff.version();
    record Staff(String name, int version) {}

    class Util {
      boolean isOdd(Staff staff) {
        return staff.version % 2 == 1;
      }

      String getName(Staff staff) {
        return staff.name;
      }
    }

    var util = new Util();

    Stream.of(
            new Staff("miHoYo", 1),
            new Staff("HoYoverse", 2),
            new Staff("HoYoMix", 3),
            new Staff("HoYoLab", 4))
        .filter(util::isOdd) // 对象::实例方法名
        .map(util::getName) // 对象::实例方法名
        // .forEach(staff -> System.out.println(staff));
        .forEach(System.out::println); // 对象::实例方法名 省略 对象::
  }

  /**
   *
   *
   * <h1>类名::New（构造方法）</h1>
   */
  // ! mvn test -Dtest=MethodRefTest#testClassToNew

  interface Lambda1 {
    Stu create();
  }

  interface Lambda2 {
    Stu create(String name);
  }

  interface Lambda3 {
    Stu create(String name, int age);
  }

  static void createStu(Lambda1 fn) {
    System.out.println(fn.create());
  }

  static void createStu(Lambda2 fn) {
    System.out.println(fn.create("miHoYo"));
  }

  static void createStu(Lambda3 fn) {
    System.out.println(fn.create("miHoYo", 1));
  }

  // ! mvn test -Dtest=MethodRefTest#testClassToNew
  @Test
  void testClassToNew() {
    createStu((Lambda1) Stu::new); // 类名::New（构造方法）
    createStu((Lambda2) Stu::new); // 类名::New（构造方法）
    createStu((Lambda3) Stu::new); // 类名::New（构造方法）
  }

  /**
   *
   *
   * <h1>this::实例方法名</h1>
   */
  // ! mvn test -Dtest=MethodRefTest#testThisToInstanceMethod
  @Test
  void testThisToInstanceMethod() {
    // 记录类
    record Staff(String name, int version) {}

    // 内部类
    class Util {
      boolean startWithHoYo(Staff staff) {
        return staff.version % 2 == 1;
      }

      void printStream(Stream<Staff> staffStream) {
        staffStream.filter(this::startWithHoYo).forEach(System.out::println);
      }
    }
    var util = new Util();
    util.printStream(
        Stream.of(
            new Staff("miHoYo", 1),
            new Staff("HoYoverse", 2),
            new Staff("HoYoMix", 3),
            new Staff("HoYoLab", 4)));
  }

  /**
   *
   *
   * <h1>super::实例方法名</h1>
   */
  // ! mvn test -Dtest=MethodRefTest#testSuperToInstanceMethod
  @Test
  void testSuperToInstanceMethod() {
    // 记录类
    record Staff(String name, int version) {}

    // 内部类
    class Util {
      boolean startWithHoYo(Staff staff) {
        return staff.version % 2 == 1;
      }

      void printStream(Stream<Staff> staffStream) {
        staffStream.filter(this::startWithHoYo).forEach(System.out::println);
      }
    }

    class UtilExt extends Util {
      void printStream(Stream<Staff> staffStream) {
        staffStream.filter(super::startWithHoYo).forEach(System.out::println);
      }
    }
    var util = new UtilExt();
    util.printStream(
        Stream.of(
            new Staff("miHoYo", 1),
            new Staff("HoYoverse", 2),
            new Staff("HoYoMix", 3),
            new Staff("HoYoLab", 4)));
  }

  /**
   *
   *
   * <h1>特例</h1>
   */
  // ! mvn test -Dtest=MethodRefTest#testException
  @Test
  void testException() {
    class ExceptionTest {
      static void print1() {
        System.out.println("Task1 running");
      }

      static void print2() {
        System.out.println("Task2 running");
      }
    }
    Runnable task1 = ExceptionTest::print1;
    Runnable task2 = ExceptionTest::print2;
    var t1 = new Thread(task1);
    var t2 = new Thread(task2);
    t1.start();
    t2.start();
    try {
      t1.join();
      t2.join();
    } catch (InterruptedException ignored) {
    }
  }
}
