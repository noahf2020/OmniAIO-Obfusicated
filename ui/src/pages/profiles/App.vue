<template>
  <div id="app">
    <Modal :shown="newProfileShown.toString()">
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

        <p class="mt-4 text-white text-md" v-if="!editMode">Profile group file</p>

        <div class="flex flex-row mt-4" v-if="!editMode">
          <Dropdown :items="profileFiles" buttonWidth="40" itemWidth="48" v-model="newProfileFile"></Dropdown>
        </div>

        <p class="mt-4 text-white text-md">Settings</p>
        <input class="mt-4" id="onlyCheckoutOnce" type="checkbox" v-model="onlyCheckoutOnce"><label class="text-white ml-2" for="onlyCheckoutOnce">Only checkout once</label>

        <div class="flex flex-row mt-4 justify-center">
          <Action v-if="!editMode" iconName="plus" borderColor="gray" text="Create Profile" @click="createProfile"></Action>
          <Action v-else iconName="pen" borderColor="gray" text="Save Changes" @click="editProfile"></Action>
        </div>
      </ModalBody>
    </Modal>
    
    <div class="flex flex-row">
      <div class="flex-initial">
        <div class="w-40 h-screen border-r-2 border-gray-500" style="background-color: rgba(60, 60, 60, .75);">
          <img class="px-8 pt-5" src="@/assets/logo.svg" />
          <a href="/tasks"><SidebarButton text="Tasks" iconName="bars"></SidebarButton></a>
          <SidebarButton text="Profiles" iconName="credit-card" selected="true"></SidebarButton>
          <a href="/proxies"><SidebarButton text="Proxies" iconName="server"></SidebarButton></a>
          <!--<<a href="/accounts"><SidebarButton text="Accounts" iconName="users-alt"></SidebarButton></a>>-->
          <a href="/settings"><SidebarButton text="Settings" iconName="sliders-v"></SidebarButton></a>
          <!--<a href="/activity"><SidebarButton text="Activity" iconName="chart"></SidebarButton></a>-->
        </div>
      </div>
      <div class="w-full ml-10">
        <div class="flex mt-12 justify-between">
          <div>
            <h1 class="text-white text-3xl inline-block mr-5">Profiles</h1>
            <Action text="Download" iconName="file-download" borderColor="purple" class="mr-5"></Action>
            <Action text="Upload" iconName="file-upload" borderColor="purple" class="mr-5"></Action>
          </div>
          <div class="mr-12">
            <Action text="New Profile" iconName="plus" borderColor="purple" class="mr-5" @click="clearProfileData(); newProfileShown = true"></Action>
            <Action text="Delete All" iconName="trash" borderColor="purple"></Action>
          </div>
        </div>
        <div class="mt-5 border-gray-500 border-2 mr-10 rounded-full px-2 py-1">
          <div class="inline-block" v-for="(file, i) in profileFiles" :key="i">
            <input :id="file" type="checkbox" :name="file" @input="changeProfileDisplay(i, $event.target.checked)" class="hidden">
            <label :for="file" :class="i>=1 ? 'ml-4' : ''" class="bg-gray-500 opacity-70 px-2 py-1 text-center text-white cursor-pointer rounded-full hover:bg-gray-400 hover:bg-opacity-70 checkLabel">{{file}}</label>
          </div>
          <div class="inline-block ml-4">
            <label v-on:click="promptNewProfileFile" class="bg-gray-500 opacity-70 px-2 py-1 text-center text-white cursor-pointer rounded-full hover:bg-opacity-70 checkLabel">+ add</label>
          </div>
        </div>
        <div class="grid grid-flow-row grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          <template v-for="(profileFile, filei) in profiles">
            <template v-for="(profile, index) in profileFile">
              <CreditCard :key="'profile-' + filei + '-' + index" class="mt-10 mr-10" v-if="profileShow['profile-' + filei]" v-on:edit="edit(filei, index)" v-on:copy="copy(filei, index)" v-on:delete="del(filei, index)" :profileName="profile.name" :cardNumber="profile.paymentDetails.cardNumber" :cardHolder="profile.paymentDetails.nameOnCard"></CreditCard>
            </template>
          </template>
        </div>
  <!--<<input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>>-->
     
        
      </div>
    </div>
  </div>
</template>

