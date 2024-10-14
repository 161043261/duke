# 函数式编程

要求：jdk-21

1. 类名::静态方法名
2. 类名::实例方法名
3. 对象::实例方法名
4. 类名::New（构造方法）
5. this::实例方法名
6. super::实例方法名

## Stream API

1. 过滤
   - stream.filter
2. 一对一映射
   - stream.map
3. 一对多映射
   - stream.flatMap
4. 构造
   - Stream.of
5. 拼接
   - Stream.concat
6. 截取
   - stream.skip
   - stream.limit
7. 生成
   - IntStream.range
   - IntStream.rangeClosed
   - IntStream.iterate
8. 查找与判断
   - stream.findAny
   - stream.findFirst
   - stream.ifPresent
   - string.anyMatch
   - string.noneMatch
9. 排序与去重
10. 化简 reduce
11. 收集
    - supplier 创建容器
    - accumulator 向容器中添加容器
    - combiner 合并两个容器
12. 对象类型的流和基本类型的流的转换
    - 对象类型的流转换为基本类型的流
      - mapToInt
      - mapToLong
      - mapToDouble
      - flatMapToInt
      - flatMapToDouble
      - mapMultiToInt
      - mapMultiToLong
      - mapMultiToDouble
    - 基本类型的流转换为对象类型的流
      - mapToObj
      - boxed
13. 特性
    - 一次使用：一个流只能使用一次
    - 两类操作
      - 中间操作（lazy 懒汉式）
      - 结束操作（eager 饿汉式）
14. 并发
