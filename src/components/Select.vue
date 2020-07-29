<template>
    <div class="select">
        <div class="selected" @click = 'select = !select'>
            <p class="selected-field">
                {{currentName}}
            </p>
            <i class="fas fa-sort-down icon"></i>
        </div>
        <div class="select-dropdown" v-show="select">
            <ul>
                <li class="select-item"
                    v-for = '(item, index) in selectData'
                    :key = 'index'
                    @click = 'choose(item)'
                >{{item.name}}</li>
                
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "Select",
    data: () => ({
        select: false,
        selectData: [
            {name: 'Администратор', role: 'admin', active: true},
            {name: 'Модератор', role: 'moderator', active: false},
            {name: 'Пользователь', role: 'user', active: false}
        ],
        currentRole: 'admin',
        currentName: 'Администратор'
    }),
    methods: {
        choose({name, role, active}){
            this.currentRole = role
            this.currentName = name
            
            this.select = false
            this.$emit ('role', role)
        }
    }
}
</script>

<style lang="scss">
.active {
    color: #0e65dd;
}
.select-item {
    display: flex;
    align-items: center;
    height: 50px;
    padding-left: 10px;
    color: #383838;
    font-size: 20px;
    cursor: pointer;
    &:hover {
        color: #0e65dd;
    }
}
.selected-field {
    padding-left: 10px;
    color: #383838;
    font-size: 22px;
}
.selected {
    display: flex;
    width: 360px;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #999;;

    cursor: pointer;
}
.select-dropdown {
    width: 360px;
    min-height: 200px;
    background-color: #fff;
    box-shadow: 0 0 20px 0 rgba(0,0,0, .08);
}
</style>