<template>
    <v-dialog max-width="500" v-model="dialog">
        <template v-slot:activator="{ props: activatorProps }">
            <v-card variant='outlined' width="250px"
                :color="ticket.priority == 'HIGH' ? 'red' : ticket.priority == 'MED' ? 'orange' : 'grey'">
                <v-card-item class="padding">
                    <div>
                        <div class="text-overline mb-1 ticket_content">
                            {{ ticket.from }}
                        </div>
                        <div class="text-h6 mb-1 ticket_content">
                            {{ ticket.summary }}
                        </div>
                        <div class="text-caption ticket_content ticket">{{ ticket.content }}</div>
                    </div>
                </v-card-item>

                <v-card-actions class="flex">
                    <div>
                        <v-btn @click="deleteTicket()">
                            <p>Удалить</p>
                        </v-btn>
                        <v-btn v-bind="activatorProps">
                            <p>Показать</p>
                        </v-btn>
                    </div>
                </v-card-actions>
            </v-card>
        </template>
        <template v-slot:default="{ isActive }">
            <v-card title="Полная информация">
                <v-card-text>
                    <div>
                        <div class="ticket">
                            <p>{{ 'Тема: ' + ticket.summary }}</p>
                            <p>{{ 'Содержание: ' + ticket.content }}</p>
                            <p>Важность: <span :style="{ 'color': ticket.priority == 'HIGH' ? 'red' : ticket.priority == 'MED' ? 'orange' : 'grey' }">{{ticket.priority }}</span></p>
                            <p>{{ 'Пользователь: ' + ticket.from }}</p>
                            <p>Статус: <span :style="{ 'color': ticket.status == 'Done' ? 'green' : 'red' }">{{ ticket.status }}</span></p>
                            <p>{{ 'Дата создания: ' + ticket.create_date }}</p>
                            <hr class="hr" v-if="ticket.status == 'Done'">
                            <p v-if="ticket.status == 'Done'">{{ 'Ответ: ' + ticket.answ }}</p>
                            <p v-else class="textarea2" v-show="user.user_type == 'admin'">Ответ: 
                                <br> 
                                <textarea v-model="answ" placeholder="Ваш ответ..."></textarea>
                            </p>
                            <p v-if="ticket.status == 'Done'">{{ 'Дата ответа: ' + ticket.update_date }}</p>
                        </div>
                    </div>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn text="Закрыть" @click="isActive.value = false"></v-btn>
                    <v-btn text="Пометить как выполненное" @click="replyTicket()" v-show="user.user_type == 'admin' && ticket.status == 'Created'"></v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script>
export default {
    data(){
        return{
            answ: '',
            dialog: false,
        }
    },
    props: {
        ticket: Object,
    },
    computed: {
        user() {
            return this.$store.state.user.curUser
        }
    },
    methods: {
        replyTicket(){
            let payload = {
                answ: this.answ,
                status: 'Done',
                id: this.ticket.id
            }
            /* this.$store.commit('REPLY_TICKET', payload) */
            this.$store.dispatch('updateTicket', {id: this.ticket.id, ticketData: payload})
            this.dialog = false
        },
        deleteTicket(){
            /* this.$store.commit('DELETE_TICKET', {id: this.ticket.id}) */
            let id = this.ticket.id
            this.$store.dispatch('deleteTicket', id)
        }
    }
}
</script>

<style scoped>
.textarea2{
    width: 100%;
}

textarea{
    resize: none;
    width: 100%;
    height: 200px;
}

.ticket_content {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.flex {
    display: flex;
    justify-content: space-around;
    padding-top: 0px;
}
.padding{
    padding-bottom: 0;
}
</style>