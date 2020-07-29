export default {
    actions: {
        async EDIT_PROFILE({dispatch}, {first_name, last_name, email}){
            const token = localStorage.getItem('token')
            const url = new URL(
                "https://api.itl.wiki/user/common/edit"
            );
            
            let headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
            };
            
            let body = {
                first_name,
                last_name,
                email
            }
            
            const res = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            })

            const data = await res.json()

            return data.message
        },
        async GET_USER({dispatch}) {
            const token = localStorage.getItem('token')

            const url = new URL(
                "https://api.itl.wiki/user"
            );

            let headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer "+ token,
            };

            const res = await fetch(url, {
                method: "GET",
                headers: headers,
            })
            const data = await res.json()

            return data.data
        },
        async CHANGE_PASS({dispatch}, {password, new_password}){
            const token = localStorage.getItem('token')
            const url = new URL(
                "https://api.itl.wiki/user/password/edit"
            );
            
            let headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
            };
            
            let body = {
                password,
                new_password
            }
            
            const res = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            })
            const data = await res.json()
            
            return data.message
        }
    }
}