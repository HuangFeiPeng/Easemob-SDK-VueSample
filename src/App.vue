<template>
  <header>
    <h1 id="title">环信SDK接口测试Demo</h1>
  </header>
  <Login />
</template>

<script>
import Login from "./components/Login.vue";
export default {
  components: {
    Login,
  },

  data() {
    return {
      title: "Hello word!",
    };
  },
};
</script>
<style>
h2 {
  color: red;
}
</style>