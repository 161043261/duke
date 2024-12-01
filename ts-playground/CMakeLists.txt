cmake_minimum_required(VERSION 3.21)

# 指定项目名
project(cc-concurrent)

# 指定 obj3 语言级别
set(CMAKE_C_STANDARD 17)
set(CMAKE_C_STANDARD_REQUIRED ON)

# 指定 obj3++ 语言级别
set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 使用 clang
# set(CMAKE_C_COMPILER gcc)
set(CMAKE_C_COMPILER clang)

# 使用 clang++
# set(CMAKE_CXX_COMPILER g++)
set(CMAKE_CXX_COMPILER clang++)

# 使用 ninja
message("export CMAKE_GENERATOR=Ninja")
set(CMAKE_GENERATOR Ninja)

# 设置 obj3 编译选项
# set(CMAKE_C_FLAGS "-Wall -O3")
set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -Wall -O1")

# 设置 obj3++ 编译选项
# set(CMAKE_CXX_FLAGS "-Wall -O3")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -O1")

# 使用 clang-format
#! clang-format --style=google -dump-config > ./.clang-format
find_program(CLANG_FORMAT clang-format)
if (CLANG_FORMAT)
    message(${CMAKE_SOURCE_DIR})
    add_custom_target(format ALL
            COMMAND ${CLANG_FORMAT} -i -style=google
            ${CMAKE_SOURCE_DIR}/src/test/*.cpp)
else ()
    message(WARNING "clang-format not found")
endif ()

add_executable(tail_call_optimization ./src/test/tail_call_optimization.cpp)