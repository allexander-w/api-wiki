export default { 
    state: {
        insection: {}
    },
    mutations: {
        INSECTION(state, data) {
            state.insection = data
        }
    },
    getters: {
        INSECTION(state){
            return state.insection
        }
    },
    actions: {
        async SECTIONS({dispatch}){
            const token = localStorage.getItem('token')
            const team_id = localStorage.getItem('teamId')

            const url = new URL(
                `https://api.itl.wiki/team/${team_id}/section`
            )

            let headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
            }

            const res = await fetch(url, {
                method: "GET",
                headers
            })

            const data = await res.json()
            return data.data
        },
        async GET_INSECTION({commit}, sectionId) {
            const token = localStorage.getItem('token')
            const team_id = localStorage.getItem('teamId')

            const url = new URL(
                `https://api.itl.wiki/team/${team_id}/section/${sectionId}`
            )

            let headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
            }

            const res = await fetch(url, {
                method: "GET",
                headers
            })

            const data = await res.json()
            
            commit('INSECTION', data.data)
        },
        async SIDEBAR_WORKS({commit}, sectionId) {
            const token = localStorage.getItem('token')
            const team_id = localStorage.getItem('teamId')

            const url = new URL(
                `https://api.itl.wiki/team/${team_id}/section/${sectionId}`
            )

            let headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
            }

            const res = await fetch(url, {
                method: "GET",
                headers
            })

            const data = await res.json()
            
            return data.data.articles
        },
        async ADD_SECTION({}, formData) {
            const token = localStorage.getItem('token')
            const team_id = localStorage.getItem('teamId')

            const url = new URL(
                `https://api.itl.wiki/team/${team_id}/section/add`
            )

            let headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
            }
            
            const res = await fetch(url, {
                method: "POST",
                headers,
                body: JSON.stringify(formData)
            })

            const data = await res.json()
            
            console.log(data)
            
        },
        async ALL_SECTIONS ({}){
            const token = localStorage.getItem('token')
            const team_id = localStorage.getItem('teamId')

            const url = new URL(
                `https://api.itl.wiki/team/${team_id}/section`
            )

            let headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
            }

            const res = await fetch(url, {
                method: "GET",
                headers
            })

            const data = await res.json()

            return data.data
        },
        async SECTION_SIDEBAR({commit}, sectionId) {
            const token = localStorage.getItem('token')
            const team_id = localStorage.getItem('teamId')

            const url = new URL(
                `https://api.itl.wiki/team/${team_id}/section/${sectionId}`
            )

            let headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
            }

            const res = await fetch(url, {
                method: "GET",
                headers
            })

            const data = await res.json()

            return data.data.children
        },
        async GET_SIDEBAR_NAME({commit}, sectionId) {
            const token = localStorage.getItem('token')
            const team_id = localStorage.getItem('teamId')

            const url = new URL(
                `https://api.itl.wiki/team/${team_id}/section/${sectionId}`
            )

            let headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
            }

            const res = await fetch(url, {
                method: "GET",
                headers
            })

            const data = await res.json()
            return data.data.section.name
        }
    }
}