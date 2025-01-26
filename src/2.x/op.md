---
description: '需要开启的组件 需要开启 mod-rewrite 重写组件主要配置文件 http.conf配置虚拟主机 找到 httpd-vhosts.conf文件并编辑：请求地址: SERVER/sl_deploy/coding 需要设置 token 值, 默认的 token值为 代码目录下 .env 文件中的 APP_KEY 的值1、出现问题之后，请首先查找日志文件/apache/网站2、如果出现文件访问权限问题，请注意安装文件目录权限、apache的访问目录权限等。'
lastUpdated: '2023-12-11 23:02:00'
head: 
  - - meta
    - name: 'og:title'
      content: '服务器环境配置'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '需要开启的组件 需要开启 mod-rewrite 重写组件主要配置文件 http.conf配置虚拟主机 找到 httpd-vhosts.conf文件并编辑：请求地址: SERVER/sl_deploy/coding 需要设置 token 值, 默认的 token值为 代码目录下 .env 文件中的 APP_KEY 的值1、出现问题之后，请首先查找日志文件/apache/网站2、如果出现文件访问权限问题，请注意安装文件目录权限、apache的访问目录权限等。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/2.x/op.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/notion/0f/0f19868162589528894d6999d694616e.jpg?x-oss-process=image/resize,m_mfit,w_400'
---
# 服务器环境配置



## 服务器环境配置

### 需要软件

- Mysql 5.6+, 建议(5.7) 支持 mysql 的 innodb 的 全文索引
- php 5.6 + 建议(7.0) 性能会是最优的
- Nginx/Apache

### nginx 配置

```
server {

    # port
    listen 80;

    # server
    server_name l.dailian.sour-lemon.com;

    # index
    index index.php index.html;

    # root path
    root /data/www/dailian/public/;

    # php支持
    location ~ .*\.php$ {
        fastcgi_pass 127.0.0.1:9000;
        fastcgi_index index.php;
        include fastcgi.conf;

        # sock 方式
        # fastcgi_pass unix:/run/php/php7.0-fpm.sock;
    }

    # route rewrite
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # 静态文件缓存
    location ~ .*\.(js|css)?$ {
        expires 12h;
    }

    # 日志
    access_log /data/web_log/dailian_access.log;
    error_log /data/web_log/dailian_error.log;
}
```

### Apache 配置

**需要开启的组件**  需要开启  `mod-rewrite`  重写组件

**主要配置文件 http.conf**

```
# 开启重写, 配置允许访问
<Directory />
    Options FollowSymLinks
    AllowOverride All
    Order deny,allow
    Allow from all
</Directory>

# 配置 index.php
<IfModule dir_module>
    DirectoryIndex index.php index.html index.htm
</IfModule>

# 开启虚拟主机
Include conf/extra/httpd-vhosts.conf

# 需要 .htaccess 的访问
<FilesMatch "^\.ht">
    Order allow,deny
    Allow from all
    Satisfy All
</FilesMatch>
```

**配置虚拟主机**  找到  `httpd-vhosts.conf` 文件并编辑：

```
<VirtualHost *:80>
    DocumentRoot "D:\wamp\www\ixdcw"
    ServerName l.dailian.sour-lemon.com
    ServerAlias l.dailian.api.sour-lemon.com
    ErrorLog "logs/dailian_error.log"
    CustomLog "logs/dailian_access.log" common
    RewriteEngine on
    <Directory "D:\wamp\www\ixdcw">
        Options FollowSymLinks
        AllowOverride ALL
        Order allow,deny
        Allow from all
    </Directory>
</VirtualHost>
```

## laravel 运行配置

### 配置计划任务

```
$ sudo crontab -e
* * * * * php /media/web/www/project_name/artisan schedule:run 1>> /dev/null 2>&1
```

### supervisor 运行队列监听

```
[program:dailian]
process_name=%(program_name)s_%(process_num)02d
command=php /media/web/www/project_name/artisan queue:work --sleep=3 --tries=3 --daemon
autostart=true
autorestart=true
user=mark
numprocs=1
redirect_stderr=true
stdout_logfile=/media/web/www/project_name/storage/server/job.log
```

### 自动化部署

请求地址: SERVER/sl_deploy/coding 需要设置  `token`  值, 默认的  `token` 值为 代码目录下  `.env`  文件中的  `APP_KEY`  的值

![](https://file.wulicode.com/notion/0f/0f19868162589528894d6999d694616e.jpg)

## 开发注意事项

### 错误查找

1、出现问题之后，请首先查找日志文件/apache/网站

2、如果出现文件访问权限问题，请注意安装文件目录权限、apache的访问目录权限等。

### 生成 apidoc 文档

```
apidoc -i app/Http/Controllers/Api/ -o public/docs/api
```

### 生成 phpdoc 文档

```
php vendor/sami/sami/sami.php update config/sami.php
```

### 生成  `global.js` 

```
# 必须使用 php5.5.9+ 版本的php 来访问
php artisan lemon:fe
```

