---
description: '项目文档涵盖3.x版本的安装指南、最佳实践、代码评审、Laravel Mix配置及入门说明，为开发者提供全面指导。'
lastUpdated: '2026-06-29 22:58:16'
head:
  - - meta
    - name: 'og:title'
      content: '项目'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '项目文档涵盖3.x版本的安装指南、最佳实践、代码评审、Laravel Mix配置及入门说明，为开发者提供全面指导。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/3.x/project/index.html'
---
# 项目

### 开发文件不需要自动加载

- 项目中使用 IDE Helper 生成浏览器提示文件, 此文件在正式项目下不需要进行加载
- Clockwork 不需要加载

```Plaintext
"extra" : {
    "laravel" : {
        "dont-discover" : [
            "itsgoingd/clockwork",
            "barryvdh/laravel-ide-helper",
        ]
    }
},
```

## 项目说明

### 项目目录树

```Plaintext
├── config              # 配置文件
├── modules             # 模块名称, 这里以system 模块 作为说明, 详细见 模块目录树
│   ├── finance
│   ├── order
│   └── ...
├── public
│   ├── docs            # 文档
│   ├── modules         # 模块资源
│   └── resources       # 资源项目 / 公共
│       ├── css
│       ├── js
│       └── scss
├── resources           # 资源源文件
│   ├── assets
│   ├── docs
│   ├── lang
│       ├── en
│       └── zh
├── storage             # 存储目录
│   ├── app             # 应用资源
│   ├── bootstrap       # 启动项目
│   ├── bower           # bower 文档
│   ├── clockwork       # 调试文件
│   ├── console         # 控制器
│   ├── framework       # 框架缓存
│   │   ├── cache
│   │   ├── sessions
│   │   └── views
│   ├── logs            # 日志
│   ├── phplint
│   ├── purifier
│   ├── sami
├── tests               # 测试目录
│   ├── MerchantApi
│   │   └── User
│   └── WebApi
│       └── User
└── vendor              # 第三方文档(只是预览, 不做详细说明)
```

## 代码风格统一

