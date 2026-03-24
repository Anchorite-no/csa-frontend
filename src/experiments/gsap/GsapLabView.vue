<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import {
    heroTags,
    pathwayCards,
    proofCards,
    signalMarquee,
    stageCards,
    timelineItems,
} from './labData'

gsap.registerPlugin(ScrollTrigger)

const rootRef = ref(null)
const traceRows = Array.from({ length: 6 }, (_, index) => index)
const panelBars = Array.from({ length: 7 }, (_, index) => index)
const storyBars = Array.from({ length: 8 }, (_, index) => index)
const signalMarqueeLoop = [...signalMarquee, ...signalMarquee]
let ctx

const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

onMounted(async () => {
    await nextTick()

    const root = rootRef.value
    if (!root) return

    ctx = gsap.context(() => {
        const heroLines = root.querySelectorAll('.gsap-lab__hero-line')
        const heroTagsEls = root.querySelectorAll('.gsap-lab__hero-tag')
        const panel = root.querySelector('.gsap-lab__panel')
        const metricCards = root.querySelectorAll('.gsap-lab__metric-card')
        const revealBlocks = root.querySelectorAll('.gsap-lab__reveal')
        const pathwayEls = root.querySelectorAll('.gsap-lab__pathway')
        const timelineEls = root.querySelectorAll('.gsap-lab__timeline-item')
        const timelineFill = root.querySelector('.gsap-lab__timeline-fill')
        const sweep = root.querySelector('.gsap-lab__sweep')
        const radarLine = root.querySelector('.gsap-lab__radar-line')
        const blips = root.querySelectorAll('.gsap-lab__blip')
        const pulses = root.querySelectorAll('.gsap-lab__pulse')
        const traces = root.querySelectorAll('.gsap-lab__trace')
        const panelBarsEls = root.querySelectorAll('.gsap-lab__panel-bar')
        const marqueeTrack = root.querySelector('.gsap-lab__marquee-track')
        const storySection = root.querySelector('.gsap-lab__story')
        const storyInner = root.querySelector('.gsap-lab__story-inner')
        const storySteps = root.querySelectorAll('.gsap-lab__story-step')
        const storyNodes = root.querySelectorAll('.gsap-lab__story-node')
        const storyBeam = root.querySelector('.gsap-lab__story-beam')
        const storyBarsEls = root.querySelectorAll('.gsap-lab__story-bar')

        const reduced = prefersReducedMotion()

        gsap.set(heroLines, { y: 36, opacity: 0 })
        gsap.set(heroTagsEls, { y: 20, opacity: 0 })
        gsap.set(panel, { x: 48, opacity: 0, rotateY: -8 })
        gsap.set(metricCards, { y: 18, opacity: 0 })
        gsap.set(revealBlocks, { y: 48, opacity: 0 })
        gsap.set(pathwayEls, { y: 36, opacity: 0 })
        gsap.set(timelineEls, { x: 32, opacity: 0 })
        gsap.set(timelineFill, { scaleY: 0, transformOrigin: 'top center' })
        gsap.set(storySteps, { y: 24, opacity: 0.22 })
        gsap.set(storyNodes, { scale: 0.76, opacity: 0.24 })
        gsap.set(storyBarsEls, { scaleY: 0.18, transformOrigin: 'bottom center' })

        const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })

        intro
            .to(heroLines, {
                y: 0,
                opacity: 1,
                duration: 0.9,
                stagger: 0.12,
            })
            .to(
                heroTagsEls,
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.55,
                    stagger: 0.08,
                },
                '-=0.45'
            )
            .to(
                panel,
                {
                    x: 0,
                    opacity: 1,
                    rotateY: 0,
                    duration: 1,
                },
                '-=0.7'
            )
            .to(
                metricCards,
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.48,
                    stagger: 0.08,
                },
                '-=0.55'
            )

        if (!reduced && sweep) {
            gsap.to(sweep, {
                xPercent: 22,
                yPercent: -8,
                duration: 5.6,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            })
        }

        if (!reduced && radarLine) {
            gsap.to(radarLine, {
                rotate: 360,
                duration: 6.5,
                repeat: -1,
                ease: 'none',
                transformOrigin: 'left center',
            })
        }

        if (!reduced && blips.length) {
            gsap.to(blips, {
                opacity: 0.28,
                scale: 0.82,
                duration: 1.2,
                repeat: -1,
                yoyo: true,
                stagger: 0.22,
                ease: 'sine.inOut',
            })
        }

        if (!reduced && pulses.length) {
            gsap.to(pulses, {
                scale: 1.42,
                opacity: 0,
                duration: 2.8,
                repeat: -1,
                stagger: 0.8,
                ease: 'power1.out',
            })
        }

        if (!reduced && traces.length) {
            gsap.fromTo(
                traces,
                { xPercent: -110, opacity: 0 },
                {
                    xPercent: 125,
                    opacity: 0.82,
                    duration: 2.1,
                    repeat: -1,
                    stagger: 0.2,
                    ease: 'none',
                }
            )
        }

        if (!reduced && panelBarsEls.length) {
            gsap.to(panelBarsEls, {
                scaleY: index =>
                    [0.32, 0.86, 0.56, 1.02, 0.74, 0.94, 0.42][index % 7],
                duration: 1.15,
                repeat: -1,
                yoyo: true,
                stagger: 0.11,
                ease: 'sine.inOut',
                transformOrigin: 'bottom center',
            })
        }

        if (!reduced && marqueeTrack) {
            gsap.to(marqueeTrack, {
                xPercent: -50,
                duration: 18,
                repeat: -1,
                ease: 'none',
            })
        }

        if (!reduced) {
            gsap.to('.gsap-lab__hero-copy', {
                y: -34,
                opacity: 0.72,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.gsap-lab__hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            })

            gsap.to('.gsap-lab__panel-shell', {
                y: -48,
                rotateX: 4,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.gsap-lab__hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            })
        }

        revealBlocks.forEach(block => {
            gsap.to(block, {
                y: 0,
                opacity: 1,
                duration: reduced ? 0.01 : 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: block,
                    start: 'top 80%',
                    once: true,
                },
            })
        })

        gsap.to(pathwayEls, {
            y: 0,
            opacity: 1,
            duration: reduced ? 0.01 : 0.7,
            stagger: reduced ? 0 : 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.gsap-lab__pathways-grid',
                start: 'top 80%',
                once: true,
            },
        })

        if (timelineFill) {
            gsap.to(timelineFill, {
                scaleY: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.gsap-lab__timeline-shell',
                    start: 'top 75%',
                    end: 'bottom 70%',
                    scrub: reduced ? false : true,
                },
            })
        }

        timelineEls.forEach((item, index) => {
            gsap.to(item, {
                x: 0,
                opacity: 1,
                duration: reduced ? 0.01 : 0.7,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 82%',
                    once: true,
                },
                delay: reduced ? 0 : index * 0.04,
            })
        })

        if (storySection && storyInner && storySteps.length && storyNodes.length) {
            const storyTimeline = gsap.timeline({
                defaults: { ease: 'power2.inOut' },
                scrollTrigger: {
                    trigger: storySection,
                    start: 'top top',
                    end: reduced ? 'bottom bottom' : '+=220%',
                    scrub: reduced ? false : true,
                    pin: storyInner,
                },
            })

            storyTimeline.to(
                storyBeam,
                {
                    left: '84%',
                    duration: stageCards.length,
                    ease: 'none',
                },
                0
            )

            stageCards.forEach((_, index) => {
                const position = index

                storyTimeline.to(
                    storySteps[index],
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.25,
                    },
                    position
                )

                storyTimeline.to(
                    storyNodes[index],
                    {
                        scale: 1.25,
                        opacity: 1,
                        duration: 0.25,
                    },
                    position
                )

                storyTimeline.to(
                    storyBarsEls,
                    {
                        scaleY: barIndex =>
                            [0.28, 0.56, 0.92, 0.38, 1.08, 0.72, 0.44, 0.86][
                                (barIndex + index) % 8
                            ],
                        duration: 0.34,
                        stagger: 0.02,
                    },
                    position
                )

                if (index > 0) {
                    storyTimeline.to(
                        storySteps[index - 1],
                        {
                            y: -12,
                            opacity: 0.28,
                            duration: 0.2,
                        },
                        position
                    )

                    storyTimeline.to(
                        storyNodes[index - 1],
                        {
                            scale: 0.84,
                            opacity: 0.3,
                            duration: 0.2,
                        },
                        position
                    )
                }
            })
        }
    }, root)
})

