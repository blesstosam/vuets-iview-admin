#!/bin/sh
npm run pretest
echo "--------------------------- 开始构建项目${1} ------------------------"
package_name="${1}.zip"
remote_ip="root@xxx.xxx.xxx.xxx"
remote_target_address="nginx_home_path"

command -v zip >/dev/null 2>&1 || { echo >&2 "未安装zip"; exit 1; }
echo "--------------------------- 压缩项目${1} ----------------------------"
zip -r ${package_name} ${1}/

command -v scp >/dev/null 2>&1 || { echo >&2 "未安装scp"; exit 1; }
echo "--------------------------- 开始上传压缩包 ---------------------------"
scp ./${package_name} ${remote_ip}:${remote_target_address}

command -v ssh >/dev/null 2>&1 || { echo >&2 "未安装ssh"; exit 1; }
echo "--------------------------- 开始解压上传的文件 ------------------------"
ssh ${remote_ip} "cd ${remote_target_address} ; rm -rf ${1} && unzip ${package_name}"
