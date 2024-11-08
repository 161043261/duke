# CSS 层叠样式表

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
- \> 1: 选择对应序号的后代元素
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

- font-size 字体大小
- font-family 字体族
- font-style 字体风格
- font-weight 字体粗细
- font 复合属性

文本

- color 文本颜色
- letter-spacing 字符间距
- word-spacing 单词间距
- text-decoration 文本装饰
  - none 无装饰
  - dotted 虚线, wavy 波浪线
  - underline 下划线, overline 上划线, line-through 删除线
- text-indent 文本缩进
- text-align 文本水平对齐
  - left 左对齐 (默认)
  - right 右对齐
  - center 居中对齐
- line-height 行高
- vertical-align 文字垂直对齐

列表

- list-style-type 列表符号
- list-style-position 列表符号的位置
- list-style-image 列表符号的图片
- list-style 复合属性

表格

- border-width 边框宽度
- border-color 边框颜色
- border-style 边框风格
- border 复合属性

背景

- background-color 背景颜色: 默认 transparent
- background-image 背景图片
- background-repeat 背景的重复方式
  - repeat 重复, 默认
  - repeat-x 只在水平方向重复
  - repeat-y 只在垂直方向重复
- background-position 背景位置
- background 复合属性

鼠标

- 鼠标形状 cursor: pointer 手, move, text, crosshair, wait, help

## 盒子模型

### 长度单位

1. px 像素
2. em 相对元素 font-size 的倍数
3. rem 相对根元素 (html 标签) font-size 的倍数
4. % 相对父元素 font-size 的倍数

### 元素的显示模式

> 块元素 (block boxes)

1. 块盒子独占一行, 会换行
2. 默认宽度: 撑满父元素
3. 默认高度: 由内容撑开
4. 可以使用 css 设置宽高

> 行内元素 (inline boxes)

1. 行内盒子不独占一行, 不会换行
2. 默认宽度: 由内容撑开
3. 默认高度: 由内容撑开
4. 不能使用 css 设置宽高

#### 块级元素

- html, body
- h1...h6, hr, p, pre, div
- ul, ol, li, dl, dt, dd
- table, tbody, thead, tfoot, tr, caption
- form, option

#### 行内元素

- br, em, strong, sup, sub, del, ins
- a, label

#### 行内块元素

- img
- td, th
- input, textarea, select, button
- iframe

#### 修改元素的显示模式

| 值           | 描述                   |
| ------------ | ---------------------- |
| none         | 元素被隐藏             |
| block        | 元素作为块级元素显示   |
| inline       | 元素作为内联元素显示   |
| inline-block | 元素作为行内块元素显示 |

#### 盒子模型

- margin 外边距
- border 边框
- padding 内边距: padding-top, padding-right, padding-bottom, padding-left, padding
- content 内容: width, max-width, min-width, height, max-height, min-height

```css
padding: 10px; /* 上下左右 10px */
padding: 10px 20px; /* 上下 10px, 左右 20px */
padding: 10px 20px 30px; /* 上 10px, 左右 20px, 下 10px */
padding: 10px 20px 30px 40px; /* 上 10px, 右 20px, 下 30px, 左 40px */
```

1. padding 的值是正数
2. inline 行内元素 padding-left, padding-right 左右内边距设置有效
   padding-top, padding-bottom 上下内边距设置无效
3. block 块级元素, inline-block 行内块元素上下左右内边距 padding 设置都有效

#### 盒子边框 border

- 边框风格 border-style: none, solid, dashed, dotted, double
- 边框宽度 border-width
- 边框颜色 border-color
- 复合属性 border
- border-[left, right, top, bottom]-[style, width, color]

#### 盒子外边距 margin

- margin-left, margin-right, margin-top, margin-bottom
- 复合属性 margin

1. margin-top 上外边距, margin-left 左外边距: 影响自己的位置
2. margin-bottom 下外边距, margin-right 右外边距: 影响邻接兄弟的位置
3. inline 行内元素 margin-left, margin-right 左右外边距设置有效
   margin-top, margin-bottom 上下外边距设置无效
4. block 块级元素, inline-block 行内块元素上下左右外边距 margin 设置都有效

### 溢出处理

