let express = require('express');
let app = express();
let bodyParser = require('body-parser');

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

app.get('/user', (req, res) => {
    res.json({name: 'zf'});
})

app.listen(3000);