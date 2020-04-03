## nginx.conf 文件结构

    ...                           # 全局块
    
    events {                      # events块
      ...
    }
    
    http                          # http块
    {
        ...                       # http全局块
        server                    # server块
        { 
            ...                   # server全局块
            location [PATTERN]    # location块
            {
                ...
            }
            location [PATTERN] 
            {
                ...
            }
        }
        server
        {
          ...
        }
        ...                       # http全局块
    }


#### 1、全局块

配置影响 `nginx` 全局的指令。一般有：

1. 运行 `nginx` 服务器的用户
2. `nginx` 进程 `pid` 存放路径
3. 日志存放路径
4. 配置文件引入
5. 允许生成 `worker、process` 数等。

#### 2、events 块

配置影响 `nginx` 服务器或与用户的网络连接。有：

1. 每个进程的最大连接数
2. 选取哪种事件驱动模型处理连接请求
3. 是否允许同时接受多个网路连接
4. 开启多个网络连接序列化等

#### 3、http 块

1. 嵌套多个server
2. 配置代理
3. 缓存
4. 日志定义等绝大多数功能和第三方模块的配置。

> 如文件引入，mime-type定义，日志自定义，是否使用sendfile传输文件，连接超时时间，单连接请求数等。

#### 4、server 块

配置虚拟主机的相关参数，一个 http 中可以有多个 server。

#### 5、location 块

配置请求的路由，以及各种页面的处理情况。

#### 6. upstream

配置后端服务器具体地址，负载均衡配置不可或缺的部分。

## nginx 内置全局变量

|      |      |      |
| ---- | ---- | ---- |
|      |      |      |
|      |      |      |
|      |      |      |

可在任何位置使用的变量。

| 变量名 | 功能 ｜
| ----  | ---- |
| $host | 请求信息中的 host，如果请求中没有 host 行，则等于设置的服务器名｜
| $request_method | 客户端请求类型，如 `GET`、`POST`
| $args | 请求中的参数
| content_length | 请求头中 `Content-Type` 字段
| $http_user_agent | 客户端 `agent` 信息
| $http_cookie | 客户端 cookie 信息
| $remote_addr | 客户端的 ip 地址
| $remote_port | 客户端端口
| $server_protocol | 请求的协议，如 http/1.0、http/1.1
| $server_addr | 服务器地址
| $server_name | 服务器名称
| $server_port | 服务器端口

## 解决跨域

同源策略是指：在浏览器上 www.a.com 请求 www.b.com 资源，返回时会被浏览器拦截。然而 nginx 上转发请求并不会触发同源策略。

    server {
      listen 80;
      server_name www.a.com;
      location / {
        proxy_pass www.b.com
      }
    }

## 负载均衡

第一步：`upstream` 指定后端服务器的地址列表。

    upstream balanceServer {
    
      # upstream的负载均衡，weight是权重，可以根据机器配置定义权重。weigth参数表示权值，权值越高被分配到的几率越大。
    
      server 192.168.80.121:80;
      server 192.168.80.122:80;
      server 192.168.80.123:80;
    }

第二步：在 server 中拦截请求，并发请求转发到 upstream 配置的服务列表。

server {
  server_name www.a.com;
  listen 80;
  location /api {
    proxy_pass http://balanceServer;
  }
}

第三步：指定负载均衡策略（共五种策略）

轮询（默认）：每个请求按请求时间顺序逐一分配到不同的后端服务器，如果后端服务器 down掉，能自动剔除。但是如果某一个服务器压力太大，将会出现延迟，从而影响所有分配在这台服务器下的用户。

最小连接数策略：将请求分配至压力较小的服务器，从而平衡每个服务队列的长度，避免了向压力大的服务器添加更多的请求。缺点是：每个服务器的活儿一样重，响应时间却成了瓶颈（响应时间短的服务器还ok，响应时间长的服务器就吃不消啦...）。

    upstream balanceServer {
      least_conn;
      server 192.168.80.121:8;
      server 192.168.80.122:80;
      server 192.168.80.123:80;
    }

