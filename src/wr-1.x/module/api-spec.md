---
description: '虽然HTTP请求有多种请求方式，但是考虑到通用性、安全性等因素，我们统一使用 GET，POST 方式。1.用途2.URL 结构1.用途：2.URL 结构3.请求体1. 格式：注意：by+名词可选2. 动作实例：连接验签六：API公共错误码code（返回码）浏览器状态码描述200200接口调用成功500200业务异常500500系统内部异常400200参数错误403403资源无权限401401未经许可的请求自定义200自定义错误系统使用 token 接口的组织方式, 采用服务器验证的方式来存储数据, 即服务器首次访问的时候会首先访问 api/web'
lastUpdated: '2025-02-27 23:00:00'
head: 
  - - meta
    - name: 'og:title'
      content: '[WIP] Api 文档规范'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '虽然HTTP请求有多种请求方式，但是考虑到通用性、安全性等因素，我们统一使用 GET，POST 方式。1.用途2.URL 结构1.用途：2.URL 结构3.请求体1. 格式：注意：by+名词可选2. 动作实例：连接验签六：API公共错误码code（返回码）浏览器状态码描述200200接口调用成功500200业务异常500500系统内部异常400200参数错误403403资源无权限401401未经许可的请求自定义200自定义错误系统使用 token 接口的组织方式, 采用服务器验证的方式来存储数据, 即服务器首次访问的时候会首先访问 api/web'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech1a749524-d1e0-8006-8e2f-ffa0c5e1d674.html'
---
# [WIP] Api 文档规范



##  **请求方式** 

虽然HTTP请求有多种请求方式，但是考虑到通用性、安全性等因素，我们统一使用  `GET` ， `POST`  方式。

###  **GET 请求规范** 

1.用途

- 获取数据：用于从服务器检索资源或数据

2.URL 结构

- 简洁且具有描述性：URL 应简洁且能清晰描述资源
- 例如：/user/v1/list_user，获取所有用户列表
- 查询参数：使用查询字符串传递参数
- 例如：/user/v1/list_user?userName="张三"&sex=1

###  **POST 请求规范** 

1.用途：

- 提交数据：用于向服务器提交数据，通常用于创建或更新资源

2.URL 结构

- 指向资源集合：URL 应指向资源集合
- 例如：/user/v1/add，/user/v1/update，用户新增和更新用户信息

3.请求体

- JSON 格式：请求通常采用 JSON 格式（body 体）传入
- 必须字段：确保包含所有必须的字段，并验证字段类型和格式

##  **二：接口命名** 

###  **命名规范** 

- 除了版本号，接口路径中尽量使用字母
- 字母全部小写，尽量不使用单词缩写
- 可以使用下划线“_”分割单词

### 路径格式

1. 格式：

- /{服务名}/{模块名}/{资源名}/{版本号}/{动作+by+名词}

注意：by+名词可选

2. 动作实例：

<table>
  <tr>
    <td> <strong>含义</strong> </td>
    <td> <strong>关键字</strong> </td>
  </tr>
  <tr>
    <td>单个获取</td>
    <td>get</td>
  </tr>
  <tr>
    <td>批量获取</td>
    <td>list</td>
  </tr>
  <tr>
    <td>单个新增</td>
    <td>add</td>
  </tr>
  <tr>
    <td>批量新增</td>
    <td>batch_add</td>
  </tr>
  <tr>
    <td>单个修改</td>
    <td>update</td>
  </tr>
  <tr>
    <td>批量修改</td>
    <td>batch_update</td>
  </tr>
  <tr>
    <td>删除</td>
    <td>delete</td>
  </tr>
  <tr>
    <td>批量删除</td>
    <td>batch_delete</td>
  </tr>
  <tr>
    <td>彻底删除</td>
    <td>destroy</td>
  </tr>
  <tr>
    <td>发送</td>
    <td>send</td>
  </tr>
</table>

### 接口示例

- 获取用户接口：/kjs/user_manage/user/v1/get
- 根据多个用户ID获取用户接口：/kjs/user_manage/user/v1/list_user_by_ids

##  **三：请求入参** 

###  **入参规范** 

- 入参使用JSON数据格式，值使用数字或字符类型。
- 入参尽量简练，代码逻辑中用不到的参数不能出现在参数列表里。
- 入参Key使用小写字母开头的lowerCamelCase（小驼峰）命名方式，如：userName 。
- 入参是不可信的，后端都应在代码逻辑中对入参有相应的校验

###  **入参示例** 

```
{
    "name":"张三",    // 字符类型值
    "age":2,         // 数字类型值
    "current":1,     // 查询目标页数
    "size":10        // 每页条数
}
```

```
{
    "name":"张三",   // 字符类型值
    "age":2         // 数字类型值
}
```

##  **四：请求出参** 

###  **出参规范** 

- 出参使用JSON数据格式，值使用数字或字符类型。
- 返回参数只包含必要的参数，按需返回，数据尽量简单轻量。
- 出参Key使用小写字母开头的lowerCamelCase（小驼峰）命名方式，如：userName 。
- 出参需要与前端对接的接口，应按照前端要求返回参数，最好在开发写业务逻辑前先接口定义。

###  **出参示例** 

