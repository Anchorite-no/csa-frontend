<script setup>
import { useRoute } from 'vue-router'
import Showdown from 'showdown'

const route = useRoute()
const nid = route.params.id

const axios = inject('axios')
const converter = new Showdown.Converter()

const data = ref(null)

axios
    .get('/news/detail', {
        params: {
            nid: nid,
        },
    })
    .then(res => {
        data.value = res.data
    })
</script>

<template>
    <div class="w-[70%] mx-auto py-16">
        <div class="text-3xl font-bold mb-2">{{ data.title }}</div>
        <div class="flex flex-col gap-x-1 mb-3">
            <div v-for="tag in data.tag.split(' ')" :key="tag">
                <Tag :value="tag" class="text-nowrap"></Tag>
            </div>
        </div>
        <div class="mb-6">
            {{ new Date(data.first_publish * 1000).toLocaleDateString() }}
        </div>

        <div v-html="converter.makeHtml(data.content)"></div>
    </div>
</template>
