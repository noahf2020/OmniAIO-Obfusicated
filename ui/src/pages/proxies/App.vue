<template>
  <div id="app">
    <Modal shown="false">
      <ModalBody>
        <Dropdown :items="['Supreme', 'Yeezy', 'New Balence']" selected="Site"></Dropdown>
        <Dropdown class="mt-5" :items="['Safe', 'Fast', 'Restock']" selected="Mode"></Dropdown>
        <Dropdown class="mt-5" :items="['Supreme', 'Yeezy', 'New Balence']" selected="Profile"></Dropdown>
        <Dropdown class="mt-5" :items="['Supreme', 'Yeezy', 'New Balence']" selected="Account List"></Dropdown>
      </ModalBody>
    </Modal>
    
    <div class="flex flex-row">
      <div class="flex-initial">
        <div class="w-40 h-screen border-r-2 border-gray-500" style="background-color: rgba(60, 60, 60, .75);">
          <img class="px-8 pt-5" src="@/assets/logo.svg" />
          <a href="/tasks"><SidebarButton text="Tasks" iconName="bars"></SidebarButton></a>
          <a href="/profiles"><SidebarButton text="Profiles" iconName="credit-card"></SidebarButton></a>
          <SidebarButton text="Proxies" iconName="server" selected="true"></SidebarButton>
          <!--<<a href="/accounts"><SidebarButton text="Accounts" iconName="users-alt"></SidebarButton></a>>-->
          <a href="/settings"><SidebarButton text="Settings" iconName="sliders-v"></SidebarButton></a>
          <!--<a href="/activity"><SidebarButton text="Activity" iconName="chart"></SidebarButton></a>-->
        </div>
      </div>
      <div class="w-full ml-10 h-screen">
        <div class="flex mt-12 justify-between">
          <div>
            <Action text="New Group" iconName="plus" borderColor="green" @click="newGroup" class="mr-5">></Action>
            <Action text="Delete All Groups" iconName="trash" borderColor="yellow" @click="deleteAllGroups"></Action>
          </div>
          <div class="mr-12">
            <Action text="Close List" iconName="multiply" borderColor="purple" borderShade="600" class="mr-5" @click="closeList"></Action>
            <Action text="Clear Proxy List" iconName="trash" borderColor="red" @click="clearProxy"></Action>
          </div>
        </div>
        <div class="flex mt-5">
          <div class="flex-initial w-3/6 pr-5">
            <div class="container bg-gray-500 bg-opacity-75 rounded-lg">
              <CardHeader class="text-center text-white" backgroundShade="500">PROXY GROUP</CardHeader>
              <div class="px-5 py-5">
                <Table class="w-full">
                  <tbody>
                    <template v-for="file in proxyFiles">
                      <tr :key="file" v-if="file != 'local host'">
                        <TableItem place="start" class="w-3/4" textAlign="left" backgroundColor="bg-gray-800">{{ file }}</TableItem>
                        <TableItem place="end" class="w-1/4" backgroundColor="bg-gray-800"><Action iconName="pen" iconOnly="true" @click="readProxy(file)"></Action> <Action iconName="copy" iconOnly="true"></Action> <Action iconName="trash" iconOnly="true" @click="deleteProxy(file)"></Action></TableItem>
                      </tr>
                    </template>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
          <div class="flex-initial w-3/6 pr-5">
            <div class="container bg-gray-500 bg-opacity-75 rounded-lg">
              <CardHeader class="text-center text-white" backgroundShade="500">{{ fileToRead ? 'PROXY LIST FOR ' + fileToRead : 'PROXY LIST' }}</CardHeader>
              <div class="px-5 py-3 overflow-y-auto" style="height: 78vh;">
                <textarea v-if="proxies !== null" v-model="proxies" ref="proxyTextarea" class="outline-none w-full resize-none bg-transparent text-white border border-white px-2" style="height: 90%;"></textarea>
                <div class="text-center">
                  <Action v-if="proxies !== null" text="Save" iconName="save" borderColor="green" @click="saveProxy"></Action>
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
import Action from '@/components/Action';
import Modal from '@/components/Modal';
import ModalBody from '@/components/ModalBody';
import Dropdown from '@/components/Dropdown';
import SidebarButton from '@/components/SidebarButton';
import CardHeader from '@/components/CardHeader';
import Table from '@/components/Table';
import TableItem from '@/components/TableItem';
export default {
  name: 'App',
  components: {
    Action,
    Modal,
    ModalBody,
    Dropdown,
    SidebarButton,
    CardHeader,
    Table,
    TableItem
  },
  data() {
    return {
      proxies: null,
      proxyFiles: null,
      fileToRead: null
    }
  },
  methods: {
    deleteProxy(file) {
      if (file != "local host") {
        const check = confirm("Are you sure you want to delete this group?");
        if (check) {
          this.$http.post("http://localhost:3080/api/proxies/delete", [{
            proxyFile: file
          }]).then(() => {
            this.getProxyFiles();
          }).catch(err => {
            console.log(err);
          });
        }
      }
    },
    readProxy(file) {
      if (file != "local host") {
        this.$http.post("http://localhost:3080/api/proxies/read", [{
          proxyFile: file
        }]).then(response => {
          this.proxies = response.data;
          this.fileToRead = file;
          this.$nextTick(() => {
            this.$refs.proxyTextarea.focus();
          });
        }).catch(err => {
          console.log(err);
        });
      }
    },
    deleteAllGroups() {
      const check = confirm("Are you sure you want to delete all proxy groups?");
      if (check) {
        return this.$http.get("http://localhost:3080/api/proxies/delete/all").then(() => {
          this.getProxyFiles();
        }).catch(err => {
          console.log(err);
        });
      }
    },
    getProxyFiles() {
      return this.$http.get("http://localhost:3080/api/proxies/files").then(response => {
        this.proxyFiles = response.data;
      }).catch(err => {
        console.log(err);
      });
    },
    clearProxy() {
      if (this.proxies) {
        const check = confirm("Are you sure you want to clear this proxy group?");
        if (check) {
          this.proxies = '';
          this.saveProxy();
        }
      } else {
        alert("No proxy data to clear");
      }
    },
    closeList() {
      this.fileToRead = null;
      this.proxies = null;
    },
    saveProxy() {
      this.$http.post("http://localhost:3080/api/proxies/save", [{
          proxyFile: this.fileToRead,
          saveData: this.proxies
        }]).then(() => {
          alert("Success! Saved proxy");
        });
    }, 
    newGroup() {
      this.$prompt("Name of new proxy group file (typically ending in .txt)?").then((value) => {
        this.$http.post("http://localhost:3080/api/proxies/save", [{
          proxyFile: value,
          saveData: " "
        }]).then(() => {
          this.getProxyFiles();
          this.readProxy(value);
        });
      });
    }
  },
  mounted() {
    this.getProxyFiles();
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
    overflow: hidden;
  }

  .background {
    height: 100%;
    background-position: center center; 
    background-repeat: no-repeat; 
    background-attachment: fixed; 
    background-size: cover; 
  }
</style>
