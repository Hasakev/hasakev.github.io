<script setup lang="ts">
interface Project {
  href: string
  title: string
  tag: string
  tagColor: 'cyan' | 'magenta' | 'amber' | 'green'
  desc: string
  lang: string
  langColor: string
  size: 'large' | 'small' | 'medium' | 'full'
}

const projects: Project[] = [
  {
    href: 'https://github.com/Hasakev/hasakev.github.io',
    title: 'This website',
    tag: 'Vue.js, Python',
    tagColor: 'cyan',
    desc: 'The website you\'re in right now! Fully vibe-coded in 15 minutes. Leveraged a mix ofClaude and Codex for iterative design-driven development. AI is insane. - Kev, 2026',
    lang: 'Vue.js · Vite · TypeScript · Python',
    langColor: '#ff9900',
    size: 'small',
  },
  {
    href: 'https://github.com/Hasakev',
    title: 'Spam Detection API',
    tag: 'Cloud / ML',
    tagColor: 'magenta',
    desc: 'Large-scale spam email detection service deployed on AWS — Flask + SQLAlchemy API containerised with Docker, provisioned via Terraform (ECR, RDS, ECS). Async job processing with Celery + SNS; load tested and monitored via CloudWatch.',
    lang: 'Python · Flask · AWS · Terraform',
    langColor: '#ff9900',
    size: 'small',
  },
  {
    href: 'https://github.com/Hasakev/SOStudent',
    title: 'SOStudent',
    tag: 'Web App',
    tagColor: 'amber',
    desc: 'Full-stack student discussion board built from scratch with PHP and CodeIgniter 4. Full authentication, threaded discussions, and moderation tooling. Integrates jQuery, Dropzone, Bootstrap, and reCAPTCHA.',
    lang: 'PHP · CodeIgniter 4 · SQL',
    langColor: '#4f5dff',
    size: 'medium',
  },
  {
    href: 'https://github.com/UQcsse3200/2023-studio-3',
    title: 'Tower Defence Game',
    tag: 'Game Dev',
    tagColor: 'green',
    desc: "Collaborative game built with 30 students using Java and LibGDX. Implemented core game components and diverse features. Managed via GitHub — branches, pull requests, issue tracking, and code reviews at scale.",
    lang: 'Java · LibGDX · SonarCloud',
    langColor: '#b07219',
    size: 'medium',
  },
]
</script>

<template>
  <section id="projects">
    <div class="section-header">
      <span class="section-num">01</span>
      <h2 class="section-title">Work Log</h2>
      <div class="section-line"></div>
    </div>

    <div class="projects-grid">
      <a
        v-for="p in projects"
        :key="p.title"
        :href="p.href"
        target="_blank"
        :class="['project-card', `card-${p.size}`, `card-${p.tagColor}`]"
      >
        <span :class="['project-tag', `tag-${p.tagColor}`]">{{ p.tag }}</span>
        <div class="project-title">{{ p.title }}</div>
        <div class="project-desc">{{ p.desc }}</div>
        <div class="project-meta">
          <div class="project-lang">
            <div class="lang-dot" :style="{ background: p.langColor, boxShadow: `0 0 6px ${p.langColor}` }"></div>
            {{ p.lang }}
          </div>
          <span class="project-arrow">↗</span>
        </div>
      </a>
    </div>
  </section>
</template>

<style scoped>
#projects { padding-bottom: 80px; }

.projects-grid {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--border);
}

.project-card {
  background: linear-gradient(90deg, rgba(214,198,155,0.035), transparent 55%);
  border: 0;
  border-bottom: 1px solid var(--border);
  padding: 26px 0 28px 28px;
  position: relative;
  cursor: pointer;
  transition: background 0.2s, padding-left 0.2s;
  text-decoration: none;
  color: inherit;
  display: grid;
  grid-template-columns: 150px minmax(180px, 280px) 1fr auto;
  gap: 22px;
  align-items: start;
}

.project-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 22px;
  bottom: 22px;
  width: 3px;
  background: var(--amber);
  opacity: 0.45;
}

.project-card:hover {
  background: linear-gradient(90deg, rgba(214,198,155,0.075), rgba(214,198,155,0.015) 58%, transparent);
  padding-left: 34px;
}

.project-tag {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-dim);
  padding-top: 5px;
}

.project-title {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 21px;
  font-weight: 600;
  letter-spacing: -0.025em;
  color: var(--text);
}

.project-desc {
  font-size: 14px;
  line-height: 1.65;
  color: var(--text-dim);
  font-weight: 300;
}

.project-meta {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 18px;
  min-width: 150px;
}

.project-lang {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  line-height: 1.5;
  color: var(--text-dim);
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-end;
  text-align: right;
}

.lang-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  box-shadow: none !important;
  opacity: 0.8;
}

.project-arrow {
  font-size: 16px;
  opacity: 0.55;
  transition: opacity 0.2s, transform 0.2s;
  color: var(--amber);
}

.project-card:hover .project-arrow { opacity: 1; transform: translate(2px, -2px); }

@media (max-width: 900px) {
  .project-card {
    grid-template-columns: 1fr;
    gap: 10px;
    padding-left: 22px;
  }
  .project-card:hover { padding-left: 26px; }
  .project-meta { justify-content: space-between; }
  .project-lang { text-align: left; justify-content: flex-start; }
}
</style>
