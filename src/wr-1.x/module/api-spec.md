---
description: '在项目中使用 php artisan weiran:core:doc api 生成, 生成文件存放在 public/docs/swagger-ui/weiran.json此文件可以使用 swaggerUI 来进行访问, 位置 : http://example.com/docs/swagger-ui/也可以将这个文件导入到任何支持 swagger 格式的工具中, 例如我这里使用 apifox 来进行管理, 线上开发版预览地址是:  https://weiran-v1.apifox.cn/我们使用 https://zircote.github.io/swagger-php/ 这个规'
lastUpdated: '2025-03-06 09:52:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'Api 文档规范'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '在项目中使用 php artisan weiran:core:doc api 生成, 生成文件存放在 public/docs/swagger-ui/weiran.json此文件可以使用 swaggerUI 来进行访问, 位置 : http://example.com/docs/swagger-ui/也可以将这个文件导入到任何支持 swagger 格式的工具中, 例如我这里使用 apifox 来进行管理, 线上开发版预览地址是:  https://weiran-v1.apifox.cn/我们使用 https://zircote.github.io/swagger-php/ 这个规'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/wr-1.x/module/api-spec.html'
---
# Api 文档规范



## 接口文档

### 生成和使用

在项目中使用  `php artisan weiran:core:doc api`  生成, 生成文件存放在  `public/docs/swagger-ui/weiran.json`

此文件可以使用 swaggerUI 来进行访问, 位置 : [http://example.com/docs/swagger-ui/](http://example.com/docs/swagger-ui/)

也可以将这个文件导入到任何支持 swagger 格式的工具中, 例如我这里使用 apifox 来进行管理, 线上开发版预览地址是:  [https://weiran-v1.apifox.cn/](https://weiran-v1.apifox.cn/)

### 编写接口文档

我们使用 [https://zircote.github.io/swagger-php/](https://zircote.github.io/swagger-php/) 这个规范来编写接口文档

接口编写参考 : [weiran-tech/system/blob/1.0/src/Http/Request/Web/ApiV1/AuthController.php](https://github.com/weiran-tech/system/blob/1.0/src/Http/Request/Web/ApiV1/AuthController.php)

## 接口约定

###  **请求地址** 

虽然HTTP请求有多种请求方式，但是考虑到通用性、安全性等因素，我们统一使用  `GET` ， `POST`  方式

URL 统一结构 :  `api/{服务类型}/{模块名}/{版本号}/{资源名}/{动作+by+名词}`

例如接口地址 :  `/api/web/system/v1/core/info?type=user`

-  `api`  :  代表的是请求接口, 用来区分路由前缀
-  `web`  : 代表的是前台项目, 用来区分后续新增模块功能
-  `system`  : 代表模块前缀
-  `v1`  : 接口版本号
-  `core/info`  : 控制器以及动作
-  `type=user`  : 请求参数, 这里我们采用  `snake_case`  约定

请求方法约定

-  `get`  : 用于从服务器检索资源或数据
-  `post`  : 用于向服务器提交数据，通常用于创建或更新资源

###  **常用动作** 

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

**接口示例**

-  **重设密码**  ： `/api/web/system/v1/auth/reset_password` 
-  **发送验证码** ： `/api/web/system/v1/captcha/send` 

## 请求凭据

**说明**

系统使用 token 接口的方式来验证数据, 即服务器首次访问的时候会首先访问  `api/web/system/v1/auth/login`  接口, 然后从返回的接口中中获取到  `token` , 以后将 `token`  作为账号认证权限来对服务器进行再次请求, 作为授权来进行访问

首次登录将会获取如下示例:

```
{
    "status": 0,
    "message": "[开发]登录成功",
    "data": {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJp***.***KIjeJDRFGM"
    }
}
```

再次进行访问的时候将会传入这个值  `token` , 否则授权的接口则不会返回任何有效数据

**传递方式**

获取到上边获取到的  `token`  之后, 每次访问的时候需要用  `header`  头的方式代入这个参数.Header 头的Key是  `Authorization`  值是  `Bearer $token`  , 这里使用的是 jwt 的校验方式

## 参数验证

所有接口请求的参数需要带加密签名校验（即 sign 参数必加），否则无法验证通过, 加密参数顺序按照字母表的排序顺序进行加密，第一位相同比较第二位，依次往下

### 生成Demo

> 如果无需验签, 参数中增加万能密钥来取消验签

```
# 输入的参数
$params = [
    'captcha'   => '',
    'passport'  => 'username',
    'password'  => 'userpass',
    'timestamp' => 1559316151,
];
# 将所有的参数按照 键进行字母排序, 并且转换成 Kv 字串, 以上的参数会拼接成
# captcha=,passport=username,password=userpass,timestamp=1559316151
# 然后对这个字串进行 md5(md5($str).$token) 加密(token 没有则传 '')
```

## 返回规范

Api 返回约束: 以服务端为准, 服务端可以进行处理的, 一律服务端进行处理, 减少app的处理. 代码会返回一个  `json`  字串, 任何情况下都会. 即使是服务器错误也会返回, 其中代表的含义如下

-  `status` : 服务器错误码, 代表服务器出现错误,  `500`  代表内部查询出现问题,  `404`  代表页面不存在等
-  `message` : 服务返回的提示信息, 如果存在  `status`  , 则代表服务报错信息, 如果是自定义的code, 这里返回的是自定义的提示信息
-  `data` 返回正确的时候,  `data`  中会存在附加数据, 附加数据说明放置在api 文档中, 这里不做任何补充提示.

下边是示例代码: **有服务器错误**

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
    "username": "weiran",
    "userid": 428,
  }
}
```

### 错误码标识和说明

错误码定义文件 : [weiran-tech/framework/blob/1.0/src/Classes/Resp.php](https://github.com/weiran-tech/framework/blob/1.0/src/Classes/Resp.php)

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
  - 增加接口文档 / 规范接口约定
:::

