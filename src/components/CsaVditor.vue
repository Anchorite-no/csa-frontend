<script setup>
import Vditor from 'vditor'

const codeThemeStyleModules = import.meta.glob(
    '../../node_modules/vditor/dist/js/highlight.js/styles/*.css',
    {
        eager: true,
        import: 'default',
        query: '?raw',
    }
)

const codeThemeStyles = Object.fromEntries(
    Object.entries(codeThemeStyleModules).map(([path, styles]) => [
        path.match(/\/([^/]+)\.css$/)?.[1] || path,
        styles,
    ])
)

const toolbarModes = {
    simple: [
        'emoji',
        'headings',
        'bold',
        'italic',
        'strike',
        'link',
        '|',
        'list',
        'ordered-list',
        'check',
        '|',
        'quote',
        'line',
        'code',
        'inline-code',
        '|',
        'table',
    ],
    full: [
        'emoji',
        'headings',
        'bold',
        'italic',
        'strike',
        'link',
        '|',
        'list',
        'ordered-list',
        'check',
        '|',
        'quote',
        'line',
        'code',
        'inline-code',
        '|',
        'upload',
        'record',
        'table',
        '|',
        'undo',
        'redo',
        '|',
        'fullscreen',
        'edit-mode',
        {
            name: 'more',
            toolbar: [
                'content-theme',
                'code-theme',
                'both',
                'outline',
                'export',
            ],
        },
    ],
    mobile: [
        'emoji',
        'link',
        'upload',
        'edit-mode',
        {
            name: 'more',
            toolbar: ['fullscreen', 'content-theme', 'code-theme'],
        },
    ],
}

const defaultHintEmoji = {
    '+1': '👍',
    '-1': '👎',
    confused: '😕',
    eyes: '👀',
    heart: '❤️',
    rocket: '🚀',
    smile: '😃',
    tada: '🎉',
}

const extraHintEmoji = {
    clap: '👏',
    cry: '😢',
    fire: '🔥',
    grin: '😁',
    joy: '😂',
    laughing: '😆',
    ok_hand: '👌',
    party: '🥳',
    pray: '🙏',
    scream: '😱',
    sparkles: '✨',
    star: '⭐',
    sweat_smile: '😅',
    think: '🤔',
    thumbsdown: '👎',
    thumbsup: '👍',
    warning: '⚠️',
    wave: '👋',
    x: '❌',
    zany_face: '🤪',
}

const contentThemePreviewStyles = {
    'ant-design': {
        accent: '#1677ff',
        background: '#f5f7fa',
        muted: '#91a3b8',
        surface: '#ffffff',
        text: '#1f2a37',
    },
    dark: {
        accent: '#7c3aed',
        background: '#16181d',
        muted: '#7d8590',
        surface: '#24292f',
        text: '#f0f6fc',
    },
    light: {
        accent: '#2563eb',
        background: '#f8fafc',
        muted: '#94a3b8',
        surface: '#ffffff',
        text: '#0f172a',
    },
    wechat: {
        accent: '#07c160',
        background: '#f5f5f5',
        muted: '#8c8c8c',
        surface: '#ffffff',
        text: '#1f1f1f',
    },
}

const darkCodeThemes = new Set([
    'dracula',
    'emacs',
    'fruity',
    'monokai',
    'native',
    'paraiso-dark',
    'rainbow_dash',
    'solarized-dark',
    'solarized-dark256',
    'swapoff',
    'vim',
])

const warmCodeThemes = new Set([
    'abap',
    'algol',
    'algol_nu',
    'arduino',
    'autumn',
    'borland',
    'manni',
    'pastie',
    'perldoc',
    'tango',
    'trac',
    'xcode',
])

const coolCodeThemes = new Set([
    'colorful',
    'friendly',
    'github',
    'igor',
    'lovelace',
    'murphy',
    'paraiso-light',
    'pygments',
    'solarized-light',
    'vs',
])

const codeThemeAccentMap = {
    'ant-design': '#1677ff',
    dracula: '#ff79c6',
    github: '#0969da',
    monokai: '#ffd866',
    'monokailight': '#e36209',
    native: '#61dafb',
    'paraiso-dark': '#ffcc66',
    'paraiso-light': '#815ba4',
    'solarized-dark': '#2aa198',
    'solarized-dark256': '#b58900',
    'solarized-light': '#268bd2',
    tango: '#d95f02',
    xcode: '#0f62fe',
}

