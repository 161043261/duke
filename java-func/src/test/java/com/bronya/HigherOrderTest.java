package com.bronya;

import org.junit.jupiter.api.Test;

// 高阶函数 Higher-order Functions
public class HigherOrderTest {
  interface Step1 {
    Step2 exec(int a);
  }

  interface Step2 {
    int exec(int b);
  }

  static void higherOrder(Step1 step1) {
    // return (b -> 10 + b)
    Step2 step2 = step1.exec(10 /* a = 10 */);
    System.out.println(step2.exec(20 /* b = 20 */)); // 30
    System.out.println(step2.exec(40 /* b = 40 */)); // 50
  }

  @Test
  void testHigherOrder() {
    higherOrder(a -> (b -> a + b));
  }
}
