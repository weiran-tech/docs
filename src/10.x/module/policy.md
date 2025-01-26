---
description: '策略放置在 {module}/src/Models/Polices 文件夹中策略映射放在 {module}/src/ServiceProvider.php 文件中, 如下定义对特定用户，你可能希望通过指定的策略授权所有动作。 要达到这个目的，可以在策略中定义一个 before 方法。before 方法会在策略中其它所有方法之前执行，这样提供了一种方式来授权动作而不是指定的策略方法来执行判断。使用这种方法的优势在于如果你想拒绝用户所有的授权，你应该在 before 方法中返回 false。如果返回的是null，则通过其它的策略方法来决定授权与否。用户在策略中使用校验会触发'
lastUpdated: '2025-01-23 00:22:00'
head: 
  - - meta
    - name: 'og:title'
      content: '策略'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '策略放置在 {module}/src/Models/Polices 文件夹中策略映射放在 {module}/src/ServiceProvider.php 文件中, 如下定义对特定用户，你可能希望通过指定的策略授权所有动作。 要达到这个目的，可以在策略中定义一个 before 方法。before 方法会在策略中其它所有方法之前执行，这样提供了一种方式来授权动作而不是指定的策略方法来执行判断。使用这种方法的优势在于如果你想拒绝用户所有的授权，你应该在 before 方法中返回 false。如果返回的是null，则通过其它的策略方法来决定授权与否。用户在策略中使用校验会触发'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/10.x/module/policy.html'
---
# 策略



## 位置

策略放置在  `{module}/src/Models/Polices`  文件夹中

策略映射放在  `{module}/src/ServiceProvider.php`  文件中, 如下定义

```php
protected $policies = [
    PamRole::class    => PamRolePolicy::class,
    PamAccount::class => PamAccountPolicy::class,
];
```

## 策略权限

对特定用户，你可能希望通过指定的策略授权所有动作。 要达到这个目的，可以在策略中定义一个  `before`  方法。 `before`  方法会在策略中其它所有方法之前执行，这样提供了一种方式来授权动作而不是指定的策略方法来执行判断。

使用这种方法的优势在于

- 可以在列表中是否显示按钮时候直接使用策略来进行定义, 并非判定两个权限
- 可以在用户操作时候进行权限和状态的多重判定

```php
class PamRolePolicy
{

    use PolicyTrait;

    /**
     * @var array 权限映射
     */
    protected static array $permissionMap = [
        'edit'       => 'backend:py-system.role.manage',
        'delete'     => 'backend:py-system.role.manage',
        'create'     => 'backend:py-system.role.manage',
        'permission' => 'backend:py-system.role.permissions',
    ];
    
    // ...
}
```

如果你想拒绝用户所有的授权，你应该在  `before`  方法中返回  `false` 。如果返回的是 `null` ，则通过其它的策略方法来决定授权与否。

```php
/**
 * 策略映射
 */
trait PolicyTrait
{

    /**
     * @param PamAccount $pam     账号
     * @param string     $ability 能力
     * @return bool|null
     */
    public function before(PamAccount $pam, $ability)
    {
        $permission = self::$permissionMap[$ability] ?? '';
        return $permission ? $pam->capable($permission) : null;
    }
}
```

## 表单校验

用户在策略中使用校验会触发更加详细的权限说明

以下是在表单请求中进行策略验证的示例

```
class ExceptionPolicyRequest extends Request
{

    public function authorize(): bool
    {
        return $this->can('create', DemoWebapp::class);
    }

    public function rules(): array
    {
        return [];
    }
}

```

当我们使用 FormRequest 的时候如果权限返回 false 则会触发  `AuthorizationException`  异常, 这个异常在提示过程中是不友好的

内容是 :  `This action is unauthorized.` , 即使我们做了拦截, 也只能够出现:  `操作未授权, 无权操作` , 所以我们封装了一个方法进行友好的提示

设置位置 :  `{module}/resources/lang/zh/util.php`

```php
<?php

return [
    'policy' => [
        'demo_webapp' => [
            'create' => '创建应用',
        ],
    ],
];
```

这样的提示语则为  `你无权操作 创建应用` , 这样的提示是比较友好的

