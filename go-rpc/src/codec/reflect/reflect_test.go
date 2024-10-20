package reflect_test

import (
	"fmt"
	"reflect"
	"testing"
)

func Test1(t *testing.T) {
	v := "Darwin"
	// 使用 reflect.TypeOf 获取 v 的类型
	fmt.Println("Type of v:", reflect.TypeOf(v))
	// 使用 reflect.ValueOf 获取 v 的值
	fmt.Println("Value of v:", reflect.ValueOf(v))
}

func Test2(t *testing.T) {
	var two reflect.Value = reflect.ValueOf(2)
	var aInt int = two.Interface().(int)
	fmt.Println(aInt)
}

func Test3(t *testing.T) {
	three := 3
	v := reflect.ValueOf(three /* 拷贝值 */)
	v.SetInt(10)
	// panic: reflect: reflect.Value.SetInt using unaddressable value
	// 使用不可寻址的值
	fmt.Println(three)
}

func Test4(t *testing.T) {
	four := 4
	val := reflect.ValueOf(&four /* 拷贝指针 */)
	val.Elem(). /* Elem() 返回指针指向的值 */ SetInt(10)
	fmt.Println(four) // 10
}

func Test5(t *testing.T) {
	var aInt = 1
	var reflectedType reflect.Type = reflect.TypeOf(&aInt)

	// Type: *int
	fmt.Println("Type:", reflectedType)
	var specificType reflect.Kind = reflectedType.Kind()

	// Specific type: ptr
	fmt.Println("Specific type:", specificType)

	var reflectedVal reflect.Value = reflect.ValueOf(&aInt)

	switch specificType {
	case reflect.Int:
		fmt.Printf("reflect.Int")
	case reflect.Ptr:
		// reflect.Ptr
		fmt.Println("reflect.Ptr")
	default:
		fmt.Println("Unknown")
	}
}