const nonHljsCodeLanguages = new Set([
    'abc',
    'echarts',
    'flowchart',
    'graphviz',
    'math',
    'mermaid',
    'mindmap',
    'plantuml',
])

const props = defineProps({
    mode: {
        type: String,
        default: 'full',
    },
    options: {
        type: Object,
        default: () => ({}),
    },
    modelValue: {
        type: String,
        default: '',
    },
})

const emit = defineEmits([
    'update:modelValue',
    'after',
    'focus',
    'blur',
    'esc',
    'ctrlEnter',
    'select',
])

const nextEditorId = () => {
    window._CSA_VDITOR_ID = window._CSA_VDITOR_ID || 0
    const editorId = window._CSA_VDITOR_ID
    window._CSA_VDITOR_ID += 1
    return `csa-vditor-${editorId}`
}

const normalizeVditorCdn = (cdn) => {
    if (!cdn) {
        return cdn
    }

    if (cdn.startsWith('https://cdn.jsdelivr.net/npm/')) {
        return cdn.replace('https://cdn.jsdelivr.net/npm', 'https://unpkg.com')
    }

    return cdn
}

const editorElement = ref(null)
const editor = ref(null)
const isApplyingExternalValue = ref(false)
const cacheId = nextEditorId()
let toolbarEnhancementFrameId = 0
let toolbarEnhancementTimeoutId = 0
const inlineCodeThemeStyleId = 'csa-vditor-hljs-style'

const toolbar = computed(() => toolbarModes[props.mode] || toolbarModes.full)
const resolvedCdn = computed(() => normalizeVditorCdn(props.options?.cdn))
const previewOptions = computed(() => ({
    actions: ['desktop', 'tablet', 'mobile'],
    ...(props.options?.preview || {}),
    theme: {
        ...(props.options?.preview?.theme || {}),
        ...(props.options?.preview?.theme?.path || resolvedCdn.value
            ? {
                  path:
                      props.options?.preview?.theme?.path ||
                      `${resolvedCdn.value}/dist/css/content-theme`,
              }
            : {}),
    },
}))
const hintOptions = computed(() => ({
    ...(props.options?.hint || {}),
    emoji: {
        ...defaultHintEmoji,
        ...extraHintEmoji,
        ...(props.options?.hint?.emoji || {}),
    },
}))

const getEditorValue = () => editor.value?.getValue?.() ?? ''
const getEditorThemeMode = () => editor.value?.vditor?.options?.theme || 'classic'
const getCurrentContentTheme = () =>
    editor.value?.vditor?.options?.preview?.theme?.current || 'light'
const getCurrentCodeTheme = () =>
    editor.value?.vditor?.options?.preview?.hljs?.style || 'github'

const getCodeThemePreviewStyles = (themeName) => {
    const accent = codeThemeAccentMap[themeName] || '#3b82f6'

    if (darkCodeThemes.has(themeName)) {
        return {
            accent,
            background: '#111827',
            muted: '#6b7280',
            surface: '#1f2937',
            text: '#e5e7eb',
        }
    }

    if (warmCodeThemes.has(themeName)) {
        return {
            accent,
            background: '#fff7ed',
            muted: '#c4b5a5',
            surface: '#ffffff',
            text: '#7c2d12',
        }
    }

    if (coolCodeThemes.has(themeName)) {
        return {
            accent,
            background: '#eff6ff',
            muted: '#93c5fd',
            surface: '#ffffff',
            text: '#1d4ed8',
        }
    }

    return {
        accent,
        background: '#f8fafc',
        muted: '#cbd5e1',
        surface: '#ffffff',
        text: '#0f172a',
    }
}

const applyInlineCodeTheme = (themeName) => {
    const styles = codeThemeStyles[themeName] || codeThemeStyles.github

    if (!styles) {
        return
    }

    document.getElementById('vditorHljsStyle')?.remove()

    let styleElement = document.getElementById(inlineCodeThemeStyleId)

    if (!(styleElement instanceof HTMLStyleElement)) {
        styleElement = document.createElement('style')
        styleElement.id = inlineCodeThemeStyleId
        document.head.appendChild(styleElement)
    }

    styleElement.textContent = styles
}

