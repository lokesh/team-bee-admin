const path = require("path");
const host = require("../.host.json");
const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();

const dist = path.normalize(__dirname + "/../dist");

var config = {
    user: host.username,
    password: host.password,
    host: host.host,
    port: host.port,
    localRoot: dist,
    remoteRoot: host.directory,
    include: ["**/*"],

    // delete ALL existing files at destination before uploading, if true
    deleteRemote: true,

};

ftpDeploy
    .deploy(config)
    .then(res => console.log("finished:", res))
    .catch(err => console.log(err));
