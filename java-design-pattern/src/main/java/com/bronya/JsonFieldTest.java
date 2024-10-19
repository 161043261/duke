package com.bronya;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

// 运行时有效
@Retention(RetentionPolicy.RUNTIME)
// 字段注解
@Target(ElementType.FIELD)
@interface JsonField {
  // value 默认参数
  // @JsonField(value="cafe") 可省略为 @JsonField("cafe")
  // default 参数默认值
  // @JsonField("cafe") 可省略为 @JsonField()
  String value() default "username";
}

class JsonSerializer {
  public static String serialize(Object obj) throws IllegalAccessException {
    Class<?> objClass = obj.getClass();
    var jsonEntries = new HashMap<String, String>();
    Field[] fields = objClass.getDeclaredFields();
    for (Field field : fields) {
      field.setAccessible(true);
      if (field.isAnnotationPresent(JsonField.class)) {
        // username:cafe
        // password:baby
        System.out.println(field.getName() + ":" + field.get(obj).toString());
        jsonEntries.put(field.getName(), field.get(obj).toString());
      }
    }
    return toJsonString(jsonEntries);
  }

  private static String getSerializedKey(Field field) {
    String annotationValue = field.getAnnotation(JsonField.class).value();
    if (annotationValue.isEmpty()) {
      return field.getName();
    } else {
      return annotationValue;
    }
  }

  private static String toJsonString(Map<String, String> jsonEntries) {
    return "{"
        + jsonEntries.entrySet().stream()
            .map(
                entry -> {
                  return "\"" + entry.getKey() + "\":\"" + entry.getValue() + "\"";
                })
            .collect(Collectors.joining(","))
        + "}";
  }
}

public class JsonFieldTest {
  public static void main(String[] args) throws IllegalAccessException {
    JsonObj obj = new JsonObj("cafe", "baby");
    // {"password":"baby","username":"cafe"}
    System.out.println(JsonSerializer.serialize(obj));
  }

  static class JsonObj {
    @JsonField private String username;

    @JsonField("password")
    private String password;

    public JsonObj(String username, String password) {
      this.username = username;
      this.password = password;
    }

    @Override
    public String toString() {
      return "JsonObj{" + "username='" + username + '\'' + ", password='" + password + '\'' + '}';
    }

    public static void main(String[] args) {
      // com.bronya.JsonFieldTest$JsonObj
      System.out.println(JsonObj.class.getName());
    }
  }
}

class JsonObj {
  @Override
  public String toString() {
    return "JsonObj{}";
  }

  public static void main(String[] args) {
    // com.bronya.JsonObj
    System.out.println(JsonObj.class.getName());
  }
}
