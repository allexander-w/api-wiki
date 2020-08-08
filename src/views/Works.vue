<template>
    <div class="works">
        <div class="main-title title-works">Мои работы</div>

        <div class="works-wrapper insections-works">
            <div
                v-for="(work,index) in myWorks"
                :key="index"
                class="work-item"
                @click='inArticle(work)'
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
        <Loader v-show='load' />
    </div>
</template>

<script>
import Loader from '@/components/Loader'

export default {
    name: 'works',
    data: () => ({
        myWorks: [],
        load: false
    }),
    components: {
        Loader
    },
    async mounted() {
        this.load = true
        this.$store.commit('CHANGE_SIDEBAR', 'SidebarHome')
        this.myWorks = await this.$store.dispatch('GET_WORKS')
        this.load = false
    },
    methods: {
        async inArticle({section_id, id}){
            this.$router.push(`/account/sections/${section_id}/articles/${id}`)
            this.$store.commit('CHANGE_SIDEBAR', 'SidebarInSection')
            await this.$store.dispatch('GET_INSECTION', section_id)
        }
    }
}
</script>

<style lang="scss">
.title-works {
    margin-bottom: 40px;
}
.works {
    padding: 50px 0 0 50px;
}
</style>