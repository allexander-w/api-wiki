<template>
    <div class="employees">
        <div class="breadcrumbs">
            <router-link to='/account' class="br-general br-link">
                Настройки
            </router-link>
            <span class="br-general brc-slash"> / </span>
            <span class="br-general brc-active">Сотрудники</span>
        </div>

        <div class="main-title employees-title">
            Добавление сотрудника
        </div>

        <p class="employees-description">
            За каждым успехом стоит команда! Пригласите свою команду и начните создавать отличные вещи вместе.
        </p>

        <button class="transparent-button invite-btn" @click='addEmployees'>
            Пригласить сотрудников
        </button>

        <div class="main-title employees-title">
            Список сотрудников
        </div>


        <table>
            <tr><th>Пользователь</th><th>Последняя активность</th><th>Статус</th><th></th></tr>
            <tr
                v-for='(employee, index) in employees'
                :key='index'
            >
                <td>
                    <div class="user-table">
                        <div class="user-logo">
                        </div>
                        <div class="user-desc">
                            <p class="user-name">
                                {{employee.fullname}}
                            </p>
                            <p class="user-email">
                                {{employee.email}}
                            </p>
                        </div>
                    </div>
                </td>
                <td>
                    {{employee.logged}}
                </td>
                <td>
                    Выдан доступ
                </td>
                <td>
                    <SelectRole :roles = 'employee.roles' :userId = 'employee.id' />
                </td>
            </tr>
        </table>

        <Loader v-show="load" />
    </div>
</template>

<script>
import Loader from '@/components/Loader'
import SelectRole from '@/components/SelectRole'

export default {
    name: 'Employees',
    data: () => ({
        employees: [],
        load: false
    }),
    components: {
        Loader, SelectRole
    },
    async mounted(){
        this.load = true
        this.employees = await this.$store.dispatch('GET_EMPLOYEES')
        this.load = false
        console.log(this.employees)
    },
    methods: {
        addEmployees(){
            this.$router.push('/account/employees/add')
        },
        async deleteUser(id){
            console.log(id)


            const team_id = localStorage.getItem('teamId')
            const token = localStorage.getItem('token')

            const url = new URL(
                `https://api.itl.wiki/team/${team_id}/employees/dismiss`
            )

            let headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            }
            const body = {
                user_id: id
            }

            const res = await fetch(url, {
                method: "POST",
                headers,
                body: JSON.stringify(body)
            })
            
            const data = await res.json()

            this.employees = await this.$store.dispatch('GET_EMPLOYEES')
        }
    }
}
</script>

<style lang="scss">
.user-logo {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #999;
    margin-right: 15px;
}
.user-name {
    color: #383838;
    font-size: 16px;
}
.user-email {
    color: #999;
    font-size: 12px;
}
.user-table {
    display: flex;
    align-items: center;
}
.invite-btn {
    margin: 40px 0;
}
.employees {
    padding: 50px 0 0 50px;
}
.employees-title {
    margin: 40px 0;
}
.employees-description {
    max-width: 400px;
    color: #4a4a4a;
    font-size: 13px;
    line-height: 25px;
}
</style>