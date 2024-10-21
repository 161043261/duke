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
@interface JSONField {
  // value 默认参数
  // @JSONField(value="cafe") 可省略为 @JSONField("cafe")
  // default 参数默认值
  // @JSONField("cafe") 可省略为 @JSONField()
  String value() default "username";
}

class JSONSerializer {
  public static String serialize(Object obj) throws IllegalAccessException {
    Class<?> objClass = obj.getClass();
    var jsonEntries = new HashMap<String, String>();
    Field[] fields = objClass.getDeclaredFields();
    for (Field field : fields) {
      field.setAccessible(true);
      if (field.isAnnotationPresent(JSONField.class)) {
        // username:cafe
        // password:baby
        System.out.println(field.getName() + ":" + field.get(obj).toString());
        jsonEntries.put(field.getName(), field.get(obj).toString());
      }
    }
    return toJSONString(jsonEntries);
  }

  private static String getSerializedKey(Field field) {
    String annotationValue = field.getAnnotation(JSONField.class).value();
    if (annotationValue.isEmpty()) {
      return field.getName();
    } else {
      return annotationValue;
    }
  }

  private static String toJSONString(Map<String, String> jsonEntries) {
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

public class JSONFieldTest {
  public static void main(String[] args) throws IllegalAccessException {
    JSONObj obj = new JSONObj("cafe", "baby");
    // {"password":"baby","username":"cafe"}
    System.out.println(JSONSerializer.serialize(obj));
  }

  static class JSONObj {
    @JSONField private String username;

    @JSONField("password")
    private String password;

    public JSONObj(String username, String password) {
      this.username = username;
      this.password = password;
    }

    @Override
    public String toString() {
      return "JSONObj{" + "username='" + username + '\'' + ", password='" + password + '\'' + '}';
    }

    public static void main(String[] args) {
      // com.bronya.JSONFieldTest$JSONObj
      System.out.println(JSONObj.class.getName());
    }
  }
}

class JSONObj {
  @Override
  public String toString() {
    return "JSONObj{}";
  }

  public static void main(String[] args) {
    // com.bronya.JSONObj
    System.out.println(JSONObj.class.getName());
  }
}
