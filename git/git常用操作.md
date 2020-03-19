## 基础操作

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
| 更改最后一次提交        | `git commit --amend`                  |
| 取消暂存文件         | `git reset HEAD <file>`               |
| 撤消对文件的修改       | `git checkout -- <file>`              |
| 查看远程仓库           | `git remote -v`                       |
| 添加远程仓库           | `git remote add <shortname> <url> `   |
| 从远程仓库中抓取与拉取 | `git fetch [remote-name]`             |
| 推送到远程仓库         | `git push [remote-name][branch-name]` |
| 远程仓库的移除         | `git remote rm <shortname>`           |

### 修改最后一次提交
```
$ git commit -m 'initial commit'
    $ git add forgotten_file
    $ git commit --amend
```
