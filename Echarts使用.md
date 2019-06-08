### 基本使用

- 安装
`npm install echarts --save`
- 引入
>引入方式
```javascript
// 按需引入 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/bar')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

//全部引入
var echarts = require('echarts')
```

>基本示例
```javascript
var echarts = require('echarts');

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
// 绘制图表
myChart.setOption({
    title: {
        text: 'ECharts 入门示例'
    },
    tooltip: {},
    xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
});
```
- 自适应
>echart图表本身是提供了一个resize的函数，当浏览器发生resize事件的时候，让其触发echart的resize事件，重绘canvas。
用window.onresize = myChart.resize; 可以完成echarts图表的自适应，
如果是多个echarts图表，就会发现只有最后一个图表能自适应，所以需使用  addEventListener监听所有图表：

```js
mounted:{
     this.initEchart()
},
methods:{
     initEchart(){
                window.addEventListener('resize',()=>{
                    this.chart = echarts.init(this.$refs.bookTotalChart);
                    this.chart.resize();
                })
       }
}
```
- 定制化主题


### Vue中初始化ECharts
因为 ECharts 初始化必须绑定 dom，所以我们只能在 vue 的 mounted 生命周期里进行初始化。

```javascript
mounted() {
  this.initCharts();
},
methods: {
  initCharts() {
    this.chart = echarts.init(this.$el);
    this.setOptions();
  },
  setOptions() {
    this.chart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    })
  }
}
```

 data 是远程获取的，或者说我动态改变 ECharts 的配置该怎么办呢？我们可以通过 watch 来触发 setOptions 方法

```javascript
//第一种 watch options变化 利用vue的深度 watcher，options 一有变化就重新setOption
watch: {
  options: {
    handler(options) {
      this.chart.setOption(this.options)
    },
    deep: true
  },
}
//第二种 只watch 数据的变化 只有数据变化时触发ECharts
watch: {
  seriesData(val) {
    this.setOptions({series:val})
  }
}
```

