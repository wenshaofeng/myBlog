# Sass 和 Scss

>Sass 和 SCSS 其实是同一种东西，我们平时都称之为 Sass。他们都是用Ruby开发 Css 预处理器，boostrap4已经将less换成了sass。

不同：
- 文件拓展名：分别是`sass`和`scss`
- 缩进：`sass`严格缩进（类似 `python` 和 `ruby`），`scss`是`css` 的缩进样式
- 是否兼容 css 语法：显然，由于缩进的不同，`scss`是兼容原生的 css 写法。

总的来说，`scss`是`sass`升级版，兼容 css 语法，并且有着自己的独立语法。

## 嵌套 

css 写法
```css
/* line 9, ../sass/style.scss */
#navbar {
  width: 80%;
  height: 23px;
}
/* line 13, ../sass/style.scss */
#navbar ul {
  list-style-type: none;
}
/* line 16, ../sass/style.scss */
#navbar li {
  float: left;
}
/* line 19, ../sass/style.scss */
#navbar li a {
  color: red;
}

```
scss

```scss
#navbar {
    width : 80%;
    height: 23px;

    ul {
        list-style-type: none;
    }
    li {
        float: left;

        a {
            color: red;
        }
    }
}
```

属性嵌套
```css
.item-border {
  border-style: solid;
  border-left-width: 1px;
  border-left-color: red;
  border-right-width: 2px;
  border-right-color: blue;
}

/*scss中*/

.item-border {
    border: {
        style: solid;

        left: {
            width: 1px;
            color: red;
        }
        right: {
            width: 2px;
            color: blue;
        }
    }
}
```

## 引用父选择器 

在SCSS文件中，可以利用&关键字来实现对父选择器的引用。 CSS：

```css
/* line 41, ../sass/style.scss */
.btn {
  color: #ccc;
}
/* line 43, ../sass/style.scss */
.btn:hover {
  color: red;
}
/* line 46, ../sass/style.scss */
.btn:visited {
  color: blue;
}
```
对应的SCSS:

```css
.btn {
    color: #ccc;
    &:hover {
        color: red;
    }
    &:visited {
        color: blue;
    }
}
```

## 变量
CSS

```css

/* line 53, ../sass/style.scss */
#navbar {
  border-bottom-color: #ccc;
  border-bottom-style: solid;
}

/* line 59, ../sass/style.scss */
a {
  color: #ccc;
}
/* line 61, ../sass/style.scss */
a:hover {
  border-bottom: 1px solid #ccc;
}
```
Scss:
```css
$text-color: #ccc;
$border-style: solid;
#navbar {
    border-bottom: {
        color: $text-color;
        style: $border-style;
    }
}
a {
    color: $text-color;
    &:hover {
        border-bottom: 1px $border-style #ccc;
    }
}
```

## 继承

可以通过`@extend`来进行属性的继承。 SCSS:

```css
.base-nav {
    color: red;
}
.new-nav {
    @extend .base-nav;
    text-align: center;
}
```



CSS：

```css
/* line 85, ../sass/style.scss */
.base-nav, .new-nav {
  color: red;
}

/* line 88, ../sass/style.scss */
.new-nav {
  text-align: center;
}
```



## Mixin

Mixin是SASS中非常强大的特性之一。定义mixin时，需要在前面加`@mixin`，使用时需要添加`@include`来引用该mixin。 SCSS:

```css
@mixin round-top {
    $side: top;
    $radius: 10px;

    border-#{$side}-radius: $radius;
    -moz-border-#{$side}-radius: $radius;
    -webkit-border-#{$side}-radiux: $radius;
}
#navbar li {
    @include round-top;
}
#footer {
    @include round-top;
}
```

对应的CSS:

```css
/* line 110, ../sass/style.scss */
#navbar li {
  border-top-radius: 10px;
  -moz-border-top-radius: 10px;
  -webkit-border-top-radiux: 10px;
}

/* line 113, ../sass/style.scss */
#footer {
  border-top-radius: 10px;
  -moz-border-top-radius: 10px;
  -webkit-border-top-radiux: 10px;
}
```

Mixin还有个强大的地方就是可以为它传入参数，并且还可以为参数设定默认值。 SCSS:

```css
@mixin round($side, $radius: 10px) {
    border-#{$side}-radius: $radius;
    -moz-border-#{$side}-radius: $radius;
    -webkit-border-#{$side}-radiux: $radius;
}

#navbar li {
    @include round(top);
}
#footer {
    @include round(top, 5px);
}
#sidebar {
    @include round(left, 8px);
}
```

CSS:

```css
/* line 126, ../sass/style.scss */
#navbar li {
  border-top-radius: 10px;
  -moz-border-top-radius: 10px;
  -webkit-border-top-radiux: 10px;
}

/* line 129, ../sass/style.scss */
#footer {
  border-top-radius: 5px;
  -moz-border-top-radius: 5px;
  -webkit-border-top-radiux: 5px;
}

/* line 132, ../sass/style.scss */
#sidebar {
  border-left-radius: 8px;
  -moz-border-left-radius: 8px;
  -webkit-border-left-radiux: 8px;
}
```

# 在项目中使用scss全局变量

