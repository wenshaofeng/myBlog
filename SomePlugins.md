### 进度条插件 nprogress
[文档](https://github.com/rstacruz/nprogress)

常规用法
```javascript
//导入
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})
--------------------- 


// 修改进度条颜色
#nprogress .bar {
      background: red !important; //自定义颜色
}

```
