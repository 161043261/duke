import java.util.ArrayList;
import java.util.Arrays;

class Solution {

  public int countGoodNodes(int[][] edges) {
    int n = edges.length + 1;
    // g: idx parent/child
    ArrayList<Integer>[] g = new ArrayList[n];

    // Arrays.fill() 后, g 的元素是相同的 ArrayList
    // Arrays.fill(g, new ArrayList<Integer>());

    Arrays.setAll(g, idx -> new ArrayList<>());
    for (var edge : edges) {
      int x = edge[0];
      int y = edge[1];
      g[x].add(y);
      g[y].add(x);
    }

    // System.out.println(Arrays.deepToString(g));

    dfs(0, -1, g);
    return ans;
  }

  private int ans;

  private int dfs(int x/* son */, int fa/* father */, ArrayList<Integer>[] g) {
    int size = 1; //
    int sz0 = 0;
    boolean ok = true;
    for (int y : g[x]) {
      if (y == fa) {
        continue;
      }
      int sz = dfs(y, x, g);
      if (sz0 == 0) {
        sz0 = sz;
      } else if (sz != sz0) {
        ok = false;
      }
      size += sz;
    }
    ans += ok ? 1 : 0;
    return size;
  }

  public static void main(String[] args) {
    var edges = new int[][]{{0, 1}, {0, 2}, {1, 3}, {1, 4}, {2, 5}, {2, 6}};
    System.out.println(new Solution().countGoodNodes(edges));
  }
}
