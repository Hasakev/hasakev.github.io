<script setup lang="ts">
interface TimelineItem {
  date: string
  role: string
  company: string
  logo: string
  desc: string[]
}

const items: TimelineItem[] = [
  {
    date: 'Dec 2024 — Present',
    role: 'Graduate Electricity Market Modeller',
    company: 'EPEC Group · Brisbane, QLD',
    logo: '/uploads/logo_epec.png',
    desc: [
      'Built an automated Python pipeline that cut manual effort by 90%, letting the team run PLEXOS scenarios overnight and freeing analysts for higher-value work.',
      'Designed a data lake delivering market reports in under 10 minutes (down from 40 min) by filtering 2 TB of historical NEM pricing data into organised, traceable MBs.',
      'Streamlined data extraction tools and ML models in PLEXOS, cutting processing time from 2 hours to 10 minutes and improving accuracy by 12%.',
    ],
  },
  {
    date: '2021 — Nov 2025',
    role: 'BE (Hons.) / ME — Software Engineering',
    company: 'University of Queensland · Brisbane, QLD',
    logo: '/uploads/logo_uq.png',
    desc: [
      'Graduated with Class IIA (Second Class Honours) in the dual Bachelor of Engineering / Master of Engineering program.',
    ],
  },
  {
    date: 'Jun 2023 — Jul 2023',
    role: 'New Colombo Plan Scholar',
    company: 'Dalian Neusoft University of Information · Dalian, China',
    logo: '/uploads/logo_dnui.jpg',
    desc: [
      'Developed a startup concept over four weeks — software design, business plan, and market research targeting the Chinese edtech sector, coordinating across a team of seven.',
      'Pitched ideas to industry leaders and earned the "Best Application Scenario Award" for high market potential and feasibility.',
    ],
  },
]
</script>

<template>
  <section id="experience">
    <div class="section-header">
      <span class="section-num">03</span>
      <h2 class="section-title">Experience</h2>
      <div class="section-line"></div>
    </div>

    <div class="timeline">
      <div v-for="item in items" :key="item.role" class="timeline-item">
        <div class="timeline-date">{{ item.date }}</div>
        <div class="timeline-content">
          <div class="timeline-role">{{ item.role }}</div>
          <div class="timeline-company">
            <img
              class="company-logo"
              :src="item.logo"
              :alt="item.company.split('·')[0].trim()"
              @error="(e) => ((e.target as HTMLImageElement).style.display = 'none')"
            >
            {{ item.company }}
          </div>
          <ul class="timeline-desc">
            <li v-for="point in item.desc" :key="point">{{ point }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#experience { padding-bottom: 80px; }

.timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 1px;
  background: linear-gradient(to bottom, var(--cyan), oklch(60% 0.25 350), transparent);
  opacity: 0.3;
}

.timeline-item {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 0;
  padding: 40px 0;
  border-bottom: 1px solid var(--border);
  position: relative;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -4px; top: 48px;
  width: 9px; height: 9px;
  border-radius: 50%;
  background: var(--cyan);
  box-shadow: 0 0 12px var(--cyan);
}

.timeline-date {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--text-dim);
  padding-left: 24px;
  padding-top: 4px;
}

.timeline-content {
  padding-left: 40px;
  padding-right: 24px;
}

.timeline-role {
  font-family: 'JetBrains Mono', monospace;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 6px;
  color: var(--text);
}

.timeline-company {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--cyan);
  text-transform: uppercase;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.company-logo {
  width: 18px;
  height: 18px;
  object-fit: contain;
  border-radius: 3px;
  flex-shrink: 0;
}

.timeline-desc {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.timeline-desc li {
  font-size: 14px;
  line-height: 1.7;
  color: var(--text-dim);
  font-weight: 300;
  padding-left: 16px;
  position: relative;
}

.timeline-desc li::before {
  content: '○';
  position: absolute;
  left: 0;
  color: var(--cyan);
  opacity: 0.5;
  font-size: 10px;
  top: 3px;
}

@media (max-width: 900px) {
  .timeline-item { grid-template-columns: 1fr; }
  .timeline-date { padding-left: 24px; margin-bottom: 8px; }
}
</style>
