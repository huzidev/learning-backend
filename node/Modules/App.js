// EVERYFile is by default MODULES so ours app.js is also a MODULE or 
// we can say module is just like STYLE COMPONENTS
// GLOBAL example consol.log() is a global object GLOBAL OBJECTS are 
// those which are available in all modules
// they can be used directly means we don't have to import them specifically
// setTimeout clearTimeout, setInterval, clearInterval are also the global objects available in nodeJS
// all these global functions, object can be called with window for instance window.console.log() OR
// we can use global.console.log() global.setTimeout()

const sayHi = require('./greet');
const names = require('./names');
const data = require('./Data');

sayHi(names.ali);
sayHi(names.huzi);

console.log(data);

// here we can just write require and path \
// if we've already called the specific function on its own MODULE
require('./Function');