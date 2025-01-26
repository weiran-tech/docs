---
description: '这个 rbac 角色控制修改自 entrust. 因为 entrust 的 @can 用法和 laravel 中的 Acl 控制 @can冲突, 故而重新对 entrust 进行修改. 改掉了其中$user->can() 同样改定为 $user->capable()角色控制和acl是两个不同的权限控制, 角色控制是用户能否进行某项操作, acl 是这个用户在某个阶段能否进行某个操作, 这两个一起用来是没有冲突的.在config/app.php 的 providers数组中添加服务提供者让其注册 rbac 类和@permission 等语法支持在 aliases 数组中添加'
lastUpdated: '2024-01-29 15:44:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'RBAC 角色控制'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '这个 rbac 角色控制修改自 entrust. 因为 entrust 的 @can 用法和 laravel 中的 Acl 控制 @can冲突, 故而重新对 entrust 进行修改. 改掉了其中$user->can() 同样改定为 $user->capable()角色控制和acl是两个不同的权限控制, 角色控制是用户能否进行某项操作, acl 是这个用户在某个阶段能否进行某个操作, 这两个一起用来是没有冲突的.在config/app.php 的 providers数组中添加服务提供者让其注册 rbac 类和@permission 等语法支持在 aliases 数组中添加'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/2.x/rbac.html'
---
# RBAC 角色控制



这个 rbac 角色控制修改自 entrust. 因为 entrust 的  `@can`  用法和 laravel 中的 Acl 控制  `@can` 冲突, 故而重新对 entrust 进行修改. 改掉了其中 `$user->can()`  同样改定为  `$user->capable()`

角色控制和acl是两个不同的权限控制, 角色控制是用户能否进行某项操作, acl 是这个用户在某个阶段能否进行某个操作, 这两个一起用来是没有冲突的.

## 安装

在 `config/app.php`  的  `providers` 数组中添加服务提供者

```
App\Lemon\Repositories\Providers\RbacServiceProvider::class,
```

让其注册 rbac 类和 `@permission`  等语法支持

在  `aliases`  数组中添加

```
'Rbac'      => App\Lemon\Repositories\Application\Rbac\Facades\RbacFacade::class,
```

让其支持  `\Rbac::capable()`  等的快捷用法

