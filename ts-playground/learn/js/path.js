//? path.resolve  拼接绝对路径
//? path.sep      获取操作系统的路径分隔符
//? path.parse    解析路径, 返回 path.ParsedPath 对象
//? path.basemame 获取文件名
//? path.dirname  获取目录名
//? path.extname  获取扩展名

// import { sep, resolve, parse, basename, dirname, extname } from "path";

const path = require("path");

console.log(path.sep);
const pathname = path.resolve(__dirname, "buffer.js");

console.log(pathname);
console.log(path.parse(pathname));
console.log(path.basename(pathname));
console.log(path.dirname(pathname));
console.log(path.extname(pathname));

const http_ = require('./http.js')
console.log(http_)