<script>
import Action from '@/components/Action';
import Modal from '@/components/Modal';
import ModalBody from '@/components/ModalBody';
import SidebarButton from '@/components/SidebarButton';
import TextInput from '@/components/TextInput';
import CreditCard from '@/components/CreditCard';
import Dropdown from '@/components/Dropdown';
export default {
  name: 'App',
  components: {
    Action,
    Modal,
    ModalBody,
    SidebarButton,
    TextInput,
    CreditCard,
    Dropdown
  },
  data() {
    return {
      profileShow: {},
      nameOnCard: '',
      cardBrand: null,
      cardNumber: null,
      cardExpiry: null,
      cardCvc: null,
      cardErrors: {},
      creatorHideShipping: true,
      onlyCheckoutOnce: true,
      newProfileShown: false,
      profiles: null,
      profileFiles: null,
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
      editMode: false,
      tmpFilei: null,
      tmpItemi: null,
      file: ''
    }
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getProfiles',
    cardNumber: function(val){
      if (this.$cardFormat.validateCardNumber(val)){
        this.$refs.cardExpInput.focus();
      }
    },
    cardExpiry: function (val) {
      if (this.$cardFormat.validateCardExpiry(val)) {
        this.$refs.cardCvcInput.focus();
      }
    }
  },
  methods: {
    handleFileUpload() { // WIP
      this.file = this.$refs.file.files[0];
      const formData = new FormData();
      formData.append('test.json', this.file);
      this.$http.post('http://localhost:3080/api/profiles/upload', this.file, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        if (response.status === 200) {
            alert("Succesfully uploaded file!");
            this.resetProfiles();
          } else {
            alert('Error! ' + response.status);
          }
      });
    },
    changeProfileDisplay: function(i, value) {
      // this.profileShow['profile-' + i.toString()] = value;
      this.$set(this.profileShow, 'profile-' + i.toString(), value);
    },
    getProfileDisplay: function(i) {
      return this.profileShow['profile-' + i.toString()];
    },
    clearProfileData: function() {
      this.newProfileName = '';
      this.newProfileNameBilling = '';
      this.newProfileEmailBilling = '';
      this.newProfilePhoneBilling = '';
      this.newProfileLine1Billing = '';
      this.newProfileLine2Billing = '';
      this.newProfileLine3Billing = '';
      this.newProfilePostCodeBilling = '';
      this.newProfileCityBilling = '';
      this.newProfileCountryBilling = 'Country';
      this.newProfileStateBilling = ''
      this.newProfileNameShipping = '';
      this.newProfileEmailShipping = '';
      this.newProfilePhoneShipping = '';
      this.newProfileLine1Shipping = '';
      this.newProfileLine2Shipping = '';
      this.newProfileLine3Shipping = '';
      this.newProfilePostCodeShipping = '';
      this.newProfileCityShipping = '';
      this.newProfileCountryShipping = 'Country';
      this.newProfileStateBShipping = '';
      this.newProfileFile = 'Profile file'
      this.nameOnCard = '';
      this.cardBrand = null;
      this.cardNumber = null;
      this.cardExpiry = null;
      this.cardCvc = null;
      this.creatorHideShipping = true
      this.onlyCheckoutOnce = true;
    },
    edit: function(filei, itemi) {
      const profileData = this.profiles[filei][itemi];
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
    copy: function(filei, itemi) {
      this.profiles[filei].push(this.profiles[filei][itemi]);
      this.saveProfileData(this.profileFiles[filei], JSON.stringify(this.profiles[filei]));
    },
    del: function(filei, itemi) {
      let areYouSure = confirm("Are you sure you want to delete " + this.profiles[filei][itemi].name + "?");
      if (areYouSure) {
        this.profiles[filei].splice(itemi, 1);
      }
      this.saveProfileData(this.profileFiles[filei], JSON.stringify(this.profiles[filei]));
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
    },
    getProfiles() {
      return this.$http.get("http://localhost:3080/api/profiles").then(response => {
        this.profiles = response.data;
        /*for (const a in response.data) {
          for (const b in response.data[a]) {
            this.profiles.push(response.data[a][b]);
          }
        }*/
      }).catch(err => {
        console.log(err);
      });
    },
    getProfileFiles() {
      return this.$http.get("http://localhost:3080/api/profiles/files").then(response => {
        console.log(response);
        this.profileFiles = response.data;
      }).catch(err => {
        console.log(err);
      });
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
        this.profiles[this.tmpFilei][this.tmpItemi] = newProfileData;

        this.saveProfileData(this.profileFiles[this.tmpFilei], JSON.stringify(this.profiles[this.tmpFilei]));
      }
    },
    createProfile() {
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

      this.$http.post("http://localhost:3080/api/profiles/create", [{
        profileFile: this.newProfileFile,
        data: JSON.stringify(newProfileData)
      }]).then(response => { 
        if (response.status === 200) {
          alert("Succesfully created profile!");
          this.newProfileShown = false;
          this.resetProfiles();
        } else {
          alert('Error!');
        }
      });
    },
    resetProfiles() {
      this.getProfiles();
      this.getProfileFiles();
    },
    promptNewProfileFile() {
      this.$prompt("Name of new profile group file (typically ending in .json)?").then((value) => {
        this.profileFiles.push(value);
      });
    },
    getBrandClass: function (brand) {
        let icon = '';
        brand = brand || 'unknown';
        let cardBrandToClass = {
          'visa': 'fab fa-cc-visa',
          'mastercard': 'fab fa-cc-mastercard',
          'amex': 'fab fa-cc-amex',
          'discover': 'fab fa-cc-discover',
          'diners': 'fab fa-cc-diners-club',
          'jcb': 'fab fa-cc-jcb',
          'unknown': 'fa fa-credit-card',
        };
        if (cardBrandToClass[brand]) {
          icon = cardBrandToClass[brand];
        }

        return icon;
      }
  },
  computed: {
    cardBrandClass(){
      return this.getBrandClass(this.cardBrand);
    }
  },
  mounted() {
    this.resetProfiles();
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

  input[type="checkbox"]:checked + .checkLabel {
      @apply bg-gray-300;
      @apply text-black;
      @apply opacity-100;
  }
</style>
