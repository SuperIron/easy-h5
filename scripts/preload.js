const fs = require("fs");

const INPUT_PATH = "src/assets/images";
const OUTPUT_PATH = "src/mixins/preload";

// 读取文件信息 -- 同步
const readDirSync = (path, manifest = []) => {
    const dirs = fs.readdirSync(path);
    return dirs.reduce((pre, item) => {
        const src = `${path}/${item}`;
        if (fs.statSync(src).isDirectory()) {
            return readDirSync(src, manifest); // 递归
        }
        pre.push({
            filename: item,
            path: src.replace("src/", "")
        });
        return pre;
    }, manifest);
};

// 保存配置
const writeFile = (data, output) => {
    const manifest = JSON.stringify(data, "", "\t");
    fs.writeFile(output + "/manifest.json", manifest, err => {
        if (err) {
            console.error("preload save manifest [fail]", { err });
            return;
        }
        console.log("preload save manifest [success]");
    });
};

const manifest = readDirSync(INPUT_PATH);
writeFile(manifest, OUTPUT_PATH);