最快响应时间策略：依赖于 `NGINX Plus`，优先分配给响应时间最短的服务器（谁能干给谁分配地多）。

    upstream balanceServer {
      fair;
      server 192.168.80.121:80;
      server 192.168.80.122:80;
      server 192.168.80.123:80;
    }

绑定客户端 ip：来自同一个 ip 的用户永远只分配给一台服务器，能解决动态网页存在的 `session` 共享问题。

    upstream balanceServer {
      ip_hash;
      server 192.168.80.121:80;
      server 192.168.80.122:80;
      server 192.168.80.123:80;
    }

weight: 权重，指定轮询几率，weight和访问比率成正比，用于后端服务器性能不均的情况。

    upstream balanceServer {
      server 192.168.0.14 weight=10;
      server 192.168.0.15 weight=20;
    }

## 静态资源服务器

    location ~* \.(htm|html|gif|jpg|jpeg|png|bmp|swf|ioc|rar|zip|txt|flv|mid|doc|ppt|
        pdf|xls|mp3|wma)$ {
      root /root/static/;
      autoindex on;
      access_log off;
      expires 10h; # 设置过期时间为 10 小时。
    }

匹配以 png|gif...为结尾的资源请求，都将请求转发到本地路径（ root 所指的路径就是 nginx 本地路径），也可以设置缓存。
    
    # JS和CSS缓存时间设置
    location ~ .*.(js|css)?$
    {
        expires 1h;
    }


## nginx 配置文件实例1


    # 每个指令必须有分号结束
    
    # 配置用户或者用户组
    #user administrator administrators; 
    
    # nginx 进程数，建议设置未 CPU 总核数，默认为1
    #worker_processes 2;
    
    # 进程pid文件地址
    #pid /nginx/pid/nginx.pid;            
    
    # 全局错误日志定义类型，debug|info|notice|warn|error|crit|alert|emerg
    # 这个设置可以放入全局块
    error_log log/error.log debug;  
    
    events {
        accept_mutex on;    # 设置网路连接序列化，防止惊群现象发生，默认为on
        multi_accept on;    # 设置一个进程是否同时接受多个网络连接，默认为off
        #use epoll;         # 事件驱动模型，select|poll|kqueue|epoll|resig|/dev/poll|eventport
        worker_connections  1024;    # 最大连接数，默认为512
    }
    http {
        # 文件扩展名与文件类型映射表
        include       mime.types;   
    
        # 默认文件类型，默认为text/plain
        default_type  application/octet-stream; 
    
        # 取消服务日志
        #access_log off;     
    
        # 自定义日志格式
        log_format myFormat '$remote_addr–$remote_user [$time_local] $request $status $body_bytes_sent $http_referer $http_user_agent $http_x_forwarded_for'; 
    
        # combined为日志格式的默认值
        access_log log/access.log myFormat;   
    
        # 允许sendfile方式传输文件，默认为off，可以在http块，server块，location块。   
        sendfile on;            
    
        # 每个进程每次调用传输数量不能大于设定的值，默认为0，即不设上限。      
        sendfile_max_chunk 100k;    
    
        # 连接超时时间，默认为75s，可以在http，server，location块。      
        keepalive_timeout 65;                    
    
        # 负载均衡配置
        upstream mysvr {   
          server 127.0.0.1:7878;
          server 192.168.10.121:3333 backup;    # 热备
        }
    
        # error_page指令用于自定义错误页面，500，502，503，504 这些就是HTTP中最常见的错误代码，/50x.html 用于表示当发生上述指定的任意一个错误的时候，都是用网站根目录下的/50.html文件进行处理。网址或者html文件。
        error_page 500 501 502 /50x.html;   # 错误页
    
        # 虚拟主机配置
        server {
            keepalive_requests 120;             # 单连接请求上限次数。
            listen       4545;                  # 监听端口
            server_name  127.0.0.1;             # 监听地址     
    
            # 1. 正则设置访问权限  
            location  ~*^.+$ {                 # 请求的url过滤，正则匹配，~为区分大小写，~*为不区分大小写。
              #root path;                      # 根目录
              #index vv.txt;                   # 设置默认页
              proxy_pass  http://mysvr;        # 请求转向 mysvr 定义的服务器列表
              deny 127.0.0.1;                  # 拒绝的ip
              allow 172.18.5.54;               # 允许的ip        
            } 
    
            # 2. 使用 = 设置精准匹配  
            location  =/admin {                # 使用 = 设置精准匹配
              #root path;                      # 根目录
              #index vv.txt;                   # 设置默认页
              proxy_pass  http://mysvr;        # 请求转向 mysvr 定义的服务器列表
              deny 127.0.0.1;                  # 拒绝的ip
              allow 172.18.5.54;               # 允许的ip        
            }
        }
    }


