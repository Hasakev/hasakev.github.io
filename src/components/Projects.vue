<script setup lang="ts">
interface Project {
  href: string
  title: string
  tag: string
  tagColor: 'cyan' | 'magenta' | 'amber' | 'green'
  desc: string
  lang: string
  size: 'large' | 'small' | 'medium' | 'full'
}

const projects: Project[] = [
  {
    href: 'https://github.com/Hasakev/hasakev.github.io',
    title: 'This website',
    tag: 'Vue.js, Python',
    tagColor: 'cyan',
    desc: 'The website you\'re in right now! Fully vibe-coded in 15 minutes. Leveraged a mix of Claude and Codex for iterative design-driven development. AI is insane, we are so cooked. - Kev, 2026',
    lang: 'Vue.js · Vite · TypeScript · Python',
    size: 'small',
  },
  {
    href: 'https://github.com/Hasakev',
    title: 'Spam Detection API',
    tag: 'Cloud / ML',
    tagColor: 'magenta',
    desc: 'Large-scale spam email detection service deployed on AWS — Flask + SQLAlchemy API containerised with Docker, provisioned via Terraform (ECR, RDS, ECS). Async job processing with Celery + SNS; load tested and monitored via CloudWatch.',
    lang: 'Python · Flask · AWS · Terraform',
    size: 'small',
  },
  {
    href: 'https://github.com/UQcsse3200/2023-studio-3',
    title: 'Tower Defence Game',
    tag: 'Game Dev',
    tagColor: 'green',
    desc: "Collaborative game built with 30 students using Java and LibGDX. Implemented core game components and diverse features. Managed via GitHub — branches, pull requests, issue tracking, and code reviews at scale.",
    lang: 'Java · LibGDX · SonarCloud',
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
            <div class="lang-dot"></div>
            {{ p.lang }}
          </div>
          <span class="project-arrow">↗</span>
        </div>
      </a>
    </div>
  </section>
</template>

<style scoped>
#projects { padding-bottom: 48px; }

.projects-grid {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--border);
}

.project-card {
  background: transparent;
  border: 0;
  border-bottom: 1px solid var(--border);
  padding: 22px 0 24px 28px;
  position: relative;
  cursor: pointer;
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
  width: 2px;
  background: var(--accent);
  opacity: 0;
  transition: opacity 0.2s;
}

.project-card:hover::before { opacity: 1; }

.project-card:hover .project-title {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.project-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-dim);
  padding-top: 5px;
}

.project-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 21px;
  font-weight: 600;
  letter-spacing: -0.025em;
  color: var(--text);
}

.project-title::before {
  content: '> ';
  color: var(--accent);
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
  font-family: 'JetBrains Mono', monospace;
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
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0.7;
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
  .project-meta { justify-content: space-between; }
  .project-lang { text-align: left; justify-content: flex-start; }
}
</style>
