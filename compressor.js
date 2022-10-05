const fs = require("fs");
const sharp = require("sharp");

const fileNames = fs.readdirSync("src/assets/images/portraits");

Promise.all(fileNames.map(name => {
    const actualName = name.split(".")[0];
    const extension = 'webp';

    return Promise.all([
        sharp(`src/assets/images/portraits/${name}`).resize(2000).toFile(`./test/${actualName}.${extension}`),
    ])
}))