## nginx 配置文件实例2

    # 定义Nginx运行的用户和用户组
    user www www;
    
    # nginx进程数，建议设置为等于CPU总核心数。
    worker_processes 8;
    
    # 全局错误日志定义类型，[ debug | info | notice | warn | error | crit ]
    error_log /usr/local/nginx/logs/error.log info;
    
    # 进程pid文件
    pid /usr/local/nginx/logs/nginx.pid;
    
    # 指定进程可以打开的最大描述符：数目
    # 工作模式与连接数上限
    # 这个指令是指当一个nginx进程打开的最多文件描述符数目，理论值应该是最多打开文件数（ulimit -n）与nginx进程数相除，但是nginx分配请求并不是那么均匀，所以最好与ulimit -n 的值保持一致。
    # 现在在linux 2.6内核下开启文件打开数为65535，worker_rlimit_nofile就相应应该填写65535。
    # 这是因为nginx调度时分配请求到进程并不是那么的均衡，所以假如填写10240，总并发量达到3-4万时就有进程可能超过10240了，这时会返回502错误。
    worker_rlimit_nofile 65535;


    events
    {
        # 参考事件模型，use [ kqueue | rtsig | epoll | /dev/poll | select | poll ]; epoll模型
        # 是Linux 2.6以上版本内核中的高性能网络I/O模型，linux建议epoll，如果跑在FreeBSD上面，就用kqueue模型。
        # 补充说明：
        # 与apache相类，nginx针对不同的操作系统，有不同的事件模型
        #A）标准事件模型
        # Select、poll属于标准事件模型，如果当前系统不存在更有效的方法，nginx会选择select或poll
        # B）高效事件模型
        #Kqueue：使用于FreeBSD 4.1+, OpenBSD 2.9+, NetBSD 2.0 和 MacOS X.使用双处理器的MacOS X系统使用kqueue可能会造成内核崩溃。
        # Epoll：使用于Linux内核2.6版本及以后的系统。
        #/dev/poll：使用于Solaris 7 11/99+，HP/UX 11.22+ (eventport)，IRIX 6.5.15+ 和 Tru64 UNIX 5.1A+。
        # Eventport：使用于Solaris 10。 为了防止出现内核崩溃的问题， 有必要安装安全补丁。
        use epoll;
    
        # 单个进程最大连接数（最大连接数=连接数*进程数）
        # 根据硬件调整，和前面工作进程配合起来用，尽量大，但是别把cpu跑到100%就行。每个进程允许的最多连接数，理论上每台nginx服务器的最大连接数为。
        worker_connections 65535;
    
        # keepalive超时时间。
        keepalive_timeout 60;
    
        # 客户端请求头部的缓冲区大小。这个可以根据你的系统分页大小来设置，一般一个请求头的大小不会超过1k，不过由于一般系统分页都要大于1k，所以这里设置为分页大小。
        # 分页大小可以用命令getconf PAGESIZE 取得。
        # [root@web001 ~]# getconf PAGESIZE
        # 4096
        # 但也有client_header_buffer_size超过4k的情况，但是client_header_buffer_size该值必须设置为“系统分页大小”的整倍数。
        client_header_buffer_size 4k;
    
        # 这个将为打开文件指定缓存，默认是没有启用的，max指定缓存数量，建议和打开文件数一致，inactive是指经过多长时间文件没被请求后删除缓存。
        open_file_cache max=65535 inactive=60s;
    
        # 这个是指多长时间检查一次缓存的有效信息。
        # 语法:open_file_cache_valid time 默认值:open_file_cache_valid 60 使用字段:http, server, location 这个指令指定了何时需要检查open_file_cache中缓存项目的有效信息.
        open_file_cache_valid 80s;
    
        # open_file_cache指令中的inactive参数时间内文件的最少使用次数，如果超过这个数字，文件描述符一直是在缓存中打开的，如上例，如果有一个文件在inactive时间内一次没被使用，它将被移除。
        # 语法:open_file_cache_min_uses number 默认值:open_file_cache_min_uses 1 使用字段:http, server, location  这个指令指定了在open_file_cache指令无效的参数中一定的时间范围内可以使用的最小文件数,如果使用更大的值,文件描述符在cache中总是打开状态.
        open_file_cache_min_uses 1;
        
        # 语法:open_file_cache_errors on | off 默认值:open_file_cache_errors off 使用字段:http, server, location 这个指令指定是否在搜索一个文件是记录cache错误.
        open_file_cache_errors on;
    }


