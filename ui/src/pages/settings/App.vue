<template>
  <div id="app">
    <Modal shown="false">
      <ModalBody>
        <div class="flex">
          <div class="mr-5">
            <Dropdown :items="['Supreme', 'Yeezy', 'New Balence']" selected="Site" buttonWidth="24" itemWidth="28"></Dropdown>
            <Dropdown class="mt-5" :items="['Safe', 'Fast', 'Restock']" selected="Mode" buttonWidth="24" itemWidth="28"></Dropdown>
            <Dropdown class="mt-5" :items="['Supreme', 'Yeezy', 'New Balence']" selected="Profile" buttonWidth="24" itemWidth="28"></Dropdown>
            <Dropdown class="mt-5" :items="['Supreme', 'Yeezy', 'New Balence']" selected="Account List" buttonWidth="24" itemWidth="28"></Dropdown>
          </div>
          <div>
            <TextInput placeholder="URL / PID / Keywords" itemWidth="full"></TextInput>
            <div>
              <TextInput class="inline-block mt-5" placeholder="Size"></TextInput>
              <Dropdown class="inline-block ml-5" :items="['List 01', 'List 02', 'List 03', 'List 04']" selected="Proxies" buttonWidth="20" itemWidth="28"></Dropdown>
            </div>
            <div>
              <TextInput class="inline-block mt-5" placeholder="Color"></TextInput>
              <NumberPicker class="inline-block ml-5" placeholder="Quantity"></NumberPicker>
            </div>
            <div>
              <NumberPicker class="inline-block mt-5" placeholder="Task QTY"></NumberPicker>
              <Dropdown class="inline-block ml-5" :items="['New', 'Jackets', 'Shirts', 'Shoes']" selected="Category" buttonWidth="20" itemWidth="28"></Dropdown>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
    
    <div class="flex flex-row">
      <div class="flex-initial">
        <div class="w-40 h-screen border-r-2 border-gray-500" style="background-color: rgba(60, 60, 60, .75);">
          <img class="px-8 pt-5" src="@/assets/logo.svg" />
          <a href="/tasks"><SidebarButton text="Tasks" iconName="bars"></SidebarButton></a>
          <a href="/profiles"><SidebarButton text="Profiles" iconName="credit-card"></SidebarButton></a>
          <a href="/proxies"><SidebarButton text="Proxies" iconName="server"></SidebarButton></a>
          <!--<<a href="/accounts"><SidebarButton text="Accounts" iconName="users-alt"></SidebarButton></a>>-->
          <SidebarButton text="Settings" iconName="sliders-v" selected="true"></SidebarButton>
          <!--<a href="/activity"><SidebarButton text="Activity" iconName="chart"></SidebarButton></a>-->
        </div>
      </div>
      <div class="w-full mx-10">
        <div class="flex mt-12 justify-between">
          <div>
            <h1 class="text-white text-3xl inline-block mr-5">Settings</h1>
            <Action text="Download" iconName="file-download" borderColor="purple" class="mr-5"></Action>
            <Action text="Upload" iconName="file-upload" borderColor="purple" class="mr-5"></Action>
            <Action iconName="redo" borderColor="purple" class="mr-5" @click="refreshOptions"></Action>
          </div>
          <!--<div class="mr-12">
            <Action text="View Logs" iconName="eye" borderColor="green" class="mr-5"></Action>
            <Action text="Clear Logs" iconName="trash" borderColor="red"></Action>
          </div>-->
        </div>
        <div class="flex mt-10">
          <Card gradientLColor="gray" gradientRColor="gray" gradientLShade="500" gradientRShade="400">
            <div class="py-4 px-4 text-center">
              <div class="pb-5">
                <h1 class="text-white text-3xl inline-block">OMNI AIO</h1>
                <p class="text-white text-base inline-block ml-2">v0.3.0</p>
              </div>
              <div>
                <Action text="Check for updates" iconName="cloud-download" borderColor="gray" class="mr-5" @click="getUpdates"></Action>
                <Action text="Force Update" iconName="file-download" borderColor="gray" class="mr-5"></Action>
              </div>
            </div>
          </Card>

          <Card class="ml-4 text-center" gradientLColor="gray" gradientRColor="gray" gradientLShade="500" gradientRShade="400">
            <CardHeader class="text-white pl-2" backgroundShade="500">{{options.user}}</CardHeader>
            <div class="py-4 px-4">
              <h2 class="text-white text-2xl" v-if="options">KEY: {{options.key}}</h2>
              <p class="text-white text-lg" v-if="options">Key type: DEV</p>
            </div>
          </Card>
        </div>

        <div class="flex mt-10 flex-col">
          <p class="mt-2 text-white font-bold text-center" >Discord Webhook</p>
          <div class="flex mt-2 text-center">
            <TextInput v-model="discordWebhook" placeholder="Discord Webhook" itemWidth="full" class="text-center" @keyup.enter.native="saveDiscordWebhook"></TextInput>
            <div></div>
         
          
          </div>
          <p class="text-white pt-1 text-center">Important! Click enter to save Webhook</p>
          <notifications group="foo"/>
        </div>

        <!--<div class="flex mt-10">
          <div>
            <Card gradientLColor="gray" gradientRColor="gray" gradientLShade="500" gradientRShade="400">
              <div class="py-4 px-4">
                <p class="text-white font-bold">QUICK TASK SETTINGS</p>
                <div class="flex flex-col">
                  <div class="flex flex-row pt-4">
                    <Dropdown :items="['Supreme', 'Yeezy', 'New Balence']" selected="Profile" buttonWidth="24" itemWidth="28"></Dropdown>
                    <Dropdown class="ml-2" :items="['Supreme', 'Yeezy', 'New Balence']" selected="Proxies" buttonWidth="24" itemWidth="28"></Dropdown>
                  </div>
                  <div class="flex flex-row pt-2">
                    <Dropdown :items="['Supreme', 'Yeezy', 'New Balence']" selected="Mode" buttonWidth="24" itemWidth="28"></Dropdown>
                    <TextInput class="ml-2" placeholder="Size"></TextInput>
                  </div>
                  <div class="flex flex-row pt-2 self-center">
                    <Dropdown :items="['Supreme', 'Yeezy', 'New Balence']" selected="Account List" buttonWidth="24" itemWidth="28"></Dropdown>
                  </div>
                  <div class="flex flex-row pt-2 self-center">
                    <Action text="SAVE" borderColor="gray" iconName="cloud-download"></Action>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import Action from '@/components/Action';
