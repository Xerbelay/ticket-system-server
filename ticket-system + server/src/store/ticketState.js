import api from './api'
export const ticketState = {
    state: {
        tickets: JSON.parse(localStorage.getItem('tickets')) ?? []
    },
    mutations: {
        ADD_TICKET(state, payload){
            const ticket = {
                id: Date.now(), 
                summary: payload.summary, 
                status: 'Created', 
                priority: payload.priority, 
                content: payload.content,
                from: payload.from,
                create_date: new Date().toLocaleString(), 
                update_date: '', 
                answ: ''
            }
            state.tickets.push(ticket)
            localStorage.setItem('tickets', JSON.stringify(state.tickets))
        },
        DELETE_TICKET(state, id){
            state.tickets = state.tickets.filter((ticket) => 
            {
                if(ticket.id != id){
                    return ticket
                }
            })

            localStorage.setItem('tickets', JSON.stringify(state.tickets))
        },
        REPLY_TICKET(state, payload){
            state.tickets.forEach((ticket) => 
            {
                if(ticket.id == payload.id){
                    let date = new Date()

                    let update_date = date.toLocaleString()

                    ticket.answ = payload.ticketData.answ
                    ticket.status = 'Done'
                    ticket.update_date = update_date
                }
            })

            localStorage.setItem('tickets', JSON.stringify(state.tickets))
        },
        SET_TICKET(state, payload){
            payload.forEach((time) => {
                time.create_date = new Date(time.create_date).toLocaleString()
                time.update_date = new Date(time.update_date).toLocaleString()
            })
            state.tickets = payload
            localStorage.setItem('tickets', JSON.stringify(state.tickets))
        },
    },
    actions: {
        async getAllTickets({ commit }, payload) {
            try {
                const res = await api.get("/ticket/all")
                commit("SET_TICKET", res.data)
                return res.data
            } catch (error) {
                console.log(error)
            }
        },
        async getUserTickets({ commit }, username) {
            try {
                const res = await api.get("/ticket/user/" + username)
                commit("SET_TICKET", res.data)
                return res.data
            } catch (error) {
                console.log(error)
            }
        },
        async addTicket({ commit }, ticketData) {
            try {
                await api.post("/ticket", ticketData)
                commit("ADD_TICKET", ticketData)
            } catch (error) {
                console.log(error)
            }
        },
        async updateTicket({ commit }, {id, ticketData}) {
            try {
                await api.put("/ticket/" + id, ticketData)
                commit("REPLY_TICKET", {id, ticketData})
            } catch (error) {
                console.log(error)
            }
        },
        async deleteTicket({ commit }, id) {
            try {
                await api.delete("/ticket/" + id)
                commit("DELETE_TICKET", id)
            } catch (error) {
                console.log(error)
            }
        },
    }
}