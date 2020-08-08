<template>
    <div class="sidebar-home">
        <p class="sidebar-title ">
            Ваша компания
        </p>

        <router-link 
            v-for='(menuItem,index) in menu'
            :key = 'index'
            :to='menuItem.route'
        >
            <div class="menu-item-wrapper active-link">
             <i class="sb-home-icon"
                :class="menuItem.icon"
             ></i> <span class="sb-home-profile">{{menuItem.title}}</span>
            </div>
        </router-link>

        <p class="sidebar-title sections-home">
            Мои разделы
        </p>

        <div 
            class="doc-item"
            v-for='(section,index) in sections'
            :key = '`work${index}`'
            @click = 'getSecId(section.id)'
        >
            <div class="doc-item-wrapper active-link">
             <i class="sidebar-doc-icon far fa-folder"
             ></i> <span class="sidebar-doc"> {{section.name}}</span>
            </div>
        </div>

        <Loader v-show='load' />
    </div> 
</template>

<script>
import Loader from '@/components/Loader'

export default {
    data: ()=> ({
        menu: [
            {icon: 'far fa-compass', title: 'Активность', route: '/account/activity'},
            {icon: 'far fa-file-alt', title: 'Ваши работы', route: '/account/works'},
            {icon: 'far fa-bookmark', title: 'Закладки', route: '/account/bookmarks'}
        ],
        sections: [],
        load: false
    }),
    components: {
        Loader
    },
    async mounted(){
        this.load = true
        const token = localStorage.getItem('token')
        const team_id = localStorage.getItem('teamId')

        const url = new URL(
            `https://api.itl.wiki/team/${team_id}/section`
        )

        let headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + token,
        }

        fetch(url, {
            method: "GET",
            headers
        })
            .then(response => response.json())
            .then(json => {
                if (json.data) {
                    json.data.forEach(element => {
                    if (element.level === 1) {
                        this.sections.push(element)
                    }
                })
                }
            })
            .then (()=> {
                this.load = false
            })
        
    },
    methods: {
        async getSecId(id){
            
            this.$router.push(`/account/sections/${id}`)
            await this.$store.dispatch('GET_INSECTION', id)
            this.$store.commit('CHANGE_SIDEBAR', 'SidebarInSection')
        }
    }
}
</script>

<style lang="scss">
.sections-home {
    margin-top: 40px;
}
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
.sb-home {
    &-profile {
        font-size: 14px;
        color: #383838;
    }
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