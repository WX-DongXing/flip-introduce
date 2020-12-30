<template>
  <header>
    <span>FLIP</span>
    <router-link to="/">
      <button>演示</button>
    </router-link>
    <router-link to="/panel">
      <button>示例</button>
    </router-link>
    <router-link to="/step">
      <button>步骤</button>
    </router-link>
  </header>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
import { ref } from 'vue'


export default {
  name: 'App',
  setup() {
    const page = ref('FLIP_LIST');

    const handleChangePage = (type) => {
      page.value = type
    }

    return {
      page,
      handleChangePage
    }
  }
}
</script>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: whitesmoke;
}

button {
  min-width: 56px;
  height: 32px;
  background: #faaa33;
  outline: none;
  color: #2b3d45;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background: rgba(250, 170, 51, 0.8);
  }

  &:active {
    background: #E6961F;
  }
}

header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 56px;
  background: #304049;
  box-sizing: border-box;
  padding: 0 24px;

  span {
    color: white;
    font-weight: bold;
    font-size: 18px;
    margin-right: 24px;
  }

  button {
    font-size: 16px;
  }

  a + a {
    margin-left: 24px;
  }
}

main {
  width: 100vw;
  height: calc(100vh - 56px);
  background: #d2dbe0;
}
</style>
