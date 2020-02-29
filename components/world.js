/* 
Game World and Scenery
 */

Vue.component('castle', {
  template: `
  <div class="castle" :class="'player-' + index">
    <img class="building" :src="'svg/castle' + index + '.svg'" />
    <img class="ground" :src="'svg/ground' + index + '.svg'" />
    <castle-banners :player="player" />
  </div>`,
  props: ['player', 'index'],
})

Vue.component('castle-banners', {
  template: `
  <div class="banners">
    <!-- Food -->
    <img class="food-icon" src="svg/food-icon.svg" />
    <!-- Bubble here -->
    <!-- Banner bar here -->
    <!-- Health -->
    <img class="health-icon" src="svg/health-icon.svg" />
    <!-- Bubble here -->
    <!-- Banner bar here -->
  </div>`,
  props: ['player'],

  computed: {
    foodRatio () {
      // maxFood and maxHleath defined in state.js
      return this.player.food / maxFood
    },
    healthRatio () {
      return this.player.health / maxHealth
    },
  }
})