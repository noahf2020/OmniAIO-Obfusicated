<template>
  <div id="app">
    <Modal :shown="newProfileShown.toString()" z="20">
      <ModalBody>
        <div class="flex justify-between">
          <h1 class="text-white text-2xl">{{editMode ? 'Editing ' + newProfileName : 'Profile creator'}}</h1>
          <Action text="Close" iconName="multiply" borderColor="red" @click="newProfileShown = false; editMode = false;"></Action>
        </div>

        <TextInput class="mt-4" placeholder="Profile name" itemWidth="full" v-model="newProfileName"></TextInput>

        <div class="mt-4">
          <p class="text-white text-md">Billing address</p>

          <div class="flex flex-row justify-center mt-4">
            <div class="mr-5">
              <TextInput placeholder="Full Name" itemWidth="full" v-model="newProfileNameBilling"></TextInput>
              <div class="flex flex-row mt-3">
                <TextInput placeholder="Line 1" itemWidth="1/2" v-model="newProfileLine1Billing"></TextInput>
                <TextInput class="ml-3" placeholder="Line 2" itemWidth="1/2" v-model="newProfileLine2Billing"></TextInput>
              </div>
              <div class="flex flex-row mt-3">
                <TextInput placeholder="City" itemWidth="1/2" v-model="newProfileCityBilling"></TextInput>
                <TextInput class="ml-3" placeholder="State" itemWidth="1/2" v-model="newProfileStateBilling"></TextInput>
              </div>
            </div>
            <div class="flex flex-col">
              <div class="flex flex-row">
                <TextInput placeholder="Email" itemWidth="1/2" v-model="newProfileEmailBilling"></TextInput>
                <TextInput class="ml-3" itemWidth="1/2" placeholder="Phone Number" v-model="newProfilePhoneNumberBilling"></TextInput>
              </div>
              <div class="flex flex-row mt-3">
                <TextInput placeholder="Line 3" v-model="newProfileLine3Billing"></TextInput>
                <TextInput class="ml-3" placeholder="Post Code" v-model="newProfilePostCodeBilling"></TextInput>
              </div>
              <div class="flex flex-row mt-3">
                <Dropdown :items="['United States']" buttonWidth="28" itemWidth="32" v-model="newProfileCountryBilling"></Dropdown>
              </div>
            </div>
          </div>
        </div>

        <input class="mt-4" id="creatorHideShipping" type="checkbox" v-model="creatorHideShipping"><label class="text-white ml-2" for="creatorHideShipping">Billing address is the same as shipping</label>

        <div class="pt-4" v-show="!creatorHideShipping">
          <p class="text-white text-md">Shipping address</p>

          <div class="flex flex-row justify-center mt-4">
            <div class="mr-5">
              <TextInput placeholder="Full Name" itemWidth="full" v-model="newProfileNameShipping"></TextInput>
              <div class="flex flex-row mt-3">
                <TextInput placeholder="Line 1" itemWidth="1/2" v-model="newProfileLine1Shipping"></TextInput>
                <TextInput class="ml-3" placeholder="Line 2" itemWidth="1/2" v-model="newProfileLine2Shipping"></TextInput>
              </div>
              <div class="flex flex-row mt-3">
                <TextInput placeholder="City" itemWidth="1/2" v-model="newProfileCityShipping"></TextInput>
                <TextInput class="ml-3" placeholder="State" itemWidth="1/2" v-model="newProfileStateShipping"></TextInput>
              </div>
            </div>
            <div class="flex flex-col">
              <div class="flex flex-row">
                <TextInput placeholder="Email" itemWidth="1/2" v-model="newProfileEmailShipping"></TextInput>
                <TextInput class="ml-3" itemWidth="1/2" placeholder="Phone Number" v-model="newProfilePhoneNumberShipping"></TextInput>
              </div>
              <div class="flex flex-row mt-3">
                <TextInput placeholder="Line 3" v-model="newProfileLine3Shipping"></TextInput>
                <TextInput class="ml-3" placeholder="Post Code" v-model="newProfilePostCodeShipping"></TextInput>
              </div>
              <div class="flex flex-row mt-3">
                <Dropdown :items="['United States']" buttonWidth="28" itemWidth="32" v-model="newProfileCountryShipping"></Dropdown>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-4">
          <p class="text-white text-md">Credit Card Information</p>
          <div class="flex flex-row mt-4 justify-center">
            <div>
              <TextInput placeholder="Name on card" v-model="nameOnCard" itemWidth="full"></TextInput>
            </div>
            <div class="flex flex-col">
              <input ref="cardNumInput" v-model="cardNumber" v-on:change="validateCC" class="ml-4 bg-gray-600 text-gray-200 text-left rounded py-2 pl-3 pr-2 flex-grow w-full" placeholder="#### #### #### ####" v-cardformat:formatCardNumber :data-error="(cardErrors.cardNumber)?true:false" />
              <div v-if="cardErrors.cardNumber"><small class="mt-1 text-red-600">{{ cardErrors.cardNumber }}</small></div>
            </div>
          </div>
          <div class="flex flex-row mt-4 justify-center">
            <div class="flex flex-col">
              <input ref="cardExpInput" v-model="cardExpiry" v-on:change="validateCE" class="bg-gray-600 text-gray-200 text-left rounded py-2 pl-3 pr-2 flex-grow w-full" placeholder="EXP" v-cardformat:formatCardExpiry :data-error="(cardErrors.cardExpiry)?true:false"  />
              <div v-if="cardErrors.cardExpiry"><small class="mt-1 text-red-600">{{ cardErrors.cardExpiry }}</small></div>
            </div>
            <div class="flex flex-col">
              <input ref="cardCvcInput" v-model="cardCvc" v-on:change="validateCVC" class="ml-4 bg-gray-600 text-gray-200 text-left rounded py-2 pl-3 pr-2 flex-grow w-full" placeholder="CSV" v-cardformat:formatCardCVC :data-error="(cardErrors.cardCvc)?true:false"  />
              <div v-if="cardErrors.cardCvc"><small class="mt-1 text-red-600">{{ cardErrors.cardCvc }}</small></div>
            </div>
          </div>
        </div>

        <p class="mt-4 text-white text-md">Settings</p>
        <input class="mt-4" id="onlyCheckoutOnce" type="checkbox" v-model="onlyCheckoutOnce"><label class="text-white ml-2" for="onlyCheckoutOnce">Only checkout once</label>

        <div class="flex flex-row mt-4 justify-center">
          <Action v-if="!editMode" iconName="plus" borderColor="gray" text="Create Profile" @click="createProfile"></Action>
          <Action v-else iconName="pen" borderColor="gray" text="Save Changes" @click="editProfile"></Action>
        </div>
      </ModalBody>
    </Modal>

    <Modal :shown="createTaskShown.toString()">
      <ModalBody>
        <div class="flex justify-between">
          <h1 class="text-white text-2xl ">Task Creator</h1>
        
          <Action text="Close" iconName="multiply" borderColor="red" @click="createTaskShown = false"></Action>
        </div>

        <div class="flex flex-row justify-center mt-4 text-center">
          <div class="mr-5 text-center text-center">
            <Dropdown :items="['Footlocker', 'Champssports', 'Footaction', 'KidsFootlocker', 'Eastbay']" selected="SITE" buttonWidth="24" itemWidth="40" v-model="creatorSite"></Dropdown>
            <Dropdown class="mt-3" :items="['Fast','Restock','Inital(Soon)']" selected="Mode" buttonWidth="24" itemWidth="28" v-model="creatorMode"></Dropdown>
          </div>
          <div class="flex flex-col">
            <div class="flex flex-row ">
              <TextInput placeholder="SKU" itemWidth="full" class="text-center" v-model="creatorSKU"></TextInput>
            </div>
            <div class="flex flex-row mt-3">
              <Dropdown selected="SIZE" class="text-center" itemWidth="40" style="height: 80%;" :items="['Random', '03.0', '03.5', '04.0','04.5','05.0','05.5','06.0','06.5','07.0','07.5','08.0','08.5','09.0','09.5','10.0']" v-model="creatorSize"></Dropdown>
              <Dropdown class="ml-2" :items="proxies"  selected="PROXIES" buttonWidth="20" itemWidth="28" v-model="creatorProxies"></Dropdown>
            </div>
            <div class="flex flex-row mt-3">
              <TextInput v-model="creatorTaskQty" itemWidth="full" class="text-center"  placeholder="Task QTY"></TextInput>
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="flex flex-col">
            <div class="self-center"><input class="mt-4" id="isProfileGroups" type="checkbox" v-model="isProfileGroups"><label class="text-white ml-2" for="creatorHideShipping">Use profile groups</label></div>
            <Dropdown v-if="isProfileGroups" class="mt-3 self-center" :items="profiles" selected="Profile Group" buttonWidth="900" itemWidth="900" v-model="creatorProfile" @change="displayProfiles(creatorProfile)"></Dropdown>
            <Action v-else class="mt-3 text-center" iconName="pen" borderColor="green" text="Show profile creater" @click="newProfileShown = true"></Action>
            <CheckboxDropdown v-if="isProfileLoaded" class="ml-2 mt-3 self-center" buttonWidth="44" itemWidth="44" v-model="profileNames" :profileNames="profileNames"></CheckboxDropdown>
            <div v-if="isProfileLoaded"><br><br></div>
          </div>
        </div>
        <div class="flex flex-row mt-4 justify-center">
          <Action iconName="plus" borderColor="gray" text="Create Task" @click="createTasks"></Action>
        </div>
      </ModalBody>
    </Modal>
    <div class="flex flex-row h-screen">
      <notifications group="task"/>
      <div class="flex-initial">
        <div class="w-40 h-screen border-r-2 border-gray-500" style="background-color: rgba(60, 60, 60, .75);">
          <img class="px-8 pt-5" src="@/assets/logo.svg" />
          <SidebarButton text="Tasks" iconName="bars" selected="true"></SidebarButton>
          <a href="/profiles"><SidebarButton text="Profiles" iconName="credit-card"></SidebarButton></a>
          <a href="/proxies"><SidebarButton text="Proxies" iconName="server"></SidebarButton></a>
           <!--<<a href="/accounts"><SidebarButton text="Accounts" iconName="users-alt"></SidebarButton></a>>-->
          <a href="/settings"><SidebarButton text="Settings" iconName="sliders-v"></SidebarButton></a>
          <!--<a href="/activity"><SidebarButton text="Activity" iconName="chart"></SidebarButton></a>-->
        </div>
      </div>
      <div class="w-full flex flex-col">
        <div class="flex mt-10 ml-6 mr-6 justify-between w-full">
          <div class="flex-shrink">
            <Action iconName="plus" borderColor="purple" class="mr-5" v-on:click="createTaskShown=true"></Action>
            <!--<Action iconName="pen" borderColor="purple" class="mr-5"></Action>-->
            <Action iconName="redo" borderColor="purple" v-on:click="refreshGetsButton"></Action>
          </div>
          <div class="flex-shrink mr-12">
            <Action @click="runAllTasks" text="Start All" iconName="play" borderColor="green" class="mr-5"></Action>
            <Action @click="stopAllTasks" text="Stop All" iconName="square-shape" borderColor="red" class="mr-5"></Action>
            <Action @click="deleteAllTasks" text="Delete All" iconName="trash" borderColor="yellow"></Action>
          </div>
        </div>
        
        <div class="flex-shrink mt-5 overflow-y-auto w-full" style="height: 80%;">
          <Table class="border-collapse flex-shrink">
            <thead class="sticky top-0">
              <tr>
                <TableHeader class="w-2/12" place="start">SITE</TableHeader>
                <TableHeader class="w-3/12">PRODUCT</TableHeader>
                <TableHeader class="w-auto">SIZE</TableHeader>
                <TableHeader class="w-auto">PROFILE</TableHeader>
                <TableHeader class="w-auto">PROXIES</TableHeader>
                <TableHeader class="w-4/12">STATUS</TableHeader>
                <TableHeader class="w-2/12" place="end">ACTIONS</TableHeader>
              </tr>
            </thead>
            <tbody class="overflow-y-auto">              
              <template v-for="(parent, p) in tasks">
                <tr v-for="(item, i) in parent.tasks" :key="'table-' + i + '-' + p">
                  <TableItem place="start">{{ parent.site }}</TableItem>
                  <TableItem>{{ parent.sku }}</TableItem>
                  <TableItem>{{ parent.sizes || "N/A" }}</TableItem>
                  <TableItem>{{ item.name || "N/A" }}</TableItem>
                  <TableItem>{{ parent.proxyList || "N/A" }}</TableItem>
                  <TableItem v-if="logs[item.id]"><p :class="'text-' + logs[item.id].type + '-300'">{{ logs[item.id].message || "N/A" }}</p></TableItem>
                  <TableItem v-else class="text-gray-300">Idle</TableItem>
                  <TableItem place="end"><Action v-if="!runningTasks[item.id]" @click="runTask(parent, item)" iconName="play" iconOnly="true"></Action> <Action v-else @click="stopTask(item.id)" iconName="square-shape" iconOnly="true"></Action> <Action iconName="pen" iconOnly="true"  @click="showEditProfile(p, i)"></Action> <Action iconName="copy" iconOnly="true" @click="copyProfile(p, i)"></Action> <Action iconName="trash" iconOnly="true" @click="deleteProfile(p, i)"></Action></TableItem>
                </tr>
              </template>
            </tbody>
          </Table>
        </div>
        <TableHeader class="">Total Tasks: {{numberOfTasks}}</TableHeader>
      </div>
    </div>
  </div>
