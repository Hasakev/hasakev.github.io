<script setup lang="ts">
import Nav from '../components/Nav.vue'
import Hero from '../components/Hero.vue'
import Stats from '../components/Stats.vue'
import Projects from '../components/Projects.vue'
import About from '../components/About.vue'
import Experience from '../components/Experience.vue'
import Contact from '../components/Contact.vue'
import FooterBar from '../components/FooterBar.vue'
</script>

<template>
  <Nav />
  <main>
    <Hero />
    <Stats />
    <Projects />
    <About />
    <Experience />
    <Contact />
  </main>
  <FooterBar />
</template>
