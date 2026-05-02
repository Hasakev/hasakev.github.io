<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import BackgroundEffects from '../components/BackgroundEffects.vue'
import Nav from '../components/Nav.vue'
import FooterBar from '../components/FooterBar.vue'
import { getAllPosts } from '../lib/posts'

const posts = getAllPosts()
const topics = ['All', ...Array.from(new Set(posts.map(p => p.topic)))]
const active = ref('All')

const filtered = computed(() =>
  active.value === 'All' ? posts : posts.filter(p => p.topic === active.value)
)

function formatDate(iso: string) {
  if (!iso) return ''
  const hasTime = iso.includes('T') || /\d{2}:\d{2}/.test(iso)
  return new Date(iso).toLocaleString('en-AU', {
    day: 'numeric', month: 'short', year: 'numeric',
    ...(hasTime ? { hour: '2-digit', minute: '2-digit', second: '2-digit' } : {}),
  })
}
</script>

<template>
  <BackgroundEffects />
  <Nav />
  <main>
    <section id="blog">
      <div class="section-header">
        <span class="section-num">05</span>
        <h2 class="section-title">Blog</h2>
        <div class="section-line"></div>
      </div>

      <div class="topic-filter">
        <button
          v-for="t in topics"
          :key="t"
          class="topic-pill"
          :class="{ active: active === t }"
          @click="active = t"
        >{{ t }}</button>
      </div>

      <div v-if="filtered.length === 0" class="empty">
        No posts yet.
      </div>

      <div class="post-grid">
        <RouterLink
          v-for="post in filtered"
          :key="post.slug"
          :to="`/blog/${post.slug}`"
          class="post-card"
        >
          <div class="card-topic">{{ post.topic }}</div>
          <div class="card-title">{{ post.title }}</div>
          <div class="card-desc">{{ post.description }}</div>
          <div class="card-footer">
            <span class="card-date">{{ formatDate(post.date) }}</span>
            <span class="card-tags" v-if="post.tags.length">
              <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
            </span>
          </div>
        </RouterLink>
      </div>
    </section>
  </main>
  <FooterBar />
</template>

<style scoped>
#blog { padding-bottom: 120px; }

.topic-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 48px;
}

.topic-pill {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 6px 16px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-dim);
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, text-shadow 0.2s, background 0.2s;
}

.topic-pill:hover,
.topic-pill.active {
  border-color: var(--cyan);
  color: var(--cyan);
  text-shadow: 0 0 8px var(--cyan);
  background: rgba(0, 229, 255, 0.04);
}

.empty {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  color: var(--text-dim);
  letter-spacing: 0.1em;
  padding: 40px 0;
}

.post-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2px;
}

.post-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 40px;
  border: 1px solid var(--border);
  background: var(--surface);
  backdrop-filter: blur(8px);
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
  transition: border-color 0.2s, background 0.2s;
}

.post-card::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: var(--cyan);
  opacity: 0;
  transition: opacity 0.2s;
}

.post-card:hover {
  border-color: oklch(85% 0.18 200 / 0.35);
  background: rgba(0, 229, 255, 0.03);
}

.post-card:hover::before { opacity: 1; }

.card-topic {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--cyan);
}

.card-title {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: var(--text);
  line-height: 1.25;
}

.card-desc {
  font-size: 14px;
  line-height: 1.7;
  color: var(--text-dim);
  font-weight: 300;
  flex: 1;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.card-date {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--text-dim);
}

.card-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tag {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 3px 8px;
  border: 1px solid var(--border);
  color: var(--text-dim);
}

@media (max-width: 900px) {
  .post-grid { grid-template-columns: 1fr; }
  .post-card { padding: 28px; }
}
</style>
