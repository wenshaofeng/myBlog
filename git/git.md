# Git分享

## Git概览

- 分布式版本控制
- 记录所有文件，而非快照
- 本地仓库用于版本控制
- 远程仓库用于同步及协作
- 多数操作为添加数据
- 丰富的分支管理功能

## Git基础

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

### 基础操作

| 操作                   | 命令                                  |
| ---------------------- | ------------------------------------- |
| 初始化仓库             | `git init`                            |
| 克隆仓库               | `git clone <url>`                     |
| 检查本地文件状态       | `git status `                         |
| 将文件加入缓存区       | `git add <file>`                      |
| 忽略文件               | `echo <file> >> .gitignore `          |
| 提交更新               | `git commit`                          |
| 移除本地文件           | `rm <file>`<br>`git rm <file>`        |
| 移除缓存文件           | `git rm --cached <file>`              |
| 移动文件               | `git mv <file_from> <file_to>`        |
| 更改提交               | `git commit --amend`                  |
| 取消暂存文件           | `git reset HEAD <file>`               |
| 撤消对文件的修改       | `git checkout -- <file>`              |
| 查看远程仓库           | `git remote -v`                       |
| 添加远程仓库           | `git remote add <shortname> <url> `   |
| 从远程仓库中抓取与拉取 | `git fetch [remote-name]`             |
| 推送到远程仓库         | `git push [remote-name][branch-name]` |
| 远程仓库的移除         | `git remote rm <shortname>`           |

## Git存储原理

### Git 对象

- Git 从核心上来看不过是简单地存储键值对（key-value）
- 通过SHA-1算法生成hash

#### blob

- 单个文件

#### tree

- 类unix文件系统

- 一个单独的 tree 对象包含一条或多条 tree 记录

