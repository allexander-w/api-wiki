<template>
    <div class="add-employee">
        <div class="breadcrumbs">
            <router-link to='/account' class="br-general br-link">
                Настройки
            </router-link>
            <span class="br-general brc-slash"> / </span>
            <router-link to='/account/employees' class="br-general br-link">
                Сотрудники
            </router-link>
            <span class="br-general brc-slash"> / </span>
            <span class="br-general brc-active">Добавление сотрудников</span>
        </div>

        <div class="main-title add-title">
            Добавление сотрудников
        </div>

        <input type="text" class="text-field add-empl-field" 
                placeholder="Введите email адреса через запятую или пробел" 
                v-model='emails'>
        
        <Select @role = 'getRole' />

        <button class="blue-button add-emp-btn" @click='addEmp'>
            Выслать приглашение
        </button>

        <Loader v-show="load" />
        <transition name="fade">
            <Message :message='message' v-show='status' />
        </transition>
    </div>
</template>

<script>
import Select from '@/components/Select'
import Loader from '@/components/Loader'
import Message from '@/components/Message'

export default {
    data: () => ({
        emails: '',
        attachable: 'admin',
        load: false,
        message: 'Проверьте введенные данные!',
        status: false
    }), 
    components: {Select, Loader, Message},
    methods: {
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
                this.load=false
                this.$router.push('/account/employees')
            } catch (e) {
                this.load=false
            }
        },
        getRole(data) {
            this.attachable = data
        }
    }
}
</script>

<style lang="scss">
.add-emp-btn {
    display: block;
    margin: 40px 0;
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
</style>
