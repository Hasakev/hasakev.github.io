<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const phrases = [
  'debug the NEM.',
  'untangle AEMO\'s data.',
  'automate PLEXOS workflows.',
  'ship software that lasts.',
  'learn adulting, one bug at a time.',
  'get AI to understand my prompts.',
]

const displayText = ref('')
const currentPhraseIndex = ref(0)
let timeoutId: number | undefined
let isDeleting = false
let charIndex = 0

function tick() {
  const phrase = phrases[currentPhraseIndex.value]

  if (isDeleting) {
    charIndex = Math.max(0, charIndex - 1)
    displayText.value = phrase.slice(0, charIndex)
  } else {
    charIndex = Math.min(phrase.length, charIndex + 1)
    displayText.value = phrase.slice(0, charIndex)
  }

  if (!isDeleting && charIndex === phrase.length) {
    timeoutId = window.setTimeout(() => {
      isDeleting = true
      tick()
    }, 1100)
    return
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false
    currentPhraseIndex.value = (currentPhraseIndex.value + 1) % phrases.length
    timeoutId = window.setTimeout(tick, 250)
    return
  }

  timeoutId = window.setTimeout(tick, isDeleting ? 35 : 55)
}

onMounted(() => {
  timeoutId = window.setTimeout(tick, 500)
})

onUnmounted(() => {
  if (timeoutId) window.clearTimeout(timeoutId)
})
</script>

<template>
  <div id="hero">
    <div class="hero-inner">
      <div class="hero-eyebrow">$ whoami</div>
      <h1 class="hero-name">
        <span class="line1">Kevin</span>
        <span class="line2">Luo<span class="dot">.</span></span>
      </h1>
      <p class="hero-subtitle">
        Graduate Electricity Market Modeller trying to
        <span class="hero-typing-line">
          <span class="prompt">&gt;</span>
          <span class="hero-phrase" aria-live="polite">{{ displayText }}</span>
          <span class="hero-cursor" aria-hidden="true">▍</span>
        </span>
      </p>
      <div class="hero-status"># status: probably vibe-coding · Brisbane</div>
      <div class="hero-cta">
        <a href="#projects" class="btn-primary">view work</a>
        <a href="https://github.com/Hasakev" target="_blank" class="btn-ghost">github</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
#hero {
  min-height: 84vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 80px;
  position: relative;
  max-width: 100%;
}

.hero-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 40px;
  width: 100%;
}

.hero-eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.12em;
  color: var(--accent);
  margin-bottom: 24px;
}

.hero-name {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(56px, 9vw, 108px);
  font-weight: 600;
  line-height: 0.92;
  letter-spacing: -0.045em;
  margin-bottom: 8px;
}

.hero-name .line1 {
  display: block;
  color: var(--text);
}

.hero-name .line2 {
  display: block;
  color: var(--text);
}

.hero-name .dot {
  color: var(--accent);
}

.hero-subtitle {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(16px, 2vw, 22px);
  font-weight: 300;
  color: var(--text-dim);
  margin-top: 24px;
  margin-bottom: 28px;
  max-width: 680px;
  line-height: 1.6;
}

.hero-typing-line {
  display: block;
  margin-top: 4px;
}

.hero-typing-line .prompt {
  color: var(--text-dim);
  margin-right: 8px;
}

.hero-phrase {
  display: inline;
  color: var(--accent);
  font-weight: 500;
}

.hero-cursor {
  display: inline;
  color: var(--accent);
  animation: blink 1s steps(1) infinite;
  margin-left: 1px;
}

.hero-status {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--text-dim);
  margin-bottom: 32px;
}

.hero-cta {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

@media (max-width: 600px) {
  .hero-inner { padding: 0 24px; }
}
</style>
