!function(t){function e(r){if(i[r])return i[r].exports;var o=i[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var i={};e.m=t,e.c=i,e.d=function(t,i,r){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/Asteroids/",e(e.s=1)}([function(t,e,i){"use strict";function r(){}function o(t){try{return t.then}catch(t){return b=t,v}}function n(t,e){try{return t(e)}catch(t){return b=t,v}}function s(t,e,i){try{t(e,i)}catch(t){return b=t,v}}function a(t){if("object"!==typeof this)throw new TypeError("Promises must be constructed via new");if("function"!==typeof t)throw new TypeError("Promise constructor's argument is not a function");this._75=0,this._83=0,this._18=null,this._38=null,t!==r&&y(t,this)}function h(t,e,i){return new t.constructor(function(o,n){var s=new a(r);s.then(o,n),u(t,new p(e,i,s))})}function u(t,e){for(;3===t._83;)t=t._18;if(a._47&&a._47(t),0===t._83)return 0===t._75?(t._75=1,void(t._38=e)):1===t._75?(t._75=2,void(t._38=[t._38,e])):void t._38.push(e);c(t,e)}function c(t,e){x(function(){var i=1===t._83?e.onFulfilled:e.onRejected;if(null===i)return void(1===t._83?f(e.promise,t._18):l(e.promise,t._18));var r=n(i,t._18);r===v?l(e.promise,b):f(e.promise,r)})}function f(t,e){if(e===t)return l(t,new TypeError("A promise cannot be resolved with itself."));if(e&&("object"===typeof e||"function"===typeof e)){var i=o(e);if(i===v)return l(t,b);if(i===t.then&&e instanceof a)return t._83=3,t._18=e,void d(t);if("function"===typeof i)return void y(i.bind(e),t)}t._83=1,t._18=e,d(t)}function l(t,e){t._83=2,t._18=e,a._71&&a._71(t,e),d(t)}function d(t){if(1===t._75&&(u(t,t._38),t._38=null),2===t._75){for(var e=0;e<t._38.length;e++)u(t,t._38[e]);t._38=null}}function p(t,e,i){this.onFulfilled="function"===typeof t?t:null,this.onRejected="function"===typeof e?e:null,this.promise=i}function y(t,e){var i=!1,r=s(t,function(t){i||(i=!0,f(e,t))},function(t){i||(i=!0,l(e,t))});i||r!==v||(i=!0,l(e,b))}var x=i(4),b=null,v={};t.exports=a,a._47=null,a._71=null,a._44=r,a.prototype.then=function(t,e){if(this.constructor!==a)return h(this,t,e);var i=new a(r);return u(this,new p(t,e,i)),i}},function(t,e,i){i(2),t.exports=i(9)},function(t,e,i){"use strict";"undefined"===typeof Promise&&(i(3).enable(),window.Promise=i(6)),i(7),Object.assign=i(8)},function(t,e,i){"use strict";function r(){u=!1,a._47=null,a._71=null}function o(t){function e(e){(t.allRejections||s(f[e].error,t.whitelist||h))&&(f[e].displayId=c++,t.onUnhandled?(f[e].logged=!0,t.onUnhandled(f[e].displayId,f[e].error)):(f[e].logged=!0,n(f[e].displayId,f[e].error)))}function i(e){f[e].logged&&(t.onHandled?t.onHandled(f[e].displayId,f[e].error):f[e].onUnhandled||(console.warn("Promise Rejection Handled (id: "+f[e].displayId+"):"),console.warn('  This means you can ignore any previous messages of the form "Possible Unhandled Promise Rejection" with id '+f[e].displayId+".")))}t=t||{},u&&r(),u=!0;var o=0,c=0,f={};a._47=function(t){2===t._83&&f[t._56]&&(f[t._56].logged?i(t._56):clearTimeout(f[t._56].timeout),delete f[t._56])},a._71=function(t,i){0===t._75&&(t._56=o++,f[t._56]={displayId:null,error:i,timeout:setTimeout(e.bind(null,t._56),s(i,h)?100:2e3),logged:!1})}}function n(t,e){console.warn("Possible Unhandled Promise Rejection (id: "+t+"):"),((e&&(e.stack||e))+"").split("\n").forEach(function(t){console.warn("  "+t)})}function s(t,e){return e.some(function(e){return t instanceof e})}var a=i(0),h=[ReferenceError,TypeError,RangeError],u=!1;e.disable=r,e.enable=o},function(t,e,i){"use strict";(function(e){function i(t){s.length||(n(),a=!0),s[s.length]=t}function r(){for(;h<s.length;){var t=h;if(h+=1,s[t].call(),h>u){for(var e=0,i=s.length-h;e<i;e++)s[e]=s[e+h];s.length-=h,h=0}}s.length=0,h=0,a=!1}function o(t){return function(){function e(){clearTimeout(i),clearInterval(r),t()}var i=setTimeout(e,0),r=setInterval(e,50)}}t.exports=i;var n,s=[],a=!1,h=0,u=1024,c="undefined"!==typeof e?e:self,f=c.MutationObserver||c.WebKitMutationObserver;n="function"===typeof f?function(t){var e=1,i=new f(t),r=document.createTextNode("");return i.observe(r,{characterData:!0}),function(){e=-e,r.data=e}}(r):o(r),i.requestFlush=n,i.makeRequestCallFromTimer=o}).call(e,i(5))},function(t,e){var i;i=function(){return this}();try{i=i||Function("return this")()||(0,eval)("this")}catch(t){"object"===typeof window&&(i=window)}t.exports=i},function(t,e,i){"use strict";function r(t){var e=new o(o._44);return e._83=1,e._18=t,e}var o=i(0);t.exports=o;var n=r(!0),s=r(!1),a=r(null),h=r(void 0),u=r(0),c=r("");o.resolve=function(t){if(t instanceof o)return t;if(null===t)return a;if(void 0===t)return h;if(!0===t)return n;if(!1===t)return s;if(0===t)return u;if(""===t)return c;if("object"===typeof t||"function"===typeof t)try{var e=t.then;if("function"===typeof e)return new o(e.bind(t))}catch(t){return new o(function(e,i){i(t)})}return r(t)},o.all=function(t){var e=Array.prototype.slice.call(t);return new o(function(t,i){function r(s,a){if(a&&("object"===typeof a||"function"===typeof a)){if(a instanceof o&&a.then===o.prototype.then){for(;3===a._83;)a=a._18;return 1===a._83?r(s,a._18):(2===a._83&&i(a._18),void a.then(function(t){r(s,t)},i))}var h=a.then;if("function"===typeof h){return void new o(h.bind(a)).then(function(t){r(s,t)},i)}}e[s]=a,0===--n&&t(e)}if(0===e.length)return t([]);for(var n=e.length,s=0;s<e.length;s++)r(s,e[s])})},o.reject=function(t){return new o(function(e,i){i(t)})},o.race=function(t){return new o(function(e,i){t.forEach(function(t){o.resolve(t).then(e,i)})})},o.prototype.catch=function(t){return this.then(null,t)}},function(t,e){!function(t){"use strict";function e(t){if("string"!==typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function i(t){return"string"!==typeof t&&(t=String(t)),t}function r(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return b.iterable&&(e[Symbol.iterator]=function(){return e}),e}function o(t){this.map={},t instanceof o?t.forEach(function(t,e){this.append(e,t)},this):Array.isArray(t)?t.forEach(function(t){this.append(t[0],t[1])},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function n(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function s(t){return new Promise(function(e,i){t.onload=function(){e(t.result)},t.onerror=function(){i(t.error)}})}function a(t){var e=new FileReader,i=s(e);return e.readAsArrayBuffer(t),i}function h(t){var e=new FileReader,i=s(e);return e.readAsText(t),i}function u(t){for(var e=new Uint8Array(t),i=new Array(e.length),r=0;r<e.length;r++)i[r]=String.fromCharCode(e[r]);return i.join("")}function c(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function f(){return this.bodyUsed=!1,this._initBody=function(t){if(this._bodyInit=t,t)if("string"===typeof t)this._bodyText=t;else if(b.blob&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t;else if(b.formData&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else if(b.searchParams&&URLSearchParams.prototype.isPrototypeOf(t))this._bodyText=t.toString();else if(b.arrayBuffer&&b.blob&&m(t))this._bodyArrayBuffer=c(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!b.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(t)&&!w(t))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=c(t)}else this._bodyText="";this.headers.get("content-type")||("string"===typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):b.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},b.blob&&(this.blob=function(){var t=n(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?n(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(a)}),this.text=function(){var t=n(this);if(t)return t;if(this._bodyBlob)return h(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(u(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},b.formData&&(this.formData=function(){return this.text().then(p)}),this.json=function(){return this.text().then(JSON.parse)},this}function l(t){var e=t.toUpperCase();return g.indexOf(e)>-1?e:t}function d(t,e){e=e||{};var i=e.body;if(t instanceof d){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new o(t.headers)),this.method=t.method,this.mode=t.mode,i||null==t._bodyInit||(i=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"omit",!e.headers&&this.headers||(this.headers=new o(e.headers)),this.method=l(e.method||this.method||"GET"),this.mode=e.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&i)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(i)}function p(t){var e=new FormData;return t.trim().split("&").forEach(function(t){if(t){var i=t.split("="),r=i.shift().replace(/\+/g," "),o=i.join("=").replace(/\+/g," ");e.append(decodeURIComponent(r),decodeURIComponent(o))}}),e}function y(t){var e=new o;return t.split(/\r?\n/).forEach(function(t){var i=t.split(":"),r=i.shift().trim();if(r){var o=i.join(":").trim();e.append(r,o)}}),e}function x(t,e){e||(e={}),this.type="default",this.status="status"in e?e.status:200,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new o(e.headers),this.url=e.url||"",this._initBody(t)}if(!t.fetch){var b={searchParams:"URLSearchParams"in t,iterable:"Symbol"in t&&"iterator"in Symbol,blob:"FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in t,arrayBuffer:"ArrayBuffer"in t};if(b.arrayBuffer)var v=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],m=function(t){return t&&DataView.prototype.isPrototypeOf(t)},w=ArrayBuffer.isView||function(t){return t&&v.indexOf(Object.prototype.toString.call(t))>-1};o.prototype.append=function(t,r){t=e(t),r=i(r);var o=this.map[t];this.map[t]=o?o+","+r:r},o.prototype.delete=function(t){delete this.map[e(t)]},o.prototype.get=function(t){return t=e(t),this.has(t)?this.map[t]:null},o.prototype.has=function(t){return this.map.hasOwnProperty(e(t))},o.prototype.set=function(t,r){this.map[e(t)]=i(r)},o.prototype.forEach=function(t,e){for(var i in this.map)this.map.hasOwnProperty(i)&&t.call(e,this.map[i],i,this)},o.prototype.keys=function(){var t=[];return this.forEach(function(e,i){t.push(i)}),r(t)},o.prototype.values=function(){var t=[];return this.forEach(function(e){t.push(e)}),r(t)},o.prototype.entries=function(){var t=[];return this.forEach(function(e,i){t.push([i,e])}),r(t)},b.iterable&&(o.prototype[Symbol.iterator]=o.prototype.entries);var g=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];d.prototype.clone=function(){return new d(this,{body:this._bodyInit})},f.call(d.prototype),f.call(x.prototype),x.prototype.clone=function(){return new x(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new o(this.headers),url:this.url})},x.error=function(){var t=new x(null,{status:0,statusText:""});return t.type="error",t};var V=[301,302,303,307,308];x.redirect=function(t,e){if(-1===V.indexOf(e))throw new RangeError("Invalid status code");return new x(null,{status:e,headers:{location:t}})},t.Headers=o,t.Request=d,t.Response=x,t.fetch=function(t,e){return new Promise(function(i,r){var o=new d(t,e),n=new XMLHttpRequest;n.onload=function(){var t={status:n.status,statusText:n.statusText,headers:y(n.getAllResponseHeaders()||"")};t.url="responseURL"in n?n.responseURL:t.headers.get("X-Request-URL");var e="response"in n?n.response:n.responseText;i(new x(e,t))},n.onerror=function(){r(new TypeError("Network request failed"))},n.ontimeout=function(){r(new TypeError("Network request failed"))},n.open(o.method,o.url,!0),"include"===o.credentials&&(n.withCredentials=!0),"responseType"in n&&b.blob&&(n.responseType="blob"),o.headers.forEach(function(t,e){n.setRequestHeader(e,t)}),n.send("undefined"===typeof o._bodyInit?null:o._bodyInit)})},t.fetch.polyfill=!0}}("undefined"!==typeof self?self:this)},function(t,e,i){"use strict";function r(t){if(null===t||void 0===t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}var o=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable;t.exports=function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},i=0;i<10;i++)e["_"+String.fromCharCode(i)]=i;if("0123456789"!==Object.getOwnPropertyNames(e).map(function(t){return e[t]}).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach(function(t){r[t]=t}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(t){return!1}}()?Object.assign:function(t,e){for(var i,a,h=r(t),u=1;u<arguments.length;u++){i=Object(arguments[u]);for(var c in i)n.call(i,c)&&(h[c]=i[c]);if(o){a=o(i);for(var f=0;f<a.length;f++)s.call(i,a[f])&&(h[a[f]]=i[a[f]])}}return h}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=i(10),o=i(13);i.n(o);new r.a},function(t,e,i){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=i(11),n=i(12),s=function(){function t(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,i,r){return i&&t(e.prototype,i),r&&t(e,r),e}}(),a=function(){function t(){r(this,t),this.paused=!0,this.level=1,this.lives=3,this.score=0,this.over=!1,this.input=[],this.ship=new o.a(400,400),this.asteroids=new n.a(this.level),this.backBufferCanvas=document.createElement("canvas"),this.backBufferCanvas.width=800,this.backBufferCanvas.height=800,this.backBufferContext=this.backBufferCanvas.getContext("2d"),this.screenBufferCanvas=document.createElement("canvas"),this.screenBufferCanvas.width=800,this.screenBufferCanvas.height=800,document.body.appendChild(this.screenBufferCanvas),this.screenBufferContext=this.screenBufferCanvas.getContext("2d");var e=document.createElement("div");e.id="message",e.textContent="",document.body.appendChild(e),this.checkCrash=this.checkCrash.bind(this),this.handleInput=this.handleInput.bind(this),this.update=this.update.bind(this),this.render=this.render.bind(this),this.loop=this.loop.bind(this),window.onkeydown=this.handleInput,window.onkeyup=this.handleInput,this.render(),this.interval=setInterval(this.loop,60)}return s(t,[{key:"handleInput",value:function(t){var e={},i={};i[t.keyCode]="keyup"==t.type,this.paused||((i[87]||i[38])&&(this.input=this.input.filter(function(t){return"forward"!==t})),(i[65]||i[37])&&(this.input=this.input.filter(function(t){return"left"!==t})),(i[68]||i[39])&&(this.input=this.input.filter(function(t){return"right"!==t})),(i[83]||i[40])&&(this.input=this.input.filter(function(t){return"brake"!==t})),i[32]&&(this.input=this.input.filter(function(t){return"fire"!==t}))),e[t.keyCode]="keydown"==t.type,this.paused?(e[27]&&(this.paused=!1),this.render()):((e[87]||e[38])&&-1===this.input.findIndex(function(t){return"forward"===t})&&this.input.push("forward"),(e[65]||e[37])&&-1===this.input.findIndex(function(t){return"left"===t})&&this.input.push("left"),(e[68]||e[39])&&-1===this.input.findIndex(function(t){return"right"===t})&&this.input.push("right"),(e[83]||e[40])&&-1===this.input.findIndex(function(t){return"brake"===t})&&this.input.push("brake"),e[32]&&-1===this.input.findIndex(function(t){return"fire"===t})&&this.input.push("fire"),e[27]&&(this.paused=!0))}},{key:"update",value:function(){var t=this;if(!this.over&&(this.asteroids.update(),this.ship.update(this.input),this.ship.bullets.forEach(function(e){t.asteroids.asteroidList.forEach(function(i){Math.pow(i.positionVector.x-e.x,2)+Math.pow(i.positionVector.y-e.y,2)<Math.pow(i.radius,2)&&(t.ship.bullets.splice(t.ship.bullets.findIndex(function(t){return t.x===e.x&&t.y===e.y}),1),t.asteroids.breakAsteroid(i),t.score+=5)})}),this.asteroids.asteroidList.length<=0&&(this.level++,this.score+=100,this.ship.positionVector.x=400,this.ship.positionVector.y=400,this.ship.velocityVector.x=0,this.ship.velocityVector.y=0,this.asteroids.makeAsteroids(this.level)),this.ship.imortal<=0)){var e={x:this.ship.positionVector.x+20*Math.cos(this.ship.angle),y:this.ship.positionVector.y+20*Math.sin(this.ship.angle)},i={x:this.ship.positionVector.x+18.0277*Math.cos(this.ship.angle+2.1588),y:this.ship.positionVector.y+18.0277*Math.sin(this.ship.angle+2.1588)},r={x:this.ship.positionVector.x+18.0277*Math.cos(this.ship.angle+4.1244),y:this.ship.positionVector.y+18.0277*Math.sin(this.ship.angle+4.1244)};this.asteroids.asteroidList.forEach(function(o){t.checkCrash(e,i,r,o.positionVector,o.radius)&&(t.lives<=0?t.over=!0:(t.lives--,t.ship.positionVector.x=400,t.ship.positionVector.y=400,t.ship.imortal=50))})}}},{key:"render",value:function(){this.backBufferContext.fillStyle="#000",this.backBufferContext.fillRect(0,0,800,800),this.asteroids.render(this.backBufferContext),this.ship.render(this.backBufferContext,this.input),this.screenBufferContext.drawImage(this.backBufferCanvas,0,0),this.over&&(this.screenBufferContext.fillStyle="rgba(255,255,255, .2)",this.screenBufferContext.fillRect(0,0,800,800),this.screenBufferContext.fillStyle="white",this.screenBufferContext.strokeStyle="black",this.screenBufferContext.fillText("Game Over",20,200),this.screenBufferContext.strokeText("Game Over",20,200),this.screenBufferContext.fillText("Points: "+this.score,20,250),this.screenBufferContext.strokeText("Points: "+this.score,20,250)),this.paused&&!this.over&&(this.screenBufferContext.fillStyle="rgba(255,255,255, .2)",this.screenBufferContext.fillRect(0,0,800,800),this.screenBufferContext.fillStyle="white",this.screenBufferContext.strokeStyle="black",this.screenBufferContext.font="40px sans-serif",this.screenBufferContext.fillText("Game Paused",20,200),this.screenBufferContext.strokeText("Game Paused",20,200),this.screenBufferContext.font="30px sans-serif",this.screenBufferContext.fillText("Press esc to resume",20,240),this.screenBufferContext.strokeText("Press esc to resume",20,240),this.screenBufferContext.font="40px sans-serif",this.screenBufferContext.fillText("Instructions",20,290),this.screenBufferContext.strokeText("Instructions",20,290),this.screenBufferContext.font="30px sans-serif",this.screenBufferContext.fillText("Destroy all the asteroids to clear a level",20,330),this.screenBufferContext.fillText("Forward: 'w' or up arrow",20,370),this.screenBufferContext.fillText("Rotate right: 'd' or right arrow",20,410),this.screenBufferContext.fillText("Rotate left: 'a' or left arrow",20,450),this.screenBufferContext.fillText("Stop: 's' or down arrow",20,490),this.screenBufferContext.fillText("Fire blaster: space bar",20,530),this.screenBufferContext.strokeText("Destroy all the asteroids to clear a level",20,330),this.screenBufferContext.strokeText("Forward: 'w' or up arrow",20,370),this.screenBufferContext.strokeText("Rotate right: 'd' or right arrow",20,410),this.screenBufferContext.strokeText("Rotate left: 'a' or left arrow",20,450),this.screenBufferContext.strokeText("Stop: 's' or down arrow",20,490),this.screenBufferContext.strokeText("Fire blaster: space bar",20,530),this.screenBufferContext.fillStyle="white",this.screenBufferContext.font="16px sans-serif",this.screenBufferContext.fillText("Points: "+this.score,10,795),this.screenBufferContext.fillText("lives: "+this.lives,740,795),this.screenBufferContext.fillStyle="white",this.screenBufferContext.font="30px sans-serif",this.screenBufferContext.fillText("level: "+this.level,10,30)),this.screenBufferContext.fillStyle="white",this.screenBufferContext.font="16px sans-serif",this.screenBufferContext.fillText("Points: "+this.score,10,795),this.screenBufferContext.fillText("lives: "+this.lives,740,795),this.screenBufferContext.fillStyle="white",this.screenBufferContext.font="30px sans-serif",this.screenBufferContext.fillText("level: "+this.level,10,30)}},{key:"checkCrash",value:function(t,e,i,r,o){var n={x:r.x-t.x,y:r.y-t.y};if(n.x*n.x+n.y*n.y<=o*o)return!0;var s={x:r.x-e.x,y:r.y-e.y};if(s.x*s.x+s.y*s.y<=o*o)return!0;var a={x:r.x-i.x,y:r.y-i.y};if(a.x*a.x+a.y*a.y<=o*o)return!0;var h={x:e.x-t.x,y:e.y-t.y},u={x:i.x-e.x,y:i.y-e.y},c={x:t.x-i.x,y:t.y-i.y};if(h.y*n.x-h.x*n.y>=0&&u.y*s.x-u.x*s.y>=0&&c.y*a.x-c.x*a.y>=0)return!0;var f=n.x*h.x+n.y*h.y;if(f>0){var l=h.x*h.x+h.y*h.y;if((f=f*f/l)<l&&n.x*n.x+n.y*n.y-f<=o*o)return!0}return(f=s.x*u.x+s.y*u.y)>0&&(l=u.x*u.x+u.y*u.y,(f=f*f/l)<l&&s.x*s.x+s.y*s.y-f<=o*o)||((f=a.x*c.x+a.y*c.y)>0&&(l=c.x*c.x+c.y*c.y,(f=f*f/l)<l&&a.x*a.x+a.y*a.y-f<=o*o)||void 0)}},{key:"loop",value:function(){this.paused||(this.update(),this.render())}}]),t}();e.a=a},function(t,e,i){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,i,r){return i&&t(e.prototype,i),r&&t(e,r),e}}(),n=Math.PI/180,s=function(){function t(e,i){r(this,t),this.positionVector={x:e,y:i},this.velocityVector={x:0,y:0},this.angle=0,this.maxSpeed=3,this.bullets=[],this.fireRate=10,this.fireDelay=0,this.imortal=0,this.update=this.update.bind(this),this.render=this.render.bind(this),this.fireSound=new Audio("laserFire.wav")}return o(t,[{key:"update",value:function(t){var e=this;t.includes("right")?this.angle+=10*n:t.includes("left")&&(this.angle-=10*n),t.includes("forward")?(this.velocityVector.x=Math.max(0-this.maxSpeed,Math.min(this.velocityVector.x+Math.cos(this.angle),this.maxSpeed)),this.velocityVector.y=Math.max(0-this.maxSpeed,Math.min(this.velocityVector.y+Math.sin(this.angle),this.maxSpeed))):t.includes("brake")&&(this.velocityVector.x=0,this.velocityVector.y=0),t.includes("fire")&&this.bullets.length<this.fireRate&&this.imortal<=0&&0===this.fireDelay&&(this.bullets.push({x:this.positionVector.x+20*Math.cos(this.angle),y:this.positionVector.y+20*Math.sin(this.angle),angle:this.angle}),this.fireDelay=10,this.fireSound.ended||(this.fireSound.pause(),this.fireSound.currentTime=0),this.fireSound.play()),this.fireDelay>0&&this.fireDelay--,this.imortal>0&&this.imortal--,this.positionVector.x+=this.velocityVector.x,this.positionVector.y+=this.velocityVector.y,this.positionVector.x-30>800&&(this.positionVector.x=1),this.positionVector.x+30<0&&(this.positionVector.x=799),this.positionVector.y-30>800&&(this.positionVector.y=1),this.positionVector.y+30<0&&(this.positionVector.y=799),this.bullets.forEach(function(t){t.x+=6*Math.cos(t.angle),t.y+=6*Math.sin(t.angle),(t.x>800||t.x<0||t.y>800||t.y<0)&&e.bullets.splice(e.bullets.find(function(e){return e.x===t.x&&e.y===t.y}),1)})}},{key:"render",value:function(t,e){t.save(),t.fillStyle="Lime",t.translate(this.positionVector.x,this.positionVector.y),t.rotate(this.angle),t.beginPath(),t.moveTo(20,0),t.lineTo(-5,-5),t.lineTo(0,-10),t.lineTo(-10,-15),t.lineTo(-10,15),t.lineTo(0,10),t.lineTo(-5,5),t.fill(),this.imortal>0&&(t.strokeStyle="Aqua",t.beginPath(),t.arc(0,0,25,0,2*Math.PI),t.stroke()),e.includes("forward")&&(t.strokeStyle="OrangeRed",t.beginPath(),t.moveTo(-15,5),t.lineTo(-25,0),t.lineTo(-15,-5),t.stroke()),e.includes("right")&&(t.strokeStyle="OrangeRed",t.beginPath(),t.moveTo(-15,-5),t.lineTo(-20,-10),t.lineTo(-15,-15),t.stroke()),e.includes("left")&&(t.strokeStyle="OrangeRed",t.beginPath(),t.moveTo(-15,5),t.lineTo(-20,10),t.lineTo(-15,15),t.stroke()),t.setTransform(1,0,0,1,0,0),t.restore(),this.bullets.forEach(function(e){t.save(),t.fillStyle="red",t.strokeStyle="red",t.beginPath(),t.arc(e.x,e.y,2,0,2*Math.PI),t.stroke(),t.fill(),t.restore()})}}]),t}();e.a=s},function(t,e,i){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,i,r){return i&&t(e.prototype,i),r&&t(e,r),e}}(),n=function(){function t(e){r(this,t),this.asteroidList=[],this.update=this.update.bind(this),this.render=this.render.bind(this),this.breakAsteroid=this.breakAsteroid.bind(this),this.basicCheckCollision=this.basicCheckCollision.bind(this),this.advancedCheckCollision=this.advancedCheckCollision.bind(this),this.bounce=this.bounce.bind(this),this.makeAsteroids.bind(this),this.makeAsteroids(e),this.bounceSound=new Audio("AsteroidBounce.wav")}return o(t,[{key:"breakAsteroid",value:function(t){if(this.asteroidList.splice(this.asteroidList.findIndex(function(e){return e.positionVector.x===t.positionVector.x&&e.positionVector.y===t.positionVector.y}),1),t.radius>25){var e=t.radius/1.5,i=t.positionVector.x+.75*t.radius,r=t.positionVector.y+.75*t.radius,o=2*t.velocityVector.x,n=t.velocityVector.y/2;this.asteroidList.push({positionVector:{x:i,y:r},velocityVector:{x:o,y:n},radius:e,mass:e,lastBounce:null}),i=t.positionVector.x-.75*t.radius,r=t.positionVector.y-.75*t.radius,o=t.velocityVector.x/2,n=2*t.velocityVector.y,this.asteroidList.push({positionVector:{x:i,y:r},velocityVector:{x:o,y:n},radius:e,mass:e,lastBounce:null})}}},{key:"bounce",value:function(t,e){var i=Math.sqrt(Math.pow(t.velocityVector.x,2)+Math.pow(t.velocityVector.y,2)),r=Math.sqrt(Math.pow(e.velocityVector.x,2)+Math.pow(e.velocityVector.y,2)),o=Math.acos(t.velocityVector.x/i),n=Math.acos(e.velocityVector.x/r),s=Math.atan(Math.abs(e.positionVector.y-t.positionVector.y)/Math.abs(e.positionVector.x-t.positionVector.x));t.velocityVector.x=(i*Math.cos(o-s)*(t.mass-e.mass)+2*e.mass*r*Math.cos(n-s))/(t.mass+e.mass)*Math.cos(s)+i*Math.sin(o-s)*Math.cos(s+Math.PI/2),t.velocityVector.y=(i*Math.cos(o-s)*(t.mass-e.mass)+2*e.mass*r*Math.cos(n-s))/(t.mass+e.mass)*Math.sin(s)+i*Math.sin(o-s)*Math.sin(s+Math.PI/2),e.velocityVector.x=(r*Math.cos(n-s)*(e.mass-t.mass)+2*t.mass*i*Math.cos(o-s))/(e.mass+t.mass)*Math.cos(s)+r*Math.sin(n-s)*Math.cos(s+Math.PI/2),e.velocityVector.y=(r*Math.cos(n-s)*(e.mass-t.mass)+2*t.mass*i*Math.cos(o-s))/(e.mass+t.mass)*Math.sin(s)+r*Math.sin(n-s)*Math.sin(s+Math.PI/2),t.lastBounce=e,e.lastBounce=t}},{key:"basicCheckCollision",value:function(t,e,i){var r=!1;return this.asteroidList.forEach(function(o){Math.pow(t-o.positionVector.x,2)+Math.pow(e-o.positionVector.y,2)<Math.pow(i+o.radius,2)&&(r=!0)}),r}},{key:"advancedCheckCollision",value:function(){for(var t=0;t<this.asteroidList.length;t++)for(var e=t+1;e<this.asteroidList.length;e++){var i=Math.pow(this.asteroidList[t].positionVector.x-this.asteroidList[e].positionVector.x,2)+Math.pow(this.asteroidList[t].positionVector.y-this.asteroidList[e].positionVector.y,2);i<Math.pow(this.asteroidList[t].radius+this.asteroidList[e].radius,2)&&this.asteroidList[t].lastBounce!==this.asteroidList[e]&&this.asteroidList[e].lastBounce!==this.asteroidList[t]&&(this.bounce(this.asteroidList[t],this.asteroidList[e]),this.bounceSound.ended||(this.bounceSound.pause(),this.bounceSound.currentTime=0),this.bounceSound.play())}}},{key:"makeAsteroids",value:function(t){for(var e=0;e<8+2*t;e++){for(var i=Math.floor(21*Math.random())+30,r=400,o=400,n=!0;n;){for(r=400;r<450&&r>350;)r=Math.floor(860*Math.random())-30;for(o=400;o<450&&o>350;)o=Math.floor(860*Math.random())-30;n=this.basicCheckCollision(r,o,i)}for(var s=Math.floor(6*Math.random())-3;0===s;)s=Math.floor(6*Math.random())-3;for(var a=Math.floor(6*Math.random())-3;0===a;)a=Math.floor(6*Math.random())-3;this.asteroidList.push({positionVector:{x:r,y:o},velocityVector:{x:s,y:a},radius:i,mass:i,bounceBuffer:0})}}},{key:"update",value:function(){this.asteroidList.forEach(function(t){t.positionVector.x+=t.velocityVector.x,t.positionVector.y+=t.velocityVector.y,t.positionVector.x>860&&(t.positionVector.x=-59),t.positionVector.x<-60&&(t.positionVector.x=859),t.positionVector.y>860&&(t.positionVector.y=-59),t.positionVector.y<-60&&(t.positionVector.y=859)}),this.advancedCheckCollision()}},{key:"render",value:function(t){this.asteroidList.forEach(function(e){t.save(),t.fillStyle="LightGrey",t.strokeStyle="LightGrey",t.beginPath(),t.arc(e.positionVector.x,e.positionVector.y,e.radius,0,Math.PI/6),t.lineTo(e.positionVector.x+e.radus/2,e.positionVector.y+e.radus*Math.sqrt(3)/2),t.arc(e.positionVector.x,e.positionVector.y,e.radius,Math.PI/3,Math.PI/2),t.lineTo(e.positionVector.x-e.radus/2,e.positionVector.y+e.radus*Math.sqrt(3)/2),t.arc(e.positionVector.x,e.positionVector.y,e.radius,2*Math.PI/3,5*Math.PI/6),t.lineTo(e.positionVector.x-e.radus,e.positionVector.y),t.arc(e.positionVector.x,e.positionVector.y,e.radius,Math.PI,7*Math.PI/6),t.lineTo(e.positionVector.x-e.radus/2,e.positionVector.y-e.radus*Math.sqrt(3)/2),t.arc(e.positionVector.x,e.positionVector.y,e.radius,4*Math.PI/3,3*Math.PI/2),t.lineTo(e.positionVector.x+e.radus/2,e.positionVector.y-e.radus*Math.sqrt(3)/2),t.arc(e.positionVector.x,e.positionVector.y,e.radius,5*Math.PI/3,11*Math.PI/6),t.stroke(),t.fill(),t.restore()})}}]),t}();e.a=n},function(t,e){}]);
//# sourceMappingURL=main.dbf9140e.js.map