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
  padding: 16px 40px;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
}

.nav-logo {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  letter-spacing: 0.15em;
  color: var(--accent);
  text-transform: uppercase;
  text-decoration: none;
  border: 1px solid var(--border);
  padding: 6px 8px;
}

.nav-links {
  display: flex;
  gap: 36px;
  list-style: none;
}

.nav-links a {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--text-dim);
  text-decoration: none;
  text-transform: uppercase;
  transition: color 0.2s, border-color 0.2s;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: var(--accent);
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
