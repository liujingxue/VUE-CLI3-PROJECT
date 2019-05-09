let express = require('express');
let app = express();
let bodyParser = require('body-parser');
//引入 json web token
let jwt = require('jsonwebtoken');

//因为前端是8080端口，这个接口是3000端口，所以
//要解决一下跨域，使用express 跨域头
app.use((req, res, next) => {
    //res.header("Access-Control-Allow-Origin", "*");
    //只允许http://localhost:8080域名跨域
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    //如果请求方法是options，则不用理他
    if (req.method.toLowerCase() === 'options') {
        return res.end();
    }
    next();
})


//使用中间件
app.use(bodyParser.json());

//设置密钥
let secret = 'zfjg123';

app.get('/user', (req, res) => {
    res.json({name: 'zf'});
})

//登录的API 
//使用token，如果下次登录，携带了token，则说明已经登录过
//这种方式，就叫做 json web token(jwt)
app.post('/login', (req, res) => {
    //把前端传过来的用户名取出来
    //请求体里面的数据，在body里面取
    let {username} = req.body;
    if (username === 'admin') {
        res.json({
            code: 0,
            username: 'admin',
            //jwt里面有三个方法，decode, sign, verify
            //zfjg123是自定义的密钥
            token:jwt.sign({username: 'admin'}, secret, {
                //过期时间, 20秒
                //超过20秒，表示失效。 20秒以内，都是登录的。
                expiresIn: 20
            })
        })
    } else {
        res.json({
            //一般code为0，是没错误; 一般code为1，是有错误。
            code: 1,
            data: '用户名不存在'
        })
    }
})


//验证API
app.get('/validate', (req, res) => {
    let token = req.headers.authorization;
    jwt.verify(token, secret, (err, decode) => {
        //decode 等于 {username: 'admin'}
        if (err) {
            return res.json({
                code:1,
                data: 'token失效'
            })
        } else {
            res.json({
                //需要把token的时效，延长。 不操作的话，才20秒失效
                //你不停的操作,20秒之内不会过期。
                username: decode.username,
                code : 0,
                token:jwt.sign({username: 'admin'}, secret, {
                    expiresIn: 20
                })
            })
        }
    })
})
app.listen(3000);




//一般的话， session会存到redis里面去