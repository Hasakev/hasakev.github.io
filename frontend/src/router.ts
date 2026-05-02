import { createRouter, createWebHistory } from 'vue-router'
import PortfolioPage from './pages/PortfolioPage.vue'
import BlogList from './pages/BlogList.vue'
import BlogPost from './pages/BlogPost.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: PortfolioPage },
    { path: '/blog', component: BlogList },
    { path: '/blog/:slug', component: BlogPost },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})
