<template>
  <div class="home">
    当前登陆用户名： 
  </div>
</template>

<script>
// @ is an alias to /src

import {getUser} from '../api/user/user.js';

export default {
  name: 'home',
  components: {

  },
  async mounted(){
    alert(1);
    let res = await getUser();
    console.log(res);
  }
}
</script>
