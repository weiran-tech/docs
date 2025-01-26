---
description: 'Poppy Framework 文档'
lastUpdated: '2023-12-11 19:38:00'
head: 
  - - meta
    - name: 'og:title'
      content: '文件树'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Poppy Framework 文档'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/3.x/framework/tree.html'
---
# 文件树



Poppy Framework 文档

```
├── README.md
├── composer.json
├── config
│   └── poppy.php
├── docs                   # 文档
│   └── build.md
├── phpunit.xml            # 单元测试文件
├── resources
│   ├── lang               # 语言包
│   ├── stubs              # make 文件生成
│   └── views              # 默认视图
│       └── template
│           ├── default.blade.php
│           └── message.blade.php
├── src
│   ├── Application        # 基本控制器继承
│   │   ├── ApiController.php
│   │   ├── Controller.php
│   │   ├── Event.php
│   │   ├── Job.php
│   │   ├── Request.php
│   │   └── TestCase.php
│   ├── Classes            # 基础加载器, Number, Resp, Traits
│   │   ├── ClassLoader.php
│   │   ├── Number.php
│   │   ├── Resp.php
│   │   └── Traits
│   │       ├── AppTrait.php
│   │       ├── HasAttributesTrait.php
│   │       ├── KeyParserTrait.php
│   │       ├── MigrationTrait.php
│   │       ├── PoppyTrait.php
│   │       └── ViewTrait.php
│   ├── Console            # 命令行
│   │   ├── Commands
│   │   │   ├── PoppyDisableCommand.php
│   │   │   ├── PoppyEnableCommand.php
│   │   │   ├── PoppyListCommand.php
│   │   │   ├── PoppyMigrateCommand.php
│   │   │   ├── PoppyMigrateRefreshCommand.php
│   │   │   ├── PoppyMigrateResetCommand.php
│   │   │   ├── PoppyMigrateRollbackCommand.php
│   │   │   ├── PoppyOptimizeCommand.php
│   │   │   └── PoppySeedCommand.php
│   │   ├── ConsoleServiceProvider.php
│   │   ├── GeneratorCommand.php
│   │   ├── GeneratorServiceProvider.php
│   │   └── Generators
│   │       ├── MakeCommandCommand.php
│   │       ├── MakeControllerCommand.php
│   │       ├── MakeMiddlewareCommand.php
│   │       ├── MakeMigrationCommand.php
│   │       ├── MakeModelCommand.php
│   │       ├── MakePolicyCommand.php
│   │       ├── MakePoppyCommand.php
│   │       ├── MakeProviderCommand.php
│   │       ├── MakeRequestCommand.php
│   │       ├── MakeSeederCommand.php
│   │       ├── MakeTestCommand.php
│   │       └── stubs
│   │           ├── command.stub
│   │           ├── controller.resource.stub
│   │           ├── controller.stub
│   │           ├── event.stub
│   │           ├── listener.stub
│   │           ├── listener-duck.stub
│   │           ├── listener-queued.stub
│   │           ├── listener-queued-duck.stub
│   │           ├── middleware.stub
│   │           ├── model.stub
│   │           ├── policy.stub
│   │           ├── provider.stub
│   │           ├── request.stub
│   │           ├── seeder.stub
│   │           └── test.stub
│   ├── Database          # 数据库集成器
│   │   └── Migrations
│   │       └── Migrator.php
│   ├── Events            # 提供的事件
│   │   └── PoppyMake.php
│   ├── Exceptions        # 异常
│   │   ├── AjaxException.php
│   │   ├── ApplicationException.php
│   │   ├── ArithmeticException.php
│   │   ├── BaseException.php
│   │   ├── DoException.php
│   │   ├── FakerException.php
│   │   ├── LoadConfigurationException.php
│   │   ├── ModuleNotFoundException.php
│   │   ├── ParamException.php
│   │   ├── PolicyException.php
│   │   ├── PoppyException.php
│   │   ├── RbacException.php
│   │   ├── RuntimeException.php
│   │   ├── TestException.php
│   │   └── TransactionException.php
│   ├── Facade        # 门面
│   │   ├── IniFacade.php
│   │   ├── XmlFacade.php
│   │   ├── YamlFacade.php
│   ├── Filesystem        # 文件系统
│   │   └── Filesystem.php
│   ├── Foundation        # Kernal 以及异常处理
│   │   ├── Application.php
│   │   ├── Bootstrap
│   │   │   └── RegisterClassLoader.php
│   │   ├── Console
│   │   │   └── Kernel.php
│   │   ├── Contracts
│   │   │   └── Bootstrap.php
│   │   ├── Exception
│   │   │   └── Handler.php
│   │   └── Http
│   │       └── Kernel.php
│   ├── FrameworkServiceProvider.php
│   ├── Helper           # 帮助文件
│   │   ├── ArrayHelper.php
│   │   ├── CookieHelper.php
│   │   ├── EnvHelper.php
│   │   ├── FileHelper.php
│   │   ├── HtmlHelper.php
│   │   ├── ImageHelper.php
│   │   ├── RouterHelper.php
│   │   ├── SearchHelper.php
│   │   ├── StrHelper.php
│   │   ├── TimeHelper.php
│   │   ├── TreeHelper.php
│   │   └── UtilHelper.php
│   ├── Http            # 控制器相关, 中间件, 分页
│   │   ├── Middlewares
│   │   │   └── EnableCrossRequest.php
│   │   └── Pagination
│   │       └── PageInfo.php
│   │   └── BladeServiceProvider.php
│   ├── Parse           # 解析器
│   │   ├── Ini.php
│   │   ├── ParseServiceProvider.php
│   │   ├── Xml.php
│   │   └── Yaml.php
│   ├── Poppy           # poppy 加载的模块操作
│   │   ├── Abstracts
│   │   │   └── Repository.php
│   │   ├── Contracts
│   │   │   └── Repository.php
│   │   ├── Events
│   │   │   └── PoppyOptimized.php
│   │   ├── FileRepository.php
│   │   ├── Poppy.php
│   │   └── PoppyServiceProvider.php
│   ├── Support            # 支援文件
│   │   ├── Abstracts
│   │   │   └── Repository.php
│   │   ├── PoppyServiceProvider.php
│   │   └── functions.php
│   ├── Translation       # 多语言
│   │   ├── TranslationServiceProvider.php
│   │   └── Translator.php
│   └── Validation        # 验证规则
│       └── Rule.php
└── tests                 # 测试文件
```

