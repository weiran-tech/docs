---
description: '快捷生成使用如下命令便捷创建单元测试文件测试文件加载对于开发中的包, 单元测试是无法识别其路径的, 所以需要将包加入到 composer.json 的 autoload 中, 这里遵循 psr-4 加载规范要求接口文档接口文档写法遵循 apidoc接口要求保证代码格式正确, 对文件夹进行代码格式化 ctrl + alt + l, 在 src 目录下运行 代码中不得存在编辑器提示的错误, 需要开启 Php Inspection在 PHPstorm 中需要 alt + enter 进行 Import Class 或者 Simplify FQN, 这样便可以是'
lastUpdated: '2025-12-15 19:21:00'
head: 
  - - meta
    - name: 'og:title'
      content: '开发规范'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '快捷生成使用如下命令便捷创建单元测试文件测试文件加载对于开发中的包, 单元测试是无法识别其路径的, 所以需要将包加入到 composer.json 的 autoload 中, 这里遵循 psr-4 加载规范要求接口文档接口文档写法遵循 apidoc接口要求保证代码格式正确, 对文件夹进行代码格式化 ctrl + alt + l, 在 src 目录下运行 代码中不得存在编辑器提示的错误, 需要开启 Php Inspection在 PHPstorm 中需要 alt + enter 进行 Import Class 或者 Simplify FQN, 这样便可以是'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/develop/spec.html'
---
# 开发规范



## 单元测试

**快捷生成**

使用如下命令便捷创建单元测试文件

```
$ php artisan poppy:test  {slug} {name}
```

**测试文件加载**

对于开发中的包, 单元测试是无法识别其路径的, 所以需要将包加入到  `composer.json`  的  `autoload`  中, 这里遵循  `psr-4`  加载规范

```json
{
  "autoload": {
    "classmap": [],
    "psr-4": {
      "User\\": "modules/user/src/",
      "Site\\": "modules/site/src/"
    }
  },
  "autoload-dev": {
    "psr-4": {
      "User\\Tests\\": "modules/user/tests/",
      "Site\\Tests\\": "modules/site/tests/"
    }
  }
}
```

- 单元测试 : [<img src="https://file.wulicode.com/notion/80/80d36d5cd9b294217e3d56b12f8c5d78.svg" style="width:17px;position:relative;top:4px;border:none;display:inline;">  PHPUnit 简介以及在 PhpStorm 中使用](https://www.wulicode.com/php/ide/phpstorm-run-phpunit.html) 

**要求**

- 编写配置文件, 保证配置正确
- 编写模型文件, 保证模型函数正确
- 编写功能文件, 保证 Notification
- 编写方便的 Action 测试, 便于功能点测试

## 接口

**接口文档**

接口文档写法遵循 [apidoc](https://apidocjs.com/)

- 接口文档说明: [使用 ApiDoc 编写接口文档](https://www.wulicode.com/development/tools/apidoc.html) 
- 接口文档示例: [http://v4.wulicode.com/docs/web/](http://v4.wulicode.com/docs/web/)

**接口要求**

- 保证接口请求不返回 null 值

## IDE

## 代码风格统一

- 下载代码风格文件[Code_Style-Mark](http://oss-test.iliexiang.com/develop/Code_Style-Mark.xml)
- 打开  `Preferences | Editor | Code Style`  , 在右侧  `设置`  中选择  `Import Scheme` , 导入刚才下载的 xml 文件
- 在  `Scheme`  选择框中选择刚才导入的风格进行使用

### 代码格式化

保证代码格式正确, 对文件夹进行代码格式化  `ctrl + alt + l` , 在  `src`  目录下运行 代码中不得存在编辑器提示的错误, 需要开启  `Php Inspection`

### 优化导入

在 PHPstorm 中需要  `alt + enter`  进行  `Import Class`  或者  `Simplify FQN` , 这样便可以是代码看起来更简洁

```php
// bad
/**
 * @property \Carbon\Carbon    $created_at
 */

// good
/**
 * @property Carbon    $created_at
 */
```

### 目录设定

**忽略掉不需要的加载目录**

生成的文件, 不需要进行索引

```
# 前端文件
public/assets

# 调试
storage/clockwork

# 生成的文档
storage/sami
public/docs
```

**将 public 目录设置为资源根目录**

因为 public 目录是对外输出目录, 所有的资源均以这个作为资源的识别

### 如何验证 trans 文档是否正确

- 使用 phpstorm 搜索出所有所有  `trans('`  匹配的文档
- 使用  `open in window` 打开
- 邮件根菜单选择  `Export to text file`  选择位置进行保存
- 运行命令  `php artisan py-core:inspect trans --export=/Users/duoli/Desktop/report.txt` 

## 验证

开发进行提交前按照这个清单进行下检测

**PHP-CS-Fixer**

[PHP-CS-Fixer](https://github.com/FriendsOfPHP/PHP-CS-Fixer) is a tool to automatically fix PHP Coding Standards issues, We use it for Code Specification.

**注释完善并且通过**

注释使用  `poppy/core`  模块来检测[开发必备]

```
$ php artisan py-core:inspect class
```

**不要出现 package 标签**

```
@package
```

## 代码协同

### GIT

代码使用 Git 进行代码协同

- [<img src="https://file.wulicode.com/notion/f4/f40474006bf9e2eb6f8c3dc02b97378f.svg" style="width:17px;position:relative;top:4px;border:none;display:inline;">  使用 husky 让代码提交优雅规范](https://www.wulicode.com/development/git/commit-grace-use-husky.html) 

### Git Flow

git-flow 并不是要替代 Git，它仅仅是非常聪明有效地把标准的 Git 命令用脚本组合了起来。 Release 管理是版本控制处理中的另外一个非常重要的话题, 详细见下边的文档. Git Flow 的详细说明文档

- [https://www.git-tower.com/learn/git/ebook/cn/command-line/advanced-topics/git-flow](https://www.git-tower.com/learn/git/ebook/cn/command-line/advanced-topics/git-flow)
- [一个成功的 Git 分支模型 - GitFlow](https://www.wulicode.com/development/git/git-flow.html) 

## 扩展开发

### Composer 文件生成

composer.json 文件解释

```
{
    # 包名称, 可以自定义 package 名称, 蛇形写法
    "name": "poppy/ext-{package}",
    # 描述, 必须是英文
    "description": "Poppy frontEnd support",
    "type": "poppy-extension",
    # 作者
    "authors": [
        {
            "name": "Mark Zhao",
            "email": "zhaody901@126.com"
        }
    ],
    # 依赖包 不依赖则留空
    "require": {
        "php": ">=7.0.0",
        # 加载第三方包
        "sabberworm/php-css-parser": "^8.1"
    },
    # 自动加载命名空间
    # 命名空间 {Package} 应当和 name 相匹配
    "autoload": {
        "psr-4": {
            "Poppy\\Extension\\{Package}\\": "src/"
        }
    },
    "config": {
        "preferred-install": "dist"
    },
    "minimum-stability": "dev"
}
```

根目录文件生成方式 - 初始化 第一步: 创建 创建: 如果没有 ext-{package}/composer.json 中的时候

```
$ composer init
```

composer 文件加载

生成 autoload 文件

```
$ composer update -vvv
```

清空进行 poppy 优化,重置缓存, 加载当前包(From notadd)

```
$ php artisan poppy:optimize
```

至此命名空间可以自动加载成功

