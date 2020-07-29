<template>
    <div class="add-doc">
        <div class="error-popup" v-if='$v.title.$dirty && !$v.title.required || $v.content.$dirty && !$v.content.required'>
            <i class="fas fa-exclamation-triangle err-icon"></i>
           <p class="error-text">Не указан заголовок или раздел</p>
        </div>
        <div class="add-doc-header">
            <div class="left-part">
                <div class="doc-unlock" v-click-outside='accessHide' @click='access = true'>
                    <i class="fas fa-unlock header-icon"></i> <span class="header-items-text">Доступ</span>
                    <div class="modal-doc modal-access" v-show='access'>
                        <input type="text" placeholder="Контакты" class="modal-doc-input">
                    </div>
                </div>
                <div class="doc-tags" v-click-outside='tagsHide' @click='tags = true'>
                    <i class="fas fa-tag header-icon"></i> <span class="header-items-text">Теги</span>
                    <div class="modal-doc modal-tags" v-show='tags'>
                        <input type="text" placeholder="Введите название тега" class="modal-doc-input">
                    </div>
                </div>
            </div>
            <div class="right-part">
                <button class="doc-btn publish-btn" @click="postContent">Опубиковать</button>
                <button class="cancel-btn" @click='cancel'>Отменить</button>
                <i class="fas fa-ellipsis-h doc-menu"></i>
            </div>
        </div>
        <div class="doc-main-content">
            <div class="dropdown-section" v-click-outside='chooseHide'>
                <p class="choose-title" @click = 'choose = true'>{{currentName === '' ? 'Выбор раздела' : currentName}}</p>
                <div class="sec-wrapper" v-show='choose'>
                    <div class="dropdown-section-wrapper section-position" >
                        <input type="text" class="choose-section modal-doc-input" placeholder="Название раздела">
                    </div>
                    <div class="choose-panel">
                        <div class="choose-item-wrapper"
                            v-for = '(section, index) in sections'
                            :key = '`section${index}`'
                            
                        >
                            <div class="choose-item"
                                @click="select(section)"
                            >
                                <p>{{section.name}}</p>
                            </div>
                            <div class="wrapper-item"
                                v-for = '(sectionChild, index) in section.children'
                                :key = '`sectionChild${index}`'
                                
                            >
                                <div class="choose-item"
                                    @click="select(sectionChild)"
                                >
                                    <p class="sec-child">- {{sectionChild.name}}</p>
                                </div>

                                <div class="choose-item"
                                    v-for = '(level, index) in sectionChild.children'
                                    :key = '`level${index}`'
                                    @click="select(level)"
                                >
                                    <p class="lev-child">-- {{level.name}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <input type="text" v-model="title" class="header-input" placeholder="Заголовок статьи">
            <vue-editor v-model="content" class='doc-editor'></vue-editor>
        </div>
        
        <Loader v-show="load" />

    </div>
</template>

<script>

import ClickOutside from 'vue-click-outside'
import { VueEditor } from 'vue2-editor'
import {mapGetters} from 'vuex'
import { required } from 'vuelidate/lib/validators'
import Loader from '@/components/Loader'

export default {
    data: () => ({
        content: '',
        title: '',
        nowDate: '',
        authorName: '',
        authorSurname: '',
        access: false,
        tags: false,
        load: false,
        choose: false,
        section: '',
        sections: [],
        currentName: ''
    }),
    validations: {
        content: {required},
        title: {required}
    },
    components: {
        VueEditor, Loader
    },
    directives: {
     ClickOutside
    },
    mounted() {
        this.sidebarUpdate()
    },
    methods: {
        select({id, name}) {
            
            this.currentName = name
            this.section = id

            console.log(this.section);
            this.choose = false
            

        },
        tagsHide(){
            this.tags = false
        },
        accessHide(){
            this.access = false
        },
        async postContent(){
            if (this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            if (this.section === ''){
                return
            }
            
            const formData = {
                "name": this.title,
                "code": "",
                "images": "",
                "section_id": this.section.toString(),
                "description": this.content
            }
            console.log(formData);
            await this.$store.dispatch('ADD_SECTION', formData)
        },
        async sidebarUpdate(){
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

            console.log(this.sections)
        },
        cancel(){
            alert ('Изменения не сохранятся, вы точно хотите выйти?')
            this.$router.push('/account/works')
        },
        addSection(secName) {
            this.section = secName
            this.choose = false
        },
        chooseHide(){
            this.choose = false
        }
    }
}
</script>

<style lang="scss">
.lev-child {
    padding-left: 40px;
}
.sec-child {
    padding-left: 15px;
}
.choose-title {
    font-size: 13px;
    color: #999999;
    cursor: pointer;
    padding-left: 10px;
    &:hover {
        color: #0b55bb;
    }
}
.modal-doc {
    display: flex;
    align-items: center;
    width: 380px;
    min-height: 70px;
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.08);
    top: 40px;
    position: absolute;
    z-index: 99;

    &-input{
        width: 380px;
        font-size: 14px;
        color: #383838;
        border: none;
        padding: 30px;
        outline: none;
        &::placeholder {
            color: #999999;
        }
    }
    
}
.err-icon {
    font-size: 18px;
    color: #d0021b;
    margin-right: 15px;
    margin-left: 40px;
}
.error-text {
    font-size: 14px;
    color: #d0021b;
}
.error-popup {
    height: 60px;
    display: flex;
    align-items: center;
    background-color: rgba(#d0021b, .06);
}
.doc-editor {
    margin-bottom: 100px;
}
.header-input {
    border: none;
    width: 1100px;
    padding: 20px 10px;
    outline: none;

    font-size: 24px;
    color: #383838;
    &::placeholder {
        font-size: 24px;
        color: #999999;
    }
}
.doc-main-content {
    width: 1100px;
    margin: 0 auto;
}
.doc-menu {
    margin-left: 15px;
    font-size: 20px;
    color: #0b55bb;
}
.doc-btn {
    min-width: 124px;
    height: 36px;
    border-radius: 2px;
    background-color: #0e65dd;
    font-size: 14px;
    cursor: pointer;
    outline: none;
    border: none;
    padding: 0 5px;
    color: #fff;
    transition: .5s;
    &:hover {
        background-color: #0e5cc9;
    }
}
.publish-btn {
    margin-right: 15px;
}
.cancel-btn {
    min-width: 95px;
    height: 36px;
    background-color: rgba(14, 101, 221, 0.04);
    border-radius: 2px;
    font-size: 14px;
    cursor: pointer;
    outline: none;
    border: none;
    padding: 0 5px;
    color: #0b55bb;
    transition: .5s;
    &:hover {
        background-color: rgba(14, 101, 221, 0.1);
    }
}
.header-icon {
    font-size: 14px;
    color: #0e65dd;
    margin-right: 12px;
}
.header-items-text {
    font-size: 14px;
    color: #383838;
}
.left-part {
    display: flex;
}
.doc-unlock {
    margin-right: 35px;
    cursor: pointer;
    position: relative;
}
.add-doc-header {
    display: flex;
    justify-content: space-between;
    height: 100px;
    align-items: center;
    margin: 0 35px;
}
.dropdown-section {
    position: relative;
}
.dropdown-section-wrapper {
    display: flex;
    align-items: center;
    width: 380px;
    min-height: 70px;
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.08);
    background-color: #fff;
    z-index: 99;
}
.section-position{
    
    position: absolute;
    top: 30px;
}
.choose-panel {
    padding: 20px;
    position: absolute;
    top: 100px;
    max-height: 400px;
    overflow-y: auto;
    width: 380px;
    min-height: 70px;
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.08);
    background-color: #fff;
    z-index: 99;
}
.choose-item {
    width: 340px;
    height: 35px;
    display: flex;
    border-radius: 2px;
    align-items: center;
    cursor: pointer; 
    transition: .5s;

    &:hover {
        background-color: rgb(91, 176, 255);
    }
    p {
        padding-left: 10px;
    }
}
.doc-tags {
    position: relative;
    cursor: pointer;
}
</style>