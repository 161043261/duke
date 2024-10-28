let total: number;
const parentIdx: number[] = []
const sizes: number[] = []

function findRedundantConnection(edges: number[][]): number[] {
  total = edges.length
  for (let i = 0; i < total; i++) {
    parentIdx[i] = i
    sizes[i] = 1;
  }
};

function union(x: number, y: number) {
  let xroot = find(x)
  let yroot = find(y)
  parentIdx[xroot] = yroot
}

function betterUion(x: number, y: number) {
  let xroot = find(x)
  let yroot = find(y)
  if (sizes[xroot] < sizes[yroot]) {
    [xroot, yroot] = [yroot, xroot]
  }
  // sizes[xroot] >= sizes[yroot]
  parentIdx[yroot] = xroot
}

function find(x: number): number {
  if (parentIdx[x] == x) {
    return x;
  }
  return find(parentIdx[x])
}

function findWithCompress(x: number): number | undefined {
  if (parentIdx[x] == x) {
    return x
  }
  parentIdx[x] = findWithCompress(parentIdx[x])!
}
