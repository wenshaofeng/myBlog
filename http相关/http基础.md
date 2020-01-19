## HTTP的历史 和TCP/IP 协议的关系
>从输入 URL 到页面加载完成，发生了什么？

**浏览器输入一个URL后HTTP请求返回的完整过程**
![](https://upload-images.jianshu.io/upload_images/9249356-996b52a3c852ebc5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://user-gold-cdn.xitu.io/2018/10/18/16685737b823244c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
1. DNS 解析
2. TCP 连接
3. HTTP 请求抛出
4. 服务端处理请求，HTTP 响应返回
5. 浏览器拿到响应数据，解析响应内容，把解析的结果展示给用户

**经典五层网络模型**
![](https://upload-images.jianshu.io/upload_images/9249356-f1a59d6557b53286.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

>低三层
- **物理层**主要作用是定义物理设备如何传输数据
- **数据链路层**在通信的实体间建立数据链路连接
- **网络层**为数据在结点之间传输创建逻辑链路

>传输层
- 向用户提供可靠的端到端(End-to-End)服务
- 传输层向高层屏蔽了下层数据通信的细节

>应用层
- 为应用软件提供了很多服务
- 构建于TCP协议之上
- 屏蔽网络传输相关细节

![](https://user-images.githubusercontent.com/41256301/53553226-21c23200-3b78-11e9-899a-b211a4d3bc4c.png)


### HTTP 历史 

#### HTTP/0.9
- 只有一个命令GET
- 没有HEADER等描述数据的信息
- 服务器发送完毕，就关闭TCP连接 

#### HTTP/1.0
- 增加了很多命令
- 增加状态码（status code）和头部（header）
- 多字符集支持、多部分发送、权限、缓存等

#### HTTP/1.1
- 持久连接
- pipeline 
- 增加host 和其他一些命令 

#### HTTP2
- 所有数据以二进制传输
- 同一个连接里面发送多个请求不再需要按照顺序来
- 头信息压缩以及推送等提高效率的功能

### TCP三次握手
![](https://user-images.githubusercontent.com/41256301/53553273-40c0c400-3b78-11e9-8dcf-569218eb9383.png)
HTTP的长连接、短连接其实指的是 TCP的长连接、短连接

### URI 、URL和URN
- URI (Uniform Resource Identifier/统一资源标志符号)
   1. 用来唯一标识互联网上的信息资源
   2. 包括URL和URN

- URL（Uniform Resource Locator/统一资源定位符）

- URN （Uniform Resource Name/统一资源名称）
  1. 永久统一资源定位符
  2. 在资源移动之后还能被找到
  3. 目前还没有非常成熟的使用方案

>说说三者的区别和用途。

   URL肯定是一个URI，但是一个URI并不一定是一个URL，URL仅仅是URI的一种表现形式而已。两者的差距主要可以从命名上来区分，URI是资源标志符，所有他只要求具有"标识性"，而URL是和URI的主要区别就是，URL除了具有URI的“标识性”以外，还具有定位功能，可以用来描述资源的具体位置，还指明了获取资源所采用的协议。一个完整的URL包含协议名称，主机名称(IP或者域名)、端口号(没写端口号默认 为80端口)、路径和查询字符串这5个部分。比如：http：//www.microsoft.com:80/images/hello.png?type=png.这样一个url，上述的5个部分分别是：网络传输协议名称：http，主机：www.mcrosoft.com,端口号：80，路径：images/hello.png 查询字符串：type=png。
　　看完了URL和URI的区别，我们在看看URN是什么东西。URN也是URL的一种表现形式，它和URL的区别就是与资源的位置无关，正式由于位置的无关性，被某个URN标识的资源在位置发生变化时，其URI可以保持不变。
　　所以看来URL和URN都是URI的一种扩展，一种表现形式，URL和URN肯定是一个URI，但是URI不一定是URN或URL。



v
## HTTP各种特性总览
- 状态码
- CORS预请求
- 缓存
- cookie和session
- HTTP长连接
- 数据协商
- Redirect
- CSP
- 断点续传

### 状态码
![](https://user-images.githubusercontent.com/41256301/53689983-cc1a9f00-3d9c-11e9-87b0-2044cea2d6cd.png)

>常见的一些状态码

- 2XX 成功
  - 200 OK (请求正常处理)
  - 204 No Content (请求处理成功，但没有资源可返回)
  - 206 Partial Content (表示客户端进行了范围请求)

- 3XX 重定向
  - 301 永久重定向
  - 302 临时重定向
  - 304 Not Modified 附带条件的请求，资源已找到，但未符合条件请求 （**注意** ： 和重定向没有关系）

如果一个网站被搜索引擎抓取的次数以及频率越多那么他是越有利于排名的，但是如果你的网站出现太多的304，那么一定会降低搜索引擎的抓取频率以及次数，从而让自己的网站排名比别人落一步

![](https://upload-images.jianshu.io/upload_images/9249356-24417ae2b1761e36.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


- 4XX 客户端错误
  - 400 Bad Request  请求报文中存在语法错误
  - 403 Forbidden  服务器禁止访问
  - 404 Not Found  服务器上没有请求的资源 

- 5XX 服务器错误
  - 500 Internal Server Error 
  - 502 Bad Gateway 充当网管或代理的而服务器，从远端服务器接收了一个无效的请求
  - 503 Service Unavailable


### CORS预请求
跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站通过浏览器有权限访问哪些资源。另外，规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），**浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求**。服务器确认允许之后，才发起实际的 HTTP 请求。在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 Cookies 和 HTTP 认证相关数据）。

CORS请求失败会产生错误，但是为了安全，在JavaScript代码层面是无法获知到底具体是哪里出了问题。你只能查看浏览器的控制台以得知具体是哪里出现了错误。

参考[HTTP访问控制——CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#%E7%AE%80%E5%8D%95%E8%AF%B7%E6%B1%82)

![](https://user-images.githubusercontent.com/41256301/53581633-e7c55000-3bb8-11e9-96d7-9675f2bcf652.png)

### 缓存（cache-control）

#### 附带条件请求

![](https://upload-images.jianshu.io/upload_images/9249356-592cdfde9205570c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- If-Match
![](https://upload-images.jianshu.io/upload_images/9249356-98a2c68f6987a61d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- If-Modified-Since
![](https://upload-images.jianshu.io/upload_images/9249356-5c2f69f1145b5eed.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 可缓存性
- private
- public
- no-cache ( 它会先发送请求到服务端，通过服务端像Last-Modified这样的信息来进一步判断浏览器缓存有没有过期 )
- no-store (不会对文件使用缓存)

从字面意思上很容易把 no-cache 误解成为不缓存，但事实上 no-cache 代表不缓
存过期的资源，缓存会向源服务器进行有效期确认后处理资源，也许称为 do-notserve-
from-cache-without-revalidation 更合适。no-store 才是真正地不进行缓存

#### 到期
- max-age ( 优先级比过期时间expires要高 )
- s-maxage ( 优先级比max-age要高,设置的是public相关缓存设备的缓存时间 )
- max-stale 

#### 重新验证
- must-revalidate
- proxy-revalidate

#### 资源验证
![](https://upload-images.jianshu.io/upload_images/9249356-363d0174d3710e0b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

>验证头
- Last-Modified (上次修改时间)
- Etag (数据签名)——对比资源的签名判断是否使用缓存

### HTTP 长连接

在HTTP/1.0中默认使用短连接。也就是说，客户端和服务器每进行一次HTTP操作，就建立一次连接，任务结束就中断连接。当客户端浏览器访问的某个HTML或其他类型的Web页中包含有其他的Web资源（如JavaScript文件、图像文件、CSS文件等），每遇到这样一个Web资源，浏览器就会重新建立一个HTTP会话。

![](https://upload-images.jianshu.io/upload_images/9249356-2ded64d1d563727d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/9249356-d729c1cae8cf2b7a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


而从HTTP/1.1起，默认使用长连接，用以保持连接特性。使用长连接的HTTP协议，会在响应头加入这行代码：
```
Connection:keep-alive
```

![](https://upload-images.jianshu.io/upload_images/9249356-cc7fe261757c0abb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



在使用长连接的情况下，当一个网页打开完成后，客户端和服务器之间用于传输HTTP数据的TCP连接不会关闭，客户端再次访问这个服务器时，会继续使用这一条已经建立的连接。Keep-Alive不会永久保持连接，它有一个保持时间，可以在不同的服务器软件（如Apache）中设定这个时间。实现长连接需要客户端和服务端都支持长连接。

HTTP协议的长连接和短连接，实质上是TCP协议的长连接和短连接。

参考[HTTP长连接、短连接究竟是什么？](https://www.cnblogs.com/gotodsp/p/6366163.html)

### Redirect

301和302状态码的区别（重定向）：
- 301：被请求的资源已永久移动到新位置，重定向是永久的重定向，搜索引擎在抓取新内容的同时也将旧的网址替换为重定向之后的网址
- 302：要求客户端执行临时重定向，重定向是暂时的重定向，搜索引擎会抓取新的内容而保留旧的网址，因为服务器返回302代码，搜索引擎认为新的网址只是暂时的。弊端：容易发生网址劫持，
>搜索引擎在302状态的时候，可能会重定向不过去，造成URL劫持，这就造成了网址URL劫持的可能性。也就是说，一个不道德的人在他自己的网址A做一个302重定向到你的网址B，出于某种原因， Google搜索结果所显示的仍然是网址A，但是所用的网页内容却是你的网址B上的内容，这种情况就叫做网址URL劫持。你辛辛苦苦所写的内容就这样被别人偷走了。

### CSP（Content-Security-Policy/内容安全策略）

#### 作用
- 限制资源获取
- 报告资源获取越权

#### 限制方式
- default-src限制全局
- 制定资源类型

![](https://upload-images.jianshu.io/upload_images/9249356-7b91227a49b671a3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 断点续传

#### 简介 
断点续传：指的是在上传/下载时，将任务（一个文件或压缩包）人为的划分为几个部分，每一个部分采用一个线程进行上传/下载，如果碰到网络故障，可以从已经上传/下载的部分开始继续上传/下载未完成的部分，而没有必要从头开始上传/下载。可以节省时间，提高速度。

#### Range & Content-Range
HTTP1.1 协议（RFC2616）开始支持获取文件的部分内容，这为并行下载以及断点续传提供了技术支持。它通过在 Header 里两个参数实现的，客户端发请求时对应的是 Range ，服务器端响应时对应的是 Content-Range。
- Range

用于请求头中，指定第一个字节的位置和最后一个字节的位置，一般格式：

>Range:(unit=first byte pos)-[last byte pos]

Range 头部的格式有以下几种情况：

>Range: bytes=0-499 表示第 0-499 字节范围的内容 
Range: bytes=500-999 表示第 500-999 字节范围的内容 
Range: bytes=-500 表示最后 500 字节的内容 
Range: bytes=500- 表示从第 500 字节开始到文件结束部分的内容 
Range: bytes=0-0,-1 表示第一个和最后一个字节 
Range: bytes=500-600,601-999 同时指定几个范围

- Content-Range

用于响应头中，在发出带 Range 的请求后，服务器会在 Content-Range 头部返回当前接受的范围和文件总大小。一般格式：

>Content-Range: bytes (unit first byte pos) - [last byte pos]/[entity legth]

例如：

>Content-Range: bytes 0-499/22400

0－499 是指当前发送的数据的范围，而 22400 则是文件的总大小。

而在响应完成后，返回的响应头内容也不同：

>HTTP/1.1 200 Ok（不使用断点续传方式） 
HTTP/1.1 206 Partial Content（使用断点续传方式）

#### 检测服务器是否支持断点续传
CURL 实现检测

```
PS F:\Project\myBlog\vue相关> curl http://www.baidu.com/img/bdlogo.gif


StatusCode        : 200
StatusDescription : OK
Content           : {71, 73, 70, 56...}
RawContent        : HTTP/1.1 200 OK
                    Connection: Keep-Alive
                    Accept-Ranges: bytes
                    Content-Length: 1575
                    Cache-Control: max-age=315360000
                    Content-Type: image/gif
                    Date: Tue, 07 Jan 2020 04:00:19 GMT
                    Expires: Fri, 04 Ja...
Headers           : {[Connection, Keep-Alive], [Accept-Ranges, bytes], [Content-Length, 1575], [Cache-Control, max-age=315360000]...}       
RawContentLength  : 1575
```

能够找到 Content-Range，则表明服务器支持断点续传。有些服务器还会返回 Accept-Ranges，输出结果 Accept-Ranges: bytes ，说明服务器支持按字节下载。