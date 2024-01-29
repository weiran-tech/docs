---
description: '模型文件统一放置在 ~/app/Models/ 文件夹下模型文件使用 首字母大写的驼峰方式例如 约定的数据表的名称是 base_banword, 命名的数据库模型是 BaseBanword模型采用分组模型映射采用 sofa/eloquence 框架, 使用字段的映射参考资料常用函数这里的注释必须放置在类文件中进行定义, 里边的字段值出现的仅仅是新模块使用的, 包含兼容, 但是不包含调用的字段命名.开发中不允许出现状态是 1, 2, 3, 所有的对应项目必须在模型中给予定义, 采用常量的方式进行定义开发中使用常量来替代 enum, 不得使用 enum 来对'
lastUpdated: '2023-12-11 21:58:00'
head: 
  - - meta
    - name: 'og:title'
      content: '模型'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '模型文件统一放置在 ~/app/Models/ 文件夹下模型文件使用 首字母大写的驼峰方式例如 约定的数据表的名称是 base_banword, 命名的数据库模型是 BaseBanword模型采用分组模型映射采用 sofa/eloquence 框架, 使用字段的映射参考资料常用函数这里的注释必须放置在类文件中进行定义, 里边的字段值出现的仅仅是新模块使用的, 包含兼容, 但是不包含调用的字段命名.开发中不允许出现状态是 1, 2, 3, 所有的对应项目必须在模型中给予定义, 采用常量的方式进行定义开发中使用常量来替代 enum, 不得使用 enum 来对'
---
# 模型



> Lemon Framework (柠檬框架 ps:LF) 由 Sour-Lemon 团队(SL Team) 协力打造

## 命名及放置位置

### 放置位置

模型文件统一放置在  `~/app/Models/`  文件夹下

### 命名

**模型文件使用 首字母大写的驼峰方式**

例如 约定的数据表的名称是  `base_banword` , 命名的数据库模型是  `BaseBanword`

**模型采用分组**

```
base
pam
```

## 映射

### 表/主键

-  `$table`  定义的是原始表的名称
-  `$primaryKey`  定义的是主键

### 示例

模型映射采用  `sofa/eloquence`  框架, 使用字段的映射

```php
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

```
totime   => to_timestamp
addtime  => add_datetime
```

### 使用

**参考资料**

- 插件地址: https://github.com/jarektkaczyk/eloquence
- 文档地址: https://github.com/jarektkaczyk/eloquence/wiki

**常用函数**

> 这里只是支持常用的 `where` ,  `select`  等方式的调用, 对于  `updateOrCreate`  这种方式暂不支持

```php
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

```php
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

```php
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

```php
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

```php
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

```
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

```php
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

```php
$kw = $request->input('kw');
if ($kw) {
    $Db->where(function($query) use ($kw, $tb_weixin){
        $query->orWhere($tb_weixin.'.wx_account', 'like', '%'.$kw.'%');
        $query->orWhere($tb_weixin.'.wx_account', 'like', '%'.$kw.'%');
    });
}
```

**单字段 like**

```
$account_name = $request->input('account_name');
if ($account_name) {
    $Db->where($tb_pam . '.account_name', 'like', '%' . $account_name . '%');
}
```

### 普通搜索

```
$wx_status = $request->input('wx_status');
if ($wx_status) {
    $Db->where('wx_status', $wx_status);
}
```

### 排序

```
$orderKey = in_array(SysSearch::key(), [
    'wx_fans',
]) ? SysSearch::key() : 'created_at';
$Db->orderBy($tb_weixin . '.' . $orderKey, SysSearch::order());
```

