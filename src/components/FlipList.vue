<template>
  <button @click="handleChange">切换</button>
  <div class="list">
    <div
        class="list__item"
        v-for="({ name, key }, i) in list"
        :ref="el => refs[i] = el"
        :key="key"
    >
      <p>{{ name }}: {{ refs[i] ? refs[i].getBoundingClientRect().y : 0 }}</p>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, watch } from 'vue'

export default {
  name: 'FLipList',
  props: {
    msg: String
  },
  setup() {
    const state = reactive({
      list: [
        { name: 'A', key: 1 },
        { name: 'B', key: 2 },
        { name: 'C', key: 3 }
      ]
    })

    const refs = reactive([])

    let preAnimateList = reactive([])

    let animatedList = reactive([])

    watch(preAnimateList, (value) => {
      if (value && value.length === 2) {
        console.log('pre change: ', value)
        value.forEach(item => {
          console.log(item.getBoundingClientRect().y)
        })
      }
    })

    watch(animatedList, (value) => {
      console.log('change')
      if (value && value.length === 2) {
        console.log('changed: ', value)
        preAnimateList.forEach(item => {
          console.log(item.getBoundingClientRect().y)
        })
      }
    })

    const handleChange = () => {
      const first = Math.round(Math.random() * 2)
      const others = [0, 1, 2].filter(item => item !== first)
      const second = others[Math.round(Math.random())]

      preAnimateList.push(...[refs[first], refs[second]])

      const firstItem = { ...state.list[second] }
      const secondItem = { ...state.list[first] }

      state.list.splice(first, 1, firstItem)
      state.list.splice(second, 1, secondItem)

      animatedList = []
      animatedList.push(...[firstItem, secondItem])

      preAnimateList = []
    }

    return {
      refs,
      ...toRefs(state),
      handleChange
    }
  }
}
</script>

<style scoped lang="scss">
.list {
  height: calc(100vh - 122px);
  width: 100%;
  box-sizing: border-box;
  padding: 36px 30%;
  overflow: auto;

  &__item {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-content: center;
    height: 160px;
    margin-bottom: 24px;
    background: #42b983;
    border-radius: 4px;
    font-size: 48px;
    color: whitesmoke;
  }
}
</style>
