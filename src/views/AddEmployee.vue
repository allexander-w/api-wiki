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
    </div>
</template>

<script>
import Select from '@/components/Select'
import Loader from '@/components/Loader'
export default {
    data: () => ({
        emails: '',
        attachable: 'admin',
        load: false
    }), 
    components: {Select, Loader},
    methods: {
        async addEmp(){
            const formData = {
                emails: this.emails,
                attachable: this.attachable
            }
            
            try {
                this.load = true
                await this.$store.dispatch('ADD_EMPLOYEE', formData)
                this.load=false
                this.$router.push('/account/employees')
            } catch (e) {this.load=false}
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
