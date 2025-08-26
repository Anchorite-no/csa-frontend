<template>
    <csa-navbar />
    <div class="main-content-area">
        <router-view />
    </div>
    <csa-footer />
    <ConfirmDialog />
</template>

<script setup>
import CsaNavbar from './components/CsaNavbar.vue'
import CsaFooter from './components/CsaFooter.vue'
import ConfirmDialog from 'primevue/confirmdialog'
</script>

<style>
/* Global styles can go here */
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    margin-top: 0;
    margin-bottom: 6rem;
    background: var(--bg-secondary);
    color: var(--text-primary);
    transition: background-color 0.3s ease, color 0.3s ease;
}

html {
    position: relative;
    min-height: 100%;
}

body {
    margin: 0 0 3.5rem;
    background: var(--bg-secondary);
    color: var(--text-primary);
    transition: background-color 0.3s ease, color 0.3s ease;
}

.main-content-area {
    padding-top: 70px;
    padding-bottom: 56px;
    background: var(--bg-secondary);
    min-height: calc(100vh - 126px);
}
</style>
