<template>
  <div id="app">
    <div class="flex flex-row">
      <div class="flex-initial">
        <div class="w-40 h-screen border-r-2 border-gray-500" style="background-color: rgba(60, 60, 60, .75);">
          <img class="px-8 pt-5" src="@/assets/logo.svg" />
          <a href="/tasks"><SidebarButton text="Tasks" iconName="bars"></SidebarButton></a>
          <a href="/profiles"><SidebarButton text="Profiles" iconName="credit-card"></SidebarButton></a>
          <a href="/proxies"><SidebarButton text="Proxies" iconName="server"></SidebarButton></a>
          <SidebarButton text="Accounts" iconName="users-alt" selected="true"></SidebarButton>
          <a href="/settings"><SidebarButton text="Settings" iconName="sliders-v"></SidebarButton></a>
          <!--<a href="/activity"><SidebarButton text="Activity" iconName="chart"></SidebarButton></a>-->
        </div>
      </div>
      <div class="w-full ml-10" style="height: 90vh;">
        <div class="flex mt-12 h-full">
          <div class="w-2/6 pr-5">
            <div class="container bg-gray-500 bg-opacity-75 rounded-lg pb-10 h-full">
              <div>
                <CardHeader class="text-center text-white" backgroundShade="500">ACCOUNT LIST</CardHeader>
              </div>
              <div class="px-5 py-5 h-full">
                <Table class="w-full">
                  <tbody>
                    <tr>
                      <TableItem place="start" class="w-3/6" textAlign="left" backgroundColor="bg-gray-800">List 01</TableItem>
                      <TableItem class="w-1/6" textAlign="center" backgroundColor="bg-gray-800">10</TableItem>
                      <TableItem place="end" class="w-2/6" backgroundColor="bg-gray-800"><Action iconName="pen" iconOnly="true"></Action> <Action iconName="copy" iconOnly="true"></Action> <Action iconName="trash" iconOnly="true"></Action></TableItem>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
          <div class="flex-initial w-2/6 pr-5">
            <div class="container bg-gray-500 bg-opacity-75 rounded-lg h-full">
              <CardHeader class="text-center text-white" backgroundShade="500">LIST</CardHeader>
              <div class="px-5 py-3">
              </div>
            </div>
          </div>
          <div class="flex-initial w-2/6 pr-10">
            <div class="container bg-gray-500 bg-opacity-75 rounded-lg">
              <CardHeader class="text-center text-white" backgroundShade="500">GENERATOR</CardHeader>
              <div class="px-5 py-3 flex flex-col">
                <div class="text-center">
                  <Dropdown class="mt-5 inline-block" :items="['Walmart', 'Target', 'Nike']" selected="Site" buttonWidth="44" itemWidth="36"></Dropdown>
                  <NumberPicker class="inline-block ml-5" placeholder="QTY" itemWidth="16"></NumberPicker>
                </div>
                <div class="pt-5 text-center">
                  <Action iconName="play" borderColor="green" class="mr-5" text="Start"></Action>
                  <Action iconName="square-shape" borderColor="red" class="mr-5" text="Stop"></Action>
                  <Action iconName="save" borderColor="purple" class="mr-5" text="Save"></Action>
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
import SidebarButton from '@/components/SidebarButton';
import CardHeader from '@/components/CardHeader';
import Table from '@/components/Table';
import TableItem from '@/components/TableItem';
import Dropdown from '@/components/Dropdown';
import NumberPicker from '@/components/NumberPicker';
export default {
  name: 'App',
  components: {
    Action,
    SidebarButton,
    CardHeader,
    Table,
    TableItem,
    Dropdown,
    NumberPicker
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
