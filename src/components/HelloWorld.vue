<template>
  <div class="hello">
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  asyncData(store,route) {
    return store.dispatch("fetchItem", route.params.id);
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    message() {
      return this.$store.state.items[this.$route.params.id];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
