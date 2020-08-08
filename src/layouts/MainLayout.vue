<template>
    <div class="main-page">
        <Sidebar />
        <div class="main-window">
            <router-view />
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
export default {
    name: 'MainLayout',
    components: {
        Sidebar
    }
}
</script>

<style lang="scss">
.main-window {
    overflow-x: auto;
}
.main-page {
    display: flex;
}
</style>