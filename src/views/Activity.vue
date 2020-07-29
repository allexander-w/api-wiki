<template>
    <div class="activity">
        <button class="blue-button" @click = 'getSidebar'>
            Проверить
        </button>
    </div>
</template>

<script>
export default {
    methods: {
        addSection(){
            const token = localStorage.getItem('token')
            const team_id = localStorage.getItem('teamId')

            const url = new URL(
                `https://api.itl.wiki/team/${team_id}/section/add`
            )

            let headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
            };

            let body = {
                "name": "Новый раздел",
                "code": "",
                "images": "",
                "section_id": "",
                "description": "Описание раздела"
            }

            fetch(url, {
                method: "POST",
                headers,
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(json => console.log(json));
        },
        getSectionInfo() {
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

            fetch(url, {
                method: "GET",
                headers
            })
                .then(response => response.json())
                .then(json => console.log(json));
        },
        getInSection() {
            const token = localStorage.getItem('token')
            const team_id = localStorage.getItem('teamId')

            const url = new URL(
                `https://api.itl.wiki/team/${team_id}/section/62/sidebar`
            )

            let headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
            }

            fetch(url, {
                method: "GET",
                headers
            })
                .then(response => response.json())
                .then(json => console.log(json));
        },
        getInfoAboutMe() {
            const token = localStorage.getItem('token')
            const team_id = localStorage.getItem('teamId')

            const url = new URL(
                `https://api.itl.wiki/user`
            )

            let headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
            }

            fetch(url, {
                method: "GET",
                headers
            })
                .then(response => response.json())
                .then(json => console.log(json));
        },
        async getSidebar(){
            await this.$store.dispatch('GET_SIDEBAR_HOME')

            console.log(this.getter);
            
        }
    },
    computed: {
        getter(){
            return this.$store.getters.HOMEBAR
        }
    }
}
</script>