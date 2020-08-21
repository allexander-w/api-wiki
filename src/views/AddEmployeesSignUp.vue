<template>
    <div class="sign-up-add-company">
        <h3 class="general-title signup-title">
            <span> Создание компании </span> <i class="fas fa-chevron-right arrow"></i> <span class='active-brcrmb'> Добавление сотрудников </span>
        </h3>

        <input type="text" class="text-field add-empl-field" 
                placeholder="Введите email адреса через запятую или пробел" 
                v-model='emails'>
        
        <Select @role = 'getRole' />

        <div class="buttons-wrapper">
            <button class="blue-button add-emp-btn" @click='addEmp'>
                Выслать приглашение
            </button>
            <button class="transparent-button skip-add" @click='skipInvite'>
                Пропустить
            </button>
        </div>

        <Loader v-show="load" />
        <transition name="fade">
            <Message :message='message' v-show='status' />
        </transition>
    </div>
</template>

<script>
import Select from '@/components/Select'
import Message from '@/components/Message'
import Loader from '@/components/Loader'

export default {
    data: () => ({
        emails: '',
        attachable: 'admin',
        message: 'Введите корректные данные',
        status: false,
        load: false
    }), 
    components: {Select, Message, Loader},
    methods: {
        skipInvite(){
            this.$router.push('/account')
        },
        async addEmp(){
            const formData = {
                emails: this.emails,
                attachable: this.attachable
            }
            
            try {
                this.load = true
                const data = await this.$store.dispatch('ADD_EMPLOYEE', formData)
                if (data.status === 'error') {
                    this.load = false
                    this.status = true

                    setTimeout(()=> { this.status = !this.status }, 2500)
                    this.emails = ''
                    return
                }
                localStorage.removeItem('teamId')
                this.load = false
                this.$router.push('/account')
            } catch (e) {}
        },
        getRole(data) {
            this.attachable = data
        }
    }
}
</script>

<style lang="scss">
.buttons-wrapper {
    display: flex;
    margin: 40px 0;
}
.skip-add {
    margin-left: 20px;
}
.sign-up-add-company {
    padding: 50px 0 0 50px;
}
.add-emp-btn {
    display: block;
    
}
.add-employee {
    padding: 50px 0 0 50px;
}
.add-empl-field {
    width: 550px;
    height: 50px;
    margin-bottom: 40px;
}
.add-title {
    margin: 40px 0 60px;
}
.signup-title {
    margin-bottom: 100px;
    color: #ccc;
}
</style>