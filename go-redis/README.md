# redis

redis 数据类型

### [string](./assets/string.md) 字符串

- 键 === 字符串（值）
- 字符串是 Redis **最**基本的数据类型

### [list](./assets/list.md) 链表

- 键 === 字符串链表
- 链表是按插入顺序排序的字符串链表，命令以 l 开头
- 将 list 链表用作栈 stack 和队列 queue
  - 左表头 === 右表尾
  - 左栈顶 === 右栈底

### [hash](./assets/hash.md) 哈希

- 键 === 哈希表（两两一组的，字段、字段值的集合 k1 v1 k2 v2...）
- 哈希用于 map、对象存储

### [set](./assets/set.md) 集合

- 键 === 唯一字符串的无序集合

### [sorted set](./assets/zset.md) 有序集合

- zset 有序集合是唯一字符串的有序集合，命令以 s 开头
- 字符串按分数 score 排序，分数相同时按字典排序
- zset 有序集合可以看作 set 无序集合和 hash 哈希的混合体。有序集合的每个元素 (键) 都关联一个浮点类型的分数 (值)
- zset 有序集合通过跳表和哈希表（字典）实现，添加元素时排序，添加元素的时间复杂度是 O(log2N)

### stream

### bitmap

### bitfield

### geospatial

就像蝴蝶飞不过沧海，没有谁忍心责怪
