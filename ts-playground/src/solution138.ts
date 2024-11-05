class _Node {
  val: number;
  next: _Node | null;
  random: _Node | null;

  constructor(val?: number, next?: _Node, random?: _Node) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
    this.random = random === undefined ? null : random;
  }
}

export {};

function copyRandomList(first: _Node | null): _Node | null {
  if (first == null) {
    return null;
  }

  const ori2cp: Map<_Node, _Node> = new Map();

  // 头节点
  let [head, cpHead] = [new _Node(undefined, first, undefined), new _Node()];

  let pre: _Node = head;
  let cur: _Node | null = first;
  let cppre: _Node = cpHead;
  let cpcur: _Node | null;

  while (cur != null) {
    cpcur = new _Node(cur.val, undefined, undefined);
    cppre.next = cpcur;

    ori2cp.set(cur, cpcur);

    // cur.random != null
    if (ori2cp.has(cur.random!)) {
      cpcur.random = ori2cp.get(cur.random!)!;
    }

    pre = cur;
    cur = cur.next;
    cppre = cpcur;
  }

  cur = first;
  cpcur = cpHead.next;

  while (cpcur != null) {
    if (cpcur.random == undefined) {
      cpcur.random = ori2cp.get(cur.random!)!;
    }
    cur = cur!.next!;
    cpcur = cpcur.next;
  }

  return cpHead.next;
}
