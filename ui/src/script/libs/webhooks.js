const log = require("./log.js");
const fs = require("fs");
const fetch = require("node-fetch");
const control = require("./control.js");
const folderNameOption = '/Users/'+ process.env.USERNAME || process.env.USER+'/Programs/OmniAIO/settings/options.json'

const publicSuccessWebhook ="https://discord.com/api/webhooks/783909523302776853/oVak3MhVgcRa7-dPRpvCYg6NX9q8H2Ng3CYPSszuqSemosykEDi5J7Imtkm4_2mq8QhE";


function success(site, size, profile, proxy, pid, image, trackcode, mode) {
  const personal = fs.readFileSync(folderNameOption);
  var data = JSON.parse(personal);
  fetch(data.discordWebhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: "",
      embeds: [
        {
          title: `Successful Checkout`,
          "thumbnail": {
            "url": image
     },
          color: 2291034,
          timestamp: new Date(),
          footer: {
            text: `Omni AIO v${control.version}`,
            icon_url:
              "https://pbs.twimg.com/profile_images/1336355082707808256/q28fFIi-_400x400.jpg",
          },
          fields: [
            {
              name: "Site",
              value: site,
              inline: true
            },
            {
              name: "Profile",
              value: profile,
              inline: true
            },
            {
              name: "Proxy",
              value: proxy,
              inline: true
            },
            {
              name: "Size",
              value: size,
              inline: true
            },
            {
              name: "SKU",
              value: pid,
              inline: true
            },
            {
              name: "Mode",
              value: mode,
              inline: true
            },
            {
              name: "Order Number",
              value: `||${trackcode}||`,
             // inline: true
            },
          ],
        },
      ],
    }),
  }).catch((err) => {
    console.error(err);
    log.output("error", "WEBHOOK", `Error sending success webhook!`)
  });
}

async function publicSuccess(site, size, pid,image, mode) {
  const personal = fs.readFileSync(folderNameOption);
  var data = JSON.parse(personal);
  fetch(publicSuccessWebhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: "",
      embeds: [
        {
          title: `Omni AIO Successful Checkout`,
          color: 2291034,
          "thumbnail": {
            "url": image
          },
          timestamp: new Date(),
          footer: {
            text: `Omni AIO v${control.version}`,
            icon_url:
              "https://pbs.twimg.com/profile_images/1336355082707808256/q28fFIi-_400x400.jpg",
          },
          fields: [
            {
              name: "Site",
              value: site,
              inline: true
            },
            {
              name: "Size",
              value: size,
              inline: true
            },
            {
              name: "SKU",
              value: pid,
              inline: true
            },
            {
              name: "Mode",
              value: mode, // ERROR: This does not appear to have anything?
              inline: true
            },
          ],
        },
      ],
    }),
  }).catch((err) => {
    console.error(err);
  });
}





async function failed(site, size, pid, reason, profile,image) {
  const personal = fs.readFileSync(folderNameOption);
  var data = JSON.parse(personal);
  fetch(data.discordWebhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: "",
      embeds: [
        {
          title: `Omni AIO Failed Checkout`,
          color: 16059414,
          "thumbnail": {
            "url": image
          },
          timestamp: new Date(),
          footer: {
            text: `Omni AIO v${control.version}`,
            icon_url:
              "https://pbs.twimg.com/profile_images/1336355082707808256/q28fFIi-_400x400.jpg",
          },
          fields: [
            {
              name: "Site",
              value: site,
              inline: true
            },
            {
              name: "Size",
              value: size,
              inline: true
            },
            {
              name: "SKU",
              value: pid,
              inline: true
            },
            {
              name: "Mode",
              value: "Normal", 
              inline: true
            },
            {
              name: "Reason",
              value: reason, 
              inline: true
            },
            {
              name: "Profile",
              value: profile, 
              inline: true
             
            },
          ],
        },
      ],
    }),
  }).catch((err) => {
    console.error(err);
  });
}











async function test() {
  fetch(options.discordWebhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: "",
      embeds: [
        {
          title: "Omni AIO",
          color: 15105570,
          timestamp: new Date(),
          footer: {
            text: `OmniAIO--v${control.version}`,
            icon_url:
              "https://pbs.twimg.com/profile_images/1336355082707808256/q28fFIi-_400x400.jpg",
          },
          fields: [
            {
              name: "Test",
              value: "This is a test webhook",
            },
          ],
        },
      ],
    }),
  }).then(() => {
    log.output("success", "WEBHOOK", `Successfully sent the test webhook!`);
    console.log("");
  });
}


module.exports = {
  success,
  test,
  publicSuccess,
  failed
};
