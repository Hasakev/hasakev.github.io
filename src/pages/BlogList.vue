<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
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

      <div class="post-list">
        <RouterLink
          v-for="post in filtered"
          :key="post.slug"
          :to="`/blog/${post.slug}`"
          class="post-row"
        >
          <div class="row-meta">
            <span class="card-date">{{ formatDate(post.date) }}</span>
            <span class="card-topic">{{ post.topic }}</span>
          </div>
          <div class="row-main">
            <div class="card-title">{{ post.title }}</div>
            <div class="card-desc">{{ post.description }}</div>
          </div>
          <span class="card-tags" v-if="post.tags.length">
            <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
          </span>
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
  margin-bottom: 28px;
}

.topic-pill {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 6px 16px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-dim);
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}

.topic-pill:hover,
.topic-pill.active {
  border-color: var(--accent);
  color: var(--accent);
  background: rgba(212, 162, 58, 0.06);
}

.empty {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--text-dim);
  letter-spacing: 0.1em;
  padding: 40px 0;
}

.post-list {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--border);
}

.post-row {
  display: grid;
  grid-template-columns: 200px 1fr auto;
  gap: 22px;
  align-items: start;
  padding: 22px 0;
  border-bottom: 1px solid var(--border);
  text-decoration: none;
  color: inherit;
}

.row-meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 3px;
}

.card-date {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--text-dim);
}

.card-topic {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
}

.row-main { min-width: 0; }

.card-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 19px;
  font-weight: 600;
  color: var(--text);
  line-height: 1.3;
  margin-bottom: 8px;
}

.card-title::before {
  content: '> ';
  color: var(--accent);
}

.post-row:hover .card-title {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.card-desc {
  font-size: 14px;
  line-height: 1.65;
  color: var(--text-dim);
  font-weight: 300;
}

.card-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: flex-end;
  max-width: 220px;
}

.tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 3px 8px;
  border: 1px solid var(--border);
  color: var(--text-dim);
}

@media (max-width: 900px) {
  .post-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .row-meta { flex-direction: row; gap: 12px; align-items: baseline; }
  .card-tags { justify-content: flex-start; max-width: none; }
}
</style>
