<template>
  <div id="id" class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header">Chatbox</div>
                  <div class="card-body">
                    <p>Welcome onboard {{ username }}</p>
                    <dl v-for="(chat, id) in chats" :key="id">
                      <img :src="avarta" alt="" srcset="" />
                      <dt>{{ chat.from }}</dt>
                      <dd>
                        {{ chat.message }}

                        <small class="mx-3">
                          {{
                            Intl.DateTimeFormat("default", dateoptions).format(
                              new Date(chat.createdAt)
                            )
                          }}
                        </small>
                      </dd>
                    </dl>
                    <hr />

                    <input
                      type="text"
                      class="form-control"
                      placeholder="Type your message..."
                      v-model="message"
                      @keyup.enter="sendMessage"
                    />
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
import {
  MESSAGE_SENT_SUBSCRIPTION,
  SEND_MESSAGE_MUTATION,
  CHAT_QUERY,
} from "@/graphql";

export default {
  name: "Chat",
  data() {
    return {
      username: "",
      message: "",
      dateoptions: {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: "false",
      },
      avarta: "",
    };
  },
  mounted() {
    const username = JSON.parse(localStorage.getItem("user"));
    this.username = username.username;
    this.avarta = username.avatar;
  },
  apollo: {
    chats: {
      query: CHAT_QUERY,
      subscribeToMore: {
        document: MESSAGE_SENT_SUBSCRIPTION,
        updateQuery: (previousData, { subscriptionData }) => {
          return {
            chats: [...previousData.chats, subscriptionData.data.messageSent],
          };
        },
      },
    },
  },
  methods: {
    async sendMessage() {
      const message = this.message;
      this.message = "";

      await this.$apollo.mutate({
        mutation: SEND_MESSAGE_MUTATION,
        variables: {
          from: this.username,
          message,
        },
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only --> 
<style scoped>
#id {
  padding-top: 30px;
}
</style>
