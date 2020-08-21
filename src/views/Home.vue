<template>
  <div class="home">
    
    <section class="main-header">
      <div class="container">
        <div class="login-header">
          <div class="l-header-logo">
            <img src="https://itl.wiki/assets/img/logo.svg" alt="lamp" />
            <p class="l-header-logo-text">ITL Wiki</p>
          </div>
          <div class="l-login">
            <router-link to="/sign-in">
              <i class="fas fa-sign-in-alt sign-in-icon"></i> <span class="l-login-value">Войти</span>
            </router-link>
          </div>
        </div>

        <div class="main-login-info">
            <h2 class="login-info-title">Вовлекайте сотрудников в процесс и создавайте культуру непрерывного обмена знаниями и опытом</h2>
            <p class="login-info-desc">Постоянное развитие достигается за счет правильного управления информацией и знаниями.</p>
            <button class="login-info-btn" @click='$router.push("/register")'>
                Создать бесплатно
            </button>
        </div>
      
    </div>

    </section>
  </div>
</template>

<script>
export default {
    name: 'Home'
}
/*url("../assets/img/login/bg.png"),*/
</script>

<style lang="scss">

.sign-in-icon {
  color: #fff;
}
.login-info-btn {
    width: 190px;
    height: 50px;
    border-radius: 2px;
    background-color: #ffcf1a;
    outline: none;
    border: none;
    cursor: pointer;
    margin-top: 80px;

    font-size: 14px;
    color: #383838;
    
}
.main-login-info {
    margin-top: 200px;
}
.login-info-title {
    width: 600px;
    font-size: 43px;
    font-weight: 300;
    line-height: 1.21;
    color: #fff;
    padding-bottom: 50px;
}
.login-info-desc {
    width: 600px;
    font-size: 20px;
    line-height: 1.5;
    color: #fff;
}
.l-login-value {
    color: #fff;
}
.l-header-logo {
    display: flex;
    align-items: center;
    &-text {
        color: #fff;
    }
    img {
        margin-right: 20px;
    }
}
.login-header {
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.main-header {
    background:  url('../assets/bg.png'), linear-gradient(138deg, #0ea3fa -8%, #d606f2 114%);
    min-height: 1000px;
    
}


</style>
