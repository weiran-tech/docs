---
description: '参考资料: [ Laravel 5.1 文档 ] 基础 —— HTTP 路由路由文件夹 : ~/app/Http/Routes/ 路由说明控制器文件位置 : ~/app/Http/Controllers/Front/TestController.php 控制器方法 public function getShow(){}参考资料: - [ Laravel 5.1 文档 ] 数据库 —— 查询构建器 - [ Laravel 5.1 文档 ] Eloquent ORM参考资料 Blade 模板引擎模板位置 : ~/resources/views控制器命名 命名方式采用蛇形'
lastUpdated: '2024-01-29 15:46:00'
head: 
  - - meta
    - name: 'og:title'
      content: '入门手册'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '参考资料: [ Laravel 5.1 文档 ] 基础 —— HTTP 路由路由文件夹 : ~/app/Http/Routes/ 路由说明控制器文件位置 : ~/app/Http/Controllers/Front/TestController.php 控制器方法 public function getShow(){}参考资料: - [ Laravel 5.1 文档 ] 数据库 —— 查询构建器 - [ Laravel 5.1 文档 ] Eloquent ORM参考资料 Blade 模板引擎模板位置 : ~/resources/views控制器命名 命名方式采用蛇形'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/2.x/index.html'
---
# 入门手册



## 如何渲染显示内容

### 定义路由

