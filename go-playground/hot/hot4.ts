function moveZeroes(nums: number[]): void {
    let l = 0, j = 0
    while (j < nums.length) {
        if (nums[j] == 0) {
            j++
            continue
        }
        // nums[j] != 0
        [nums[l], nums[j]] = [nums[j], nums[l]]
        l++
        j++
    }
}
