export default { 
    actions: {
        async GET_TAGS ({}){
            const token = localStorage.getItem('token')
            const team_id = localStorage.getItem('teamId')

            const url = new URL(
                `https://api.itl.wiki/team/${team_id}/settings/tags`
            )

            let headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
            }

            let body = {
                name: 'newTag'
            }

            const res = await fetch(url, {
                method: "GET",
                headers
            })

            const data = await res.json()
            return data.data
        },
        async FIND_TAG ({}, phrase){
            const token = localStorage.getItem('token')
            const team_id = localStorage.getItem('teamId')

            const url = new URL(
                `https://api.itl.wiki/team/${team_id}/settings/tags/find`
            )

            let headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
            }

            let body = {
                term: phrase
            }

            const res = await fetch(url, {
                method: "POST",
                headers,
                body: JSON.stringify(body)
            })

            const data = await res.json()
            return data.data
        },
        async ADD_TAG ({}, tagName){
            const token = localStorage.getItem('token')
            const team_id = localStorage.getItem('teamId')

            const url = new URL(
                `https://api.itl.wiki/team/${team_id}/settings/tags/add`
            )

            let headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
            }

            let body = {
                name: tagName
            }

            const res = await fetch(url, {
                method: "POST",
                headers,
                body: JSON.stringify(body)
            })

            const data = await res.json()
            console.log(data)
        }
    }
}