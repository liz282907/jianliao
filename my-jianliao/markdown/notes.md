### 坑们

#### scss文件中的变量报undefined错
>False positive “undefined variable” error when compiling SCSS
   
楼主遇到的问题是在Signup.js里面import了同目录的Signup.scss文件，该样式文件中引用了一个变量，
为了项目统一管理，把变量都放到了style文件夹中variables里面。
![](http://p1.bpimg.com/567571/a64eb27c1529f92d.png)
然后core.scss是在core文件（可以理解为根组件）中被引入的。
按理说最终都被打包到一个js文件中，应该都可以访问呀，为什么会报这个错捏？

问题在于：

1. signup.scss没有变量文件的访问权限，（没有主动import），因此变量对它不可见，只对core可见
2. 上面最终打包到一个文件的说法其实不正确，是编译后打包到一个里面，也就是说那个时候变量
2. 如果不让signup去直接访问变量文件的话，那就让core去访问，那就要做两步：
- core里面引入signup.scss 
- 变量文件和signup要保持源文件，即用下划线开头的命名，告诉编译器不要编译文件，要等到最终都被加入到
core里面去后统一编译。否则就会遇到变量里面被编译好，没有"变量"这个概念了，那么signup里面也就找不到对应的值了。


所以解决方案是：
1. signup里面主动import变量文件...
2. 顶层文件编译，下层文件保持_file.scss的格式，不要主动被编译
```javascript
//core.scss
@import './components/index';

//variables/_color.scss
$icon-ok: #b2d7b2;

//components/_index.scss
@import './Signup';
```

##### reference：
1. [False positive “undefined variable” error when compiling SCSS](http://stackoverflow.com/questions/17976140/false-positive-undefined-variable-error-when-compiling-scss)
