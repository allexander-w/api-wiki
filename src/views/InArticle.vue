<template>
    <div class="document-information">
        <div class="current-doc-header">
            <div class="breadcrumbs">
                <router-link to='/account' class="br-general br-link">
                    {{ARTICLE.article.section.name}}
                </router-link>
            </div>
            <div class="cd-header-btns">
                <button><i class="cd-icon fas fa-pencil-alt"></i></button>
                <button><i class="cd-icon fas fa-thumbtack"></i></button>
                <button><i class="cd-icon fas fa-unlock"></i></button>
                <button><i class="cd-icon fas fa-link"></i></button>
            </div>
        </div>
        <h3 class="cd-title">
            <i class="far fa-bookmark icon bookmark"></i>
            {{ARTICLE.article.name}}
        </h3>
        <div class="cd-info">
            <p class="cd-author">Автор: <span>{{ARTICLE.article.creator.fullname}}</span></p>
            <p class="cd-date">Обновлено: <span>{{ARTICLE.article.created_at}}</span></p>
        </div>
        
        <div class="content-in-doc" v-html='ARTICLE.article.content'></div>

        <div class="cd-like">
            <i class="cd-like-icon fas fa-thumbs-up"></i> <span>Нравится</span>
        </div>

        <div class="cd-comments">
            <div class="comments-wrapper" 
               v-for = '(comment, index) in ARTICLE.article.comments'
               :key='`comment${index}`'
            >
                <div class="commentator-info">
                    <div class="com-avatar">
                        <span>{{comment.user.first_name.slice(0,1)}}{{ comment.user.last_name.slice(0,1) }}</span>
                    </div>
                    <div class="com-info">
                        <p class="com-name">
                            {{comment.user.fullname}}
                        </p>
                        <p class="com-date">
                            {{comment.created_at}}
                        </p>
                    </div>
                </div>

                <div class="cd-comment">
                    <p class="comment-value">
                        {{comment.text}}
                    </p>
                    <div class="com-like-panel">
                        <i class="cd-like-icon fas fa-thumbs-up"></i> <span>Ответить</span> <span class="cd-delete">Удалить</span>
                    </div>
                </div>

            </div>
            
            <div class="add-comment">
                <input type="text" v-model='content' placeholder="Добавить комментарий" class='add-com-input'>
                <button class="blue-button send-btn" >Отправить</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'InArticle',
    data: () => ({
        load: false,
        content: ''
    }),
    computed: {
        ...mapGetters(['ARTICLE'])
    },
    async mounted() {
        this.updateArticle()
        console.log(this.$route.params.articleId)
    },
    methods: {
        async updateArticle(){
            await this.$store.dispatch('GET_ARTICLE', this.$route.params.articleId)
        }
    }
}
</script>

<style lang="scss">
.bookmark {
    position: absolute;
    top: 8px;
    left: -25px;
    cursor: pointer;
    font-size: 16px;
    color: #b5ccea;
    transition: .25s;

    &:hover {
        color: #0e65dd;
    }
}
.cd-like {
    margin: 50px 0 65px;
    cursor: pointer;
    &-icon {
        font-size: 18px;
        color: #5d94e2;
        cursor: pointer;
    }
    span {
        font-size: 13px;
        color: #383838;
    }
}
.content-in-doc {
    max-width: 850px;
}
.cd-author {
    margin-right: 15px;
}
.cd-title {
    font-size: 24px;
    color: #383838;
    font-weight: 400;
    margin-top: 50px;

    position: relative;
}
.cd-info {
    display: flex;
    margin: 10px 0 30px;
    p{
        font-size: 13px;
        color: #999999;
    }
    span {
        color: #4a4a4a;
    }
}
.cd-icon {
    font-size: 18px;
    color: #0e65dd;
}
.current-doc-header {
    margin-top: 50px;
    width: 850px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
        width: 34px;
        height: 34px;
        border-radius: 3px;
        background-color: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        transition: .5s;

        &:hover {
            background-color: #eef4fd;
        }

        &:not(:last-child){
            margin-right: 15px;
        }
    }
}
.document-information {
    margin: 0 0 0 50px;
}

.comments-wrapper {
    margin-bottom: 30px;
}
.send-btn {
    min-width: 102px;
    height: 36px;
    padding: 0 5px;

    position: absolute;
    right: 0;
    top: 70px;
}
.add-com-input {
    width: 800px;
    padding: 20px;
    outline: none;
    border: none;

    border-bottom: 1px solid #e1ecfc;
}
.add-comment {
    margin: 50px 0 100px;
    width: 800px;
    position: relative;
}
.com-like-panel {
    span {
        font-size: 14px;
        color: #9dbbe4;
        cursor: pointer;
    }
}
.commentator-info {
    display: flex;
    align-items: center;
}
.com-name {
    font-size: 13px;
    color: #383838;
}
.com-date {
    font-size: 13px;
    color: #999999;
}
.comment-value {
    max-width: 750px;
    font-size: 14px;
    color: #4a4a4a;
    margin-bottom: 10px;
}
.cd-comment {
    margin-left: 55px;
    margin-top: 10px;
}
.com-avatar {
    margin-right: 15px;
    width: 40px;
    height: 40px;
    display: flex;
    background-color: #eef4fd;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    span {
        font-size: 16px;
        color: #0a4ca6;
    }
    
}
</style>