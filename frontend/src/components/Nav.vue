<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/" class="nav-logo">KL</RouterLink>
    <ul class="nav-links">
      <li><a href="/#projects">Work</a></li>
      <li><a href="/#about">About</a></li>
      <li><a href="/#experience">Experience</a></li>
      <li><a href="/#contact">Contact</a></li>
      <li><RouterLink to="/blog">Blog</RouterLink></li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;
  background: linear-gradient(to bottom, rgba(11,15,18,0.92) 0%, rgba(11,15,18,0.52) 68%, transparent 100%);
  backdrop-filter: blur(6px);
}

.nav-logo {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  letter-spacing: 0.15em;
  color: var(--amber);
  text-transform: uppercase;
  text-shadow: none;
  text-decoration: none;
  border: 1px solid var(--border);
  padding: 6px 8px;
  background: rgba(214, 198, 155, 0.04);
}

.nav-links {
  display: flex;
  gap: 36px;
  list-style: none;
}

.nav-links a {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--text-dim);
  text-decoration: none;
  text-transform: uppercase;
  transition: color 0.2s, border-color 0.2s;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: var(--amber);
  text-shadow: none;
}

@media (max-width: 900px) {
  nav { padding: 16px 24px; }
  .nav-links { gap: 20px; }
}

@media (max-width: 600px) {
  nav { padding: 14px 20px; }
  .nav-links { display: none; }
}
</style>
