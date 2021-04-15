/** @format */
const rp = require("request-promise");
const queryString = require('query-string');
const { v4 } = require("uuid");
const fs = require("fs");
var https = require("https");
const adyenEncrypt = require("node-adyen-encrypt")(24);
const log = require('./libs/log.js')
const axios = require('axios');
const {retrieveStateInformation} = require("usa-state-validator")
const webhook = require("./libs/webhooks.js");
const fetch = require('node-fetch');
let folderName;
let folderNameBase;
let folderNameTasks;
let folderNameProxies;
let folderNameLogs;
let folderNameOption;
let folderNameProfiles;

if (process.env.USERNAME !== undefined) {
  folderName = '/Users/'+ process.env.USERNAME + '/Programs/OmniAIO'
  folderNameBase = '/Users/'+ process.env.USERNAME +'/Programs/OmniAIO/settings'
  folderNameTasks = '/Users/'+ process.env.USERNAME +'/Programs/OmniAIO/settings/tasks'
  folderNameProxies = '/Users/'+ process.env.USERNAME +'/Programs/OmniAIO/settings/proxies'
  folderNameLogs = '/Users/'+ process.env.USERNAME +'/Programs/OmniAIO/settings/logs' 
  folderNameOption = '/Users/'+ process.env.USERNAME +'/Programs/OmniAIO/settings/options.json' 
  folderNameProfiles = '/Users/'+ process.env.USERNAME +'/Programs/OmniAIO/settings/profiles'
} else {
  folderName = '/Users/'+ process.env.USER + '/Programs/OmniAIO'
  folderNameBase = '/Users/'+ process.env.USER +'/Programs/OmniAIO/settings'
  folderNameTasks = '/Users/'+ process.env.USER +'/Programs/OmniAIO/settings/tasks'
  folderNameProxies = '/Users/'+ process.env.USER +'/Programs/OmniAIO/settings/proxies'
  folderNameLogs = '/Users/'+ process.env.USER +'/Programs/OmniAIO/settings/logs' 
  folderNameOption = '/Users/'+ process.env.USER +'/Programs/OmniAIO/settings/options.json' 
  folderNameProfiles = '/Users/'+ process.env.USER +'/Programs/OmniAIO/settings/profiles'
}
const queue ='https://discord.com/api/webhooks/813718503768981514/bzn1lMuYA_PTPzF9fCnp3NzZZICXhOIEylmI3TPWV-FQbrc-hhxH2tYQPfYTdDq0fBK_'
const atc = 'https://discord.com/api/webhooks/813718713915932673/hdCaq40BLeixhOxaQWSb549IICLyFW0-t-3yqVkxuv5tmHl1MxfkRwOSy3x1HFPJjNXF'
const cap = 'https://discord.com/api/webhooks/813718819558129674/Z7RWlSj0-MpglGEM3q3Hdu7ctMbmhZ_ltRGOUR37eL8BjAtnGA8RvAGwr9KWnogIsWk2'
const checkouts = 'https://discord.com/api/webhooks/813718915749249035/oPwMXuNOUfZREfajWBlaWmAzKcqVpOLBf-VMhOIILXb6bdPvT7d39ddD5u05Smn-SNwq'


