<template>
    <div class="account">
        <div class="teams">
            <CompanyCard 
                v-for = '(item, index) in teams'
                :key = 'index'
                :companyInfo = 'item'
                class='teamCard'
            />
        </div>

        <div class="company-add-card" @click='addCompany'>
            <i class="fas fa-plus-circle add-icon"></i> <p class="add-comp">Добавить компанию</p>
        </div>

        <Loader v-show="load" />
    </div>
</template>

<script>
import CompanyCard from '@/components/CompanyCard'
import Loader from '@/components/Loader'

export default {
    data: () => ({
        teams: [],
        load: false
    }),
    components: {
        CompanyCard,Loader
    },
    methods: {
        getId(id) {
            console.log(id)
        },
        addCompany(){
            this.$router.push('/add-company')
        }
    },
    async mounted(){
        this.load = true
        const token = localStorage.getItem('token')
        const url = new URL(
            "https://api.itl.wiki/user"
        )

        let headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer "+token,
        }

        fetch(url, {
            method: "GET",
            headers: headers,
        })
            .then(response => response.json())
            .then(json => {
                this.teams = json.data.teams
            })
            .then(()=>{
                this.load = false
            })
    }
}
</script>

<style lang="scss">
.teams{
    display: flex;
    flex-wrap: wrap;
}
.teamCard {
    margin-right: 20px;
}
.account {
    background-color: #f1f6fd;
    padding: 50px 0 0 50px;
    width: calc(100vw - 80px);
    height: 100vh;
}
.aa {
    margin-bottom: 800px;
}
.add-comp {
    font-size: 16px;
    color: #0b55bb;
}
.add-icon{
    color: #0e65dd;
    font-size: 24px;
    margin-right: 15px;
}
.company-add-card{
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px #ceddf1;
  width: 390px;
  height: 140px;
  border-radius: 2px;
  background-color: transparent;
  cursor: pointer;

  transition: .5s;
  &:hover {
      border: solid 1px #b4cff3;
  }
}
</style>