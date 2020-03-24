
## Git 概览

- 分布式版本控制
- 记录快照，而非差异比较
- 本地仓库用于版本控制
- 远程仓库用于同步及协作
- 多数操作为添加数据
- 丰富的分支管理功能

### 分布式版本控制 / 源代码管理器）（大概概念）

**版本控制系统**（简称 **VCS**）是一个管理源代码不同版本的工具。**源代码管理器**（简称 **SCM**）是版本控制系统的另一个名称。

Git 是一个 SCM（因此也是 VCS！）。Git 网站的 URL 是 [https://git-scm.com/](https://git-scm.com/) （注意它的域名中直接包含“SCM”！）。

像 Git，Mercurial，Bazaar 以及 Darcs 等，**客户端并不只提取最新版本的文件快照，而是把代码仓库完整地镜像下来。**这么一来，任何一处协同工作用的服务器发生故障，事后都可以用任何一个镜像出来的本地仓库恢复。因为每一次的提取操作，实际上都是一次对代码仓库的完整备份

![](./img/DVCS.png)

#### 优点与缺点

分布式 VCS 的优点有：

1. 大多数的操作可以在本地进行，所以速度更快，而且由于无需联网，所以即使不在公司甚至没有在联网，你也可以提交代码、查看历史，从而极大地减小了开发者的网络条件和物理位置的限制（例如，你可以在飞机上提交代码、切换分支等等）；
2. 由于可以提交到本地，所以你可以分步提交代码，把代码提交做得更细，而不是一个提交包含很多代码，难以 review 也难以回溯。

分布式 VCS 的缺点：

1. 由于每一个机器都有完整的本地仓库，所以初次获取项目（Git 术语：clone）的时候会比较耗时；
2. 由于每个机器都有完整的本地仓库，所以本地占用的存储比中央式 VCS 要高。

> 对于一般的程序项目而言，由于项目的大多数内容都是文本形式的代码，所以工程的体积都并不是很大，再加上文本内容自身的特点，VCS 可以利用算法来把仓库的体积极大地压缩。这就导致，在实际中，Git 等分布式 VCS 的仓库体积并不大，初次获取项目的耗时和本地仓库的存储占用都很小。所以对于大多数的程序项目而言，分布式 VCS 「尺寸大、初次下载慢」的问题其实并不严重。

> 不过也有一些例外，比如游戏开发。游戏的开发中有大量的大尺寸数据和媒体文件，并且这些文件的格式也不容易压缩尺寸，如果用分布式 VCS 会导致仓库的体积非常庞大。所以一些大型游戏的开发会选择中央式的 VCS 来管理代码。



### 文件的三种状态


![](https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2391503317,2295283142&fm=26&gp=0.jpg)



#### Working directory

- 工作目录
- 通过checkout从本地仓库提取
- 可直接修改

#### Staging area

- 缓存区域
- 通过git add/remove来修改

#### Repository

- 本地仓库
- 通过commit提交版本
- 通过reset/merge进行变更

### 远程仓库

![](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536601302768&di=417275dc1b9909932edb8b62c21638e4&imgtype=0&src=http%3A%2F%2Fimages.cnblogs.com%2Fcnblogs_com%2Fwupeiqi%2F662608%2Fo_git.png)

- 通过push推送版本至远程仓库
- 通过fetch拉去版本至本地仓库
- pull = fetch + merge

### Git 直接保存快照而不是文件差异
- 其他
![](./img/其他系统.png)
- Git
![](./img/git的方式.png)

### git 配置

一般在新的系统上，都要先配置 git 的工作环境，配置工作只需一次

Git 提供了一个叫做 git config 的工具（译注：实际是 git-config 命令，只不过可以通过 git 加一个名字来呼叫此命令。），专门用来配置或读取相应的工作环境变量。而正是由这些环境变量，决定了 Git 在各个环节的具体工作方式和行为。这些变量可以存放在以下三个不同的地方：

- `/etc/gitconfig` 文件：系统中对所有用户都普遍适用的配置。若使用 `git config` 时用 --system 选项，读写的就是这个文件。
- `~/.gitconfig` 文件：用户目录下的配置文件只适用于该用户。若使用 git config 时用 --global 选项，读写的就是这个文件。
- 当前项目的 git 目录中的配置文件（也就是工作目录中的 `.git/config` 文件）：这里的配置仅仅针对当前项目有效。每一个级别的配置都会覆盖上层的相同配置，所以 `.git/config` 里的配置会覆盖 `/etc/gitconfig` 中的同名变量。

在 Windows 系统上，Git 会找寻用户主目录下的 `.gitconfig` 文件。主目录即 `$HOME` 变量指定的目录，一般都是 `C:\Documents and Settings\$USER`。此外，Git 还会尝试找寻 `/etc/gitconfig` 文件，只不过看当初 Git 装在什么目录，就以此作为根目录来定位。

#### 查看
`git config --list` 已有
`git config user.name` 查看特定
#### 用户信息
```shell
$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com
```

### 分支


