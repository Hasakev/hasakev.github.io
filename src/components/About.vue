<script setup lang="ts">
const skills = [
  { name: 'Python',      icon: 'https://cdn.simpleicons.org/python' },
  { name: 'Flask',       icon: 'https://cdn.simpleicons.org/flask/ffffff' },
  { name: 'Streamlit',     icon: 'https://cdn.simpleicons.org/streamlit' },
  { name: 'PLEXOS',      icon: '/uploads/logo_plexos.jpg' },
  { name: 'SQL',         icon: 'https://cdn.simpleicons.org/postgresql' },
  { name: 'Terraform',   icon: 'https://cdn.simpleicons.org/terraform' },
  { name: 'Docker',      icon: 'https://cdn.simpleicons.org/docker' },
  { name: 'JavaScript',  icon: 'https://cdn.simpleicons.org/javascript' },
  { name: 'React',       icon: 'https://cdn.simpleicons.org/react' },
  { name: 'Vue.js',      icon: 'https://cdn.simpleicons.org/vue.js' },
  { name: 'Git',         icon: 'https://cdn.simpleicons.org/git' },
]
</script>

<template>
  <section id="about">
    <div class="section-header">
      <span class="section-num">02</span>
      <h2 class="section-title">About</h2>
      <div class="section-line"></div>
    </div>

    <div class="about-grid">
      <div class="about-image-block">
        <img src="/uploads/chongq.jpg" alt="Chongqing skyline at night">
      </div>
      <div class="about-content">
        <div class="about-label">Background notes</div>
        <p class="about-text">
          I'm <strong>Guoyang Luo</strong> — a software engineer who goes by <strong>Kevin</strong>.
          Currently a <strong>Graduate Electricity Market Modeller</strong> at <strong>EPEC Group</strong>
          in Brisbane, where I build the Python pipelines and data infrastructure that
          power Australia's National Electricity Market analysis — using
          <strong>PLEXOS</strong> to its maximum potential for capacity expansion
          and economic dispatch modelling.
        </p>
        <p class="about-text">
          I graduated with a <strong>Bachelor of Engineering (Honours) and Master of
          Engineering (Software)</strong> from the <strong>University of Queensland</strong>
          with <strong>Class IIA (Second Class Honours)</strong>.
          I'm drawn to work where software fundamentals can solve real world problems.
        </p>
        <div class="about-label" style="margin-top:8px;">Tools I actually reach for</div>
        <div class="skills-row">
          <span v-for="s in skills" :key="s.name" class="skill-chip">
            <img v-if="s.icon" :src="s.icon" :alt="s.name" class="skill-icon">
            {{ s.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#about { padding-bottom: 80px; }

.about-grid {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 56px;
  align-items: center;
}

.about-image-block {
  position: relative;
  overflow: hidden;
  min-height: 460px;
  border-left: 3px solid oklch(74% 0.14 78 / 0.42);
}

.about-image-block img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.18) saturate(0.82) brightness(0.64) contrast(1.08);
  transition: filter 0.4s ease;
}

.about-image-block:hover img { filter: grayscale(0.05) saturate(0.95) brightness(0.7) contrast(1.05); }

.about-image-block::after {
  content: 'CHONGQING';
  position: absolute;
  left: 18px;
  bottom: 18px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.16em;
  color: rgba(238,241,237,0.72);
}

.about-content {
  padding: 8px 0 8px 34px;
  border-left: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
}

.about-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.22em;
  color: var(--amber);
  text-transform: uppercase;
}

.about-text {
  font-size: 16px;
  line-height: 1.75;
  color: var(--text-dim);
  font-weight: 300;
}

.about-text strong { color: var(--text); font-weight: 500; }

.skills-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.skill-chip {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.08em;
  padding: 6px 12px;
  border: 1px solid rgba(214,198,155,0.18);
  color: var(--text-dim);
  background: rgba(238,241,237,0.025);
  text-transform: uppercase;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.skill-icon {
  width: 13px;
  height: 13px;
  object-fit: contain;
  flex-shrink: 0;
}

.skill-chip:hover {
  border-color: oklch(74% 0.14 78 / 0.45);
  color: var(--text);
  background: rgba(214,198,155,0.04);
}

@media (max-width: 900px) {
  .about-grid { grid-template-columns: 1fr; gap: 28px; }
  .about-image-block { min-height: 280px; }
  .about-content { padding: 0 0 0 22px; }
}
</style>