onUnmounted(() => {
    ctx?.revert()
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<template>
    <div ref="rootRef" class="gsap-lab">
        <header class="gsap-lab__chrome">
            <RouterLink class="gsap-lab__brand" to="/">
                <span class="gsap-lab__brand-mark"></span>
                <span>ZJUCSA Motion Lab</span>
            </RouterLink>

            <a class="gsap-lab__chrome-link" href="#gsap-lab-sections">Skip to Sections</a>
        </header>

        <section class="gsap-lab__hero">
            <div class="gsap-lab__grid"></div>
            <div class="gsap-lab__sweep"></div>

            <div class="gsap-lab__hero-copy">
                <p class="gsap-lab__eyebrow gsap-lab__hero-line">ZJUCSA / GSAP HOME LAB</p>
                <h1 class="gsap-lab__title gsap-lab__hero-line">
                    让协会首页
                    <span>像一段正在扫描中的门户</span>
                </h1>
                <p class="gsap-lab__lead gsap-lab__hero-line">
                    少一点说明文，多一点滚动里的身份感、节奏感和加入感。
                </p>

                <div class="gsap-lab__tags">
                    <span
                        v-for="tag in heroTags"
                        :key="tag"
                        class="gsap-lab__hero-tag"
                    >
                        {{ tag }}
                    </span>
                </div>

                <div class="gsap-lab__actions gsap-lab__hero-line">
                    <a class="gsap-lab__button gsap-lab__button--primary" href="#gsap-lab-story">
                        进入滚动实验
                    </a>
                    <RouterLink class="gsap-lab__button gsap-lab__button--ghost" to="/">
                        返回主站首页
                    </RouterLink>
                </div>
            </div>

            <div class="gsap-lab__panel">
                <div class="gsap-lab__panel-shell">
                    <div class="gsap-lab__panel-top">
                        <span>SCAN MODE</span>
                        <span>LIVE SIGNAL</span>
                    </div>
                    <div class="gsap-lab__panel-screen">
                        <div class="gsap-lab__ring"></div>
                        <div class="gsap-lab__radar-line"></div>
                        <span class="gsap-lab__pulse gsap-lab__pulse--one"></span>
                        <span class="gsap-lab__pulse gsap-lab__pulse--two"></span>
                        <span class="gsap-lab__pulse gsap-lab__pulse--three"></span>
                        <div class="gsap-lab__trace-grid">
                            <span
                                v-for="row in traceRows"
                                :key="row"
                                class="gsap-lab__trace"
                                :style="{ top: `${20 + row * 10}%` }"
                            ></span>
                        </div>
                        <span class="gsap-lab__blip gsap-lab__blip--one"></span>
                        <span class="gsap-lab__blip gsap-lab__blip--two"></span>
                        <span class="gsap-lab__blip gsap-lab__blip--three"></span>
                    </div>

                    <div class="gsap-lab__panel-metrics">
                        <article
                            v-for="card in proofCards"
                            :key="card.title"
                            class="gsap-lab__metric-card"
                        >
                            <p class="gsap-lab__metric-eyebrow">{{ card.eyebrow }}</p>
                            <h2>{{ card.title }}</h2>
                            <p>{{ card.description }}</p>
                        </article>
                    </div>

                    <div class="gsap-lab__panel-bars">
                        <span
                            v-for="bar in panelBars"
                            :key="bar"
                            class="gsap-lab__panel-bar"
                        ></span>
                    </div>
                </div>
            </div>
        </section>

        <section class="gsap-lab__marquee" aria-label="signal marquee">
            <div class="gsap-lab__marquee-track">
                <span
                    v-for="(item, index) in signalMarqueeLoop"
                    :key="`${item}-${index}`"
                    class="gsap-lab__marquee-item"
                >
                    {{ item }}
                </span>
            </div>
        </section>

        <section id="gsap-lab-story" class="gsap-lab__story">
            <div class="gsap-lab__story-inner">
                <div class="gsap-lab__story-copy">
                    <p class="gsap-lab__section-kicker">Scroll Story</p>
                    <h2>把“关于我们”变成滚动里的进入过程。</h2>

                    <div class="gsap-lab__story-steps">
                        <article
                            v-for="step in stageCards"
                            :key="step.id"
                            class="gsap-lab__story-step"
                        >
                            <p class="gsap-lab__story-step-index">{{ step.step }}</p>
                            <h3>{{ step.title }}</h3>
                            <p>{{ step.body }}</p>
                        </article>
                    </div>
                </div>

                <div class="gsap-lab__story-shell">
                    <div class="gsap-lab__story-top">
                        <span>MISSION FLOW</span>
                        <span>ZJUCSA</span>
                    </div>
                    <div class="gsap-lab__story-network">
                        <div class="gsap-lab__story-rail"></div>
                        <span
                            v-for="(step, index) in stageCards"
                            :key="`${step.id}-node`"
                            class="gsap-lab__story-node"
                            :style="{ left: `${14 + index * 23}%` }"
                        ></span>
                        <div class="gsap-lab__story-beam"></div>
                    </div>
                    <div class="gsap-lab__story-bars">
                        <span
                            v-for="bar in storyBars"
                            :key="bar"
                            class="gsap-lab__story-bar"
                        ></span>
                    </div>
                </div>
            </div>
        </section>

        <main id="gsap-lab-sections" class="gsap-lab__sections">
            <section class="gsap-lab__section gsap-lab__reveal">
                <div class="gsap-lab__section-copy">
                    <p class="gsap-lab__section-kicker">Paths</p>
                    <h2>四条入口，直接告诉访客能做什么。</h2>
                </div>

                <div class="gsap-lab__pathways-grid">
                    <article
                        v-for="pathway in pathwayCards"
                        :key="pathway.id"
                        class="gsap-lab__pathway"
                    >
                        <p class="gsap-lab__path-step">{{ pathway.step }}</p>
                        <h3>{{ pathway.title }}</h3>
                        <p>{{ pathway.body }}</p>
                    </article>
                </div>
            </section>

            <section class="gsap-lab__section gsap-lab__reveal">
                <div class="gsap-lab__section-copy">
                    <p class="gsap-lab__section-kicker">Timeline</p>
                    <h2>时间线继续保留，但要更像正在推进的协会脉搏。</h2>
                </div>

                <div class="gsap-lab__timeline-shell">
                    <div class="gsap-lab__timeline-rail">
                        <div class="gsap-lab__timeline-fill"></div>
                    </div>

                    <div class="gsap-lab__timeline-list">
                        <article
                            v-for="item in timelineItems"
                            :key="item.title"
                            class="gsap-lab__timeline-item"
                        >
                            <p class="gsap-lab__timeline-date">{{ item.date }}</p>
                            <h3>{{ item.title }}</h3>
                            <p>{{ item.description }}</p>
                        </article>
                    </div>
                </div>
            </section>
        </main>

        <footer class="gsap-lab__footer">
            <div class="gsap-lab__footer-shell gsap-lab__reveal">
                <div class="gsap-lab__footer-copy">
                    <p class="gsap-lab__footer-kicker">Portal Footer / Registry</p>
                    <h2>备案、地址、协会身份，也应该留在同一条叙事里。</h2>
                </div>

                <div class="gsap-lab__footer-meta">
                    <div class="gsap-lab__footer-card">
                        <p class="gsap-lab__footer-label">Association</p>
                        <p>浙江大学学生网络空间安全协会</p>
                    </div>
                    <div class="gsap-lab__footer-card">
                        <p class="gsap-lab__footer-label">Address</p>
                        <p>浙江大学紫金港校区蒙民伟楼 226 室</p>
                    </div>
                    <div class="gsap-lab__footer-card">
                        <p class="gsap-lab__footer-label">Registry</p>
                        <p>浙 ICP 备 05074421 号-1</p>
                        <p>浙公网安备 33010602010295</p>
                    </div>
                </div>

                <div class="gsap-lab__footer-bottom">
                    <span>&copy; {{ new Date().getFullYear() }} Zhejiang University</span>
                    <RouterLink class="gsap-lab__footer-link" to="/">
                        返回主站首页
                    </RouterLink>
                </div>
            </div>
        </footer>
    </div>
</template>

<style scoped>
.gsap-lab {
    --lab-bg: #06111d;
    --lab-surface: rgba(9, 18, 32, 0.74);
    --lab-surface-strong: rgba(13, 24, 40, 0.92);
    --lab-line: rgba(88, 197, 255, 0.18);
    --lab-line-strong: rgba(88, 197, 255, 0.32);
    --lab-text: #eff7ff;
    --lab-muted: #96b7d4;
    --lab-accent: #58c5ff;
    --lab-accent-soft: rgba(88, 197, 255, 0.16);
    --lab-shadow: 0 26px 60px rgba(2, 6, 23, 0.45);
    position: relative;
    overflow: clip;
    background:
        radial-gradient(circle at top left, rgba(88, 197, 255, 0.16), transparent 30%),
        radial-gradient(circle at 80% 20%, rgba(86, 139, 255, 0.18), transparent 28%),
        linear-gradient(180deg, #07111d 0%, #091727 54%, #06111d 100%);
    color: var(--lab-text);
}

.gsap-lab__chrome {
    position: fixed;
    top: 1.1rem;
    left: 50%;
    z-index: 12;
    width: min(100% - 2rem, 1180px);
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    pointer-events: none;
}

.gsap-lab__brand,
.gsap-lab__chrome-link {
    pointer-events: auto;
}

.gsap-lab__brand {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    min-height: 2.8rem;
    padding: 0.65rem 1rem;
    border-radius: 999px;
    border: 1px solid rgba(88, 197, 255, 0.18);
    background: rgba(6, 17, 29, 0.66);
    color: var(--lab-text);
    text-decoration: none;
    backdrop-filter: blur(20px);
    box-shadow: 0 12px 32px rgba(2, 6, 23, 0.28);
}

.gsap-lab__brand-mark {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background: linear-gradient(135deg, #35b7ff 0%, #4e72ff 100%);
    box-shadow: 0 0 18px rgba(88, 197, 255, 0.4);
}

.gsap-lab__chrome-link {
    display: inline-flex;
    align-items: center;
    min-height: 2.8rem;
    padding: 0.65rem 1rem;
    border-radius: 999px;
    border: 1px solid rgba(88, 197, 255, 0.12);
    background: rgba(6, 17, 29, 0.52);
    color: rgba(239, 247, 255, 0.78);
    text-decoration: none;
    backdrop-filter: blur(18px);
    transition:
        transform 0.24s ease,
        border-color 0.24s ease,
        color 0.24s ease;
}

.gsap-lab__chrome-link:hover {
    transform: translateY(-2px);
    border-color: rgba(88, 197, 255, 0.26);
    color: var(--lab-text);
}

.gsap-lab__hero {
    position: relative;
    min-height: 100vh;
    padding: clamp(4.5rem, 9vw, 7rem) clamp(1.4rem, 3.2vw, 2.8rem)
        clamp(3rem, 7vw, 5rem);
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(300px, 0.95fr);
    gap: clamp(2rem, 4vw, 3.5rem);
    align-items: center;
}

.gsap-lab__grid,
.gsap-lab__sweep {
    position: absolute;
    inset: 0;
    pointer-events: none;
}

.gsap-lab__grid {
    background-image:
        linear-gradient(to right, rgba(88, 197, 255, 0.08) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(88, 197, 255, 0.08) 1px, transparent 1px);
    background-size: 72px 72px;
    mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.95), transparent 92%);
}

.gsap-lab__sweep {
    inset: auto auto 8% -8%;
    width: min(42rem, 74vw);
    aspect-ratio: 1;
    border-radius: 50%;
    background:
        radial-gradient(circle, rgba(88, 197, 255, 0.28) 0%, rgba(88, 197, 255, 0.08) 26%, transparent 66%),
        conic-gradient(from 90deg, transparent 0deg, rgba(88, 197, 255, 0.36) 40deg, transparent 78deg);
    filter: blur(10px);
    opacity: 0.85;
}

.gsap-lab__hero-copy,
.gsap-lab__panel {
    position: relative;
    z-index: 1;
}

.gsap-lab__eyebrow,
.gsap-lab__section-kicker,
.gsap-lab__metric-eyebrow,
.gsap-lab__timeline-date,
.gsap-lab__path-step,
.gsap-lab__panel-top {
    font-family: 'IBM Plex Mono', 'JetBrains Mono', 'Cascadia Code', monospace;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.gsap-lab__eyebrow {
    margin: 0 0 1rem;
    color: var(--lab-accent);
    font-size: 0.92rem;
}

.gsap-lab__title {
    max-width: 9.5ch;
    margin: 0;
    font-size: clamp(3rem, 7vw, 5.6rem);
    line-height: 0.94;
    letter-spacing: -0.04em;
}

.gsap-lab__title span {
    display: block;
    color: rgba(239, 247, 255, 0.7);
}

.gsap-lab__lead {
    max-width: 40rem;
    margin: 1.6rem 0 0;
    color: var(--lab-muted);
    font-size: clamp(1.02rem, 1.7vw, 1.2rem);
    line-height: 1.85;
}

.gsap-lab__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 2rem;
}

.gsap-lab__hero-tag {
    padding: 0.72rem 1rem;
    border-radius: 999px;
    border: 1px solid var(--lab-line);
    background: rgba(9, 18, 32, 0.68);
    color: #d7ecff;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.02);
}

.gsap-lab__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.95rem;
    margin-top: 2.2rem;
}

.gsap-lab__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 3rem;
    padding: 0.85rem 1.2rem;
    border-radius: 999px;
    border: 1px solid transparent;
    text-decoration: none;
    font-weight: 700;
    transition:
        transform 0.24s ease,
        border-color 0.24s ease,
        background-color 0.24s ease,
        color 0.24s ease;
}

