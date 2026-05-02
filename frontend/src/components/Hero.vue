<template>
  <div id="hero">
    <div class="hero-image-strip">
      <img src="/uploads/background.png" alt="City night">
    </div>
    <div class="hero-inner">
      <div class="hero-eyebrow">Status: Probably Vibe-coding · Brisbane</div>
      <h1 class="hero-name">
        <span class="line1">Kevin</span>
        <span class="line2" data-text="Luo.">Luo</span>
      </h1>
      <p class="hero-subtitle">
        Graduate electricity market modeller turning <em>PLEXOS runs, Python pipelines, and NEM data</em>
        into auditable studies — capacity expansion, dispatch traces, and messy market files
        made easier to trust.
      </p>
      <div class="hero-cta">
        <a href="#projects" class="btn-primary">View Work</a>
        <a href="https://github.com/Hasakev" target="_blank" class="btn-ghost">GitHub →</a>
      </div>
    </div>
    <div class="scroll-hint">
      <div class="scroll-hint-line"></div>
      <span>Scroll</span>
    </div>
  </div>
</template>

<style scoped>
#hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 100px;
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
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.25em;
  color: var(--amber);
  text-transform: uppercase;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.hero-eyebrow::before {
  content: '';
  display: block;
  width: 40px;
  height: 1px;
  background: var(--amber);
  box-shadow: none;
}

.hero-name {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: clamp(64px, 10vw, 124px);
  font-weight: 700;
  line-height: 0.88;
  letter-spacing: -0.055em;
  margin-bottom: 8px;
  position: relative;
}

.hero-name .line1 {
  display: block;
  color: var(--text);
}

.hero-name .line2 {
  display: block;
  color: transparent;
  -webkit-text-stroke: 1.25px oklch(74% 0.14 78 / 0.62);
  position: relative;
}

.hero-name .line2::after {
  content: attr(data-text);
  position: absolute;
  left: 0; top: 0;
  color: var(--amber);
  -webkit-text-stroke: 0;
  clip-path: polygon(0 0, 100% 0, 100% 40%, 0 40%);
  opacity: 0.12;
}


.hero-subtitle {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: clamp(16px, 2vw, 22px);
  font-weight: 300;
  color: var(--text-dim);
  margin-top: 32px;
  margin-bottom: 48px;
  max-width: 520px;
  line-height: 1.6;
}

.hero-subtitle em {
  font-style: normal;
  color: var(--amber);
}

.hero-cta {
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
}

.hero-image-strip {
  position: absolute;
  right: 0; top: 0; bottom: 0;
  width: 38%;
  overflow: hidden;
  mask-image: linear-gradient(to left, black 44%, transparent 100%);
  -webkit-mask-image: linear-gradient(to left, black 44%, transparent 100%);
}

.hero-image-strip img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0.36;
  filter: grayscale(0.2) saturate(0.9) brightness(0.72) contrast(1.08);
}

.scroll-hint {
  position: absolute;
  bottom: 48px;
  left: 40px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  color: var(--text-dim);
  text-transform: uppercase;
}

.scroll-hint-line {
  width: 1px;
  height: 48px;
  background: linear-gradient(to bottom, var(--amber), transparent);
  animation: scrollPulse 2.6s ease-in-out infinite;
}

@media (max-width: 600px) {
  .hero-image-strip { display: none; }
  .hero-inner { padding: 0 24px; }
}
</style>
