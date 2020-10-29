const { exec } = require("child_process");
const preload = require("./preload");

//webpack打包
exec("vue-cli-service build", { encoding: "utf8" }, (error, stdout) => {
    if (error === null) {
        console.log("webpack build [success]");
    } else {
        console.error("webpack build [error]", stdout);
    }

    process.exit();
});
