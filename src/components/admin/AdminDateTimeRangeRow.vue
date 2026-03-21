<script setup>
import AdminFormRow from './AdminFormRow.vue'

const startValue = defineModel('start', {
    default: null,
})

const endValue = defineModel('end', {
    default: null,
})

const props = defineProps({
    startLabel: {
        type: String,
        default: '',
    },
    endLabel: {
        type: String,
        default: '',
    },
    wrapperClass: {
        type: [String, Array, Object],
        default: '',
    },
    startRowClass: {
        type: [String, Array, Object],
        default: '',
    },
    endRowClass: {
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
    startFieldClass: {
        type: [String, Array, Object],
        default: '',
    },
    endFieldClass: {
        type: [String, Array, Object],
        default: '',
    },
    pickerClass: {
        type: [String, Array, Object],
        default: '',
    },
    startPickerClass: {
        type: [String, Array, Object],
        default: '',
    },
    endPickerClass: {
        type: [String, Array, Object],
        default: '',
    },
    labelWidth: {
        type: String,
        default: '',
    },
    compact: {
        type: Boolean,
        default: false,
    },
    stacked: {
        type: Boolean,
        default: false,
    },
    pickerProps: {
        type: Object,
        default: () => ({}),
    },
    startPickerProps: {
        type: Object,
        default: () => ({}),
    },
    endPickerProps: {
        type: Object,
        default: () => ({}),
    },
})

const defaultPickerProps = {
    showTime: true,
    hourFormat: '24',
    fluid: true,
    dateFormat: 'yy-mm-dd',
}

const startPickerBindings = computed(() => ({
    ...defaultPickerProps,
    ...props.pickerProps,
    ...props.startPickerProps,
}))

const endPickerBindings = computed(() => ({
    ...defaultPickerProps,
    ...props.pickerProps,
    ...props.endPickerProps,
}))
</script>

<template>
    <div
        :class="[
            'admin-date-time-range',
            { 'admin-date-time-range--stacked': stacked },
            wrapperClass,
        ]"
    >
        <AdminFormRow
            :label="startLabel"
            :row-class="startRowClass"
            :label-class="labelClass"
            :field-class="[fieldClass, startFieldClass]"
            :label-width="labelWidth"
            :compact="compact"
        >
            <DatePicker
                v-model="startValue"
                :class="[pickerClass, startPickerClass]"
                v-bind="startPickerBindings"
            />
        </AdminFormRow>

        <AdminFormRow
            :label="endLabel"
            :row-class="endRowClass"
            :label-class="labelClass"
            :field-class="[fieldClass, endFieldClass]"
            :label-width="labelWidth"
            :compact="compact"
        >
            <DatePicker
                v-model="endValue"
                :class="[pickerClass, endPickerClass]"
                v-bind="endPickerBindings"
            />
        </AdminFormRow>
    </div>
</template>

<style scoped>
.admin-date-time-range {
    display: flex;
    gap: 2rem;
}

.admin-date-time-range > * {
    flex: 1 1 0;
    min-width: 0;
}

.admin-date-time-range--stacked {
    flex-direction: column;
    gap: 0;
}

@media (max-width: 900px) {
    .admin-date-time-range {
        flex-direction: column;
        gap: 0;
    }
}
</style>
