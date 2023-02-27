const axios = require('axios');
const path = require('path');
const fs = require('fs');
const get = require('prompt-sync')();


let obj = {
    prompt: "", 
    negative_prompt: "",
    steps: 20,
    sampler_index: "LMS"
};

for (const val in obj) {
    obj[val] = get(`${val} : `)
}

const { prompt, steps, negative_prompt } = obj;

var data = JSON.stringify({
    prompt,
    steps,
    negative_prompt,
    sampler_index,
    "batch_size": 1,
    "cfg_scale": 10,
    "width": 512,
    "height": 512,
    "restore_faces": false,
    "tiling": false,
    "seed": -1
});

const config = {
  method: 'post',
  url: 'http://127.0.0.1:7860/sdapi/v1/txt2img',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

async function main() {
    try {
        console.log("Generating...");
        const resp = await axios(config);
        const {images,info} = resp.data;

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