.gsap-lab__button:hover {
    transform: translateY(-2px);
}

.gsap-lab__button--primary {
    background: linear-gradient(135deg, #35b7ff 0%, #4e72ff 100%);
    color: #06111d;
}

.gsap-lab__button--ghost {
    border-color: var(--lab-line);
    color: var(--lab-text);
    background: rgba(255, 255, 255, 0.02);
}

.gsap-lab__panel-shell {
    position: relative;
    padding: 1.1rem;
    border-radius: 28px;
    border: 1px solid var(--lab-line);
    background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.06), transparent 24%),
        rgba(7, 15, 29, 0.88);
    box-shadow: var(--lab-shadow);
    backdrop-filter: blur(24px);
}

.gsap-lab__panel-top {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.35rem 0.2rem 0.8rem;
    color: rgba(150, 183, 212, 0.86);
    font-size: 0.75rem;
}

.gsap-lab__panel-screen {
    position: relative;
    min-height: 16rem;
    border-radius: 22px;
    overflow: hidden;
    border: 1px solid rgba(88, 197, 255, 0.14);
    background:
        radial-gradient(circle at center, rgba(88, 197, 255, 0.1), transparent 44%),
        linear-gradient(180deg, rgba(88, 197, 255, 0.06), rgba(88, 197, 255, 0.02));
}

