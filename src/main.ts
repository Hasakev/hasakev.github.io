import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// GitHub Pages SPA: restore path stored by 404.html
const redirect = sessionStorage.getItem('spa_redirect')
if (redirect) {
  sessionStorage.removeItem('spa_redirect')
  history.replaceState(null, '', redirect)
}

createApp(App).use(router).mount('#app')
