<template>
    <div class="integrations">
        <div class="breadcrumbs">
            <router-link to='/account' class="br-general br-link">
                Настройки
            </router-link>
            <span class="br-general brc-slash"> / </span>
            <span class="br-general brc-active">Внешние интеграции</span>
        </div>

        <button class="transparent-button integration-btn">Добавить приложение</button>

        <div class="main-title">Подключенные интеграции</div>
    </div>
</template>

<style lang="scss">
.integrations {
    padding: 50px;
}
.integration-btn {
    margin: 20px 0 30px;
}
</style>