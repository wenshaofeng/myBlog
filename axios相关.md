Cookies跨域问题：

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
