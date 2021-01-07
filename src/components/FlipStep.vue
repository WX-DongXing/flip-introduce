<template>
  <div class="controls">
    <button @click="handlePre">上一步</button>
    <button @click="handleNext">下一步</button>
  </div>
  <div class="wrap">
    <div class="steps" ref="step">
      <div class="steps__panel">
        <h1>First</h1>
        <div class="steps__left">
          <div class="steps__item">A (x: 0, y: 0)</div>
          <div class="steps__item">B</div>
          <div class="steps__item">C</div>
        </div>
        <div class="steps__right">
          <h3>初始状态</h3>
          <p>使用 <code>getBoundingClientRect</code>记录每个元素初始位置信息</p>

          <h3>元素 A</h3>
          <p>位置信息: x: 0, y: 0</p>
        </div>
      </div>
      <div class="steps__panel">
        <h1>Last</h1>
        <div class="steps__left">
          <div class="steps__item">C</div>
          <div class="steps__item">A (x: 0, y: 200)</div>
          <div class="steps__item">B</div>
        </div>
        <div class="steps__right">
          <h3>结束状态</h3>
          <p>更新元素数组对象，Vue响应数据变化，更新DOM位置</p>
          <span>再次使用 <code>getBoundingClientRect</code>记录每个元素结束位置信息</span>

          <h3>元素 A</h3>
          <p>位置信息: x: 0, y: 200</p>

        </div>
      </div>
      <div class="steps__panel">
        <h1>Invert</h1>
        <div class="steps__left">
          <div class="steps__item steps__item--active" ref="invert">A</div>
          <div class="steps__item steps__item--inactive">C</div>
          <div class="steps__item steps__item--inactive">A</div>
          <div class="steps__item steps__item--inactive">B</div>
        </div>
        <div class="steps__right">
          <h3>反转</h3>
          <p>通过初始状态与结束状态记录下对位置信息，计算出由结束位置平移至初始位置数据</p>

          <h3>元素 A：结束 -> 开始</h3>
          <p>从交互结束到感知到响应大概需要 100ms 的生理反应时间</p>
          <p>如果在这100ms内做一些行为无法感知到的</p>
          <p>使用 CSS3 动画瞬时讲DOM元素由结束位置平移至初始位置</p>
          <p>最终的表相则是看起来元素并没有发生位置变化</p>
          <p>transition: all 0</p>
          <p>transform: translate(0, (0 - 200)px)</p>

        </div>
      </div>
      <div class="steps__panel">
        <h1>Play</h1>
        <div class="steps__left">
          <div class="steps__item steps__item--active" ref="play">A</div>
          <div class="steps__item steps__item--inactive">A</div>
          <div class="steps__item steps__item--inactive">B</div>
          <div class="steps__item steps__item--inactive">C</div>
        </div>
        <div class="steps__right">
          <h3>执行</h3>
          <p>对已经执行了平移动画对元素解除平移量，并设置动画时长，曲线等，执行动画。</p>

          <h3>元素 A 开始 -> 结束</h3>
          <p>transition: all 750ms ease-in</p>
          <p>transform: translate(0, 0)</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';

export default {
  name: 'FlipStep',
  setup() {
    const step = ref()

    const invert = ref()

    const play = ref()

    const count = ref(0)

    const handlePre = () => {
      if (count.value === 0) return
      count.value -= 1
    }

    const handleNext = () => {
      if (count.value === 3) return
      count.value += 1
    }

    watch(count, (val) => {
      step.value.animate([
        { transform: `translateX(${val * -85}%)` }
      ], {
        duration: 750,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        iterations: 1,
        fill: 'forwards'
      })
    })

    onMounted(() => {
      invert.value.animate([
        { transform: `translateY(0)` },
        { transform: `translateY(-175px)` },
      ], {
        duration: 1750,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        iterations: Infinity,
      })

      play.value.animate([
        { transform: `translateY(-175px)` },
        { transform: `translateY(0)` },
      ], {
        duration: 1750,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        iterations: Infinity,
      })
    })

    return {
      count,
      step,
      invert,
      play,
      handlePre,
      handleNext
    }
  }
}
</script>

<style scoped lang="scss">
.controls {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  height: 64px;
  width: 100vw;
  box-sizing: border-box;
  padding: 0 10%;

  button {
    width: 96px;
  }
}

.wrap {
  height: calc(100% - 64px);
  width: 100vw;
  overflow: hidden;
}

.steps {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  height: calc(100% - 64px);
  width: 100vw;
  overflow: visible;
  box-sizing: border-box;
  padding: 0 10%;

  &__panel {
    display: flex;
    flex-flow: row nowrap;
    position: relative;
    flex: none;
    width: 80vw;
    height: 80%;
    background: whitesmoke;
    box-sizing: border-box;
    padding: 24px;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0,0,0,.12);

    & + & {
      margin-left: 100px;
    }

    &:last-child {
      margin-right: 100px;
    }

    h1 {
      position: absolute;
      width: 120px;
      text-align: center;
      font-size: 32px;
      font-weight: bold;
      top: -100px;
      left: calc(50% - 60px);
    }
  }


  &__left {
    position: relative;
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    border-right: 1px solid rgba(0, 0, 0, .06);
    box-sizing: border-box;
    padding: 0 48px;
  }

  &__right {
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    box-sizing: border-box;
    padding: 5% 48px;
  }

  &__item {
    flex: none;
    width: 100%;
    height: 96px;
    margin-bottom: 24px;
    background: #42b983;
    border-radius: 4px;
    font-size: 48px;
    color: whitesmoke;
    line-height: 96px;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);

    & + & {
      margin-top: 56px;
    }

    &--inactive {
      background: gray;
    }

    &--active {
      position: absolute;
      width: calc(100% - 96px);
      margin: 0;
      top: calc(50% - 32px);
    }
  }
}
</style>
