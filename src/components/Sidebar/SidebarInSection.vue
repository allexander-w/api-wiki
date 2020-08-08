<template>
    <div class="sidebar-insection">
        <div class="dropdown" @click="isOpen = !isOpen"
            :class="{'sidebar-open': isOpen}"
            
        >
            <div class="dropdown-wrapper"><i class="fas fa-folder icon dropdown-icon"></i><span>{{dropdownName}}</span></div>
            <i class="fas fa-angle-down icon"></i>
        </div>
        <div class="dropdown-open" v-show='isOpen'>
            <div class="search-dropdown">
                <input type="text" class="dropdown-search" placeholder="Введите название раздела" v-model='search'> <i v-if='search' @click='search = ""' class="fas fa-times clear-search"></i>
            </div>
            <div class="line"></div>
            <div class="allnonsorted-wrapper" v-if='!search'>
                <div class="dropdown-wrapper-item"
                    v-for ='(section, index) in sections'
                    :key = 'index'
                >
                    <div class="dropdown-item" @click = 'openSidebarSection(section.id)'>
                        {{section.name}}
                    </div>
                    <div class="dropdown-wrapper-in-item" 
                        v-for ='(child, index) in section.children'
                        :key = '`child${index}`'
                    >
                        <div class="dropdown-item"
                            @click = 'openSidebarSection(child.id)'
                        >
                            - {{child.name}}
                        </div>
                        <div class="dropdown-item"
                            v-for ='(level, index) in child.children'
                            :key = '`level3${index}`'
                            @click = 'openSidebarSection(level.id)'
                        >
                            
                        <p class="level-three"> -- {{level.name}} </p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if='search' class="wrapper-allsections">
                <div class="dropdown-item" 
                    v-for = '(allsection, index) in filteredSections'
                    :key='`all${index}`'
                    @click = 'openSidebarSection(allsection.id)'
                >
                        {{allsection.name}}
                </div>
            </div>
        </div>

        <div class="children-section-wrapper">
            <div 
                class="doc-item"
                v-for="(childSec, index) in sectionChildren"
                :key='`childSec${index}`'
                @click='inFolder(childSec.id)'
            >
                <div class="doc-item-wrapper active-link">
                <i class="sidebar-doc-icon far fa-folder"
                ></i> <span class="sidebar-doc">{{childSec.name}}</span>
                </div>
            </div>
        </div>

        <div class="sidebar-title insection-sidebar-title">
            Статьи
        </div>

        <div class="children-section-wrapper">
            <div 
                class="doc-item"
                v-for="(article, index) in articles"
                :key='`article${index}`'
                @click='inArticle(article.id)'
            >
                <div class="doc-item-wrapper active-link">
                <i class="sidebar-doc-icon far fa-file-alt"
                ></i> <span class="sidebar-doc">{{article.name}}</span>
                </div>
            </div>
        </div>

        <Loader v-show='load' />
    </div>
</template>

<script>
import Loader from '@/components/Loader'

export default {
    data: () => ({
        sections: [],
        isOpen: false,
        dropdownName: '',
        sectionChildren: '',
        articles: [],
        load: false,
        allSections: [],
        search: ''
    }),
    components: {
        Loader
    },
    async mounted() {
        await this.updateSidebar()
    },
    computed: {
        filteredSections(){
            const text = this.search
            return this.allSections.filter(elem => {
                return elem.name.toLowerCase().includes(text.toLowerCase())
            })
        }
    },
    watch: {
        $route(to, from) {
            this.updateSidebar()
        }
    },
    methods: {
        async openSidebarSection(id) {
            this.isOpen = !this.isOpen
            this.$router.push(`/account/sections/${id}`)
            await this.$store.dispatch('GET_INSECTION', id)
            this.search = ''
            await this.updateSidebar()
        },
        async inFolder(id) {
            this.$router.push(`/account/sections/${id}`)
            await this.$store.dispatch('GET_INSECTION', id)
            await this.updateSidebar()
        },
        async inArticle(id){
            this.active = true
            this.$router.push(`/account/sections/${this.$route.params.id}/articles/${id}`)
            await this.$store.dispatch('GET_ARTICLE', this.$route.params.articleId)
        },
        async updateSidebar() {
            this.load = true
            this.dropdownName = await this.$store.dispatch('GET_SIDEBAR_NAME', this.$route.params.id)
            this.sectionChildren = await this.$store.dispatch('SECTION_SIDEBAR', this.$route.params.id)
            this.articles = []
            this.articles = await this.$store.dispatch('SIDEBAR_WORKS', this.$route.params.id)

            this.sections = []
            const array = await this.$store.dispatch('SECTIONS')
            array.forEach(async element => {
                if (element.level === 1) {
                    element.children = await this.$store.dispatch('SECTION_SIDEBAR', element.id)
                        element.children.forEach (async el => {
                            el.children = await this.$store.dispatch('SECTION_SIDEBAR', el.id)
                        })
                    this.sections.push (element)
                }
            })

            this.allSections = []
            this.allSections = await this.$store.dispatch('ALL_SECTIONS')

            this.load = false
        }
    }
}
</script>

<style lang="scss">

.insection-sidebar-title {
    margin: 30px 0 -30px;
}
.children-section-wrapper {
    margin-top: 10px;
}
.level-three {
    padding-left: 10px;
    transition: .25s;

    &:hover {
        color:#0b55bb;
    }
}
.dropdown-item {
    display: flex;
    align-items: center;
    height: 40px;
    cursor: pointer;
    max-width: 220px;
    font-size: 14px;
    padding-left: 10px;
    transition: .25s;

    &:hover {
        background-color: rgba(238, 244, 253, 0.5);
        color:#0b55bb;
        border-radius: 5px;
    }
}
.line {
    width: 220px;
    height: 1px;
    background-color: #e6effb;
}
.dropdown-search {
    width: 200px;
    height: 35px;
    border: none;
    outline: none;
    padding-left: 10px;

    font-size: 14px;  
}
.dropdown-open {
    background-color: #fff;
    min-height: 50px;
    max-width: 250px;
    padding-left: 15px;
    padding-bottom: 20px;
}
.dropdown-icon {
    margin-right: 10px;
    font-size: 18px;
}
.dropdown {
    display: flex;
    justify-content: space-between;
    padding-left: 15px;
    padding-right: 15px;
    max-width: 250px;
    height: 50px;
    align-items: center;
    cursor: pointer;
    border: 1px solid #ceddf1;
    transition: .25s;
    outline: none;

    &:hover {
        background-color: #fff;
        border-color: #fff;
        box-shadow: 0 0 3rem 0 rgba(0, 0, 0, 0.08);
    }

    &-wrapper {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-right: 10px;
        span {
            font-size: 14px;
        }
    } 
}
.clear-search {
    color: #999;
    cursor: pointer;
}
.sidebar-open {
    background-color: #fff;
    border-color: #fff;
    box-shadow: 0 0 3rem 0 rgba(0, 0, 0, 0.08);
}
</style>