<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const brisbaneTime = ref('')
let clockTimer: number | undefined

function updateBrisbaneTime() {
  brisbaneTime.value = new Intl.DateTimeFormat('en-AU', {
    timeZone: 'Australia/Brisbane',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date())
}

onMounted(() => {
  updateBrisbaneTime()
  clockTimer = window.setInterval(updateBrisbaneTime, 1000)
})

onUnmounted(() => {
  if (clockTimer) window.clearInterval(clockTimer)
})
</script>

<template>
  <div class="stats-wrapper">
    <div class="stats-row" aria-label="profile notes">
      <div class="stat-block">
        <span class="stat-label">Current desk</span>
        <a href="https://epecgroup.com.au" target="_blank" rel="noopener" class="stat-num">EPEC</a>        
      </div>
      <div class="stat-block">
        <span class="stat-label">Main tools</span>
        <span class="stat-num">Python · PLEXOS · My Brain</span>
      </div>
      <div class="stat-block">
        <span class="stat-label">Working from</span>
        <span class="stat-num">UTC+10</span>
        <span class="stat-clock" aria-label="Current time in Brisbane">{{ brisbaneTime }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-wrapper {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 40px;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  padding: 20px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.stat-block {
  text-align: left;
  padding-left: 18px;
  border-left: 2px solid oklch(74% 0.14 78 / 0.45);
}

.stat-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(17px, 2vw, 22px);
  font-weight: 500;
  color: var(--text);
  line-height: 1.2;
  display: block;
  margin-top: 7px;
}

.stat-num[href] {
  text-decoration: none;
}

.stat-num[href]:hover {
  text-decoration: none;
  color: var(--amber);
}

.stat-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.13em;
  color: var(--text-dim);
  text-transform: uppercase;
  display: block;
}

.stat-clock {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  letter-spacing: 0.08em;
  color: var(--amber);
  display: inline-block;
  margin-top: 8px;
  font-variant-numeric: tabular-nums;
}

@media (max-width: 600px) {
  .stats-row { grid-template-columns: 1fr; gap: 18px; }
  .stats-wrapper { padding: 0 24px; }
}
</style>
