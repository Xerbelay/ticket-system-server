<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row align="center" justify="center">
          <v-card class="mx-auto" width="350px">
            <v-card-item>
              <div>
                <img class="img"
                  src="https://sun1-20.userapi.com/s/v1/ig2/QMbUxDekZdcFqMtVg66ieGV15hgouRDJ9GGYfr-h2myeHUEdRl7tmQMZ6MJpMfOpeBVPuNCWsNlCaIPCfx4w7rOX.jpg?size=2400x2400&quality=95&crop=0,0,2400,2400&ava=1">
                <div class="flex mar">
                  <div>Имя: <div class="empty"></div></div>
                  <div v-if="!isEdit">{{ this.user.full_name }}</div>
                  <div v-else>
                    <input placeholder="Введите имя" type="text" v-model="name">
                    <div class="box">
                      <div v-if="errorsName.length">
                        <span v-for="error in errorsName" class="errors">{{ error }}<br></span>
                      </div>
                      <div v-if="!errorsName.length">
                        <div class="empty"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex">
                  <div>e-mail: <div class="empty"></div></div>
                  <div v-if="!isEdit">{{ this.user.email }}</div>
                  <div v-else>
                    <input placeholder="Введите email" type="text" v-model="email">
                    <div class="box">
                      <div v-if="errorsEmail.length">
                        <span v-for="error in errorsEmail" class="errors">{{ error }}<br></span>
                      </div>
                      <div v-if="!errorsEmail.length">
                        <div class="empty"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex">
                  <div>Пароль: <div class="empty"></div></div>
                  <div v-if="!isEdit">{{ this.user.password }}</div>
                  <div v-else>
                    <input placeholder="Введите пароль" type="text" v-model="pass">
                    <div class="box">
                      <div v-if="errorsPassword.length">
                        <span v-for="error in errorsPassword" class="errors">{{ error }}<br></span>
                      </div>
                      <div v-if="!errorsPassword.length">
                        <div class="empty"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex" v-if="!isEdit">
                  <div>Логин: </div>
                  <div>{{ this.user.login }} <div class="empty"></div></div>
                  <div class="empty"></div>
                </div>
                <div class="flex" v-if="!isEdit">
                  <div>роль: </div>
                  <div>{{ this.user.user_type }}</div>
                </div>
              </div>
            </v-card-item>

            <v-card-actions class="flex1">
              <v-btn @click="logOut" v-if="!isEdit">
                выйти с аккаунта
              </v-btn>
              <v-btn @click="cancel" v-else>
                <p>Отменить</p>
              </v-btn>
              <v-btn @click="Edit" v-if="!isEdit">
                <p>редактировать</p>
              </v-btn>
              <v-btn @click="saveEdit" v-else>
                <p>Сохранить</p>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>


export default {
  name: 'UserInfo',

  components: {

  },
  async mounted(){
      await this.$store.dispatch('getUser', { id: this.user.id})
    },
  data: () => ({
    isEdit: false,
    email: '',
    pass: '',
    name: '',
    errorsName: [],
    errorsPassword: [],
    errorsEmail: [],
  }),
  computed: {
    user() {
      return this.$store.state.user.curUser
    }
  },
  methods: {
    logOut() {
      this.$store.commit('LOGOUT')
      this.$router.push('/login')
    },
    Edit() {
      this.isEdit = !this.isEdit
    },
    cancel(){
      this.isEdit = !this.isEdit
    },
    saveEdit() {
      this.errorsName = []
      this.errorsPassword = []
      this.errorsEmail = []
      while (this.name.length < 1 || this.pass.length < 1 || this.email.length < 1) {
        if (this.name.length < 1) {
          this.errorsName.push('Поле не должно быть пустым!');
        }

        if (this.pass.length < 1) {
          this.errorsPassword.push('Поле не должно быть пустым!');

        }

        if (this.email.length < 1) {
          this.errorsEmail.push('Поле не должно быть пустым!');
        }
        return
      }

      const payload = {
        email: this.email,
        password: this.pass,
        full_name: this.name,
        id: this.user.id
      }
      this.isEdit = !this.isEdit

      this.email = ''
      this.pass = ''
      this.name = ''

      this.$store.dispatch('editProfile', { id: this.user.id, userData: payload })
    }
  }
}
</script>

<style scoped>
.img {
  height: 100px;
  width: 100px;
}

.flex {
  display: flex;
  justify-content: flex-start;
}

.mar {
  margin-top: 10px;
}
.errors {
  color: rgb(150, 28, 28);
  font-size: 12px;
}

.empty {
  height: 24px;
}

.box {
  margin-top: 0px;
}
.flex1{
  display: flex;
  justify-content: space-around;
}
</style>