- overflow 溢出处理
  - visible 显示溢出内容
  - hidden 隐藏溢出内容
  - scroll 始终显示滚动条
  - auto 内容不溢出时不显示滚动条, 内容溢出时显示滚动条

### 隐藏元素的方式

1. 设置 visibility 属性: `visibility: hidden`
2. 设置 display 属性: `display: none`

### 样式继承

只继承与盒子模型无关的属性

- 继承的属性: 字体属性, 文本属性 (除了 vertical-align), 文字颜色
- 不继承的属性: 边框, 背景, 内边距, 外边距, 宽高, 溢出处理

### 布局技巧

1. inline 行内元素, inline-block 行内块元素, 可以视为文本, 使用 text-align, line-height, text-indent 等处理行内元素, 行内块元素
2. 子元素在父元素中水平居中
   1. 若子元素为块级元素, 则父元素设置 `margin: 0, auto`
   2. 若子元素为行内, 行内块元素, 则父元素设置 `text-align: center`
3. 子元素在父元素中垂直居中
   1. 若子元素为块元素, 则子元素设置 margin-top: (父元素 content - 子元素总高) / 2;
   2. 若子元素为行内, 行内块元素
      1. 父元素设置 `font-size: 0` (可选)
      2. 令父元素: height == line-height
      3. 子元素设置 `vertical-align: middle`

#### margin 塌陷问题

第一个子元素的上外边距 margin-top 转移给父元素, 最后一个子元素的下外边距 margin-bottom 转移给父元素

解决 margin 塌陷问题

1. 父元素设置 >0 的 padding
2. 父元素设置 >0 的 border
3. 父元素设置 css: `overflow: hidden`

#### margin 合并问题

上方兄弟元素的下外边距 margin-bottom 和下方兄弟元素的上外边距 margin-top 合并为 math.Max(margin-bottom, margin-top), 而不是 margin-bottom + margin-top

解决: 只为一个元素设置上/下外边距

#### 行内/行内块元素间的空白符问题

原因: 行内/行内块元素间的换行符, 会被浏览器解析为一个空白符

解决: 父元素设置 `font-size: 0`

#### 行内块上下空白问题

原因: 行内块元素被视为文本, 默认与文本的基线 baseline 对齐

解决

1. 行内块设置 `vertical: middle | bottom | top` 属性值 != baseline 即可
2. 若父元素是图片, 则设置 `display: block`
3. 父元素设置 `font-size: 0`

## 浮动

### 元素浮动后

1. 脱离文档流
2. 不独占一行
3. 宽高: 由内容撑开
4. 可以使用 css 设置宽高
5. 没有 margin 塌陷问题和 margin 合并问题, 可以很好的设置上右下左的 margin, padding
6. 浮动的行内块不被视为文本, 没有行内块上下空白问题

### 元素浮动后产生的影响

- 对未浮动的兄弟元素的影响
  - 前面的未浮动的兄弟元素: 无影响 (参考 "独占一行")
  - ! 后面的未浮动的兄弟元素, 会占据浮动元素未浮动时的位置 (参考 "未浮动")
- 对父元素的影响
  - ! 浮动元素不能撑开父元素的高度, 父元素高度塌陷
  - 父元素的宽度仍然限制浮动元素

### 解决浮动产生的影响 (清除浮动)

只解决父元素高度塌陷

1. 父元素指定 (内容的) 高度
   `parent.height = child.margin*2 + child.border-width*2  + child.padding*2`
2. 父元素也设置浮动, 会产生其他影响
3. 父元素设置 `overflow: hidden`

解决父元素高度塌陷, 后面的未浮动的兄弟元素, 会占据浮动元素未浮动时的位置

1. 所有浮动元素后面, 添加一个没有宽高, 没有内容的**块级**元素, 该元素设置 `clear: both`
   1. clear: left 清除前面所有左浮动兄弟元素产生的影响
   2. clear: right 清除前面所有右浮动兄弟元素产生的影响
   3. clear: both 清除前面所有浮动兄弟元素产生的影响
2. 使用伪元素: 在父元素后使用 `::after` 创建一个子元素

```css
.parent::after {
  content: "";
  display: block;
  clear: both;
}
```

布局原则: 设置浮动时, 父元素中的兄弟元素要么全部都浮动, 要么全部都不浮动
