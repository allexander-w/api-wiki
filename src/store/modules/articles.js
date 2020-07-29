export default {
    state: {
        article: {}
    },
    mutations: {
        ARTICLE(state, data) {
            state.article = data
        }
    },
    getters: {
        ARTICLE(state){
            return state.article
        }
    },
    actions: {
        async GET_ARTICLE({commit}, articleId){
            const token = localStorage.getItem('token')
            const team_id = localStorage.getItem('teamId')

            const url = new URL(
                `https://api.itl.wiki/team/${team_id}/article/${articleId}`
            )
            
            let headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            }
            
            const res = await fetch(url, {
                method: "GET",
                headers
            })
            
            const data = await res.json()

            commit('ARTICLE', data.data)
        }
    }
}