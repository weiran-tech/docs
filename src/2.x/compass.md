---
description: '该内容涉及LemonCMS中如何使用Compass管理样式文件，包括样式文件的命名规范、对SeaJS的调用，以及如何操控元素大小。'
lastUpdated: '2026-06-22 13:42:29'
head:
  - - meta
    - name: 'og:title'
      content: 'compass - LemonCMS'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '该内容涉及LemonCMS中如何使用Compass管理样式文件，包括样式文件的命名规范、对SeaJS的调用，以及如何操控元素大小。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech//2.x/compass.html'
---
# compass - LemonCMS

## 样式文件的管理

### 使用compass

使用compass 建立并且管理样式文件

```Plaintext
compass create myproject
compass install blueprint
compass install blueprint/link_icons
```

### 样式文件命名

**title**: 标题

**list** : 列表

左侧点状列表 \* list-greyDot: \* list-redDot:

**bdr**:边框

bdr-rad-s: bdr-rad-m: bdr-rad-l:

**alpha**: 背景透明度

不常用, 写在样式里

**table**: 基础的table样式

**btn** : 基础的按钮样式 button input:button

input, textarea(text) 滑过 默认 焦点

tip-error tip-success tip-warning

icon-s icon-m icon-l icon 元素的使用以及上下居中对齐

### 对seajs 的调用

```Plaintext
<script>
var lemon = lemon || {};
lemon.seajsBase = 'http://www.www.cc/mark/re/Public/Js/';
</script>
<script src="http://www.www.cc/mark/re/Public/Js/global.js"></script>
<script src="http://www.www.cc/mark/re/Public/Js/libs/seajs/2.2.0/seajs.js"></script>
<script src="http://www.www.cc/mark/re/Public/Js/libs/config.js"></script>
```

## 对元素的大小进行操控

.select-s .select .select-l

.checklist .checklist-line

.date .date-s .date-l