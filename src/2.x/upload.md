---
description: '提供图片上传接口：地址为 http://img2.larxd.com/uploadimage，需传字段 imagefile（图片）、type（暂不启用）、uploadtoken（上传key）。返回参数：status（success/error）、url（成功时返回）、destination（成功时返回）、msg（正确或错误信息）。'
lastUpdated: '2026-06-22 13:41:55'
head:
  - - meta
    - name: 'og:title'
      content: '图片上传'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '提供图片上传接口：地址为 http://img2.larxd.com/uploadimage，需传字段 imagefile（图片）、type（暂不启用）、uploadtoken（上传key）。返回参数：status（success/error）、url（成功时返回）、destination（成功时返回）、msg（正确或错误信息）。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech//2.x/upload.html'
---
# 图片上传

## 图片上传请求

- 上传地址：

```Plaintext
http://img2.larxd.com/upload_image
```

- 需要传值的字段

```Plaintext
图片的字段 ： image_file
返回的类型 ： type （暂不启用）
上传的key ： upload_token
```

- 返回的参数

```Plaintext
status      : success/error
url         : 成功返回
destination : 成功返回
msg         : 返回正确或者错误的信息
```