记录一些样式遇到的问题

### 页面的样式

页面的样式和组件是一个道理，全局的 `@/style` 放置一下全局公用的样式，每一个页面的样式就写在当前 `views`下面，请记住加上scoped 或者命名空间，避免造成全局的样式污染。

```css
<style>
/* global styles */
</style>

<style scoped>
/* local styles */
.xxx-container{
  /* name scoped */
  xxx
}
</style>

```

### 修改引用的第三方组件库组件的样式 (如element ui)


>由于element-ui的样式我们是在全局引入的，所以你想在某个view里面覆盖它的样式就不能加scoped，但你又想只覆盖这个页面的element样式，你就可在它的父级加一个class，以用命名空间来解决问题。

```javascript
.aritle-page{ //你的命名空间
    .el-tag { //element-ui 元素
      margin-right: 0px;
    }
}

```

建议向楼主一样专门建一个scss文件里专门自定义element-ui的各种样式。[线上代码](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/styles/element-ui.scss)


转自花裤衩
链接：https://juejin.im/post/593121aa0ce4630057f70d35

### 布局
布局的几个常用属性
- display
- position
- float
- flexbox
- 盒模型

布局方式
- position 布局
- float 布局
- inline-block 布局
- flex 布局


#### display 确定元素的显示类型
- block
- inline
- inline-block

#### position 确定元素的位置
- static
>`static` 是默认值。任意 position: static; 的元素不会被特殊的定位。一个 static 元素表示它不会被“positioned”，一个 position 属性被设置为其他值的元素表示它会被“positioned”。
- relative 
>设置top、right 这些方向的时候相对于其原来的位置，且会占据住本身的空间
- absolute（脱离文档流）
>如果绝对定位（position属性的值为absolute）的元素没有“positioned”祖先元素，那么它是相对于文档的 body 元素，并且它会随着页面滚动而移动。记住一个“positioned”元素是指 position 值不是 static 的元素。
- fixed
>相对于视窗

#### flexbox

阮一峰博客
弹性布局

#### float
- 元素浮动
- 脱离文档流
- 不脱离文本流
 
#### inline-block （常用于定宽）
- 像文本一样排列block元素
- 不需要清除浮动
- 需要处理间隙
>父元素的font-size 设置为0，子元素再设置回去


### css修改scroll样式
1. 给需要设置滚动条的容器加上class:topnav_box

2. 接下来css.,

```css
.topnav_box::-webkit-scrollbar    //滚动条整体部分

{  
    width: 5px;  
    height:10px;     

   background-color:#b5b1b1;

}  
.topnav_box::-webkit-scrollbar-track       //scroll轨道背景
{  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
    border-radius: 10px; 
      background-color:black;    

}




.topnav_box::-webkit-scrollbar-thumb  滚动条中能上下移动的小块
{  
    border-radius: 10px;  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
   background-color:#b5b1b1;
} 
```

3. 自定义滚动条

滚动条组成:
```css
::-webkit-scrollbar 滚动条整体部分
::-webkit-scrollbar-thumb  滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条）
::-webkit-scrollbar-track  滚动条的轨道（里面装有Thumb）
::-webkit-scrollbar-button 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置。
::-webkit-scrollbar-track-piece 内层轨道，滚动条中间部分（除去）
::-webkit-scrollbar-corner 边角，即两个滚动条的交汇处
::-webkit-resizer 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件
```

### css中引用路径


```
js中:
import tool from '@/utils/xxx' (可以引用)
css中:
@import '@/assets/css/reset.sass' (报错)
```

>分析

原因是 css 文件会被用 css-loader 处理，这里 css @import 后的字符串会被 css-loader 视为绝对路径解析，因为我们并没有添加 css-loader 的 alias，所以会报找不到 @ 目录。

>解决

在 Webpack 中 css import 使用 alias 相对路径的解决办法有两种；

一是直接为 css-loader 添加 ailas 的路径，但是在 vue-webpack 给的模板中，单独针对这个插件添加配置就显得麻烦冗余了；

二是在引用路径的字符串最前面添加上 ~ 符号，如 @import "~@/style/theme"；Webpack 会将以 ~ 符号作为前缀的路径视作依赖模块而去解析，这样 @ 的 alias 配置就能生效了。

>总结


- ~ 视为模块解析是 webpack 做的事，不是 css-loader 做的事。

- 各类非 js 直接引用（import require）静态资源，依赖相对路径加载问题，都可以用 ~ 语法完美解决；

- 例如 css module 中： @import "~@/style/theme"

- css 属性中： background: url("~@/assets/xxx.jpg")

- html 标签中： `<img src="~@/assets/xxx.jpg" alt="alias">`


### 图片间隙

 1、给图片设置浮动

2、让图片变成块级元素

3、给图片的父级设置font-size:0;
(在`img`标签的父级上写：font-size:0;//这个在解决display：inline-block出现的问题也有帮助)

### 微信浏览器无法识别二维码的问题

####二维码识别常见的BUG及解决方法

- 1、二维码图片直接放在background里时无法识别

   由上述二维码识别原理我们可以知道客户端是检测网页的img标签内进行长按操作时，会立刻截屏并且启动二维码识别算法。所以当将二维码图片直接放在background中时，识别效果特别差，基本上是识别不出来的。所以最好是将二维码图片单独切出来放在了img标签中。

 

- 2、多张二维码图片无法在同一屏幕中共享

   微信识别二维码的原理是长按的时候相当于将当前手机屏幕截屏，识别截屏后的图片，这样一张图片有两个二维码图的时候当然只会识别出一个。建议解决办法是不要在同一屏幕中放多张图片或者提示用户双击放大二维码进行二维码识别。

 

- 3、多次执行长按二维码的功能会导致内存泄漏，手机会变卡

   多次执行长按二维码的功能会导致手机(iPhone)变卡。长按识别二维码，多次测试后右键识别出来是二维码图片（即没有出现“识别二维码”的按钮）。

参考[https://www.cnblogs.com/daipianpian/p/6421843.html](https://www.cnblogs.com/daipianpian/p/6421843.html)