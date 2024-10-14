package structural

import (
	"fmt"
	"testing"
)

// 适配器是一种结构性设计模式
// 适配器用于不兼容的对象间的通信

// Computer 接口提供 InsertIntoUSBPort 方法，插入 USB 接口
// Legion 有 USB 接口
// MacBook 有闪电接口，没有 USB 接口（MacBook 和 USB 设备不兼容）
// Adaptor 适配器可以将 USB 信号转换为 Lightning 信号
type Computer interface {
	InsertIntoUSBPort()
}

type Legion struct /* implements Computer */ {

}

func (legion *Legion) InsertIntoUSBPort() {
	fmt.Println("USB device is inserted into Legion.")
}

type MacBook struct {
}

func (macbook *MacBook) InsertIntoLightningPort() {
	fmt.Println("Lightning device is inserted into MacBook.")
}

type Adapter struct /* implements Computer */ {
	macbook *MacBook
}

func (adapter *Adapter) InsertIntoUSBPort() {
	fmt.Println("Adapter converts USB to Lightning.")
	adapter.macbook.InsertIntoLightningPort()
}

type Client struct {
}

func (client *Client) InsertUSBDeviceIntoComputer(computer Computer) {
	fmt.Println("[*] Client inserts USB device into computer.")
	computer.InsertIntoUSBPort()
}

func TestAdaptor(t *testing.T) {
	legion := &Legion{}
	client := &Client{}
	// Client inserts USB device into computer.
	// USB device is inserted into Legion.
	client.InsertUSBDeviceIntoComputer(legion)
	macbook_ := &MacBook{}
	adapter := &Adapter{macbook: macbook_}
	// Client inserts USB device into computer.
	// Adapter converts USB to Lightning.
	// Lightning device is inserted into MacBook.
	client.InsertUSBDeviceIntoComputer(adapter)
}
