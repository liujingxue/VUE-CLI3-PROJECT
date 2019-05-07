# axios有两种使用方式

在 https://github.com/axios/axios 上查看文档

第一种：

```
import axios from ''
axios({
    url,
})
```


第二种：创建实例的方式

```
const instance = axios.create();

instance.defaults.timeout = 2500;

instance.get();
```

一般在actions里调用接口，然后传给matution

基本上所有的axios，都会封装一下，不会直接在页面里import

可以写个拦截器，对响应的结果进行处理