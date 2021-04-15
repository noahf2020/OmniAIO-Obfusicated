<template>
  <div id="app">
    <div class="flex flex-row">
      <div class="flex-initial">
        <div class="w-40 h-screen border-r-2 border-gray-500" style="background-color: rgba(60, 60, 60, .75);">
          <img class="px-8 pt-5" src="@/assets/logo.svg" />
          <a href="/tasks"><SidebarButton text="Tasks" iconName="bars"></SidebarButton></a>
          <a href="/profiles"><SidebarButton text="Profiles" iconName="credit-card"></SidebarButton></a>
          <a href="/proxies"><SidebarButton text="Proxies" iconName="server"></SidebarButton></a>
          <a href="/accounts"><SidebarButton text="Accounts" iconName="users-alt"></SidebarButton></a>
          <a href="/settings"><SidebarButton text="Settings" iconName="sliders-v"></SidebarButton></a>
          <SidebarButton text="Activity" iconName="chart" selected="true"></SidebarButton>
          <div class="bottom-3 left-3 absolute text-white">
            <p class="font-thin text-center">v0.3.0</p>
          </div>
        </div>
      </div>
      <div class="w-full ml-10">
        <div class="flex mt-12">
          <div class="flex-initial w-2/6 pr-5">
            <div>
              <Card gradientLShade="500" gradientRShade="400">
                <CardBody>
                  <div class="flex flex-wrap flex-row">
                    <div class="">
                      <div class="bg-white rounded-full h-16 w-16 flex items-center justify-center">
                        <unicon width="40" height="40" name="chart" fill="purple" />
                      </div>
                    </div>
                    <div class="flex flex-col pl-5">
                      <div>
                        <h1 class="text-3xl text-white font-extralight">Analytics</h1>
                      </div>
                      <div class="pt-2">
                        <Checkbox class="inline-block" place="start" name="day"></Checkbox><Checkbox class="ml-1 inline-block" name="week"></Checkbox><Checkbox class="ml-1 inline-block" name="month"></Checkbox><Checkbox class="ml-1 inline-block" place="end" name="year"></Checkbox>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            <div class="pt-4">
              <Card gradientLColor="gray" gradientRColor="gray" gradientLShade="500" gradientRShade="500">
                <CardHeader class="text-white text-center text-3xl" backgroundShade="600">RECENT ORDERS</CardHeader>
                <div class="px-4 py-2 text-white">
                  <Card gradientLColor="gray" gradientRColor="gray" gradientLShade="600" gradientRShade="600">
                    <div class="px-4 py-2 text-white flex flex-row">
                      <div class="w-20">
                        <img src="@/assets/supreme-hoodie.jpg">
                      </div>
                      <div class="flex flex-col pl-5">
                        <p class="text-bold text-lg">Supreme</p>
                        <p class="text-light">Box Logo L/S Hoodie</p>
                        <p class="text-bold">$100</p>
                      </div>
                      <div class="flex flex-col pl-5">
                        <p class="text-bold text-lg">01/08/21</p>
                        <p class="text-bold mt-6">9</p>
                      </div>
                    </div>
                  </Card>
                </div>  
              </Card>
            </div>
          </div>
          <div class="flex-initial w-2/6 pr-5">
            <div>
              <Card gradientLShade="500" gradientRShade="700">
                <CardBody>
                  <div class="flex flex-wrap flex-row">
                    <div class="flex-auto self-center">
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
            </div>

            <div class="pt-4">
              <table class="table-auto text-left w-full text-white">
                <thead class="bg-gray-400">
                  <tr>
                    <th>SITE</th>
                    <th>ORDERS</th>
                    <th>FAILED</th>
                    <th>SPENT</th>
                  </tr>
                </thead>
                <tbody class="bg-gray-600">
                  <tr>
                    <td>New Balence</td>
                    <td>11</td>
                    <td>0</td>
                    <td>$1250</td>
                  </tr>
                  <tr>
                    <td>Supreme</td>
                    <td>3</td>
                    <td>11</td>
                    <td>$342</td>
                  </tr>
                  <tr>
                    <td>Yeezy Supply</td>
                    <td>3</td>
                    <td>11</td>
                    <td>$1488</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="pt-4">
              <Card gradientLColor="gray" gradientRColor="gray" gradientLShade="800" gradientRShade="800">
                <CardHeader class="pl-4 py-4 text-white font-thin" backgroundShade="400">
                  Release Calendar
                </CardHeader>
                <v-date-picker :value="null" color="gray" is-dark is-range is-expanded />
              </Card>
            </div>
          </div>
          <div class="flex-initial w-2/6 pr-10">
            <div class="flex flex-col">
              <div>
                <Card gradientLColor="red" gradientRColor="red" gradientLShade="400">
                  <div class="flex flex-wrap flex-row px-3 py-3">
                    <div class="flex-auto self-center">
                      <div class="bg-white rounded-full h-16 w-16 flex items-center justify-center">
                        <unicon width="40" height="40" name="multiply" fill="red" />
                      </div>
                    </div>
                    <div class="flex-auto self-center">
                      <h1 class="text-md text-white font-extralight">Failed Checkouts</h1>
                      <h2 class="text-2xl text-white font-light">21</h2>
                    </div>
                    <div class="flex-auto self-center">
                      <p class="text-white font-extralight pt-4 opacity-75">+4%</p>
                    </div>
                  </div>
                </Card>
              </div>
              <div class="mt-4">
                <Card gradientLColor="green" gradientRColor="green" gradientLShade="500" gradientRShade="700">
                  <div class="flex flex-wrap flex-row px-3 py-3">
                    <div class="flex-auto self-center">
                      <div class="bg-white rounded-full h-16 w-16 flex items-center justify-center">
                        <unicon width="40" height="40" name="dollar-alt" fill="green" />
                      </div>
                    </div>
                    <div class="flex-auto self-center">
                      <h1 class="text-md text-white font-extralight">Total Spent</h1>
                      <h2 class="text-2xl text-white font-light">$11,032</h2>
                    </div>
                    <div class="flex-auto self-center">
                      <p class="text-white font-extralight pt-4 opacity-75">+11%</p>
                    </div>
                  </div>
                </Card>
                <div class="mt-4">
                  <Card gradientLColor="gray" gradientRColor="gray" gradientLShade="600" gradientRShade="500">
                    <CardHeader class="text-white text-center" backgroundShade="400">Changelog v0.3.0</CardHeader>
                    <div class="px-4 py-2 text-white">
                      - Fixed Supreme checkout errors<br/>
                      - Captcha Harvester Fix<br/>
                      - General Improvements<br/>
                    </div>
                  </Card>
                </div>

                <div class="pt-4">
                  <Card gradientLColor="gray" gradientRColor="gray" gradientLShade="500" gradientRShade="500">
                    <CardHeader class="text-white text-center text-2xl font-extralight" backgroundShade="400">RELEASING THIS WEEK</CardHeader>
                    <div class="px-4 py-2 text-white">
                      <Card gradientLColor="gray" gradientRColor="gray" gradientLShade="600" gradientRShade="600">
                        <div class="px-4 py-2 text-white flex flex-row">
                          <div class="w-20">
                            <img src="@/assets/supreme-hoodie.jpg">
                          </div>
                          <div class="flex flex-col pl-5">
                            <p class="text-bold text-lg">Supreme</p>
                            <p class="text-light">Box Logo L/S Hoodie</p>
                            <p class="text-bold">01/08/21</p>
                          </div>
                        </div>
                      </Card>
                    </div>  
                  </Card>
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
import SidebarButton from '@/components/SidebarButton';
import Card from '@/components/Card';
import CardHeader from '@/components/CardHeader';
import CardBody from '@/components/CardBody';
import Checkbox from '@/components/Checkbox';
export default {
  name: 'App',
  components: {
    SidebarButton,
    Card,
    CardHeader,
    CardBody,
    Checkbox
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
