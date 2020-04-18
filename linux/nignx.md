## 记一次前端的打包上传 和 最基本的 nginx 配置
1. 连接云服务器
2. 安装 nginx `yum install nginx`
3. 给 nginx 指定配置文件  `nginx -t`
![](./image/nginx.png)

4. 服务器根目录创建一个文件夹
5. 在本地项目根目录 传输文件至 服务器
  ![](./image/nginx2.png)

6.修改配置文件（两种常用方式） 
  -  vim 修改 
  -  下载配置文件 到本地，修改完上传覆盖
` scp  root@xxx:/etc/nginx/nginx.conf /f
`
` scp  /f/nginx.conf  root@xxx:/etc/nginx/
`


7. 配置文件中
![](https://upload-images.jianshu.io/upload_images/9249356-b453566b91bb0328.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

8. 查看 nginx 语法是否正确，并重启
```shell
# 查看语法
nginx -t
# 重启
nginx -s reload
```
9. 简单配置网站https 

```conf
    server {
        listen 80;
        #填写绑定证书的域名
        server_name greninja14ljw.cn;
        #把http的域名请求转成https (永久重定向)
        return 301 https://$host$request_uri;
    }

    server {
        listen 443;
        server_name greninja14ljw.cn;
        ssl on;
        #证书文件名称
        ssl_certificate /etc/nginx/1_greninja14liw.cn_bundle.crt;
        #私钥文件名称
        ssl_certificate_key /etc/nginx/2_greninja14ljw.cn.key;
        ssl_session_timeout 5m;
        #请按照以下协议配置
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        #请按照以下套件配置，配置加密套件，写法遵循 openssl 标准。
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
        ssl_prefer_server_ciphers on;

        root /myVuepress/dist/;
        index index.html;

        location ~ .*\.(js|css|png|jpg|gif)$ {
            root /myVuepress/dist; #站点根目录
            if (-f $request_filename) {
                expires 1d;
                break;
            }
        }

        location / {
            if ($uri ~ ^/((?!js)(?!img)(?!css)(?!json)(?!fonts).)*$) {
                rewrite .* /index.html break ;
            }
            index index.htm index.html ;
        }
    }
```