如果你使用 [Middleware](about:blank#middleware) (Laravel 5.1+) 你需要添加

```
'role' => \Imvkmark\L5Rbac\Middleware\L5RbacRole::class,
'permission' => \Imvkmark\L5Rbac\Middleware\L5RbacPermission::class,
'ability' => \Imvkmark\L5Rbac\Middleware\L5RbacAbility::class,
```

到  `app/Http/Kernel.php`  的  `routeMiddleware`  数组

## 配置

设置  `config/auth.php`  的值来设定正确的用户表和模型, 同样也需要设定  `rbac.php`  来设定自定义表名称和命名空间.

### 用户和角色关联

数据表意义:

-  `pam_role`  — 存储角色

-  `pam_permission`  — 存储权限

-  `pam_role_account`  — 存储角色和用户的多对多关系

-  `pam_permission_role`  — 存储权限和角色的多对多关系

### 模型

### Role

`Role`  模型有以下几个属性

-  `name`  — 角色的唯一名称, 英文标识, 例如 “admin”, “owner”, “employee”.

-  `display_name`  — 角色可以被人识别的显示的名称(可选)

-  `description`  — 更详细的描述(可选)

### Permission

`Permission`  模型和  `Role`  有类似的属性:

-  `name`  — 唯一的权限名称, 例如: “create-post”, “edit-user”, “post-payment”, “mailing-list-subscribe”.

-  `display_name`  — 权限的描述信息(可选) “Create Posts”, “Edit Users”, “Post Payments”, “Subscribe to mailing list”.

-  `description`  — 更详细的权限描述信息

### User

使用  `RbacUserTrait`  在系统中的  `User`  模型

```
<?php

use App\Lemon\Repositories\Application\Rbac\Traits\RbacUserTrait;
class User extends Eloquent {
    use RbacUserTrait;
    // add this trait to your user model
    // ...
}
```

这个会启用用户和 `Role`  关联关系, 并且给 `User` 模型添加以下方法  `roles()` ,  `hasRole($name)` ,  `capble($permission)` ,  `ability($roles, $permissions, $options)`

添加完成之后不要忘记更新 composer 的自动加载文件

```
composer dump-autoload
```

### Soft Deleting

The default migration takes advantage of  `onDelete('cascade')`  clauses within the pivot tables to remove relations when a parent record is deleted. If for some reason you cannot use cascading deletes in your database, the EntrustRole and EntrustPermission classes, and the HasRole trait include event listeners to manually delete records in relevant pivot tables. In the interest of not accidentally deleting data, the event listeners will  **not**  delete pivot data if the model uses soft deleting. However, due to limitations in Laravel’s event listeners, there is no way to distinguish between a call to  `delete()`  versus a call to  `forceDelete()` . For this reason,  **before you force delete a model, you must manually delete any of the relationship data**  (unless your pivot tables uses cascading deletes). For example:

```
$role = Role::findOrFail(1);
// Pull back a given role
// Regular Delete
$role->delete();
// This will work no matter what
// Force Delete
$role->users()->sync([]);
// Delete relationship data
$role->perms()->sync([]);
// Delete relationship data
$role->forceDelete();
// Now force delete will work regardless of whether the pivot table has cascading delete
```

## 使用说明

### 概念

下面开始创建角色和权限

```
$owner = new Role();
$owner->name         = 'owner';
$owner->display_name = 'Project Owner';
// optional
$owner->description  = 'User is the owner of a given project';
// optional
$owner->save();
$admin = new Role();
$admin->name         = 'admin';
$admin->display_name = 'User Administrator';
// optional
$admin->description  = 'User is allowed to manage and edit other users';
// optional
$admin->save();
```

接下来， 给用户赋予角色， 我们使用  `HasRole`  trait 来非常方便的给用户赋予固定的角色

```
$user = User::where('username', '=', 'michele')->first();
// role attach alias
$user->attachRole($admin);
// parameter can be an Role object, array, or id
// or eloquent's original technique
$user->roles()->attach($admin->id);
// id only
```

下面我们给角色赋予权限

```
$createPost = new Permission();
$createPost->name         = 'create-post';
$createPost->display_name = 'Create Posts';
// optional
// Allow a user to...
$createPost->description  = 'create new blog posts';
// optional$createPost->save();
$editUser = new Permission();
$editUser->name         = 'edit-user';
$editUser->display_name = 'Edit Users';
// optional
// Allow a user to...
$editUser->description  = 'edit existing users';
// optional
$editUser->save();
$admin->attachPermission($createPost);
// equivalent to
$admin->perms()->sync(array($createPost->id));
$owner->attachPermissions(array($createPost, $editUser));
// equivalent to
$owner->perms()->sync(array($createPost->id, $editUser->id));
```

### 检查 Roles 和 Permissions

我们通过以下方式来检测

```
$user->hasRole('owner');   // false
$user->hasRole('admin');   // true
$user->capable('edit-user');   // false
$user->capable('create-post'); // true
```

`hasRole()`  和  `capable()`  接收数组形式的角色和权限来进行检测

```
$user->hasRole(['owner', 'admin']);       // true
$user->capable(['edit-user', 'create-post']); // true
```

默认, 如果任何一个权限或者角色通过都会返回  `true` , 如果传递第二个参数  `true`  , 则要求 `所有` 的权限都必须检测通过才能返回  `true`

```
$user->hasRole(['owner', 'admin']);
// true
$user->hasRole(['owner', 'admin'], true);
// false, user does not have admin role
$user->capable(['edit-user', 'create-post']);
// true
$user->capable(['edit-user', 'create-post'], true);
// false, user does not have edit-user permission
```

一个 `用户` 能够拥有多个 `角色` , 反之亦然.

`Rbac`  对当前用户存在两个方法  `capable()`  和  `hasRole()` 来检测是否有这个角色或者有相关的权限

```
Rbac::hasRole('role-name');
Rbac::capable('permission-name');
// is identical to
Auth::user()->hasRole('role-name');
Auth::user()->capable('permission-name');
```

你同样可以使用占位符来检测匹配的权限.

```
// match any admin permission
$user->capable("admin.*");
// true
// match any permission about users
$user->capable("*_users");
// true
```

### User ability

`ability`  方法是更具有优势的一个请求方法. 他需要传递三个参数

-  `roles`  一系列需要检测的角色
-  `permissions`  一系列权限

每组角色或权限都可以使用数组或者使用  `,`  分隔

```
$user->ability(array('admin', 'owner'), array('create-post', 'edit-user'));
// or
$user->ability('admin,owner', 'create-post,edit-user');
```

这会检测用户是否有相关的权限或者角色. 如上说明: 如果用户是  `admin`  角色并且拥有 `create-post` 则返回  `true` .

第三个参数是个可选的数组.

```
$options = array(
    'validate_all' => true | false (Default: false),    
    'return_type'  => boolean | array | both (Default: boolean)
);
```

-  `validate_all`  是否检测所有的权限, 或者说只要是存在匹配则返回 `true` .
-  `return_type`  指定返回的类型:  `boolean` ,  `array` , 或者两个都返回

下面是示例 :

```
$options = array(
    'validate_all' => true,
    'return_type' => 'both'
);
list($validate, $allValidations) = $user->ability(
    array('admin', 'owner'),
    array('create-post', 'edit-user'),
    $options
);
var_dump($validate);
// bool(false)
var_dump($allValidations);
// array(4) {
//     ['role'] => bool(true)
//     ['role_2'] => bool(false)
//     ['create-post'] => bool(true)
//     ['edit-user'] => bool(false)
// }
```

`Rbac`  有一个  `ability()`  快捷方式来检测当前的用户

```
Rbac::ability('admin,owner', 'create-post,edit-user');// is identical toA
uth::user()->ability('admin,owner', 'create-post,edit-user');
```

### Blade 语法

在 blade 模板中有三个标签可用: 传递的值会直接传递给  `Rbac`  函数

```
@role('admin')    
<p>This is visible to users with the admin role. Gets translated to    \Rbac::role('admin')</p>
@endrole

@permission('manage-admins')

<p>This is visible to users with the given permissions. Gets translated to    \Rbac::capable('manage-admins'). The @can directive is already taken by core    laravel authorization package, hence the @permission directive instead.</p>

@endpermission

@ability('admin,owner', 'create-post,edit-user')
<p>This is visible to users with the given abilities. Gets translated to    \Rbac::ability('admin,owner', 'create-post,edit-user')</p>
@endability
```

### Middleware 中间件

你可以使用中间件来过滤路由或者是一组路由, 通过权限或者是角色

```
Route::group([
    'prefix' => 'admin',
    'middleware' => ['role:admin']
], function() {
    Route::get('/', 'AdminController@welcome');
    Route::get('/manage', [
        'middleware' => ['permission:manage-admins'],
        'uses' => 'AdminController@manageAdmins'
    ]);
});
```

It is possible to use pipe symbol as  _OR_  operator: 也可以使用管道符号  `|`  来替代  `OR`  选项

```
'middleware' => ['role:admin|root']
```

使用  `AND`  方法则需要传递多个值给中间件

```
'middleware' => ['permission:owner', 'permission:writer']
```

更多的中间件兼容性用法支持  `ability` 方式,他接受三个参数: roles, permissions, validate_all

```
'middleware' => ['ability:admin|owner,create-post|edit-user,true']
```

### 路由过滤语法

通过 权限/ 角色来过滤路由的方式是在  `app/Http/routes.php`  文件中调用:

```
// only users with roles that have the 'manage_posts' permission will be able to access any route within admin/post
Rbac::routeNeedsPermission('admin/post*', 'create-post');

// only owners will have access to routes within admin/advanced
Rbac::routeNeedsRole('admin/advanced*', 'owner');// optionally the second parameter can be an array of permissions or roles

// user would need to match all roles or permissions for that route
Rbac::routeNeedsPermission('admin/post*', array('create-post', 'edit-comment'));
Rbac::routeNeedsRole('admin/advanced*', array('owner','writer'));
```

以上的方法都接受第三个参数, 如果第三个参数传递为空则返回  `App::abort(403)` , 否则返回其他的输入值

所以你可以如下使用 :

```
Rbac::routeNeedsRole('admin/advanced*', 'owner', Redirect::to('/home'));
```

当然也可以传递第四个参数, 默认是  `true`  他的意思是检查所有给定的 roles/permissions

如果设置为 false, 函数仅仅在用户角色不符合同时权限也不符合的时候返回  `false` . 这个在管理员允许多组用户的时候会非常有用

```
// if a user has 'create-post', 'edit-comment', or both they will have access
Rbac::routeNeedsPermission('admin/post*', array('create-post', 'edit-comment'), null, false);

// if a user is a member of 'owner', 'writer', or both they will have access
Rbac::routeNeedsRole('admin/advanced*', array('owner','writer'), null, false);

// if a user is a member of 'owner', 'writer', or both, or user has 'create-post', 'edit-comment' they will have access
// if the 4th parameter is true then the user must be a member of Role and must have Permission
Rbac::routeNeedsRoleOrPermission(
    'admin/advanced*',
    array('owner', 'writer'),
    array('create-post', 'edit-comment'),
    null,
    false
);
```

### 路由过滤

`Rbac`  roles/permissions 也能够很简单的写在路由的过滤器中通过 Facade 进行权限控制

```
Route::filter('manage_posts', function(){
    // check the current user
    if (!Rbac::capable('create-post')) {
        return Redirect::to('admin');
    }
});

// only users with roles that have the 'manage_posts' permission will be able to access any admin/post route
Route::when('admin/post*', 'manage_posts');
```

过滤一个角色:

```
Route::filter('owner_role', function(){
    // check the current user
    if (!Rbac::hasRole('Owner')) {
        App::abort(403);
    }
});
// only owners will have access to routes within admin/advancedRoute::when('admin/advanced*', 'owner_role');
```

如上所示  `Rbac::hasRole()`  和  `Rbac::capable()`  检查用户是否已经登陆同时这个用户是否有这个权限来操作这个功能. 如果用户未登录则返回的值一定是 false;

## 错误提示

`$user->capable()`  的权限必须在 acl 中定义, 并且更新到权限表中, 否则返回肯定是错误的

