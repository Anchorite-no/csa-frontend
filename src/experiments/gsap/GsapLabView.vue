<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { Flip } from 'gsap/Flip'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

import {
    driftDots,
    heroWordmark,
    pathwayCards,
    signalMarquee,
    stageCards,
    timelineItems,
    traceLines,
} from './labData'

gsap.registerPlugin(
    DrawSVGPlugin,
    Flip,
    ScrambleTextPlugin,
    ScrollSmoother,
    ScrollTrigger,
    SplitText
)

const rootRef = ref(null)
const marqueeLoop = [...signalMarquee, ...signalMarquee]
const storyBars = Array.from({ length: 8 }, (_, index) => index)
const heroPaths = [
    'M18,324 C164,214 332,208 490,84',
    'M160,30 C302,126 440,164 660,150',
    'M980,56 C834,126 714,236 560,338',
    'M48,128 C236,110 420,56 738,94',
]
const storyPaths = [
    'M44,188 C128,124 206,98 286,130 C348,156 392,196 456,182 C520,168 562,128 618,76',
    'M44,214 C148,216 238,178 320,134 C416,82 514,84 620,122',
]

let ctx
let smoother
let splitInstances = []

const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

const setChromeCompact = (root, compact) => {
    const chips = root.querySelectorAll('.gsap-lab__chip')
    if (!chips.length) return

    const state = Flip.getState(chips)
    root.classList.toggle('gsap-lab--compact', compact)
    Flip.from(state, {
        absolute: true,
        duration: 0.45,
        ease: 'power2.inOut',
        stagger: 0.03,
    })
}

