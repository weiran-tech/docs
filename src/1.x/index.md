---
description: '本文档为1.x版本的使用手册入门指南，介绍如何快速安装、配置及启动基础功能，涵盖环境要求、核心概念与首个示例，帮助用户顺利上手。'
lastUpdated: '2026-06-22 17:38:11'
head:
  - - meta
    - name: 'og:title'
      content: '1.x'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '本文档为1.x版本的使用手册入门指南，介绍如何快速安装、配置及启动基础功能，涵盖环境要求、核心概念与首个示例，帮助用户顺利上手。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech//1.x/index.html'
---
# 1.x

> Lemon Framework (柠檬框架 ps:LF) 由 Sour-Lemon 团队(SL Team) 协力打造

## 命名及放置位置

### 放置位置

模型文件统一放置在 `~/app/Models/` 文件夹下

### 命名

**模型文件使用 首字母大写的驼峰方式**

例如 约定的数据表的名称是 `base_banword`, 命名的数据库模型是 `BaseBanword`

**模型采用分组**

```Plaintext
base
pam
```

## 映射

### 表/主键

- `$table` 定义的是原始表的名称
- `$primaryKey` 定义的是主键

### 示例

模型映射采用 `sofa/eloquence` 框架, 使用字段的映射

```PHP
<?php 
namespace App\Models;

# 引入字段映射的类库
use Sofa\Eloquence\Eloquence;
use Sofa\Eloquence\Mappable;
class BaseBanip extends \Eloquent {

    use Eloquence, Mappable;

    protected $table = 'banip';

    protected $primaryKey = 'itemid';

    public $timestamps = false;

  # 这里是默认的填充的数据, 是新结构表的名称
    protected $fillable = [
        'ip',
        'editor',
        'add_time',
        'to_time',
    ];

    # 这里定义的是字段映射
    # key : 新字段
    # value: 老字段
    protected $maps = [
        'add_timestamp' => 'addtime',
        'to_timestamp'  => 'totime',
    ];
}
```

### 映射的字段

```Plaintext
totime   => to_timestamp
addtime  => add_datetime
```

### 使用

**参考资料**

- 插件地址: https://github.com/jarektkaczyk/eloquence
- 文档地址: https://github.com/jarektkaczyk/eloquence/wiki

**常用函数**

> 这里只是支持常用的`where`, `select` 等方式的调用, 对于 `updateOrCreate` 这种方式暂不支持

```PHP
// 是否存在列
BaseBanword::hasColumn('replace_to')        // bool
 
// 获取列

BaseBanword::getColumnListing()      // array

// where
BaseBanword::where('replace_to', 'some_value')->first();

// 创建
BaseBanword::create([
    'replace_from' => '优衣库',
    'replace_to'   => '妞妞',
])
```

## 注释

这里的注释必须放置在类文件中进行定义, 里边的字段值出现的仅仅是新模块使用的, 包含兼容, 但是不包含调用的字段命名.

```PHP
/**
 * App\Models\BaseBanword
 * @property integer        $item_id      id 
 * @property string         $replace_from 需要替换的词
 * @property string         $replace_to   替换为
 * @property boolean        $deny         是否进行拦截(0,1)
 * @property \Carbon\Carbon $created_at   创建时间
 * @property \Carbon\Carbon $deleted_at   删除时间
 * @property \Carbon\Carbon $updated_at   更新时间
 */ 
class BaseBanword extends \Eloquent {
    ... 
}
```

## 模型定义

### kv 定义

开发中不允许出现状态是 1, 2, 3, 所有的对应项目必须在模型中给予定义, 采用常量的方式进行定义

```PHP
/**
 * 锁定/解锁
 * @param null $key
 * @return array|mixed
 */
public static function kvLock($key = null) {
    $desc = [
        self::LOCK_LOCK   => '锁定',
        self::LOCK_UNLOCK => '解锁',
    ];
    return kv($key);
}
```

### Enum 的使用

开发中使用`常量`来替代 `enum`, 不得使用 `enum` 来对数据库进行枚举, 公共的定义放置在`BaseConfig` 中

```PHP
class BaseConfig
{
    const YES = 1;
    const NO  = 0;

    public static function kvYn($key = null) {
            $desc = [
              self::YES   => '是',
              self::NO    => '否',
         ];
         return kv($key);
    }
}
```

### 关联关系的命名

对于关联关系的命名, 采用简写格式. 例如我们需要关联用户表, 模型中需要如下定义

```PHP
class FinanceCash{
    // ...
    public function pam() {
        return $this->belongsTo(
                              'App\Models\PamAccount', 
                              'account_id', 
                              'account_id'
                    );
    }
    // ...
}
```

## 数据表字段

### 数据表命名原则

- 注释唯一 例如 group_id 仅仅是会员组ID
- 模块分组 pam 作为权限验证组 plugin 作为插件组

### 数据表常用字段

