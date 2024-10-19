# Annotation

注解的生命周期

```java
public enum RetentionPolicy {
    SOURCE, // .java 源文件中有效, javac 时直接丢弃
    CLASS,  // .class 字节码文件中有效, 运行时 JVM 直接丢弃
    RUNTIME // 运行时有效
}
```

注解的类型

```java
public enum ElementType {
  TYPE,             // 类, 接口, 枚举, 注解
  FIELD,            // 字段, 枚举常量
  METHOD,           // 方法
  PARAMETER,        // 方法参数
  CONSTRUCTOR,      // 构造方法
  LOCAL_VARIABLE,   // 变量
  ANNOTATION_TYPE,  // 注解
  PACKAGE,          // 包
  TYPE_PARAMETER,   // 泛型参数
  TYPE_USE,         // 类型声明
  MODULE,           // 模块
  RECORD_COMPONENT; // 记录类
}
```
