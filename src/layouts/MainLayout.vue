<template>
    <div class="main-page">
        <Sidebar />
        <router-view />
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

.main-page {
    display: flex;
}
</style>