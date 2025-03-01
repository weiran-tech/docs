---
description: '使用 php artisan poppy:model {module} {DbModel} 来生成模型模型文件统一放置在 ~/modules/{module}/src/Models/ 文件夹下, 这个文件夹中至少包含 2 种类型的数据模型创建的命名空间为配置项目模型:模型文件放置在上述文件夹中的根目录( ~)下,命名与数据表名称相对应策略放置位置 : ~/policies 文件命名 : 模型名称+Policy 例如 : (PamAccountPolicy)资源文件(接口资源):放置位置 : ~/resources 文件命名 : 模型名称 + Resour'
lastUpdated: '2025-02-05 11:22:00'
head: 
  - - meta
    - name: 'og:title'
      content: '模型'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '使用 php artisan poppy:model {module} {DbModel} 来生成模型模型文件统一放置在 ~/modules/{module}/src/Models/ 文件夹下, 这个文件夹中至少包含 2 种类型的数据模型创建的命名空间为配置项目模型:模型文件放置在上述文件夹中的根目录( ~)下,命名与数据表名称相对应策略放置位置 : ~/policies 文件命名 : 模型名称+Policy 例如 : (PamAccountPolicy)资源文件(接口资源):放置位置 : ~/resources 文件命名 : 模型名称 + Resour'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/wr-1.x/module/model.html'
---
# 模型



## 命名及放置位置

### 创建

使用  `php artisan poppy:model {module} {DbModel}`  来生成模型

模型文件统一放置在  `~/modules/{module}/src/Models/`  文件夹下, 这个文件夹中至少包含 2 种类型的数据

- 模型
- 策略
- 接口资源

模型创建的命名空间为

```
<?php namespace {Module}\Models;
```

配置项目

```
# 指定表名
protected $table = '';

# 指定主键, 如果 主键为 'id' 可以不用指定默认值
protected $primaryKey = '';

# 指定插入数据库字段
protected $fillable = [];

# 时间是否自动维护, (false 不自动维护,true 自动维护) 默认true
protected $timestamp = false;

# 时间类型 例:  logined_at, disabled_at  要放在
protected $dates = [
    'logined_at',
    'disabled_at',
];
```

**模型** :

模型文件放置在上述文件夹中的根目录(  `~` )下,命名与数据表名称相对应

**策略**

放置位置 :  `~/policies`  文件命名 : 模型名称+Policy 例如 : ( `PamAccountPolicy` )

**资源文件(接口资源)** :

放置位置 :  `~/resources`  文件命名 : 模型名称 + Resource 例如  `PamAccountResource`

### 注释

模型需要有完备的文档注释, 日期格式和文字说明, 并且需要参数和注释对齐

使用  `ide-helper`  生成模型文档语法

```
$ php artisan ide-helper:model "Misc\Models\MiscApp"
```

注释应当是完整的

```php
/**
 * @property int         $id           应用 ID
 * @property string      $title        应用名称
 * @property string      $name         应用标识
 * @property string      $secret       应用密钥
 * @property int         $account_id   账号 ID
 * @property string      $account_type 账号用户类型
 * @property string      $note         应用备注
 * @property int         $is_enable    是否启用
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @mixin \Eloquent
 */
class MiscApp extends Model
{
    ...
}
```

存储为 datetime 类型的数字放到  `$dates`  数组中, 方便拿到数据的时候对数据进行解析

### 命名

**模型文件使用 首字母大写的驼峰方式**

例如 约定的数据表的名称是  `base_app` , 命名的数据库模型是  `BaseApp`

**模型采用分组**

模型根据使用的场景对模型进行分组, 方便管理

```
pam     # 用户身份认证
order   # 订单
user    # 用户
```

### 模型定义

### kv 定义

开发中不允许出现状态是 1, 2, 3, 所有的对应项目必须在模型中给予定义, 采用常量的方式进行定义

