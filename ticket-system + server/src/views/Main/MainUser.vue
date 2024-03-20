<template>
  <v-container>
    <v-row justify="center">
      <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
        <v-tab :value="1">Форма</v-tab>
        <v-tab :value="2">История тикетов</v-tab>
      </v-tabs>
    </v-row>
    <v-window v-model="tab">
      <v-window-item :value="1">
        <v-container fluid>
          <v-row>
            <v-sheet width="300" class="mx-auto">
              <v-form @submit.prevent>
                <br>
                <v-text-field v-model="summary" label="Тема тикета" />
                <div class="box">
                  <div v-if="errorsSum.length">
                    <span v-for="error in errorsSum" class="errors">{{ error }}<br></span>
                  </div>
                  <div v-if="!errorsSum.length">
                    <div class="empty"></div>
                  </div>
                </div>
                <v-textarea v-model="content" label="Описание проблемы" />
                <div class="box">
                  <div v-if="errorsCont.length">
                    <span v-for="error in errorsCont" class="errors">{{ error }}<br></span>
                  </div>
                  <div v-if="!errorsCont.length">
                    <div class="empty"></div>
                  </div>
                </div>
                <v-select v-model="priority" label="Приоритет" :items="['LOW', 'MED', 'HIGH']" />
                <div class="box">
                  <div v-if="errorsPriority.length">
                    <span v-for="error in errorsPriority" class="errors">{{ error }}<br></span>
                  </div>
                  <div v-if="!errorsPriority.length">
                    <div class="empty"></div>
                  </div>
                </div>
                <v-btn @click="addTicket" type="submit" block class="mt-2">Создать тикет</v-btn>
              </v-form>
            </v-sheet>
          </v-row>
        </v-container>
      </v-window-item>
      <v-window-item :value="2">
        <v-container fluid>
          <v-row class="ticket-pos" v-if="!loading">
            <div v-for="item in ticket" class="ticket">
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
  name: 'MainUser',

  components: {
    TicketCard,
  },
  mounted(){
    this.$store.dispatch('getUserTickets', this.user.login)
  },
  data: () => ({
    tab: 1,
    summary: '',
    content: '',
    priority: '',
    errorsSum: [],
    errorsCont: [],
    errorsPriority: [],
    loading: false,
  }),
  computed: {
    ticket() {
      return this.$store.state.ticket.tickets.toReversed();
    },
    user() {
      return this.$store.state.user.curUser
    }
  },
  methods: {
    addTicket() {
      this.errorsSum = [];
      this.errorsCont = [];
      this.errorsPriority = [];
      while(this.summary.length < 1 || this.content.length < 1 || this.priority == ''){
        if (this.summary.length < 1) {
          this.errorsSum.push('Поле не должно быть пустым!');
        }

        if (this.content.length < 1) {
          this.errorsCont.push('Поле не должно быть пустым!');
          
        }

        if (this.priority == '') {
          this.errorsPriority.push('Выберите приоритет!');
        }
        return
      }

      const ticketContent = {
        summary: this.summary,
        content: this.content,
        priority: this.priority,
        from: this.user.login,
      };
      // this.$store.commit('ADD_TICKET', newTicket)
      this.$store.dispatch('addTicket', ticketContent)

      this.summary = '';
      this.content = '';
      this.priority = '';
    }
  }
}
</script>

<style>
.ticket-pos {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0;
}

.ticket {
  border-radius: 4px;
  margin: 10px 0 10px 0;
}

.errors {
  color: rgb(150, 28, 28);
  font-size: 12px;
}

.empty {
  height: 24px;
}

.box {
  margin-top: -15px;
}
</style>