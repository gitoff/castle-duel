new Vue ({
  name: 'game',
  el: '#app',

  data: state,

  // testing with @click="handlePlay"
  // works on top-bar but doesn't work on hand
  template: `
  <div id="#app">
    <top-bar :turn="turn" :current-player-index="currentPlayerIndex" :players="players" />
    
    <div class="world">
      <div class="clouds">
        <cloud v-for="index in 10" :type="(index - 1) % 5 + 1" />
      </div>
        <castle v-for="(player, index) in players" :player="player" :index="index" />
      <div class="land" />
    </div>

    <transition name="hand">
      <hand :cards="currentHand" v-if="!activeOverlay" @card-play="testPlayCard" />
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

  mounted () {
    beginGame()
  },
})

// Window resize handling
window.addEventListener('resize', () => {
  state.worldRatio = getWorldRatio()
})

// Tween.js
requestAnimationFrame(animate);

function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}

function beginGame () {
  state.players.forEach(drawInitialHand)
}