<template>
    <footer
        id="bottom-footer"
        class="text-center p-4 bg-neutral-100 dark:bg-neutral-800/90 border-t-2 border-neutral-200 dark:border-neutral-700/90"
    >
        <div class="flex gap-x-4 gap-y-1 justify-center flex-wrap mb-2">
            <span>© {{ new Date().getFullYear() }} 浙江大学</span>
            <span>浙ICP备05074421号-1</span>
            <span>浙公网安备33010602010295</span>
        </div>
        <div
            class="flex gap-x-4 gap-y-1 justify-center flex-wrap mb-1 font-bold"
        >
            <span> 浙江大学学生网络空间安全协会 </span>
            <span>地址: 浙江大学紫金港校区蒙民伟楼226室</span>
        </div>
        <div></div>
    </footer>
</template>

<style>
#bottom-footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 100;
}
</style>
