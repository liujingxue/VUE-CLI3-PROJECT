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

loading效果是全局的，所以写在vuex里面

在store.js中写

项目安装时，已经默认安装了vue-router 和 vuex

在App.vue里面，写loading效果

频繁的话，使用v-show， 不频繁的话，使用v-if 

在普通 .vue页面里，使用 vuex里的公共属性

```
$store.state.isShowLoading
```

当第一次请求，显示loading，剩下的时候，就不调用了，
当都请求完毕后，隐藏loading


三、axios的公共库的封装

地址： https://blog.csdn.net/qq_25354709/article/details/89944249