const applyPreviewStyles = (button, styles) => {
    button.classList.add('csa-vditor-theme-option')
    button.style.setProperty('--csa-theme-accent', styles.accent)
    button.style.setProperty('--csa-theme-bg', styles.background)
    button.style.setProperty('--csa-theme-muted', styles.muted)
    button.style.setProperty('--csa-theme-surface', styles.surface)
    button.style.setProperty('--csa-theme-text', styles.text)
}

const updateActiveThemeButton = (buttons, currentValue, getValue) => {
    buttons.forEach((button) => {
        button.classList.toggle('csa-vditor-theme-option--active', getValue(button) === currentValue)
    })
}

const getSubmenuPanel = (triggerButton) =>
    Array.from(triggerButton?.parentElement?.children || []).find(
        (element) => element.classList?.contains('vditor-hint')
    )

const getMoreMenuPanel = () =>
    editorElement.value?.querySelector('.vditor-toolbar button[data-type="more"]')
        ?.nextElementSibling

const refreshCodeThemeInEditor = () => {
    const instance = editor.value
    const vditorState = instance?.vditor
    const root = editorElement.value

    if (!instance || !vditorState || !root) {
        return false
    }

    Vditor.highlightRender(
        { ...vditorState.options.preview.hljs },
        root,
        vditorState.options.cdn
    )
    applyInlineCodeTheme(getCurrentCodeTheme())

    root.querySelectorAll('.vditor-wysiwyg__preview code, .vditor-ir__preview code').forEach(
        (codeElement) => {
            if (!(codeElement instanceof HTMLElement)) {
                return
            }

            const language = codeElement.className
                .split(/\s+/)
                .find((className) => className.startsWith('language-'))
                ?.replace('language-', '')

            if (!language || nonHljsCodeLanguages.has(language)) {
                return
            }

            codeElement.classList.add('hljs')
        }
    )

    if (vditorState.preview?.element?.style.display !== 'none') {
        instance.renderPreview()
    }

    return true
}

const applyThemeSelection = ({ contentTheme, codeTheme }) => {
    const instance = editor.value
    const vditorState = instance?.vditor

    if (!instance || !vditorState) {
        return
    }

    const nextContentTheme = contentTheme || getCurrentContentTheme()
    const nextCodeTheme = codeTheme || getCurrentCodeTheme()

    instance.setTheme(
        getEditorThemeMode(),
        nextContentTheme,
        undefined,
        previewOptions.value.theme?.path || vditorState.options.preview.theme.path
    )
    vditorState.options.preview.hljs.style = nextCodeTheme
    applyInlineCodeTheme(nextCodeTheme)

    requestAnimationFrame(() => {
        refreshCodeThemeInEditor()
        scheduleToolbarEnhancements()
    })
}

const keepMoreMenuOpenForNestedThemes = () => {
    const morePanel = getMoreMenuPanel()
    const nestedThemeTriggers =
        morePanel?.querySelectorAll(
            'button[data-type="content-theme"], button[data-type="code-theme"]'
        ) || []

    nestedThemeTriggers.forEach((button) => {
        if (button.dataset.keepMoreOpenBound === 'true') {
            return
        }

        button.dataset.keepMoreOpenBound = 'true'
        button.addEventListener('click', (event) => {
            event.stopPropagation()
        })
    })

    return nestedThemeTriggers.length > 0
}

