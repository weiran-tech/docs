---
description: ''
lastUpdated: '2023-12-11 19:00:00'
head: 
  - - meta
    - name: 'og:title'
      content: '图片上传'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: ''
---
# 图片上传



## 图片上传请求

- 上传地址：

```
http://img2.larxd.com/upload_image
```

- 需要传值的字段

```
图片的字段 ： image_file
返回的类型 ： type （暂不启用）
上传的key ： upload_token
```

- 返回的参数

```
status      : success/error
url         : 成功返回
destination : 成功返回
msg         : 返回正确或者错误的信息
```

