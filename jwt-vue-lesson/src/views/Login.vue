<template>
  <div class="login">
    <h1>This is an Login page</h1>
    <Input type="text" placeholder="请输入用户名" style="width: 300px;" v-model="username" />
    <Button type="primary" @click="login()" >登录</Button>
  </div>
</template>

<script>
  //mapActions是vuex里面的辅助函数
  import {mapActions} from 'vuex';
  export default {
    data() {
      return {
        //v-model里面的变量，在data里面要声明一下
        username: ''
      }
    },
    methods: {
      ...mapActions(['toLogin']),
      login(){
        //拿到toLigin方法
        this['toLogin'](this.username).then(data => {
          //成功后，跳转到首页
          this.$router.push('/');
        }, err => {
          //失败了，调用iview里面的组件$Message
          this.$Message.error(err);
        });
      }
    }
  }
</script>