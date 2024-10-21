package reflect_test

import (
	"fmt"
	"reflect"
	"testing"
)

func Test1(t *testing.T) {
	var aInt = 1

	// 反射获取类型
	var reflectedType reflect.Type = reflect.TypeOf(&aInt) // 传递指针
	// Type: *int
	fmt.Println("Type:", reflectedType)
	// Type: int
	fmt.Println("Type:", reflect.TypeOf(aInt)) // 传递值

	// Kind returns the specific kind of this type
	var specificType reflect.Kind = reflectedType.Kind()
	// Specific type: ptr
	fmt.Println("Specific type:", specificType)

	// 反射获取值
	var reflectedVal reflect.Value = reflect.ValueOf(&aInt) // 传递指针
	// Value: 0xc00000a380
	fmt.Println("Value:", reflectedVal)
	// Value: 1
	fmt.Println("Value:", reflect.ValueOf(aInt)) // 传递值

	switch specificType {
	case reflect.Int:
		// 反射修改值
		reflectedVal.SetInt(10)
		// 反射获取地址
		// Addr: 0xc00000a380
		fmt.Println("Addr:", reflectedVal.Addr())

	case reflect.Ptr:
		// 反射修改值
		// Elem 方法返回指针指向的变量
		fmt.Println("reflect.Ptr")
		// Addr: 0xc00000a380
		fmt.Printf("Addr: 0x%x\n", (uint64)(reflectedVal.Pointer()))
		// Addr: 0xc00000a380
		fmt.Println("Addr:", reflectedVal.Elem().Addr())

	default:
		fmt.Println("Unknown")
	}

	// aInt: 11
	fmt.Println("aInt:", aInt)
}

type User struct {
	Name string
	Age  int
}

func (user User) String() string {
	return fmt.Sprintf("%#v", user)
}

// 验证 User 结构体是否实现了 fmt.Stringer 接口
var _ fmt.Stringer = (*User)(nil)

// 公开, 值接收器
func (user User) ValMethod(arg string) string {
	return "Public, value receiver method: " + arg
}

// 公开, 指针接收器
func (user *User) PtrMethod(arg string) string {
	return "Public, pointer receiver method: " + arg
}

func Test2(t *testing.T) {
	user := User{Name: "Gopher", Age: 15}

	// 反射获取结构体的类型 (包名.结构体名)
	var reflectedType reflect.Type = reflect.TypeOf(user) // 传递值
	// Type: reflect_test.User
	fmt.Println("Type:", reflectedType)

	// 反射获取结构体名
	// Type name: User
	fmt.Println("Type name:", reflectedType.Name())

	// 反射获取结构体的值
	var reflectedVal reflect.Value = reflect.ValueOf(user)
	// Value: {Gopher 15}
	fmt.Println("Value:", reflectedVal)

	// 反射获取结构体的字段数量
	var numField int = reflectedVal.NumField()
	// Number of field: 2
	fmt.Println("Number of field:", numField)

	for i := 0; i < numField; i++ {
		// 反射获取结构体的字段
		var field reflect.StructField = reflectedType.Field(i)
		// 反射获取结构体的字段名, 字段类型, 字段值
		// Field: Name string Gopher
		// Field: Age int 15
		var val reflect.Value = reflectedVal.Field(i)
		fmt.Println("Field:", field.Name, // 字段名
			field.Type,      // 字段类型
			val.Interface()) // 字段值
	}

	// 反射获取结构体的方法数量
	var numMethod int = reflectedType.NumMethod()
	// Number of method: 2
	fmt.Println("Number of method:", numMethod)

	for i := 0; i < numMethod; i++ {
		// 反射获取结构体的方法
		var method reflect.Method = reflectedType.Method(i)
		// 反射获取结构体的方法名, 方法类型
		// Method: PubElemMethod func(reflect_test.User, string) string
		// Method: String func(reflect_test.User) string
		fmt.Println("Method:", method.Name, // 方法名
			method.Type) // 方法类型
	}
}

