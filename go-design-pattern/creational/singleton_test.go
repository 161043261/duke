package creational

import (
	"log"
	"sync"
	"testing"
)

// 单例模式是一种创建型设计模式
// 单例模式可以保证一个类只有一个实例，提供一个访问该实例的全局方法

// 在结构体中定义一个 getInstance 方法，该方法负责创建和返回该单例
// 创建后，每次调用 getInstance 方法时，都返回该单例

// 创建一个互斥锁 sync.Mutex 实例，返回该实例的指针
var lock = /* *sync.Mutex */ &sync.Mutex{}

// 创建一个等待组 sync.WaitGroup 实例
var wg sync.WaitGroup

type Singleton struct{}

var instance *Singleton // 单例

func NewInstance1() *Singleton {
	defer wg.Done()
	if instance == nil {
		lock.Lock()
		defer lock.Unlock()
		if instance == nil { // 双重检查锁
			instance = &Singleton{}
		}
	}
	log.Println("&instance =", &instance)
	return instance
}

// TestSingleton1 测试客户端
// * go test -run TestSingleton1 -timeout 30s
func TestSingleton1(t *testing.T) {
	for i := 0; i < 30; i++ {
		wg.Add(1)
		go NewInstance1()
	}
	wg.Wait()
}

// ! 使用 sync.Once 优化
var once sync.Once

func NewInstance2() *Singleton {
	defer wg.Done()
	once.Do(func() {
		instance = &Singleton{}
	})
	log.Println("&instance =", &instance)
	return instance
}

// TestSingleton2 测试客户端
// * go test -run TestSingleton2 -timeout 30s
func TestSingleton2(t *testing.T) {
	for i := 0; i < 30; i++ {
		wg.Add(1)
		go NewInstance2()
	}
	wg.Wait()
}
