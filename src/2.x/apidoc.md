---
description: 'LF 使用 dingo/api 框架作为reset 接口的组织方式, 采用服务器验证的方式来存储数据, 即服务器首次访问的时候会首先访问 /init 接口, 然后从中获取到 access_token 作为账号认证权限来对服务器进行再次请求, 作为访问的授权来进行访问, 访问地址是 : http://api.larxd.com/api例如首次访问将会获取如下示例:再次进行访问的时候将会传入这个值 access_token, 否则将不会返回任何有效数据 ### sign 生成规范获取到上边获取到的 access_token 之后, 每次访问的时候需要用 header 头的方式代入这'
lastUpdated: '2024-01-29 18:45:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'Api文档 1.0'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'LF 使用 dingo/api 框架作为reset 接口的组织方式, 采用服务器验证的方式来存储数据, 即服务器首次访问的时候会首先访问 /init 接口, 然后从中获取到 access_token 作为账号认证权限来对服务器进行再次请求, 作为访问的授权来进行访问, 访问地址是 : http://api.larxd.com/api例如首次访问将会获取如下示例:再次进行访问的时候将会传入这个值 access_token, 否则将不会返回任何有效数据 ### sign 生成规范获取到上边获取到的 access_token 之后, 每次访问的时候需要用 header 头的方式代入这'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/notion/bb/bbf75c3372ea31e3695d9ef10943d10e.png?x-oss-process=image/resize,m_mfit,w_400'
---
# Api文档 1.0



## 初始化说明

### 说明

LF 使用  `dingo/api`  框架作为reset 接口的组织方式, 采用服务器验证的方式来存储数据, 即服务器首次访问的时候会首先访问  `/init`  接口, 然后从中获取到  `access_token`  作为账号认证权限来对服务器进行再次请求, 作为访问的授权来进行访问, 访问地址是 :  `http://api.larxd.com/api`

例如首次访问将会获取如下示例:

```
{
  "code": "0000100",
  "message": "初始化成功!",
  "data": {
    "api_version": "v1",
    "api_url": "http://api.larxd.com/api"
    "api_format": "jsonp",
    "access_token": "91adcb71dc21e381dcad0611e1b7271c"
  }
}
```

再次进行访问的时候将会传入这个值  `access_token` , 否则将不会返回任何有效数据 ### sign 生成规范

```
# 输入的参数
$params = [
    'app_version' => $app_version,             # app 版本号
    'device_type' => $device_type,             # 设备类型
    'device_id'   => $device_id,               # 设备ID号
    'time'        => $time,                    # app 获取到的时间戳
    'crypt_key'   => config('lemon.app_crypt_key'),    # 加密密钥(服务器约定)
];
# 将所有的参数按照 键进行字母排序, 并且转换成 Kv 字串, 以上的参数会拼接成
# app_version=1.1.0,crypt_key=,device_id=mark_zhao_Sdvwyocj,device_type=ios,time=1449816499
# 然后对这个字串进行 sha1(md5($str)) 加密
```

## 请求规范

获取到上边获取到的  `access_token`  之后, 每次访问的时候需要用  `header`  头的方式代入这个参数.  **Header 头的值是**  **`X-ACCESS-TOKEN`**

