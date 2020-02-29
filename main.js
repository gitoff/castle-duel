new Vue ({
  name: 'game',
  el: '#app',

  data: state,

  // testing with @click="handlePlay"
  // works on top-bar but doesn't work on hand
  template: `
  <div id="#app" :class="cssClass">
    <top-bar :turn="turn" :current-player-index="currentPlayerIndex" :players="players" />
    
    <div class="world">
      <div class="clouds">
        <cloud v-for="index in 10" :type="(index - 1) % 5 + 1" />
      </div>
        <castle v-for="(player, index) in players" :player="player" :index="index" />
      <div class="land" />
    </div>

    <transition name="hand">
      <hand :cards="currentHand" v-if="!activeOverlay" 
        @card-play="handlePlayCard"
        @card-leave-end="handleCardLeaveEnd"
      />
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
    cssClass () {
      return {
        'can-play': this.canPlay,
      }
    },
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

    handlePlayCard (card) {
      playCard(card)
    },

    handleCardLeaveEnd () {
      applyCard()
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

function playCard (card) {
  if (state.canPlay) {
    state.canPlay = false
    currentPlayingCard = card
    // Remove the card from player hand
    const index = state.currentPlayer.hand.indexOf(card)
    state.currentPlayer.hand.splice(index, 1)
    // Add the card to the discard pile
    addCardToPile(state.discardPile, card.id)
  }
}

function applyCard () {
  const card = currentPlayingCard
  applyCardEffect(card)

  // Wait a bit for the player to see what's going on
  setTimeout(() => {
    // Check if the players are dead
    state.players.forEach(checkPlayerLost)
    if (isOnePlayerDead()) {
      endGame()
    } else {
      nextTurn()
    }
  }, 700)
}

function nextTurn () {
  state.turn ++
  state.currentPlayerIndex = state.currentOpponentId
  state.activeOverlay = 'player-turn'
}
  
function endGame () {
  // TODO
}

function newTurn () {
  state.activeOverlay = null
  if (state.currentPlayer.skipTurn) {
    skipTurn()
  } else {
    startTurn()
  }
}

function skipTurn () {
  state.currentPlayer.skippedTurn = true
  state.currentPlayer.skipTurn = false
  nextTurn()
}

function startTurn () {
  state.currentPlayer.skippedTurn = false
  // If both player already had a first turn
  if (state.turn > 2) {
    // Draw new card
    setTimeout(() => {
      state.currentPlayer.hand.push(drawCard())
      state.canPlay = true
    }, 800)
  } else {
      state.canPlay = true
  }
}