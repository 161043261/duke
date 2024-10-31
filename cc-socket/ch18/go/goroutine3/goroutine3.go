package main

import (
	"fmt"
	"sync"
)

const NUM_THREAD = 100

var sum = 0

func main() {
	//! 主协程创建 WaitGroup 实例 wg
	var wg sync.WaitGroup
	//! 主协程调用 wg.Add(n) 方法, n 是协程组中, 等待的协程数量
	wg.Add(NUM_THREAD)
	for i := 0; i < NUM_THREAD; i++ {
		if i%2 == 0 {
			go add(&wg)
		} else {
			go sub(&wg)
		}
	}
	//! 主协程调用 wg.Wait() 方法, 等待协程组中的每个协程运行结束
	wg.Wait()
	fmt.Printf("sum = %d\n", sum)
}

func add(wg *sync.WaitGroup) {
	//! 协程组的每个协程函数中 `defer wg.Done()`
	defer wg.Done()
	for i := 0; i < 50_000_000; i++ {
		sum += 1
	}
}

func sub(wg *sync.WaitGroup) {
	defer wg.Done()
	for i := 0; i < 50_000_000; i++ {
		sum -= 1
	}
}