.gsap-lab__ring {
    position: absolute;
    inset: 50% auto auto 50%;
    width: 13rem;
    height: 13rem;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid rgba(88, 197, 255, 0.2);
    box-shadow:
        0 0 0 1.4rem rgba(88, 197, 255, 0.04),
        0 0 0 3rem rgba(88, 197, 255, 0.02);
}

.gsap-lab__radar-line {
    position: absolute;
    inset: 50% auto auto 50%;
    width: 10rem;
    height: 2px;
    transform-origin: left center;
    transform: translateY(-50%);
    background: linear-gradient(90deg, rgba(88, 197, 255, 0.9), transparent);
    box-shadow: 0 0 18px rgba(88, 197, 255, 0.55);
}

.gsap-lab__pulse {
    position: absolute;
    inset: 50% auto auto 50%;
    border-radius: 50%;
    border: 1px solid rgba(88, 197, 255, 0.18);
    transform: translate(-50%, -50%);
    opacity: 0;
}

.gsap-lab__pulse--one {
    width: 6rem;
    height: 6rem;
}

.gsap-lab__pulse--two {
    width: 9rem;
    height: 9rem;
}

.gsap-lab__pulse--three {
    width: 12rem;
    height: 12rem;
}

.gsap-lab__trace-grid {
    position: absolute;
    inset: 0;
    overflow: hidden;
}

