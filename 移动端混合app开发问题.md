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