type Man struct {
	User
	Gender string
}

func (man Man) String() string {
	return fmt.Sprintf("%#v\n", man)
}

// 验证 Man 结构体是否实现了 fmt.Stringer 接口
var _ fmt.Stringer = (*Man)(nil)

func Test3(t *testing.T) {
	man := Man{User{"Gopher", 15}, "male"}

	// 反射获取结构体的类型 (包名.结构体名)
	var reflectedType reflect.Type = reflect.TypeOf(man) // 传递值
	// Type: reflect_test.Man
	fmt.Println("Type:", reflectedType)

	// 反射获取结构体的值
	var reflectedVal reflect.Value = reflect.ValueOf(&man) // 传递指针
	// Value: reflect_test.Man{User:reflect_test.User{Name:"Gopher", Age:15}, Gender:"male"}
	fmt.Println("Value:", reflectedVal)

	for i := 0; i < reflectedType.NumField(); i++ {
		// 反射获取结构体的字段名, 字段类型, 字段值
		// Field: User reflect_test.User reflect_test.User{Name:"Gopher", Age:15}
		// Field: Gender string male
		fmt.Println("Field:",
			reflectedType.Field(i).Name,  // 字段名
			reflectedType.Field(i).Type,  // 字段类型
			reflectedVal.Elem().Field(i), /* .Interface() */ // 字段值
		)
	}

	reflectedVal = reflectedVal.Elem()
	// 根据公开 (首字母大写) 的字段名, 获取字段值
	var fieldValue reflect.Value = reflectedVal.FieldByName("Gender")
	// Field value: male
	fmt.Println("Field value:", fieldValue /* .Interface() */)

	if fieldValue.Kind() == reflect.String {
		// 修改结构体的字段值
		fieldValue.SetString("female")
	}

	// reflect_test.Man{User:reflect_test.User{Name:"Gopher", Age:15}, Gender:"female"}
	fmt.Println(man)
}

func Test4(t *testing.T) {
	user := User{Name: "Gopher", Age: 15}
	var reflectedVal reflect.Value = reflect.ValueOf(&user) // 传递指针
	fmt.Println("Value:", reflectedVal)

	args := []reflect.Value{reflect.ValueOf("Args")}

	// 根据公开 (首字母大写) 的方法名, 获取方法
	method := reflectedVal.MethodByName("ValMethod")
	// 调用方法
	var reply []reflect.Value = method.Call(args)
	// [Public, value receiver method: Args]
	fmt.Println(reply)

	// 根据公开 (首字母大写) 的方法名, 获取方法
	method = reflectedVal.MethodByName("PtrMethod")
	// 调用方法
	reply = method.Call(args)
	// Public, pointer receiver method: Args
	fmt.Println(reply[0].Interface().(string)) // 类型断言
}

type Data struct {
	Name string `json:"gopher" db:"minio"`
}

func Test5(t *testing.T) {
	var data Data
	// 反射获取结构体的值
	var reflectedVal reflect.Value = reflect.ValueOf(&data) // 传递指针
	// Value: &{}
	fmt.Println("Value:", reflectedVal)

	// 反射获取结构体的类型 (包名.结构体名)
	var reflectedType reflect.Type = reflectedVal.Type()
	// 等价于
	// var reflectedType reflect.Type = reflect.TypeOf(&data)

	// Type: *reflect_test.Data
	fmt.Println("Type:", reflectedType)
	var field reflect.StructField = reflectedType.Elem().Field(0)

	// 根据字段 Tag 的键, 获取值
	// Key: json, Value: gopher
	fmt.Println("Key: json, Value:", field.Tag.Get("json"))

	// 根据字段 Tag 的键, 获取值
	// Key: db, Value: minio
	fmt.Println("Key: db, Value:", field.Tag.Get("db"))
}
