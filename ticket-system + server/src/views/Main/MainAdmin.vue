<template>
  <v-container>
    <v-row justify="center">
      <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
        <v-tab :value="1">Активные</v-tab>
        <v-tab :value="2">Готовые</v-tab>
      </v-tabs>
    </v-row>
    <v-window v-model="tab">
      <v-window-item :value="1">
        <v-container fluid>
          <v-row class="ticket-pos" v-if="!loading">
            <div v-for="item in ticket" v-show="item.status == 'Created'" class="ticket">
              <TicketCard :ticket="item"  />
            </div>
          </v-row>
          <v-row class="ticket-pos" v-if="loading">
            <div v-for="item in 20" class="ticket">
              <v-skeleton-loader
              class="mx-auto border"
              width="250"
              height="172"
              type="article"
              ></v-skeleton-loader>
            </div>
          </v-row>
        </v-container>
      </v-window-item>
      <v-window-item :value="2">
        <v-container fluid>
          <v-row class="ticket-pos" v-if="!loading">
            <div v-for="item in ticket" v-show="item.status == 'Done'" class="ticket">
              <TicketCard :ticket="item" />
            </div>
          </v-row>
          <v-row class="ticket-pos" v-if="loading">
            <div v-for="item in 20" class="ticket">
              <v-skeleton-loader
              class="mx-auto border"
              width="250"
              height="172"
              type="article"
              ></v-skeleton-loader>
            </div>
          </v-row>
        </v-container>
      </v-window-item>
    </v-window>
  </v-container>
</template>
  
<script>
  
  import TicketCard from '../../components/Main/TicketCard'

  export default {
    name: 'MainAdmin',
  
    components: {
      TicketCard,
    },
    async mounted(){
      this.loading = true
      let res = await this.$store.dispatch('getAllTickets')
      if(res){
        this.loading = false
      }
    },
    computed: {
      ticket(){
        return this.$store.state.ticket.tickets.toReversed();
      },
    },
    data: () => ({
      tab: 1,
      loading: false,
    }),
  }
</script>
  
<style>

.ticket-pos{
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 0;
  }
  .ticket{
    border-radius: 4px;
    margin: 10px 0 10px 0;
  }
</style>