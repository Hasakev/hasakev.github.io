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
    <div class="status-bar" aria-label="profile status">
      <span class="seg">
        <span class="k">desk</span>
        <a href="https://epecgroup.com.au" target="_blank" rel="noopener" class="v link">EPEC</a>
      </span>
      <span class="sep">·</span>
      <span class="seg">
        <span class="k">tools</span>
        <span class="v">Python · PLEXOS · brain</span>
      </span>
      <span class="sep">·</span>
      <span class="seg">
        <span class="k">tz</span>
        <span class="v">UTC+10</span>
        <span class="clock" aria-label="Current time in Brisbane">{{ brisbaneTime }}</span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.stats-wrapper {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 40px;
}

.status-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 10px 14px;
  padding: 12px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
}

.seg { display: inline-flex; align-items: baseline; gap: 8px; }

.k {
  color: var(--text-dim);
  font-size: 11px;
  letter-spacing: 0.06em;
}

.k::after { content: ':'; color: var(--text-dim); }

.v { color: var(--text); }

.v.link { text-decoration: none; }
.v.link:hover { color: var(--accent); }

.sep { color: var(--text-dim); opacity: 0.5; }

.clock {
  color: var(--accent);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;
}

@media (max-width: 600px) {
  .stats-wrapper { padding: 0 24px; }
  .sep { display: none; }
  .seg { width: 100%; }
}
</style>
