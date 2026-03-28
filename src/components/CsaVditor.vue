<script setup>
import Vditor from 'vditor'

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

const editorElement = ref(null)
const editor = ref(null)
const isApplyingExternalValue = ref(false)
const cacheId = nextEditorId()

const toolbar = computed(() => toolbarModes[props.mode] || toolbarModes.full)
const previewOptions = computed(() => ({
    actions: ['desktop', 'tablet', 'mobile'],
    ...(props.options?.preview || {}),
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

const keepMoreMenuOpenForNestedThemes = () => {
    const root = editorElement.value

    if (!root) {
        return
    }

    const nestedThemeTriggers = root.querySelectorAll(
        '.vditor-toolbar .vditor-hint > .vditor-toolbar__item > button[data-type="content-theme"], .vditor-toolbar .vditor-hint > .vditor-toolbar__item > button[data-type="code-theme"]'
    )

    nestedThemeTriggers.forEach((button) => {
        if (button.dataset.keepMoreOpenBound === 'true') {
            return
        }

        button.dataset.keepMoreOpenBound = 'true'
        button.addEventListener('click', (event) => {
            event.stopPropagation()
        })
    })
}

const decorateThemeMenus = () => {
    const root = editorElement.value

    if (!root) {
        return
    }

    const contentThemeTrigger = root.querySelector('button[data-type="content-theme"]')
    const codeThemeTrigger = root.querySelector('button[data-type="code-theme"]')

    const contentThemeButtons = Array.from(
        contentThemeTrigger?.parentElement?.querySelectorAll('.vditor-hint button[data-type]') || []
    )
    const codeThemeButtons = Array.from(
        codeThemeTrigger?.parentElement?.querySelectorAll('.vditor-hint button') || []
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
    queueMicrotask(() => {
        isApplyingExternalValue.value = false
    })
}

onMounted(() => {
    const rawOptions = props.options || {}

    editor.value = new Vditor(editorElement.value, {
        toolbar: toolbar.value,
        ...rawOptions,
        preview: previewOptions.value,
        hint: hintOptions.value,
        cache: {
            ...(rawOptions.cache || {}),
            id: cacheId,
        },
        value: props.modelValue ?? '',
        after() {
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

    requestAnimationFrame(() => {
        keepMoreMenuOpenForNestedThemes()
        decorateThemeMenus()
    })
})

watch(
    () => props.modelValue,
    (nextValue) => {
        syncEditorValue(nextValue)
    }
)

onBeforeUnmount(() => {
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
    min-width: 220px;
    padding: 0.75rem 1rem 0.75rem 4.6rem;
    text-align: left;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--csa-theme-text);
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
        linear-gradient(var(--csa-theme-text), var(--csa-theme-text)) 0.45rem 0.82rem / 1.45rem 0.16rem no-repeat,
        linear-gradient(var(--csa-theme-muted), var(--csa-theme-muted)) 0.45rem 1.12rem / 0.95rem 0.14rem no-repeat,
        linear-gradient(135deg, var(--csa-theme-bg), var(--csa-theme-surface));
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

:deep(.csa-vditor-theme-option:hover) {
    background: color-mix(in srgb, var(--csa-theme-accent) 10%, transparent);
}

:deep(.csa-vditor-theme-option--active) {
    background: color-mix(in srgb, var(--csa-theme-accent) 16%, transparent);
    color: var(--csa-theme-text);
}

:deep(.csa-vditor-theme-option--active::before) {
    border-color: color-mix(in srgb, var(--csa-theme-accent) 60%, transparent);
    box-shadow:
        0 0 0 2px color-mix(in srgb, var(--csa-theme-accent) 22%, transparent),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
}
</style>