class Footsites {
  constructor(profile, runSku, runproxyList, runSizes, runSite, proxy, runMode) {
    this.mode = runMode
    this.parseproxylist = runproxyList;
    this.profile = profile;
    this.pid = runSku;
    this.size = runSizes;
    this.site = runSite;
    this.taskId = profile.id;
    this.monitorDelay = task.monitorDelay;
    this.navigationDelay = task.navigationDelay;
    this.restockDelay = task.restockDelay;
    this.jar = rp.jar();
    this.csrf = "";
    this.productInfo = {};
    this.cartId = "";
    this.ddCookieRes = "";
    this.aydenEncryptedCard = {};
    this.proxy = proxy;
    this.hardStop = false;
    this.request = rp.defaults({
     jar: true,
     proxy: proxy,//`${this.obj.link}`,
     followAllRedirects: true,
     agent: new https.Agent({
       host: `www.${this.site}.com`,
       port: "443",
       path: "/",
       rejectUnauthorized: false,
     }),
   });
 
  }
  async start() {
    try {
      console.log("Mode: " + this.mode)
       log.output("normal", `Footsites -- ${this.site}`, `Starting ${this.site} Task  ${this.taskId}`);
       log.output("working", `Footsites -- ${this.site}`, `Getting Session`, this.taskId);
      await this.initializeSession();
      log.output("working", `Footsites -- ${this.site}`, `Getting Product`, this.taskId);
      await this.delay(this.navigationDelay);
      await this.getItemDetails();
      if (!this.productInfo) return;
      await this.delay(this.navigationDelay);
      if (this.hardStop) {
        log.output("normal", `Footsites -- ${this.site}`, `Stopped`, this.taskId);
        return;
      }
      log.output("working", `Footsites -- ${this.site}`, `Adding to Cart`, this.taskId);
      await this.addTocart();
      await this.delay(this.navigationDelay);
      if (this.hardStop) {
        log.output("normal", `Footsites -- ${this.site}`, `Stopped`, this.taskId);
        return;
      }
      log.output("success", `Footsites -- ${this.site}`, `Added to Cart`, this.taskId);
      await this.delay(this.navigationDelay);
      if (this.hardStop) {
        log.output("normal", `Footsites -- ${this.site}`, `Stopped`, this.taskId);
        return;
      }
      await this.submitEmail();
      if (this.hardStop) {
        log.output("normal", `Footsites -- ${this.site}`, `Stopped`, this.taskId);
        return;
      }
      await this.delay(this.navigationDelay);
      if (this.hardStop) {
        log.output("normal", `Footsites -- ${this.site}`, `Stopped`, this.taskId);
        return;
      }
      await this.submitShipping();
      log.output("working", `Footsites -- ${this.site}`, `Submitted Shipping Info`, this.taskId);
      await this.delay(this.navigationDelay);
      if (this.hardStop) {
        log.output("normal", `Footsites -- ${this.site}`, `Stopped`, this.taskId);
        return;
      }
      await this.submitBilling();
      log.output("working", `Footsites -- ${this.site}`, `Submitting Payment Info`, this.taskId);
      if (this.hardStop) {
        log.output("normal", `Footsites -- ${this.site}`, `Stopped`, this.taskId);
        return;
      }
      await this.submitOrder();
      if (this.hardStop) {
        log.output("normal", `Footsites -- ${this.site}`, `Stopped`, this.taskId);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async stop() {
    this.hardStop = true;
  }

  updateStatus(status, table = null) {
    log.output("working", `Footsites -- ${this.site}`, status, this.taskId);
    if (table) {
    }
  }

  async initializeSession() {
    if (this.hardStop) {
      log.output("normal", `Footsites -- ${this.site}`, `Stopped`, this.taskId);
      return;
    }



    try {
      let url = `https://www.${
        this.site
      }.com/api/v5/session?timestamp=${Date.now()}`;
      log.output("working", `Footsites -- ${this.site}`, `Loading.. `, this.taskId);
      const options = {
        method: "GET",
        uri: url,
        headers: {
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7,de;q=0.6",
          Connection: "keep-alive",
          Host: `${this.site}.com`,
          "Sec-Fetch-Dest": "document",
          "Sec-Fetch-Mode": "navigate",
          "Sec-Fetch-Site": "none",
          "Sec-Fetch-User": "?1",
          "Upgrade-Insecure-Requests": "1",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36",
          "x-fl-request-id": v4(),

        },
        jar: this.jar,
        rejectUnauthorized: false,
        transform: function (body, response) {
          return { data: body, status: response.statusCode };
        },
      };
      const res = await this.request(options);
      console.log(res.status)
      if (res.status == 503) {
        
    fetch(queue, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: "",
          embeds: [
            {
              title: `Task Queue`,
              color: 3066993,
              timestamp: new Date(),
              footer: {
                text: `Omni AIO v1`,
                icon_url:
                  "https://pbs.twimg.com/profile_images/1347337377124147201/1Psx6u9C_400x400.jpg",
              },
              fields: [
                {
                  name: "User",
                  value: `${data.key}`,
                  inline: true
                },
                {
                    name: "Site",
                    value: this.site,
                    inline: true
                  },
                  {
                    name: "SKU",
                    value: this.pid,
                    inline: true
                  },
                  
              ],
            },
          ],
        }),
      }).catch((err) => {});
        throw new Error({ status: 503, error: "queue" });
      }
      const response = JSON.parse(res.data);
      if (response.data) {
    
        this.csrf = response.data.csrfToken;
      } else {
        log.output("error", `Footsites -- ${this.site}`, `Error: Init Session`, this.taskId);
        throw new Error("unable to initial session");
      }
    } catch (error) {
      if (error.response == undefined){
      log.output("error", `Footsites -- ${this.site}`, `Proxy Banned`, this.taskId);
      
        throw new Error("PROXY BANNED")
      }
      if (error.response.status == 503) {
      log.output("working", `Footsites -- ${this.site}`, `In Queue--Wait`, this.taskId);
    
        await this.delay(this.monitorDelay);
        await this.initializeSession();
      } 
      else if(error.response.status == 429){
      log.output("error", `Footsites -- ${this.site}`, `RateLimit-Wait`, this.taskId);
      }
      else {
      log.output("error", "Footsites", `Blocked By Vanish `, this.taskId);
      }
    }
  }

