<template>
    <div class="sidebar">
        <div class="header">
            <div class="header-content">
                <div class="up-header">
                    <div class="header-logo">
                        <img src='https://itl.wiki/assets/img/logo.svg' @click='showSidebar'>
                    </div>
                    <div class="header-top-menu-items">
                    <i 
                            v-for ='(item,index) in HOMEBAR'
                            :key = 'index'
                            class="nav-bar-button"
                            :class="'fas fa-'+item.name"
                            @click='changeSidebar(item)'
                        >
                        </i>
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

        <div class="search-panel close-search-panel" @click.self="closeSearchPanel">
            <div class="search-active">
                <div class="main-title search-company-title">
                    Поиск по компании
                </div>

                <input class='text-field all-search-input' type="text" placeholder="Искать статью, раздел или пользователя" v-model="keywords" >

                <div class="results" v-if="results != null && keywords.length > 2">
                    <div class="result-item articles-block" >
                        <div class="main-title search-all-title" v-if='Object.values(results.records).length'>Статьи</div>
                    
                        <div class="works-wrapper insections-works">
                            <div
                                v-for="(work,index) in Object.values(results.records)"
                                :key="index"
                                class="work-item"
                                @click='inArticle(work)'
                            >
                                <i class="far fa-file-alt search-icon icon"></i>
                                <div class="work-info-content">
                                    <p class="work-title">{{work.name}}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="result-item sections-block" v-if='results.sections.length'>
                        <div class="main-title search-all-title">Разделы</div>


                        <div class="works-wrapper">
                            <div
                                v-for="(folder,index) in results.sections"
                                :key= 'index'
                                class="work-item"
                                @click="inFolder(folder)"
                            >
                                <i class="far fa-folder search-icon icon"></i>
                                <div class="work-info-content">
                                    <p class="work-title">{{folder.name}}</p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="result-item users-block" v-if='results.users.length'>
                        <div class="main-title search-all-title">Пользователи</div>

                        <div class="works-wrapper insections-folders">
                            <div
                                v-for="(user,index) in results.users"
                                :key= '`user${index}`'
                                class="work-item"
                            >
                                <i class="far fa-user search-icon icon"></i>
                                <div class="work-info-content">
                                    <p class="work-title">{{user.fullname}}</p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="sidebar-nav">
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
import _ from 'lodash'

export default {
    name: 'Sidebar',
    data: () => ({
        newHomeBar: [],
        currentMenu: 'SidebarHome',
        status: '',
        keywords: '',
        results: null
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
    watch: {
        keywords: function () {
            this.fetchSearch()
        }
    },
    components: {
        SidebarHome,SidebarSettings,SidebarbarNotif,SidebarInfo,SidebarUser,SidebarAdd,SidebarInSection
    },
    methods: {
        async inFolder({id}){
            const searchPanel = document.querySelector('.search-panel')
            searchPanel.classList.add('close-search-panel')
            this.keywords = ''

            this.$router.push(`/account/sections/${id}`)
            this.$store.commit('CHANGE_SIDEBAR', 'SidebarInSection')
            await this.$store.dispatch('GET_INSECTION', id)

        },
        async inArticle({section_id, id}){
            const searchPanel = document.querySelector('.search-panel')
            searchPanel.classList.add('close-search-panel')
            this.keywords = ''

            this.$router.push(`/account/sections/${section_id}/articles/${id}`)
            this.$store.commit('CHANGE_SIDEBAR', 'SidebarInSection')
            await this.$store.dispatch('GET_INSECTION', section_id)
        },
        closeSearchPanel(){
            const searchPanel = document.querySelector('.search-panel')
            searchPanel.classList.add('close-search-panel')

            this.keywords = ''
        },
        showSidebar(){
            const sidebar = document.querySelector('.sidebar-nav')
            if(!localStorage.getItem('teamId')) {
                return
            }

            if (sidebar.classList.contains('sidebar-hide')){
                sidebar.classList.remove('sidebar-hide')
            }else {
                sidebar.classList.add('sidebar-hide')
            }
        },
        fetchSearch: _.debounce(async function () {
            if(this.keywords.length < 3) {
                return
            }
            this.results = null
            this.results = await this.$store.dispatch('SEARCH_ALL', this.keywords)
        }, 300),
        changeSidebar({component}) {
            const searchPanel = document.querySelector('.search-panel')
             if (component === 'SEARCH') {
                if (searchPanel.classList.contains('close-search-panel')) {
                    searchPanel.classList.remove('close-search-panel')
                } else {
                    searchPanel.classList.add('close-search-panel')
                }
                return
            }
            
            searchPanel.classList.add('close-search-panel')
            this.keywords = ''
            const sidebar = document.querySelector('.sidebar-nav')
            sidebar.classList.remove('sidebar-hide')
            this.$store.commit ('CHANGE_SIDEBAR', component)
        },
        async updateNavbar(){
            const sidebar = document.querySelector('.sidebar-nav')
            if(!localStorage.getItem('teamId')) {
                sidebar.classList.add('sidebar-hide')
            } 

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

.search-icon {
    font-size: 22px;
    margin-right: 20px;
}
.search-all-title {
    margin-bottom: 20px;
}
.all-search-input {
    height: 40px;
    width: 400px;
}
.search-panel {
    width: 100%;
    left: 80px;
    position: fixed;
    z-index: 99;
    
    min-height: 100vh;
    background-color: rgba(#0e65dd, .2);
}
.search-company-title {
    margin-bottom: 40px;
}
.result-item {
    margin: 40px 0;
}
.search-active {
    width: 500px;
    background-color: #fff;
    z-index: 100;
    height: 100vh;
    overflow-y: auto;
    padding: 50px;
    box-shadow: 20px 0 20px 0 rgba(0,0,0, .2);
}
.close-search-panel {
    z-index: -1;
    opacity: 0;
}
.header-logo {
    margin: 30px 25px;
    cursor: pointer;
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
    position: relative;
    color: #fff;
    &:hover {
        background-color: #0e5ac5;
    }
}
.header {
    width: 80px;
    min-height: 100vh;
    background-color: #0e65dd;
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