export default {
    actions: {
        async COMPANY_VIEW({}){
            const token = localStorage.getItem('token')
            const team_id = localStorage.getItem('teamId')
            const url = new URL(
                `https://api.itl.wiki/team/${team_id}`
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
            console.log(data)

            return data.data.team
        },
        async EDIT_TEAM({dispatch}, {code,name}){
            const token = localStorage.getItem('token')
            const team_id = localStorage.getItem('teamId')
            const url = new URL(
                `https://api.itl.wiki/team/${team_id}/edit`
            );

            let headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
            };

            let body = {
                code,
                name
            }

            const res = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            })
            const data = await res.json()
        },
        async ADD_TEAM ({dispatch}, {code, name}){
            const token = localStorage.getItem('token')
            const url = new URL(
                "https://api.itl.wiki/team/add"
            );

            let headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
            };

            let body = {
                code,
                name
            }

            const res = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            })
            const data = await res.json()

            return data
        },
        async CHECK_CODE({dispatch}, {code}){
            const token = localStorage.getItem('token')
            const url = new URL(
                "https://api.itl.wiki/team/code/check"
            );

            let headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
            };

            let body = {
                code
            }

            const res = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            })
            const data = await res.json()

            return data.status
        }
    }
}