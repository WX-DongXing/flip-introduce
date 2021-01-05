<h1 align="center">FLIP Introduce</h1>

<div align="center">

FLIP 动画介绍

![preview](./docs/preview.gif)
</div>

### FLIP

- First: 记录元素动画之前的位置及尺寸
- Last: 执行无动画的变换处理，将元素发生相应的变化，并记录其位置及尺寸
- Invert: 对已记录的Last和First位置的数据处理，对Last状态的元素使用`transform`变换至First状态
- Play: 对已经发生`transform`的动画解除。

### 优势

- 由于浏览器的回流及重绘机制，CSS动画优势
  回流：浏览器重新渲染，重绘：重新计算元素位置，并执行重新渲染，将需要进行重绘的动画属性如`height`、`width`、`top`、`left`，替换为仅需要进行回流的属性动画如`scale`, `translate`，以实现相同的目的。
- 在无法明确的初始态(First)或结束态（Last）的动画场景中，可以套用公式一样简单实现动画

### 实现原理

- 生理感知
  从交互结束到感知到响应大概需要 100ms 的生理反应时间,如果能在这 100ms 内做出响应，那么对用户来说就相当于立即进行了响应，然后只需要保证动画在 60FPS 运行就能给用户带来最佳的体验.

### 适用场景

- FLIP技术适用于动画的初始态或最终态不明确的情况，如视图之间的过渡，列表操作相关动画。

###  注意

- 不要超出用户反应时间 100ms
- 当进行某些缩放动画时可能导致内容扭曲。

### 相关

- [FLIP Your Animations](https://aerotwist.com/blog/flip-your-animations/)
- [flip-keynote](https://flip-keynote.surge.sh)