const decorateThemeMenus = () => {
    const morePanel = getMoreMenuPanel()

    if (!morePanel) {
        return false
    }

    const contentThemeTrigger = morePanel.querySelector('button[data-type="content-theme"]')
    const codeThemeTrigger = morePanel.querySelector('button[data-type="code-theme"]')
    const contentThemePanel = getSubmenuPanel(contentThemeTrigger)
    const codeThemePanel = getSubmenuPanel(codeThemeTrigger)

    const contentThemeButtons = Array.from(
        contentThemePanel?.querySelectorAll('button[data-type]') || []
    )
    const codeThemeButtons = Array.from(
        codeThemePanel?.querySelectorAll('button') || []
    )

    contentThemeButtons.forEach((button) => {
        const themeName = button.getAttribute('data-type')
        const styles = contentThemePreviewStyles[themeName] || contentThemePreviewStyles.light
        applyPreviewStyles(button, styles)
        button.setAttribute('data-preview-label', button.textContent.trim())
    })

    codeThemeButtons.forEach((button) => {
        const themeName = button.textContent.trim()
        applyPreviewStyles(button, getCodeThemePreviewStyles(themeName))
        button.setAttribute('data-preview-label', themeName)
        button.setAttribute('data-theme-name', themeName)
    })

    const currentContentTheme =
        editor.value?.vditor?.options?.preview?.theme?.current || 'light'
    const currentCodeTheme =
        editor.value?.vditor?.options?.preview?.hljs?.style || 'github'

    updateActiveThemeButton(
        contentThemeButtons,
        currentContentTheme,
        (button) => button.getAttribute('data-type')
    )
    updateActiveThemeButton(
        codeThemeButtons,
        currentCodeTheme,
        (button) => button.getAttribute('data-theme-name')
    )

    const bindSelectionState = (panelButtons, getValue) => {
        panelButtons.forEach((button) => {
            if (button.dataset.previewBound === 'true') {
                return
            }

            button.dataset.previewBound = 'true'
            button.addEventListener('click', () => {
                updateActiveThemeButton(panelButtons, getValue(button), getValue)
            })
        })
    }

    bindSelectionState(contentThemeButtons, (button) => button.getAttribute('data-type'))
    bindSelectionState(codeThemeButtons, (button) => button.getAttribute('data-theme-name'))

    contentThemeButtons.forEach((button) => {
        if (button.dataset.themeApplyBound === 'true') {
            return
        }

        button.dataset.themeApplyBound = 'true'
        button.addEventListener('click', () => {
            applyThemeSelection({
                contentTheme: button.getAttribute('data-type'),
            })
        })
    })

    codeThemeButtons.forEach((button) => {
        if (button.dataset.themeApplyBound === 'true') {
            return
        }

        button.dataset.themeApplyBound = 'true'
        button.addEventListener('click', () => {
            applyThemeSelection({
                codeTheme: button.getAttribute('data-theme-name'),
            })
        })
    })

    return contentThemeButtons.length > 0 && codeThemeButtons.length > 0
}

const clearToolbarEnhancementSchedule = () => {
    if (toolbarEnhancementFrameId) {
        cancelAnimationFrame(toolbarEnhancementFrameId)
        toolbarEnhancementFrameId = 0
    }

    if (toolbarEnhancementTimeoutId) {
        clearTimeout(toolbarEnhancementTimeoutId)
        toolbarEnhancementTimeoutId = 0
    }
}

const scheduleToolbarEnhancements = (attempt = 0) => {
    clearToolbarEnhancementSchedule()

    toolbarEnhancementFrameId = requestAnimationFrame(() => {
        const hasNestedThemeTriggers = keepMoreMenuOpenForNestedThemes()
        const hasDecoratedThemeMenus = decorateThemeMenus()

        if ((hasNestedThemeTriggers && hasDecoratedThemeMenus) || attempt >= 12) {
            return
        }

        toolbarEnhancementTimeoutId = window.setTimeout(() => {
            scheduleToolbarEnhancements(attempt + 1)
        }, 120)
    })
}

const syncEditorValue = (nextValue) => {
    const instance = editor.value

    if (!instance) {
        return
    }

    const normalizedValue = nextValue ?? ''

    if (normalizedValue === getEditorValue()) {
        return
    }

    isApplyingExternalValue.value = true
    instance.setValue(normalizedValue)
    requestAnimationFrame(() => {
        refreshCodeThemeInEditor()
    })
    queueMicrotask(() => {
        isApplyingExternalValue.value = false
    })
}

