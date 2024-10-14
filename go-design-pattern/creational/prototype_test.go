package creational

import (
	"fmt"
	"testing"
)

// 原型模式是一种创建型设计模式
// ! 原型模式即为父类和子类提供统一的深拷贝方法
// 原型模式使得调用者可以复制对象，甚至是复杂对象，无需依赖对象所属的类

// 所有的原型类都必须有一个通用的接口
// 使得在对象所属的类未知的情况下，也可以复制对象

// 通过操作系统的文件系统理解原型模式
// 操作系统的文件系统是递归的，目录中包含文件和子目录，子目录也包含...

// 每个文件和目录都可以用一个 INode 接口表示
// INode 接口包含 print 打印和 copy 深度复制方法
// File 文件结构体和 Dir 目录结构体都实现了 print 和 copy 方法

// INode 原型接口
type INode interface {
	print(string)
	copy() INode
}

// File 具体原型
type File struct {
	name string
}

func (file *File) print(indentation string) {
	fmt.Println(indentation + file.name)
}

func (file *File) copy() INode {
	return &File{name: file.name + "_copied"}
}

// Dir 具体原型
type Dir struct {
	subDirs []INode
	name    string
}

func (dir *Dir) print(indentation string) {
	fmt.Println(indentation + dir.name)
	for _, subDir := range dir.subDirs {
		subDir.print(indentation + "    ")
	}
}

func (dir *Dir) copy() INode {
	copiedDir := &Dir{name: dir.name + "_copied"}
	var tmpSubDirs []INode
	for _, subDir := range dir.subDirs {
		copiedSubDir := subDir.copy()
		tmpSubDirs = append(tmpSubDirs, copiedSubDir)
	}
	copiedDir.subDirs = tmpSubDirs
	return copiedDir
}

// TestPrototype 测试客户端
func TestPrototype(t *testing.T) {
	file1 := &File{name: "file1"}
	file2 := &File{name: "file2"}
	file3 := &File{name: "file3"}
	dir1 := &Dir{
		subDirs: []INode{file1},
		name:    "dir1",
	}
	dir2 := &Dir{
		subDirs: []INode{dir1, file2, file3},
		name:    "dir2",
	}
	fmt.Println("Tree dir2")
	dir2.print("    ")
	copiedDir := dir2.copy()
	fmt.Println("Tree copiedDir")
	copiedDir.print("    ")
}
