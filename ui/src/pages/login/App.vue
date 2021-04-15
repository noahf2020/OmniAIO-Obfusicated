<template>
  <div id="app">
    <div class="flex flex-col justify-center items-center h-screen">
      <img class="w-48 mb-4" src="@/assets/logo.svg" />
      <h1 class="text-white text-4xl">Login</h1>
      <div class="mt-6">
        <TextInput class="outline-none text-center" placeholder="OmniAIO Key" itemWidth="72" v-model="key"></TextInput>
      </div>
      <div class="mt-6">
        <Action iconName="signin" borderColor="green" text="Login" @click="submitLogin"></Action>
      </div>
    </div>
  </div>
</template>

<script>
import Action from '@/components/Action';
import TextInput from '@/components/TextInput';
export default {
  name: 'App',
  components: {
    Action,
    TextInput
  },
  data() {
    return { 
      options: null,
      discordWebhook: null,
      key: "",
      machineID: null
    }
  },
  methods: {
    saveNewKey(key) {
      this.options.key = key;
      return this.$http.post("http://localhost:3080/api/options/edit", [this.options]).then(response => {
        console.log(response);
        window.location = "/tasks/app.vue";
      }).catch(err => {
        alert("Error saving key: " + err);
      })
    },
    checkIfKeyIsValid(key) {
      if (key || key !== "") {
        this.$http.post("https://api-astroaio-372848.herokuapp.com/api/set/machine", {
            machineID: this.machineID,
            apiKey: "1c8e062d-c80e-484e-84ae-b011a8e05faa",
            key: key
          }).then(response => {
            if (response.body.success == true) {
              this.saveNewKey(key);
            } else {
              alert("Login to OmniAIO is invalid. Error: " + response.body.message);
            }
        }).catch(err => {
          alert("Login to OmniAIO is invalid. Error: " + err.body.message);
        });
      }
    },
    submitLogin() {
      this.checkIfKeyIsValid(this.key);
    }
  },
  created() {
    this.$http.get("http://localhost:3080/api/machineId").then(response => {
      this.machineID = response.body;
    }).catch(err => {
      console.log(err);
    });
    
    this.$http.get("http://localhost:3080/api/options").then(response => {
      this.options = response.data;
      this.discordWebhook = response.data.discordWebhook;
      this.key = response.data.key;
      if (this.machineID && this.key) {
        this.checkIfKeyIsValid(this.key);
      }
    }).catch(err => {
      console.log(err);
    });
  }
}
</script>


<style>
  @import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

  body, html {
    margin: 0;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  body {
    background-image: url("../../assets/ui-bg-svg-code.svg");
    background-position: center center; 
    background-repeat: no-repeat; 
    background-attachment: fixed; 
    background-size: cover;
    overflow: hidden;
    border-radius: 500;
  }

  .background {
    height: 100%;
    background-position: center center; 
    background-repeat: no-repeat; 
    background-attachment: fixed; 
    background-size: cover; 
  }
</style>
