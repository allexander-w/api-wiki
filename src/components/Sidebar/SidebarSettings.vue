<template>
    <div class="sidebar-set">
        <p class="sidebar-title ">
            Ваша компания
        </p>

        <router-link 
            v-for='(menuItem,index) in checkRole'
            :key = 'index'
            :to='menuItem.route'
        >
            <div class="menu-item-wrapper active-link">
             <i class="sidebar-item-icon"
                :class="menuItem.icon"
             ></i> <span class="sidebar-item">{{menuItem.title}}</span>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    data: ()=> ({
        menuOwner: [
            {icon: 'fas fa-cog', title: 'Общие', route: '/account/general'},
            {icon: 'far fa-user', title: 'Сотрудники', route: '/account/employees'},
            {icon: 'fas fa-cogs', title: 'Внешние интеграции', route: '/account/integrations'}
        ],
        menuAdmin: [
            {icon: 'far fa-user', title: 'Сотрудники', route: '/account/employees'},
            {icon: 'fas fa-cogs', title: 'Внешние интеграции', route: '/account/integrations'}
        ]
    }),
    computed: {
        checkRole(){
            const role = localStorage.getItem('role')

            if(role === '1'){
                return this.menuOwner
            }else {
                return this.menuAdmin
            }
        }
    }
}
</script>


<style lang="scss">
.menu-item-wrapper {
    display: flex;
    padding-left: 25px;
    max-width: 250px;
    height: 50px;
    align-items: center;
}
.doc-item-wrapper {
    display: flex;
    padding-left: 25px;
    max-width: 250px;
    height: 50px;
    align-items: center;
    span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-right: 10px;
    }
}
.sidebar-item {
        font-size: 14px;
        color: #383838;
    &-icon {
        color: #0e65dd;
        font-size: 22px;
        margin-right: 10px;
    }
}
.active-link {
    border-radius: 5px;
    transition: .2s;
    &:hover {
        background-color: rgba(#0e65dd, .1);
    }
}
</style>