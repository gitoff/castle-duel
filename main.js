new Vue ({
  name: 'game',
  el: '#app',

  data: state,

  template: `<div id="#app">
    <top-bar :turn="turn" :current-player-index="currentPlayerIndex" :players="players" />
    <card :def="testCard" />
  </div>`,

  computed: {
    testCard () {
      return cards.archers
    },
  },

  mounted () {
    console.log(this.$data === state)
  },
})

// Window resize handling
window.addEventListener('resize', () => {
  state.worldRatio = getWorldRatio()
})