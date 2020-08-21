
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
        async ADD_ARTICLE({}, body){
            const token = localStorage.getItem('token')
            const team_id = localStorage.getItem('teamId')

            const url = new URL(
                `https://api.itl.wiki/team/${team_id}/article/add`
            )
            
            let headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            }

            const res = await (await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            })).json()
            
            return res
        },
        async GET_WORKS({}){
            const token = localStorage.getItem('token')
            const team_id = localStorage.getItem('teamId')

            const url = new URL(
                `https://api.itl.wiki/team/${team_id}/works`
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

            return data.data
        },
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

            console.log(data.data);

            commit('ARTICLE', data.data)
        }
    }
}