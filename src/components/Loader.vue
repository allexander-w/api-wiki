<template>
    <div class="loader-wrapper">
        <div class="loader">
            <i class="fas fa-circle-notch spinner"></i>
        </div>
    </div>
</template>

<style lang="scss">
.loader-wrapper {
    background-color: rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0; 
    z-index: 99;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
}
.spinner {
    font-size: 22px;
    color: blue;

    animation-name: rotation;
	animation-duration: .8s;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
}

@keyframes rotation {
    0% {
        transform:rotate(0deg);
    }
    100% {
        transform:rotate(360deg);
    }
}
</style>