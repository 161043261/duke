package main

func minFlips(grid [][]int) int {
  rans, cans := 0, 0
  for _, g := range grid {
    for l, r := 0, len(g)-1; l < r; l, r = l+1, r-1 {
      if g[l] != g[r] {
        rans++
      }
    }
  }

  for c := 0; c < len(grid[0]); c++ {
    for u, d := 0, len(grid)-1; u < d; u, d = u+1, d-1 {
      if grid[u][c] != grid[d][c] {
        cans++
      }
    }
  }

  return min(rans, cans)
}