​        
​        
​    # 设定http服务器，利用它的反向代理功能提供负载均衡支持
​    http
​    {
​        # 文件扩展名与文件类型映射表
​        include mime.types;
​    
​        # 默认文件类型
​        default_type application/octet-stream;
​    
​        # 默认编码
​        #charset utf-8;
​    
​        # 服务器名字的hash表大小
​        # 保存服务器名字的hash表是由指令server_names_hash_max_size 和server_names_hash_bucket_size所控制的。参数hash bucket size总是等于hash表的大小，并且是一路处理器缓存大小的倍数。在减少了在内存中的存取次数后，使在处理器中加速查找hash表键值成为可能。如果hash bucket size等于一路处理器缓存的大小，那么在查找键的时候，最坏的情况下在内存中查找的次数为2。第一次是确定存储单元的地址，第二次是在存储单元中查找键 值。因此，如果Nginx给出需要增大hash max size 或 hash bucket size的提示，那么首要的是增大前一个参数的大小.
​        server_names_hash_bucket_size 128;
​    
        # 客户端请求头部的缓冲区大小。这个可以根据你的系统分页大小来设置，一般一个请求的头部大小不会超过1k，不过由于一般系统分页都要大于1k，所以这里设置为分页大小。分页大小可以用命令getconf PAGESIZE取得。
        client_header_buffer_size 32k;
    
        # 客户请求头缓冲大小。nginx默认会用client_header_buffer_size这个buffer来读取header值，如果header过大，它会使用large_client_header_buffers来读取。
        large_client_header_buffers 4 64k;
    
        # 设定通过nginx上传文件的大小
        client_max_body_size 8m;
    
        # 开启高效文件传输模式，sendfile指令指定nginx是否调用sendfile函数来输出文件，对于普通应用设为 on，如果用来进行下载等应用磁盘IO重负载应用，可设置为off，以平衡磁盘与网络I/O处理速度，降低系统的负载。注意：如果图片显示不正常把这个改成off。
        # sendfile指令指定 nginx 是否调用sendfile 函数（zero copy 方式）来输出文件，对于普通应用，必须设为on。如果用来进行下载等应用磁盘IO重负载应用，可设置为off，以平衡磁盘与网络IO处理速度，降低系统uptime。
        sendfile on;
    
        # 开启目录列表访问，合适下载服务器，默认关闭。
        autoindex on;
    
        # 此选项允许或禁止使用socke的TCP_CORK的选项，此选项仅在使用sendfile的时候使用
        tcp_nopush on;
        
        tcp_nodelay on;
    
        # 长连接超时时间，单位是秒
        keepalive_timeout 120;
    
        # FastCGI相关参数是为了改善网站的性能：减少资源占用，提高访问速度。下面参数看字面意思都能理解。
        fastcgi_connect_timeout 300;
        fastcgi_send_timeout 300;
        fastcgi_read_timeout 300;
        fastcgi_buffer_size 64k;
        fastcgi_buffers 4 64k;
        fastcgi_busy_buffers_size 128k;
        fastcgi_temp_file_write_size 128k;
    
        # gzip模块设置
        # 该指令用于开启或 关闭gzip模块。
        gzip on;
    
        # 设置允许压缩的页面最小字节数，默认值是0，页面字节数从相应消息头的Content-length中进行获取。如果 Content-Type 小于该值，将不被压缩。
        gzip_min_length 1k; 
    
        # 设置系统获取几个单位的缓存用于存储gzip的压缩结果数据流。
        gzip_buffers 4 16k;    #压缩缓冲区
        gzip_http_version 1.1;    #压缩版本（默认1.1，前端如果是squid2.5请使用1.0）
    
        # gzip压缩比，压缩级别是1-9，1的压缩级别最低，9的压缩级别最高。压缩级别越高压缩率越大，压缩时间越长。
        gzip_comp_level 2;    #压缩等级 1-9，等级越高压缩率越大，花费的时间也就越长
        gzip_types text/plain application/x-javascript text/css application/xml;    
        
        #压缩类型(MIME)，默认就已经包含text/html(默认不压缩 css/js )。
    
        # gzip_proxied : 用于设置启用或禁用从代理服务器上收到相应内容gzip压缩。
        
        # 用于在响应消息头中添加Vary：Accept-Encoding,使代理服务器根据请求头中的Accept-Encoding识别是否启用gzip压缩。
        gzip_vary on;
    
        # gzip_disable : 可以通过该指令对一些特定的User-Agent不使用压缩功能。
    
        # 开启限制IP连接数的时候需要使用
        # limit_zone crawler $binary_remote_addr 10m;
    
        # 每个设备的状态设置为:
        # 1.down表示单前的server暂时不参与负载
        # 2.weight为weight越大，负载的权重就越大。
        # 3.max_fails：允许请求失败的次数默认为1.当超过最大次数时，返回proxy_next_upstream模块定义的错误
        # 4.fail_timeout:max_fails次失败后，暂停的时间。
        # 5.backup： 其它所有的非backup机器down或者忙的时候，请求backup机器。所以这台机器压力会最轻。
    
        # nginx支持同时设置多组的负载均衡，用来给不用的server来使用。
        # client_body_in_file_only设置为On 可以讲client post过来的数据记录到文件中用来做debug
        # client_body_temp_path设置记录文件的目录 可以设置最多3层目录
        # location对URL进行匹配.可以进行重定向或者进行新的代理 负载均衡
    }


