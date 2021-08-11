<template>
  <div id="id" class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header">Register for Chat</div>
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
                          v-model="inputs.username"
                          id="floatingusername"
                          @keypress="keypress('username')"
                        />
                        <label for="floatingusername"
                          >Enter your username</label
                        >
                        <small
                          v-if="check.username"
                          class="form-text text-danger"
                          >username is needed</small
                        >
                      </div>

                      <div class="form-floating col-md-6">
                        <input
                          type="email"
                          class="form-control"
                          v-model="inputs.email"
                          id="floatingemail"
                          @keypress="keypress('email')"
                        />
                        <label for="floatingemail">Enter your email</label>
                        <small v-if="check.email" class="form-text text-danger"
                          >email is needed</small
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

                      <div class="form-floating col-md-6">
                        <input
                          type="password"
                          class="form-control"
                          v-model="inputs.confirmPassword"
                          id="floatingconpassword"
                          @keypress="keypress('confirmPassword')"
                        />
                        <label for="floatingconpassword"
                          >Confirm your password</label
                        >
                        <small
                          v-if="check.confirmPassword"
                          class="form-text text-danger"
                          >confirmPassword is needed</small
                        >
                      </div>

                      <div class="form-floating col-8">
                        <input
                          type="phone"
                          class="form-control"
                          v-model="phone"
                          id="floatingphone"
                        />
                        <label for="floatingphone"
                          >Enter your phone number</label
                        >
                      </div>

                      <button class="btn btn-primary col-4" @click="sendData">
                        Enter
                      </button>
                      <div>
                        Already registered?
                        <router-link :to="{ name: 'Login' }">login</router-link>
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
import { validateInputs } from "../helpers/validateInputs";
import { REGISTER_USER } from "../graphql";

export default {
  name: "Register",

  data() {
    return {
      inputs: {
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
      },
      phone: "",
      check: {
        username: false,
        password: false,
        confirmPassword: false,
        email: false,
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
      this.inputs["phone"] = this.phone;

      try {
        const { data } = await this.$apollo.mutate({
          mutation: REGISTER_USER,
          variables: {
            ...this.inputs,
          },
        });
        this.servermessage = data.createUser;
        this.errorStatus = false;
        this.inputs = {
          username: "",
          password: "",
          confirmPassword: "",
          email: "",
        };
        this.phone = "";
        this.$router.push({ name: "Login" });
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