.gsap-lab__trace {
    position: absolute;
    left: -14%;
    width: 58%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(136, 222, 255, 0.85), transparent);
    opacity: 0;
}

.gsap-lab__blip {
    position: absolute;
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    background: #8ad8ff;
    box-shadow: 0 0 16px rgba(88, 197, 255, 0.7);
}

.gsap-lab__blip--one {
    top: 26%;
    left: 58%;
}

.gsap-lab__blip--two {
    top: 62%;
    left: 34%;
}

.gsap-lab__blip--three {
    top: 44%;
    left: 72%;
}

.gsap-lab__panel-metrics {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.9rem;
    margin-top: 1rem;
}

.gsap-lab__panel-bars {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 0.5rem;
    align-items: end;
    height: 4.8rem;
    margin-top: 1rem;
    padding: 0 0.2rem;
}

.gsap-lab__panel-bar {
    min-height: 0.7rem;
    border-radius: 999px 999px 0 0;
    background: linear-gradient(180deg, rgba(137, 222, 255, 0.95), rgba(88, 197, 255, 0.16));
    transform-origin: bottom center;
}

.gsap-lab__metric-card {
    padding: 1rem;
    border-radius: 20px;
    border: 1px solid rgba(88, 197, 255, 0.12);
    background: rgba(255, 255, 255, 0.03);
}

