## github多账户及SSH密钥配置
- 创建秘钥
- 秘钥管理
- 删除 git 全局的用户信息，在每次初次进入不同账号的 git 项目时，设置用户信息

### 创建秘钥
```shell
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
# 或者
ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa.github -C "your_email@example.com"

```
#### ssh权限

为了让私钥文件和公钥文件能够在认证中起作用，请确保权限正确。

对于.ssh 以及父文件夹，当前用户用户一定要有执行权限，其他用户最多只能有执行权限。

对于公钥和私钥文件也是: 当前用户一定要有执行权限，其他用户最多只能有执行权限。

对于利用公钥登录，对其他用户配置执行权限是没有问题的。但是对于git，公钥和私钥, 以及config等相关文件的权限，其他用户不可有任何权限。

#### 设置免秘钥登录后，仍然不能免秘钥登录的问题。

因为sshd为了安全，对属主的目录和文件权限有所要求。如果权限不对，则ssh的免密码登陆不生效。
用户目录权限为 755 或者 700，就是不能是77x、777，需要保障other用户不能有w权限
.ssh目录权限一般为755或者700。
rsa_id.pub 及authorized_keys权限一般为644
rsa_id权限必须为600 

例如：

.ssh目录权限
```
drwx------   2 root root       4096 Apr  9  2015 .ssh
```
.ssh目录下文件的权限
```
-rw-r--r--   1 root root 1609 Mar  2 14:05 authorized_keys
-rw-------   1 root root 1675 Dec 12  2014 id_rsa
-rw-r--r--   1 root root  405 Dec 12  2014 id_rsa.pub
-rw-r--r--   1 root root 4701 May 25  2016 known_hosts
```
这里的权限指的是对端的权限，如从A主机 通过ssh连接 B主机，B主机权限按照上边的设置进行。


- 常见的权限表示形式

```
-rw------- (600)      只有拥有者有读写权限。
-rw-r--r-- (644)      只有拥有者有读写权限；而属组用户和其他用户只有读权限。
-rwx------ (700)     只有拥有者有读、写、执行权限。
-rwxr-xr-x (755)    拥有者有读、写、执行权限；而属组用户和其他用户只有读、执行权限。
-rwx--x--x (711)    拥有者有读、写、执行权限；而属组用户和其他用户只有执行权限。
-rw-rw-rw- (666)   所有用户都有文件读、写权限。
-rwxrwxrwx (777)  所有用户都有读、写、执行权限。
```

### 秘钥管理
配置`~/.ssh/config`文件，如果没有该文件，通过`touch config`命令创建。注意`HostName github.com`
```config
Host github.com
  HostName github.com
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/new_id_rsa
```
把私钥添加到ssh-agent并存入keychain，执行命令会要求你输入密码
```
ssh-add -K ~/.ssh/new_id_rsa
```
在 GitHub 上添加公钥

测试 
`ssh -T git@github.com`

#### 多个秘钥
修改 config
```
Host old.github.com
  HostName github.com
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/old_id_rsa

Host new.github.com
  HostName github.com
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/new_id_rsa

```

测试`old.github.com`

`ssh -T git@old.github.com`

测试`new.github.com`

`ssh -T git@new.github.com`


### 用户信息

使用需要注意，git@后要改为对应账户的别名。
如new_id_rsa密钥对应的GitHub账户上有个仓库test.git，且你的GitHub用户名是username，使用下面命令克隆
```
git clone git@new.github.com:username/test.git
```
如old_id_rsa密钥对应的GitHub账户上有个仓库test.git，且你的GitHub用户名是oldman，使用下面命令克隆
```
git clone git@old.github.com:oldman/test.git
```
避免git错用密钥，把git全局的用户名和邮箱删除

```
git config --global --unset user.email
git config --global --unset user.name
```

删除后，以后进入每个仓库都要指定该仓库局部的`user.mail`和`user.name`。

```
git config  user.email "you@example.com"
git config  user.name "Your Name"
```
