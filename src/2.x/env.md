---
description: '本文档总结了环境配置的要点，涵盖基础与项目环境设置、数据库、缓存、session、队列、邮件配置，以及第三方服务集成，包括图片上传（含远程上传、token获取、回调与跨域处理）、API配置（支付宝、融云、微信支付、chinapay、友盟）等关键步骤。'
lastUpdated: '2026-06-22 13:43:10'
head:
  - - meta
    - name: 'og:title'
      content: 'Env 环境配置'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '本文档总结了环境配置的要点，涵盖基础与项目环境设置、数据库、缓存、session、队列、邮件配置，以及第三方服务集成，包括图片上传（含远程上传、token获取、回调与跨域处理）、API配置（支付宝、融云、微信支付、chinapay、友盟）等关键步骤。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech//2.x/env.html'
---
# Env 环境配置

## 基础环境

### 项目环境

```Plaintext
APP_ENV=local      # 上线后为 production
APP_DEBUG=true     # 线上关闭debug
APP_KEY=1hSm25JlcusKQGdShlbnZlgVaCb3DetR    # 设置加密密钥
```

### 配置数据库

```Plaintext
DB_HOST=192.168.1.134
DB_DATABASE=ixdcw_dev
DB_USERNAME=root
DB_PASSWORD=xddlxdcw
```

### 缓存 , session, 队列

```Plaintext
CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_DRIVER=database
```

### 配置邮件

```Plaintext
MAIL_DRIVER=smtp
MAIL_HOST=smtp.exmail.qq.com
MAIL_PORT=465
MAIL_ENCRYPTION=ssl
MAIL_USERNAME=10000@ixdcw.com
MAIL_PASSWORD=
```

## 第三方数据

### 图片上传

图片上传采用 l5-upload-client 组件, 这个组件形成了客户端 + 远程的方式进行上传, 几个参数配置及解释如下 如果本机作为客户端机器来访问, 需要配置

```Plaintext
# 是否启用远程上传
L5_UPLOAD_ENABLE=true
# 图片配置的key
L5_UPLOAD_CLIENT_KEY=3302300000263176
L5_UPLOAD_CLIENT_SECRET=12345678901234567890
# 上传图片的地址
L5_UPLOAD_IMAGE_URL=http://img2.ixdcw.com/upload_image
# 获取token值的地址
L5_UPLOAD_TOKEN_URL=http://img2.ixdcw.com/upload_token
# 替换的返回地址
LEMON_RETURN_URL=http://img2.ixdcw.com/thumber/config
# 回调地址, 跨域等问题的解决
LEMON_CALLBACK_URL=http://www.ixdcw.com/upload_return
```

### API 配置

```Plaintext
API_PREFIX=api
API_DEFAULT_FORMAT=json
API_TIME_EXPIRE=720  # 30days
API_TIME_OFFSET=1800
```

### 配置支付宝支付

```Plaintext
# 支付宝的key配置， 使用 l5-alipay plugin
L5_ALIPAY_SELL_ID=xundu0002@163.com
L5_ALIPAY_PARTNER_ID=2088801005396460
L5_ALIPAY_DIRECT_PAY_KEY=1uzayyzmkzl4tjys2x8af3yzwr583rm8
```

### 配置融云

```Plaintext
RONGYUN_APP_KEY=y745wfm84eefv
RONGYUN_APP_SECRET=3bofyzNNpQ99
RONGYUN_APP_FORMAT=json
```

### 配置微信支付

```Plaintext
# 微信的key
WX_APP_ID=wx3454678d1fe5743f
WX_MCH_ID=1265409901
WX_KEY=346d3a41f29b2e0106c6266c37a8ce94
WX_APP_SECRET=01c6d59a3f9024db6336662ac95c8e74
WX_CURL_PROXY_HOST=0.0.0.0
WX_CURL_PROXY_PORT=0
WX_REPORT_LEVENL=1
WX_NOTIFY_URLL=finance/weixin_notify
```

### 配置 chinapay 支付

```Plaintext
L5_CHINAPAY_ENV=test    # production 代替线上环境
```

### 友盟的 key

```Plaintext
UM_ANDROID_APP_KEY=55114237******000a33
UM_ANDROID_MASTER_SECRET=yfejij3y7i6******7prrwnllnhz8
UM_IOS_APP_KEY=557e776b67******000a89
UM_IOS_MASTER_SECRET=klsghik55******0hu0fdfkjvev1
```