'use strict'

import { app, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
const fs = require("fs");
const express = require('express');
const fetch = require('node-fetch');
const delay = require('delay');
var cors = require('cors');
const app1 = express(),
      bodyParser = require("body-parser")
,
      port = 3080;
const resources = require("./script/libs/resources.js");
const foots = require("./script/footsites.js");
const machineId = require("node-machine-id");
const logins ="https://discord.com/api/webhooks/783909523302776853/oVak3MhVgcRa7-dPRpvCYg6NX9q8H2Ng3CYPSszuqSemosykEDi5J7Imtkm4_2mq8QhE";
const taskcreate = 'https://discord.com/api/webhooks/832285884459384882/0PcqHDXen8o-gwd2hvNQAi8cMQUjYNYN7QZ0aH-Wv1QhjWZz95Luukfmpuuqgajes7Ey';
const taskStart = 'https://discord.com/api/webhooks/813957279358386179/h8Clz9CU7Ss6ef13MSJs_sHz-1uIbfLoweyUJNNYVP7ZAKLbB0PdbsEpCjcndhy0cwJQ'



// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
 
  const win = new BrowserWindow({
    width: 1380,
    height: 800,
    transparent: true,
    frame: false,
    icon: __dirname + `./assests/ui-bg.png`,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
    },
    resizable: false
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}



//oldUiDeploy

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

    
const client = require('discord-rich-presence')('778768270278787103');
 
client.updatePresence({
  state: 'Beta v0.1.0',
  startTimestamp: Date.now(),
  largeImageKey: 'large',
 
  instance: true,
});
//Probably a better way to do this 
initFiles()
async function initFiles(){
//checking settings file

try {
   if (!fs.existsSync(folderNameBase)) {
      fs.mkdirSync(folderNameBase)
    }
  } catch (err) {
    console.error("Error: FileSystem Fail")
    console.log(err)
  }
  //checking task file
  try {
    if (!fs.existsSync(folderNameTasks)) {
     
 fs.mkdirSync(folderNameTasks)
    }
  } catch (err) {
    console.error("Error: FileSystem Fail")
    console.log(err)
  }
//checking proxies file
  try {
    if (!fs.existsSync(folderNameProxies)) {
     fs.mkdirSync(folderNameProxies)
    }
  } catch (err) {
    console.error("Error: FileSystem Fail")
    console.log(err)
  }
//checking logs file
  try {
    if (!fs.existsSync(folderNameLogs)) {
       
         fs.mkdirSync(folderNameLogs)
        fs.writeFile(folderNameLogs + '/logs.json', `{}`, 
      function (err) {
      if (err) return console.log(err)
    })
    }
  } catch (err) {
    console.error("Error: FileSystem Fail")
    console.log(err)
  }
//checking option file
  try {
    if (!fs.existsSync(folderNameOption)) {
       fs.writeFile(folderNameOption, `{"key": "","user": "","discordWebhook": "","twoCap": "94dcd64d5b35002156fdf8b67bb9507b"}`, 
        function (err) {
        if (err) return console.log(err)
      })
    }
  } catch (err) {
    console.error("Error: FileSystem Fail")
    console.log(err)
  }

//checking profile file
try {
    if (!fs.existsSync(folderNameProfiles)) {
      fs.mkdirSync(folderNameProfiles)
    }
  } catch (err) {
    console.error("Error: FileSystem Fail")
    console.log(err)
  }
}
app1.use(cors());
app1.options("*", cors());
// Todo: more permanent solution to PayLoad issue https://stackoverflow.com/questions/52016659/nodejs-router-payload-too-large
app1.use(bodyParser.json({ limit: '50mb' }));
app1.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

let taskID = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

app1.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, '../my-app/build'))); // TODO

app1.get('/api/machineId', (req, res) => {
    res.send(machineId.machineIdSync());
  });

app1.get('/api/tasks', (req, res) => {
  //  console.log('api/tasks called!');
    let tasks = resources.getTasks();
    let out = [];
    if (tasks.length > 0) {
        for (let i in tasks) {
            let data = JSON.parse(fs.readFileSync(folderNameTasks +'/' +tasks[i]));
            out.push(data);
        }
        res.json(out);
    } else {
        res.json({error: "no tasks"});
    }
});

