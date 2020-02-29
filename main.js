new Vue ({
  name: 'game',
  el: '#app',

  data: state,

  template: `<div id="#app">
    Hello world!
  </div>`,

  mounted () {
    console.log(this.$data === state)
  },
})

// Window resize handling
window.addEventListener('resize', () => {
  state.worldRatio = getWorldRatio()
})