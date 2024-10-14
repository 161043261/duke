package com.bronya;

import java.util.ArrayList;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import org.junit.jupiter.api.Test;

public class ClosureTest {
  interface Lambda {
    int add(int x);
  }

  void useAdd(Lambda fn) {
    System.out.println(fn.add(1));
  }

  @Test
  void testClosure() {
    useAdd(x /* 形参 */ -> x + 10 /* 返回值 */);
  }

  @Test
  void testVirtualThreadPool() {
    var taskList = new ArrayList<Runnable>();
    for (int i = 0; i < 10; i++) {
      int k = i + 1;
      Runnable r =
          () -> {
            System.out.println("Executing task" + k);
          };
      taskList.add(r);
    }
    try (var virtualThread = Executors.newVirtualThreadPerTaskExecutor()) {
      var futureList = new ArrayList<Future<?>>();
      for (int i = 0; i < 10; i++) {
        futureList.add(virtualThread.submit(taskList.get(i)));
      }
      for (var future : futureList) {
        future.get();
      }
    } catch (ExecutionException | InterruptedException ignored) {
    }
  }
}
