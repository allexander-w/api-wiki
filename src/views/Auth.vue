<template>
    <div class="auth">
        <h3 class="general-title auth-title">
            Авторизация
        </h3>
        <form @submit.prevent='signIn'>
            <div class="auth-email auth-pad">
                <input :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}" type="text" class="text-field general-field" placeholder="Email" v-model='email'>
                <p class="error-message" v-if = '$v.email.$dirty && !$v.email.required'>Поле не должно быть пустым!</p>
                <p class="error-message" v-else-if = '$v.email.$dirty && !$v.email.email'>Введите верный email</p>
            </div>
            <div class="auth-password auth-pad">
                <input :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}" type="password" class="text-field general-field" placeholder="Password" v-model='password'>
                <p class="error-message" v-if = '$v.password.$dirty && !$v.password.required'>Поле не должно быть пустым!</p>
                <p class="error-message" v-else-if = '$v.password.$dirty && !$v.password.minLength'>Минимальная длина пароля 6 символов!</p>
            </div>
            <button class="blue-button" type='submit'>
                Войти
            </button>
        </form>
    </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
    name: 'Auth',
    data: ()=> ({
        email: '',
        password: ''
    }),
    validations: {
        email: {required, email},
        password: {required, minLength: minLength(6)}
    },
    methods: {
        async signIn(){
            if (this.$v.$invalid){
                this.$v.$touch()
                return
            }
            
            const formData = {
                email: this.email,
                password: this.password
            }

            await this.$store.dispatch('SIGN_IN', formData)
            
            this.$router.push('/account')
        }
    }
}
</script>

<style lang="scss">
.auth{
    padding: 50px 0 0 50px;
}
.auth-title {
    margin-bottom: 200px;
}
.general-field {
    width: 400px;
    height: 50px;
}
.auth-pad {
    margin-bottom: 40px;
}
</style>