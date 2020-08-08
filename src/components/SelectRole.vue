<template>
    <div class="select-role-wrapper">
        <div class="select-role">
            <div class="select-header" v-if = 'id === 1'>
                <p>Владелец</p>
            </div>
            <div class="select-header" @click = 'isOpen = !isOpen' v-else>
                <p>{{choosed.role}}</p>
                <i class='fas fa-angle-down'></i>
            </div>
            
            <div class="select-dropdown-role" v-show = 'isOpen'>
                <ul>
                    <li class='dropdown-item-select'
                        v-for = '(item, index) in items'
                        :key = 'index'
                        @click = 'select(item)'
                    >{{item.role}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        roles: {
            type: Array,
            default: () => []
        },
        userId: {
            type: Number,
            default: () => null
        }
    },
    data: () => ({
        items: [
            {role: 'Администартор', id: 2, code: 'admin'},
            {role: 'Модератор', id: 3, code: 'moderator'},
            {role: 'Пользователь', id: 4, code: 'user'},
        ],
        isOpen: false,
        choosed: {},
        id: null
        
    }),
    methods: {
        async select({id, code}){
            const choosed = this.items.filter(item => item.id === id)
            choosed.forEach(elem => {
                this.choosed = elem
            })

            const formData = {
                user_id: this.userId,
                role: code
            }

            await this.$store.dispatch('CHANGE_ROLE', formData)
            this.isOpen = !this.isOpen
        }
    },
    mounted(){
        this.roles.forEach(role => {
            this.id = role.pivot.role_id
        })
        const choosed = this.items.filter(item => item.id === this.id)
        choosed.forEach(elem => {
            this.choosed = elem
        })
    }
}
</script>

<style lang="scss">
.select-role {
    position: relative;
    max-width: 160px;
    
}
.select-header {
    width: 160px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    p {
        color: blue;
    }
    i {
        color: blue;
        font-size: 12px;
    }
}
.dropdown-item-select {
    padding: 15px;
    color: #363636;
    cursor: pointer;
    
    &:hover {
        background-color: rgb(148, 224, 243);
        color: blue;
    }
}
li.dropdown-item-select {
    list-style: none;
}
.select-dropdown-role {
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.05);
    background-color: #fff;
    min-height: 150px;
    z-index: 9;
    width: 160px;
}
</style>