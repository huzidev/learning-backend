const fs = require('fs');

// we also have to use callBack function for Async FS just like we do fir eventListener
// like onClick eventListener on every time the button click the function will call back it self
// and the call back function will takes error and result

fs.readFile('./Content/Sub-Content/first.txt', 'utf8', (error, result) => {
    if (error){
        console.log(error);
        return;
    }
    const first = result;

    fs.readFile('./Content/Sub-Content/second.txt', 'utf8', (error, result) => {
        if (error){
            console.log(error);
            return;
        }
        const second = result;

        fs.writeFile(
            './Content/result-async.txt',
            `Here is the Result of File one And File Two : ${first}, ${second}`,
            (error, result) => {
                if (error) {
                    console.log(error);
                    return;
                }
                else{
                    console.log(result);
                }
            }
        )
    })
})

