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
        'outdent',
        'indent',
        '|',
        'quote',
        'line',
        'code',
        'inline-code',
        'insert-before',
        'insert-after',
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
        'outdent',
        'indent',
        '|',
        'quote',
        'line',
        'code',
        'inline-code',
        'insert-before',
        'insert-after',
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
        '|',
        'content-theme',
        'code-theme',
        {
            name: 'more',
            toolbar: ['both', 'export', 'outline', 'preview', 'devtools'],
        },
    ],
    mobile: [
        'emoji',
        'link',
        'upload',
        'edit-mode',
        {
            name: 'more',
            toolbar: ['insert-after', 'fullscreen', 'preview'],
        },
    ],
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

const getEditorValue = () => editor.value?.getValue?.() ?? ''

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
