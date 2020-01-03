<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <ul>
      <li v-for="item of $store.state.userInfo" :key="item">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  async asyncData({ store, route }) {

    // 触发 action 后，会返回 Promise
    return store.dispatch("fetchUserInfo", {
      id:'home',// 用 home 本身来模拟 id
      url:route.fullPath
    });
  },
  components: {
    HelloWorld
  },
  beforeMount(){

    const { asyncData } = this.$options

    asyncData({
      store:this.$store,
      route:this.$route
    });
  }
};
</script>
