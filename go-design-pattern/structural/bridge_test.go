package structural

// Why golang developers call themselves gopher?
import (
	"fmt"
	"testing"
)

// 桥接模式是一种结构性设计模式
// 可以将业务拆分为不同的层次

// 层次结构
// 1. 层次结构的第一层：抽象层
// 2. 层次结构的第二层：实现层

// Apple -----*                            *--- Epson
//            |         "Bridge"           |
//            *--- Phone ------ Printer ---*
//            |                            |
// Samsung ---*                            *------ Hp

// Printer 打印机抽象层
type Printer interface {
	PrintFile()
}

// Epson 实现层，Epson 打印机
type Epson struct {
}

func (epson *Epson) PrintFile() {
	fmt.Println("Printing by an Epson printer")
}

// Hp 实现层，Hp 打印机
type Hp struct {
}

func (hp *Hp) PrintFile() {
	fmt.Println("Printing by a Hp printer")
}

// Phone 手机抽象层
type Phone interface {
	Print()
	SetPrinter(Printer)
}

// Samsung 实现层，Samsung 手机
type Samsung struct {
	printer Printer
}

func (samsung *Samsung) Print() {
	fmt.Println("Print request for Samsung")
	samsung.printer.PrintFile()
}

func (samsung *Samsung) SetPrinter(printer_ Printer) {
	samsung.printer = printer_
}

// Apple 实现层，Apple 手机
type Apple struct {
	printer Printer
}

func (apple *Apple) Print() {
	fmt.Println("Print request for Apple")
	apple.printer.PrintFile()
}

func (apple *Apple) SetPrinter(printer_ Printer) {
	apple.printer = printer_
}

// TestBridge 测试客户端
func TestBridge(t *testing.T) {
	epsonPrinter := &Epson{}
	hpPrinter := &Hp{}

	// Print request for Apple
	// Printing by an Epson printer
	// Print request for Apple
	// Printing by a Hp printer
	iphone := &Apple{}
	iphone.SetPrinter(epsonPrinter)
	iphone.Print()
	iphone.SetPrinter(hpPrinter)
	iphone.Print()

	// Print request for Samsung
	// Printing by an Epson printer
	// Print request for Samsung
	// Printing by a Hp printer
	galaxy := &Samsung{}
	galaxy.SetPrinter(epsonPrinter)
	galaxy.Print()
	galaxy.SetPrinter(hpPrinter)
	galaxy.Print()
}