  async getItemDetails() {
    if (this.hardStop) {
      log.output("normal", `Footsites -- ${this.site}`, `Stopped`, this.taskId);
      return;
    }

    try {
      const url = `https://www.${this.site}.com/api/products/pdp/${
        this.pid
      }?timestamp=${Date.now()}`;
      log.output("working", `Footsites -- ${this.site}`, `Working Magic, Wait....`, this.taskId);
      let reqoptions = {
        method: "GET",
        uri: url,
        headers: {
          Accept: "application/json",
          'Save-Data': 'on',
          "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7,de;q=0.6",
          Connection: "keep-alive",
          Host: `${this.site}.com`,
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36",
        },
         jar: this.jar,
        transform: function (body, response) {
          return {
            data: JSON.parse(body),
            headers: response.headers,
            status: response.statusCode,
          };
        },
      };
      const res = await this.request(reqoptions);
    console.log(res.status)
      this.csrf = res.headers["x-csrf-token"]? res.headers["x-csrf-token"] : this.csrf;
      switch (res.status) {
        case 200: {
          const name = res.data.name;
          const image = res.data.images[0].variations[2].url;
          const foundBySize =
            this.size.split(",").length > 2
              ? res.data.sellableUnits.find((i) =>
                  i.attributes.find(
                    (a) =>
                      a.value ==
                      this.size.split(",")[
                        Math.floor(Math.random() * this.size.split(",").length)
                      ]
                  )
                )
              : this.size.toUpperCase() == "RANDOM"
              ? res.data.sellableUnits[
                  Math.floor(Math.random() * res.data.sellableUnits.length)
                ]
              : res.data.sellableUnits.find((i) =>
                  i.attributes.find((a) => a.value == this.size)
                );
          if (foundBySize) {
            if (foundBySize.stockLevelStatus == "inStock") {
              this.productInfo = {
                name,
                image,
                price: foundBySize.price.value,
                variant: foundBySize.code,
              };
            } else {
              log.output("error", `Footsites -- ${this.site}`, `Item out of Stock`, this.taskId);
              await this.delay(this.monitorDelay);
              await this.getItemDetails();
            }
          } else {
            log.output("error", `Footsites -- ${this.site}`, `Unavailable size`, this.taskId);
          }
          break;
        }
        case 302: 
        log.output("working", `Footsites -- ${this.site}`, `In Queue--queue-it`, this.taskId);

        break;
        case 503:
          log.output("working", `Footsites -- ${this.site}`, `In Queue--Wait`, this.taskId);
          await this.delay(this.monitorDelay);
          await this.getItemDetails();
          
    const personal = fs.readFileSync(folderNameOption);
    var data = JSON.parse(personal);
    fetch(queue, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: "",
          embeds: [
            {
              title: `Task Queue`,
              color: 3066993,
              timestamp: new Date(),
              footer: {
                text: `Omni AIO v1`,
                icon_url:
                  "https://pbs.twimg.com/profile_images/1347337377124147201/1Psx6u9C_400x400.jpg",
              },
              fields: [
                {
                  name: "User",
                  value: `${data.key}`,
                  inline: true
                },
                {
                    name: "Site",
                    value: this.site,
                    inline: true
                  },
                  {
                    name: "SKU",
                    value: this.pid,
                    inline: true
                  },
                  
              ],
            },
          ],
        }),
      }).catch((err) => {});
          break;
        default:
          throw new Error("Unknow Error");
      }
    } catch (error) {
      if (error.statusCode == 400) {
        log.output("error", `Footsites -- ${this.site}`, `Product unavailable`, this.taskId);
        await this.delay(this.restockDelay);
        await this.getItemDetails();
      } else {
        log.output("error", `Footsites -- ${this.site}`, `unable to Initiallized sessions`, this.taskId);
        log.output("error", `Footsites -- ${this.site}`, `Proxy Error`, this.taskId);
        throw new Error("Proxy Error");
      }
    }
  }

  async addTocart() {

    fetch(atc, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: "",
          embeds: [
            {
              title: `Task ATC`,
              color: 3066993,
              timestamp: new Date(),
              footer: {
                text: `Omni AIO v1`,
                icon_url:
                  "https://pbs.twimg.com/profile_images/1347337377124147201/1Psx6u9C_400x400.jpg",
              },
              fields: [
                {
                  name: "User",
                  value: `${data.key}`,
                  inline: true
                },
                {
                    name: "Site",
                    value: this.site,
                    inline: true
                  },
                  {
                    name: "SKU",
                    value: this.pid,
                    inline: true
                  },
                  
              ],
            },
          ],
        }),
      }).catch((err) => {});

    if (this.hardStop) {
      log.output("normal", `Footsites -- ${this.site}`, `Stopped`, this.taskId);
      return;
    }
    try {
      const options = {
        method: "POST",
        body: `{"productQuantity":1,"productId":"${this.productInfo.variant}"}`,
        uri: `https://www.${
          this.site
        }.com/api/users/carts/current/entries?timestamp=${Date.now()}`,
        headers: {
          accept: "application/json",
        'Save-Data': 'on',
          "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7,de;q=0.6",
          "content-type": "application/json",
          origin: `https://www.${this.site}.com`,
          referer:`https://www.${this.site}.com/product/~/${this.pid}`,
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36",
          "x-csrf-token": this.csrf,
          "x-fl-productid": this.productInfo.variant,
          "x-fl-request-id": v4(),
        },
        
     jar: this.jar,
        transform: function (body, response) {
          return {
            data: JSON.parse(body),
            headers: response.headers,
            status: response.statusCode,
          };
        },
      };
      const res = await this.request(options);
  
      switch (res.status) {
        case 531:
          log.output("error", `Footsites -- ${this.site}`, `Out Of Stock`, this.taskId);
        case 200:
          if (res.data.guid) {
            this.csrf = res.headers["x-csrf-token"];
            this.cartId = res.data.guid;
            return;
          } else {
        log.output("error", `Footsites -- ${this.site}`, `Unable to cart`, this.taskId);
            throw new Error("Unable to cart");
          }
        default:
        log.output("error", `Footsites -- ${this.site}`, `Unable to cart`, this.taskId);

          throw new Error("Unable to cart");
      }
    } catch (e) {
      if (e.statusCode == 403) {
if (this.mode.toUpperCase() == "RESTOCK"){

  log.output("working", `Footsites -- ${this.site}`, "Rotating Proxy", this.taskId);
  let proxyList = fs
  .readFileSync(`./settings/proxies/${this.parseproxylist}`, "utf8")
  .split("\r\n");
  let selectedProxy = proxyList[randomNumber(0, proxyList.length - 1)];
  this.proxyNew = selectedProxy.split(":").length > 2 ? selectedProxy.trim().split(":") : null;
  let obj = (() => {
    switch (this.proxyNew.length) {
      case 4:return {proxyType: "userpass",link: `http://${this.proxy[2]}:${this.proxy[3]}@${this.proxy[0]}:${this.proxy[1]}`,};
      case 2:return {proxyType: "ipauth",link: `http://${this.proxy[0]}:${this.proxy[1]}`,};
    }
  })();

let proxynew = obj.link;
console.log(proxynew);

  this.request = rp.defaults({
    jar: true,
    proxy: proxynew,//`${this.obj.link}`,
    followAllRedirects: true,
    agent: new https.Agent({
      host: `www.${this.site}.com`,
      port: "443",
      path: "/",
      rejectUnauthorized: false,
    }),
  });

  await this.delay(this.navigationDelay);

  console.log("Getting new session")
  await this.initializeSession();
  await this.delay(this.restockDelay);
  await this.addTocart();
}

else

{
        const url = queryString.parseUrl(e.response.data.url)
        const foundCookie = e.response.headers["set-cookie"]
          .find((i) => i.split("=")[0] == "datadome")
          .split(";")[0]
          .split("datadome=")[1];

        if (foundCookie) {
          this.oldDatadomeCookie = foundCookie;
          this.updateStatus("Waiting for Captcha...");
          let cookieValue2 = await logCookies(this.jar);
      //    var jsonCookie2 = JSON.parse(cookieValue2);
   //       let DDcookie2 = jsonCookie2[1].value;
       
          log.output("working", `Footsites -- ${this.site}`, "Solving Captcha [1/2]", this.taskId);

          const Captcha = require("2captcha");
          const config = require(folderNameOption);
         
          const twoCaptchaAPIKey = config.twoCap;
          
          async function twoCaptcha(proxy) {
            const solver = new Captcha.Solver(twoCaptchaAPIKey);
        //  console.log("Solving Captcha [1/2]")
              let solution = null;
          
              if (proxy == null) {
            
                let resp = await solver
                  .recaptcha("6LccSjEUAAAAANCPhaM2c-WiRxCZ5CzsjR_vd8uX", `https://geo.captcha-delivery.com`)
                  .then(async (res) => {
                    return res;
                  });
                  solution = resp.data
              } else {
                let resp = await solver
                  .recaptcha("6LccSjEUAAAAANCPhaM2c-WiRxCZ5CzsjR_vd8uX", "https://geo.captcha-delivery.com", {
                    proxy: proxy,
                    proxyType: "HTTP",
                  })
                  .then(async (res) => {
                    return res;
                  });
                  solution = resp.data
              }
              return solution;
          }

          let captchaToken = await twoCaptcha(
            this.proxy ? this.proxy : null
          );
          try {
  
          } catch (err) {
            console.log(err)
          }

          let cookieValue = await logCookies(this.jar);
          var jsonCookie = JSON.parse(cookieValue);
          let DDcookie = jsonCookie[1].value;
          console.log("1: " +jsonCookie[1].value)
          console.log("2: " + jsonCookie[0].value)

          let userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36";
          const link = `https://geo.captcha-delivery.com/captcha/check?cid=${DDcookie}&icid=${url.query.initialCid}&ccid=null&g-recaptcha-response=${captchaToken}&hash=${url.query.hash}&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F88.0.4324.150%20Safari%2F537.36&referer=https%3A%2F%2Fwww.${this.site}.com%2F&parent_url=https%3A%2F%2Fwww.${this.site}.com%2F&x-forwarded-for=&captchaChallenge=2550169&s=17434`;
          log.output("working", `Footsites -- ${this.site}`, "Solving Captcha [2/2]", this.taskId);


          const opts = {
            method: "GET",
            uri: link,
            headers: {    
      accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "max-age=0",
      dnt: "1",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "cross-site",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36",
       Host: 'geo.captcha-delivery.com',
            },
       jar: this.jar,

            transform: function (data, response, resolveWithFullResponse) {
              return {
                data: data,
                headers: response.headers,
                status: response.statusCode,
              };
            },
          };
      
        const response = await this.request(opts);
        this.ddRes = response.data;
        const data = JSON.parse(this.ddRes)
        let newDDcookie = data.cookie;
        const pairs = newDDcookie.split(";");
       const obj = {};
        pairs.forEach((pair) => {
           const split = pair.split("=");
          const key = split[0];
        const value = split[1];
           obj[key] = value;
        });
console.log(newDDcookie)
         await this.jar.setCookie(newDDcookie, `https://www.${this.site}.com`);
          if (this.hardStop) {
            log.output("normal", `Footsites -- ${this.site}`, `Stopped`, this.taskId);
            return;
          }
          await this.delay(this.navigationDelay);
          console.log("Getting new session")
          await this.initializeSession();
          await this.delay(this.restockDelay);
          await this.addTocart();
        }
      }
      } else {
        log.output("error", `Footsites -- ${this.site}`, `Retrying to cart...`, this.taskId);
     // console.log(e)
        if (
          this.size.toUpperCase() == "RANDOM" ||
          this.size.split(",").length > 1
        ) {
          await this.delay(3000);
          await this.getItemDetails();
        }
        await this.delay(this.restockDelay);
        await this.addTocart();
      }
    }
  }

  async submitEmail() {
    if (this.hardStop) {
      log.output("normal", `Footsites -- ${this.site}`, `Stopped`, this.taskId);
      return;
    }
    log.output("working", `Footsites -- ${this.site}`, `Getting Checkout`, this.taskId);
    try {
      const options = {
        method: "PUT",
        uri: `https://www.${this.site}.com/api/users/carts/current/email/${
          this.profile.billingAddress.email
        }?timestamp=${Date.now()}`,
        headers: {
          accept: "application/json",
          "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7,de;q=0.6",
          "content-type": "application/json",
          origin: `https://www.${this.site}.com`,
          referer: `https://www.${this.site}.com/checkout`,
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36",
          "x-csrf-token": this.csrf,
          "x-fl-request-id": v4(),
        },
        jar: this.jar,
        transform: function (body, response, resolveWithFullResponse) {
          return {
            data: body,
            status: response.statusCode,
          };
        },
      };
      const res = await this.request(options);
      if (res.status != 200) {
        console.log("unable to send email");
        log.output("error", `Footsites -- ${this.site}`, `Unable to submit email`, this.taskId);

        await this.delay(this.restockDelay);
        await this.submitEmail();
      } else {
      }
    } catch (e) {
      console.log(e)
      log.output("error", `Footsites -- ${this.site}`, `Error Submitting Email`, this.taskId);

      throw new Error("error submitting email");
    }
  }

  async submitShipping() {
    if (this.hardStop) {
      log.output("normal", `Footsites -- ${this.site}`, `Stopped`, this.taskId);
      return;
    }
    try {
      const options = {
        method: "POST",
        uri: `https://www.${
          this.site
        }.com/api/users/carts/current/addresses/shipping?timestamp=${Date.now()}`,
        headers: {
          accept: "application/json",
          "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7,de;q=0.6",
          Connection: "keep-alive",
          "content-type": "application/json",
          Host: `www.${this.site}.com`,
          Origin: `https://www.${this.site}.com`,
          Referer: `https://www.${this.site}.com/checkout`,
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36",
          "x-csrf-token": this.csrf,
          "x-fl-request-id": v4(),
        },
        jar: this.jar,
        body: `{"shippingAddress":{"setAsDefaultBilling":false,"setAsDefaultShipping":false,"firstName":"${this.profile.shippingAddress.name.split(" ")[0]}","lastName":"${this.profile.shippingAddress.name.split(" ")[1]}","email":false,"phone":"${this.profile.shippingAddress.phone}","billingAddress":false,"country":{"isocode":"US","name":"United States"},"defaultAddress":false,"id":null,"region":{"countryIso":"US","isocode":"US-${this.profile.shippingAddress.state}","isocodeShort":"${this.profile.shippingAddress.state}","name":"${retrieveStateInformation(this.profile.shippingAddress.state).name}"},"setAsBilling":true,"shippingAddress":true,"saveInAddressBook":false,"type":"default","LoqateSearch":"","postalCode":"${this.profile.shippingAddress.postCode}","town":"${this.profile.shippingAddress.city}","regionFPO":null,"line1":"${this.profile.shippingAddress.line1}","recordType":"S"}}`,
        transform: function (body, response, resolveWithFullResponse) {
          return {
            data: body,
            status: response.statusCode,
          };
        },
      };
      const res = await this.request(options);
      if (res.status != 201) {
        log.output("error", `Footsites -- ${this.site}`, `Unable to submit Shipping`, this.taskId);

        await this.delay(this.restockDelay);
        await this.submitShipping();
      } else {
      }
    } catch (e) {
      console.log(e)
      log.output("error", `Footsites -- ${this.site}`, `Error Sending Shipping`, this.taskId);

      throw new Error("error submitting shipping");

    }
  }

  async submitBilling() {
    if (this.hardStop) {
      log.output("normal", `Footsites -- ${this.site}`, `Stopped`, this.taskId);
      return;
    }
    try {
      const options = {
        method: "POST",
        uri: `https://www.${
          this.site
        }.com/api/users/carts/current/set-billing?timestamp=${Date.now()}`,
        headers: {
          Connection: "keep-alive",
          accept: "application/json",
          "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7,de;q=0.6",
          "accept-encoding": "gzip, deflate, br",
          "content-type": "application/json",
          origin: `https://www.${this.site}.com`,
          referer: `https://www.${this.site}.com/checkout`,
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36",
          "x-csrf-token": this.csrf,
          "x-fl-request-id": v4(),
        },
        jar: this.jar,
         body: `{"setAsDefaultBilling":false,"setAsDefaultShipping":false,"firstName":"${this.profile.shippingAddress.name.split(" ")[0]}","lastName":"${this.profile.shippingAddress.name.split(" ")[1]}","email":"false","phone":"${this.profile.billingAddress.phone}","billingAddress":false,"country":{"isocode":"US","name":"United States"},"defaultAddress":false,"id":null,"region":{"countryIso":"US","isocode":"US-${this.profile.billingAddress.state}","isocodeShort":"${this.profile.billingAddress.state}","name": "${retrieveStateInformation(this.profile.billingAddress.state).name}" },"setAsBilling":false,"shippingAddress":true,"visibleInAddressBook":false,"type":"default","LoqateSearch":"","postalCode":"${this.profile.billingAddress.postCode}","town":"${this.profile.billingAddress.city}","regionFPO":null,"line1":"${this.profile.billingAddress.line1}","recordType":"S"}`,
        transform: function (body, response, resolveWithFullResponse) {
          return {
            data: body,
            status: response.statusCode,
          };
        },
      };
      const res = await this.request(options);
      if (res.status === 400) {
        log.output("error", `Footsites -- ${this.site}`, `Unable to submit Billing`, this.taskId);
        await this.delay(5000);
        await this.submitBilling();
      }
      if (res.status !== 200) {
        log.output("error", `Footsites -- ${this.site}`, `Error Submitting Billing`, this.taskId);

        await this.delay(this.restockDelay);
        await this.submitBilling();
      }
    } catch (e) {
      log.output("error", `Footsites -- ${this.site}`, `Error Submitting Billing`, this.taskId);
      throw new Error("Error Submitting Billing");

    }
  }

  EncryptCard(key, card) {
    const cseInstance = adyenEncrypt.createEncryption(key, {});
    return {
      encryptedCardNumber: cseInstance.encrypt({
        number: card.number,
        generationtime: new Date().toISOString(),
      }),
      encryptedExpiryMonth: cseInstance.encrypt({
        expiryMonth: card.month,
        generationtime: new Date().toISOString(),
      }),
      encryptedExpiryYear: cseInstance.encrypt({
        expiryYear: card.year,
        generationtime: new Date().toISOString(),
      }),
      encryptedSecurityCode: cseInstance.encrypt({
        cvc: card.ccv,
        generationtime: new Date().toISOString(),
      }),
    };
  }


  async submitOrder() {
    const aydenKey ="10001|A237060180D24CDEF3E4E27D828BDB6A13E12C6959820770D7F2C1671DD0AEF4729670C20C6C5967C664D18955058B69549FBE8BF3609EF64832D7C033008A818700A9B0458641C5824F5FCBB9FF83D5A83EBDF079E73B81ACA9CA52FDBCAD7CD9D6A337A4511759FA21E34CD166B9BABD512DB7B2293C0FE48B97CAB3DE8F6F1A8E49C08D23A98E986B8A995A8F382220F06338622631435736FA064AEAC5BD223BAF42AF2B66F1FEA34EF3C297F09C10B364B994EA287A5602ACF153D0B4B09A604B987397684D19DBC5E6FE7E4FFE72390D28D6E21CA3391FA3CAADAD80A729FEF4823F6BE9711D4D51BF4DFCB6A3607686B34ACCE18329D415350FD0654D";
    const cardInfo = this.EncryptCard(aydenKey, {
      number: this.profile.paymentDetails.cardNumber,
      month: this.profile.paymentDetails.cardExpMonth,
      year: this.profile.paymentDetails.cardExpYear,
      ccv: this.profile.paymentDetails.cardCvv,
    });
    const payload = {
      preferredLanguage: "en",
      termsAndCondition: false,
      deviceId: "",
      cartId: this.cartId,
      encryptedCardNumber: cardInfo.encryptedCardNumber,
      encryptedExpiryMonth: cardInfo.encryptedExpiryMonth,
      encryptedExpiryYear: cardInfo.encryptedExpiryYear,
      encryptedSecurityCode: cardInfo.encryptedSecurityCode,
      paymentMethod: "CREDITCARD",
      returnUrl: `https://www.${this.site}.com/adyen/checkout`,
      browserInfo: {
        screenWidth: 1920,
        screenHeight: 1080,
        colorDepth: 24,
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36",
        timeZoneOffset: -120,
        language: "en-US",
        javaEnabled: false,
      },
    };
    const options = {
      method: "POST",
      uri: `https://www.${
        this.site
      }.com/api/users/orders?timestamp=${Date.now()}`,
      body: JSON.stringify(payload),
      headers: {
        accept: "application/json",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7,de;q=0.6",
        "content-type": "application/json",
        origin: `https://www.${this.site}.com`,
        referer: `https://www.${this.site}.com/checkout`,
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36",
        "x-csrf-token": this.csrf,
        "x-fl-request-id": v4(),
      },
      jar: this.jar,
      transform: function (body, response, resolveWithFullResponse) {
        return {
          data: body,
          status: response.statusCode,
          resis: response
    

        };
     
      },
    };

    try {

   const res = await this.request(options);
//   console.log(res.data)
 //  console.log(JSON.parse(res.data))
const dara = JSON.parse(res.data)
const trackCode = dara.code

      if (res.status == 302 || res.status == 200 || res.status == 201) {
        log.output("success", `Footsites -- ${this.site}`, `Checkout!`, this.taskId);
        webhook.success(this.site,this.size,this.profile.name,this.parseproxylist,this.pid,this.productInfo.image, trackCode, this.mode);
        webhook.publicSuccess(this.site,this.size,this.pid,this.productInfo.image, this.mode)
        } else {
        log.output("success", `Footsites -- ${this.site}`, `Checkout!`, this.taskId);
        webhook.success(this.site,this.size,this.profile.name,this.parseproxylist,this.pid, this.productInfo.image, trackCode, this.mode);
        webhook.publicSuccess(this.site,this.size,this.pid,this.productInfo.image, this.mode)  
      }
    } catch (error) {
      log.output("error", `Footsites -- ${this.site}`, `Error Checking Out`, this.taskId);
    console.log(error)
      if (error.statusCode == 400) {
        let dreason = JSON.parse(
          error.response.data
        ).errors[0].message.includes("not available")
          ? "out of stock"
          : "payment failed"
          ? "Invalid Payment details"
          : "John your broke"
  
      webhook.failed(this.site,this.size,this.pid, dreason,this.profile.name, this.productInfo.image);      
       return;
      }
      webhook.failed(this.site,this.size,this.pid, "No Reason", this.profile.name, this.productInfo.image);
  
  

    }
  }

  delay(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }


  
  async allCookies(jar) {
    const store = jar._jar.store;
    return (
      await Promise.all(
        Object.keys(store.idx).map((d) =>
          util.promisify(store.findCookies).call(store, d, null)
        )
      )
    ).flat();
  }
}

async function logCookies(jar) {
  jar._jar.store.getAllCookies(function (err, cookieArray) {
    allCookies = JSON.stringify(cookieArray, null, 4);
  });
  return allCookies;
}

let task = {
  monitorDelay: 1200,
  navigationDelay: 200,
  restockDelay: 3000,
};

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = { Footsites };