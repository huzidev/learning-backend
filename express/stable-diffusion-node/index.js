const axios = require('axios');
const path = require('path');
const fs = require('fs');
const get = require('prompt-sync')();

let obj = {
  prompt: "",
  // negative_prompt: "",
  steps: 20,
};

for (const val in obj) {
  obj[val] = get(`${val} : `)
}

const { prompt, steps, negative_prompt } = obj;

var data = JSON.stringify({
  prompt,
  steps,
  // negative_prompt,
  "sampler_index": "Euler",
  "batch_size": 1,
  "cfg_scale": 7,
  "width": 512,
  "height": 512,
  "seed": -1,
  // "enable_hr": true,
  // "hr_scale": 2,
  // "hr_upscaler": "SwinIR_4x",
});


// let model = "f222.safetensors [f300684443]";
let model = "protogenX34Photorealism_1.safetensors [44f90a0972]";
// let model = "mdjrny-v4.ckpt [5d5ad06cc2]";
// let model = "EmisAnime.ckpt [39ee30561f]";


var ckptData = JSON.stringify({
  // "sd_model_checkpoint": model
  // "sd_model_checkpoint": model
  // "sd_model_checkpoint": model
  "sd_model_checkpoint": model
});

let folder = model === "f222.safetensors [f300684443]" ? (
  "f222"
) : model === "protogenX34Photorealism_1.safetensors [44f90a0972]" ? (
  "protogen"
) : model === "EmisAnime.ckpt [39ee30561f]" ? (
  "anime"
) : "midjourney"

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
  data: ckptData
};

const fileName = Date.now();
async function main() {
  try {
    console.log("Generating...");
    await axios(ckptConfig);
    const resp = await axios(config);
    const { images, info } = resp.data;
    let obj = JSON.parse(info);
    const { prompt, negative_prompt, seed, height, width, sampler_name, cfg_scale, steps, restore_faces, model_name } = obj;
    let testArr = ["prompt", "height", "width"]
    for (let key in obj) {
      for (let i = 0; i < testArr.length; i++) {
        if (key === testArr[i]) {
          console.log(`${key}: ${obj[key]}`);
        }
      }
    }
    for (const image of images) {
      const buffer = Buffer.from(image, "base64");
      const imagePath = path.join(`images/${folder}`, `${fileName}.png`);
      const textFile = path.join(`images/${folder}`, `${fileName}.txt`);
      fs.writeFileSync(imagePath, buffer);
      fs.writeFileSync(textFile, info);
    }
    // var upScaleData = JSON.stringify({
    //   "image": images.toString(),
    //   "upscaling_resize": 4,
    //   "upscaling_crop": false,
    //   "upscaler_1": "SwinIR_4x"  
    // });
    // const upScalerConfig = {
    //   method: 'post',
    //   url: 'http://127.0.0.1:7860/sdapi/v1/extra-single-image',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },  
    //   data: upScaleData
    // };
    // async function upScaleImg() {
    //   try {
    //     console.log("Upscaling Img");
    //     const upScaleResp = await axios(upScalerConfig);
    //     const { image } = upScaleResp.data;
    //     const bufferUpScale = Buffer.from(image, "base64");
    //     const upScalePath = path.join("upScale", `${fileName}.png`);
    //     fs.writeFileSync(upScalePath, bufferUpScale);
    //   } catch (e) {
    //     console.log("Error", e);
    //   }
    // }
    // upScaleImg();
  } catch (e) {
    console.log('e', e);
  }
}

main();

// var imgToimgData = JSON.stringify({
    //   "init_images": respImage,
    //   "denoising_strength": 0.75,
    // });
// const imgToimgConfig = {
    //   method: 'post',
    //   url: 'http://127.0.0.1:7860/sdapi/v1/img2img',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   data: imgToimgData
    // }; 
// async function imgToImg() {
    //   try {
    //     console.log("Generating img2img");
    //     const imgResp = await axios(imgToimgConfig);
    //     const { images } = imgResp.data;
    //     for (const imgToImg of images) {
    //       const imgBuffer = Buffer.from(imgToImg, "base64");
    //       const imgToImgPath = path.join("img2img", `${fileName}.png`);
    //       fs.writeFileSync(imgToImgPath, imgBuffer);
    //     }
    //   } catch (e) {
    //     console.log("Error", e);
    //   }
    // }
    // imgToImg();
