<template>
  <header>
    <span>FLIP</span>
    <button @click="handleChangePage('FLIP_LIST')">演示</button>
    <button @click="handleChangePage('FLIP_PANEL')">事例</button>
    <button @click="handleChangePage('FLIP_STEP')">步骤</button>
  </header>
  <main>
    <flip-list v-if="page === 'FLIP_LIST'" />
    <flip-panel v-if="page === 'FLIP_PANEL'" />
    <flip-step v-if="page === 'FLIP_STEP'" />
  </main>
</template>

<script>
import { ref } from 'vue'
import FlipList from './components/FlipList.vue'
import FlipPanel from './components/FlipPanel.vue'
import FlipStep from './components/FlipStep.vue'

export default {
  name: 'App',
  components: {
    FlipList,
    FlipPanel,
    FlipStep
  },
  setup() {
    const page = ref('FLIP_STEP');

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

  button + button {
    margin-left: 24px;
  }
}

main {
  width: 100vw;
  height: calc(100vh - 56px);
  background: #d2dbe0;
}
</style>
