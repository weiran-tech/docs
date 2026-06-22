---
description: 'Code Review需遵循框架规范：使用php-cs-fixer检查格式，system:inspect检测注释，注意Request输入、缓存命名、去除多余参数（如第三个参数为空时不写），保障模块注释和附加组件完整，注意函数名必须为字符串，并关注框架升级至2.0时出现的问题。'
lastUpdated: '2026-06-22 14:10:19'
head:
  - - meta
    - name: 'og:title'
      content: 'Code Review'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Code Review需遵循框架规范：使用php-cs-fixer检查格式，system:inspect检测注释，注意Request输入、缓存命名、去除多余参数（如第三个参数为空时不写），保障模块注释和附加组件完整，注意函数名必须为字符串，并关注框架升级至2.0时出现的问题。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech//3.x/project/code-review.html'
---
# Code Review

## 1. 框架需要遵循的规范

```Bash
# 使用 php-cs-fixer 来检测基本的格式
php artisan poppy:doc cs

# 使用 system:inspect 检测函数注释
php artisan system:inspect
```

## 2. Request 输入

使用 `Request`, 这里的 Request 代表的是全局变量  
控制器中不建议使用参数注入, 使用 input 替代即可.  
同理的还有 `Request::get('param')`

```Plaintext
// deprecated
$is_apply = \Input::input('is_apply');

// succcess
$is_apply = input('is_apply');
```

## 3. 缓存命名

缓存使用 `标签 + 命名` 的方式来命名, 便于对数据进行分组, 例如 `system` 模块的 setting 配置项目的缓存应该如下使用.  
这里 `标签` 的作用适用于区分模块, `命名` 的作用是为了即使不支持缓存标签(例如文件缓存)的驱动下运行, 也能够保证系统可以正常运行.  
例如:  
这里的 `system` 代表 system 模块  
这里的 `system.setting` 代表命名

```Plaintext
// 设置缓存
$this->getCache('system')->forever('system.setting', static::$cache);

// 读取缓存
$this->getCache('system')->get('system.setting')
```

如此这般, 模块缓存的清除便可以像如下清除;

```Plaintext
$this->getCache('system')->clear()
```

## 4. 去除多余参数

```Plaintext
# bad, 默认为空字符串, 所以第三个参数是空字符串的时候不需要写
$type = sys_get($input, 'socialite_type', ''),

# good
$type = sys_get($input, 'socialite_type'),
```

## 5. 保障模块洁净注释完整

system 模块不能包含其他模块的任何东西  
生成 php 文档, 检查文档是否注释完整

## 6. 保障模块附加组件完整

模块需要安装的时候需要保证组件正常, 在 dependency 中添加的模块完整, 这个放置在 dependency 中进行验证

## 7. 其他注意事项

1. 保证测试脚本可以正常执行
2. Inspect 文件没有异常
3. 保证接口正常, 使用接口检测 500 工具来运行, 保证接口正常
4. 保证代码中不包含 debug 项目
5. 不建议在项目中包含 env 的调用, 可以使用函数来进行调用

## 8. 框架升级 2.0 时候出现的问题

- No hint path defined for [poppy].
- Authentication user provider [pam.web] is not defined.

这里出现的问题是

1. 清空缓存
2. 删除框架文件 `storage/framework/*.php`
3. 删除 poppy 模块缓存文件 `storage/app/poppy.json`

## 9. Function name must be a string

这里一般的问题就是中间件名称和定义的中间件名称不匹配导致