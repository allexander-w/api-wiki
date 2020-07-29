<template>
    <div class="sidebar-add">
        <p class="sidebar-title">
            Создать
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
        menuAdmin: [
            {icon: 'far fa-file-alt', title: 'Статью', route: '/account/add-document'},
            {icon: 'far fa-folder', title: 'Раздел', route: '/account/add-section'}
        ],
        menu: [
            {icon: 'far fa-file-alt', title: 'Статью', route: '/account/add-document'}
        ]
    }),
    computed: {
        checkRole(){
            const role = localStorage.getItem('role')

            if(role === '1' || role === '2' || role === '3' ){
                return this.menuAdmin
            }else {return this.menu}
        }
    }
}
</script>