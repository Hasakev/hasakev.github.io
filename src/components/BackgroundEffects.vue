<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

let animId: number
let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D

interface Drop {
  x: number; y: number; length: number; speed: number
  opacity: number; width: number; hue: number
}

const drops: Drop[] = []

function resize() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

function drawRain() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (const d of drops) {
    ctx.beginPath()
    ctx.moveTo(d.x, d.y)
    ctx.lineTo(d.x - d.length * 0.15, d.y + d.length)
    const color = d.hue === 200
      ? `rgba(120,160,178,${d.opacity * 0.55})`
      : d.hue === 350
        ? `rgba(190,132,86,${d.opacity * 0.38})`
        : `rgba(214,198,155,${d.opacity * 0.45})`
    ctx.strokeStyle = color
    ctx.lineWidth = d.width
    ctx.stroke()
    d.y += d.speed
    if (d.y > canvas.height + 40) {
      d.y = -40
      d.x = Math.random() * canvas.width
    }
  }
  animId = requestAnimationFrame(drawRain)
}

function onMouseMove(e: MouseEvent) {
  const glow = document.getElementById('cursor-glow')
  if (glow) {
    glow.style.left = e.clientX + 'px'
    glow.style.top = e.clientY + 'px'
  }
}

onMounted(() => {
  canvas = document.getElementById('rain-canvas') as HTMLCanvasElement
  ctx = canvas.getContext('2d')!
  resize()
  window.addEventListener('resize', resize)

  for (let i = 0; i < 160; i++) {
    drops.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      length: 10 + Math.random() * 25,
      speed: 1.5 + Math.random() * 4,
      opacity: 0.05 + Math.random() * 0.16,
      width: 0.5 + Math.random() * 1,
      hue: Math.random() < 0.6 ? 200 : Math.random() < 0.5 ? 350 : 70,
    })
  }
  drawRain()
  document.addEventListener('mousemove', onMouseMove)

  // scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        ;(el.target as HTMLElement).style.opacity = '1';
        (el.target as HTMLElement).style.transform = 'translateY(0)'
      }
    })
  }, { threshold: 0.1 })

  setTimeout(() => {
    document.querySelectorAll('.project-card, .stat-block, .timeline-item, .about-content').forEach(el => {
      ;(el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(24px)';
      (el as HTMLElement).style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      observer.observe(el)
    })
  }, 100)
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('resize', resize)
  document.removeEventListener('mousemove', onMouseMove)
})
</script>

<template>
  <canvas id="rain-canvas" style="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.18;" />
  <div id="city-bg" style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;background:radial-gradient(ellipse 76% 44% at 50% 100%,oklch(24% 0.035 220/0.42),transparent),radial-gradient(ellipse 36% 26% at 18% 74%,oklch(31% 0.055 78/0.20),transparent),radial-gradient(ellipse 30% 20% at 78% 64%,oklch(24% 0.04 200/0.20),transparent);" />
  <div id="scanlines" style="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;background:repeating-linear-gradient(0deg,transparent,transparent 5px,rgba(255,255,255,0.018) 5px,rgba(255,255,255,0.018) 6px);" />
  <div id="cursor-glow" style="position:fixed;width:260px;height:260px;border-radius:50%;background:radial-gradient(circle,oklch(74% 0.14 78/0.035),transparent 70%);pointer-events:none;z-index:1;transform:translate(-50%,-50%);transition:left 0.12s ease,top 0.12s ease;" />
</template>
