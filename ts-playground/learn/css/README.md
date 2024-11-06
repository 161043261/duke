使用选择器列表时, 如果一个选择器无效, 则整个规则都会被忽略

```css
/* 整个规则都会被忽略 */
h1,
..special {
  color: blue;
}
```

### 选择器的种类

标签, 类, ID 选择器

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

标签属性选择器

```css
/* 选择存在 title 属性的 a 标签 */
a[title] {
}
/* 选择存在 href 属性, 且属性值为 "https://example.com" 的 a 标签 */
a[href="https://example.com"]
{
}
```

伪类和伪元素选择器

伪类: 一个元素的特定状态

```css
/* 鼠标悬浮在 a 标签上时, 选择该 a 标签 */
a:hover {
}
```

伪元素: 一个元素的部分

```css
/* 选择 p 标签的第一行 */
p::first-line {
}
```

运算符选择器

```css
/* 子代选择器 */
article > p {
}
```

```css
/* 将 :first-child 伪元素选择器作为 article 元素选择器的一个后代选择器 */
/* 选择所有 article 元素的第一个子元素 */
article :first-child {
}

/* 选择是父元素的第一个子元素的 article 元素 */
/* <div><article>text</article></div> */
/* 该 article 元素是父元素 div 的第一个子元素, 将被选中 */
article:first-child {
}

/* 选择所有 article 元素的第一个子元素 */
article *:first-child {
}
```
