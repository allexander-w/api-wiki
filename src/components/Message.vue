<template>
    <div class="message-card">
        <div class="message-wrapper">
            {{message}}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            default: () => ''
        }
    }
}
</script>

<style lang="scss">
.message-card {
    position: fixed;
    top: 50px;
    right: 50px;
}
.message-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    background-color: #0e65dd;
    border: none;
    color: #fff;
    height: 52px;
    padding: 0 15px;
    min-width: 200px;
}
</style>