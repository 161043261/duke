package com.bronya;

import java.lang.reflect.Constructor;
import java.lang.reflect.Method;

public class OptionalTest {
  public static void main(String[] args) throws Exception {
    Class<?> clazz = Class.forName("com.bronya.JSONFieldTest$JSONObj");
    Method method = clazz.getMethod("toString");
    Constructor<?> constructor = clazz.getConstructor(String.class, String.class);
    Object obj = constructor.newInstance("cafe", "baby");
    System.out.println((String) method.invoke(obj));
    // class com.bronya.JSONObj
    System.out.println(Class.forName("com.bronya.JSONObj"));
  }
}
