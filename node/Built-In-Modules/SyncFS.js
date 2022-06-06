// this is built-in module therefore we don't have to specify the path
const fs = require('fs');

const first = fs.readFileSync('./Content/Sub-Content/first.txt', 'utf8');
const second = fs.readFileSync('./Content/Sub-Content/second.txt', 'utf8');
// UTF8 is by default active in Sync function 
// but we've to put UTF8 in Async else wise some number will print
fs.writeFileSync(
    './Content/result-sync.txt',
    `Here is the Result of File one And File Two : ${first}, ${second}`
);

// by this method we'll create a file called Result.txt at path /Content