//
// Created by admin on 2024/10/15.
//

// Topic 智能指针

// * std::shared_ptr
// * std::unique_ptr
// * std::weak_ptr

#include <gtest/gtest.h>

#include <iostream>
#include <memory>

using namespace std;

void foo(const std::shared_ptr<int> &p) { (*p)++; }

/////////////////////////////////////////////////
///
/// std::shared_ptr 共享的指针指针
///
/////////////////////////////////////////////////

TEST(MakeSharedTest, TestMakeShared) {
  // int* p = new int{10}; // 非法
  // 使用 std::make_shared 创建 std::shared_ptr 智能指针
  auto sp = make_shared<int>(10);
  foo(sp);
  cout << *sp << '\n';
}

// auto p = make_shared<int>{10};
// p.get();
// 获取裸指针

// p.reset();
// 如果 p 指向的对象引用计数 >1，则将 p 置空，该对象的引用计数 -1
// 如果 p 指向的对象引用计数 =1，则回收该对象

// p.use_count()
// 获取 p 指向的对象的引用计数
TEST(Get_Set_UseCountTest, TestGet_Set_UseCount) {
  auto px = make_shared<int>(10);
  auto py = px;  // pointer 引用计数 +1
  auto pz = px;  // pointer 引用计数 +1

  cout << "px use_count: " << px.use_count() << '\n';  // 3
  cout << "py use_count: " << py.use_count() << '\n';  // 3
  cout << "pz use_count: " << pz.use_count() << '\n';  // 3

  cout << "==================== py reset ====================" << '\n';
  py.reset();  // 引用计数 -1

  cout << "px use_count: " << px.use_count() << '\n';  // 2
  cout << "py use_count: " << py.use_count() << '\n';  // 0
  cout << "pz use_count: " << pz.use_count() << '\n';  // 2

  cout << "==================== pz reset ====================" << '\n';
  pz.reset();

  cout << "px use_count: " << px.use_count() << '\n';  // 1
  cout << "py use_count: " << py.use_count() << '\n';  // 0
  cout << "pz use_count: " << pz.use_count() << '\n';  // 0
}

/////////////////////////////////////////////////
///
/// std::unique_str 独占的智能指针
///
/////////////////////////////////////////////////
TEST(MakeUniqueTest, TestMakeUnique) {
  unique_ptr<int> up = make_unique<int>(10);
  // unique_ptr<int> up2 = up; // 非法
}

struct Foo {
  Foo() { cout << "Constructing foo\n"; }

  ~Foo() { cout << "Destructing foo\n"; }

  void out(const string &prefix) { cout << prefix << "Mamba out!\n"; }
};

void say(const Foo &foo) { cout << "What can I say, haha!\n"; }

TEST(UniquePtrTest, TestUniquePtr) {
  unique_ptr<Foo> p1{make_unique<Foo>()};

  if (p1 != nullptr) {
    unique_ptr<Foo> p2{std::move(p1)};
    // construct
    say(*p2);

    if (p1 != nullptr) {
      p1->out("First -- ");
    }
    if (p2 != nullptr) {
      p2->out("Second -- ");
    }  // Second -- Mamba out!

    p1 = std::move(p2);

    if (p1 != nullptr) {
      p1->out("Third -- ");
    }  // Third -- Mamba out!
    if (p2 != nullptr) {
      p2->out("Fourth -- ");
    }
  }
  // destruct
}

struct Gopher;

struct Duke {
  shared_ptr<Gopher> gopher;
  Duke() { cout << "Constructing duke\n"; }
  ~Duke() { cout << "Destructing duke\n"; }
};

struct Gopher {
  shared_ptr<Duke> duke;
  Gopher() { cout << "Constructing gopher\n"; }
  ~Gopher() { cout << "Destructing gopher\n"; }
};

TEST(SharedPtrTest, TestSharedPtr) {
  auto aGopher = make_shared<Gopher>();
  auto aDuke = make_shared<Duke>();
  aGopher->duke = aDuke;
  aDuke->gopher = aGopher;
  assert(aGopher->duke.use_count() == 2);  // 2
  assert(aDuke->gopher.use_count() == 2);  // 2
  cout << "Shared pointer test return\n";
}

// Constructing gopher
// Constructing duke
// Shared pointer test return

// 问题：aGopher, aDuke 未被析构 -> 内存泄露
// 解决：使用弱引用指针 std::weak_ptr
// 强引用 std::shared_ptr, std::unique_ptr 引用计数会 +1
// 弱引用 std::weak_ptr 引用计数不会 +1

struct TypeScript;

struct Cplusplus {
  weak_ptr<TypeScript> typescript;
  Cplusplus() { cout << "Constructing cplusplus\n"; }
  ~Cplusplus() { cout << "Destructing cplusplus\n"; }
};

struct TypeScript {
  weak_ptr<Cplusplus> cplusplus;
  TypeScript() { cout << "Constructing typescript\n"; }
  ~TypeScript() { cout << "Destructing typescript\n"; }
};

TEST(WeakPtrTest, TestWeakPtr) {
  auto aCplusplus = make_shared<Cplusplus>();
  auto aTypeScript = make_shared<TypeScript>();
  aCplusplus->typescript = aTypeScript;
  aTypeScript->cplusplus = aCplusplus;
  assert(aCplusplus->typescript.use_count() == 1);  // 1
  assert(aTypeScript->cplusplus.use_count() == 1);  // 1
  cout << "Weak pointer test return\n";
}

// Constructing cplusplus
// Constructing typescript
// Weak pointer test return
// Destructing typescript
// Destructing cplusplus
