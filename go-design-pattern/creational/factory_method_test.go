package creational

import (
	"fmt"
	"testing"
)

// 工厂方法模式是一种创建型设计模式
// 工厂方法模式可以在不指定具体的类的情况下，创建产品对象

// 使用工厂方法代替直接调用构造函数创建对象（new 关键字）
// 子类可以重写该工厂方法，以修改被创建的对象所属的类

// IGun 产品接口，创建 IGun 枪支接口，声明枪支需要的方法
type IGun interface {
	setName(name string)
	setPower(power int)
	getName() string
	getPower() int
}

// Gun 具体产品，实现了 IGun 枪支接口的 Gun 枪支结构体
type Gun struct {
	name  string
	power int
}

// 使用指针接收器
func (gun *Gun) setName(name string) {
	gun.name = name
}

func (gun *Gun) getName() string {
	return gun.name
}

func (gun *Gun) setPower(power int) {
	gun.power = power
}

func (gun *Gun) getPower() int {
	return gun.power
}

// ak47 具体产品，组合了 Gun 枪支结构体
type ak47 struct {
	Gun
}

func newAk47() IGun {
	return &ak47{
		Gun: Gun{
			name:  "Ak47 gun",
			power: 4,
		},
	}
}

// Musket 具体产品，组合了 Gun 结构体
type Musket struct {
	Gun
}

func newMusket() IGun {
	return &Musket{
		Gun: Gun{
			name:  "Musket gun",
			power: 1,
		},
	}
}

// gunFactoryMethod 工厂方法
func gunFactoryMethod(gunType string) (IGun, error) {
	switch gunType {
	case "ak47":
		return newAk47(), nil
	case "musket":
		return newMusket(), nil
	default:
		return nil, fmt.Errorf("gun type error")
	}
}

// TestFactoryMethod 测试客户端
func TestFactoryMethod(t *testing.T) {
	ak47Product, _ := gunFactoryMethod("ak47")
	musketProduct, _ := gunFactoryMethod("musket")

	descDetails := func(gun IGun) {
		fmt.Printf("Gun: %s, Power: %d\n", gun.getName(), gun.getPower())
	}

	descDetails(ak47Product)
	descDetails(musketProduct)
}
