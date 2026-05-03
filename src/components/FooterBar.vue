<template>
  <footer>
    <div class="footer-text">© 2026 Guoyang Luo — 0 unplanned outages detected.</div>
    <div class="footer-loc">
      <div class="footer-dot"></div>
      Brisbane, Australia · UTC+10
    </div>
  </footer>
</template>

<style scoped>
footer {
  position: relative;
  z-index: 2;
  border-top: 1px solid var(--border);
  padding: 32px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1100px;
  margin: 0 auto;
}

.footer-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.15em;
  color: var(--text-dim);
  text-transform: uppercase;
}

.footer-loc {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: var(--text-dim);
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 8px var(--green);
  animation: blink 2s ease-in-out infinite;
}

@media (max-width: 900px) {
  footer { flex-direction: column; gap: 12px; text-align: center; }
}
</style>