- 每一条记录含有一个指向 blob 或子 tree 对象的 SHA-1 指针

  ![](https://git-scm.com/figures/18333fig0902-tn.png)

#### commit

- 指向一个tree的SHA-1

- 指定了之前commit的SHA-1

- 包含一些commit信息

  ![](https://git-scm.com/figures/18333fig0903-tn.png)

#### tag

- 指向commit的SHA-1
- annotated tag

#### reference

- 指向commit的SHA-1

- 没有实体，在`.git/ref`中更新

- 分支及轻量级tag

  ![](https://git-scm.com/figures/18333fig0904-tn.png)

#### HEAD 标记

- 指向某一个reference

  ```
  $ cat .git/HEAD
  ref: refs/heads/test
  ```



## 分支

- 分支其实就是从某个提交对象往回看的历史

![](https://git-scm.com/figures/18333fig0309-tn.png)

### 分支创建

```console
$ git branch testing
```

![](https://git-scm.com/book/en/v2/images/head-to-master.png)

创建了一个分支的指针

### 分支切换

```con
$ git checkout testing
```



![](https://git-scm.com/book/en/v2/images/head-to-testing.png)



### 分支合并

#### fast-forward

仅移动分支指针

**前**

![](https://git-scm.com/book/en/v2/images/basic-branching-4.png)

```console
$ git checkout master
$ git merge hotfix
Updating f42c576..3a0874c
Fast-forward
 index.html | 2 ++
 1 file changed, 2 insertions(+)
```

**后**

![](https://git-scm.com/book/en/v2/images/basic-branching-5.png)



#### 合并

**前**

![](https://git-scm.com/book/en/v2/images/basic-merging-1.png)

```console
$ git checkout master
Switched to branch 'master'
$ git merge iss53
Merge made by the 'recursive' strategy.
index.html |    1 +
1 file changed, 1 insertion(+)
```

**后**

![](https://git-scm.com/book/en/v2/images/basic-merging-2.png)



- Git 会使用两个分支的末端所指的快照（`C4` 和 `C5`）以及这两个分支的工作祖先（`C2`），做一个简单的三方合并

- Git 会自行决定选取哪一个提交作为最优的共同祖先，并以此作为合并的基础

#### 遇到冲突

```console
$ git merge iss53
Auto-merging index.html
CONFLICT (content): Merge conflict in index.html
Automatic merge failed; fix conflicts and then commit the result.
```

- 自行解决冲突
- 推荐使用Jetbrain全家桶内置的git工具

### 分支变基

回到两个分支最近的共同祖先，根据当前分支后续的历次提交对象，生成一系列文件补丁，然后以基底分支最后一个提交对象为新的出发点，逐个应用之前准备好的补丁文件，最后会生成一个新的合并提交对象，从而改写 提交历史。

**前**



![](https://git-scm.com/figures/18333fig0327-tn.png)



```
$ git checkout experiment
$ git rebase master
First, rewinding head to replay your work on top of it...
Applying: added staged command
```



**后**

![](https://git-scm.com/figures/18333fig0329-tn.png)

#### 风险

- 变基会更改分支的commit路径
- 禁止对远程分支进行变基

### git cherry-pick

- 选择另一个分支的commit在本分支重放
- 重放当个commit
  - `git cherry-pick <commit-id>`
- 重放多个commit
  - `git cherry-pick <commit-id-from> <commit-id-to>`

### 远程分支

- 用 `<remote>/<branch>` 这样的形式表示远程分支
-  使用`fetch` 操作下载新的远程分支
- 远程分支是一个无法移动的 `<remote>/<branch>` 引用。
- 使用`git merge <remote>/<branch>`合并远程分支
- 从远程分支 `checkout` 出来的本地分支，称为 *跟踪分支* (tracking branch)
- 可以直接使用`push/pull`来操作跟踪分支

- 删除远程分支：`git push <remote> :<branch>`

### 分支提交历史

使用`git log`用于查看分支提交历史

| 选项                | 说明                                                         |
| ------------------- | ------------------------------------------------------------ |
| `-p`                | 按补丁格式显示每个更新之间的差异。                           |
| `--word-diff`       | 按 word diff 格式显示差异。                                  |
| `--stat`            | 显示每次更新的文件修改统计信息。                             |
| `--shortstat`       | 只显示 --stat 中最后的行数修改添加移除统计。                 |
| `--name-only`       | 仅在提交信息后显示已修改的文件清单。                         |
| `--name-status`     | 显示新增、修改、删除的文件清单。                             |
| `--abbrev-commit`   | 仅显示 SHA-1 的前几个字符，而非所有的 40 个字符。            |
| `--relative-date`   | 使用较短的相对时间显示（比如，“2 weeks ago”）。              |
| `--graph`           | 显示 ASCII 图形表示的分支合并历史。                          |
| `--pretty`          | 使用其他格式显示历史提交信息。可用的选项包括 oneline，short，full，fuller 和 format（后跟指定格式）。 |
| `--oneline`         | `--pretty=oneline --abbrev-commit` 的简化用法。              |
| `-(n)`              | 仅显示最近的 n 条提交                                        |
| `--since, --after`  | 仅显示指定时间之后的提交。                                   |
| `--until, --before` | 仅显示指定时间之前的提交。                                   |
| `--author`          | 仅显示指定作者相关的提交。                                   |

### git reset,checkout

#### git reset

- 用来修改提交历史的

- 丢弃掉一些版本历史

  - 不丢弃使用revert，创建一个新的commit
  - 已经push到远程仓库的commit不允许reset

- 参数：`--soft`, `--mixed`, `--hard`

  - 改变HEAD所指向的commit(`--soft`)

  - 执行第1步，将Staging区域更新为HEAD所指向的commit里包含的内容(`--mixed`)
  - 执行第1、2步，将Working Directory区域更新为HEAD所指向的commit里包含的内容(`--hard`)

- 带文件参数的reset

  - HEAD不会动

  - 将那个commit的snapshot里的那个文件放到Index区域中

#### git checkout

- 只改变HEAD指针
  - 将HEAD指向那个分支的最后一次commit
  - 将HEAD指向的commit里所有文件的snapshot替换掉Stage区域里原来的内容
  - 将Stage区域里的内容填充到Working Directory里

- 和`reset --hard`相比

  - reset会把working directory里的所有内容都更新掉

  - checkout不会去修改你在Working Directory里修改过的文件

  - reset把branch移动到HEAD指向的地方

  - checkout则可以HEAD移动到另一个分支

- 带文件参数

  - 更新了staging区域里file文件的内容

  - 更新了working directory里file文件的内容

#### 对比

```
                         head    index   work dir  wd safe
Commit Level
reset --soft [commit]    REF     NO      NO        YES
reset [commit]           REF     YES     NO        YES
reset --hard [commit]    REF     YES     YES       NO
checkout [commit]        HEAD    YES     YES       YES

File Level
reset (commit) [file]    NO      YES     NO        YES
checkout (commit) [file] NO      YES     YES       NO
```



“head”一列中的“REF”表示该命令移动了HEAD指向的分支引用，而“HEAD”则表示只移动了HEAD自身。 特别注意 “wd safe?” 一列，YES表示不会懂你在work dir的修改，NO代表会动你在work dir的修改。

### 分支管理

- master分支

  发布分支，完全稳定的代码，即已经发布或即将发布的代码

- dev分支

  开发分支，或仅用于稳定性测试 — 当然并不是说一定要绝对稳定，不过一旦进入某种稳定状态，便可以把它合并到 `master` 里

  - 如果mater分支与dev分支没有分叉，可以直接fast-forward
  - 如果mater分支与dev分支分叉，可以选择merge或者cherry-pick

- 特性分支

  工作分支，开发完成后可合并进`dev`分支



  ![](![img](https://git-scm.com/figures/18333fig0319-tn.png)



## Git标签

Git 可以给历史中的某一个提交打上标签，以示重要。 比较有代表性的是人们会使用这个功能来标记发布结点（v1.0 等等）

### 列出标签

```console
$git tag
v0.1
v1.3
```

### 标签类型

- 轻量标签（lightweight）

  - 一个轻量标签很像一个不会改变的分支 - 它只是一个特定提交的引用

  - 创建  - `git tag <version> <commit>` 

- 附注标签（annotated）

  - 附注标签是存储在 Git 数据库中的一个完整对象。
  -  它们是可以被校验的；其中包含打标签者的名字、电子邮件地址、日期时间；还有一个标签信息
  - 可以使用 GNU Privacy Guard （GPG）签名与验证。 
  - 创建 - `git tag -a <version> <commit> -m <comment>`

### 创建标签

- 轻量标签（lightweight）

### 共享标签

默认情况下，`git push` 命令并不会传送标签到远程仓库服务器上。 在创建完标签后你必须显式地推送标签到共享服务器上。 这个过程就像共享远程分支一样 - 你可以运行 `git push origin [tagname]`

### 检出标签

在 Git 中你并不能真的检出一个标签，因为它们并不能像分支一样来回移动。 如果你想要工作目录与仓库中特定的标签版本完全一样，可以使用 `git checkout -b [branchname] [tagname]` 在特定的标签上创建一个新分支