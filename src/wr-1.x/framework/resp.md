---
description: 'Api 以 Json 格式返回: 其中代表的含义如下:下边是示例代码:有服务器错误服务器无错误默认错误码自定义错误码其中错误的语言描述可以使用 语言包来编写编写附加数据如果是 web 页面进行使用则调用定义的正确/错误的页面进行显示.'
lastUpdated: '2025-02-05 11:21:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'Resp'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Api 以 Json 格式返回: 其中代表的含义如下:下边是示例代码:有服务器错误服务器无错误默认错误码自定义错误码其中错误的语言描述可以使用 语言包来编写编写附加数据如果是 web 页面进行使用则调用定义的正确/错误的页面进行显示.'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/wr-1.x/framework/resp.html'
---
# Resp



## 说明

Api 以 Json 格式返回: 其中代表的含义如下:

-  `status` 服务器错误码, 代表服务器出现错误,  `500`  代表内部查询出现问题,  `404`  代表页面不存在, 等
-  `message` 服务返回的提示信息, 如果存在  `status`  , 则代表服务报错信息, 如果是自定义的 code, 这里返回的是自定义的提示信息
-  `data` 返回正确的时候,  `data`  中会存在附加数据, 附加数据说明放置在 api 文档中, 这里不做任何补充提示.

下边是示例代码:

**有服务器错误**

```json
{
	"status": 500,
	"message": "Internal Server Error"
}
```

**服务器无错误**

```json
{
	"status": 0,
	"message": "获取用户信息成功!",
	"data": {
		"username": "dashou001",
		"userid": 123354
	}
}
```

## 错误码

**默认错误码**

```
0   : 操作成功
1   : 操作失败
2   : 凭据超时
3   : 凭据不存在
4   : 凭据错误
5   : 请求参数错误
6   : 签名错误
7   : 无权限操作
99  : 接口内部错误
```

**自定义错误码**

> 建议自定义错误码, 使用 6 位的数字, 代表含义如下

```
100101  : 错误码拆分为 3 部分
10   : 模块
01   : Action (业务逻辑)
01   : 该业务逻辑下错误码序列号
```

其中错误的语言描述可以使用 语言包来编写

## 编写

**编写**

```php
// 错误信息, 可以自定义错误码
Resp::web(Resp:ERROR, '错误信息');
Resp::error('错误信息')

// 正确信息
Resp::web(Resp:SUCCESS, '正确信息');
Resp::success('正确信息'))
```

**附加数据**

```php
// 数组方式返回
Resp::error('错误信息', [
    'motion' => 'window:reload'
])

// kv 方式写法
Resp::error('错误信息', 'motion|window:reload')
```

如果是 web 页面进行使用则调用定义的正确/错误的页面进行显示.



