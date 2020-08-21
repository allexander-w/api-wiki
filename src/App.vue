<template>
  <div id="app">
    <component :is='layout' /> 
  </div>
</template>

<script>
import StartLayout from '@/layouts/StartLayout'
import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'
import EditorLayout from '@/layouts/EditorLayout'
import NotFound from '@/layouts/NotFound'

export default {
  name: 'App',
  components: {StartLayout,AuthLayout,MainLayout,EditorLayout,NotFound},
  computed: {
    layout(){
      return this.$route.meta.layout
    }
  }
}
</script>

<style lang="scss">

*,*::before,*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
body {
  font-family: 'Roboto', sans-serif;
  overflow-x: hidden;
}
a {
  text-decoration: none;
}
p {
  color: #363636;
  font-size: 14px;
  line-height: 20px;
}

.icon {
  color: #0e65dd;
}
.container {
  max-width: 1300px;
  padding: 0 10px;
  margin: 0 auto; 
}
.p-desc {
    color: #4a4a4a;
    font-size: 13px;
    line-height: 25px;
}
.setting-field {
  padding: 10px 10px;
  border-bottom: 1px solid #d8d8d8;
  display: flex;
  justify-content: space-between;

   &:focus-within {

      border-bottom: 1px solid #0e65dd;
  }
}
.setfield-text {
  outline: none;
  border: none;
  font-size: 20px;
  color: #383838;
  &::-webkit-input-placeholder {
    font-size: 20px;
    color: #999999;
  }
 
}
.text-field {
  outline: none;
  border: none;
  border-bottom: 1px solid #d8d8d8;
  padding: 0 10px;

  font-size: 20px;
  color: #383838;

  &::-webkit-input-placeholder {
    font-size: 20px;
    color: #999999;
  }
  &:focus {
    border-bottom: 1px solid #0e65dd;
  }
}
.invalid {
  border-bottom: 1px solid red;
}
.signup-title {
    margin-bottom: 100px;
    color: #ccc;
}
.active-brcrmb {
    color: #383838;
}
.arrow {
    color: #ccc;
    padding: 0 10px;
}
.general-title {
  font-size: 20px;
  color: #383838;
  font-weight: 400;
}
.blue-button {
  border-radius: 2px;
  background-color: #0e65dd;
  border: none;
  outline: none;
  cursor: pointer;
  color: #fff;
  transition: .5s;
  height: 52px;
  padding: 0 5px;
  min-width: 200px;

  &:hover {
    background-color: #0d58c0;
  }
}
.transparent-button {
  border-radius: 2px;
  background-color: transparent;
  border: 1px solid #0e65dd;
  outline: none;
  cursor: pointer;
  color: #0e65dd;
  transition: .5s;
  height: 52px;
  padding: 0 5px;
  min-width: 200px;

  &:hover {
    background-color: #0d58c0;
    border: none;
    color: #fff;
  }
}
.error-message {
  font-size: 13px;
  color: #d0021b;
  padding-top: 10px;
  padding-left: 10px;
}
table {
  font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
  font-size: 14px;
  background: white;
  min-width: 900px;
  border-collapse: collapse;
  text-align: left;
}
th {
  font-weight: normal;
  color: #999;
  font-size: 13px;
  border-bottom: 1px solid #999;
  padding: 10px 8px;
}
td {
  color: #383838;
  padding: 9px 8px;
  transition: .3s linear;
}
.sidebar-title {
  padding: 0 0 30px 25px;
  font-size: 20px;
  color: #383838;
  font-weight: 400;
}
.main-title {
  font-size: 20px;
  color: #383838;
  font-weight: 400;
}
.br-general {
  font-size: 13px;
  color: #999999
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
.sidebar-item {
        font-size: 14px;
        color: #383838;
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
.active-article {
    background-color: rgba(#0e65dd, .1);
    border-radius: 5px;
}
.sidebar-doc {
    font-size: 14px;
    color: #383838;

    &-icon {
        color: #0e65dd;
        font-size: 22px;
        margin-right: 10px;
    }
}
.doc-item-wrapper {
    display: flex;
    padding-left: 25px;
    max-width: 250px;
    cursor: pointer;
    height: 50px;
    align-items: center;
    span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-right: 10px;
    }
}
.works-title {
    margin: 50px 0 35px 0;
}
.work-doc-icon {
    font-size: 32px;
    color: #0e65dd;
    margin-right: 15px;
}
.work-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    margin-left: -20px;
    transition: .3s;
    &:hover {
        border-radius: 3px;
        background-color: rgba(#0e5ac5, .05);
    }
}
.work-title {
    font-size: 14px;
    color: #0b55bb;
}
.information-about-work {
    display: flex;
}
.work-info-p {
    font-size: 12px;
    color: #383838;
    &:not(:last-child) {
        margin-right: 12px;
    }
}
.work-info-span {
    color: #999999;
}

ol.article-list {
    list-style-type: decimal;
    margin-block-start: 30px ;
    margin-block-end: 30px;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-inline-start: 40px;
}
ul.article-list {
    list-style-type: disc;
    margin-block-start: 30px ;
    margin-block-end: 30px;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-inline-start: 40px;
}
.article-code {
    box-sizing: border-box;
    padding: 40px;
    border-radius: 2px;
    background-color: #f7fafe;
    margin-bottom: 40px;
}
.article-code__content {
    font: "Menlo";
    color: #383838;
    display: inline-block;
}
pre, code {
    overflow: auto;
    font-family: monospace, monospace;
    white-space: pre;
}
ul, ol {
    font-size: 14px;
    color: #383838;
}
.block-warning {
  font-size: 14px;
    color: #383838;
}
.article-quote {
    position: relative;
    padding-left: 20px;
    font-size: 14px;

    &:before {
      content: '';
      position: absolute;
      left: -50px;
      top: -10px;
      display: block;
      background-image: url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2241%22%20height%3D%2233%22%20viewBox%3D%220%200%2041%2033%22%3E%0A%20%20%20%20%3Cpath%20fill%3D%22%23CEDDF1%22%20fill-rule%3D%22nonzero%22%20d%3D%22M40.563%209.154c0%206.641-1.392%2011.939-4.175%2015.894-2.784%203.955-7.056%206.518-12.818%207.69v-7.177c2.344-1.27%203.76-3.174%204.248-5.713H23.57V.218h16.992v8.936zm-22.706%200c0%206.641-1.391%2011.939-4.174%2015.894-2.784%203.955-7.056%206.518-12.818%207.69v-7.177c1.465-.782%202.49-1.563%203.076-2.344.586-.781.977-1.904%201.172-3.37H.865V.22h16.992v8.935z%22%2F%3E%0A%3C%2Fsvg%3E%0A);
      width: 50px;
      height: 60px;
      background-position: center;
      background-repeat: no-repeat;
    }
}
blockquote {
    display: block;
    margin-block-start: 60px;
    margin-block-end: 60px;
    margin-inline-start: 40px;
    margin-inline-end: 40px;
}
.article-image img{
  max-width: 600px;
}
.ce-block__content {
    max-width: 950px;
    width: 880px;

}
.ce-paragraph {
    width: 850px;
}
.ce-toolbar__plus {
    left: -150px;
}
.ce-toolbox {
  left: -115px
}

</style>
