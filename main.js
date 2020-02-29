new Vue ({
  name: 'game',
  el: '#app',

  data: state,

  // testing with @click="handlePlay"
  // works on top-bar but doesn't work on hand
  template: `
  <div id="#app">
    <top-bar :turn="turn" :current-player-index="currentPlayerIndex" :players="players" />
    <transition name="hand">
      <hand :cards="testHand" v-if="!activeOverlay" @card-play="testPlayCard" />
    </transition>
    <transition name="fade">
      <div class="overlay-background" v-if="activeOverlay" />
    </transition>
    <transition name="zoom">
      <overlay v-if="activeOverlay" :key="activeOverlay">
        <component :is="'overlay-content-' + activeOverlay"
          :player="currentPlayer" :opponent="currentOpponent"
          :players="players" />
      </overlay>
    </transition>
  </div>`,

  computed: {
    testCard () {
      return cards.archers
    },
  },

  methods: {
    handlePlay () {
      console.log('You played a card!')
    },

    createTestHand () {
      const cards = []
      // Get the possible ids
      const ids = Object.keys(cards)

      // Draw 5 cards
      for (let i = 0; i < 5; i++) {
        cards.push(this.testDrawCard())
      }

      return cards
    },

    testDrawCard () {
      // Choose a card at random with the ids
      const ids = Object.keys(cards)
      const randomId = ids[Math.floor(Math.random() * ids.length)]
      // Return a new card with this definition
      return {
        // Unique id for the card
        uid: cardUid++,
        // Id of the definition
        id: randomId,
        // Definition object
        def: cards[randomId],
      }
    },

    testPlayCard (card) {
      // Remove the card from hand
      console.log('calling testPlayCard')
      const index = this.testHand.indexOf(card)
      this.testHand.splice(index, 1)
    },
  },

  created () {
    this.testHand = this.createTestHand()
  },

  mounted () {
    console.log(this.$data === state)
  },
})

// Window resize handling
window.addEventListener('resize', () => {
  state.worldRatio = getWorldRatio()
})