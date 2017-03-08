### 跨域

#### 场景
>index.html请求服务器上的资源(因为之前打包的时候写进HTML的是public_path，对本项目
来说是public/dist)。可以看到
![](http://i1.piimg.com/567571/eccfb103d64cbe72.png)
同时又请求了localhost:3000/signin，自然会导致跨域。（也就是说本来各种资源是限定在本localhost上，但是现在去访问了文件服务器的资源）
因此，需要对文件服务器去做跨域准许的处理。

#### 实践

虽然我们把请求的localhost改掉就可以，但是楼主还是想试一下跨域的处理~

我们先用[阮大大的一篇CORS的科普文](http://www.ruanyifeng.com/blog/2016/04/cors.html)来做一下热身.

(其实好像就是html5 rock上的一篇翻译，[原文戳这里](https://www.html5rocks.com/en/tutorials/cors/))画重点就是：

整个流程如图所示
![](http://p1.bpimg.com/567571/dd07feac072bb857.png)

跨域请求分简单请求和非简单请求。

##### 简单请求

只要同时满足下面两个方面，就是简单请求。
![](http://i1.piimg.com/567571/d72f834bcad41cd7.png)


对于简单请求，浏览器会在请求时自动加一个Origin字段（协议 + 域名 + 端口）到header中，

![](http://p1.bpimg.com/567571/28c400b17c1bd992.png)

分两种结果，

- 服务器没有在response头里面设置`Access-Control-Allow-Origin`字段，
    ```javascript
    HTTP/1.1 200 OK
    X-Powered-By: Express
    content-type: text/html; charset=utf-8
    Content-Length: 646
    ETag: W/"286-k8cuVTjcojC5FeeTYm67UA"
    Vary: Accept-Encoding
    Date: Tue, 07 Mar 2017 11:11:41 GMT
    Connection: keep-alive
    ```

    那么，浏览器发现后会抛出一个错误
![](http://p1.bpimg.com/567571/f9f9e08baab3f847.png)
- origin是在服务器允许的范围内，那么服务器返回的响应会多出几个字段
    
    ```javascript
    //响应头

    Access-Control-Allow-Origin: http://api.bob.com
    Access-Control-Allow-Credentials: true //默认情况下cookie只能在同域名内被共有，因此跨域请求是得不到Cookies。设置true表明响应是否可以被得到：是否可以随着请求发送，还是忽略header，以及
    Access-Control-Expose-Headers: FooBar //前端可以得到的res中的header,默认只有几个选项（正式请求的res）
    Content-Type: text/html; charset=utf-8
  
    //res，下面的allowHeader是在预请求的响应中被告知的，告诉前端下一次正式请求中可以有的header有哪些（包括自定义的），在预请求的res中指定
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');//允许前台访问到的header字段
    ```
    因此要配置跨域的话，后端可以这么处理

    ```javascript
    app.all('/*', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    });
    ```
    ![](http://p1.bpimg.com/567571/fa3db7fa0ab586f2.png)
    
    注意点：
    
    - 注意区分`Access-Control-Allow-Headers`和`Access-Control-Expose-Headers`，前者是`which request headers the client is allowed to send`,
    后者是`which response headers the client is allowed to read`。
    
        关于expose-header,xhr 对象有getResponseHeader()方法可以得到header信息，但是在cors请求中，只能得到
        
        - Cache-Control
        - Content-Language
        - Content-Type
        - Expires
        - Last-Modified
        - Pragma 
        
        几个字段，如果希望client可以得到更多的信息，server可以在allow-header中暴露header list
  
##### 非简单请求
对用户来说看起来只有一个请求，但实际上浏览器会预先自动发送一个preflight请求，向服务器询问能否发送后续的这个跨域请求，如果server允许了，就发送，preflight也可以被缓存的。
![](http://i1.piimg.com/567571/824cab5ca1b4b0aa.png)
`Access-Control-Request-Method` 字段总是会被发送出去的，server去验证该字段，以及reqeust-headers字段（如果client请求中写了的话）。
也有两种结果：

- 验证成功，会发送以下preflight的response

    ```javascript
    Access-Control-Allow-Origin: http://api.bob.com  //required
    Access-Control-Allow-Methods: GET, POST, PUT     //required //尽管preflight的req中可能只请求了一个method,但是res中可以有多个，方便preflight的cache,可以接受多种类型的请求
    Access-Control-Allow-Headers: X-Custom-Header    //如果client的req中有这部分请求，则required，以逗号分隔的列表，包括的可以不仅仅是preflight的req中请求的header
    Access-Control-Allow-Credentials： 可选
    Access-Control-Max-Age (optional): //因为每次都发preflight其实是expensive的..因此可以设置cache的时间
    Content-Type: text/html; charset=utf-8
    ```
    然后就可以发送真正的跨域请求了
    
    ```javascript
    //Actual Request:
    
    PUT /cors HTTP/1.1
    Origin: http://api.bob.com
    Host: api.alice.com
    X-Custom-Header: value
    Accept-Language: en-US
    Connection: keep-alive
    User-Agent: Mozilla/5.0...
    
    //Actual Response:
    
    Access-Control-Allow-Origin: http://api.bob.com
    Content-Type: text/html; charset=utf-8
    ```
- 服务端拒绝preflight
服务端只要发送任意res，只要不包括cors的header就行，比如200。一旦浏览器发现没有cors相关的header，就会触发onerror回调，同时打印出上面我们看到的error的信息

### references

1. [MDN：http访问控制，推荐](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
2. [html5rocks：using cors](https://www.html5rocks.com/en/tutorials/cors/)

### 文件资源路径

#### express.static
client打包的资源文件放到server的public目录下（楼主这边放在public里面的dist里面了），里面的src都指向'/'根目录，即

```javascript
<script type="text/javascript" src="/app.7f5d256f0f980e555c67.js"></script>
```

为了能够找到对应的文件，我们要讲'/'做个proxy，在app.js里面把'/'导引到dist文件夹

```javascript
//config.js
static_path: path.join(__dirname,'public/dist')

//app.js
app.use('/',express.static(config.static_path))
```
因此静态文件比如html中去请求js，就会去public/dist文件夹中查找，get请求也可以这么处理。

```javascript
url: localhost:3001/account/signup

exports.showSignup = function (req, res, next) {
    res.sendFile('index.html',config.static_path)//注意sendFile要为绝对路径，或者要设置root
}
```

### 杂
1. 不小心commit/add了nodemodule后，想在git里面删除掉：
    ```javascript
    git rm --cached client，
    然后更新 .gitignore 忽略掉目标文件，
    最后 git commit -m 
    ```