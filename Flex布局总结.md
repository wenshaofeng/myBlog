# Flex布局

## 基本概念

采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071004.png)

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做`main start`，结束位置叫做`main end`；交叉轴的开始位置叫做`cross start`，结束位置叫做`cross end`。

项目默认沿主轴排列。单个项目占据的主轴空间叫做`main size`，占据的交叉轴空间叫做`cross size`。

**注意**，设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效。

## 属性 

### 容器属性
```
- flex-direction
- flex-wrap
- flex-flow
- justify-content
- align-items
- align-content
```

大部分应用场景

| 属性            | 含义         | 值                                                                        | 常用值                                         |
| --------------- | ------------ | ------------------------------------------------------------------------- | ---------------------------------------------- |
| flex-direction  | 项目排列方向 | row(默认)、row-reverse、column、column-reverse                            | row / column                                   |
| flex-wrap       | 项目是否换行 | nowrap(默认)、wrap、wrap-reverse                                          | wrap（允许换行）                               |
| justify-content | 水平对齐方向 | flex-start(默认)、flex-end、center、space-between、space-around           | center(**水平居中**)/ space-around(等间距布局) |
| align-items     | 垂直对齐方向 | flex-start、flex-end、center、baseline、stretch(默认: 占满整个容器的高度) | center(**垂直居中**)                           |
| align-content   | 垂直方向多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。 | flex-start、flex-end、center、space-between、space-around、stretch(默认: 占满整个容器的高度) | 常和**flex-wrap : wrap**一起使用                      |

### 子元素属性

```
order
flex-grow
flex-shrink
flex-basis
flex
align-self
```

常用

| 属性       | 含义                                                         | 值                                                           | 常用值 |
| :--------- | :----------------------------------------------------------- | :----------------------------------------------------------- | ------ |
| order      | 项目本身的排列顺序                                           | 整数，默认为 0。越小越靠前                                   | 整数   |
| flex-grow  | 项目的放大比例                                               | ≥0 的整数，默认为 0                                          | 1      |
| flex       | flex-grow, flex-shrink 和 flex-basis的简写                   | 默认值为0 1 auto。后两个属性可选。                           | 1      |
| align-self | 允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。 | align-self: auto / flex-start / flex-end / center / baseline / stretch;，默认为 auto | 1      |

### flex的坑

flex布局仅仅影响容器的一级子元素。例如下面这段代码：

```html

<html>
<head>
  <style>
    .level1 {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  </style>
</head>
<body>
  <div class="level1">
    <div class="level2">
      <span>1</span>
      <span>2</span>
      <span>3</span>
    </div>
  </div>
</body>
</html>
```

level2 类就不是水平垂直居中的，因为水平垂直居中仅仅影响到了`level2`，而**不会进一步向下”污染“更深级别的子元素的布局样式**。

如果要让 level2 也实现水平垂直居中，我们可以专门封装一个用于水平垂直居中的类，代码如下：

```html
<html>
<head>
  <style>
    .center {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  </style>
</head>
<body>
  <div class="level1 center">
    <div class="level2 center">
      <span>1</span>
      <span>2</span>
      <span>3</span>
    </div>
  </div>
</body>
</html>
```

