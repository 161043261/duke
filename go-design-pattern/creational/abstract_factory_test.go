package creational

import (
	"fmt"
	"testing"
)

// 抽象工厂模式是一种创建型设计模式
// 抽象工厂模式可以创建不同的产品对象，而无需指定具体的类

// 抽象工厂接口声明创建不同产品的方法
// 具体工厂（抽象工厂接口的实现类）负责具体的创建工作

// 创建产品时，客户端调用工厂对象的构造方法，例如 ???Factory, _ := NewFactory("???")
// 而不是直接调用产品的构造方法（new 一个产品对象）

// 通过抽象工厂接口，相同的客户端代码可以生产不同的产品
// 例如 ???Shoe := ???Factory.makeShoe()
// 只需创建一个具体工厂类即可，例如 ???Factory, _ := NewFactory("???")

// IShoe 抽象产品接口
type IShoe interface {
	setShoeBrand(brand string)
	setShoeSize(size int)
	getShoeBrand() string
	getShoeSize() int
}

// Shoe 抽象产品
type Shoe struct {
	brand string
	size  int
}

func (shoe *Shoe) setShoeBrand(brand string) {
	shoe.brand = brand
}

func (shoe *Shoe) setShoeSize(size int) {
	shoe.size = size
}

func (shoe *Shoe) getShoeBrand() string {
	return shoe.brand
}

func (shoe *Shoe) getShoeSize() int {
	return shoe.size
}

// AdidasShoe 具体产品
type AdidasShoe struct {
	Shoe
}

// NikeShoe 具体产品
type NikeShoe struct {
	Shoe
}

// IShirt 抽象产品接口
type IShirt interface {
	setShirtBrand(brand string)
	setShirtSize(size int)
	getShirtBrand() string
	getShirtSize() int
}

// Shirt 抽象产品
type Shirt struct {
	brand string
	size  int
}

func (shirt *Shirt) setShirtBrand(brand string) {
	shirt.brand = brand
}

func (shirt *Shirt) setShirtSize(size int) {
	shirt.size = size
}

func (shirt *Shirt) getShirtBrand() string {
	return shirt.brand
}

func (shirt *Shirt) getShirtSize() int {
	return shirt.size
}

// AdidasShirt 具体产品
type AdidasShirt struct {
	Shirt
}

// NikeShirt 具体产品
type NikeShirt struct {
	Shirt
}

// IAbstractFactory 抽象工厂接口
type IAbstractFactory interface {
	makeShoe() IShoe
	makeShirt() IShirt
}

func NewFactory(brand string) (IAbstractFactory, error) {
	switch brand {
	case "Adidas":
		return &AdidasFactory{}, nil
	case "Nike":
		return &NikeFactory{}, nil
	default:
		return nil, fmt.Errorf("brand error: %s", brand)
	}
}

// AdidasFactory 具体工厂
type AdidasFactory struct {
}

func (factory *AdidasFactory) makeShoe() IShoe {
	return &AdidasShoe{
		Shoe: Shoe{
			brand: "Adidas",
			size:  45,
		},
	}
}

func (factory *AdidasFactory) makeShirt() IShirt {
	return &AdidasShirt{
		Shirt: Shirt{
			brand: "Adidas",
			size:  175,
		},
	}
}

// NikeFactory 具体工厂
type NikeFactory struct {
}

func (factory *NikeFactory) makeShoe() IShoe {
	return &NikeShoe{
		Shoe: Shoe{
			brand: "Nike",
			size:  40,
		},
	}
}

func (factory *NikeFactory) makeShirt() IShirt {
	return &NikeShirt{
		Shirt: Shirt{
			brand: "Nike",
			size:  170,
		},
	}
}

// TestAbstractFactory 测试客户端
func TestAbstractFactory(t *testing.T) {
	adidasFactory, _ := NewFactory("Adidas")
	nikeFactory, _ := NewFactory("Nike")

	adidasShoe := adidasFactory.makeShoe()
	adidasShirt := adidasFactory.makeShirt()

	nikeShoe := nikeFactory.makeShoe()
	nikeShirt := nikeFactory.makeShirt()

	printShoeDetails := func(shoe IShoe) {
		fmt.Printf("Shoe brand: %v, shoe size: %v\n", shoe.getShoeBrand(), shoe.getShoeSize())
	}

	printShirtDetails := func(shirt IShirt) {
		fmt.Printf("Shirt brand: %v, shirt size: %v\n", shirt.getShirtBrand(), shirt.getShirtSize())
	}

	printShoeDetails(adidasShoe)
	printShirtDetails(adidasShirt)

	printShoeDetails(nikeShoe)
	printShirtDetails(nikeShirt)
}
