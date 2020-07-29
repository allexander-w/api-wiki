<template>
    <div class="add-company">
        <h3 class="general-title signup-title">
            <span class='active-brcrmb'> Создание компании </span> <i class="fas fa-chevron-right arrow"></i> <span> Добавление сотрудников </span>
        </h3>

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


        <button class="blue-button" @click = 'check'>Создать компанию</button> <span class="skip-add-company" @click='skip'>Пропустить</span>
    </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'

export default {
    name: 'AddCompany',
    data: ()=> ({
        domen: '',
        companyName: '',
        checkCode: false,
        validate: false
    }),
    validations: {
        domen: {required, minLength: minLength(5)},
        companyName: {required}
    },
    methods: {
        skip(){
            this.$router.push('/account')
        },
        async check(){
            if (this.$v.$invalid){
                this.$v.$touch()
                return
            }

            const formData = {
                code: this.domen
            }

            const response = await this.$store.dispatch('CHECK_CODE', formData)
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
                await this.$store.dispatch('ADD_TEAM', companyData)

                const token = localStorage.getItem('token')
                const url = new URL(
                    "https://api.itl.wiki/user"
                )

                let headers = {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer "+token,
                }

                fetch(url, {
                    method: "GET",
                    headers: headers,
                })
                    .then(response => response.json())
                    .then(json => {
                        const code = this.domen
                        let tId = ''

                        json.data.teams.map(team => {
                            if (team.code === code) {
                                tId = team.id
                            }
                        })
                        
                        localStorage.setItem('teamId', tId)
                    })
                this.$router.push('/sign-up/add-company')
            } catch (e) {}
        }
    }
}
</script>

<style lang="scss">
.skip-add-company {
    margin-left: 20px;
    cursor: pointer;
    font-size: 14px;
    color: #363636;

    &:hover {
        color: #0e65dd;
    }
}
.add-company-title {
    margin-bottom: 100px;
}
.signup-title {
    margin-bottom: 100px;
    color: #ccc;
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
</style>