onMounted(async () => {
    await nextTick()

    const root = rootRef.value
    if (!root) return

    const reduced = prefersReducedMotion()
    const smootherWrapper = root.querySelector('.gsap-lab__smooth-wrapper')
    const smootherContent = root.querySelector('.gsap-lab__smooth-content')

    if (!reduced && smootherWrapper && smootherContent) {
        smoother = ScrollSmoother.create({
            wrapper: smootherWrapper,
            content: smootherContent,
            smooth: 1.18,
            effects: true,
            normalizeScroll: true,
            ignoreMobileResize: true,
        })
    }

    ctx = gsap.context(() => {
        splitInstances.forEach(instance => instance.revert())
        splitInstances = []

        const pinStory = !reduced && window.innerWidth > 960
        const hero = root.querySelector('.gsap-lab__hero')
        const chromeItems = root.querySelectorAll('.gsap-lab__chrome-animate')
        const heroBackground = root.querySelector('.gsap-lab__hero-background')
        const heroGrid = root.querySelector('.gsap-lab__hero-grid')
        const heroPoster = root.querySelector('.gsap-lab__hero-poster')
        const introWash = root.querySelector('.gsap-lab__intro-wash')
        const scanBeam = root.querySelector('.gsap-lab__scan-beam')
        const heroFlash = root.querySelector('.gsap-lab__hero-flash')
        const heroArcs = root.querySelectorAll('.gsap-lab__hero-arc')
        const driftDotEls = root.querySelectorAll('.gsap-lab__drift-dot')
        const traceEls = root.querySelectorAll('.gsap-lab__trace-line')
        const heroSvgPaths = root.querySelectorAll('.gsap-lab__hero-path')
        const eyebrow = root.querySelector('.gsap-lab__eyebrow')
        const subtitle = root.querySelector('.gsap-lab__hero-subtitle')
        const heroActions = root.querySelectorAll('.gsap-lab__hero-action')
        const wordmarkLetters = root.querySelectorAll('.gsap-lab__wordmark-letter')
        const marqueeTrack = root.querySelector('.gsap-lab__marquee-track')
        const revealBlocks = root.querySelectorAll('.gsap-lab__reveal')
        const sectionTitles = root.querySelectorAll('.gsap-lab__split-title')
        const pathwayEls = root.querySelectorAll('.gsap-lab__pathway')
        const timelineEls = root.querySelectorAll('.gsap-lab__timeline-item')
        const timelineFill = root.querySelector('.gsap-lab__timeline-fill')
        const storySection = root.querySelector('.gsap-lab__story')
        const storyInner = root.querySelector('.gsap-lab__story-inner')
        const storySteps = root.querySelectorAll('.gsap-lab__story-step')
        const storyStepTitles = root.querySelectorAll('.gsap-lab__story-step h3')
        const storyNodes = root.querySelectorAll('.gsap-lab__story-node')
        const storyBeam = root.querySelector('.gsap-lab__story-beam')
        const storyGlow = root.querySelector('.gsap-lab__story-glow')
        const storyBarsEls = root.querySelectorAll('.gsap-lab__story-bar')
        const storySvgPaths = root.querySelectorAll('.gsap-lab__story-path')

        if (subtitle) {
            splitInstances.push(new SplitText(subtitle, { type: 'chars' }))
        }
        sectionTitles.forEach(title => {
            splitInstances.push(new SplitText(title, { type: 'lines' }))
        })

        const subtitleChars = subtitle?.querySelectorAll('.char') ?? []
        const letterConfigs = heroWordmark.filter(letter => !letter.spacer)

        if (reduced) {
            gsap.set(chromeItems, { opacity: 1, y: 0 })
            gsap.set(wordmarkLetters, {
                opacity: 1,
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                filter: 'blur(0px)',
            })
            gsap.set(subtitleChars, { opacity: 1, yPercent: 0, rotateX: 0 })
            gsap.set(heroActions, { opacity: 1, y: 0, filter: 'blur(0px)' })
            gsap.set(revealBlocks, { opacity: 1, y: 0 })
            gsap.set(pathwayEls, { opacity: 1, y: 0 })
            gsap.set(timelineEls, { opacity: 1, x: 0 })
            gsap.set(timelineFill, { scaleY: 1, transformOrigin: 'top center' })
            gsap.set(storySteps, { opacity: 1, y: 0 })
            gsap.set(storyNodes, { opacity: 1, scale: 1 })
            gsap.set(storyGlow, {
                scaleX: 1,
                opacity: 0.92,
                transformOrigin: 'left center',
            })
            gsap.set(storyBarsEls, {
                scaleY: 0.76,
                transformOrigin: 'bottom center',
            })
            gsap.set(heroSvgPaths, { drawSVG: '0% 100%' })
            gsap.set(storySvgPaths, { drawSVG: '0% 100%' })
            return
        }

        gsap.set(chromeItems, { y: -18, opacity: 0 })
        gsap.set(eyebrow, { opacity: 0 })
        gsap.set(heroActions, { y: 24, opacity: 0, filter: 'blur(12px)' })
        gsap.set(subtitleChars, { yPercent: 125, opacity: 0, rotateX: -88 })
        gsap.set(revealBlocks, { y: 42, opacity: 0 })
        gsap.set(pathwayEls, { y: 28, opacity: 0 })
        gsap.set(timelineEls, { x: 28, opacity: 0 })
        gsap.set(timelineFill, { scaleY: 0, transformOrigin: 'top center' })
        gsap.set(storySteps, { y: 18, opacity: 0.2 })
        gsap.set(storyNodes, { scale: 0.72, opacity: 0.2 })
        gsap.set(storyGlow, {
            scaleX: 0.08,
            opacity: 0.34,
            transformOrigin: 'left center',
        })
        gsap.set(storyBarsEls, {
            scaleY: 0.18,
            transformOrigin: 'bottom center',
        })
        gsap.set(heroSvgPaths, { drawSVG: '0% 0%' })
        gsap.set(storySvgPaths, { drawSVG: '0% 0%' })
        gsap.set(heroBackground, { scale: 1.04, filter: 'blur(18px)' })
        gsap.set(heroGrid, { scale: 1.08, opacity: 0.1 })

        wordmarkLetters.forEach((letter, index) => {
            const config = letterConfigs[index]
            gsap.set(letter, {
                x: config.x,
                y: config.y,
                rotation: config.rotation,
                rotateX: config.rotateX,
                rotateY: config.rotateY,
                skewX: config.skewX,
                scale: config.scale,
                opacity: 0,
                filter: 'blur(20px)',
                transformOrigin: '50% 50%',
            })
        })

        const intro = gsap.timeline({
            defaults: { ease: 'power3.out' },
        })

        intro
            .to(introWash, {
                opacity: 0,
                duration: 0.52,
                ease: 'power2.out',
            })
            .to(
                chromeItems,
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.48,
                    stagger: 0.05,
                },
                0.05
            )
            .to(
                heroBackground,
                {
                    scale: 1,
                    filter: 'blur(0px)',
                    duration: 1.18,
                    ease: 'power2.out',
                },
                0.08
            )
            .to(
                heroGrid,
                {
                    scale: 1,
                    opacity: 0.32,
                    duration: 0.92,
                    ease: 'power2.out',
                },
                0.08
            )
            .fromTo(
                scanBeam,
                {
                    xPercent: -92,
                    yPercent: 12,
                    opacity: 0,
                    scale: 0.82,
                },
                {
                    xPercent: 6,
                    yPercent: 0,
                    opacity: 0.95,
                    scale: 1,
                    duration: 0.82,
                    ease: 'power4.out',
                },
                0.12
            )
            .to(
                heroSvgPaths,
                {
                    drawSVG: '0% 100%',
                    duration: 0.96,
                    stagger: 0.07,
                    ease: 'power2.out',
                },
                0.18
            )
            .fromTo(
                heroArcs,
                {
                    scale: 0.84,
                    opacity: 0,
                    rotation: -14,
                },
                {
                    scale: 1,
                    opacity: 1,
                    rotation: 0,
                    duration: 1,
                    stagger: 0.08,
                    ease: 'power2.out',
                },
                0.22
            )
            .to(
                wordmarkLetters,
                {
                    x: 0,
                    y: 0,
                    rotation: 0,
                    rotateX: 0,
                    rotateY: 0,
                    skewX: 0,
                    scale: 1,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: index => letterConfigs[index].duration ?? 0.82,
                    stagger: {
                        each: 0.06,
                        from: 'random',
                    },
                    ease: 'back.out(2.2)',
                },
                0.28
            )
            .to(
                wordmarkLetters,
                {
                    yPercent: index => (index % 2 === 0 ? -3.4 : 3.4),
                    duration: 0.16,
                    stagger: 0.03,
                    ease: 'power2.out',
                },
                0.94
            )
            .to(
                wordmarkLetters,
                {
                    yPercent: 0,
                    duration: 0.42,
                    stagger: 0.03,
                    ease: 'elastic.out(1, 0.48)',
                },
                1.06
            )
            .fromTo(
                heroFlash,
                {
                    scaleX: 0.18,
                    opacity: 0.92,
                },
                {
                    scaleX: 1.18,
                    opacity: 0,
                    duration: 0.38,
                    ease: 'power1.out',
                },
                0.74
            )
            .to(
                eyebrow,
                {
                    opacity: 1,
                    duration: 0.1,
                },
                0.88
            )
            .to(
                eyebrow,
                {
                    duration: 1,
                    scrambleText: {
                        text: eyebrow?.dataset.text,
                        chars: 'ZJUCSA01',
                        speed: 0.42,
                    },
                },
                0.9
            )
            .to(
                subtitleChars,
                {
                    yPercent: 0,
                    opacity: 1,
                    rotateX: 0,
                    duration: 0.56,
                    stagger: 0.018,
                    ease: 'power2.out',
                },
                1
            )
            .to(
                heroActions,
                {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 0.46,
                    stagger: 0.08,
                },
                1.12
            )

        gsap.to(scanBeam, {
            xPercent: 26,
            yPercent: -12,
            duration: 5.6,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        })
        gsap.to(heroArcs, {
            rotate: index => [16, -10, 12][index % 3],
            xPercent: index => [4, -3, 2][index % 3],
            yPercent: index => [3, -4, 5][index % 3],
            duration: index => 8 + index * 1.1,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        })
        gsap.to(driftDotEls, {
            y: index => (index % 2 === 0 ? -18 : 18),
            x: index => (index % 3 === 0 ? 14 : -12),
            opacity: 0.22,
            scale: 0.72,
            duration: 2.8,
            repeat: -1,
            yoyo: true,
            stagger: 0.12,
            ease: 'sine.inOut',
        })
        gsap.fromTo(
            traceEls,
            {
                xPercent: -122,
                opacity: 0,
            },
            {
                xPercent: 136,
                opacity: 0.92,
                duration: 1.8,
                repeat: -1,
                stagger: 0.2,
                ease: 'none',
            }
        )
        gsap.to(wordmarkLetters, {
            yPercent: index => [0, -1.8, 1.4, -1.2, 1.1, -1.6][index % 6],
            rotation: index => [0.2, -0.34, 0.24, -0.28, 0.22, -0.18][index % 6],
            duration: index => 3.1 + index * 0.18,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 1.7,
        })
        gsap.to(heroSvgPaths, {
            strokeOpacity: 0.9,
            duration: 1.6,
            stagger: 0.08,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        })
        gsap.to(marqueeTrack, {
            xPercent: -50,
            duration: 17,
            repeat: -1,
            ease: 'none',
        })
        gsap.to(heroPoster, {
            y: -44,
            scale: 0.95,
            opacity: 0.82,
            ease: 'none',
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        })
        gsap.to(heroBackground, {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        })

        ScrollTrigger.create({
            trigger: hero,
            start: 'bottom top+=36',
            onEnter: () => setChromeCompact(root, true),
            onLeaveBack: () => setChromeCompact(root, false),
        })

        revealBlocks.forEach(block => {
            const titleLines = block.querySelectorAll('.line')

            gsap.to(block, {
                y: 0,
                opacity: 1,
                duration: 0.82,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: block,
                    start: 'top 84%',
                    once: true,
                },
            })

            if (titleLines.length) {
                gsap.fromTo(
                    titleLines,
                    {
                        yPercent: 120,
                        opacity: 0,
                    },
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 0.72,
                        stagger: 0.08,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: block,
                            start: 'top 84%',
                            once: true,
                        },
                    }
                )
            }
        })

        gsap.to(pathwayEls, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.gsap-lab__pathways-grid',
                start: 'top 84%',
                once: true,
            },
        })
        gsap.to(timelineFill, {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: '.gsap-lab__timeline-shell',
                start: 'top 80%',
                end: 'bottom 72%',
                scrub: true,
            },
        })
        timelineEls.forEach((item, index) => {
            gsap.to(item, {
                x: 0,
                opacity: 1,
                duration: 0.66,
                ease: 'power3.out',
                delay: index * 0.04,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 86%',
                    once: true,
                },
            })
        })

        if (storySection && storyInner && storySteps.length && storyNodes.length) {
            const storyTimeline = gsap.timeline({
                defaults: { ease: 'power2.inOut' },
                scrollTrigger: {
                    trigger: storySection,
                    start: 'top top',
                    end: pinStory ? '+=230%' : 'bottom bottom',
                    scrub: pinStory,
                    pin: pinStory ? storyInner : false,
                },
            })

            storyTimeline
                .to(
                    storySvgPaths,
                    {
                        drawSVG: '0% 100%',
                        duration: 0.66,
                        stagger: 0.08,
                        ease: 'power2.out',
                    },
                    0
                )
                .to(
                    storyBeam,
                    {
                        left: '87%',
                        duration: stageCards.length,
                        ease: 'none',
                    },
                    0
                )
                .to(
                    storyGlow,
                    {
                        scaleX: 1,
                        opacity: 0.94,
                        duration: stageCards.length,
                        ease: 'none',
                    },
                    0
                )

            stageCards.forEach((step, index) => {
                const position = index

                storyTimeline
                    .to(storySteps[index], { y: 0, opacity: 1, duration: 0.26 }, position)
                    .to(
                        storyNodes[index],
                        { scale: 1.28, opacity: 1, duration: 0.26 },
                        position
                    )
                    .to(
                        storyStepTitles[index],
                        {
                            duration: 0.24,
                            scrambleText: {
                                text: step.title,
                                chars: '01ZJUCSA',
                                speed: 0.34,
                            },
                        },
                        position
                    )
                    .to(
                        storyBarsEls,
                        {
                            scaleY: barIndex =>
                                [0.28, 0.58, 0.96, 0.38, 1.08, 0.74, 0.46, 0.88][
                                    (barIndex + index) % 8
                                ],
                            duration: 0.32,
                            stagger: 0.024,
                        },
                        position
                    )

                if (index > 0) {
                    storyTimeline
                        .to(
                            storySteps[index - 1],
                            { y: -10, opacity: 0.28, duration: 0.2 },
                            position
                        )
                        .to(
                            storyNodes[index - 1],
                            { scale: 0.82, opacity: 0.3, duration: 0.2 },
                            position
                        )
                }
            })
        }

        ScrollTrigger.refresh()
    }, root)
})

