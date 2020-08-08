<template>
    <div class="not-found">
        <div class="not-found-desc">
            Такой страницы не существует :(
        </div>
        <div class="error-ff">
            Ошибка 404!
        </div>
        <div class="not-found-back-home">
            <router-link to='/account'>Вернуться домой</router-link>
        </div>
    </div>
</template>

<style lang="scss">
.not-found-back-home {
    font-size: 14px;
}
.not-found {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
}
.error-ff {
    padding: 10px 0;
    font-size: 32px;
    color: rgb(70, 161, 236)
}
</style>