onMounted(() => {
    const rawOptions = props.options || {}

    editor.value = new Vditor(editorElement.value, {
        toolbar: toolbar.value,
        ...rawOptions,
        ...(resolvedCdn.value ? { cdn: resolvedCdn.value } : {}),
        preview: previewOptions.value,
        hint: hintOptions.value,
        cache: {
            ...(rawOptions.cache || {}),
            id: cacheId,
        },
        value: props.modelValue ?? '',
        after() {
            scheduleToolbarEnhancements()
            requestAnimationFrame(() => {
                refreshCodeThemeInEditor()
            })
            emit('after', toRaw(editor.value))
        },
        input(value) {
            if (isApplyingExternalValue.value) {
                return
            }

            emit('update:modelValue', value)
        },
        focus(event) {
            emit('focus', event)
        },
        blur(event) {
            emit('blur', event)
        },
        esc(event) {
            emit('esc', event)
        },
        ctrlEnter(event) {
            emit('ctrlEnter', event)
        },
        select(event) {
            emit('select', event)
        },
    })

    scheduleToolbarEnhancements()
})

watch(
    () => props.modelValue,
    (nextValue) => {
        syncEditorValue(nextValue)
    }
)

onBeforeUnmount(() => {
    clearToolbarEnhancementSchedule()
    editor.value?.destroy()
    editor.value = null
})
</script>

<template>
    <div ref="editorElement" class="csa-vditor"></div>
</template>

<style scoped>
:deep(.csa-vditor-theme-option) {
    position: relative;
    display: block;
    min-width: 220px;
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 4.6rem;
    text-align: left;
    font-size: 0.9rem;
    font-weight: 600;
    color: color-mix(in srgb, var(--csa-theme-accent) 38%, #1f2937 62%);
    border-radius: 0.7rem;
    transition:
        color 0.18s ease,
        background 0.18s ease;
}

:deep(.csa-vditor-theme-option::before) {
    content: '';
    position: absolute;
    left: 0.9rem;
    top: 50%;
    width: 2.8rem;
    height: 1.9rem;
    transform: translateY(-50%);
    border: 1px solid color-mix(in srgb, var(--csa-theme-text) 12%, transparent);
    border-radius: 0.55rem;
    background:
        linear-gradient(var(--csa-theme-accent), var(--csa-theme-accent)) 0.45rem 0.45rem / 1rem 0.2rem no-repeat,
        linear-gradient(
            color-mix(in srgb, var(--csa-theme-text) 94%, var(--csa-theme-surface) 6%),
            color-mix(in srgb, var(--csa-theme-text) 94%, var(--csa-theme-surface) 6%)
        ) 0.45rem 0.82rem / 1.45rem 0.16rem no-repeat,
        linear-gradient(
            color-mix(in srgb, var(--csa-theme-muted) 92%, var(--csa-theme-surface) 8%),
            color-mix(in srgb, var(--csa-theme-muted) 92%, var(--csa-theme-surface) 8%)
        ) 0.45rem 1.12rem / 0.95rem 0.14rem no-repeat,
        linear-gradient(
            135deg,
            color-mix(in srgb, var(--csa-theme-bg) 96%, black 4%),
            color-mix(in srgb, var(--csa-theme-surface) 92%, var(--csa-theme-bg) 8%)
        );
    box-shadow:
        0 6px 12px color-mix(in srgb, var(--csa-theme-bg) 16%, transparent),
        inset 0 1px 0 rgba(255, 255, 255, 0.22);
}

:deep(.csa-vditor-theme-option:hover) {
    color: color-mix(in srgb, var(--csa-theme-accent) 48%, #111827 52%);
    background: linear-gradient(
        90deg,
        color-mix(in srgb, var(--csa-theme-accent) 10%, transparent),
        transparent 72%
    );
}

:deep(.csa-vditor-theme-option--active) {
    color: color-mix(in srgb, var(--csa-theme-accent) 56%, #111827 44%);
    background:
        linear-gradient(
            90deg,
            color-mix(in srgb, var(--csa-theme-accent) 16%, transparent),
            transparent 72%
        );
    box-shadow: inset 2px 0 0 color-mix(in srgb, var(--csa-theme-accent) 68%, transparent);
}

:deep(.csa-vditor-theme-option--active::before) {
    border-color: color-mix(in srgb, var(--csa-theme-accent) 60%, transparent);
    box-shadow:
        0 0 0 2px color-mix(in srgb, var(--csa-theme-accent) 22%, transparent),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
}
</style>