import Modal from '@/components/Modal';
import ModalBody from '@/components/ModalBody';
import Dropdown from '@/components/Dropdown';
import SidebarButton from '@/components/SidebarButton';
import TextInput from '@/components/TextInput';
import NumberPicker from '@/components/NumberPicker';
import Card from '@/components/Card';
import CardHeader from '@/components/CardHeader';
export default {
  name: 'App',
  components: {
    Action,
    Modal,
    ModalBody,
    Dropdown,
    SidebarButton,
    TextInput,
    NumberPicker,
    Card,
    CardHeader
  },
  data() {
    return {
      profiles: null,
      options: null,
      discordWebhook: null
    }
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getProfiles'
  },
  methods: {
    getProfiles() {
      return this.$http.get("http://localhost:3080/api/profiles").then(response => {
        console.log(response);
        this.profiles = response.data[0];
      }).catch(err => {
        console.log(err);
      });
    },
    getOptions() {
      return this.$http.get("http://localhost:3080/api/options").then(response => {
        this.options = response.data;
        this.discordWebhook = response.data.discordWebhook;
        this.key = response.data.key;
      }).catch(err => {
        console.log(err);
      });
    },
    getUpdates() {
      return this.$http.get("https://39561.wayscript.io/").then(response => {
        if (response.status == 200) {
          alert("You're up to date!");
        } else {
          alert('There is a new update avalible');
        }
      }).catch(err => {
        console.log(err);
      });
    },
    saveDiscordWebhook() {
      let newOptions = this.options;
      newOptions.discordWebhook = this.discordWebhook;
      return this.$http.post("http://localhost:3080/api/options/edit", [newOptions]).then(response => {
       this.$notify({
  group: 'foo',
  title: 'Settings',
  type: 'success',
  text: 'Updated Webhook'
});
this.getOptions();
        this.options = response.data;
      }).catch(err => {
        console.log(err);
      });
    },
    refreshOptions() {
      this.getProfiles();
      this.getOptions();
    this.getauthor()
  this.$notify({
  group: 'foo',
  title: 'Settings',
  type: 'success',
  text: 'Loaded Settings'
});
    }
  },
  mounted() {

    this.refreshOptions();



  }
}

</script>


<style>
  @import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

  Card h1 {
    font: normal normal normal 16px/19px Montserrat;
    letter-spacing: 0.32px;
  }

  Card h2 {
    font: normal normal medium 32px/39px Montserrat;
    letter-spacing: 0.64px;
  }

  Card p {
    font: normal normal 300 16px/23px Montserrat;
    letter-spacing: 0.32px;
  }

  body, html {
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
  }

  .background {
    height: 100%;
    background-position: center center; 
    background-repeat: no-repeat; 
    background-attachment: fixed; 
    background-size: cover; 
  }
</style>
