<template>
    <div class="add-doc">
        <div class="error-popup" v-if='$v.title.$dirty && !$v.title.required'>
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
                    <div class="tags-modal-wrapper"  v-show='tags'>
                        <div class="modal-doc modal-tags">
                            <input @keyup="search" type="text" v-model='tag' placeholder="Введите название тега" class="modal-doc-input">
                        </div>
                        <div class="tags-field" v-if='tag' >

                                <div class="current-tags" v-if='currentTags.length'>
                                    <div class="tag-item"
                                        v-for='(currentTag, index) in currentTags'
                                        :key= '`curtag${index}`'
                                    >
                                        <p class="current-tag-name">{{currentTag}}</p>
                                        <i @click='deleteTag(currentTag)' class="fas fa-times clear-tag"></i>
                                    </div>
                                </div>
                            <div class="current-tag-wrapper">
                                <p class='tag-current' 
                                    v-for='(tag, index) in arrayTags'
                                    :key='index'
                                    @click='addThisTag(tag)'
                                >
                                    <i class="fas fa-tag icon-tag"></i>
                                    {{tag.name}}
                                </p>
                            </div>
                        
                            <p class='tag-name' @click = 'addTag'>
                                Создать тег <b>{{tag}}</b>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-part">
                <button class="doc-btn publish-btn" @click="postContent" v-if = 'isRole'>Опубиковать</button>
                <button class="doc-btn publish-btn" @click="postContent" v-else>Отправить на модерацию</button>
                <button class="cancel-btn" @click='cancel'>Отменить</button>
                <i class="fas fa-ellipsis-h doc-menu"></i>
            </div>
        </div>
        <div class="doc-main-content">
            <div class="dropdown-section" v-click-outside='chooseHide'>
                <p class="choose-title" @click = 'choose = true'>{{currentName === '' ? 'Выбор раздела' : currentName}}</p>
                <div class="sec-wrapper" v-show='choose'>
                    <div class="dropdown-section-wrapper section-position" >
                        <input type="text" class="choose-section modal-doc-input" v-model='searchSection' placeholder="Название раздела">
                    </div>
                    <div class="choose-panel">
                        <div class="find-wrapper" v-if='searchSection'>
                            <div class="choose-item-wrapper"
                                v-for='(separateSec, index) in filteredSections'
                                :key ='`find${index}`'
                                
                            >
                                <div class="choose-item"
                                    @click="select(separateSec)"
                                >
                                    <p>{{separateSec.name}}</p>
                                </div>
                            </div>
                        </div>

                        <div class="find-wrapper" v-else-if = '!searchSection'>
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
                
            </div>
            <input type="text" v-model="title" class="header-input" placeholder="Заголовок статьи">

        </div>
        <editor ref="editor" :config="config" :initialized="onInitialized" class="doc-editor" />

        <Loader v-show="load" />

    </div>
</template>

<script>

import ClickOutside from 'vue-click-outside'
import {mapGetters} from 'vuex'
import { required } from 'vuelidate/lib/validators'
import Loader from '@/components/Loader'

import {Editor} from 'vue-editor-js'
import List from '@editorjs/list'
import Header from '@editorjs/header'
import SimpleImage from '@editorjs/simple-image'
import CodeTool from '@editorjs/code'
import Delimiter from '@editorjs/delimiter'
import Quote from '@editorjs/quote'
import Checklist from '@editorjs/checklist'
import Table from '@editorjs/table'
import Warning from '@editorjs/warning'
import RawTool from '@editorjs/raw'
import ImageTool from '@editorjs/image'


