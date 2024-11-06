# CSS

使用选择器列表 (并集选择器) 时, 如果一个选择器无效, 则整个规则都会被忽略

```css
/* ..special 无效, 整个规则都会被忽略 */
h1,
..special {
  color: blue;
}
```

## 选择器的种类

### 标签 (元素) 选择器

```css
/* 全局选择器 */
* {
}
/* 标签 (元素) 选择器 */
h1 {
}
/* 类选择器 */
.box {
}
/* ID 选择器 */
#unique {
}
```

> 区分后代和子代

```css
/* 将 :first-child 伪元素选择器作为 article 元素选择器的一个后代选择器 */
/* 选择所有 article 元素的第一个后代元素 */
article :first-child {
}

/* 选择是父元素的第一个后代元素的 article 元素 */
/* <div>
     <article>
       选我
     </article>
   </div> */
/* 该 article 元素是父元素 div 的第一个后代元素, 将被选中 */
article:first-child {
}

/* 选择所有 article 元素的第一个后代元素 */
article *:first-child {
}
```

选择有 highlight 类的 span 标签 (本质是交集选择器)

```css
span.highlight {
}
```

交集选择器

```html
<style>
  .notebox {
    border: 4px solid #666;
    padding: 0.5em;
  }

  /* 交集选择器, 选择有 notebook 类和 warning 类的元素 */
  .notebox.warning {
    border-color: orange;
    font-weight: bold;
  }
</style>

<div class="notebox warning">This note shows a warning.</div>
```

```css
/* 并集选择器, 选择 id = heading 的 h1 标签 */
h1#heading {
  color: lightpink;
}
```

### 类选择器

```css
/* 选择存在 title 属性的 a 标签 */
a[title] {
}
/* 选择存在 href 属性, 且属性值 = "https://example.com" 的 a 标签 */
a[href="https://example.com"]
{
}
/* 选择存在 class 属性, 且属性值有一个或多个 special 的 p 标签 */
p[class~="special"] {
}
/* 选择存在 lang 属性, 且属性值以 zh- 开头的 div 标签 */
/* 例: <div lang="zh-CN"></div> */
div[lang|="zh"] {
}
```

子字符串匹配选择器

JS 的正则表达式 `/^\/api/`

```css
/* 选择存在 class 属性, 且属性值以 box- 开头的 li 标签 */
li[class^="box-"] {
}

/* 默认大小写敏感 */
/* 使用 i 值, 大小写不敏感 */
li[class^="box-" i] {
}

/* 选择存在 class 属性, 且属性值以 -box 结尾的 li 标签 */
li[class$="-box"] {
}
/* 选择存在 class 属性, 且属性值包含 box 子串的 li 标签 */
li[class*="box"] {
}
```

### 伪类和伪元素选择器

**伪类: 一个元素的状态, 以 : 开头**

| 一组兄弟元素中         |                                                   |
| ---------------------- | ------------------------------------------------- |
| div :first-child       | div 的第一个后代元素                              |
| div :last-child        | div 的最后一个后代元素                            |
| div :nth-child(n)      | div 的第 n 个后代元素                             |
| div :nth-last-child(n) | div 的倒数第 n 个后代元素                         |
| div :only-child        | div 唯一的后代元素                                |
| div p:first-of-type    | div 的后代 p 元素中的第一个                       |
| div p:last-of-type     | div 的后代 p 元素中的最后一个                     |
| div p:nth-of-type(n)   | div 的后代 p 元素中的第 n 个                      |
| div p:only-of-type     | div 唯一的后代 p 元素                             |
| :invalid               | 选择未通过校验的 form, fieldset, input 等表单元素 |

关于 :nth-child(n), :nth-last-child(n) 中的 n

- 0 或空: 不选择任何后代元素
- n: 选择所有的后代元素
- > 1: 选择对应序号的后代元素
- 2n 或 even: 选择序号为偶数的后代元素
- 2n 或 odd: 选择序号为奇数的后代元素
- -n+3: 选择前 3 个后代元素

```html
<style>
  article p:first-child {
  }
  article p:first-child {
  }
</style>

<article>
  <div>
    <p>第一个后代元素</p>
    <p>第二个后代元素</p>
    <p>最后一个后代元素</p>
  </div>
</article>
```

**动态伪类**

- :hover 鼠标悬浮的元素
- :link 未访问的超链接
- :visited 已访问的超链接
- :active 鼠标点击的元素
- :focus 获得焦点的元素

```css
/* 鼠标悬浮时, 选择该 a 标签 */
a:hover {
}
```

**伪元素: 一个元素的部分, 以 :: 开头**

- ::first-letter 选择第一个字符
- ::first-line 选择第一行
- ::selection 匹配鼠标选择的内容
- ::placeholder 选择输入框的提示文字 (占位符)
- p::before 在 p 元素前创建一个子元素, content 属性指定元素的内容
- p::after 在 p 元素后创建一个子元素, content 属性指定元素的内容

```css
/* 选择 p 标签的第一行 */
p::first-line {
}
```

```html
<style>
  .box::before {
    content: "Hello ";
  }

  .box::after {
    content: "";
    display: block;
    width: 100px;
    height: 100px;
    background-color: lightpink;
    border: 1px solid black;
  }
</style>

<body>
  <div class="box">World</div>
</body>
```

### 关系选择器

- 后代选择器 空格
- 子代选择器 >
- 邻接兄弟选择器 +
- 通用兄弟选择器 ~

```css
/* 选择 ul 元素的有 a 类的 li 子代元素 */
ul > li[class="a"] {
}
```

- 优先级: id 选择器 > 类选择器 > 标签选择器

## CSS 三大特性

1. 层叠性: 如果有样式冲突, 则根据选择器优先级, 层叠 (覆盖) 样式
2. 继承性: 元素继承父元素或祖先元素的某些样式
3. 优先级: !important > 行内样式 > ID 选择器 > 类选择器 > 标签选择器 > \* > 继承的样式

颜色

```css
* {
  /* RGB 表示 */
  color: rgb(255, 0, 0); /* 红色 */
  color: rgb(0, 255, 0); /* 绿色 */
  color: rgb(0, 0, 255); /* 蓝色 */
  /* HEX 十六进制表示 */
  color: #ff0000;
  color: #00ff00;
  color: #0000ff;
}
```

字体

- 字体大小 font-size
- 字体族 font-family
- 字体风格 font-style
- 字体粗细 font-weight
- 复合属性 font

文本

- 文本颜色 color
- 字符间距 letter-spacing
- 单词间距 word-spacing
- 文本装饰 text-decoration
  - none 无装饰
  - dotted 虚线, wavy 波浪线
  - underline 下划线, overline 上划线, line-through 删除线
- 文本缩进 text-indent
- 文本水平对齐 text-align
  - left 左对齐 (默认)
  - right 右对齐
  - center 居中对齐
- 行高 line-height
- 文字垂直对齐 vertical-align

列表

- 列表符号 list-style-type
- 列表符号的位置 list-style-position
- 列表符号的图片 list-style-image
- 复合属性 list-style

表格

- 边框宽度 border-width
- 边框颜色 border-color
- 边框风格 border-style
- 复合属性 border

背景

- 背景颜色 background-color: 默认 transparent
- 背景图片 background-image
- 背景的重复方式 background-repeat
  - repeat 重复, 默认
  - repeat-x 只在水平方向重复
  - repeat-y 只在垂直方向重复
- 背景位置 background-position
- 复合属性 background

鼠标

- 鼠标 cursor: pointer 手, move, text, crosshair, wait, help
