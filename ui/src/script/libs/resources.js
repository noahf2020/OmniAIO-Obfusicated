const fs = require("fs");
//system file paths

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



function getProxies() {
  let proxies = [];
  fs.readdirSync(folderNameProxies).forEach((file) => {
    if (file.substring(file.length, file.length - 4) === ".txt") {
      proxies.push(file);
    }
  });

  return proxies;
}


function getProfiles() {
  let profiles = [];
  fs.readdirSync(folderNameProfiles).forEach((file) => {
    if (file.substring(file.length, file.length - 5) === ".json") {
      profiles.push(file);
    }
  });

  return profiles;
}

function getTasks() {
  let tasks = [];
  fs.readdirSync(folderNameTasks).forEach((file) => {
    if (file.substring(file.length, file.length - 5) === ".json") {
      tasks.push(file);
    }
  });

  return tasks;
}

module.exports = { getProxies, getProfiles, getTasks };
