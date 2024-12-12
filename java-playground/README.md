# SpringBoot

### Perface

SpringBootApplication: SpringBoot 启动类的注解

```text
@SpringBootApplication =
    @Configuration +
    @EnableAutoConfiguration +
    @ComponentScan
```

```text
@Component = @Repository | @Service | @Controller
```

- @EnableAutoConfiguration: 开启 SpringBoot 自动配置
- @ComponentScan: 扫描当前包下的, 使用 @Component (@Repository, @Service, @Controller) 注解的所有 bean

> bean 是**由 IOC 容器管理**的 (可能单例) 的对象

**@Configuration**

1. @Configuration: 声明配置类, 可以使用 @Component 代替, 但是 @Configuration 更加语义化
2. 可以在使用 @Configuration 注解的类下, 使用 @Bean 注解, 向 IOC 容器中注册 bean (bean 名 = 方法名)

```java
@Configuration
class RegisterBeans {

  @Bean
  public BeanType beanName() {
    return new BeanType();
  }
}
```

### bean 相关

@Autowired: 从 IOC 容器中取出 bean, 注入到当前类; 被注入的类也要**由 IOC 容器管理**

```java
@Service
public class UserService {}

@RestController // 被注入的类也要由 IOC 容器管理
@RequestMapping("/user")
public class UserController {
  @Autowired
  private UserService userService;
}
```

- @Component: 标注该类为 SpingBoot 组件, 不分层
- @Repository: 标注该类为 dao 层的 SpingBoot 组件
- @Service: 标注该类为 service 层的 SpringBoot 组件
- @Controller: 标注该类为 api (controller) 层的 SpringBoot 组件

```test
@RestController = @Controller + @ResponseBody
```

- @ResponseBody: 将 api 方法的返回值写入 HTTP 报文的响应体中
- @RestController: REST 风格的控制器 (控制器: api 方法的集合)

@Scope: 声明 bean 的作用域

四种常见的 bean 的作用域

1. singleton: 单例
2. prototype: 每次请求都会创建一个新的 bean 实例
3. request: 每次 HTTP 请求都会创建一个新的 bean 实例, 该 bean 仅在当前 HTTP 请求中存活
4. session: 每次 HTTP 会话都会创建一个新的 bean 实例, 该 bean 仅在当前 HTTP 会话中存活

### 处理 HTTP 请求

- @GetMapping
- @PostMapping
- @PutMapping
- @DeleteMapping
- ...

```java
// 等价于 @RequestMapping(value = "/users", method = RequestMethod.GET)
@GetMapping("/users")
public RespEntity<List<User>> selectAllUsers();
```

```java
// 等价于 @RequestMapping(value = "/users", method = RequestMethod.POST)
@PostMapping("/users")
public RespEntity<User> insertUser(
  @Valid @RequestBody UserInsertreq userInsertreq);
```

```java
// @RequestMapping(value = "/users/{userId}", method = RequestMethod.PUT)
@PutMapping("/users/{userId}")
public RespEntity<User> updateUser(
  @PathVariable(value = "userId") Long userId,
  @Valid @RequestBody UserUpdatereq userUpdatereq);
```

```java
// 等价于 @RequestMapping(value = "/users/{userId}", method = RequestMethod.DELETE)
@DeleteMapping("/users/{userId}")
public RespEntity deleteUserById(
  @PathVariable(value = "userId") Long userId);
```

### 前后端传值

- @PathVariable 获取路径参数
- @RequestParam 获取请求行参数 (查询参数)
- @RequestBody 获取请求体数据

```java
@GetMapping("/klasses/{klassId}/users")
public List<User> selectUsersByKlassId(
  @PathVariable("klassId") Long klassId,
  @RequestParam(value = "type", required = false) String type);
```

如果请求的 URI: /klasses/3/users?type=web, 则: klassId = 3; type = web

@ReponseBody: 获取 GET, POST, PUT, DELETE 请求的请求体数据. 且 Content-Type 为 application-json 格式的数据

一个 api 方法只能有一个 @RequestBody, 可以有多个 @RequestParam 和 @PathVariable

### 读取 .properties, .yml, .yaml 配置文件

@Value: 读取简单的配置信息
@ConfigurationProperties: 读取配置信息并绑定到 bean
@PropertySource: 读取指定的配置文件

### 全局处理 api (controller) 层异常

- @ControllerAdvice, @RestControllerAdvice: 声明全局异常处理类
- @ExceptionHandler: 声明异常处理方法

```java
@RestControllerAdvice
public class ErrorHandler { // global

  @ExceptionHandler(Exception.class)
  public Result<String> handler(Exception e) {
    log.error(e.getMessage());
    return Result.err(StringUtils.hasLength(e.getMessage()) ? e.getMessage() : "Fatal Error");
  }
}
```

### 事务

@Transactional

- 作用于类: 对该类的所有方法开启事务
- 作用于方法: 对该方法开启事务
- 也可以作用于测试方法

```java
@Transactional(rollbackFor = Exception.class)
@Override
public int deleteUserById(Integer id) {
  int rowCount = userMapper.deleteUserById(id);
  log.info("rowCount={}", rowCount);
  return userMapper.deleteUserById(id);
}
```

### JSON 序列化/反序列化

- @JsonIgnore: field 属性注解, JSON 序列化时, 忽略该字段
- @JsonIgnoreProperties: type 类注解, JSON 序列化时, 忽略的字段集合
- @JsonFormat 格式化 JSON 数据

```java
@JsonIgnoreProperties({"pwd"})
public class User {
  private String uname;
  private String pwd;
  @JsonIgnore
  private String pwd2;
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private LocalDateTime datetime;
}
```

@ActiveProfiles: 作用于测试类上, 用于声明生效的配置文件