```Plaintext
item_id     : 条目ID
area_id     : 地区ID
cat_id      : 分类ID
type_id     : 类型ID
userid      : 用户ID
username    : 用户名
module_id   : 模块ID
add_time    : unix 时间戳
created_at  : datetime 类型 , L5 默认创建时间
deleted_at  : l5 软删除
updated_at  : l5 更新
```

## 使用

### 表创建

```PHP
$tb_pam   = (new PamAccount())->getTable();
$tb_ft    = (new AccountFront())->getTable();
$Db = \DB::table($tb_pam)->where('account_type', 'front');
$Db->where($tb_pam . '.account_id', '!=', \FrontAuth::id());
$Db->join($tb_ft, $tb_pam . '.account_id', '=', $tb_ft . '.account_id');
$accounts = $Db->paginate(16);
$accounts->appends($request->input());
```

### like搜索

**多字段like**

```PHP
$kw = $request->input('kw');
if ($kw) {
    $Db->where(function($query) use ($kw, $tb_weixin){
        $query->orWhere($tb_weixin.'.wx_account', 'like', '%'.$kw.'%');
        $query->orWhere($tb_weixin.'.wx_account', 'like', '%'.$kw.'%');
    });
}
```

**单字段 like**

```Plaintext
$account_name = $request->input('account_name');
if ($account_name) {
    $Db->where($tb_pam . '.account_name', 'like', '%' . $account_name . '%');
}
```

### 普通搜索

```Plaintext
$wx_status = $request->input('wx_status');
if ($wx_status) {
    $Db->where('wx_status', $wx_status);
}
```

### 排序

```Plaintext
$orderKey = in_array(SysSearch::key(), [
    'wx_fans',
]) ? SysSearch::key() : 'created_at';
$Db->orderBy($tb_weixin . '.' . $orderKey, SysSearch::order());
```

## 文件树

> 本文件目录树支持 Laravel 5.1 版本

```Plaintext
.
├── README.md         # 说明文档
├── app
│   ├── Channels      # 频道
│   ├── Console       # 命令行
│   │   ├── Commands        # 命令行 - 命令所在位置
│   │   └── Kernel.php      # 注册命令和计划任务
│   ├── Events        # 事件
│   │   ├── Auth          # 账号
│   │   ├── Cash          # 提现
│   │   ├── Charge        # 充值
│   │   ├── Order         # 订单
│   │   ├── Platform      # 平台事件
│   │   └── Rebate        # 返利
│   ├── Exceptions        # 异常处理
│   ├── Http
│   │   ├── Controllers   # 控制器
│   │   ├── Kernel.php
│   │   ├── Middleware    # 中间件
│   │   ├── Requests      # 表单请求(弱化)
│   │   ├── Routes        # 子路由注册
│   │   └── routes.php    # 路由入口文件
│   ├── Jobs          # 队列
│   │   ├── Dailian       # 平台
│   │   ├── Order         # 订单
│   │   ├── Pam           # 账号
│   │   ├── Up            # 上家发单
│   │   └── User          # 用户
│   ├── Lemon         # 柠檬框架核心类库
│   │   ├── Dailian       # 代练项目专用
│   │   ├── Repositories  # 核心库
│   │   └── Suit          # 配置/定义文件
│   ├── Listeners     # 事件监听(文件夹和事件匹配, 不详述)
│   │   ├── Auth
│   │   ├── Cash
│   │   ├── Charge
│   │   ├── Order
│   │   ├── Platform
│   │   └── Rebate
│   ├── Models        # 模型定义, 模型说明和字段参考模型注释
│   ├── Policies      # 策略定义文件, 命名和模型相匹配
│   ├── Providers     # 服务提供者
│   │   ├── AppServiceProvider.php      # 应用
│   │   ├── BusServiceProvider.php      # 命令
│   │   ├── EventServiceProvider.php    # 事件
│   │   ├── RouteServiceProvider.php    # 路由
│   │   └── SubUserServiceProvider.php  # 子用户
│   └── build.md
├── artisan
├── bootstrap     # 启动文件
│   ├── app.php
│   └── autoload.php
├── composer.json # composer
├── config        # 配置文件
├── database      # 数据库生成器(弱化)
├── public        # 主目录
│   └── index.php     # 入口文件
├── resources     # 资源文件
│   ├── docs          # 文档
│   ├── key           # 密钥
│   ├── lang          # 语言包
│   │   ├── en
│   │   └── zh
│   ├── sami          # sami 文档生成工具配置
│   ├── shell         # 上家通知脚本
│   ├── storage       # 存储
│   └── views         # 视图文件
├── server.php
├── storage       # 存储
│   ├── app           # 应用存储
│   ├── clockwork     # 插件 - clockwork
│   ├── console       # 命令行日志文件
│   ├── framework     # 框架缓存,session,视图
│   ├── logs          # 框架日志
│   ├── purifier
│   └── server
├── tests         # 自动化测试
└── vendor        # 第三方目录
```