onUnmounted(() => {
    splitInstances.forEach(instance => instance.revert())
    splitInstances = []
    ctx?.revert()
    smoother?.kill()
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<template>
    <div ref="rootRef" class="gsap-lab">
        <header class="gsap-lab__chrome">
            <RouterLink class="gsap-lab__chip gsap-lab__chrome-animate" to="/">
                <span class="gsap-lab__chip-dot"></span>
                <span>ZJU CSA</span>
            </RouterLink>
            <a class="gsap-lab__chip gsap-lab__chip--ghost gsap-lab__chrome-animate" href="#gsap-lab-story">
                进入滚动
            </a>
        </header>

        <div class="gsap-lab__smooth-wrapper">
            <div class="gsap-lab__smooth-content">
                <section class="gsap-lab__hero">
                    <div class="gsap-lab__hero-background">
                        <div class="gsap-lab__intro-wash"></div>
                        <div class="gsap-lab__hero-grid"></div>
                        <div class="gsap-lab__hero-noise"></div>
                        <div class="gsap-lab__scan-beam"></div>
                        <div class="gsap-lab__hero-flash"></div>
                        <div class="gsap-lab__hero-arc gsap-lab__hero-arc--one" data-speed="1.08"></div>
                        <div class="gsap-lab__hero-arc gsap-lab__hero-arc--two" data-speed="0.92"></div>
                        <div class="gsap-lab__hero-arc gsap-lab__hero-arc--three" data-speed="1.14"></div>
                        <span
                            v-for="(dot, index) in driftDots"
                            :key="`${dot.top}-${dot.left}-${index}`"
                            class="gsap-lab__drift-dot"
                            :style="{ top: dot.top, left: dot.left }"
                        ></span>
                        <span
                            v-for="(trace, index) in traceLines"
                            :key="`${trace.top}-${trace.width}-${index}`"
                            class="gsap-lab__trace-line"
                            :style="{ top: trace.top, width: trace.width, transform: `rotate(${trace.rotation})` }"
                        ></span>
                        <svg class="gsap-lab__hero-svg" viewBox="0 0 1000 400" preserveAspectRatio="none">
                            <path
                                v-for="(path, index) in heroPaths"
                                :key="path"
                                class="gsap-lab__hero-path"
                                :class="`gsap-lab__hero-path--${index + 1}`"
                                :d="path"
                            />
                        </svg>
                    </div>

                    <div class="gsap-lab__hero-poster" data-speed="1.02">
                        <p class="gsap-lab__eyebrow" data-text="IMMERSIVE PORTAL / ZHEJIANG UNIVERSITY">
                            IMMERSIVE PORTAL / ZHEJIANG UNIVERSITY
                        </p>
                        <h1 class="gsap-lab__wordmark" aria-label="ZJU CSA">
                            <template v-for="(letter, index) in heroWordmark" :key="`${letter.char}-${index}`">
                                <span
                                    v-if="letter.spacer"
                                    class="gsap-lab__wordmark-spacer"
                                    aria-hidden="true"
                                ></span>
                                <span v-else class="gsap-lab__wordmark-letter">
                                    {{ letter.char }}
                                </span>
                            </template>
                        </h1>
                        <p class="gsap-lab__hero-subtitle">浙江大学学生网络空间安全协会沉浸首页实验</p>
                        <div class="gsap-lab__actions">
                            <a
                                class="gsap-lab__button gsap-lab__button--primary gsap-lab__hero-action"
                                href="#gsap-lab-story"
                            >
                                进入滚动实验
                            </a>
                            <RouterLink
                                class="gsap-lab__button gsap-lab__button--ghost gsap-lab__hero-action"
                                to="/"
                            >
                                返回主站首页
                            </RouterLink>
                        </div>
                    </div>
                </section>

                <section class="gsap-lab__marquee" aria-label="signal marquee">
                    <div class="gsap-lab__marquee-track">
                        <span
                            v-for="(item, index) in marqueeLoop"
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
                            <p class="gsap-lab__section-kicker">Story</p>
                            <h2 class="gsap-lab__split-title">进入协会，不靠长文解释。</h2>
                            <div class="gsap-lab__story-steps">
                                <article v-for="step in stageCards" :key="step.id" class="gsap-lab__story-step">
                                    <p class="gsap-lab__story-step-index">{{ step.step }}</p>
                                    <h3>{{ step.title }}</h3>
                                    <p>{{ step.body }}</p>
                                </article>
                            </div>
                        </div>

                        <div class="gsap-lab__story-visual">
                            <div class="gsap-lab__story-top">
                                <span>MISSION FLOW</span>
                                <span>ZJU CSA</span>
                            </div>
                            <div class="gsap-lab__story-network">
                                <svg class="gsap-lab__story-svg" viewBox="0 0 660 260" preserveAspectRatio="none">
                                    <path
                                        v-for="path in storyPaths"
                                        :key="path"
                                        class="gsap-lab__story-path"
                                        :d="path"
                                    />
                                </svg>
                                <div class="gsap-lab__story-rail"></div>
                                <div class="gsap-lab__story-glow"></div>
                                <span
                                    v-for="(step, index) in stageCards"
                                    :key="`${step.id}-node`"
                                    class="gsap-lab__story-node"
                                    :style="{ left: `${14 + index * 23}%` }"
                                ></span>
                                <div class="gsap-lab__story-beam"></div>
                            </div>
                            <div class="gsap-lab__story-bars">
                                <span v-for="bar in storyBars" :key="bar" class="gsap-lab__story-bar"></span>
                            </div>
                        </div>
                    </div>
                </section>

                <main class="gsap-lab__sections">
                    <section class="gsap-lab__support gsap-lab__reveal">
                        <div class="gsap-lab__support-copy">
                            <p class="gsap-lab__section-kicker">Proof</p>
                            <h2 class="gsap-lab__split-title">四条入口，一条脉搏。</h2>
                        </div>
                        <div class="gsap-lab__support-layout">
                            <div class="gsap-lab__pathways-grid">
                                <article v-for="pathway in pathwayCards" :key="pathway.id" class="gsap-lab__pathway">
                                    <p class="gsap-lab__path-step">{{ pathway.step }}</p>
                                    <h3>{{ pathway.title }}</h3>
                                    <p>{{ pathway.body }}</p>
                                </article>
                            </div>
                            <div class="gsap-lab__timeline-shell">
                                <div class="gsap-lab__timeline-rail">
                                    <div class="gsap-lab__timeline-fill"></div>
                                </div>
                                <div class="gsap-lab__timeline-list">
                                    <article v-for="item in timelineItems" :key="item.title" class="gsap-lab__timeline-item">
                                        <p class="gsap-lab__timeline-date">{{ item.date }}</p>
                                        <h3>{{ item.title }}</h3>
                                        <p>{{ item.description }}</p>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <footer class="gsap-lab__footer">
                    <div class="gsap-lab__footer-shell gsap-lab__reveal">
                        <div class="gsap-lab__footer-copy">
                            <p class="gsap-lab__footer-kicker">Portal Footer / Registry</p>
                            <h2 class="gsap-lab__split-title">备案与身份，一起收束。</h2>
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
                                <p>浙 ICP 备 05074421 号 1</p>
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
        </div>
    </div>
</template>

<style scoped>
.gsap-lab {
    --bg: #050806;
    --surface: rgba(8, 12, 9, 0.72);
    --surface-soft: rgba(13, 19, 14, 0.62);
    --text: #eff7eb;
    --muted: #9cac96;
    --accent: #b5ff50;
    --line: rgba(181, 255, 80, 0.16);
    --line-strong: rgba(181, 255, 80, 0.32);
    --shadow: 0 28px 80px rgba(0, 0, 0, 0.46);
    position: relative;
    min-height: 100vh;
    overflow: clip;
    color: var(--text);
    background:
        radial-gradient(circle at 10% 12%, rgba(181, 255, 80, 0.14), transparent 28%),
        radial-gradient(circle at 82% 18%, rgba(181, 255, 80, 0.09), transparent 26%),
        linear-gradient(180deg, #050806 0%, #090e0a 55%, #050806 100%);
}

.gsap-lab__smooth-wrapper,
.gsap-lab__smooth-content {
    position: relative;
}

.gsap-lab__chrome {
    position: fixed;
    top: 1.05rem;
    left: 50%;
    z-index: 20;
    width: min(100% - 2rem, 1180px);
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    pointer-events: none;
}

.gsap-lab__chip {
    pointer-events: auto;
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
    min-height: 2.8rem;
    padding: 0.68rem 1rem;
    border-radius: 999px;
    border: 1px solid var(--line);
    background: rgba(5, 8, 6, 0.68);
    backdrop-filter: blur(16px);
    color: var(--text);
    text-decoration: none;
    font-weight: 700;
    letter-spacing: 0.02em;
    transition:
        transform 0.22s ease,
        border-color 0.22s ease,
        background-color 0.22s ease;
}

.gsap-lab__chip:hover,
.gsap-lab__button:hover,
.gsap-lab__pathway:hover,
.gsap-lab__footer-link:hover {
    transform: translateY(-2px);
}

.gsap-lab__chip--ghost {
    background: rgba(255, 255, 255, 0.02);
}

.gsap-lab__chip-dot {
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 16px rgba(181, 255, 80, 0.6);
}

.gsap-lab--compact .gsap-lab__chrome {
    width: min(100% - 1.2rem, 420px);
    justify-content: center;
    gap: 0.6rem;
}

.gsap-lab--compact .gsap-lab__chip {
    min-height: 2.55rem;
    padding: 0.56rem 0.88rem;
    border-color: var(--line-strong);
    background: rgba(8, 12, 9, 0.86);
}

.gsap-lab__hero {
    position: relative;
    min-height: 100svh;
    display: grid;
    place-items: center;
    padding: 7.5rem 1.5rem 5rem;
    overflow: hidden;
}

.gsap-lab__hero-background,
.gsap-lab__intro-wash,
.gsap-lab__hero-grid,
.gsap-lab__hero-noise,
.gsap-lab__scan-beam,
.gsap-lab__hero-flash,
.gsap-lab__hero-svg {
    position: absolute;
    inset: 0;
}

.gsap-lab__hero-grid {
    background:
        linear-gradient(rgba(181, 255, 80, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(181, 255, 80, 0.1) 1px, transparent 1px);
    background-size: clamp(2.9rem, 5vw, 5rem) clamp(2.9rem, 5vw, 5rem);
    mask-image: radial-gradient(circle at center, black 52%, transparent 92%);
    opacity: 0.2;
}

.gsap-lab__hero-noise {
    background:
        radial-gradient(circle at 16% 22%, rgba(255, 255, 255, 0.08), transparent 30%),
        radial-gradient(circle at 76% 18%, rgba(181, 255, 80, 0.08), transparent 24%),
        radial-gradient(circle at 50% 78%, rgba(255, 255, 255, 0.04), transparent 34%);
    mix-blend-mode: screen;
    opacity: 0.14;
}

.gsap-lab__intro-wash {
    z-index: 3;
    background: #040604;
}

.gsap-lab__scan-beam {
    inset: 10% auto auto -14%;
    width: min(52rem, 70vw);
    height: min(52rem, 70vw);
    border-radius: 50%;
    background:
        radial-gradient(circle, rgba(181, 255, 80, 0.28) 0%, rgba(181, 255, 80, 0.08) 26%, transparent 66%),
        conic-gradient(from 90deg, transparent 0deg, rgba(181, 255, 80, 0.36) 36deg, transparent 72deg);
    filter: blur(14px);
    opacity: 0.74;
}

.gsap-lab__hero-flash {
    left: 18%;
    right: 18%;
    top: 38%;
    bottom: auto;
    height: 5rem;
    border-radius: 999px;
    background: linear-gradient(90deg, transparent, rgba(217, 255, 151, 0.86), transparent);
    opacity: 0;
    transform: scaleX(0.2);
}

.gsap-lab__hero-arc {
    position: absolute;
    border: 1px solid var(--line);
    border-radius: 999px;
    opacity: 0.42;
}

.gsap-lab__hero-arc--one {
    inset: 16% 10% auto auto;
    width: min(34rem, 46vw);
    height: min(34rem, 46vw);
}

.gsap-lab__hero-arc--two {
    inset: auto auto 10% 8%;
    width: min(28rem, 40vw);
    height: min(28rem, 40vw);
}

.gsap-lab__hero-arc--three {
    inset: 28% auto auto 18%;
    width: min(44rem, 58vw);
    height: min(18rem, 24vw);
}

.gsap-lab__drift-dot,
.gsap-lab__trace-line {
    position: absolute;
}

.gsap-lab__drift-dot {
    width: 0.58rem;
    height: 0.58rem;
    border-radius: 50%;
    background: #d5ff84;
    box-shadow: 0 0 18px rgba(181, 255, 80, 0.44);
}

.gsap-lab__trace-line {
    left: -8%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(217, 255, 151, 0.82), transparent);
    opacity: 0;
}

.gsap-lab__hero-svg {
    width: 108%;
    height: 110%;
    inset: -5% -4%;
    pointer-events: none;
}

.gsap-lab__hero-path,
.gsap-lab__story-path {
    fill: none;
    stroke: rgba(181, 255, 80, 0.44);
    stroke-linecap: round;
    stroke-width: 1.5;
}

.gsap-lab__hero-poster {
    position: relative;
    z-index: 4;
    width: min(100%, 1180px);
    display: grid;
    justify-items: center;
    gap: 1rem;
    text-align: center;
}

.gsap-lab__eyebrow,
.gsap-lab__section-kicker,
.gsap-lab__story-step-index,
.gsap-lab__timeline-date,
.gsap-lab__footer-kicker,
.gsap-lab__footer-label,
.gsap-lab__story-top,
.gsap-lab__path-step {
    margin: 0;
    color: var(--accent);
    font-family: 'IBM Plex Mono', 'JetBrains Mono', 'Cascadia Code', monospace;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.gsap-lab__eyebrow,
.gsap-lab__section-kicker,
.gsap-lab__footer-kicker {
    font-size: 0.84rem;
}

.gsap-lab__wordmark {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(0.16rem, 1vw, 0.48rem);
    margin: 0;
    font-family: 'Space Grotesk', 'IBM Plex Sans', 'Segoe UI', sans-serif;
    font-size: clamp(4.8rem, 17vw, 11.8rem);
    font-weight: 700;
    line-height: 0.88;
    letter-spacing: -0.09em;
}

.gsap-lab__wordmark-letter,
.gsap-lab__wordmark-spacer {
    display: inline-block;
}

.gsap-lab__wordmark-letter {
    text-shadow:
        0 0 26px rgba(181, 255, 80, 0.16),
        0 0 70px rgba(181, 255, 80, 0.1);
}

.gsap-lab__wordmark-spacer {
    width: clamp(0.65rem, 2.5vw, 1.5rem);
}

.gsap-lab__hero-subtitle {
    max-width: 30rem;
    margin: 0;
    color: var(--muted);
    font-size: clamp(1rem, 1.85vw, 1.18rem);
    line-height: 1.7;
}

.gsap-lab__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.95rem;
    margin-top: 0.3rem;
}

.gsap-lab__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 3rem;
    padding: 0.86rem 1.24rem;
    border-radius: 999px;
    border: 1px solid transparent;
    text-decoration: none;
    font-weight: 700;
    transition:
        transform 0.22s ease,
        border-color 0.22s ease,
        background-color 0.22s ease;
}

.gsap-lab__button--primary {
    background: linear-gradient(135deg, #d8ff8d 0%, #92ff24 100%);
    color: #041103;
}

.gsap-lab__button--ghost {
    border-color: var(--line);
    background: rgba(255, 255, 255, 0.02);
    color: var(--text);
}

.gsap-lab__marquee {
    overflow: hidden;
    border-top: 1px solid rgba(181, 255, 80, 0.08);
    border-bottom: 1px solid rgba(181, 255, 80, 0.08);
    background: rgba(7, 11, 8, 0.78);
}

.gsap-lab__marquee-track {
    display: flex;
    width: max-content;
    padding: 1rem 0;
}

.gsap-lab__marquee-item {
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0 1.45rem;
    color: rgba(239, 247, 235, 0.76);
    font-family: 'IBM Plex Mono', 'JetBrains Mono', 'Cascadia Code', monospace;
    white-space: nowrap;
}

.gsap-lab__marquee-item::after {
    content: '';
    width: 0.38rem;
    height: 0.38rem;
    border-radius: 50%;
    background: rgba(181, 255, 80, 0.56);
}

.gsap-lab__story,
.gsap-lab__support,
.gsap-lab__footer-shell {
    width: min(100% - 2rem, 1180px);
    margin: 0 auto;
}

.gsap-lab__story {
    min-height: 220vh;
    padding: 5rem 0 4rem;
}

.gsap-lab__story-inner {
    min-height: 100svh;
    display: grid;
    grid-template-columns: minmax(0, 0.86fr) minmax(0, 1.14fr);
    align-items: center;
    gap: clamp(2rem, 5vw, 5rem);
}

.gsap-lab__story-copy,
.gsap-lab__support-copy,
.gsap-lab__footer-copy {
    display: grid;
    gap: 1.1rem;
}

.gsap-lab__story-copy h2,
.gsap-lab__support-copy h2,
.gsap-lab__footer-copy h2 {
    margin: 0;
    max-width: 10ch;
    font-family: 'Space Grotesk', 'IBM Plex Sans', 'Segoe UI', sans-serif;
    font-size: clamp(2.2rem, 5vw, 4.6rem);
    line-height: 0.94;
    letter-spacing: -0.05em;
}

.gsap-lab__story-steps {
    display: grid;
    gap: 0.95rem;
}

.gsap-lab__story-step,
.gsap-lab__pathway,
.gsap-lab__timeline-item,
.gsap-lab__footer-card {
    position: relative;
    padding: 1.05rem 1.1rem 1.08rem;
    border: 1px solid var(--line);
    border-radius: 1.1rem;
    background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent),
        rgba(13, 19, 14, 0.62);
    box-shadow: var(--shadow);
    backdrop-filter: blur(18px);
}

.gsap-lab__story-step h3,
.gsap-lab__pathway h3,
.gsap-lab__timeline-item h3 {
    margin: 0.4rem 0 0.45rem;
    font-size: 1.08rem;
}

.gsap-lab__story-step p:last-child,
.gsap-lab__pathway p:last-child,
.gsap-lab__timeline-item p:last-child,
.gsap-lab__footer-card p {
    margin: 0;
    color: var(--muted);
    line-height: 1.6;
}

.gsap-lab__story-visual {
    position: relative;
    display: grid;
    gap: 1.2rem;
}

.gsap-lab__story-top {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    font-size: 0.76rem;
}

.gsap-lab__story-network {
    position: relative;
    min-height: clamp(18rem, 42vw, 28rem);
    border-radius: 1.8rem;
    border: 1px solid var(--line);
    background:
        radial-gradient(circle at 30% 30%, rgba(181, 255, 80, 0.12), transparent 36%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(0, 0, 0, 0.18)),
        rgba(9, 13, 10, 0.82);
    overflow: hidden;
    box-shadow: var(--shadow);
}

.gsap-lab__story-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
}

.gsap-lab__story-rail,
.gsap-lab__story-glow {
    position: absolute;
    left: 10%;
    right: 10%;
    top: 50%;
    height: 1px;
    transform: translateY(-50%);
}

.gsap-lab__story-rail {
    background: linear-gradient(90deg, transparent, rgba(181, 255, 80, 0.22), transparent);
}

.gsap-lab__story-glow {
    transform: translateY(-50%) scaleX(0.08);
    transform-origin: left center;
    background: linear-gradient(90deg, rgba(181, 255, 80, 0.9), rgba(181, 255, 80, 0.12));
    filter: blur(8px);
    opacity: 0.42;
}

.gsap-lab__story-node {
    position: absolute;
    top: 50%;
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid rgba(181, 255, 80, 0.56);
    background: rgba(5, 8, 6, 0.92);
    box-shadow: 0 0 0 0.35rem rgba(181, 255, 80, 0.06);
}

.gsap-lab__story-beam {
    position: absolute;
    left: 12%;
    top: 50%;
    width: 2.8rem;
    height: 2.8rem;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle, rgba(217, 255, 151, 0.88), rgba(181, 255, 80, 0));
    filter: blur(6px);
}

