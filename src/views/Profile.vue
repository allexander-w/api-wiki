<template>
    <div class="profile">
        <div class="breadcrumbs">
            <router-link to='/account' class="br-general br-link">
                Профиль
            </router-link>
            <span class="br-general brc-slash"> / </span>
            <span class="br-general brc-active">Редактирование</span>
        </div>
       <h3 class="main-title profile-title">
           Личные данные
       </h3>
       <form @submit.prevent='submitHandler'>
            <div class="profile-field">
                <input type="text" class="text-field profile-email" 
                        placeholder="Имя" 
                        v-model='name'
                        :class="{invalid: $v.name.$dirty && !$v.name.required}"
                >
                <p class="error-message" v-if='$v.name.$dirty && !$v.name.required'>Обязательно для заполнения!</p>
            </div>
            <div class="profile-field">
                <input type="text" class="text-field profile-email" 
                        placeholder="Фамилия" 
                        v-model='lastName'
                        :class="{invalid: $v.lastName.$dirty && !$v.lastName.required}"
                >
                <p class="error-message" v-if = '$v.lastName.$dirty && !$v.lastName.required'>Обязательно для заполнения!</p>
            </div>
            <div class="profile-field">
                <input type="text" class="text-field profile-email" 
                        placeholder="E-mail"
                        v-model='email'
                        :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
                >
                <p class="error-message" v-if='$v.email.$dirty && !$v.email.required'>Обязательно для заполнения!</p>
            </div>

            <button class="blue-button save-settings" type='submit'>
                Сохранить настройки
            </button>
        </form>


        <form @submit.prevent='changePassword'>
            <div class="signup-field-wrapper profile-pad">
                <div class="setting-field "
                    :class="{invalid: $v.currentPassword.$dirty && !$v.currentPassword.required}"
                >
                    <input type="password" 
                            v-model='currentPassword' 
                            placeholder="Текущий пароль" 
                            class="setfield-text current-password"
                    >
                    <i class="far fa-eye field-icon" @click='changeView(".current-password")'></i>
                </div>
                <p class="error-message" v-if = '$v.currentPassword.$dirty && !$v.currentPassword.required'>Обязательно для зполнения!</p>
            </div>

            <div class="signup-field-wrapper profile-pad">
                <div class="setting-field "
                    :class="{invalid: ($v.newPassword.$dirty && !$v.newPassword.required) || ($v.newPassword.$dirty && !$v.newPassword.minLength)}"
                >
                    <input type="password" 
                            v-model='newPassword' 
                            placeholder="Новый пароль" 
                            class="setfield-text new-password"
                    >
                    <i class="far fa-eye field-icon" @click='changeView(".new-password")'></i>
                </div>
                <p class="error-message" v-if = '$v.newPassword.$dirty && !$v.newPassword.required'>Обязательно для заполнения!</p>
                <p class="error-message" v-if = '$v.newPassword.$dirty && !$v.newPassword.minLength'>Минимум 6 символов!</p>

            </div>

            <button class="blue-button save-settings" type='submit'>
                Сменить пароль
            </button>
        </form>
        <transition name="fade">
            <Message :message='message' v-show='showMessage' />
        </transition>
        <Loader v-show='loader' />
    </div>
</template>

<script>
import Message from '@/components/Message'
import Loader from '@/components/Loader'
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
    name: 'Profile',
    data: () => ({
        email: '',
        name: '',
        lastName: '',
        currentPassword: '',
        newPassword: '',
        message: '',
        response: {},
        profile: {},
        showMessage: false,
        loader: false
    }),
    components: {
        Message, Loader
    },
    validations: {
        name: {required},
        lastName: {required},
        email: {email, required},
        newPassword: {required, minLength: minLength(6)},
        currentPassword: {required}
    },
    async mounted(){
        try {
            this.loader = true
            this.profile = await this.$store.dispatch('GET_USER')
            this.email = this.profile.email
            this.name = this.profile.first_name
            this.lastName = this.profile.last_name
            this.loader = false
        } catch (e) {
            this.loader = false
            return
        }
    },
    methods: {
        async submitHandler(){

            
            try {
                this.loader = true
                const formData = {
                    first_name: this.name,
                    last_name: this.lastName,
                    email: this.email
                }
                const response = await this.$store.dispatch('EDIT_PROFILE', formData)
                this.message = response
                this.showMessage = true
                setTimeout(()=> {
                    this.showMessage = false
                },2000)
                this.loader = false
            }catch (e) {this.loader = false}
        },
        changeView(data){
            const currentInput = document.querySelector(data)
           
           if (currentInput.type === 'password'){
                currentInput.type = 'text'
            } else {
                currentInput.type = 'password'
            }
        },
        async changePassword(){
            if (this.$v.$invalid) {
                this.$v.$touch()

                return
            }
            
            const data = {
                password: this.currentPassword,
                new_password: this.newPassword
            }
            try {
                this.loader = true
                const message = await this.$store.dispatch('CHANGE_PASS', data)
                this.message = message || 'Что то пошло не так!'
                this.currentPassword = ''
                this.newPassword = ''
                this.showMessage = true
                this.loader = false
                setTimeout (()=> {
                    this.showMessage = false
                },2000) 
            }catch(e){this.loader = false}
        }
    }
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
.profile-pad {
    margin-bottom: 40px;
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
.save-settings {
    margin: 20px 0 40px 0;
}
.profile-email {
    width: 430px;
    height: 50px;
}
.profile {
    padding: 50px 0 0 50px;
}
.profile-title {
    margin-top: 30px;
    margin-bottom: 30px;
}
.profile-field {
    margin-bottom: 30px;
}
</style>