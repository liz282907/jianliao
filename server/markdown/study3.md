### 跨域

#### 场景
>index.html请求服务器上的资源(因为之前打包的时候写进HTML的是public_path，对本项目
来说是public/dist)。可以看到
![](http://i1.piimg.com/567571/eccfb103d64cbe72.png)
同时又请求了localhost:3000/signin，自然会导致跨域.

#### 实践

虽然我们把请求的localhost改掉就可以，但是楼主还是想试一下跨域的处理~

我们先用[阮大大的一篇CORS的科普文](http://www.ruanyifeng.com/blog/2016/04/cors.html)来做一下热身.

画重点就是：

跨域请求分简单请求和非简单请求。只要同时满足下面两个方面，就是简单请求。
>（1) 请求方法是以下三种方法之一：
HEAD
GET
POST

>（2）HTTP的头信息不超出以下几种字段：
>
> Accept
Accept-Language、
Content-Language、
Last-Event-ID
Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain

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

    Access-Control-Allow-Origin: http://api.bob.com
    Access-Control-Allow-Credentials: true //Cookies是否可以随着请求发送，还是忽略header，以及响应是否可以被得到
    Access-Control-Expose-Headers: FooBar
    Content-Type: text/html; charset=utf-8
  
    //res，下面是在预检请求时要设置的
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
    
### references

1.[MDN http访问控制，推荐](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)