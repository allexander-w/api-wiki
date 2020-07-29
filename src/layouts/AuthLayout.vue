<template>
    <div class="auth-page">
        <div class="header">
            <div class="logo">
                logo
            </div>
        </div>
        <router-view />
    </div>
</template>

<style lang="scss">
.auth-page {
    display: flex;
}
.header {
    min-height: 100vh;
    width: 100px;
    background-color: #0e65dd;
    position: relative;
}
.logo {
    position: fixed;
}
</style>