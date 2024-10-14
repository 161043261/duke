package com.bronya;

import java.util.Arrays;
import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.IntStream;
import java.util.stream.Stream;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

@Slf4j
public class StreamTest {
  // 定义 Fruit 记录类（不可修改的数据类）
  // 属性：id, name, category, color
  // ! 自动生成的构造方法
  // ! 自动生成的 getter: fruit.name(); fruit.version();
  // ! 自动生成的 fruit.equals(); fruit.hashCode(); fruit.toString();
  record Fruit(int id, String name, String category, String color) {}

  List<Fruit> fruitList =
      List.of(
          new Fruit(1, "Strawberry", "berry", "red"),
          new Fruit(2, "Mulberry", "berry", "purple"),
          new Fruit(3, "Waxberry", "berry", "red"),
          new Fruit(4, "Walnut", "nut", "brown"),
          new Fruit(5, "Peanut", "nut", "brown"),
          new Fruit(6, "Blueberry", "berry", "blue"));

  interface Lambda<T> {
    Stream<T> getStream(List<T> tList);
  }

  // final Lambda<Fruit> fn = fruitList -> fruitList.stream();
  final Lambda<Fruit> fn = Collection::stream; // 类名::实例方法名

  /**
   *
   *
   * <h1>过滤</h1>
   */
  // ！ mvn test -Dtest=StreamTest#testFilter
  @Test
  void testFilter() {
    // 测试 1：过滤得到浆果
    log.info("Test stream.filter 1");
    var dataStream1 = fn.getStream(fruitList);
    dataStream1.filter(f -> f.category.equals("berry")).forEach(System.out::println);

    // 测试 2：过滤得到蓝色的浆果
    log.info("Test stream.filter 2");
    var dataStream2 = fn.getStream(fruitList);
    dataStream2
        .filter(f -> f.category.equals("berry") && f.color.equals("blue"))
        .forEach(System.out::println);

    // 测试 3：过滤得到蓝色的浆果
    log.info("Test stream.filter 3");
    var dataStream3 = fn.getStream(fruitList);
    dataStream3
        .filter(f -> f.category.equals("berry"))
        .filter(f -> f.color.equals("blue"))
        .forEach(System.out::println);

    // 测试 4：过滤得到蓝色的浆果
    log.info("Test stream.filter 4");
    var dataStream4 = fn.getStream(fruitList);
    dataStream4
        .filter(
            ((Predicate<Fruit>) f -> f.category.equals("berry"))
                /* .or .and .negate */ .and(f -> f.color().equals("blue")))
        .forEach(System.out::println);
  }

  /**
   *
   *
   * <h1>一对一映射</h1>
   */
  // ! mvn test -Dtest=StreamTest#testMap
  @Test
  void testMap() {
    log.info("Filter to get blueberry and map to blueberry jam");
    var dataStream1 = fn.getStream(fruitList);
    dataStream1
        .filter(f -> f.category.equals("berry") && f.color.equals("blue"))
        /* map 1 个元素的流 -> 1 个元素的流 */
        .map(f -> f.name() + " jam")
        .forEach(System.out::println);
  }

  /**
   *
   *
   * <h1>一对多映射</h1>
   */
  // ! mvn test -Dtest=StreamTest#testFlatMap
  @Test
  void testFlatMap() {
    // Stream 中 map 和 flatMap 的区别
    // * map     一对一映射
    // * flatMap 一对多映射
    log.info("Test stream.flatMap 1");
    Stream.of(
            List.of(
                new Fruit(1, "Strawberry", "berry", "red"),
                new Fruit(2, "Mulberry", "berry", "purple"),
                new Fruit(3, "Waxberry", "berry", "red")),
            List.of(
                new Fruit(4, "Walnut", "nut", "brown"),
                new Fruit(5, "Peanut", "nut", "brown"),
                new Fruit(6, "Blueberry", "berry", "blue")))
        /* flatMap 2 个元素的流 -> 6 个元素的流 */
        .flatMap(Collection::stream)
        .forEach(System.out::println);

    record Order(int id, List<Fruit> items) {}

    log.info("Test stream.flatMap 2");
    Stream.of(
            new Order(
                1,
                List.of(
                    new Fruit(1, "Strawberry", "berry", "red"),
                    new Fruit(2, "Mulberry", "berry", "purple"),
                    new Fruit(3, "Waxberry", "berry", "red"))),
            new Order(
                2,
                List.of(
                    new Fruit(4, "Walnut", "nut", "brown"),
                    new Fruit(5, "Peanut", "nut", "brown"),
                    new Fruit(6, "Blueberry", "berry", "blue"))))
        /* flatMap 2 个元素的流 -> 6 个元素的流 */
        .flatMap(order -> order.items.stream())
        .forEach(System.out::println);
  }

