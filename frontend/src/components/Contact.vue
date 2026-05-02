<script setup lang="ts">
import { ref } from 'vue'

const form = ref({ name: '', email: '', message: '' })
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')

function openMailClient(payload: { name: string; email: string; message: string }) {
  const subject = encodeURIComponent(`Portfolio contact from ${payload.name}`)
  const body = encodeURIComponent(`Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`)
  window.location.href = `mailto:hasakev@gmail.com?subject=${subject}&body=${body}`
}

async function submit() {
  status.value = 'sending'
  const payload = { ...form.value }

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      status.value = 'success'
      form.value = { name: '', email: '', message: '' }
      return
    }
  } catch {
    // Fallback to mailto on static hosting (e.g. GitHub Pages)
  }

  try {
    openMailClient(payload)
    status.value = 'success'
    form.value = { name: '', email: '', message: '' }
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <section id="contact">
    <div class="section-header">
      <span class="section-num">04</span>
      <h2 class="section-title">Contact</h2>
      <div class="section-line"></div>
    </div>

    <div class="contact-inner">
      <div class="contact-card">
        <div class="contact-big">
          Send a<br>
          <span class="accent-cyan">problem</span><br>
          <span class="accent-magenta">worth modelling.</span>
        </div>
        <p class="contact-sub">
          Best fit: energy systems, data tooling, market studies, or software roles close to real infrastructure.
        </p>

        <form class="contact-form" @submit.prevent="submit">
          <div class="field">
            <label>Name</label>
            <input v-model="form.name" type="text" placeholder="Your name" required />
          </div>
          <div class="field">
            <label>Email</label>
            <input v-model="form.email" type="email" placeholder="your@email.com" required />
          </div>
          <div class="field">
            <label>Message</label>
            <textarea v-model="form.message" rows="4" placeholder="What's on your mind?" required></textarea>
          </div>
          <button type="submit" class="btn-primary" :disabled="status === 'sending'">
            {{ status === 'sending' ? 'Sending...' : 'Send Message' }}
          </button>
          <p v-if="status === 'success'" class="form-msg success">Message sent — or your mail app opened.</p>
          <p v-if="status === 'error'" class="form-msg error">Something went wrong. Try emailing directly.</p>
        </form>

        <div class="contact-links">
          <a href="https://github.com/Hasakev" target="_blank" class="contact-link">
            <svg class="contact-link-icon" viewBox="0 0 19 19" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" clip-rule="evenodd"/>
            </svg>
            <div class="contact-link-text">
              <span class="contact-link-label">GitHub</span>
              <span class="contact-link-val">github.com/hasakev</span>
            </div>
          </a>
          <a href="https://www.linkedin.com/in/hasakev/" target="_blank" class="contact-link">
            <svg class="contact-link-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <div class="contact-link-text">
              <span class="contact-link-label">LinkedIn</span>
              <span class="contact-link-val">linkedin.com/in/hasakev</span>
            </div>
          </a>
          <a href="mailto:hasakev@gmail.com" class="contact-link">
            <svg class="contact-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/>
            </svg>
            <div class="contact-link-text">
              <span class="contact-link-label">Email</span>
              <span class="contact-link-val">hasakev@gmail.com</span>
            </div>
          </a>
        </div>
      </div>

      <div class="city-image-contact">
        <img src="/uploads/chongqing_night.jpg" alt="Chongqing bridge at night">
      </div>
    </div>
  </section>
</template>

<style scoped>
#contact { padding-bottom: 160px; }

.contact-inner {
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  gap: 56px;
  align-items: stretch;
}

.contact-card {
  padding: 0 0 0 30px;
  border-left: 2px solid oklch(74% 0.14 78 / 0.38);
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.contact-big {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: clamp(32px, 4vw, 52px);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.accent-cyan { color: var(--amber); }
.accent-magenta { color: var(--cyan); }

.contact-sub {
  font-size: 15px;
  line-height: 1.7;
  color: var(--text-dim);
  font-weight: 300;
}

/* Form */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--cyan);
}

.field input,
.field textarea {
  background: rgba(238, 241, 237, 0.025);
  border: 1px solid rgba(214,198,155,0.18);
  color: var(--text);
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 14px;
  padding: 12px 16px;
  outline: none;
  resize: vertical;
  transition: border-color 0.2s;
}

.field input:focus,
.field textarea:focus {
  border-color: oklch(74% 0.14 78 / 0.5);
}

.field input::placeholder,
.field textarea::placeholder { color: var(--text-dim); }

.contact-form .btn-primary {
  align-self: flex-start;
}

.contact-form .btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.form-msg {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.1em;
}
.form-msg.success { color: var(--green); }
.form-msg.error { color: var(--magenta); }

/* Links */
.contact-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 16px;
  text-decoration: none;
  color: var(--text-dim);
  font-size: 14px;
  padding: 16px 20px;
  border: 1px solid rgba(214,198,155,0.18);
  transition: border-color 0.2s, color 0.2s, background 0.2s, transform 0.2s;
  position: relative;
  overflow: hidden;
}

.contact-link::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: var(--amber);
  opacity: 0;
  transition: opacity 0.2s;
}

.contact-link:hover { border-color: oklch(74% 0.14 78 / 0.45); color: var(--text); background: rgba(214,198,155,0.035); transform: translateX(3px); }
.contact-link:hover::before { opacity: 1; }

.contact-link-icon { width: 20px; height: 20px; opacity: 0.7; flex-shrink: 0; }
.contact-link-text { flex: 1; }
.contact-link-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.15em;
  color: var(--cyan);
  text-transform: uppercase;
  display: block;
  margin-bottom: 3px;
}
.contact-link-val { font-size: 13px; color: var(--text); }

.city-image-contact {
  position: relative;
  overflow: hidden;
  min-height: 400px;
}

.city-image-contact img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.2) saturate(0.82) brightness(0.58) contrast(1.08);
  transition: transform 0.6s ease;
}

.city-image-contact:hover img { transform: scale(1.03); }

.city-image-contact::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(4,6,13,0.8) 0%, transparent 50%);
}

@media (max-width: 900px) {
  .contact-inner { grid-template-columns: 1fr; gap: 30px; }
  .contact-card { padding: 0 0 0 22px; }
  .city-image-contact { min-height: 280px; }
}
</style>
