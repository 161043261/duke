# CSS

使用选择器列表时, 如果一个选择器无效, 则整个规则都会被忽略

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

> 区分后代和子代!

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

选择有 highlight 类的 span 标签 (本质是并集选择器)

```css
span.highlight {
}
```

并集选择器

```html
<style>
  .notebox {
    border: 4px solid #666;
    padding: 0.5em;
  }

  /* 并集选择器, 选择有 notebook 类和 warning 类的元素 */
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

伪类: 一个元素的状态, 以 : 开头

一组兄弟元素中

- :first-child 第一个后代元素
- :last-child 最后一个后代元素
- :only-child 唯一的后代元素
- :nth-child(n) 第 n 个后代元素
- :nth-last-child(1) 倒数第 n 个后代元素
- :invalid 选择未通过校验的 form, fieldset, input 等表单元素

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

用户行为伪类 (动态伪类)

- :hover 鼠标悬浮的元素
- :focus 获得焦点的元素

```css
/* 鼠标悬浮时, 选择该 a 标签 */
a:hover {
}
```

伪元素: 一个元素的部分, 以 :: 开头

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
/* 子代选择器 */
article > p {
}
```
