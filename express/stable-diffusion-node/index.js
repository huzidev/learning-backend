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
    "CLIP_stop_at_last_layers": 2,
    "sampler_index" : "LMS",
    "batch_size": 1,
    "cfg_scale": 10,
    "width": 512,
    "height": 512,
    "restore_faces": false,
    "tiling": false,
    "seed": -1,
    // "enable_hr": true,
    // "hr_resize_x": 720,
    // "hr_resize_y": 720,
    // "hr_scale": 2,
    // "hr_upscaler": "SwinIR_4x",
});


let model = "f222.safetensors [f300684443]";
// let model = "protogenX34Photorealism_1.safetensors [44f90a0972]";
// let model = "mdjrny-v4.ckpt [5d5ad06cc2]";
// let model = "EmisAnime.ckpt [39ee30561f]";


var ckptData = JSON.stringify({
    // "sd_model_checkpoint": model
    // "sd_model_checkpoint": model
    // "sd_model_checkpoint": model
    "sd_model_checkpoint": model
  });
  
let folder = model === "f222.safetensors [f300684443]" 
  ? "f222" 
  : model === "protogenX34Photorealism_1.safetensors [44f90a0972]" 
  ? "protogen" 
  : model === "EmisAnime.ckpt [39ee30561f]" 
  ? "anime" : "midjourney" 

const config = {
  method: 'post',
  url: 'http://127.0.0.1:7860/sdapi/v1/txt2img',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};


const ckptConfig = {
  method: 'post',
  url: 'http://127.0.0.1:7860/sdapi/v1/options',
  headers: { 
    'Content-Type': 'application/json'
  },
  data: ckptData
};

let buffer;
async function main() {
    try {
        console.log("Generating...");
        await axios(ckptConfig);
        const resp = await axios(config);
        const {images,info} = resp.data;  
        console.log("info", info);
        for (const image of images) {
            const data = image;
            buffer = Buffer.from(data, "base64");
            const date = Date.now();
            if (model) {
              const imagePath = path.join(`images/${folder}`, `${date}.png`);
              fs.writeFileSync(imagePath, buffer);
            }
        }
    } catch (e) {
        console.log('e',e);
    }
}

main();