<template>
  <div id="app">
    <!-- Set to true to test modals-->
    <Modal shown="false">
      <ModalBody>
        Hey
      </ModalBody>
    </Modal>

    <Action iconName="play" text="Click to Open Modal" borderColor="purple" class="mx-2 my-2"></Action><br/>

    <Action iconName="play" text="Start All" borderColor="green" class="mx-2 my-2"></Action>
    <Action iconName="square-shape" text="Stop All" borderColor="pink" class="mx-2 my-2"></Action>
    <Action iconName="trash" text="Delete All" borderColor="yellow" class="mx-2 my-2"></Action>
    <Card class="ml-2 w-1/4">
      <CardHeader><h1 class="text-center font-bold text-lg">Title</h1></CardHeader>
      <CardBody>
        <div class="flex flex-wrap flex-row">
          <div class="flex-auto self-center mb-2">
            <div class="bg-white rounded-full h-16 w-16 flex items-center justify-center">
              <unicon width="40" height="40" name="shopping-cart" fill="purple" />
            </div>
          </div>
          <div class="flex-auto self-center">
            <h1 class="text-lg text-white font-extralight">Total Checkouts</h1>
            <h2 class="text-3xl text-white font-light">56</h2>
          </div>
          <div class="flex-auto self-center">
            <p class="text-white font-extralight pt-4 opacity-75">-2%</p>
          </div>
        </div>
      </CardBody>
    </Card>

    <br/><br/>

    <Table>
      <!-- Todo: Figure out widths -->
      <thead>
        <tr>
          <TableHeader class="w-1/4" place="start">Site</TableHeader>
          <TableHeader class="w-1/6">Product</TableHeader>
          <TableHeader class="w-1/6">Size</TableHeader>
          <TableHeader class="w-1/6">Profile</TableHeader>
          <TableHeader class="w-1/6">Proxies</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader class="w-1/4" place="end">Actions</TableHeader>
        </tr>
      </thead>
      <tbody>
        <tr>
          <TableItem place="start">TEMP</TableItem>
          <TableItem>placeholder</TableItem>
          <TableItem>N/A</TableItem>
          <TableItem>N/A</TableItem>
          <TableItem>N/A</TableItem>
          <TableItem>idle</TableItem>
          <TableItem place="end"><Action iconName="play" iconOnly="true"></Action> <Action iconName="pen" iconOnly="true"></Action> <Action iconName="bars" iconOnly="true"></Action> <Action iconName="trash" iconOnly="true"></Action></TableItem>
        </tr>
        <tr>
          <TableItem place="start">TEMP</TableItem>
          <TableItem>placeholder</TableItem>
          <TableItem>N/A</TableItem>
          <TableItem>N/A</TableItem>
          <TableItem>N/A</TableItem>
          <TableItem>idle</TableItem>
          <TableItem place="end"><Action iconName="play" iconOnly="true"></Action> <Action iconName="pen" iconOnly="true"></Action> <Action iconName="bars" iconOnly="true"></Action> <Action iconName="trash" iconOnly="true"></Action></TableItem>
        </tr>
        <tr>
          <TableItem place="start">TEMP</TableItem>
          <TableItem>placeholder</TableItem>
          <TableItem>N/A</TableItem>
          <TableItem>N/A</TableItem>
          <TableItem>N/A</TableItem>
          <TableItem>idle</TableItem>
          <TableItem place="end"><Action iconName="play" iconOnly="true"></Action> <Action iconName="pen" iconOnly="true"></Action> <Action iconName="bars" iconOnly="true"></Action> <Action iconName="trash" iconOnly="true"></Action></TableItem>
        </tr>
      </tbody>
    </Table>


    <!--<img src="./assets/ui-big.png" />-->
    <br/><br/>
    <Dropdown class="ml-2" :items="['Sup', 'Ey']" selected="Sup"></Dropdown>
    <br/>
    <Card class="w-min ml-2" gradientLColor="gray" gradientRColor="gray" gradientLShade="800" gradientRShade="800">
      <CardHeader class="pl-4 py-4 text-white font-thin" backgroundShade="400">
        Release Calendar
      </CardHeader>
      <v-date-picker
          :value="null"
          color="gray"
          is-dark
          is-range
          />
    </Card>

    <br/><br/>
    <Checkbox class="ml-2 inline-block" place="start" name="day"></Checkbox><Checkbox class="ml-1 inline-block" name="week"></Checkbox><Checkbox class="ml-1 inline-block" name="month"></Checkbox><Checkbox class="ml-1 inline-block" place="end" name="year"></Checkbox>
    <br/><br/><br/><br/>
  </div>
</template>

<script>
import Action from '@/components/Action';
import Card from '@/components/Card';
import CardHeader from '@/components/CardHeader';
import CardBody from '@/components/CardBody';
import Table from '@/components/Table';
import TableHeader from '@/components/TableHeader';
import TableItem from '@/components/TableItem';
import Checkbox from '@/components/Checkbox';
import Dropdown from '@/components/Dropdown';
import Modal from '@/components/Modal';
import ModalBody from '@/components/ModalBody';
export default {
  name: 'App',
  components: {
    Action,
    Card,
    CardHeader,
    CardBody,
    Table,
    TableHeader,
    TableItem,
    Checkbox,
    Dropdown,
    Modal,
    ModalBody
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

  body {
    /*background-image: url('../../assets/ui-big@2x.png');*/
  }
</style>