.gsap-lab__story-bars {
    display: grid;
    grid-template-columns: repeat(8, minmax(0, 1fr));
    gap: 0.7rem;
    align-items: end;
    min-height: 6rem;
}

.gsap-lab__story-bar {
    min-height: 2.6rem;
    border-radius: 999px;
    background: linear-gradient(180deg, rgba(181, 255, 80, 0.88), rgba(181, 255, 80, 0.12));
    box-shadow: 0 0 18px rgba(181, 255, 80, 0.18);
}

.gsap-lab__sections {
    padding: 0 0 5rem;
}

.gsap-lab__support {
    display: grid;
    gap: 2rem;
    padding: 1rem 0 0;
}

.gsap-lab__support-layout {
    display: grid;
    grid-template-columns: minmax(0, 1.02fr) minmax(0, 0.98fr);
    gap: clamp(1.3rem, 4vw, 2.8rem);
}

.gsap-lab__pathways-grid {
    display: grid;
    gap: 0.95rem;
}

.gsap-lab__path-step,
.gsap-lab__timeline-date,
.gsap-lab__footer-label,
.gsap-lab__story-step-index {
    font-size: 0.76rem;
}

.gsap-lab__timeline-shell {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 1rem;
    align-items: start;
}

.gsap-lab__timeline-rail {
    position: relative;
    width: 3px;
    min-height: 100%;
    border-radius: 999px;
    background: rgba(181, 255, 80, 0.12);
    overflow: hidden;
}