参考资料: [[ Laravel 5.1 文档 ] 基础 —— HTTP 路由](http://laravelacademy.org/post/53.html)

路由文件夹 :  `~/app/Http/Routes/`  路由说明

```
front.php    # 前台路由
desktop.php  # 后台路由
develop.php  # 开发平台
```

- 定义前台路由  `~/app/Http/Routes/front.php` 

```
# 使用组定义路由
Route::group([
    'namespace' => 'Front',
], function () {
    // ...
    // 使用 controller 来定义路由
    Route::controller('test', 'TestController', [
        # 方法名           # 路由的名称
        'getShow'         => 'front_test.show',
    ]);
    // ...
});
```

- 访问地址 http://www.domain.com/test/show

### 定义控制器 @ 方法

控制器文件位置 :  `~/app/Http/Controllers/Front/TestController.php`  控制器方法  `public function getShow(){}`

### 读取模型数据

参考资料: - [[ Laravel 5.1 文档 ] 数据库 —— 查询构建器](http://laravelacademy.org/post/126.html) - [[ Laravel 5.1 文档 ] Eloquent ORM](http://laravelacademy.org/post/138.html)

- 创建模型 模型的位置:  `~/app/Models/`  命名规范: 首字母大写的驼峰模式  `GameServer` 

```
class GameServer{
    // 定义 table
    protect $table = 'game_server'
}
```

- 读取数据

```
# 读取全部
GameServer::all();

# 读取单条
# 设定 primary key  : `protected $primaryKey = 'server_id';`, 默认是 `id`
GameServer::find($id)

# 读取带条件的
# id
GameServer::where('server_id', 5)->first();

# 范围查询
GameServer::where('server_id','>',5)->get();

# 多条件查询
Game::where('game_id',5)
    ->where('server_id',8)
    ->get();

# 分页读取
$Db = GameOrder::where('order_status', 'ing')->take(5);
$items = $Db->paginate($this->pageNum);
    ->appends($request->input());
```

### 渲染模板

参考资料 [Blade 模板引擎](http://laravelacademy.org/post/79.html)

模板位置 :  `~/resources/views`

控制器命名 命名方式采用蛇形方式命名, 和控制器进行匹配, 函数命名遵循类函数命名规范, 文件名称和方法名称有效匹配 PS:, 这个文件完整路径应是  `~`

```
# 命名空间/控制器/方法.blade.php
front/test/show.blade.php

# 后台 `Desktop/AccountController`这个控制器的文件夹名称 应该是 `desktop`, 里边有登陆的 `getLogin` 方法
desktop/account/login.blade.php
```

- 创建模板

```
输出了一个 abc {!! $abc !!} ;
```

- 调用模板

```
return view('front.test.show', [
    'abc' => $routeUrl,
]);
```

- 输出的内容

```
输出了一个 abc http://www.lartest.com/test/show?id=5 ;
```

- 命名约定
- 系统内置变量加  `_`  下划线前缀
- 命名方式: 小写, 蛇形

## 辅助功能

### 路由地址生成

route 函数, 参数是 路由的名称  `route('front_test.show')`  : helper 函数(帮助函数)  `route('front_test.show', [1,2])`  : helper 函数(帮助函数)  `route_url('front_test.show', null, ['id'=> 5])`  : 框架函数 - 传参 访问地址 :  `http://www.domain.com/test/show/5/234`

```
5   : 文章的ID    ($id)
234 : 文章的评论   ($comment_id)
```

- 传参限制 最多 5 个

### 获取参数

- 获取参数

```
public function getShow($id, $comment_id) {
    var_dump($id);
    var_dump($comment_id);
}
```

- 怎么样获取 querystring 传参 依赖注入

```
public function getShow(Request $request) {
    var_dump($request->all());
}
```

### 服务器绑定目录

-  `~/public`  只有一个  `index.php` 

### 自定义框架功能

```
~/app/Lemon/
    Action         带有错误信息的返回 (Nucleus)
    Contracts      接口
    Extensions     扩展的框架的一些类
    Facade         简要操作的入口, 自定义的 Facade
    Func           系统函数/ 帮助函数
    Helper         LmArr, LmEnv, LmFile (Lemon)
    Project        项目的, 比如短信平台, 邮件发送
    Suit           acl 控制, 流程控制的定义, 菜单定义
    Vendor         第三方的东西
```

## 第三方类库的加载

### composer

参考资料: - [Composer 中文站](http://www.phpcomposer.com/) - [Packageist(包)](http://packagist.com/)

### 位置

`~/Vendor`

### 常用扩展

github 项目

```
"intervention/image"           # 图像处理
"laravel/framework"            # 核心库
"illuminate/support"           # 二开用的包
"laravelcollective/html"       # 快速生成表单和html的php 帮助类
"latrell/alipay"               # 支付宝支付接口
"mews/purifier"                # 处理 dom
"nesbot/carbon"                # 处理时间
"erusev/parsedown-extra"       # 解析 markdown
"league/html-to-markdown"      # html -> markdown
"sunra/php-simple-html-dom-parser"        # 解析dom
"socialiteproviders/qq"        # qq 自动登录
"predis/predis"                # redis 调用
"phpoffice/phpexcel"           # excel 处理
"maatwebsite/excel"            # 封装 phpexcel 的方法
"socialiteproviders/weibo":    # 微博自动登录
"doctrine/dbal"                # 生成模型帮助文件的
"guzzlehttp/guzzle"            # http 请求用
"dingo/api"                    # api接口
```

### 常用的变量

- 公用的模板变量以下划线 起头

```
'_site'     => site(),                 # 网站配置
'_route'    => $this->route,           # 当前路由的名字
'_ip'       => $this->ip,              # 当前的ip地址
'_time'     => $this->time,            # 当前的unix 时间戳
'_datetime' => \Carbon\Carbon::now(),  # 当前时间 datetime 格式
'_pagesize' => $this->pageNum,         # 分页数
```

### 保留变量

- 模板保留变量 保留变量采用 下划线起头, 蛇形写法方式命名

```
$_pam          # 当前登陆账户的基本信息
$_front        # 当前前端用户的基本资料
$_site         # 当前网站的配置
$_route        # 当前路由的名称，如果没有，名称为空
```

- 控制器保留变量 控制器保留变量采用大小写混排模式

```
pageNum      # 当前每页分页数量
ip           # 当前IP
time         # 请求的时间戳
route        # 当前路由名称
datetime     # 当前请求的 datetime 时间
```

## 验证机制

### 说明

Laravel提供了多种方法来验证应用输入数据, 这样的简单化前提是, 数据库中有个明确的唯一的字段值来对应唯一的名称(现在正在做的), 对于在控制器中我们需要如下约束即可

### 定义约束

项目约束代码

```
$validator = \Validator::make($request->all(), [
    'city_id' => 'required|integer',
]);
if ($validator->fails()) {
    return api_end('error', $validator->errors());
}
```

这里有详细的验证规则 [验证规则, 点击访问](http://laravelacademy.org/post/240.html#ipt_kb_toc_240_12)

### 在各个模块的使用

```
// 前后台的的使用
site_end('error', $validator->errors())

// api 中的使用
api_end('error', $validator->errors())

// support 中的使用
return support_end('error', $validator->errors());
```

### 定义通用的属性

位置: 在  `~/resources/lang/zh/validation.php`  语言文件中

```
// 这个部分定义每个字段的显示值
'attributes' => [
    'area_id'   => '地区ID',
    'area_title'   => '地区名称',
    ...
],
```

### 自定义错误提示

有时候你可能只想为特定字段指定自定义错误信息，可以通过”.”来实现，首先指定属性名，然后是规则：

```
// 这样定义
$messages = [
    'email.required' => '我们需要知晓您的邮箱地址!',
];

// 这样使用
$validator = \Validator::make($request->all(), [
    'email' => 'required',
], $messages);
```

详细内容参见 [L5 验证](http://laravelacademy.org/post/240.html)

