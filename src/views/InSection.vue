<template>
    <div class="in-section">
        <div class="breadcrumbs">
            <router-link to='/account' class="br-general br-link">
                {{INSECTION.section.name}}
            </router-link>
        </div>

        <h3 class="main-title in-section-title">
            {{INSECTION.section.name}}
        </h3>

        <div class="information-about-work">
            <p class="work-author work-info-p">Автор: <span class="work-author-value work-info-span">{{INSECTION.section.creator.fullname}}</span></p>
            <p class="work-added work-info-p">Обновлено: <span class="work-info-span">{{INSECTION.section.updated_at}}</span></p>
        </div>

        <div class="insection-content" v-html='INSECTION.section.content'>

        </div>

        <div class="works-wrapper insections-folders">
            <div
                v-for="(folder,index) in INSECTION.children"
                :key= 'index'
                class="work-item"
                @click='inFolder(folder.id)'
            >
                <i class="far fa-folder work-doc-icon"></i>
                <div class="work-info-content">
                    <p class="work-title">{{folder.name}}</p>
                    <div class="information-about-work">
                        <p class="work-added work-info-p">Добавлено: <span class="work-info-span">{{folder.updated_at}}</span></p>
                    </div>
                </div>
            </div>
        </div>


        <div class="works-wrapper insections-works">
            <div
                v-for="(work,index) in INSECTION.articles"
                :key="index"
                class="work-item"
                @click='inArticle(work.id)'
            >
                <i class="far fa-file-alt work-doc-icon"></i>
                <div class="work-info-content">
                    <p class="work-title">{{work.name}}</p>
                    <div class="information-about-work">
                        <p class="work-added work-info-p">Добавлено: <span class="work-info-span">{{work.updated_at}}</span></p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    name: 'InSection',
    async mounted(){
        await this.$store.dispatch('GET_INSECTION', this.$route.params.id)
    },
    watch: {
        async $route (to, from) {
            await this.$store.dispatch('GET_INSECTION', this.$route.params.id)
        }
    },
    computed: {
        ...mapGetters (['INSECTION']),
    },
    methods: {
        async inFolder(id){
            this.$router.push(`/account/sections/${id}`)
            await this.$store.dispatch('GET_INSECTION', id)

        },
        async inArticle(id){
            console.log(this.$route.params.id)
            this.$router.push(`/account/sections/${this.$route.params.id}/articles/${id}`)
        },
        
    }
}


</script>

<style lang="scss">
.insection-content {
    margin: 30px 0;
}
.insections-folders {
    margin-top: 60px;
}
.in-section {
    padding: 50px 0 0 50px;
}
.in-section-title {
    margin: 40px 0 10px;
}
</style>