import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class Solution42 {
  public int trap(int[] height) {
    var topIdx = 0;
    for (var i = 0; i < height.length; i++) {
      if (height[i] > height[topIdx]) {
        topIdx = i;
      }
    }
    ExecutorService threadPool = Executors.newFixedThreadPool(2);
    final var finalTopIdx = topIdx;

    // threadPool.execute(/* Runnable */() -> { System.out.println("What can I
    // say?"); });

    Future<Integer> leftCap = threadPool.submit(/* Callable */() -> {
      var ret = 0;
      for (int i = 0; i < finalTopIdx;) {
        int from = i, to = i, vol = height[i];
        while (height[from] >= height[to] && to != finalTopIdx) {
          to++;
          vol += height[to];
        }
        // height[from] < height[to] || to == finalTopIdx
        ret += Math.max(0,
            height[from] * (to - from) + height[to] - vol);
        i = to;
      }
      return ret;
    });

    Future<Integer> rightCap = threadPool.submit(/* Callable */() -> {
      var ret = 0;
      for (int i = height.length - 1; i > finalTopIdx;) {
        int from = i, to = i, vol = height[i];
        while (height[from] >= height[to] && to != finalTopIdx) {
          to--;
          vol += height[to];
        }
        // height[from] < height[to] || to == finalTopIdx
        ret += Math.max(0, height[from] * (from - to) + height[to] - vol);
        i = to;
      }
      return ret;
    });

    int ans = 0;
    try {
      ans = leftCap.get() + rightCap.get();
    } catch (InterruptedException | ExecutionException ignored) {
    } finally {
      threadPool.shutdown();
    }
    return ans;
  }
}
