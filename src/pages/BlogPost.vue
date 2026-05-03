<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import BackgroundEffects from '../components/BackgroundEffects.vue'
import Nav from '../components/Nav.vue'
import FooterBar from '../components/FooterBar.vue'
import { getPost } from '../lib/posts'

const route = useRoute()
const post = computed(() => getPost(route.params.slug as string))

function formatDate(iso: string) {
  if (!iso) return ''
  const hasTime = iso.includes('T') || /\d{2}:\d{2}/.test(iso)
  return new Date(iso).toLocaleString('en-AU', {
    day: 'numeric', month: 'long', year: 'numeric',
    ...(hasTime ? { hour: '2-digit', minute: '2-digit', second: '2-digit' } : {}),
  })
}
</script>

<template>
  <BackgroundEffects />
  <Nav />
  <main>
    <article class="post-article">
      <div v-if="!post" class="not-found">
        <p>Post not found.</p>
        <RouterLink to="/blog" class="btn-ghost">← Back to Blog</RouterLink>
      </div>

      <template v-else>
        <div class="post-header">
          <div class="breadcrumb">
            <RouterLink to="/blog" class="breadcrumb-link">Blog</RouterLink>
            <span class="breadcrumb-sep">/</span>
            <span class="breadcrumb-current">{{ post.topic }}</span>
          </div>

          <div class="post-topic">{{ post.topic }}</div>
          <h1 class="post-title">{{ post.title }}</h1>
          <div class="post-meta">
            <span class="post-date">{{ formatDate(post.date) }}</span>
            <span v-if="post.tags.length" class="post-tags">
              <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
            </span>
          </div>
        </div>

        <div class="post-body" v-html="post.html"></div>

        <div class="post-footer">
          <RouterLink to="/blog" class="btn-ghost">← Back to Blog</RouterLink>
        </div>
      </template>
    </article>
  </main>
  <FooterBar />
</template>

<style scoped>
.post-article {
  max-width: 740px;
  margin: 0 auto;
  padding: 120px 32px 120px;
  position: relative;
  z-index: 2;
}

.not-found {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 80px;
}

/* Header */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 40px;
}

.breadcrumb-link {
  color: var(--cyan);
  text-decoration: none;
  transition: text-shadow 0.2s;
}

.breadcrumb-link:hover { text-shadow: 0 0 10px var(--cyan); }

.breadcrumb-sep { color: var(--text-dim); opacity: 0.4; }

.breadcrumb-current { color: var(--text-dim); }

.post-topic {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--cyan);
  margin-bottom: 16px;
}

.post-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.05;
  color: var(--text);
  margin-bottom: 24px;
}

.post-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  padding-bottom: 48px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 56px;
}

.post-date {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--text-dim);
}

.post-tags { display: flex; gap: 6px; flex-wrap: wrap; }

.tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 3px 8px;
  border: 1px solid var(--border);
  color: var(--text-dim);
}

/* Post footer */
.post-footer {
  margin-top: 80px;
  padding-top: 40px;
  border-top: 1px solid var(--border);
}

/* Markdown prose ——————————————————————————————— */
.post-body {
  font-size: 16px;
  line-height: 1.8;
  color: var(--text-dim);
  font-weight: 300;
}

:deep(.post-body h1),
:deep(.post-body h2),
:deep(.post-body h3),
:deep(.post-body h4) {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.01em;
  margin: 2.5rem 0 1rem;
  line-height: 1.2;
}

:deep(.post-body h1) { font-size: 2rem; }
:deep(.post-body h2) { font-size: 1.5rem; }
:deep(.post-body h3) { font-size: 1.2rem; }
:deep(.post-body h4) { font-size: 1rem; color: var(--cyan); }

:deep(.post-body p) { margin-bottom: 1.4rem; }

:deep(.post-body a) {
  color: var(--cyan);
  text-decoration: none;
  border-bottom: 1px solid oklch(85% 0.18 200 / 0.3);
  transition: border-color 0.2s, text-shadow 0.2s;
}
:deep(.post-body a:hover) {
  border-color: var(--cyan);
  text-shadow: 0 0 8px var(--cyan);
}

:deep(.post-body strong) { color: var(--text); font-weight: 600; }
:deep(.post-body em) { color: var(--amber); font-style: normal; }

:deep(.post-body code) {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85em;
  background: rgba(0, 229, 255, 0.07);
  border: 1px solid var(--border);
  padding: 2px 7px;
  border-radius: 2px;
  color: var(--cyan);
}

:deep(.post-body pre) {
  background: var(--bg2);
  border: 1px solid var(--border);
  padding: 24px;
  overflow-x: auto;
  margin: 1.8rem 0;
  border-left: 3px solid var(--cyan);
}

:deep(.post-body pre code) {
  background: none;
  border: none;
  padding: 0;
  font-size: 13px;
  color: var(--text);
}

:deep(.post-body blockquote) {
  border-left: 3px solid var(--cyan);
  padding-left: 20px;
  margin: 1.8rem 0;
  color: var(--text-dim);
  font-style: italic;
  opacity: 0.8;
}

:deep(.post-body ul),
:deep(.post-body ol) {
  padding-left: 0;
  margin-bottom: 1.4rem;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

:deep(.post-body ul li),
:deep(.post-body ol li) {
  padding-left: 20px;
  position: relative;
}

:deep(.post-body ul li::before) {
  content: '○';
  position: absolute;
  left: 0;
  color: var(--cyan);
  font-size: 10px;
  top: 5px;
  opacity: 0.6;
}

:deep(.post-body ol) { counter-reset: list; }
:deep(.post-body ol li) { counter-increment: list; }
:deep(.post-body ol li::before) {
  content: counter(list) '.';
  position: absolute;
  left: 0;
  color: var(--cyan);
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  opacity: 0.7;
}

:deep(.post-body hr) {
  border: none;
  border-top: 1px solid var(--border);
  margin: 2.5rem 0;
}

:deep(.post-body table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.8rem 0;
  font-size: 14px;
}

:deep(.post-body th),
:deep(.post-body td) {
  border: 1px solid var(--border);
  padding: 10px 16px;
  text-align: left;
}

:deep(.post-body th) {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--cyan);
  background: rgba(0, 229, 255, 0.05);
}

@media (max-width: 600px) {
  .post-article { padding: 80px 24px 80px; }
}
</style>
