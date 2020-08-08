<template>
    <div class="general-settings">
        <div class="breadcrumbs">
            <router-link to='/account' class="br-general br-link">
                Настройки
            </router-link>
            <span class="br-general brc-slash"> / </span>
            <span class="br-general brc-active">Общие</span>
        </div>

        <div class="main-title settings-title">
            Профиль компании
        </div>

        <div class="company-wrapper">
            <input  :class="{invalid: $v.companyName.$dirty && !$v.companyName.required}"
                    type="text" class="text-field company-name" 
                    placeholder="Название компании" 
                    v-model='companyName'>
            <p class="error-message" v-if="$v.companyName.$dirty && !$v.companyName.required">Поле не должно быть пустым!</p>
        </div>
        <div class="company-wrapper">
            <input  :class="{invalid: validate && !checkCode}"
                    type="text" class="text-field company-domen" 
                    placeholder="Адрес сайта" 
                    v-model='domen'>
                <span class="addition-domen">itl.wiki</span> <i class="fas fa-question-circle question-icon"></i>
            <p class="error-message" v-if='(validate && !checkCode)'>Данный адрес уже занят!</p>
            <p class="error-message" v-else-if='$v.domen.$dirty && !$v.domen.required'>Поле не должно быть пустым</p>
            <p class="error-message" v-else-if='$v.domen.$dirty && !$v.domen.minLength'>Введите более 5 символов</p>
        </div>

        <p class="p-desc settings-description">
            Поделитесь ссылкой itl.wiki/company, чтобы добавить кого-либо с разрешенным доменом электронной почты в ваше рабочее пространство.
        </p>

        <button class="blue-button save-set" @click='check'>
            Сохранить настройки
        </button>

        <Loader v-show='load' />
    </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import Loader from '@/components/Loader'

export default {
    name: 'AddCompany',
    data: ()=> ({
        domen: '',
        companyName: '',
        checkCode: false,
        validate: false,
        load: false,
        teamInfo: {}
    }),
    validations: {
        domen: {required, minLength: minLength(6)},
        companyName: {required}
    },
    components: {
        Loader
    },
    async mounted(){
        await this.updateData()
    },
    methods: {
        async updateData(){
            this.load = true
            this.teamInfo = await this.$store.dispatch('COMPANY_VIEW')

            this.domen = this.teamInfo.code
            this.companyName = this.teamInfo.name

            this.load = false
        },
        async check(){
            if (this.$v.$invalid){
                this.$v.$touch()
                return
            }

            const formData = {
                code: this.domen
            }
            this.load = true
            const response = await this.$store.dispatch('CHECK_CODE', formData)
            this.load = false
            if (response === 'success') {
                this.checkCode = true
            } else { 
                this.checkCode = false
                this.validate = true
                return
            }

            const companyData = {
                name: this.companyName,
                code: this.domen
            }

            try {
                this.load = true
                await this.$store.dispatch('EDIT_TEAM', companyData)
                this.load = false
                this.$router.push('/account')
            } catch (e) {}
        }
    }
}
</script>

<style lang="scss">
.save-set {
    margin: 40px 0;
}
.settings-description {
    max-width: 480px;
}
.add-company-title {
    margin-bottom: 100px;
}
.addition-domen {
    color: #383838;
    font-size: 20px;
    padding-left: 10px;
}
.question-icon {
    font-size: 20px;
    color: #9dbbe4;
    cursor: pointer;
    outline: none;
    transition: .25s;
    padding-left: 10px;

    &:hover {
        color: #0e65dd;
    }
}
.company-wrapper {
    margin-bottom: 40px;
}
.company-name {
    width: 480px;
    height: 50px;
}
.add-company {
    padding: 50px 0 0 50px;
}
.company-domen {
    width: 380px;
    height: 50px;
}
.general-settings {
    padding: 50px 0 0 50px;
}
.settings-title {
    margin: 40px 0;
}
</style>