```
const LOCK_LOCK    = 1;
const LOCK_UNLOCK  = 0;

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

开发中使用 `常量` 来替代  `enum` , 不得使用  `enum`  来对数据库进行枚举, 公共的定义放置在 `BaseConfig`  中

```
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

```
class FinanceCash{
    // ...
    public function pam() {
        return $this->belongsTo(App\Models\PamAccount::class, 'account_id', 'account_id');
    }
    // ...
}
```

### 调用注释

**注释调用**

例如以下这个模型

```
...
* @property int    $login_times  登录次数[成功请求接口便认定为1次]
...
class PamAccount extends \Eloquent
{
   ...
}
```

我们使用  `sys_db('pam_account')`  或者  `sys_db(PamAccount::class)`  便可以获取

这里注意的是, 注释中  `[]`  内的内容认定为模型注释, 不必进行返回

**注释更新**

如果注释更新之后模型中调用没有获取到最新的, 清空下缓存即可.

### 友好提示

当使用模型的  `findOrFail`  查询时, 如果数据有误, 则会抛出一个  `ModelNotFoundException`  异常

```
PamAccount::findOrFail($id);
```

我们可以对数据进行自定义提示

设置位置 :  `{module}/resources/lang/zh/util.php`

```php
<?php

return [
    'classes' => [
        'models' => [
            'pam_account' => '用户账户',
        ],
    ],
];
```

这样提示的内容便是

> 用户账户 id: [ 291 ] 数据不存在

## 数据表设计

### 设计范式

- 数据类型尽量用数字类型，数字类型的比字符类型的要快很多，比如使用  `INT UNSIGNED`  存储 IP
- 大数据字段最好剥离出单独的表，以便影响性能
- 使用 varchar，代替 char，这是因为 varchar 会动态分配长度
- 数据类型尽量小，这里的尽量小是指在满足可以预见的未来需求的前提下的,但是有不能太小，所以在建表的时候一定要预估这个字段最大的长度到底是多少
- 不允许 NULL，用 NOT NULL+DEFAULT 的值来代替 (Laravel 默认的时间格式除外)
- 禁止使用二进制字段
- 表名 字段名字统一用小写, 多词组合使用  `_`  分隔, 字段尽可能简短
- 字段命名关键字统一用下划线  `_`  分隔，一般采用简写，关键字要准确，不能有歧义
- 所有的表必须包含  `id` （自增主键）， `created_at` （新增时间）， `updated_at` （更新时间）， `is_delete` （删除标记）这几个字段
- 每个字段的 COMMENT 必须写清楚，枚举类型必须写清楚每个值到底是什么意思，枚举的写法统一成“删除标记（0：未删除，1：已经删除）”，符号为中文符号
- 时间类型尽量用  `timestamp`  4 个字节,而不用  `datetime`  8 个字节。只用表示日期的字段用  `date`  类型
- 建表语句不允许包含外键
- 库、表、字段字符集统一使用 utf8mb4
- 字串默认值必须是  `''` 
- 数值必须存在默认值, 必须包含默认值, 默认为  `0` 
- 相关属性的字段放置在临近的位置, 例如  `disabled_at` ,  `disable_reason` 

### 常用字段

```
id               : 条目ID
name             : 标示符, 只能是 英文
title            : 标题
account_id       : 用户ID
username         : 用户名
created_at       : datetime 类型 , L5 默认创建时间
deleted_at       : l5 软删除(项目中不推荐使用, 效率低下)
updated_at       : l5 更新
```

### 索引命名

```
# 索引(index)
item            k_item

# 唯一验证(unique)
account_name    u_account_name
```

## Poppy

### 如何在框架中快速使用排序查询数据

```php
use Poppy\Framework\Helper\SearchHelper;

$orderKey = in_array(SearchHelper::key(), [
    'wx_fans',
]) ? SearchHelper::key() : 'created_at';
$Db->orderBy($orderKey, SearchHelper::order());
```

