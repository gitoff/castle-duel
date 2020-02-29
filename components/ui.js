Vue.component('top-bar', {
  template: `<div class="top-bar" :class="'player-' + currentPlayerIndex">
    <div class="player p0">{{ players[0].name }}</div>
    <div class="turn-counter">
      <img class="arrow" src="svg/turn.svg" />
      <div class="turn">Turn {{ turn }}</div>
    </div>
    <div class="player p1">{{ players[1].name }}</div>
  </div>`,

  // top-bar needs to know:
  props: ['players', 'currentPlayerIndex', 'turn'],

  created () {
    console.log(this.players)
  },
})

Vue.component('card', {
  props: ['def'],

  template: `
  <div class="card" :class="'type-' + def.type" @click="play">
    <div class="title">{{ def.title }}</div>
    <img class="separator" src="svg/card-separator.svg" />
    <div class="description">
      <div v-html="def.description"></div>
    </div>
    <div class="note" v-if="def.note">
      <div v-html="def.note"></div>
    </div>
  </div>
  `,

  methods: {
    play () {
      console.log('Card clicked! before emit')
      this.$emit('play')
    },
  },
})

Vue.component('hand', {
  props: ['cards'],

  template: `<div class="hand">
    <!-- wrapper helps to position and animate cards -->
    <div class="wrapper">
      <!-- Cards -->
      <transition-group name="card" tag="div" class="cards">
        <card v-for="card of cards" :def="card.def" :key="card.uid" @play="handlePlay(card)" />
      </transition-group>
    </div>
  </div>`,

  methods: {
    handlePlay (card) {
      this.$emit('card-play', card)
    }
  },
})

Vue.component('overlay', {
  template: `
  <div class="overlay" @click="handleClick">
    <div class="content">
      <!-- Slot will be here -->
      <slot />
    </div>
  </div>
  `,

  methods: {
    handleClick () {
      this.$emit('close')
    },
  },
})