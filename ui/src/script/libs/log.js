const chalk = require("chalk");
const tools = require("./tools.js");
const fs = require("fs");

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
  folderNameLogs = '/Users/'+ process.env.USERNAME +'/Programs/OmniAIO/settings/logs/logs.json' 
  folderNameOption = '/Users/'+ process.env.USERNAME +'/Programs/OmniAIO/settings/options.json' 
  folderNameProfiles = '/Users/'+ process.env.USERNAME +'/Programs/OmniAIO/settings/profiles'
} else {
  folderName = '/Users/'+ process.env.USER + '/Programs/OmniAIO'
  folderNameBase = '/Users/'+ process.env.USER +'/Programs/OmniAIO/settings'
  folderNameTasks = '/Users/'+ process.env.USER +'/Programs/OmniAIO/settings/tasks'
  folderNameProxies = '/Users/'+ process.env.USER +'/Programs/OmniAIO/settings/proxies'
  folderNameLogs = '/Users/'+ process.env.USER +'/Programs/OmniAIO/settings/logs/logs.json' 
  folderNameOption = '/Users/'+ process.env.USER +'/Programs/OmniAIO/settings/options.json' 
  folderNameProfiles = '/Users/'+ process.env.USER +'/Programs/OmniAIO/settings/profiles'
}

function output(type, site, message, taskId) {
  let logFile;
  if (taskId) {
    const read = fs.readFileSync(folderNameLogs);
    logFile = JSON.parse(read);
  }
  
  switch (type) {
    case "normal":
      // console.log(`[${tools.getTimeMS()}] [${site}] - ${message}`);
      break;
    case "success":
      // console.log(chalk.green(`[${tools.getTimeMS()}] [${site}] - ${message}`));
      break;
    case "error":
      // console.log(chalk.red(`[${tools.getTimeMS()}] [${site}] - ${message}`));
      break;
    case "working":
      // console.log(chalk.yellow(`[${tools.getTimeMS()}] [${site}] - ${message}`));
      break;
  }
  
  if (taskId) {
    let colorType = "gray";
    if (type == "normal") {
      colorType = "gray";
    } else if (type == "success") {
      colorType = "green";
    } else if (type == "error") {
      colorType = "red";
    } else if (type == "working") {
      colorType = "yellow";
    }

    logFile[taskId] = {
      time: tools.getTimeMS(),
      site: site,
      message: message,
      type: colorType
    };

    fs.writeFileSync(folderNameLogs, JSON.stringify(logFile));
  }
}

module.exports = { output };
