<template>
    <div class="sidebar">
        <div class="header">
            <div class="header-content">
                <div class="up-header">
                    <div class="header-logo">
                        logo
                    </div>
                    <div class="header-top-menu-items">
                    <i 
                            v-for ='(item,index) in HOMEBAR'
                            :key = 'index'
                            class="nav-bar-button"
                            :class="'fas fa-'+item.name"
                            @click='changeSidebar(item)'
                        ></i>
                    </div>
                </div>
                <div class="header-bottom-menu-items">
                    <i 
                        v-for ='(item,index) in SETBAR'
                        :key = 'index'
                        class="nav-bar-button"
                        :class="item.name"
                        @click='changeSidebar(item)'
                    ></i>
                </div>
            </div>
        </div>

        <div class="sidebar-nav sidebar-hide">
            <div class="sidebar-inner-wrapper">
                <component :is='CURRENT_MENU' />
            </div>
        </div>
    </div>
</template>

<script>
import SidebarHome from '@/components/Sidebar/SidebarHome'
import SidebarSettings from '@/components/Sidebar/SidebarSettings'
import SidebarbarNotif from '@/components/Sidebar/SidebarbarNotif'
import SidebarInfo from '@/components/Sidebar/SidebarInfo'
import SidebarUser from '@/components/Sidebar/SidebarUser'
import SidebarAdd from '@/components/Sidebar/SidebarAdd'
import SidebarInSection from '@/components/Sidebar/SidebarInSection'

import { mapGetters } from 'vuex'


export default {
    name: 'Sidebar',
    data: () => ({
        homeBar: [
            {id: 1, name: 'home', component: 'SidebarHome'},
            {id: 2, name: 'plus', component: 'SidebarAdd'},
            {id: 3, name: 'search', component: 'SBSearch'}
        ],
        homeBarWithoutCompany: [
            {id: 1, name: 'home', component: 'SidebarHome'}
        ],
        setBar: [
            {id: 1, name: 'fas fa-cog', component: 'SidebarSettings'},
            {id: 2, name: 'far fa-bell', component: 'SidebarbarNotif'},
            {id: 3, name: 'far fa-question-circle', component: 'SidebarInfo'},
            {id: 4, name: 'far fa-user', component: 'SidebarUser'}
        ],
        newHomeBar: [],
        currentMenu: 'SidebarHome',
        status: ''
    }),
    computed: {
        ...mapGetters(['CURRENT_MENU', 'HOMEBAR', 'SETBAR']),
        comp(){
            return this.currentMenu
        },
        isInCompany(){
            this.status = localStorage.getItem('teamId') || ''
            
            if (this.status === '') {
                return this.homeBarWithoutCompany
            } else {return this.homeBar}
        }
    },
    components: {
        SidebarHome,SidebarSettings,SidebarbarNotif,SidebarInfo,SidebarUser,SidebarAdd,SidebarInSection
    },
    methods: {
        showSidebar(){
            const sidebar = document.querySelector('.sidebar-nav')

            if (sidebar.classList.contains('sidebar-hide')){
                sidebar.classList.remove('sidebar-hide')
            }else {
                sidebar.classList.add('sidebar-hide')
            }
        },
        changeSidebar({component}) {
            const sidebar = document.querySelector('.sidebar-nav')
            sidebar.classList.remove('sidebar-hide')
            this.$store.commit ('CHANGE_SIDEBAR', component)
        },
        async updateNavbar(){
            await this.$store.dispatch('GET_SIDEBAR_HOME')
            await this.$store.dispatch('GET_SIDEBAR_SET')
        }
    },
    async mounted(){
        await this.updateNavbar()

    }
}
</script>

<style lang="scss">
.header-logo {
    margin-bottom: 25px;
}
.header-bottom-menu-items{
    display: flex;
    flex-direction: column;
}
.header-top-menu-items {
    display: flex;
    flex-direction: column;
}
.sidebar{
    display: flex;
}
.sidebar-nav {
    width: 300px;
    position: relative;
    
    min-height: 100vh;
    background-color: rgba(#0e65dd, .07);
}
.nav-bar-button {
    padding: 30px 0;
    width: 80px;
    text-align: center;
    cursor: pointer;
    color: #fff;
    &:hover {
        background-color: #0e5ac5;
    }
}
.header {
    width: 80px;
    min-height: 100vh;
    background-color: blue;
    position: relative
}
.header-content {
    height: 100vh;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.sidebar-hide {
    z-index: -1;
    display: none;
}
.sidebar-inner-wrapper {
    width: 300px;
    overflow-y: auto;
    position: fixed; 
    height: 100vh;
    
    padding: 50px 0 0 25px;
}
</style>