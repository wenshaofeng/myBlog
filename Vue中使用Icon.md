## Iconfont 简介

**icon font** ，图标字体，也叫字体图标，顾名思义，就是字体做的图标。受到近些年 **扁平化设计** 的影响，越来越多的图标都开始使用 **icon font**

### 优点

1. 自由的变化大小，且不会模糊
2. 比图片小，加载快
3. 可以任意改变颜色

### 缺点

1. 只能被渲染成单色或者CSS3的渐变色
2. 创作自已的字体图标很费时间，重构人员后期维护的成本偏高。

###  **@font-face** 的语法规则：

```css
@font-face {
    font-family: <YourWebFontName>;
    src: <source> [<format>][,<source> [<format>]]*;
    [font-weight: <weight>];
    [font-style: <style>];
}
```

**取值说明：**

- YourWebFontName：字体名称，他将被引用到元素中的 **font-family** 上
- source：字体的存放路径，跟css引用图片一样；
- format：字体的格式，主要用来帮助浏览器识别，其值主要有以下几种类型：**truetype** , **opentype** , **truetype-aat** , **embedded-opentype** , **svg** 等；
- weight和style：这两个值大家一定很熟悉，weight定义字体是否为粗体，style主要定义字体样式，如斜体。



>**WebFont** 技术可以让网页使用在线字体，在国外，**WebFont** 已经非常流行了，大量的网站使用了 **WebFont** 技术，而业界大佬 Google 也顺势推出的免费 **WebFont** 云托管服务，这一切均带动了国外字体制作行业的高速发展。
>
>为什么是国外呢，那是因为中文字体比较尴尬，英文字体只有26个字母，一套字体不过几十 **KB** ，而汉字却有数万个，导致字体文件通常有好几 **MB** 大小，再加上国内的网络环境，显然不现实。
>
>所以中文的 **特殊字体** 必须经过压缩才能使用，怎么压缩呢，请看 **腾讯ISUX** 开发的 [中文字体压缩器--字蛛（FontSpider）](http://font-spider.org/) 。

来源：不二很纯洁

链接：https://www.jianshu.com/p/aabf03b150c7

## Iconfont 使用方式

### unicode

- 建立文件夹

- main.js引入
```js
@import './icon/iconfont.css'
```

- 应用

  `<i class="iconfont">&#xe627;</i>`

### font-class

- 建立文件夹

- main.js引入
```js
@import './icon/iconfont.css'
```


- 应用

  `<i class="iconfont icon-fenxiang"></i>`

###  symbol



## vant 中使用

- 建立文件夹

- main.js引入
```js
@import './icon/iconfont.css'
```

- 修改 `iconfont.css`文件
```css
@font-face {
  font-family: "iconfont";
  src: url('iconfont.ttf?t=1557749337321') format('truetype');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-chaxun:before {
  content: "\e600";
}
```