.gsap-lab__metric-card h2 {
    margin: 0.35rem 0 0.6rem;
    font-size: 1.05rem;
    line-height: 1.35;
}

.gsap-lab__metric-card p {
    margin: 0;
    color: var(--lab-muted);
    line-height: 1.7;
    font-size: 0.92rem;
}

.gsap-lab__metric-eyebrow {
    margin: 0;
    color: var(--lab-accent);
    font-size: 0.72rem;
}

.gsap-lab__marquee {
    position: relative;
    overflow: hidden;
    border-top: 1px solid rgba(88, 197, 255, 0.08);
    border-bottom: 1px solid rgba(88, 197, 255, 0.08);
    background: rgba(5, 14, 25, 0.72);
}

.gsap-lab__marquee-track {
    display: flex;
    width: max-content;
    padding: 1rem 0;
    will-change: transform;
}

.gsap-lab__marquee-item {
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0 1.5rem;
    color: rgba(239, 247, 255, 0.72);
    font-family: 'IBM Plex Mono', 'JetBrains Mono', 'Cascadia Code', monospace;
    letter-spacing: 0.08em;
    white-space: nowrap;
}

.gsap-lab__marquee-item::after {
    content: '';
    width: 0.38rem;
    height: 0.38rem;
    border-radius: 50%;
    background: rgba(88, 197, 255, 0.58);
    box-shadow: 0 0 12px rgba(88, 197, 255, 0.32);
}

.gsap-lab__story {
    position: relative;
    min-height: 260vh;
    padding: 0 clamp(1.2rem, 3vw, 2.6rem);
}

.gsap-lab__story-inner {
    min-height: 100vh;
    display: grid;
    grid-template-columns: minmax(0, 0.88fr) minmax(0, 1.12fr);
    align-items: center;
    gap: clamp(1.6rem, 4vw, 3.5rem);
}

.gsap-lab__story-copy h2,
.gsap-lab__section-copy h2,
.gsap-lab__footer-copy h2 {
    margin: 0.4rem 0 0;
    font-size: clamp(1.9rem, 3.4vw, 2.9rem);
    line-height: 1.08;
}

.gsap-lab__story-steps {
    display: grid;
    gap: 0.85rem;
    margin-top: 1.4rem;
}

.gsap-lab__story-step {
    padding: 0.95rem 1rem;
    border-radius: 18px;
    border: 1px solid rgba(88, 197, 255, 0.1);
    background: rgba(255, 255, 255, 0.03);
}