.gsap-lab__timeline-fill {
    position: absolute;
    inset: 0;
    transform: scaleY(0);
    transform-origin: top center;
    background: linear-gradient(180deg, rgba(181, 255, 80, 0.96), rgba(181, 255, 80, 0.08));
}

.gsap-lab__timeline-list {
    display: grid;
    gap: 0.95rem;
}

.gsap-lab__footer {
    padding: 0 0 2.6rem;
}

.gsap-lab__footer-shell {
    display: grid;
    gap: 1.4rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(181, 255, 80, 0.1);
}

.gsap-lab__footer-meta {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.95rem;
}

.gsap-lab__footer-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    color: var(--muted);
    font-size: 0.92rem;
}

.gsap-lab__footer-link {
    color: var(--text);
    text-decoration: none;
    font-weight: 700;
    transition: transform 0.22s ease;
}

@media (max-width: 1120px) {
    .gsap-lab__story-inner,
    .gsap-lab__support-layout,
    .gsap-lab__footer-meta {
        grid-template-columns: 1fr;
    }

    .gsap-lab__story {
        min-height: auto;
    }

    .gsap-lab__story-copy h2,
    .gsap-lab__support-copy h2,
    .gsap-lab__footer-copy h2 {
        max-width: 12ch;
    }
}

@media (max-width: 760px) {
    .gsap-lab__chrome {
        width: min(100% - 1rem, 100%);
        top: 0.7rem;
        gap: 0.5rem;
    }

    .gsap-lab__chip {
        min-height: 2.55rem;
        padding: 0.56rem 0.84rem;
        font-size: 0.92rem;
    }

    .gsap-lab__hero {
        padding: 6.4rem 1rem 4.25rem;
    }

    .gsap-lab__wordmark {
        font-size: clamp(3.6rem, 21vw, 6.2rem);
        flex-wrap: wrap;
    }

    .gsap-lab__wordmark-spacer {
        display: none;
    }

    .gsap-lab__actions {
        width: 100%;
        flex-direction: column;
    }

    .gsap-lab__button {
        width: 100%;
    }

    .gsap-lab__story,
    .gsap-lab__support,
    .gsap-lab__footer-shell {
        width: min(100% - 1rem, 100%);
    }

    .gsap-lab__story-network {
        min-height: 16rem;
    }

    .gsap-lab__story-bars {
        gap: 0.38rem;
    }

    .gsap-lab__footer-bottom {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>