![](https://file.wulicode.com/notion/bb/bbf75c3372ea31e3695d9ef10943d10e.png)

## 代码返回规范

Api 返回约束: 以服务端为准, 服务端可以进行处理的, 一律服务端进行处理, 减少app的处理 代码会返回一个json字串, 任何情况下都会. 即使是服务器错误也会返回, 其中代表的含义如下 -  `status`  服务器错误码, 代表服务器出现错误,  `500`  代表内部查询出现问题,  `404`  代表页面不存在, 等 -  `status_text`  服务器出错的时候, 这里的状态码代表出错时候的返回错误详情 -  `code`  识别码, 如果该代码是 7 位数字字串, 则代表服务器请求正常, 这里代表的是 api 约定的错误或者正确类型, 则此时不会出现  `status_code`  自定义代码 如下分解  `000`   `00`   `00` , 前三位代表 模块区分 中间两位代表 方法/动作, 最后两位代表错误码, 如果是  `00`  代表操作成功. -  `message`  服务返回的提示信息, 如果存在  `status_code`  , 则代表服务报错信息, 如果是自定义的code, 这里返回的是自定义的提示信息 -  `data`  返回正确的时候,  `data`  中会存在附加数据, 附加数据说明放置在api 文档中, 这里不做任何补充提示.

下边是示例代码:

**有服务器错误**

```
{
  "readyState": 4,
  // ...
  "status": 500,
  "statusText": "Internal Server Error"
}
```

**服务器无错误**

```
{
  "code": "0010200",
  "message": "获取用户信息成功!",
  "data": {
    "username": "dashou001",
    "userid": 123354,
  }
}
```

## Api 文档生成/测试

### 工具

访问 [http://apidocjs.com/](http://apidocjs.com/) 来获取使用说明

### 安装并生成文档

**安装nodejs**

```
$ apt-get install nodejs
```

**安装node**

nodejs 访问地址 https://nodejs.org/en/, 具体版本号访问这个地址获取

```
$ wget http://nodejs.org/dist/vx.xx.xxx/node-*.tar.gz
$ tar zxvf node-*.tar.gz
$ ./configure
$ make && make install
```

[淘宝 npm 镜像](http://npm.taobao.org/) 安装淘宝镜像, 使用淘宝镜像访问 node 库, 访问速度会快一些

```
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```

**全局安装**

```
$ cnpm install apidoc -g
```

**生成文档**

```
$ apidoc -i app/Http/Controllers/Api/ -o public/docs/api
```

### 访问Api 文档

使用浏览器打开  `~/public/docs/api/index.html`  在测试文档的右侧打开此文档

![](https://file.wulicode.com/notion/b4/b483d3b21f61a672b336defbe44c2449.png)

- set AT : 设置 AccessToken
- clear AT : 清空 AccessToken

### 使用 api 文档做测试

**接口测试访问地址**

http://www.larxd.com/dev_api/auto

**访问接口的位置**

![](https://file.wulicode.com/notion/da/daf1cf7c9599ad60e9ab33582778de2e.png)

因为请求的时候需要设置  `access_token`  的值, 所以每次请求前必须保证初始化时候  `X-ACCESS-TOKEN`  的值是存在的, 所以必须设置下token 值

## Api 文件写法

### 路由写法

路由放置在  `app\Http\Routes\api.php`  文件中, 写法遵循  `dingo/api`  写法. 另外还有几项约定  **版本**  版本使用 v 开头, 数字结尾, 类似于 v1,v2,v3, 不允许出现小数点  **命名**  api 命名采用  `api_`  作为前缀, 后边跟控制器的小写, 例如  `HomeController`  的名称是  `api_home` , 再后边则是方法名, 为了体现是接口调用, 接口中的方法采用  `getXxxx` ,  `postXxxx`  来表明这是一个  `post`  请求或者是  `get`  请求

```
$api = app('api.router');
$api->version(['v1'], function ($api) {
    // init
    $api->get('init', [
        'as'   => 'api_home.init',
        'uses' => 'App\Http\Controllers\Api\Front\HomeController@getInit'
    ]);

    // account
    $api->post('account/edit', [
        'as'   => 'api_account.edit',
        'uses' => 'App\Http\Controllers\Api\Front\AccountController@postEdit'
    ]);
});
```

### 返回值

返回采用  `api_end($trans, $append=null)`  helper 函数来调用返回, 第一个传值调用的是对应的状态码说明, 第二个调用的是附加数据. 如果没有特殊提示返回 可以传值  `success` ,  `error` , 则默认返回  `api_account.php`  语言包中的  `request_success`  和  `request_error`  两个默认值. 如果传值使用 helper 函数  `trans($key)`  来调用, 因为可以用 Laravel Plugin ( phpstorm 的 Laravel ) 实现对语言包文件的跟踪.  **示例:**

```php
public function getInit(Request $request) {    
    $device_id   = $request->input('device_id');  
    // 设备序列号    
    $time        = $request->input('time');    
    $sign        = $request->input('sign');    
    $device_type = $request->input('device_type');    
    $app_version = $request->input('app_version');    
    // 验证这些值是否符合指定规则    
    $validator = \Validator::make($request->all(), [
        'device_id'   => 'required',        
        'time'        => 'required',        
        'sign'        => 'required',        
        'device_type' => 'required',        
        'app_version' => 'required',    
        ]);    
    if ($validator->fails()) {        
        return api_end($validator->errors());    
    }
    ...    
    if (!$accessToken) {        
        return api_end(\Api::getError());    
    }   
    $apiInfo = [        
        'api_version'  => config('api.version'),        
        'api_domain'   => config('api.domain'),        
        'api_format'   => config('api.defaultFormat'),        
        'access_token' => $accessToken,    
    ];    
    return api_end(trans('api_front.init_success'), $apiInfo);
}
```

## 版本说明

- 2015-12-12 : 加入淘宝镜像安装方法
- 2015-12-11 : 更改返回错误码