export default {
    components: {
        Loader, Editor
    },
    data: () => ({
        searchSection: '',
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
        currentName: '',
        tag: '',
        arrayTags: [],
        currentTags: [],
        separateSections: [],

        config: {
            tools: {
                list: {
                    class: List,
                    inlineToolbar: true
                },
                header: {
                    class: Header,
                    config: {
                        placeholder: 'Enter a header',
                        levels: [1, 2, 3, 4, 5, 6],
                        defaultLevel: 3
                    }
                },
                image: {
                    class: ImageTool,
                    config: {
                        endpoints: {
                        byFile: '', 
                        byUrl: '',
                        }
                    }
                },
                code: {
                    class: CodeTool
                },
                table: {
                    class: Table,
                    inlineToolbar: true,
                    config: {
                    rows: 2,
                    cols: 3,
                    },
                },
                checklist: {
                    class: Checklist,
                },
                warning: {
                    class: Warning,
                    inlineToolbar: true,
                    shortcut: 'CMD+SHIFT+W',
                    config: {
                    titlePlaceholder: 'Title',
                    messagePlaceholder: 'Message',
                    },
                },
                raw: RawTool,
                quote: {
                    class: Quote,
                    inlineToolbar: true,
                    shortcut: 'CMD+SHIFT+O',
                    config: {
                    quotePlaceholder: 'Enter a quote',
                    captionPlaceholder: 'Quote\'s author',
                    },
                },
                delimiter: Delimiter,
                onChange: (args) => {
                    console.log('Now I know that Editor\'s content changed!')
                }

            }
        }
    }),
    validations: {
        title: {required}
    },
   
    directives: {
     ClickOutside
    },
    computed: {
        isRole(){
            const role = localStorage.getItem('role')
            return role === '1' || role === '2' || role === '3'
        },
        filteredSections(){
            const text = this.searchSection
            return this.separateSections.filter(elem => {
                return elem.name.toLowerCase().includes(text.toLowerCase())
            })
        }
    },
    mounted() {
        this.sidebarUpdate()
    },
    methods: {
        onInitialized (editor) {
            console.log(editor)
        },
        deleteTag(name){
            this.currentTags = this.currentTags.filter(tag => tag != name)
        },
        addThisTag({id, name}) {
            if (this.currentTags.includes(name)){
                return
            }
            this.currentTags.push(name)
        },
        search(){
            if (this.tag === ''){
                return
            }
            setTimeout(async ()=>{
                this.arrayTags = await this.$store.dispatch('FIND_TAG', this.tag)
            }, 300)
        },
        
        async addTag(){
           // await this.$store.dispatch('ADD_TAG')
            if (this.currentTags.includes(this.tag)){
                return
            }
            this.currentTags.push(this.tag)

        },
        select({id, name}) {
            
            this.currentName = name
            this.section = id

            console.log(id)
            this.searchSection = ''
            this.choose = false
        },
        tagsHide(){
            this.tags = false
            this.tag = ''
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
            let action
            if (this.isRole) {
              action = 3  
            } else {
                action = 2
            }
            
            const editorData = await this.$refs.editor.state.editor.save()
            
            let body = {
                "section": this.section,
                "action": action,
                "name": this.title,
                "blocks": JSON.stringify(editorData.blocks),
                "images": "",
                "abilities": "",
                "code": "",
                "tags": this.currentTags
            } 

            this.$store.dispatch('ADD_ARTICLE', body)

            this.$router.push('/account')
        },
        async sidebarUpdate(){
            this.sections = []
            this.separateSections = []
            const array = await this.$store.dispatch('SECTIONS')
            this.separateSections = array
            array.forEach(async element => {
                if (element.level === 1) {
                    element.children = await this.$store.dispatch('SECTION_SIDEBAR', element.id)
                        element.children.forEach (async el => {
                            el.children = await this.$store.dispatch('SECTION_SIDEBAR', el.id)
                        })
                    this.sections.push (element)
                }
            })
            console.log(this.separateSections)

            this.arrayTags = []
            this.arrayTags = await this.$store.dispatch('GET_TAGS')

        },
        cancel(){
            alert ('Изменения не сохранятся, вы точно хотите выйти?')
            this.$router.push('/account')
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
.clear-tag {
    color: #999;
    font-size: 12px;
    transition: .5s;

    &:hover { 
        color: #0e65dd;
    }
}
.icon-tag {
    margin-right: 15px;
    color: #999;
}
.current-tag-name {
    margin-right: 15px;
}
.current-tags {
    max-width: 380px;
    display: flex;
    flex-wrap: wrap;
}
.tag-item{
    height: 35px;
    border: 1px solid #9dbbe4;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    margin-bottom: 20px;
    margin-right: 10px;
}
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
.tag-current {
    padding: 15px 10px;
    border-radius: 2px;
    transition: .5s;

    &:hover {
        background-color: rgba(14, 90, 197, 0.05);
    }
}
.current-tag-wrapper {
    padding-bottom: 15px;
}
.tags-field {
    width: 380px;
    min-height: 70px;
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.08);
    z-index: 99;
    padding: 30px;
    background-color: #fff;
    position: absolute;
    top: 117px;
}
.modal-doc {
    display: flex;
    align-items: center;
    width: 380px;
    min-height: 70px;
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.08);
    top: 40px;
    background-color: #fff;
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
    width: 900px;
    margin: 0 auto;
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
    width: 900px;
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