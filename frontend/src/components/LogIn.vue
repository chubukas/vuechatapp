<template>
  <div id="id" class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header">Login for Chat</div>
                  <div class="card-body">
                    <div
                      :class="[
                        errorStatus ? 'bg-danger' : 'bg-success',
                        'text-white my-2 py-2',
                      ]"
                      v-if="servermessage !== ''"
                    >
                      {{ servermessage }}
                    </div>
                    <div class="row g-3">
                      <div class="form-floating col-md-6">
                        <input
                          type="text"
                          class="form-control"
                          v-model="inputs.UsernameOrEmail"
                          id="floatingusername"
                          @keypress="keypress('UsernameOrEmail')"
                        />
                        <label for="floatingusername"
                          >Enter your username Or Email</label
                        >
                        <small
                          v-if="check.username"
                          class="form-text text-danger"
                          >username or email is needed</small
                        >
                      </div>

                      <div class="form-floating col-md-6">
                        <input
                          type="password"
                          class="form-control"
                          v-model="inputs.password"
                          id="floatingpassword"
                          @keypress="keypress('password')"
                        />
                        <label for="floatingpassword"
                          >Enter your password</label
                        >
                        <small
                          v-if="check.password"
                          class="form-text text-danger"
                          >password is needed</small
                        >
                      </div>

                      <button
                        class="btn btn-primary col-md-4"
                        @click="sendData"
                      >
                        Enter
                      </button>
                      <div class="col-md-4">
                        Not registered yet?
                        <router-link :to="{ name: 'Register' }"
                          >Sign Up</router-link
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validateInputs } from "@/helpers/validateInputs";
import { LOGIN_USER } from "@/graphql";
export default {
  name: "Login",

  data() {
    return {
      inputs: {
        UsernameOrEmail: "",
        password: "",
      },
      check: {
        UsernameOrEmail: false,
        password: false,
      },
      errorStatus: false,
      servermessage: "",
    };
  },

  methods: {
    async sendData() {
      if (this.showError()) {
        return;
      }

      try {
        const { data } = await this.$apollo.mutate({
          mutation: LOGIN_USER,
          variables: {
            ...this.inputs,
          },
        });
        localStorage.setItem("token", JSON.stringify(data.signIn.token));
        localStorage.setItem("user", JSON.stringify(data.signIn.user));
        this.errorStatus = false;
        this.inputs = {
          UsernameOrEmail: "",
          password: "",
        };
        this.$router.push({ name: "Chat" });
      } catch (error) {
        this.servermessage = error.message;
        this.errorStatus = true;
      }
    },
    showError() {
      const empty = validateInputs(this.inputs);
      empty.forEach((e) => {
        this.check[e] = true;
      });

      if (empty.length > 0) return true;
    },
    keypress(data) {
      this.check[data] = false;
    },
  },
};
</script>