### Cookies跨域问题：

类似配置
```javascript
axios.post('http://101.132.138.141:8888/service/pageUsers', objectToForm({
        'currentPage': '1',
        'pageSize': '10',
        'token': '7e987daa-6c84-46d2-be26-f345dfaed8a7',
    }), {
        // 单独配置
        withCredentials: true
    })
    .then(function(res) {
        console.log(res.data);
    })
    .catch(function(err) {
        console.error(err);
    });
```

withCredentials的情况下，后端要设置Access-Control-Allow-Origin为你的源地址，
例如http://localhost:8080，不能是*，而且还要设置header('Access-Control-Allow-Credentials: true');


### HTTP请求中的form data和request payload的区别

区别就是：

当POST请求的请求头里设置Content-Type: application/x-www-form-urlencoded(默认), 参数在请求体以标准的Form Data的形式提交，以&符号拼接，参数格式为key=value&key=value&key=value

当使用AJAX原生POST请求,请求头里设置Content-Type:application/json，请求的参数会显示在Request Payload中，参数格式为JSON格式：{“key”:”value”,”key”:”value”…}，这种方式可读性会更好。

![request payload](https://upload-images.jianshu.io/upload_images/9249356-96fcce0d749a64ac.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```js
//转换数据的方法
transformRequest: [
    function(data) {
        let ret = '';
        for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
        }
        return ret;
    }
],
//设置请求头
headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
}

```


![formData](https://upload-images.jianshu.io/upload_images/9249356-05117907770b9a28.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 上传文件

#### HTML5特性实现Ajax上传
新的HTML5特性对于上传，实现起来更容易了，FormData可以提交二进制数据。一般情况下，我们只需要将form对象装载到FormData中即可。

```js
update(e){
    let file = e.target.files[0];           
    let param = new FormData(); //创建form对象
    param.append('file',file,file.name);//通过append向form对象添加数据
    param.append('chunk','0');//添加form表单中其他数据
    console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
    let config = {
    headers:{'Content-Type':'multipart/form-data'}
    };  //添加请求头
    this.axios.post('http://upload.qiniu.com/',param,config)
    .then(response=>{
    console.log(response.data);
    })        
}

```

新的HTML5特性对于上传，实现起来更容易了，FormData可以提交二进制数据。一般情况下，我们只需要将form对象装载到FormData中即可。

```js
    var form = document.getElementById('form');
    var formData = new FormData(form);
```

不过，有意思的是可以利用append方法可以添加一些更多的信息。

```js
var img = document.getElementById('img').files[0];
var formData = new FormData();
formData.append('img',img);
```

最后利用XMLHttpRequest来最后提交

```js
var xhr = new XMLHttpRequest();
xhr.open('POST','http://api.com/upload');
xhr.onreadystatechange = function(){};
xhr.send(formData);
```

有意思的是XHR2提供了一个很棒的事件给我们来获取上传的进度，比如：
```js
xhr.upload.onprogress = function(evt){
    console.log(evt)
    var loaded = evt.loaded;//已经上传大小情况
    var tot = evt.total;  //附件总大小
    var per = Math.floor(100*loaded/tot);  //已经上传的百分比  
}
```