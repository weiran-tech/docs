---
description: '策略是组织行为准则，包括策略规范、定义与位置。通过检查策略确保合规性，控制器进行授权管理，实现策略的全面执行与控制。'
lastUpdated: '2026-06-22 13:40:28'
head:
  - - meta
    - name: 'og:title'
      content: '策略(Policy)'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '策略是组织行为准则，包括策略规范、定义与位置。通过检查策略确保合规性，控制器进行授权管理，实现策略的全面执行与控制。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech//2.x/policy.html'
---
# 策略(Policy)

### 策略规范

- 策略使用首字母小写的驼峰模式

### 策略位置

策略分为两个部分, 第一个部分是框架策略, 第二部分是项目策略

**框架策略**

LemonFramework 项目中使用 `app/Lemon/Repositories/LemonServiceProvider.php` 加载

**项目策略**

项目策略位置 `app/Policies` 项目 Service 位置 `app/Providers/PolicyServiceProvider.php`

### 策略定义

随着应用逻辑越来越复杂，要处理的权限越来越多，将所有权限定义在`AuthServiceProvider`显然不是一个明智的做法，因此Laravel引入了策略类，策略类是一些原生的PHP类，和控制器基于资源对路由进行分组类似，策略类基于资源对权限进行分组管理。

**生成策略类**

可以使用如下Artisan命令生成`PostPolicy`策略类：

```Plaintext
php artisan make:policy PostPolicy
```

生成的策略类位于`app/Policies`目录。

**注册策略**

然后我们可以在`AuthServiceProvider`的`policies`属性中注册策略类：

```Plaintext
protected $policies = [
    Post::class => PostPolicy::class,
];
```

下面我们编辑`PostPolicy`如下：

```Plaintext
<?php

namespace App\Policies;

use App\User;
use App\Post;

class PostPolicy{
    /**
     * 判断给定文章是否可以被给定用户更新
     *
     * @param  \App\User  $user
     * @param  \App\Post  $post
     * @return bool
     */
    public function update(User $user, Post $post)
    {
        return $user->id === $post->user_id;
    }
}
```

> 注：所有策略类都通过服务容器进行解析，这意味着你可以在策略类的构造函数中类型提示任何依赖，它们将会自动被注入。

### 检查策略

如果为某个资源类型定义了策略类，Gate将会使用第一个参数来判断检查策略类上的哪个方法。

因此，要检查是否有权限更新某篇文章，只需要传入文章实例和update权限：

```Plaintext
<?php

namespace App\Http\Controllers;

use Gate;
use App\User;
use App\Post;
use App\Http\Controllers\Controller;

class PostController extends Controller{
    /**
     * 更新给定文章
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id)
    {
        $post = Post::findOrFail($id);

        if (Gate::denies('update', $post)) {
            abort(403);
        }

        // 更新文章...
    }
}
```

当然也可以使用User模型和Blade指令检查权限。

此外，Laravel还提供了一个全局帮助函数`policy`来检查权限：

```Plaintext
if (policy($post)->update($user, $post)) {
    //
}
```

### 控制器授权

由于大多数授权都会在检查权限失败的情况下退出控制器方法，因此在控制器中检查权限有一条捷径（`AuthorizesRequests`trait提供，该trait在基类控制器`Controller`中被使用）：

```Plaintext
<?php

namespace App\Http\Controllers;

use App\Post;
use App\Http\Controllers\Controller;

class PostController extends Controller{
    /**
     * 更新给定文章
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id)
    {
        $post = Post::findOrFail($id);
        $this->authorize('update', $post);
        // 更新文章...
    }
}
```

和我们上面的例子一样，如果授权失败会抛出403错误。

最后，如果你的控制器方法名和策略类中的方法名相同，例如都是`update`，则可以省略`authorize`的第一个参数：

```Plaintext
public function update($id){
    $post = Post::findOrFail($id);
    $this->authorize($post);
    // 更新文章...
}
```

此外，`AuthorizesRequests`也提供了对非当前认证用户权限检查的支持：

```Plaintext
$this->authorizeForUser($user, 'update', $post);
```

### 参考文章

- [Laravel 5.1 中的ACL用户授权及权限检查功能实现教程](http://laravelacademy.org/post/1337.html)