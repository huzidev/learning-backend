const axios = require('axios');
const path = require('path');
const fs = require('fs');
const get = require('prompt-sync')();
const util = require('util');
const img = require("./img2img");
const upScale = require("./upScale");
const ckpt = require("./models");

let obj = {
  prompt: "",
  steps: 20,
};

for (const val in obj) {
  obj[val] = get(`${val} : `)
}

const { prompt, steps } = obj;

var data = JSON.stringify({
  prompt,
  steps,
  "sampler_index": "Euler",
  "batch_size": 1,
  "cfg_scale": 7,
  "width": 512,
  "height": 512,
  "seed": -1,
});

const ckptModel = ckpt.arrModel;

let ckptSD = ckptModel[3];
let folder = ckptSD === ckptModel[0] ? "protogen" : ckptSD === ckptModel[1] ? "f222" : ckptSD === ckptModel[2] ? "midjourney" : "anime";

const config = {
  method: 'post',
  url: 'http://127.0.0.1:7860/sdapi/v1/txt2img',
  headers: {
    'Content-Type': 'application/json'
  },
  data: data
};

const ckptConfig = {
  method: 'post',
  url: 'http://127.0.0.1:7860/sdapi/v1/options',
  headers: {
    'Content-Type': 'application/json'
  },
  data: JSON.stringify({ "sd_model_checkpoint": ckptSD })
};

const fileName = Date.now();
async function main() {
  try {
    console.log("Generating...");
    await axios(ckptConfig);
    const resp = await axios(config);
    const { images, info } = resp.data;
    respImage = images;
    let obj = JSON.parse(info);
    console.log("obj", obj.infotexts);
    let arrofKey = ["prompt", "negative_prompt", "seed", "height", "width", "sampler_name", "cfg_scale", "steps", "restore_faces"];
    const { Model } = info;
    let newObj = {};
    for (let key in obj) {
      arrofKey.forEach(value => {
        if (key === value || key === Model) {
          newObj[key] = obj[key]
        }
      });
      newObj = {
        ...newObj,
        Model: ckptSD
      }
    }
    for (const image of images) {
      const buffer = Buffer.from(image, "base64");
      const imagePath = path.join(`images/${folder}`, `${fileName}.png`);
      const textFile = path.join(`images/${folder}`, `${fileName}.txt`);
      fs.writeFileSync(imagePath, buffer);
      fs.writeFileSync(textFile, util.inspect(newObj, false, 2, false));
    }

    // img.imgToimg(respImage, fileName);
    upScale.upScale(respImage, fileName);
  } catch (e) {
    console.log('e', e);
  }
}

main();