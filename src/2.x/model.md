---
description: '模型文件统一放置在 ~/app/Models/ 文件夹下模型文件使用 首字母大写的驼峰方式例如 约定的数据表的名称是 base_banword, 命名的数据库模型是 BaseBanword模型采用分组这里的注释必须放置在类文件中进行定义, 里边的字段值出现的仅仅是新模块使用的, 包含兼容, 但是不包含调用的字段命名.开发中不允许出现状态是 1, 2, 3, 所有的对应项目必须在模型中给予定义, 采用常量的方式进行定义开发中使用常量来替代 enum, 不得使用 enum 来对数据库进行枚举, 公共的定义放置在BaseConfig 中对于关联关系的命名, 采用简写格'
lastUpdated: '2023-12-11 18:58:00'
head: 
  - - meta
    - name: 'og:title'
      content: '模型 v2.0'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '模型文件统一放置在 ~/app/Models/ 文件夹下模型文件使用 首字母大写的驼峰方式例如 约定的数据表的名称是 base_banword, 命名的数据库模型是 BaseBanword模型采用分组这里的注释必须放置在类文件中进行定义, 里边的字段值出现的仅仅是新模块使用的, 包含兼容, 但是不包含调用的字段命名.开发中不允许出现状态是 1, 2, 3, 所有的对应项目必须在模型中给予定义, 采用常量的方式进行定义开发中使用常量来替代 enum, 不得使用 enum 来对数据库进行枚举, 公共的定义放置在BaseConfig 中对于关联关系的命名, 采用简写格'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/2.x/model.html'
---
# 模型 v2.0



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

## 注释

这里的注释必须放置在类文件中进行定义, 里边的字段值出现的仅仅是新模块使用的, 包含兼容, 但是不包含调用的字段命名.

```
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

## 设计原则

- 字串默认值必须是 ’’
- 数值必须存在默认值, 默认值为 0 (根据业务需求来定义)
- 注释唯一 例如 group_id 仅仅是会员组ID
- 模块分组 pam 作为权限验证组 plugin 作为插件组
- 使用最简略命名 username
- 数据库相关属性的字段放置在一起

```
disable_reason
disabled_from_at
disabled_to_at
```

## 模型定义

### kv 定义

开发中不允许出现状态是 1, 2, 3, 所有的对应项目必须在模型中给予定义, 采用常量的方式进行定义

```
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
class BaseConfig{
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

## 数据表字段

### 数据表常用字段

```
id               : 条目ID
name             : 标示符, 只能是 英文
title            : 标题
account_id       : 用户ID
username         : 用户名
add_timestamp    : unix 时间戳
created_at       : datetime 类型 , L5 默认创建时间
deleted_at       : l5 软删除
updated_at       : l5 更新
```

## 数据库索引

### 索引命名

```
# 索引(index)
item            k_base_config_item

# 唯一验证(unique)
account_name    u_account_name
```

## 使用

### 表创建

```
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

```
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

## 建表规范

- 数据类型尽量用数字类型，数字类型的比字符类型的要快很多，比如使用INT UNSIGNED存储IP
- 大数据字段最好剥离出单独的表，以便影响性能
- 使用varchar，代替char，这是因为varchar会动态分配长度
- 数据类型尽量小，这里的尽量小是指在满足可以预见的未来需求的前提下的,但是有不能太小，所以在建表的时候一定要预估这个字段最大的长度到底是多少
- 不允许NULL，用NOT NULL+DEFAULT 的值来代替
- 少用TEXT和IMAGE，二进制字段的读写是比较慢的，而且，读取的方法也不多，大部分情况下最好不用
- 表名 字段名字统一用小写
- 字段名字不要用驼峰命名法 比如add_time 不要写成AddTime
- 字段命名关键字统一用下划线"_"分割，一般采用简写，关键字要准确，不能有歧义
- 所有的表必须包含id（自增主键），add_time（新增时间），update_time（更新时间），mark（删除标记 ）这3个字段
- 每个字段的COMMENT必须写清楚，枚举类型必须写清楚每个值到底是什么意思，枚举的写法统一成“删除标记（0：未删除，1：已经删除）”，符号为中文符号
- update_time（更新时间）字段自动修改。 `update_time`  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT ‘更新时间’
- 时间类型尽量用 timestamp 4个字节,而不用datetime 8个字节。只用表示日期的字段用date类型
- 建表语句不允许包含外键
- 库、表、字段字符集统一使用UTF8。

