<script setup>
const slots = useSlots()

const props = defineProps({
    label: {
        type: String,
        default: '',
    },
    rowClass: {
        type: [String, Array, Object],
        default: '',
    },
    labelClass: {
        type: [String, Array, Object],
        default: '',
    },
    fieldClass: {
        type: [String, Array, Object],
        default: '',
    },
    labelWidth: {
        type: String,
        default: '',
    },
    stacked: {
        type: Boolean,
        default: false,
    },
    compact: {
        type: Boolean,
        default: false,
    },
})

const hasLabel = computed(() => Boolean(props.label) || Boolean(slots.label))

const labelStyle = computed(() => {
    if (props.stacked || !props.labelWidth) {
        return undefined
    }

    return {
        '--admin-form-row-label-width': props.labelWidth,
    }
})
</script>

<template>
    <div
        :class="[
            'admin-form-row',
            {
                'admin-form-row--stacked': stacked,
                'admin-form-row--compact': compact,
            },
            rowClass,
        ]"
    >
        <div
            v-if="hasLabel"
            :class="['admin-form-row__label', labelClass]"
            :style="labelStyle"
        >
            <slot name="label">{{ label }}</slot>
        </div>

        <div :class="['admin-form-row__field', fieldClass]">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.admin-form-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.admin-form-row__label {
    flex: 0 0 auto;
    min-width: var(--admin-form-row-label-width, auto);
    color: var(--text-primary);
    line-height: 1.5;
}

.admin-form-row__field {
    flex: 1 1 auto;
    min-width: 0;
}

.admin-form-row--compact {
    margin-bottom: 0.75rem;
}

.admin-form-row--stacked {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
}

.admin-form-row--stacked .admin-form-row__label {
    min-width: 0;
}
</style>