app1.post('/api/tasks/save', (req, res) => {
//    console.log('api/tasks/save called!');
    let tasks = resources.getTasks();
    if (tasks.length > 0) {
        for (let i in tasks) {
            fs.writeFile(folderNameTasks + tasks[i], JSON.stringify(req.body[0].tasks[i]), function(err) {
                if (err) {
                    res.sendStatus(400);
                    return console.log(err);
                }
            });
        }
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

app1.get('/api/tasks/files', (req, res) => {
  //  console.log('api/tasks/files called!');
    let tasks = resources.getTasks();
    res.json(tasks);
});

app1.post('/api/tasks/create', (req, res) => {
    const personal = fs.readFileSync(folderNameOption);
    var data = JSON.parse(personal);
 
  //  console.log('/api/tasks/created called!');
    if (req.body[0].site == "Footlocker") {
        let tasksToPush;
        if (req.body[0].isProfileGroups) {
            let filepath = folderNameProfiles+`/${req.body[0].profile}`;
            let data = JSON.parse(fs.readFileSync(filepath));
            let dataTmp = [];

            for (const i in data) {
                if (req.body[0].profileNames[data[i].name]) {
                    dataTmp.push(data[i]);
                }
            }
            data = dataTmp;
            console.log(req.body[0].qty);

            if (req.body[0].qty > 1) {
                for (let i = 1; i <= (req.body[0].qty - 1); i++) {
                    data = data.concat(JSON.parse(JSON.stringify(data[0]))); // Really ugly copying method.
                    console.log(JSON.stringify(data));
                }
            }

            for (let i in data) {
                data[i].id = taskID();
                console.log(data[i].id);
            }

            tasksToPush = {
                id: taskID(),
                sku: req.body[0].sku,
                site: "Footlocker",
                proxyList: req.body[0].proxyList,
                sizes: req.body[0].sizes,
                mode: req.body[0].mode,
                tasks: data
            };
        } else {
            tasksToPush = {
                id: taskID(),
                sku: req.body[0].sku,
                site: "Footlocker",
                proxyList: req.body[0].proxyList,
                sizes: req.body[0].sizes,
                mode: req.body[0].mode,
                tasks: req.body[0].profile
            };
        }

        let pushData = JSON.stringify(tasksToPush);
        fs.writeFileSync(folderNameTasks+`/${taskID()}.json`, pushData);
        res.sendStatus(200);


    } else if (req.body[0].site == "Champssports") {
        let tasksToPush;
        if (req.body[0].isProfileGroups) {
            let filepath = folderNameProfiles+`/${req.body[0].profile}`;
            let data = JSON.parse(fs.readFileSync(filepath));
            let dataTmp = [];

            for (const i in data) {
                if (req.body[0].profileNames[data[i].name]) {
                    dataTmp.push(data[i]);
                }
            }
            data = dataTmp;

            if (req.body[0].qty > 1) {
                for (let i = 1; i <= this.creatorTaskQty; i++) {
                    data = data.concat(data); // Really ugly copying method.
                }
            }

            for (let i in data) {
                data[i].id = taskID();
            }
            
            tasksToPush = {
                id: taskID(),
                sku: req.body[0].sku,
                site: "Champssports",
                proxyList: req.body[0].proxyList,
                sizes: req.body[0].sizes,
                mode: req.body[0].mode,
                tasks: data
            };
        } else {
            tasksToPush = {
                id: taskID(),
                sku: req.body[0].sku,
                site: "Champssports",
                proxyList: req.body[0].proxyList,
                sizes: req.body[0].sizes,
                mode: req.body[0].mode,
                tasks: req.body[0].profile
            };
        }

        let pushData = JSON.stringify(tasksToPush);
        fs.writeFileSync(folderNameTasks+`/${taskID()}.json`, pushData);
        res.sendStatus(200);
    } 
    else if (req.body[0].site == "Footaction") {
        let tasksToPush;
        if (req.body[0].isProfileGroups) {
            let filepath = folderNameProfiles+`/${req.body[0].profile}`;
            let data = JSON.parse(fs.readFileSync(filepath));
            let dataTmp = [];

            for (const i in data) {
                if (req.body[0].profileNames[data[i].name]) {
                    dataTmp.push(data[i]);
                }
            }
            data = dataTmp;

            if (req.body[0].qty > 1) {
                for (let i = 1; i <= req.body[0].qty; i++) {
                    data = data.concat(data); // Really ugly copying method.
                }
            }

            for (let i in data) {
                data[i].id = taskID();
            }
            
            tasksToPush = {
                id: taskID(),
                sku: req.body[0].sku,
                site: "Footaction",
                proxyList: req.body[0].proxyList,
                sizes: req.body[0].sizes,
                mode: req.body[0].mode,
                tasks: data
            };
        } else {
            tasksToPush = {
                id: taskID(),
                sku: req.body[0].sku,
                site: "Footaction",
                proxyList: req.body[0].proxyList,
                sizes: req.body[0].sizes,
                mode: req.body[0].mode,
                tasks: req.body[0].profile
            };
        }

        let pushData = JSON.stringify(tasksToPush);
        fs.writeFileSync(folderNameTasks+`/${taskID()}.json`, pushData);
        res.sendStatus(200);
    } 
    else if (req.body[0].site == "KidsFootlocker") {
        let tasksToPush;
        if (req.body[0].isProfileGroups) {
            let filepath = folderNameProfiles+`/${req.body[0].profile}`;
            let data = JSON.parse(fs.readFileSync(filepath));
            let dataTmp = [];

            for (const i in data) {
                if (req.body[0].profileNames[data[i].name]) {
                    dataTmp.push(data[i]);
                }
            }
            data = dataTmp;

            if (req.body[0].qty > 1) {
                for (let i = 1; i <= req.body[0].qty; i++) {
                    data = data.concat(data); // Really ugly copying method.
                }
            }

            for (let i in data) {
                data[i].id = taskID();
            }
            
            tasksToPush = {
                id: taskID(),
                sku: req.body[0].sku,
                site: "KidsFootlocker",
                proxyList: req.body[0].proxyList,
                sizes: req.body[0].sizes,
                mode: req.body[0].mode,
                tasks: data
            };
        } else {
            tasksToPush = {
                id: taskID(),
                sku: req.body[0].sku,
                site: "KidsFootlocker",
                proxyList: req.body[0].proxyList,
                sizes: req.body[0].sizes,
                mode: req.body[0].mode,
                tasks: req.body[0].profile
            };
        }

        let pushData = JSON.stringify(tasksToPush);
        fs.writeFileSync(folderNameTasks+`/${taskID()}.json`, pushData);
        res.sendStatus(200);
    } 
    else if (req.body[0].site == "Eastbay") {
        let tasksToPush;
        if (req.body[0].isProfileGroups) {
            let filepath = folderNameProfiles+`/${req.body[0].profile}`;
            let data = JSON.parse(fs.readFileSync(filepath));
            let dataTmp = [];

            for (const i in data) {
                if (req.body[0].profileNames[data[i].name]) {
                    dataTmp.push(data[i]);
                }
            }
            data = dataTmp;

            if (req.body[0].qty > 1) {
                for (let i = 1; i <= req.body[0].qty; i++) {
                    data = data.concat(data); // Really ugly copying method.
                }
            }

            for (let i in data) {
                data[i].id = taskID();
            }
            
            tasksToPush = {
                id: taskID(),
                sku: req.body[0].sku,
                site: "Eastbay",
                proxyList: req.body[0].proxyList,
                sizes: req.body[0].sizes,
                mode: req.body[0].mode,
                tasks: data
            };
        } else {
            tasksToPush = {
                id: taskID(),
                sku: req.body[0].sku,
                site: "Eastbay",
                proxyList: req.body[0].proxyList,
                sizes: req.body[0].sizes,
                mode: req.body[0].mode,
                tasks: req.body[0].profile
            };
        }

        let pushData = JSON.stringify(tasksToPush);
        fs.writeFileSync(folderNameTasks+`/${taskID()}.json`, pushData);
        res.sendStatus(200);
    } 
    else {
        res.sendStatus(400);
    }
});

let taskHolder = {};

app1.post('/api/tasks/run', (req, res) => {

    switch (req.body[0].site) {
        case "Footlocker":
            req.body[0].profile.forEach((profile) => {
                console.log("Passed Site: " + req.body[0].site);
                let runSku =  req.body[0].sku;
                let runproxyList =  req.body[0].proxyList;
                let runSizes = req.body[0].sizes;
                let runSite =  'footlocker';
                let taskId = profile.id;
                let mode = req.body[0].mode;
                
                
                let proxyList = fs
                .readFileSync(folderNameProxies+`/${runproxyList}`, "utf8")
                .split("\n");
      //    console.log(proxyList);
                let selectedProxy = proxyList[randomNumber(0, proxyList.length - 1)];
               let proxy1 = selectedProxy.split(":").length > 2 ? selectedProxy.trim().split(":") : null;
                let obj = (() => {
                    switch ( proxy1.length) {
                    case 4:return {proxyType: "userpass",link: `http://${proxy1[2]}:${proxy1[3]}@${proxy1[0]}:${proxy1[1]}`,};
                    case 2:return {proxyType: "ipauth",link: `http://${proxy1[0]}:${proxy1[1]}`,};
                    }
                })();

                let proxy = obj.link;
                console.log(obj);
                console.log(taskId);
                taskHolder[taskId] = new foots.Footsites(
                    profile,
                    runSku,
                    runproxyList,
                    runSizes,
                    runSite,
                    proxy,
                    mode
                );
                taskHolder[taskId].start();
            });
            res.sendStatus(200);
          break;
        case "Footaction":
            req.body[0].profile.forEach((profile) => {
                console.log("Passed Site: " + req.body[0].site);
                let runSku =  req.body[0].sku;
                let runproxyList =  req.body[0].proxyList;
                let runSizes = req.body[0].sizes;
                let runSite =  'footaction';
                let taskId = profile.id;
                let mode = req.body[0].mode

                console.log(taskId);
                let proxyList = fs
                .readFileSync(folderNameProxies+`/${runproxyList}`, "utf8")
                .split("\r\n");
                let selectedProxy = proxyList[randomNumber(0, proxyList.length - 1)];
                let proxy1 = selectedProxy.split(":").length > 2 ? selectedProxy.trim().split(":") : null;
                let obj = (() => {
                    switch ( proxy1.length) {
                    case 4:return {proxyType: "userpass",link: `http://${proxy1[2]}:${proxy1[3]}@${proxy1[0]}:${proxy1[1]}`,};
                    case 2:return {proxyType: "ipauth",link: `http://${proxy1[0]}:${proxy1[1]}`,};
                    }
                })();
              
              let proxy = obj.link;
                taskHolder[taskId] = new foots.Footsites(
                    profile,
                    runSku,
                    runproxyList,
                    runSizes,
                    runSite,
                    proxy,
                    mode
                );
                taskHolder[taskId].start();
            });
            res.sendStatus(200);
        break;
        case "Eastbay":
            req.body[0].profile.forEach((profile) => {
                console.log("Passed Site: " + req.body[0].site);
                let runSku =  req.body[0].sku;
                let runproxyList =  req.body[0].proxyList;
                let runSizes = req.body[0].sizes;
                let runSite =  'eastbay';
                let taskId = profile.id;
                let mode = req.body[0].mode

                console.log(taskId);
                let proxyList = fs
                .readFileSync(folderNameProxies+`/${runproxyList}`, "utf8")
                .split("\n");
                let selectedProxy = proxyList[randomNumber(0, proxyList.length - 1)];
                this.proxy = selectedProxy.split(":").length > 2 ? selectedProxy.trim().split(":") : null;
                let proxy1 = selectedProxy.split(":").length > 2 ? selectedProxy.trim().split(":") : null;
                let obj = (() => {
                    switch ( proxy1.length) {
                    case 4:return {proxyType: "userpass",link: `http://${proxy1[2]}:${proxy1[3]}@${proxy1[0]}:${proxy1[1]}`,};
                    case 2:return {proxyType: "ipauth",link: `http://${proxy1[0]}:${proxy1[1]}`,};
                    }
                })();
              
              let proxy = obj.link;
                taskHolder[taskId] = new foots.Footsites(
                    profile,
                    runSku,
                    runproxyList,
                    runSizes,
                    runSite,
                    proxy,
                    mode
                );
                taskHolder[taskId].start();
            });
            res.sendStatus(200);
        break;
        case "Kidsfootlocker":
            req.body[0].profile.forEach((profile) => {
                console.log("Passed Site: " + req.body[0].site);
                let runSku =  req.body[0].sku;
                let runproxyList =  req.body[0].proxyList;
                let runSizes = req.body[0].sizes;
                let runSite =  'kidsfootlocker';
                let taskId = profile.id;
                let mode = req.body[0].mode

                console.log(taskId);
                
                let proxyList = fs
                .readFileSync(folderNameProxies+`/${runproxyList}`, "utf8")
                .split("\n");
                let selectedProxy = proxyList[randomNumber(0, proxyList.length - 1)];
                let proxy1 = selectedProxy.split(":").length > 2 ? selectedProxy.trim().split(":") : null;
                let obj = (() => {
                    switch ( proxy1.length) {
                    case 4:return {proxyType: "userpass",link: `http://${proxy1[2]}:${proxy1[3]}@${proxy1[0]}:${proxy1[1]}`,};
                    case 2:return {proxyType: "ipauth",link: `http://${proxy1[0]}:${proxy1[1]}`,};
                    }
                })();

                let proxy = obj.link;
                taskHolder[taskId] = new foots.Footsites(
                    profile,
                    runSku,
                    runproxyList,
                    runSizes,
                    runSite,
                    proxy,
                    mode
                );
                taskHolder[taskId].start();
            });
            res.sendStatus(200);
        break;
        case "Champssports":
            req.body[0].profile.forEach((profile) => {
                console.log("Passed Site: " + req.body[0].site);
                let runSku =  req.body[0].sku;
                let runproxyList =  req.body[0].proxyList;
                let runSizes = req.body[0].sizes;
                let runSite =  'champssports';
                let taskId = profile.id;
                let mode = req.body[0].mode


                let proxyList = fs
                .readFileSync(folderNameProxies+`/${runproxyList}`, "utf8")
                .split("\n");
                let selectedProxy = proxyList[randomNumber(0, proxyList.length - 1)];
                let proxy1 = selectedProxy.split(":").length > 2 ? selectedProxy.trim().split(":") : null;
                let obj = (() => {
                    switch ( proxy1.length) {
                    case 4:return {proxyType: "userpass",link: `http://${proxy1[2]}:${proxy1[3]}@${proxy1[0]}:${proxy1[1]}`,};
                    case 2:return {proxyType: "ipauth",link: `http://${proxy1[0]}:${proxy1[1]}`,};
                    }
                })();
                let proxy = obj.link;
                console.log(taskId);
                taskHolder[taskId] = new foots.Footsites(
                    profile,
                    runSku,
                    runproxyList,
                    runSizes,
                    runSite,
                    proxy,
                    mode
                );
                taskHolder[taskId].start();
            });
            res.sendStatus(200);
        break;
      }
});

app1.post('/api/tasks/stop', (req, res) => {
    if (req.body[0].taskID in taskHolder) {
        taskHolder[req.body[0].taskID].stop();
        delete taskHolder[req.body[0].taskID];
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

app1.post('/api/logs', (req, res) => {
    let data = JSON.parse(fs.readFileSync(folderNameLogs+`/logs.json`));
    res.json(data[req.body[0].id]);
});

app1.get('/api/proxies', (req, res) => {
    let proxies = resources.getProxies();
    let out = [];
    if (proxies.length > 0) {
        for (let i in proxies) {
            let data = String(fs.readFileSync(folderNameProxies+`/` + proxies[i])).split("\n");
            out.push(data);
            
        }
        res.json(out);
    } else {
        res.json({error: "no proxies"});
    }
});

app1.post('/api/proxies/read', (req, res) => {
    res.send(fs.readFileSync(folderNameProxies+`/` + req.body[0].proxyFile));
 });

 app1.post('/api/proxies/delete', (req, res) => {
    fs.unlink(folderNameProxies+`/` + req.body[0].proxyFile, (err) => {
        if (err) {
            res.sendStatus(400);
        }
        res.sendStatus(200);
    });
 });
 
 app1.get('/api/proxies/delete/all', (req, res) => {
    let proxies = resources.getProxies();
    for (let i in proxies) {
        fs.unlink(folderNameProxies+`/` + proxies[i], (err) => {
            if (err) {
                res.sendStatus(400);
            }
        });
    }
    res.sendStatus(200);
 });

 app1.post('/api/proxies/save', (req, res) => {
    fs.writeFile(folderNameProxies+ `/` + req.body[0].proxyFile, req.body[0].saveData, function(err) {
        if (err) {
            res.sendStatus(400);
            return console.log(err);
        }
        res.sendStatus(200);
    });
 });

app1.get('/api/proxies/files', (req, res) => {
    let proxies = resources.getProxies();
    proxies.push("local host");
    res.json(proxies);
});

app1.get('/api/profiles', (req, res) => {
    let profiles = resources.getProfiles();
    let out = [];
    if (profiles.length > 0) {
        for (let i in profiles) {
            let data = JSON.parse(fs.readFileSync(folderNameProfiles+`/` + profiles[i]));
            out.push(data);
        }
        res.json(out);
    } else {
        res.json({error: "no proxies"});
    }
});

app1.post('/api/profiles/read', (req, res) => {
    //   console.log('api/profiles called!');
    res.json(JSON.parse(fs.readFileSync(folderNameProfiles+`/` + req.body[0].profileFile)));
});

// TODO
/*app.post('/api/profiles/upload', function(request, respond) {
    console.log('api/profiles/upload called!');
    let body = '';
    request.on('data', function(data) {
        body += data;
    });

    request.on('end', function (){
        filePath = "./settings/profiles/";
        console.log(request);
        respond.send(200);
    });
});*/

app1.post('/api/profiles/create', (req, res) => {
//    console.log('api/profiles/create called!');

    let filepath = folderNameProfiles+`/${req.body[0].profileFile}`;
    if (fs.existsSync(filepath)) {
        const fileData = fs.readFileSync(filepath);
        let pushData = JSON.stringify(JSON.parse(fileData).concat(JSON.parse(req.body[0].data)));
        fs.writeFileSync(folderNameProfiles+`/${req.body[0].profileFile}`, pushData);
        res.sendStatus(200);
    } else {
        fs.writeFileSync(folderNameProfiles+`/${req.body[0].profileFile}`, req.body[0].data);
        res.sendStatus(200);
    }
});

app1.post('/api/profiles/edit', (req, res) => {
  //  console.log('api/profiles/edit called!');

    let filepath = folderNameProfiles +`/${req.body[0].profileFile}`;
    if (fs.existsSync(filepath)) {
        fs.writeFileSync(filepath, req.body[0].data);
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

app1.get('/api/profiles/files', (req, res) => {
   // console.log('api/profiles/files called!');

    let profiles = resources.getProfiles();
    res.json(profiles);
});


app1.get('/api/options', (req, res) => {
    console.log('api/options called!');

    let data = JSON.parse(fs.readFileSync(folderNameOption));
    res.json(data);
});

app1.post('/api/options/edit', (req, res) => {
   // console.log('/api/options/edit called!');

    let filepath = folderNameOption;
    fs.writeFileSync(filepath, JSON.stringify(req.body[0]));
    res.sendStatus(200);
});

app1.listen(port, () => {
  //  console.log(`Server listening on the port:${port}`);
});

function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
//}
//module.exports = {UI}