</template>

<script>
import Action from '@/components/Action';
import Table from '@/components/Table';
import TableHeader from '@/components/TableHeader';
import TableItem from '@/components/TableItem';
import Modal from '@/components/Modal';
import ModalBody from '@/components/ModalBody';
import Dropdown from '@/components/Dropdown';
import SidebarButton from '@/components/SidebarButton';
import TextInput from '@/components/TextInput';
import CheckboxDropdown from '@/components/CheckboxDropdown';
//import NumberPicker from '@/components/NumberPicker';
export default {
  name: 'App',
  components: {
    Action,
    Table,
    TableHeader,
    TableItem,
    Modal,
    ModalBody,
    Dropdown,
    SidebarButton,
    TextInput,
    CheckboxDropdown
  },
  data() {
    return {
      timer: null,
      numberOfTasks: 0,
      createTaskShown: false,
      tasks: null,
      profiles: null,
      proxies: null,
      creatorSite: "Site",
      creatorMode: "Mode",
      creatorProfile: "Profile Group",
      creatorSKU: "",
      creatorSize: "Size",
      creatorProxies: "Proxies",
      creatorQty: null,
      creatorTaskQty: null,
      isProfileGroups: true,
      editMode: false,
      tmpFilei: null,
      tmpItemi: null,
      nameOnCard: '',
      cardBrand: null,
      cardNumber: null,
      cardExpiry: null,
      cardCvc: null,
      cardErrors: {},
      creatorHideShipping: true,
      onlyCheckoutOnce: true,
      newProfileShown: false,
      newProfileName: null,
      newProfileNameBilling: '',
      newProfileEmailBilling: '',
      newProfilePhoneNumberBilling: '',
      newProfileLine1Billing: '',
      newProfileLine2Billing: '',
      newProfileLine3Billing: '',
      newProfilePostCodeBilling: '',
      newProfileCityBilling: '',
      newProfileStateBilling: '',
      newProfileCountryBilling: 'Country',
      newProfileNameShipping: '',
      newProfileEmailShipping: '',
      newProfilePhoneNumberShipping: '',
      newProfileLine1Shipping: '',
      newProfileLine2Shipping: '',
      newProfileLine3Shipping: '',
      newProfilePostCodeShipping: '',
      newProfileCityShipping: '',
      newProfileStateShipping: '',
      newProfileCountryShipping: 'Country',
      newProfileFile: 'Profile file',
      newProfileData: null,
      logs: {},
      runningTasks: {},
      profileNames: {},
      manualStop: {},
      isProfileLoaded: false
    }
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getTasks'
  },
  methods: {
    displayProfiles(profileFile) {
      this.isProfileLoaded = true;
      this.profileNames = {};
      this.$http.post("http://localhost:3080/api/profiles/read", [{
            profileFile: profileFile
          }]).then(response => {
            if (response.status === 200) {
              for (const i in response.body) {
                this.profileNames[response.body[i].name] = true;
              }
            }
        });
    },
    asyncTaskID() {
      return new Promise((resolve) => {
        let s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        };
        //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
        resolve(s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4());
      });
    },
    taskID() {
      let s4 = () => {
          return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
      };
      //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },
    getNumberOfTasks() {
      this.numberOfTasks = 0;
      for(let i = 0; i < this.tasks.length; i++){
        for (let ii = 0; ii < this.tasks[i].tasks.length; ii++) {
          const tmpId = this.tasks[i].tasks[ii].id;
          if (!this.manualStop[tmpId]) {
            this.runningTasks[tmpId] = this.logs[tmpId] && !(this.logs[tmpId].message == 'Stopped' || this.logs[tmpId].message == 'idle');
          }
          this.getLog(tmpId);
          this.numberOfTasks += 1;
        }
      }
    },
    getTasks() {
      return this.$http.get("http://localhost:3080/api/tasks").then(response => {
        this.tasks = response.data;
        this.getNumberOfTasks();
      }).catch(err => {
        this.$notify({
            group: 'task',
            title: 'getTasks',
            type: 'error',
            text: 'Error! Check if server is running and resart OmniAIO.'
          });
        clearInterval(this.timer);
        console.log(err);
      });
    },
    getProfiles() {
      return this.$http.get("http://localhost:3080/api/profiles/files").then(response => {
        this.profiles = response.data;
      }).catch(err => {
        this.$notify({
            group: 'task',
            title: 'getProfiles',
            type: 'error',
            text: 'Error! Check if server is running and resart OmniAIO.'
          });
        clearInterval(this.timer);
        console.log(err);
      });
    },
    getProxies() {
      return this.$http.get("http://localhost:3080/api/proxies/files").then(response => {
        this.proxies = response.data;
      }).catch(err => {
        this.$notify({
            group: 'task',
            title: 'getProxies',
            type: 'error',
            text: 'Error! Check if server is running and resart OmniAIO.'
          });
        clearInterval(this.timer);
        console.log(err);
      });
    },
    validateTasks() {
      if (this.creatorSite == "Site") {
        return false;
      } else if (this.creatorMode == "Mode") {
        return false;
      } else if (this.creatorProxies == "Proxies") {
        return false;
      } else if (this.creatorSize == "Size") {
        return false;
      } else if (this.creatorProfile == "Profile Group" && this.isProfileGroups) {
        return false;
      } else if (this.newProfileData !== null && !this.isProfileGroups) {
        alert("Error! Profile has not yet been confirmed/created.");
        return false;
      } else if (this.creatorSKU == "") {
        return false;
      } else {
        return true;
      }
    },
    createTasks() {
      if (this.isProfileGroups) {
        if (this.validateTasks()) {
          this.$http.post("http://localhost:3080/api/tasks/create", [{
            sku: this.creatorSKU,
            site: this.creatorSite,
            proxyList: this.creatorProxies,
            sizes: this.creatorSize,
            mode: this.creatorMode,
            profile: this.creatorProfile,
            profileNames: this.profileNames,
            qty: this.creatorTaskQty,
            isProfileGroups: true
          }]).then(response => { 
            if (response.status === 200) {
                this.$notify({
                  group: 'task',
                  title: 'Task Creator',
                  type: 'success',
                  text: 'Succesfully created task!'
                });
  
              this.createTaskShown = false;
              this.refreshGets();
            } else {
                this.$notify({
                  group: 'task',
                  title: 'Task Creator',
                  type: 'error',
                  text: 'Error:' + response.status
                });
                          
            }
          });
        } else {
          this.$notify({
            group: 'task',
            title: 'Task Creator',
            type: 'error',
            text: 'Error: Missing required fields!'
          });
        }
      } else {
        if (this.validateTasks()) {
          if (this.creatorTaskQty > 1) {
            for (let i = 1; i <= (this.creatorTaskQty - 1); i++) {
              this.newProfileData = this.newProfileData.concat(this.newProfileData[0]); // Really ugly copying method.
            }
          }

          for (let i = 0; i < this.newProfileData.length; i++) {
            this.newProfileData[i].id = this.taskID();
          }

          this.$http.post("http://localhost:3080/api/tasks/create", [{
            sku: this.creatorSKU,
            site: this.creatorSite,
            proxyList: this.creatorProxies,
            sizes: this.creatorSize,
            mode: this.creatorMode,
            profile: this.newProfileData,
            isProfileGroups: false
          }]).then(response => { 
            if (response.status === 200) {
          this.$notify({
               group: 'task',
               title: 'Task Creator',
               type: 'success',
               text: 'Created Task!'
            });

              this.createTaskShown = false;
              this.refreshGets();
            } else {
              this.$notify({
                group: 'task',
                title: 'Task Creator',
                type: 'error',
                text: 'Error! ' + response.status
              });
            }
          });
        } else {
          this.$notify({
            group: 'task',
            title: 'Task Creator',
            type: 'error',
            text: 'Error: Missing required fields!'
          });
        }
      }
    },
    runAllTasks() {
      let areYouSure = confirm("Are you sure you want to run all tasks?");
      if (areYouSure) {
        for (let parent in this.tasks) {
          for (let item in this.tasks[parent].tasks) {
            this.runTask(this.tasks[parent], this.tasks[parent].tasks[item]);
          }
        }
      }
    },
    stopAllTasks() {
      let areYouSure = confirm("Are you sure you want to stop all tasks?");
      if (areYouSure) {
        for (let parent in this.tasks) {
          for (let item in this.tasks[parent].tasks) {
            this.stopTask(this.tasks[parent].tasks[item].id);
          }
        }
      }
    },
    deleteAllTasks() {
      let areYouSure = confirm("Are you sure you want to delete all tasks? This cannot be reversed!");
      if (areYouSure) {
        for (let parent in this.tasks) {
          for (let item in this.tasks[parent].tasks) {
            this.deleteProfile(this.tasks[parent], this.tasks[parent].tasks[item]);
          }
        }
      }
    },
    stopTask(id) {
      this.runningTasks[id] = false;
      this.manualStop[id] = true;
      this.$http.post("http://localhost:3080/api/tasks/stop", [{
        taskID: id
      }]).then(response => {
        if (response.status !== 200) {
          alert('Error! Task to stop does not exist! ' + response.status);
        }
      });
    },
    runTask(parent, item) {
      this.runningTasks[item.id] = true;
      let dataToPass;
      if (parent.site == "Eastbay") {
        dataToPass = {
          site: "Eastbay",
          sku: parent.sku,
          proxyList: parent.proxyList,
          profile: [item],
          sizes: parent.sizes,
          mode: parent.mode,

        };
      } else if (parent.site == "Footlocker") {
        console.log(parent.mode)
        dataToPass = {
          site: "Footlocker",
          sku: parent.sku,
          proxyList: parent.proxyList,
          profile: [item],
          sizes: parent.sizes,
          mode: parent.mode,

        };
      } else if (parent.site == "Footaction") {
        dataToPass = {
          site: "Footaction",
          sku: parent.sku,
          proxyList: parent.proxyList,
          profile: [item],
          sizes: parent.sizes,
          mode: parent.mode,

        };
      } else if (parent.site == "Champssports") {
        dataToPass = {
          site: "Champssports",
          sku: parent.sku,
          proxyList: parent.proxyList,
          profile: [item],
          sizes: parent.sizes,
          mode: parent.mode,
        };
      } else if (parent.site == "KidsFootlocker") {
        dataToPass = {
          site: "Kidsfootlocker",
          sku: parent.sku,
          proxyList: parent.proxyList,
          profile: [item],
          sizes: parent.sizes,
          mode: parent.mode,
         };
       } else {
        alert('Error: site does not exist');
        return;
      }

      this.$http.post("http://localhost:3080/api/tasks/run", [dataToPass]).then(response => { 
        if (response.status === 200) {
          this.refreshGets();
        } else {
          alert('Error!');
        }
      });
    },
    saveProfileToFile() {
      this.$http.post("http://localhost:3080/api/tasks/save", [{tasks: this.tasks}]).then(response => { 
        if (response.status === 200) {
          this.refreshGets();
        } else {
          alert('Error!');
        }
      });
    },
    deleteProfile(taskIndex, profileIndex) {
      this.tasks[taskIndex].tasks.splice(profileIndex, 1);
      this.saveProfileToFile();
       this.$notify({
            group: 'task',
            title: 'Task Manager',
            type: 'success',
            text: 'Deleted Task!',
            duration: 0.1,
          });
    },
    copyProfile(taskIndex, profileIndex) {
      const tasks = this;
      this.asyncTaskID().then(function(out) {
        let copied = JSON.parse(JSON.stringify(tasks.tasks[taskIndex].tasks[profileIndex]));
        copied.id = out;
        tasks.tasks[taskIndex].tasks.push(copied);
        tasks.saveProfileToFile();
      });
    },
    refreshGetsButton() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        console.log("refresh");
        this.refreshGets();
      }, 500);
    },
    refreshGets() {
      this.getTasks();
      this.getProfiles();
      this.getProxies();
    },
    getLog(id) {
      this.$http.post("http://localhost:3080/api/logs", [{
        id: id
      }]).then(response => {
        if (response.body != "" && response.body) {
          this.logs[id] = response.body;
        } else {
          this.logs[id] = {message: "idle", type: "gray"};
        }
      }).catch(err => {
        console.log(err);
        this.logs[id] = {message: "No log", type: "red"};
      });
    },
    showEditProfile(filei, itemi) {
      const profileData = this.tasks[filei].tasks[itemi];
      this.tmpFilei = filei;
      this.tmpItemi = itemi;
      this.newProfileName = profileData.name;

      this.newProfileNameBilling = profileData.billingAddress.name;
      this.newProfileEmailBilling = profileData.billingAddress.email;
      this.newProfilePhoneBilling = profileData.billingAddress.phone;
      this.newProfileLine1Billing = profileData.billingAddress.line1;
      this.newProfileLine2Billing = profileData.billingAddress.line2;
      this.newProfileLine3Billing = profileData.billingAddress.line3;
      this.newProfilePostCodeBilling = profileData.billingAddress.postCode;
      this.newProfileCityBilling = profileData.billingAddress.city;
      this.newProfileCountryBilling = profileData.billingAddress.country;
      this.newProfileStateBilling = profileData.billingAddress.state;

      if (profileData.sameBillingAndShippingAddress) {
        this.newProfileNameShipping = profileData.shippingAddress.name;
        this.newProfileEmailShipping = profileData.shippingAddress.email;
        this.newProfilePhoneShipping = profileData.shippingAddress.phone;
        this.newProfileLine1Shipping = profileData.shippingAddress.line1;
        this.newProfileLine2Shipping = profileData.shippingAddress.line2;
        this.newProfileLine3Shipping = profileData.shippingAddress.line3;
        this.newProfilePostCodeShipping = profileData.shippingAddress.postCode;
        this.newProfileCityShipping = profileData.shippingAddress.city;
        this.newProfileCountryShipping = profileData.shippingAddress.country;
        this.newProfileStateBShipping = profileData.shippingAddress.state;
      }

      this.nameOnCard = profileData.paymentDetails.nameOnCard;
      this.cardBrand = profileData.paymentDetails.cardType;
      this.cardNumber = profileData.paymentDetails.cardNumber;
      this.cardExpiry = profileData.paymentDetails.cardExpMonth + "/" + profileData.paymentDetails.cardExpYear;
      this.cardCvc = profileData.paymentDetails.cardCvv;
      this.creatorHideShipping = profileData.sameBillingAndShippingAddress;
      this.onlyCheckoutOnce = profileData.onlyCheckoutOnce;

      this.editMode = true;
      this.newProfileShown = true;
    },
    editProfile() {
      let newProfileData;
      if (this.creatorHideShipping) {
        newProfileData = [{
          "name": this.newProfileName,
          "size": "",
          "profileGroup": "",
          "billingAddress": {
            "name": this.newProfileNameBilling,
            "email": this.newProfileEmailBilling,
            "phone": this.newProfilePhoneNumberBilling,
            "line1": this.newProfileLine1Billing,
            "line2": this.newProfileLine2Billing,
            "line3": this.newProfileLine3Billing,
            "postCode": this.newProfilePostCodeBilling,
            "city": this.newProfileCityBilling,
            "country": this.newProfileCountryBilling,
            "state": this.newProfileStateBilling
          },
          "shippingAddress": {
            "name": this.newProfileNameBilling,
            "email": this.newProfileEmailBilling,
            "phone": this.newProfilePhoneNumberBilling,
            "line1": this.newProfileLine1Billing,
            "line2": this.newProfileLine2Billing,
            "line3": this.newProfileLine3Billing,
            "postCode": this.newProfilePostCodeBilling,
            "city": this.newProfileCityBilling,
            "country": this.newProfileCountryBilling,
            "state": this.newProfileStateBilling
          },
          "paymentDetails": {
            "nameOnCard": this.nameOnCard,
            "cardType": this.cardBrand,
            "cardNumber": this.cardNumber.replace(/\s/g, ''),
            "cardExpMonth": this.cardExpiry.split('/')[0],
            "cardExpYear": this.cardExpiry.split('/')[1],
            "cardCvv": this.cardCvc
          },
          "id": this.taskID(),
          "sameBillingAndShippingAddress": true,
          "onlyCheckoutOnce": this.onlyCheckoutOnce,
          "matchNameOnCardAndAddress": (this.newProfileNameBilling == this.nameOnCard)
        }];
      } else {
        newProfileData = [{
          "name": this.newProfileName,
          "size": "",
          "profileGroup": "",
          "billingAddress": {
            "name": this.newProfileNameBilling,
            "email": this.newProfileEmailBilling,
            "phone": this.newProfilePhoneNumberBilling,
            "line1": this.newProfileLine1Billing,
            "line2": this.newProfileLine2Billing,
            "line3": this.newProfileLine3Billing,
            "postCode": this.newProfilePostCodeBilling,
            "city": this.newProfileCityBilling,
            "country": this.newProfileCountryBilling,
            "state": this.newProfileStateBilling
          },
          "shippingAddress": {
            "name": this.newProfileNameShipping,
            "email": this.newProfileEmailShipping,
            "phone": this.newProfilePhoneNumberShipping,
            "line1": this.newProfileLine1Shipping,
            "line2": this.newProfileLine2Shipping,
            "line3": this.newProfileLine3Shipping,
            "postCode": this.newProfilePostCodeShipping,
            "city": this.newProfileCityShipping,
            "country": this.newProfileCountryShipping,
            "state": this.newProfileStateShipping
          },
          "paymentDetails": {
            "nameOnCard": this.nameOnCard,
            "cardType": this.cardBrand,
            "cardNumber": this.cardNumber.replace(/\s/g, ''),
            "cardExpMonth": this.cardExpiry.split('/')[0],
            "cardExpYear": '20' + this.cardExpiry.split('/')[1],
            "cardCvv": this.cardCvc
          },
          "sameBillingAndShippingAddress": false,
          "onlyCheckoutOnce": this.onlyCheckoutOnce,
          "matchNameOnCardAndAddress": (this.newProfileNameBilling == this.nameOnCard)
        }];
      }
      this.tasks[this.tmpFilei].tasks[this.tmpItemi] = newProfileData[0];
      this.saveProfileToFile();
      this.editMode = false;
      this.newProfileShown = false;
    },
    createProfile() { // Pass to other thing
      if (this.creatorHideShipping) {
        this.newProfileData = [{
          "name": this.newProfileName,
          "size": "",
          "profileGroup": "",
          "billingAddress": {
            "name": this.newProfileNameBilling,
            "email": this.newProfileEmailBilling,
            "phone": this.newProfilePhoneNumberBilling,
            "line1": this.newProfileLine1Billing,
            "line2": this.newProfileLine2Billing,
            "line3": this.newProfileLine3Billing,
            "postCode": this.newProfilePostCodeBilling,
            "city": this.newProfileCityBilling,
            "country": this.newProfileCountryBilling,
            "state": this.newProfileStateBilling
          },
          "shippingAddress": {
            "name": this.newProfileNameBilling,
            "email": this.newProfileEmailBilling,
            "phone": this.newProfilePhoneNumberBilling,
            "line1": this.newProfileLine1Billing,
            "line2": this.newProfileLine2Billing,
            "line3": this.newProfileLine3Billing,
            "postCode": this.newProfilePostCodeBilling,
            "city": this.newProfileCityBilling,
            "country": this.newProfileCountryBilling,
            "state": this.newProfileStateBilling
          },
          "paymentDetails": {
            "nameOnCard": this.nameOnCard,
            "cardType": this.cardBrand,
            "cardNumber": this.cardNumber.replace(/\s/g, ''),
            "cardExpMonth": this.cardExpiry.split('/')[0],
            "cardExpYear": this.cardExpiry.split('/')[1],
            "cardCvv": this.cardCvc
          },
          "sameBillingAndShippingAddress": true,
          "onlyCheckoutOnce": this.onlyCheckoutOnce,
          "matchNameOnCardAndAddress": (this.newProfileNameBilling == this.nameOnCard)
        }];
      } else {
        this.newProfileData = [{
          "name": this.newProfileName,
          "size": "",
          "profileGroup": "",
          "billingAddress": {
            "name": this.newProfileNameBilling,
            "email": this.newProfileEmailBilling,
            "phone": this.newProfilePhoneNumberBilling,
            "line1": this.newProfileLine1Billing,
            "line2": this.newProfileLine2Billing,
            "line3": this.newProfileLine3Billing,
            "postCode": this.newProfilePostCodeBilling,
            "city": this.newProfileCityBilling,
            "country": this.newProfileCountryBilling,
            "state": this.newProfileStateBilling
          },
          "shippingAddress": {
            "name": this.newProfileNameShipping,
            "email": this.newProfileEmailShipping,
            "phone": this.newProfilePhoneNumberShipping,
            "line1": this.newProfileLine1Shipping,
            "line2": this.newProfileLine2Shipping,
            "line3": this.newProfileLine3Shipping,
            "postCode": this.newProfilePostCodeShipping,
            "city": this.newProfileCityShipping,
            "country": this.newProfileCountryShipping,
            "state": this.newProfileStateShipping
          },
          "paymentDetails": {
            "nameOnCard": this.nameOnCard,
            "cardType": this.cardBrand,
            "cardNumber": this.cardNumber.replace(/\s/g, ''),
            "cardExpMonth": this.cardExpiry.split('/')[0],
            "cardExpYear": '20' + this.cardExpiry.split('/')[1],
            "cardCvv": this.cardCvc
          },
          "sameBillingAndShippingAddress": false,
          "onlyCheckoutOnce": this.onlyCheckoutOnce,
          "matchNameOnCardAndAddress": (this.newProfileNameBilling == this.nameOnCard)
        }];
      }
      this.newProfileShown = false;
     },
     saveProfileData: function(filename, data) {
      return this.$http.post("http://localhost:3080/api/profiles/edit", [{
        profileFile: filename,
        data: data
      }]).then(() => {
        this.resetProfiles();
      }).catch(err => {
        alert('Error! ' + err);
      });
    },
     validate: function() {
      // init
      this.cardErrors = {};
      // validate card number
      if(!this.$cardFormat.validateCardNumber(this.cardNumber)){
        this.cardErrors.cardNumber = "Invalid Credit Card Number.";
      }
      // validate card expiry
      if (!this.$cardFormat.validateCardExpiry(this.cardExpiry)) {
        this.cardErrors.cardExpiry = "Invalid Expiration Date.";
      }
      // validate card CVC
      if (!this.$cardFormat.validateCardCVC(this.cardCvc)) {
        this.cardErrors.cardCvc = "Invalid CVC.";
      }
    },
    validateCC: function() {
      // validate card number
      if(!this.$cardFormat.validateCardNumber(this.cardNumber)){
        this.cardErrors.cardNumber = "Invalid Credit Card Number.";
      }
    },
    validateCE: function() {
      // validate card expiry
      if (!this.$cardFormat.validateCardExpiry(this.cardExpiry)) {
        this.cardErrors.cardExpiry = "Invalid Expiration Date.";
      }
    },
    validateCVC: function() {
      // validate card CVC
      if (!this.$cardFormat.validateCardCVC(this.cardCvc)) {
        this.cardErrors.cardCvc = "Invalid CVC.";
      }
    }
  },
  mounted() {
    this.refreshGets();
    this.timer = setInterval(() => {
      console.log("refresh");
      this.refreshGets();
    }, 500)
  },
  beforeDestroy() {
    clearInterval(this.timer);
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

  div::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
    border-radius: 10px;
  }

  div::-webkit-scrollbar:hover {
    width: 10px;
    background-color: white;
    border-radius: 10px;
  }

  div::-webkit-scrollbar-thumb:hover {
    background-color: grey;
    border-radius: 10px;
    background-image: -webkit-gradient(linear, 0 0, 0 100%,
                      color-stop(0, rgba(255, 255, 255, .2)),
              color-stop(0, transparent), to(transparent));
  }
</style>
