export default {
    state: {
        currentMenu: 'SidebarHome',
        whatHomeBar: false,
        whatSetBar: '',
        homeBar: [
            {id: 1, name: 'home', component: 'SidebarHome'},
            {id: 2, name: 'plus', component: 'SidebarAdd'},
            {id: 3, name: 'search', component: 'SBSearch'}
        ],
        homeBarWithoutCompany: [
            {id: 1, name: 'home', component: 'SidebarUser'}
        ],
        setBarRoleOwner: [
            {id: 1, name: 'fas fa-cog', component: 'SidebarSettings'},
            {id: 2, name: 'far fa-bell', component: 'SidebarbarNotif'},
            {id: 3, name: 'far fa-question-circle', component: 'SidebarInfo'},
            {id: 4, name: 'far fa-user', component: 'SidebarUser'}
        ],
        setBarRoleUser: [
            {id: 1, name: 'far fa-user', component: 'SidebarUser'}
        ],
        setBarRoleAdmin: [
            {id: 1, name: 'fas fa-cog', component: 'SidebarSettings'},
            {id: 2, name: 'far fa-user', component: 'SidebarUser'}
        ]
    },
    mutations: {
        CHANGE_SIDEBAR (state, data){
            state.currentMenu = data
        },
        HOME_NAVBAR(state, bool) {
            state.whatHomeBar = bool
        },
        SET_NAVBAR(state, value) {
            state.whatSetBar = value
        }
    },
    actions: {
        GET_SIDEBAR_HOME({commit}){
            const role = localStorage.getItem('role')
            const team_id = localStorage.getItem('teamId')
            
            if (!role && !team_id){
                commit('HOME_NAVBAR', false)
            } else {
                commit('HOME_NAVBAR', true)
            }
        },
        GET_SIDEBAR_SET({commit}){
            const role = localStorage.getItem('role')
            const team_id = localStorage.getItem('teamId')
            
            if (!role && !team_id){
                commit('SET_NAVBAR', '4')
            } 

            if (role === '1') {
                commit('SET_NAVBAR', '1')
            }
            if (role === '2') {
                commit('SET_NAVBAR', '2')
            }
            if (role === '3') {
                commit('SET_NAVBAR', '3')
            }
            if (role === '4') {
                commit('SET_NAVBAR', '4')
            }

        }
    },
    getters: {
        HOMEBAR(state){
            const role = localStorage.getItem('role')
            const team_id = localStorage.getItem('teamId')
            
            if (state.whatHomeBar) {
                return state.homeBar
            } else {
                return state.homeBarWithoutCompany
            }
        },
        SETBAR(state){
            
            if (state.whatSetBar === '1') {
                return state.setBarRoleOwner
            }
            if (state.whatSetBar === '2') {
                return state.setBarRoleAdmin
            }
            if (state.whatSetBar === '3') {
                return state.setBarRoleAdmin
            }
            if (state.whatSetBar === '4') {
                return state.setBarRoleUser
            }
        },
        CURRENT_MENU(state) {
            return state.currentMenu
        }
    }
}