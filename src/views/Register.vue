<template>
    <div class="signup">
        <h3 class="general-title signup-title">
           <span class='active-brcrmb'> Регистрация </span> <i class="fas fa-chevron-right arrow"></i> <span> Создание компании </span> <i class="fas fa-chevron-right arrow"></i> <span> Добавление сотрудников </span>
        </h3>
        <form @submit.prevent='register'>
            <div class="signup-field-wrapper">
                <div class="signup-names signup-pad">
                    <div class="signup-name-wrapper">
                        <input :class="{invalid: $v.name.$dirty && !$v.name.required}" 
                                type="text" class="text-field sign-up-field" 
                                placeholder="Имя" 
                                v-model='name'>
                        <p class="error-message signup-name-error" v-if = '$v.name.$dirty && !$v.name.required'>Поле не должно быть пустым!</p>
                    </div>
                    <div class="signup-name-wrapper">
                        <input :class="{invalid: $v.surname.$dirty && !$v.surname.required}" 
                                type="text" class="text-field sign-up-field" 
                                placeholder="Фамилия" 
                                v-model='surname'>
                        <p class="error-message signup-name-error" v-if = '$v.surname.$dirty && !$v.surname.required'>Поле не должно быть пустым!</p>
                    </div>
                </div>
            </div>
            
            <div class="signup-field-wrapper">
                <div class="setting-field signup-herit-field signup-pad"
                    :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
                >
                    <input type="text" 
                            v-model='email' 
                            placeholder="E-mail" 
                            class="setfield-text signup-general-field signup-email-field"
                    >
                    <i class="fas fa-sync-alt field-icon"></i>
                </div>
                <p class="error-message" v-if = '$v.email.$dirty && !$v.email.required'>Поле не должно быть пустым!</p>
                <p class="error-message" v-else-if = '$v.email.$dirty && !$v.email.email'>Введите корректный e-mail</p>
            </div>

            <div class="signup-field-wrapper">
                <div class="setting-field signup-herit-field signup-pad"
                    :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
                >
                    <input type="password" v-model='password' placeholder="Пароль" class="setfield-text signup-general-field signup-pass-field">
                    <i class="far fa-eye field-icon" @click = 'changeView(".signup-pass-field")'></i>
                </div>
                <p class="error-message" v-if = '$v.password.$dirty && !$v.password.required'>Поле не должно быть пустым!</p>
                <p class="error-message" v-else-if = '$v.password.$dirty && !$v.password.minLength'>Минимальная длина: 6 символов!</p>
            </div>

            <div class="signup-field-wrapper">
                <div class="setting-field signup-herit-field signup-pad"
                    :class="{invalid: ($v.password.$dirty && !$v.password.required) || !isValid}"
                >
                    <input type="password" v-model='passConf' placeholder="Повторите пароль" class="setfield-text signup-general-field signup-passConf-field">
                    <i class="far fa-eye field-icon" @click = 'changeView(".signup-passConf-field")'></i>
                </div>
                <p class="error-message" v-if = '!isValid'>Пароли не совпадают</p>
                <p class="error-message " v-else-if = '$v.passConf.$dirty && !$v.passConf.required'>Поле не должно быть пустым!</p>

            </div>
            <button class="blue-button" type='submit'>
                Регистрация
            </button>
        </form>
    </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
    name: 'Register',
    data: ()=> ({
        email: '',
        password: '',
        name: '',
        surname: '',
        passConf: ''
    }),
    validations: {
        email: {required, email},
        password: {required, minLength: minLength(6)},
        name: {required},
        surname: {required},
        passConf: {required}
    },
    computed: {
        isValid() {
            return this.password === this.passConf
        }
    },
    methods: {
        async register(){
            if (this.$v.$invalid){
                this.$v.$touch()
                return
            }
            if (!this.isValid){
                return
            }


            const formData = { 
                email: this.email,
                password: this.password,
                name: this.name,
                surname: this.surname,
                passConf: this.passConf
            }
            try {
                await this.$store.dispatch('SIGN_UP', formData)
                this.$router.push('/add-company')
            } catch (e) {}
            
        },
        changeView(data){
            const currentInput = document.querySelector(data)
           
           if (currentInput.type === 'password'){
                currentInput.type = 'text'
            } else {
                currentInput.type = 'password'
            }
        }
    }
}
</script>

<style lang="scss">
.arrow {
    color: #ccc;
    padding: 0 10px;
}
.signup-name-error {
    max-width: 180px;
}
.signup-names {
    display: flex;
}
.signup-field-wrapper {
    margin-bottom: 40px;
}
.signup-title {
    margin-bottom: 100px;
    color: #ccc;
}
.active-brcrmb {
    color: #383838;
}
.signup-herit-field {
    width: 380px;
}
.field-icon {
    color: #9dbbe4;
    font-size: 16px;
    cursor: pointer;
    transition: .5s;
    &:hover {
        color: #0e65dd;
    }
}
.sign-up-field {
    width: 185px;
    height: 50px;
    margin-right: 10px;
}
.signup-general-field {
    width: 330px;
}
.signup {
    padding: 50px 0 0 50px;
}
</style>