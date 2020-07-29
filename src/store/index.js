import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import profile from './modules/profile'
import companies from './modules/companies'
import employees from './modules/employees'
import sections from './modules/sections'
import sidebar from './modules/sidebar'
import articles from './modules/articles'

Vue.use(Vuex)

 const store = new Vuex.Store({
  modules: {
    auth, profile, companies, employees, sections, sidebar, articles
  }
})

export default store
