package com.bronya;

import java.util.List;

public class Stu {
  interface Lambda {
    boolean check(Stu stu);
  }

  private String name;
  private int age;

  public Stu() {}

  public Stu(String name) {
    this.name = name;
  }

  public Stu(String name, int age) {
    this.name = name;
    this.age = age;
  }

  public String getName() {
    return name;
  }

  public int getAge() {
    return age;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setAge(int age) {
    this.age = age;
  }

  @Override
  public String toString() {
    return "Stu{" + "name='" + name + '\'' + ", age=" + age + '}';
  }

  public static void main(String[] args) {
    List<Stu> stus =
        List.of(
            new Stu("miHoYo", 1),
            new Stu("HoYoverse", 2),
            new Stu("HoYoMix", 3),
            new Stu("HoYoLab", 4));

    // Functional Programming
    Lambda fn = stu -> stu.age == 1;
    Lambda fm = stu -> stu.name.startsWith("HoYo");

    System.out.println("Checking age");
    for (Stu stu : stus) {
      if (fn.check(stu)) {
        System.out.println(stu);
      }
    }

    System.out.println("Checking name");
    for (Stu stu : stus) {
      if (fm.check(stu)) {
        System.out.println(stu);
      }
    }
  }

  public String say(String msg) {
    return this.name + " says " + msg;
  }
}
