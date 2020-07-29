export default { 
    state: {
    },
    mutations: {
    },
    actions: {
        async SIGN_IN({dispatch}, {email, password}) {
            const url = new URL(
                "https://api.itl.wiki/user/login"
            )
            
            let headers = {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
            
            let body = {
                email,
                password
            }
            
            const res = await fetch(url, {
                method: "POST",
                headers,
                body: JSON.stringify(body)
            })
            const data = await res.json()
            
            localStorage.setItem('token', data.data.token)

            console.log(data.data.token)
        },
        async SIGN_UP({dispatch}, formData) {

            const url = new URL(
                "https://api.itl.wiki/user/register/secure"
            );

            let headers = {
                "Content-Type": "application/json",
                "Accept": "application/json"
            };

            let body = {
                "first_name": formData.name,
                "last_name": formData.surname,
                "email": formData.email,
                "password": formData.password,
                "password_confirmation": formData.passConf
            }
            
            const res = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            })

            const data = await res.json()
            console.log(data)
            if (data.status === 'error') {
                return
            }

            await dispatch('SIGN_IN', formData)

        },
        GET_TOKEN({dispatch}){
            const token = localStorage.getItem('token')
            return token || ''
        },
        CLEAR_STORAGE({dispatch}){
            localStorage.clear()
        }
    },
    getters: {
        
    }
}