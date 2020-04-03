## git clone 速度太慢
git clone特别慢是因为`github.global.ssl.fastly.net`域名被限制了。
只要找到这个域名对应的ip地址，然后在hosts文件中加上ip–>域名的映射，刷新DNS缓存便可。

- Windows上的hosts文件路径在C:\Windows\System32\drivers\etc\hosts
- Linux的hosts文件路径在：sudo vim /etc/hosts

host 文件里加上
```
151.101.185.194 github.global-ssl.fastly.net
192.30.253.112 github.com
```


