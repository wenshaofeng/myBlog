### vue-router 相关

- 路由滚动行为

用vue-router作为路由控制器  在使用过程中发现每个页面打开都在原来的位置 不能返回到页面顶部位置。
文档中有说明的是

```js
const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { x: 0, y: 0 }
  }
})
```
但是，其只能应用在HTML5 history模式下，在项目中没有效果...

>解决方式

```js
router.beforeEach((to, from, next) => {
document.body.scrollTop = 0;
next()
});
```
但是用这种方法的时候发现，`document.body.scrollTop`一直为0,。
[相关资料](https://www.cnblogs.com/starof/p/5238654.html) 

>最后
```js
router.afterEach((to, from) => {
  let bodySrcollTop = document.body.scrollTop
  if (bodySrcollTop !== 0) {
    document.body.scrollTop = 0
    return
  }
  let docSrcollTop = document.documentElement.scrollTop
  if (docSrcollTop !== 0) {
    document.documentElement.scrollTop = 0
  }
})
```