```
{
    "code":200,             // 返回码
    "data":{                // 返回数据
        "current":1,        // 当前页
        "records":[
            {
                "name":"张三",
                "age":2
            }
        ],
        "size":10,           // 每页条数
        "total":1            // 总条数
    },
    "msg":null
}
```

```
{
    "code":200,            // 返回码
    "data":[               // 返回数据
        {
            "name":"张三",
            "age":2
        }
    ],
    "msg":null
}
```

```
{
    "code":500,        // 返回码
    "msg":"系统异常"    // 错误描述
}
```

```
data class Response<T>(
    val status: Int,
    val success: Boolean,
    var message: String,
    var data: T? = null,
    val requestId: String? = MDC.get(Constant.REQUEST_ID)
)
```

##  **五：接口验签** 

[连接验签](https://alidocs.dingtalk.com/i/nodes/ydxXB52LJq6bALDXFw1XY1eo8qjMp697?cid=22002813%3A737731271&corpId=dingc94df3ab52c86fcc35c2f4657eb6378f&doc_type=wiki_doc&iframeQuery=utm_medium%3Dim_card%26utm_source%3Dim&utm_medium=im_card&utm_scene=team_space&utm_source=im#)

**六：API公共错误码code（返回码）浏览器状态码描述200200** 接口调用成功 **500200** 业务异常 **500500** 系统内部异常 **400200** 参数错误 **403403** 资源无权限 **401401** 未经许可的请求 **自定义200自定义错误**

# Token 值说明

### 说明

系统使用 token 接口的组织方式, 采用服务器验证的方式来存储数据, 即服务器首次访问的时候会首先访问  `api/web/system/v1/auth/login`  接口, 然后从返回的接口中中获取到  `token` , 以后将 `token`  作为账号认证权限来对服务器进行再次请求, 作为授权来进行访问

首次登录将会获取如下示例:

```
{
    "status": 0,
    "message": "[开发]登录成功",
    "data": {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vZC5xaW5nemh1LmRhbml1LmNvbS9hcGlfdjEvc3lzdGVtL2F1dGgvbG9naW4iLCJpYXQiOjE1NTkzMTc2ODQsImV4cCI6MTU2MTkwOTY4NCwibmJmIjoxNTU5MzE3Njg0LCJqdGkiOiJDVGNoQ2p1NHBSaUxXQzR5Iiwic3ViIjozLCJwcnYiOiI5YWRjMjVkZjM0MjczMDBkZmVmNzM5ODQ2OWY1MzIwM2VjOTY5OTEwIiwidXNlciI6eyJpZCI6M319.MPw7NF-WWAvdEc-y7M7mR3AwZ2owqiWohKIjeJDRFGM"
    }
}
```

再次进行访问的时候将会传入这个值  `token` , 否则将不会返回任何有效数据

## [WIP]参数加密说明

所有接口请求的参数需要带加密签名校验（即 sign 参数必加），否则无法验证通过, 加密参数顺序按照字母表的排序顺序进行加密，第一位相同比较第二位，依次往下

### sign 生成规范

> 当前暂不进行验签生成, 参数中增加 _py_secret : 112233445566 来进行取消验签

```
# 输入的参数
$params = [
    'captcha'   => '',
    'passport'  => 'qingzhu',
    'password'  => '123456',
    'timestamp' => 1559316151,
];
# 将所有的参数按照 键进行字母排序, 并且转换成 Kv 字串, 以上的参数会拼接成
# captcha=,passport=qingzhu,password=123456,platform=,timestamp=1559316151
# 然后对这个字串进行 md5(md5($str).$token) 加密(token 没有则传 '')
# 然后取 1,3,5,7 位作为 sign 值
```

计算结果如下

```
step 1(origin)  : captcha=,passport=15254109156,password=,platform=,timestamp=11111111
step2(md5 once) : 0bf6dd986f4879e2ff0089ae3953459f11111111
step3(md5 twice): acfb64012a6607396910cfc9ba4b6194
sign : cb41
```

## 请求规范

获取到上边获取到的  `token`  之后, 每次访问的时候需要用  `header`  头的方式代入这个参数.Header 头的Key是  `Authorization`  值是  `Bearer $token`

## 代码返回规范

Api 返回约束: 以服务端为准, 服务端可以进行处理的, 一律服务端进行处理, 减少app的处理代码会返回一个json字串, 任何情况下都会. 即使是服务器错误也会返回, 其中代表的含义如下

-  `status` 服务器错误码, 代表服务器出现错误,  `500`  代表内部查询出现问题,  `404`  代表页面不存在, 等
-  `message` 服务返回的提示信息, 如果存在  `status`  , 则代表服务报错信息, 如果是自定义的code, 这里返回的是自定义的提示信息
-  `data` 返回正确的时候,  `data`  中会存在附加数据, 附加数据说明放置在api 文档中, 这里不做任何补充提示.

下边是示例代码: **有服务器错误**

```
{
  "status": 500,
  "message": "Internal Server Error"
}
```

**服务器无错误**

```
{
  "status": 0,
  "message": "获取用户信息成功!",
  "data": {
    "username": "weiran",
    "userid": 428,
  }
}
```

### 错误码标识和说明

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



::: info  <img src="https://file.wulicode.com/notion/47/47c09e2568b8d6a89b378c48929d4075.svg" style="width:17px;position:relative;top:4px;border:none;display:inline;">  更新记录


v1.0 (2025年02月11日)
  - 增加接口文档
:::

