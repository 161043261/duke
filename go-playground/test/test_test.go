package test

import (
	"fmt"
	"strconv"
	"testing"
)

func TestForRange(t *testing.T) {
	type stu struct {
		id   int
		name string
	}
	stus := []stu{}
	for i := range 3 {
		stus = append(stus, stu{
			id:   i,
			name: "stu" + strconv.Itoa(i),
		})
	}

	for i, stu /* 值拷贝 */ := range stus {
		stu.name = "prof" + strconv.Itoa(i)
	}
	fmt.Println(stus)
}
