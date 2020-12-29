<template>
  <button @click="handleChange">切换</button>
  <div class="panel">
    <div
        class="panel__item"
        v-for="({ name, key, width, color }, i) in list"
        :ref="el => refs[i] = el"
        :key="key"
        :data-key="key"
        :style="{ width: `${width}px`, background: `${color}`}"
    >
      <p>{{ name }}</p>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, nextTick } from 'vue'

export default {
  name: 'FLipPanel',
  props: {
    msg: String
  },
  setup() {
    const state = reactive({
      list: []
    })

    state.list = new Array(20).fill(null).map((_, index) => (
            {
              name: index + 1,
              key: index,
              width: 60 + index * 10,
              color: `hsla(0, 0%, 0%, ${(index + 1) * 0.045 + 0.1})`
            }
        )
    )

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

.panel{
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
  align-content: flex-start;
  height: calc(100vh - 152px);
  width: 100%;
  box-sizing: border-box;
  padding: 36px 30%;
  overflow: auto;

  &__item {
    flex: none;
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
      margin-left: 24px;
    }
  }
}
</style>
