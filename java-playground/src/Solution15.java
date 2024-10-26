import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution15 {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        var ans = new ArrayList<List<Integer>>();
        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) {
                continue;
            }
            for (int j = i + 1, k = nums.length - 1; j < k;) {
                int sum = nums[i] + nums[j] + nums[k];
                if (sum == 0) {
                    ans.add(List.of(nums[i], nums[j], nums[k]));
                    do {
                        j++;
                    } while (j < k
                            && nums[j] == nums[j - 1]);
                    do {
                        k--;
                    } while (k > j
                            && nums[k] == nums[k + 1]);
                } else if (sum < 0) {
                    do {
                        j++;
                    } while (j < k
                            && nums[j] == nums[j - 1]);
                } else {
                    do {
                        k--;
                    } while (k > j
                            && nums[k] == nums[k + 1]);
                }
            }
        }
        return (List<List<Integer>>) ans;
    }

    public static void main(String[] args) {
        var ans = new Solution15().threeSum(new int[] { -1, 0, 1, 2, -1, -4 });
        System.out.println(ans);
    }
}