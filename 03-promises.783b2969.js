function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},i=t.parcelRequired7c6;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){o[e]=t},t.parcelRequired7c6=i);var r=i("7Y9D8");const l=document.querySelector(".form");function a(e,t){const n=Math.random()>.3;return new Promise(((o,i)=>{setTimeout((()=>{n?o({position:e,delay:t}):i({position:e,delay:t})}),t)}))}l.addEventListener("submit",(t=>{t.preventDefault();const{delay:n,step:o,amount:i}=t.target.elements;let s=Number(n.value);const u=Number(o.value),d=Number(i.value);if(s<0||u<0||d<=0)e(r).Notify.failure("Invalid input values. Please check and try again.");else{for(let t=1;t<=d;t++)a(t,s).then((({position:t,delay:n})=>e(r).Notify.success(`✅ Fulfilled promise ${t} in ${n}ms`))).catch((({position:t,delay:n})=>e(r).Notify.failure(`❌ Rejected promise ${t} in ${n}ms`))),s+=u;l.reset()}}));
//# sourceMappingURL=03-promises.783b2969.js.map