- 下载代码风格文件[Code_Style-Mark](http://oss-test.iliexiang.com/develop/Code_Style-Mark.xml)
- 打开 `Preferences | Editor | Code Style` , 在右侧 `设置` 中选择 `Import Scheme`, 导入刚才下载的 xml 文件
- 在 `Scheme` 选择框中选择刚才导入的风格进行使用

phpstorm 常用快捷键

```Plaintext
ctrl/cmd + alt + L          # 格式化代码(提交代码前操作)
ctrl/cmd + alt + O          # 项目优化导入, 保证代码无冗余
ctrl/cmd + shift + n        # 查找文件
ctrl/cmd + alt + shift + n  # 查找函数
```

## 代码协同

### 协同工具 GIT

代码使用 Git 进行代码协同

### 开发工作流程 Git Flow

git-flow 并不是要替代 Git，它仅仅是非常聪明有效地把标准的 Git 命令用脚本组合了起来。 Release 管理是版本控制处理中的另外一个非常重要的话题, 详细见下边的文档. Git Flow 的详细说明文档 [git-flow 的工作流程](https://www.git-tower.com/learn/git/ebook/cn/command-line/advanced-topics/git-flow)

**分支说明** *master* 只能用来包括产品代码。你不能直接工作在这个 master 分支上，而是在其他指定的，独立的特性分支中（这方面我们会马上谈到）。不直接提交改动到 *master* 分支上也是很多工作流程的一个共同的规则。 *develop* 是你进行任何新的开发的基础分支。当你开始一个新的功能分支时，它将是 *开发* 的基础。另外，该分支也汇集所有已经完成的功能，并等待被整合到 *master* 分支中。 这两个分支被称作为 [长期分支](https://www.git-tower.com/learn/git/ebook/cn/command-line/branching-merging/branching-workflows)。它们会存活在项目的整个生命周期中。而其他的分支，例如针对功能的分支，针对发行的分支，仅仅只是临时存在的。它们是根据需要来创建的，当它们完成了自己的任务之后就会被删除掉。

```Plaintext
# 分支说明
master       : 线上分支
develop      : 开发分支
hotfix/2.0.3 : Bug 分支
feature/2.3  : 开发分支
```

**安装**

安装 Git flow (参考文档: https://github.com/nvie/gitflow/wiki/Installation)

```Plaintext
# 初始化
git flow init -d

# 查看帮助
git flow feature help

# 分支说明
Feature branches? [feature/]
Bugfix branches? [bugfix/]
Release branches? [release/]
Hotfix branches? [hotfix/]
Support branches? [support/]

# hotfix
# 创建修复分支
git flow hotfix start {missing-link}
#创建修复分支：
git flow hotfix finish {missing-link}

# feature
# 用于新版本开发时使用
git flow feature start 2.0.99
# 这个 “feature finish” 命令会把我们的工作整合到主 “develop” 分支中去，后需要手动推送到线上分支
git flow feature finish 2.0.99

# release
git flow release start 2.0.99
git flow release finish 2.0.99
```

**注意事项**

- 开发新功能或者修复的时候，需要先保证本地没有未上传的代码才可以创建
- 提交分支时，需先提交到本地之后，运行 git flow… 后，推送到线上 master 和 develop（两次推送）
- 进行 hotfix 进行修复以及 release 发布版本时候必须完整填写 `~/modules/build.md` 发版文件

### 代码提交规范

代码提交根据前缀来区分不同的提交内容

```Plaintext
# 任务前缀
task # 859 子 订单列表界面调整/订单列表
# bug 前缀
bug # 308 用户管理操作
# 版本发布前缀
release # 2.3.2
```

## 代码审核

### 代码要求

- 参数命名符合规范
- 撰写负责模块的注释(注释包含类, 接口文档, 参数, 方法, 函数)
- 撰写单元测试, 保障功能/接口 正常使用

### 审核标准

- 运行优化导入, 保证代码无冗余 `ctrl + alt + o`
- 保证代码格式正确, 对文件夹进行代码格式化 `ctrl + alt + l`, 在 `src` 目录下运行
- 代码中不得存在编辑器提示的错误, 优化提示见[PHP Code Review](https://snippets.cacher.io/snippet/8e1fe81c08d6f6591295)
- 对开发功能进行抽检, 进行考评, 不符合标准的进行 5 元红包进行改正

## IDE

**忽略掉不需要的加载目录**

生成的文件, 不需要进行索引

```Plaintext
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

## Code Review

### 1. 框架需要遵循的规范

```Bash
# 使用 php-cs-fixer 来检测基本的格式
php artisan poppy:doc cs

# 使用 system:inspect 检测函数注释
php artisan system:inspect
```

### 2. Request 输入

使用 `Request`, 这里的 Request 代表的是全局变量  
控制器中不建议使用参数注入, 使用 input 替代即可.  
同理的还有 `Request::get('param')`

```Plaintext
// deprecated
$is_apply = \Input::input('is_apply');

// succcess
$is_apply = input('is_apply');
```

### 3. 缓存命名

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

### 4. 去除多余参数

```Plaintext
# bad, 默认为空字符串, 所以第三个参数是空字符串的时候不需要写
$type = sys_get($input, 'socialite_type', ''),

# good
$type = sys_get($input, 'socialite_type'),
```

### 5. 保障模块洁净注释完整

system 模块不能包含其他模块的任何东西  
生成 php 文档, 检查文档是否注释完整

### 6. 保障模块附加组件完整

模块需要安装的时候需要保证组件正常, 在 dependency 中添加的模块完整, 这个放置在 dependency 中进行验证

### 7. 其他注意事项

1. 保证测试脚本可以正常执行
2. Inspect 文件没有异常
3. 保证接口正常, 使用接口检测 500 工具来运行, 保证接口正常
4. 保证代码中不包含 debug 项目
5. 不建议在项目中包含 env 的调用, 可以使用函数来进行调用

### 8. 框架升级 2.0 时候出现的问题

- No hint path defined for [poppy].
- Authentication user provider [pam.web] is not defined.

这里出现的问题是

1. 清空缓存
2. 删除框架文件 `storage/framework/*.php`
3. 删除 poppy 模块缓存文件 `storage/app/poppy.json`

### 9. Function name must be a string

这里一般的问题就是中间件名称和定义的中间件名称不匹配导致