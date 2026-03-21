<script setup>
import AdminFormRow from './AdminFormRow.vue'

const model = defineModel({
    default: null,
})

const props = defineProps({
    label: {
        type: String,
        default: '',
    },
    options: {
        type: Array,
        default: () => [],
    },
    optionLabel: {
        type: String,
        default: 'label',
    },
    optionValue: {
        type: String,
        default: 'value',
    },
    placeholder: {
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
    selectClass: {
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
    selectProps: {
        type: Object,
        default: () => ({}),
    },
})

const mergedSelectProps = computed(() => ({
    ...props.selectProps,
}))
</script>

<template>
    <AdminFormRow
        :label="label"
        :row-class="rowClass"
        :label-class="labelClass"
        :field-class="fieldClass"
        :label-width="labelWidth"
        :stacked="stacked"
        :compact="compact"
    >
        <template v-if="$slots.label" #label>
            <slot name="label" />
        </template>

        <Select
            v-model="model"
            :options="options"
            :option-label="optionLabel"
            :option-value="optionValue"
            :placeholder="placeholder"
            :class="selectClass"
            v-bind="mergedSelectProps"
        />
    </AdminFormRow>
</template>
