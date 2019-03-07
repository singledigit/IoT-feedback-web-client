import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGrin, faFrown, faMeh,  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faGrin, faFrown, faMeh)

Vue.component('font-awesome-icon', FontAwesomeIcon)

// Load Main SCSS
require('./assets/main.scss')

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
