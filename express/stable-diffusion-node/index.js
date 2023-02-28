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
    "seed": -1
});

var ckptData = JSON.stringify({
    // "sd_model_checkpoint": "EmisAnime.ckpt [39ee30561f]",
    // "sd_model_checkpoint": "mdjrny-v4.ckpt [5d5ad06cc2]"
    "sd_model_checkpoint": "protogenX34Photorealism_1.safetensors [44f90a0972]"
    // "sd_model_checkpoint": "f222.safetensors [f300684443]"
});

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

async function main() {
    try {
        console.log("Generating...");
        await axios(ckptConfig);
        const resp = await axios(config);
        const {images,info} = resp.data;
        console.log("info", info);
        for (const image of images) {
            const data = image;
            const buffer = Buffer.from(data, "base64");
            const date = Date.now();
            const imagePath = path.join("images", `${date}.png`);

            fs.writeFileSync(imagePath, buffer);
            
        }

    } catch (e) {
        console.log('e',e);
    }
}

main();