<template>
  <div id="app">
    <img alt="Vue logo"
         src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div class="test">Heel</div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue"

export default {
  name: "App",
  components: {
    HelloWorld
  },
  data: {

  },
  methods: {
    testFUn() {
      console.log(test)
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.test {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
