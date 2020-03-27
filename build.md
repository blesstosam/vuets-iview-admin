# 配合shell脚本 build.sh 实现持续集成功能
### 切换账号
`su gitlab-runner`

### 生成ssh-keygen
`ssh-keygen`

### 将本地服务器/home/gitlab-runner/.ssh/id_rsa.pub文件内容 添加到目标服务器/root/.ssh/authorized_keys

### 将目标服务器ip添加到本地/home/gitlab-runner/.ssh/known_hosts或者进行一次ssh连接操作 ssh root@xx.xx.xx.xx

### 参考
[参考](https://www.jianshu.com/p/c1a70e808e2d)