### 混合开发 hybid app

#### 常见的3种混合开发渲染方式
- webView UI 渲染
- ReactNative Weex 等，webView的描述性代码 转化成控件代码 进行原生渲染
- 混合渲染  ( 如小程序 )

#### 核心技术——JSBridge （桥接器，进行双向通信的一种机制）
以 JavaScript 引擎 或者 webview 容器 作为媒介，如果把客户端(H5)比作Client端，原生比作Server端，那么JSBridge充当一个HTTP协议的作用
- 类比 CS 模式
- 将 Native 端原生接口封装成JavaScript 接口 
- 将 Web 端 JavaScript 接口封装成原生接口
- Web 端和 native 端之间双向通信




### 原生内的H5页面内，定时器在app切后台后暂停

- 方案一：
原生提供给H5调用的接口，告诉H5是否返回页面

- 方案二：
使用时间戳相减的方法计时，而不是自减

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        button {
            border: 1px solid brown;
            margin: 100px;
            width: 120px;
            height: 44px;
        }
    </style>
</head>

<body>
    <div>
        <button id="btn">发送验证码</button>
    </div>

    <script>
        var Btn = document.querySelector('#btn');
        Btn.onclick = function () {
            beginCountDown(30);
        }

        // 
        function beginCountDown(cd) {
            //倒计时
            var num = cd;
            var t1 = parseInt(new Date().getTime() / 1000);
            var btn_countDown = setInterval(
                function () {
                    var t2 = parseInt(new Date().getTime() / 1000);
                    var t_time = (t2 - t1);
                    if (t_time <= num) {
                        // return $('.timeout').html(num - t_time +'秒');
                        Btn.innerHTML = num - t_time + '秒';
                    } else {
                        clearInterval(btn_countDown);
                        Btn.innerHTML = '重新发送';
                    }
                }, 1000);
        }



    </script>
</body>

</html>
```

###  H5页面 在ios端 滚动不流畅
- 在滚动容器内加-webkit-overflow-scrolling: touch

但这个方案有一个问题，在页面内具有多个overflow：auto的情况下，那些具有 绝对定位（absolute, fixed） 属性的元素，也会跟着滚动。
 
### 不同webview之间的通信问题 （浏览器的存储）

在app内的H5，不同的webview之间，sessionStorage 是不能共享的，打开一个新的webview 容器会丢失 sessionStorage ，关于localStorage ,是可以共享的。