  /**
   *
   *
   * <h1>构造</h1>
   */
  // ! mvn test -Dtest=StreamTest#testStreamOf
  @Test
  void testStreamOf() {
    log.info("Test Stream.Of");
    // 由数组构造流
    Lambda<Fruit> fx = unused -> Arrays.stream(new Fruit[6]); // ! Arrays.stream(arr)
    // 由集合构造流
    Lambda<Fruit> fy = collection -> collection.stream();
    // 将对象转换为流
    Stream.of(new Fruit(1, "Strawberry", "berry", "red")).forEach(System.out::println);
    // 将多个对象转换为流
    Stream.of(
            new Fruit(1, "Strawberry", "berry", "red"), /* \n */
            new Fruit(2, "Mulberry", "berry", "purple")) /* \n */
        .forEach(System.out::println);
  }

  /**
   *
   *
   * <h1>拼接</h1>
   */
  // ! mvn test -Dtest=StreamTest#testConcat
  @Test
  void testConcat() {
    System.out.print("Test stream.concat -- ");
    // 拼接两个流
    Stream.concat(Stream.of("a", "b", "c", "d"), Stream.of("e", "f", "g"))
        .map(c -> c + " ")
        .forEach(System.out::print); // a b c d e f g
    System.out.println();
  }

  /**
   *
   *
   * <h1>截取</h1>
   */
  // ! mvn test -Dtest=StreamTest#testSkipAndLimit
  @Test
  void testSkipAndLimit() {
    System.out.print("Test stream.skip and stream.limit -- ");
    Stream.concat(Stream.of("a", "b", "c", "d"), Stream.of("e", "f", "g"))
        .skip(2 /* n = 2 */) /* ! 跳过 n 个元素 */
        .limit(3 /* truncate maxSize = 3 */) /* ! 限制截取 maxSize 个元素 */
        .map(c -> c + " ")
        .forEach(System.out::print); // c d e
    System.out.println();
  }

  /**
   *
   *
   * <h1>生成</h1>
   */
  // ! mvn test -Dtest=StreamTest#testGenerate
  @Test
  void testGenerate() {
    System.out.print("Test IntStream.range -- ");
    IntStream.range(0, 3) // [0, 3)
        .forEach(System.out::print); // 012

    System.out.print("\nTest IntStream.rangeClosed -- ");
    IntStream.rangeClosed(0, 3) // [0, 3]
        .forEach(System.out::print); // 0123

    System.out.print("\nTest IntStream.iterate -- ");
    IntStream.iterate(
            1, // 1 初始值
            x -> x + 2)
        .limit(5)
        .forEach(System.out::print); // 13579
    System.out.println();
  }

  /**
   *
   *
   * <h1>查找与判断</h1>
   */
  // ! mvn test -Dtest=StreamTest#testFindAndJudge
  @Test
  void testFindAndJudge() {

    int[] arr = {1, 3, 4, 5, 6, 7, 9};
    // findAny   查找任意一个元素
    // findFirst 查找第一个元素
    Arrays.stream(arr) /*  Arrays.stream(arr) */
        .filter(x -> (x & 1) == 0 /* 是偶数 */)
        .findAny() /* 查找任意一个（偶数）返回一个 OptionalInt 对象 */
        .ifPresent(
            /* 如果存在，则打印该偶数 */
            even -> log.info("Test stream.findAny and stream.ifPresent -- {}", even));

    log.info(
        "Test stream.anyMatch -- {}", /* 判断流中是否存在任意一个偶数 */
        Arrays.stream(arr).anyMatch(x -> (x & 1) == 0)); // true

    log.info(
        "Test stream.allMatch -- {}", /* 判断流中是否全部都是偶数 */
        Arrays.stream(arr).allMatch(x -> (x & 1) == 0)); // false

    log.info(
        "Test stream.noneMatch -- {}", /* 判断流中是否全部都不是偶数 */
        Arrays.stream(arr).noneMatch(x -> (x & 1) == 0)); // false
  }

  record Char(String name, int id) {}

  @Test // mvn test -Dtest=StreamTest#testSortAndDeduplication -q
  void testSortAndDeduplication() {
    Stream<Char> charStream =
        Stream.of(
            new Char("Klee", 1),
            new Char("Hutao", 11),
            new Char("Ganyu", 16),
            new Char("Shenhe", 16),
            new Char("Yoimiya", 21));
    // 按 id 降序排序；id 相同时按 name 长度升序排序

    // charStream.sorted((l, r) -> {
    //   int delta = Integer.compare(r.id, l.id);
    //   return delta == 0 ?
    //       Integer.compare(l.name.length(), r.name.length()) : delta;
    // }).forEach(System.out::println);

    // 替换为 Comparator 链
    charStream
        .sorted(
            /* 按 id 升序排序 */
            Comparator.comparingInt(Char::id) /* 类名::实例方法名 */
                .reversed() /* 转换为按 id 降序排序 */
                /* id 相同时按 name 长度升序排序 */
                .thenComparingInt(c -> c.name.length()))
        .forEach(System.out::println);
  }
}