.gsap-lab__story-top,
.gsap-lab__story-step-index {
    font-family: 'IBM Plex Mono', 'JetBrains Mono', 'Cascadia Code', monospace;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.gsap-lab__story-top {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.35rem 0.2rem 0.8rem;
    color: rgba(150, 183, 212, 0.86);
    font-size: 0.75rem;
}

.gsap-lab__story-step-index {
    margin: 0 0 0.25rem;
    color: var(--lab-accent);
    font-size: 0.74rem;
}

.gsap-lab__story-step h3 {
    margin: 0;
    font-size: 1.08rem;
}

.gsap-lab__story-step p:last-child {
    margin: 0.4rem 0 0;
    color: var(--lab-muted);
    line-height: 1.68;
}

.gsap-lab__story-shell {
    position: relative;
    padding: 1.1rem;
    border-radius: 28px;
    border: 1px solid var(--lab-line);
    background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.06), transparent 28%),
        rgba(7, 15, 29, 0.88);
    box-shadow: var(--lab-shadow);
}

.gsap-lab__story-network {
    position: relative;
    min-height: 16rem;
    border-radius: 22px;
    overflow: hidden;
    border: 1px solid rgba(88, 197, 255, 0.12);
    background:
        radial-gradient(circle at 18% 20%, rgba(88, 197, 255, 0.12), transparent 30%),
        radial-gradient(circle at 82% 78%, rgba(88, 197, 255, 0.1), transparent 26%),
        rgba(255, 255, 255, 0.02);
}

.gsap-lab__story-rail {
    position: absolute;
    top: 50%;
    left: 12%;
    right: 12%;
    height: 1px;
    background: linear-gradient(90deg, rgba(88, 197, 255, 0.12), rgba(88, 197, 255, 0.42), rgba(88, 197, 255, 0.12));
}

.gsap-lab__story-node,
.gsap-lab__story-beam {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
}

.gsap-lab__story-node {
    width: 1rem;
    height: 1rem;
    background: rgba(88, 197, 255, 0.34);
    box-shadow: 0 0 0 0.6rem rgba(88, 197, 255, 0.04);
}

.gsap-lab__story-beam {
    left: 14%;
    width: 1.25rem;
    height: 1.25rem;
    background: #8ad8ff;
    box-shadow:
        0 0 0 0.78rem rgba(88, 197, 255, 0.08),
        0 0 22px rgba(88, 197, 255, 0.46);
}

.gsap-lab__story-bars {
    display: grid;
    grid-template-columns: repeat(8, minmax(0, 1fr));
    gap: 0.45rem;
    align-items: end;
    height: 6.3rem;
    margin-top: 1rem;
    padding: 0 0.2rem;
}

.gsap-lab__story-bar {
    min-height: 0.78rem;
    border-radius: 999px 999px 0 0;
    background: linear-gradient(180deg, rgba(137, 222, 255, 0.96), rgba(88, 197, 255, 0.14));
    transform-origin: bottom center;
}

.gsap-lab__sections {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    padding: 0 clamp(1.2rem, 3vw, 2.6rem) 3rem;
}

.gsap-lab__section {
    display: grid;
    grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
    gap: 1.6rem;
    padding: clamp(1.4rem, 2vw, 2rem);
    border-radius: 30px;
    border: 1px solid var(--lab-line);
    background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.04), transparent 42%),
        rgba(7, 15, 29, 0.72);
    box-shadow: 0 16px 40px rgba(2, 6, 23, 0.24);
}

.gsap-lab__section-copy h2 {
    margin: 0.45rem 0 0.9rem;
    font-size: clamp(1.8rem, 3.2vw, 2.65rem);
    line-height: 1.08;
}

.gsap-lab__section-copy p {
    margin: 0;
    color: var(--lab-muted);
    line-height: 1.8;
}

.gsap-lab__section-kicker {
    margin: 0;
    color: var(--lab-accent);
    font-size: 0.8rem;
}

.gsap-lab__checklist {
    display: grid;
    gap: 0.9rem;
}

.gsap-lab__checklist-item {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    min-height: 4rem;
    padding: 1rem 1.1rem;
    border-radius: 18px;
    border: 1px solid var(--lab-line);
    background: rgba(255, 255, 255, 0.03);
    color: #d9ecfd;
}

.gsap-lab__checklist-mark {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background: linear-gradient(135deg, #35b7ff 0%, #4e72ff 100%);
    box-shadow: 0 0 14px rgba(88, 197, 255, 0.4);
}

.gsap-lab__pathways-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
}

.gsap-lab__pathway {
    padding: 1.15rem;
    border-radius: 20px;
    border: 1px solid var(--lab-line);
    background: rgba(255, 255, 255, 0.03);
    transition:
        transform 0.24s ease,
        border-color 0.24s ease,
        background-color 0.24s ease;
}

