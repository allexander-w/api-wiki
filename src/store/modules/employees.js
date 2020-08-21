export default {
    actions: {
        async CHANGE_ROLE ({}, body){
            const team_id = localStorage.getItem('teamId')
            const token = localStorage.getItem('token')

            const url = new URL(
                `https://api.itl.wiki/team/${team_id}/employees/role/change`
            );

            let headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            }

            const res = await fetch(url, {
                method: "POST",
                headers,
                body: JSON.stringify(body)
            })
            
            const data = await res.json()
        },
        async ADD_EMPLOYEE ({dispatch}, {emails, attachable}){
            const team_id = localStorage.getItem('teamId')
            const token = localStorage.getItem('token')

            const url = new URL(
                `https://api.itl.wiki/team/${team_id}/employees/add`
            );

            let headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            }
            const body = {
                emails,
                attachable
            }

            const data = await ( await fetch(url, {
                method: "POST",
                headers,
                body: JSON.stringify(body)
            })).json()
            
            return data
        },
        async GET_EMPLOYEES({dispatch}){
            const team_id = localStorage.getItem('teamId')
            const token = localStorage.getItem('token')

            const url = new URL(
                `https://api.itl.wiki/team/${team_id}/employees`
            );

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
            
            return data.data.employees
        }
    }
}