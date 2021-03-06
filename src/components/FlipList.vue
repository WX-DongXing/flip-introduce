<template>
  <button @click="handleChange">切换</button>
  <div class="list">
    <div
        class="list__item"
        v-for="({ name }, i) in list"
        :ref="el => refs[i] = el"
        :key="name"
        :data-key="name"
    >
      <p>{{ name }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, nextTick } from 'vue'

export default {
  name: 'FLipList',
  props: {
    msg: String
  },
  setup() {
    const state = reactive({
      list: [
        { name: 'A' },
        { name: 'B' },
        { name: 'C' },
      ]
    })

    const refs = reactive([])

    let firstState = reactive([]);

    let lastState = reactive([]);

    const handleChange = () => {

      // First
      firstState = refs.reduce((acc, cur) => {
        const rect = cur.getBoundingClientRect()
        const key = cur.dataset.key
        acc.push({ key, rect })
        return acc
      }, [])

      const randomList = [...state.list]
          .map((item) => ({ item, random: Math.random() }))
          .sort((a, b) => a.random - b.random)
          .map(({ item }) => ({ ...item }))

      Object.assign(state, { list: randomList })

      // Last
      nextTick(() => {
        lastState = refs.reduce((acc, cur) => {
          const rect = cur.getBoundingClientRect()
          const key = cur.dataset.key
          acc.push({ key, rect })
          return acc
        }, [])

        // Invert
        for (const ref of refs) {
          const key = ref.dataset.key
          const { rect: { x: firstX, y: firstY } } = firstState.find((state) => state.key === key)
          const { rect: { x: lastX, y: lastY } } = lastState.find((state) => state.key === key)
          const diffX = lastX - firstX
          const diffY = lastY - firstY
          ref.animate([
              { transform: `translate(0, 0)` },
              { transform: `translate(${-diffX}px, ${-diffY}px)` }
          ], {
            duration: 0,
            iterations: 1,
            fill: 'forwards'
          })
        }

        // Play
        for (const ref of refs) {
          ref.animate([
            { transform: `translate(0)` },
          ], {
            duration: 1225,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            iterations: 1,
            fill: 'forwards'
          })
        }
      })
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
button {
  margin: 32px;
  width: 90px;
}

.list {
  display: flex;
  flex-flow: column nowrap;
  align-content: flex-start;
  height: calc(100vh - 152px);
  width: 100%;
  box-sizing: border-box;
  padding: 36px 30%;
  overflow: auto;

  &__item {
    flex: none;
    width: 100%;
    height: 120px;
    margin-bottom: 24px;
    background: #42b983;
    border-radius: 4px;
    font-size: 48px;
    color: whitesmoke;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);

    p {
      margin: 0;
      line-height: 120px;
    }

    & + & {
      margin-top: 24px;
    }
  }
}
</style>