.gsap-lab__pathway:hover {
    transform: translateY(-4px);
    border-color: var(--lab-line-strong);
    background: rgba(88, 197, 255, 0.06);
}

.gsap-lab__pathway h3 {
    margin: 0.4rem 0 0.65rem;
    font-size: 1.1rem;
}

.gsap-lab__pathway p {
    margin: 0;
    color: var(--lab-muted);
    line-height: 1.75;
}

.gsap-lab__path-step {
    margin: 0;
    color: var(--lab-accent);
    font-size: 0.82rem;
}

.gsap-lab__timeline-shell {
    display: grid;
    grid-template-columns: 28px minmax(0, 1fr);
    gap: 1rem;
}

.gsap-lab__timeline-rail {
    position: relative;
    border-radius: 999px;
    background: rgba(88, 197, 255, 0.1);
}

.gsap-lab__timeline-fill {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(180deg, #35b7ff 0%, #4e72ff 100%);
    box-shadow: 0 0 22px rgba(88, 197, 255, 0.26);
}

.gsap-lab__timeline-list {
    display: grid;
    gap: 1rem;
}

.gsap-lab__timeline-item {
    padding: 1.1rem 1.2rem;
    border-radius: 20px;
    border: 1px solid var(--lab-line);
    background: rgba(255, 255, 255, 0.03);
}

.gsap-lab__timeline-item h3 {
    margin: 0.35rem 0 0.55rem;
    font-size: 1.1rem;
}

.gsap-lab__timeline-item p {
    margin: 0;
    color: var(--lab-muted);
    line-height: 1.72;
}

.gsap-lab__timeline-date {
    margin: 0;
    color: var(--lab-accent);
    font-size: 0.78rem;
}

.gsap-lab__footer {
    padding: 0 clamp(1.2rem, 3vw, 2.6rem) clamp(1.2rem, 3vw, 2.4rem);
}

.gsap-lab__footer-shell {
    display: grid;
    gap: 1.2rem;
    padding: clamp(1.4rem, 2vw, 2rem);
    border-radius: 30px;
    border: 1px solid var(--lab-line);
    background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.05), transparent 38%),
        rgba(7, 15, 29, 0.9);
    box-shadow: 0 18px 44px rgba(2, 6, 23, 0.26);
}

.gsap-lab__footer-copy h2 {
    margin: 0.35rem 0 0.8rem;
    font-size: clamp(1.5rem, 3vw, 2.15rem);
    line-height: 1.14;
}

.gsap-lab__footer-copy p {
    margin: 0;
    color: var(--lab-muted);
    line-height: 1.75;
}

.gsap-lab__footer-kicker,
.gsap-lab__footer-label {
    margin: 0;
    color: var(--lab-accent);
    font-size: 0.78rem;
    font-family: 'IBM Plex Mono', 'JetBrains Mono', 'Cascadia Code', monospace;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.gsap-lab__footer-meta {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
}

.gsap-lab__footer-card {
    min-height: 100%;
    padding: 1rem 1.05rem;
    border-radius: 20px;
    border: 1px solid rgba(88, 197, 255, 0.12);
    background: rgba(255, 255, 255, 0.03);
}

.gsap-lab__footer-card p + p {
    margin-top: 0.45rem;
}

.gsap-lab__footer-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-top: 0.2rem;
    color: rgba(239, 247, 255, 0.68);
    border-top: 1px solid rgba(88, 197, 255, 0.1);
}

.gsap-lab__footer-link {
    color: var(--lab-text);
    text-decoration: none;
}

.gsap-lab__footer-link:hover {
    color: var(--lab-accent);
}

@media (max-width: 1120px) {
    .gsap-lab__hero,
    .gsap-lab__story-inner,
    .gsap-lab__section {
        grid-template-columns: 1fr;
    }

    .gsap-lab__title {
        max-width: 11ch;
    }

    .gsap-lab__story {
        min-height: auto;
        padding-top: 2rem;
        padding-bottom: 2rem;
    }

    .gsap-lab__footer-meta {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 760px) {
    .gsap-lab__chrome {
        top: 0.8rem;
        width: calc(100% - 1.2rem);
        flex-direction: column;
        align-items: stretch;
    }

    .gsap-lab__hero {
        min-height: auto;
        padding-top: 7.4rem;
    }

    .gsap-lab__panel-metrics,
    .gsap-lab__pathways-grid {
        grid-template-columns: 1fr;
    }

    .gsap-lab__story-steps {
        gap: 0.7rem;
    }

    .gsap-lab__story-bars,
    .gsap-lab__panel-bars {
        gap: 0.35rem;
    }

    .gsap-lab__timeline-shell {
        grid-template-columns: 18px minmax(0, 1fr);
    }

    .gsap-lab__footer-bottom {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>
