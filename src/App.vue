<template>
<!--  <button @click="handleChange">切换</button>-->
  <flip-list v-if="visible" />
</template>

<script>
import { ref } from 'vue'
import FlipList from './components/FlipList.vue'

export default {
  name: 'App',
  components: {
    FlipList
  },
  setup() {
    const visible = ref(true);

    const handleChange = () => {
      visible.value = !visible.value
    }

    return {
      visible,
      handleChange
    }
  }
}
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
}

#app {
  width: 100vw;
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  button {
    width: 120px;
    height: 32px;
    background: #42b983;
    outline: none;
    color: whitesmoke;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 60px;
  }
}
</style>
