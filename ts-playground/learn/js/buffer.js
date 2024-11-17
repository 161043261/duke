// alloc: 分配一块已初始化的内存区域, 没有脏数据
let buf = Buffer.alloc(10);
// allocUnsafe: 分配一块未初始化的内存区域, 可能有脏数据
let buf1 = Buffer.allocUnsafe(10);

// 使用字符串创建 Buffer
let buf2 = Buffer.from("Hello");
// 调用 toString 方法, 将 Buffer 转为字符串 (UTF-8)
console.log(buf2.toString()); // Hello

// 使用数组创建 Buffer
let buf3 = Buffer.from([108 /* l */, 111 /* o */, 118 /* v */, 101 /* e */]);

// Buffer 可以使用 [] 读写字节
console.log(buf3.toString()); // love
buf3[0] = 76; // 'L'
console.log(buf3[0]); // 76
console.log(buf3.toString()); // Love