​     
​    # 虚拟主机的配置
​    server
​    {
​        # 监听端口
​        listen 80;
​    
​        # 域名可以有多个，用空格隔开；也可以设置基于IP的
​        server_name www.jd.com jd.com;
​        index index.html index.htm index.php;
​        root /data/www/jd;
​    
​        # 对******进行负载均衡
​        location ~ .*.(php|php5)?$
​        {
​            fastcgi_pass 127.0.0.1:9000;
​            fastcgi_index index.php;
​            include fastcgi.conf;
​        }
​         
​        # 日志格式设定
​        #$remote_addr与$http_x_forwarded_for用以记录客户端的ip地址；
​        #$remote_user：用来记录客户端用户名称；
​        #$time_local： 用来记录访问时间与时区；
​        #$request： 用来记录请求的url与http协议；
​        #$status： 用来记录请求状态；成功是200，
​        #$body_bytes_sent ：记录发送给客户端文件主体内容大小；
​        #$http_referer：用来记录从那个页面链接访问过来的；
​        #$http_user_agent：记录客户浏览器的相关信息，可判断用户的浏览器处于手机端还是 PC，进而显示不同页面；
​    
        server{
          listen 80;
          server_name nginx2.jspang.com;
          location / {
            root /usr/share/nginx/pc;
            if ($http_user_agent ~* '(Android|webOS|iPhone|iPod|BlackBerry)') {
                root /usr/share/nginx/mobile;
            }
            index index.html;
          }
        }
    
        #通常web服务器放在反向代理的后面，这样就不能获取到客户的IP地址了，通过$remote_add拿到的IP地址是反向代理服务器的iP地址。反向代理服务器在转发请求的http头信息中，可以增加x_forwarded_for信息，用以记录原有客户端的IP地址和原来客户端的请求的服务器地址。
        log_format access '$remote_addr - $remote_user [$time_local] "$request" '
        '$status $body_bytes_sent "$http_referer" '
        '"$http_user_agent" $http_x_forwarded_for';
         
        # 定义本虚拟主机的访问日志
        access_log  /usr/local/nginx/logs/host.access.log  main;
        access_log  /usr/local/nginx/logs/host.access.404.log  log404;
         
        # 对 "/" 启用反向代理
        location / {
            proxy_pass http://127.0.0.1:88;
            proxy_redirect off;
            proxy_set_header X-Real-IP $remote_addr;
             
            # 后端的Web服务器可以通过X-Forwarded-For获取用户真实IP
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
             
            # 以下是一些反向代理的配置，可选。
            proxy_set_header Host $host;
    
            # 允许客户端请求的最大单文件字节数
            client_max_body_size 10m;
    
            # 缓冲区代理缓冲用户端请求的最大字节数，
            # 如果把它设置为比较大的数值，例如256k，那么，无论使用firefox还是IE浏览器，来提交任意小于256k的图片，都很正常。如果注释该指令，使用默认的client_body_buffer_size设置，也就是操作系统页面大小的两倍，8k或者16k，问题就出现了。
            #无论使用firefox4.0还是IE8.0，提交一个比较大，200k左右的图片，都返回500 Internal Server Error错误
            client_body_buffer_size 128k;
    
            # 表示使nginx阻止HTTP应答代码为400或者更高的应答。
            proxy_intercept_errors on;
    
            # 后端服务器连接的超时时间_发起握手等候响应超时时间
            #nginx跟后端服务器连接超时时间(代理连接超时)
            proxy_connect_timeout 90;
    
            # 后端服务器数据回传时间(代理发送超时)
            #后端服务器数据回传时间_就是在规定时间之内后端服务器必须传完所有的数据
            proxy_send_timeout 90;
    
            # 连接成功后，后端服务器响应时间(代理接收超时)
            # 连接成功后_等候后端服务器响应时间_其实已经进入后端的排队之中等候处理（也可以说是后端服务器处理请求的时间）
            proxy_read_timeout 90;
    
            # 设置代理服务器（nginx）保存用户头信息的缓冲区大小
            # 设置从被代理服务器读取的第一部分应答的缓冲区大小，通常情况下这部分应答中包含一个小的应答头，默认情况下这个值的大小为指令proxy_buffers中指定的一个缓冲区的大小，不过可以将其设置为更小
            proxy_buffer_size 4k;
    
            # proxy_buffers缓冲区，网页平均在32k以下的设置
            # 设置用于读取应答（来自被代理服务器）的缓冲区数目和大小，默认情况也为分页大小，根据操作系统的不同可能是4k或者8k
            proxy_buffers 4 32k;
    
            # 高负荷下缓冲大小（proxy_buffers*2）
            proxy_busy_buffers_size 64k;
    
            # 设置在写入proxy_temp_path时数据的大小，预防一个工作进程在传递文件时阻塞太长
            # 设定缓存文件夹大小，大于这个值，将从upstream服务器传
            proxy_temp_file_write_size 64k;
        }


​         
​        # 设定查看Nginx状态的地址
​        location /NginxStatus {
​            stub_status on;
​            access_log on;
​            auth_basic "NginxStatus";
​            auth_basic_user_file confpasswd;
​            #htpasswd文件的内容可以用apache提供的htpasswd工具来产生。
​        }
​         
​        # 本地动静分离反向代理配置
​        # 所有jsp的页面均交由tomcat或resin处理
​        location ~ .(jsp|jspx|do)?$ {
​            proxy_set_header Host $host;
​            proxy_set_header X-Real-IP $remote_addr;
​            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
​            proxy_pass http://127.0.0.1:8080;
​        }
​        
​    }
}

**注意：**

- 惊群现象：一个网路连接到来，多个睡眠的进程被同时叫醒，但只有一个进程能获得链接，这样会影响系统性能。

- 每个指令必须有分号结束。

学习连接：[技术旁 nginx](https://www.bilibili.com/video/av35986548?from=search&seid=3976651392639128391)

