package creational

// 生成器模式是一种创建型设计模式
// 生成器模式使得客户端可以分步骤创建复杂产品对象

// 与其他创建型模式不同，生成器不要求产品有通用的接口

// 当生产复杂产品有多个步骤时 (Window Type, Door Type, Num Floor)，可以使用生成器模式
// 这种情况下，使用多个工厂方法比使用一个复杂、可怕的单个工厂方法更简单

import (
	"fmt"
	"testing"
)

// House 产品
type House struct {
	windowType string
	doorType   string
	numFloor   int
}

// IBuilder 生成器接口
type IBuilder interface {
	setWindowType()
	setDoorType()
	setNumFloor()
	getHouse() House
}

func getBuilder(builderType string) IBuilder {
	switch builderType {
	case "normal":
		return newNormalBuilder()
	case "igloo":
		return newIglooBuilder()
	default:
		return nil
	}
}

// NormalBuilder 普通房屋生成器（具体生成器）
type NormalBuilder struct {
	windowType string
	doorType   string
	numFloor   int
}

func newNormalBuilder() *NormalBuilder {
	return &NormalBuilder{}
}

func (builder *NormalBuilder) setWindowType() {
	builder.windowType = "Wooden Window"
}

func (builder *NormalBuilder) setDoorType() {
	builder.doorType = "Wooden Door"
}

func (builder *NormalBuilder) setNumFloor() {
	builder.numFloor = 2
}

func (builder *NormalBuilder) getHouse() House {
	return House{
		windowType: builder.windowType,
		doorType:   builder.doorType,
		numFloor:   builder.numFloor,
	}
}

// IglooBuilder 冰屋生成器（具体生成器）
type IglooBuilder struct {
	windowType string
	doorType   string
	numFloor   int
}

func newIglooBuilder() *IglooBuilder {
	return &IglooBuilder{}
}

func (builder *IglooBuilder) setWindowType() {
	builder.windowType = "Snow Window"
}

func (builder *IglooBuilder) setDoorType() {
	builder.doorType = "Snow Door"
}

func (builder *IglooBuilder) setNumFloor() {
	builder.numFloor = 1
}

func (builder *IglooBuilder) getHouse() House {
	return House{
		windowType: builder.windowType,
		doorType:   builder.doorType,
		numFloor:   builder.numFloor,
	}
}

// Director 指导产品的生产过程
type Director struct {
	builder IBuilder
}

func newDirector() *Director {
	return &Director{}
}

func (director *Director) setBuilder(builder_ IBuilder) {
	director.builder = builder_
}

func (director *Director) buildHouse() House {
	// 分步骤创建复杂产品对象
	director.builder.setWindowType()
	director.builder.setDoorType()
	director.builder.setNumFloor()
	return director.builder.getHouse()
}

// TestBuilder 测试客户端
func TestBuilder(t *testing.T) {
	director := newDirector()
	normalBuilder := getBuilder("normal")
	iglooBuilder := getBuilder("igloo")

	director.setBuilder(normalBuilder)
	normalHouse := director.buildHouse()
	fmt.Printf("Normal House ->\tDoor Type: %v\tWindow Type: %v\tNum Floor: %v\n",
		normalHouse.doorType, normalHouse.windowType, normalHouse.numFloor)

	director.setBuilder(iglooBuilder)
	iglooHouse := director.buildHouse()
	fmt.Printf("Igloo House ->\tDoor Type: %v\tWindow Type: %v\tNum Floor: %v\n",
		iglooHouse.doorType, iglooHouse.windowType, iglooHouse.numFloor)
}
