package com.bronya;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.Arrays;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Stream;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class PathTest {

  static final String JAVA_HOME =
      switch (System.getProperty("os.name")) {
        case "Linux" -> {
          System.out.println(System.getProperty("os.name")); // Linux
          System.out.println(System.getProperty("user.home")); // /home/user
          yield "/home/user/.sdkman/candidates/java/current";
        }
        case "Windows 11" -> {
          System.out.println(System.getProperty("os.name")); // Windows 11
          System.out.println(System.getProperty("user.home")); // C:\Users\admin
          yield "C:/Program Files/Eclipse Adoptium/jdk-21.0.4.7-hotspot";
        }
        default -> {
          System.out.println(System.getProperty("os.name"));
          System.out.println(System.getProperty("user.home"));
          yield "/Users/admin/.sdkman/candidates/java/current";
        } // Darwin
      };

  static {
    System.out.println("$JAVA_HOME: " + JAVA_HOME);
  }

  @Test
  // mvn test -Dtest=PathTest#testPath -q
  void testPath() {
    // ! java 使用 ProcessBuilder 执行 shell 命令
    try {
      var processBuilder = new ProcessBuilder(JAVA_HOME + "/bin/java", "--version");
      Process process = processBuilder.start();

      var streamReader = new InputStreamReader(process.getInputStream());
      var bufferedReader = new BufferedReader(streamReader);
      String newLine;
      while ((newLine = bufferedReader.readLine()) != null) {
        System.out.println(newLine);
      }
      int exitCode = process.waitFor();
      Assertions.assertEquals(0 /* expected */, exitCode /* actual */); // junit 断言
    } catch (IOException | InterruptedException e) {
      System.err.println(e.getMessage());
    }
  }

  @Test
  // 遍历目录、统计 jar 的数量
  void testWalkTreePath() {

    // 遍历 $JAVA_HOME
    var dirCnt = new AtomicInteger(0);
    var fileCnt = new AtomicInteger(0);
    var jarCnt = new AtomicInteger(0);
    int[] cnt = new int[] {0 /* dirCnt */, 0 /* fileCnt */, 0 /* jarCnt */};
    Path JAVA_HOME_PATH = Path.of(JAVA_HOME);

    Assertions.assertEquals(JAVA_HOME_PATH, Paths.get(JAVA_HOME));
    Assertions.assertTrue(JAVA_HOME_PATH.toFile().exists());

    try {
      Files.walkFileTree(
          JAVA_HOME_PATH,
          new SimpleFileVisitor<Path>() {
            @Override
            public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs)
                throws IOException {
              // System.out.println(Thread.currentThread().getName() + " -- Enter dir: " +
              // dir);
              dirCnt.incrementAndGet();
              cnt[0] += 1;
              return super.preVisitDirectory(dir, attrs);
            }

            @Override
            public FileVisitResult visitFile(Path file, BasicFileAttributes attrs)
                throws IOException {
              // System.out.println(Thread.currentThread().getName() + " -- Visit file: " +
              // file);
              fileCnt.incrementAndGet();
              cnt[1] += 1;
              if (file.toFile().getName().endsWith(".jar")) {
                jarCnt.incrementAndGet();
                cnt[2] += 1;
              }
              // ! 删除文件
              // Files.delete(file);
              return super.visitFile(file, attrs);
            }

            @Override
            public FileVisitResult postVisitDirectory(Path dir, IOException exc)
                throws IOException {
              // ! 删除目录
              // Files.delete(dir);
              return super.postVisitDirectory(dir, exc);
            }
          });

      Assertions.assertEquals(cnt[0], dirCnt.get());
      Assertions.assertEquals(cnt[1], fileCnt.get());
      Assertions.assertEquals(cnt[2], jarCnt.get());

      System.out.println("[dirCnt, fileCnt, jarCnt] = " + Arrays.toString(cnt));

    } catch (IOException e) {
      System.err.println(e.getMessage());
    }
  }

  @BeforeEach
  void remove() {
    var processBuilder = new ProcessBuilder("rm", "-rf", "-d", "./target/src");
    try {
      Process process = processBuilder.start();
      int exitCode = process.waitFor();
      Assertions.assertEquals(0 /* expected */, exitCode /* actual */);
      Assertions.assertFalse(Paths.get("./target/src").toFile().exists());
    } catch (IOException | InterruptedException e) {
      System.err.println(e.getMessage());
    }
  }

  @Deprecated
  void clean() {
    try {
      Runtime.getRuntime().exec("/path/to/mvn clean"); // 使用 mvn 的绝对路径
    } catch (IOException e) {
      System.err.println(e.getMessage());
    }
  }

  @Test
  // 拷贝多级目录
  void testCopy() {
    long start = System.currentTimeMillis();
    String baseDir = "./src";
    try (Stream<Path> pathStream = Files.walk(Paths.get(baseDir))) {

      pathStream.forEach(
          srcName -> {
            // System.out.println(srcName); // 相对路径
            String cpName =
                String.format(
                    ".%starget%s%s",
                    File.separator, File.separator, srcName.toString().substring(2));
            // System.out.println(cpName); // 相对路径

            try {
              Path cpPath = Paths.get(cpName); // 相对路径
              // System.out.println(cpPath.toString());
              if (Files.isDirectory(srcName)) {
                Files.createDirectories(cpPath);
              } else if (Files.isRegularFile(srcName)) {
                Files.copy(srcName, cpPath);
              }
            } catch (IOException e) {
              System.err.println(e.getMessage());
            }
          });
    } catch (IOException e) {
      System.err.println(e.getMessage());
    }
    long end = System.currentTimeMillis();
    System.out.println("Total: " + (end - start) + "ms");

    // Graceful exit
    Runtime.getRuntime()
        .addShutdownHook(
            new Thread(
                () -> {
                  System.out.println("Graceful exit");
                }));

    try {
      Thread.sleep(10_000);
    } catch (InterruptedException ignored) {
    }
  }
}
