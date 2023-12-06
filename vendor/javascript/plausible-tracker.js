/**
 * @internal
 * Sends an event to Plausible's API
 *
 * @param data - Event data to send
 * @param options - Event options
 */
function sendEvent(e,t,o){const n=/^localhost$|^127(?:\.[0-9]+){0,2}\.[0-9]+$|^(?:0*:)*?:?0*1$/.test(location.hostname)||"file:"===location.protocol;if(!t.trackLocalhost&&n)return console.warn("[Plausible] Ignoring event because website is running locally");try{if("true"===window.localStorage.plausible_ignore)return console.warn('[Plausible] Ignoring event because "plausible_ignore" is set to "true" in localStorage')}catch(e){null}const r={n:e,u:t.url,d:t.domain,r:t.referrer,w:t.deviceWidth,h:t.hashMode?1:0,p:o&&o.props?JSON.stringify(o.props):void 0};const a=new XMLHttpRequest;a.open("POST",`${t.apiHost}/api/event`,true);a.setRequestHeader("Content-Type","text/plain");a.send(JSON.stringify(r));a.onreadystatechange=()=>{4===a.readyState&&o&&o.callback&&o.callback()}}
/**
 * Initializes the tracker with your default values.
 *
 * ### Example (es module)
 * ```js
 * import Plausible from 'plausible-tracker'
 *
 * const { enableAutoPageviews, trackEvent } = Plausible({
 *   domain: 'my-app-domain.com',
 *   hashMode: true
 * })
 *
 * enableAutoPageviews()
 *
 * function onUserRegister() {
 *   trackEvent('register')
 * }
 * ```
 *
 * ### Example (commonjs)
 * ```js
 * var Plausible = require('plausible-tracker');
 *
 * var { enableAutoPageviews, trackEvent } = Plausible({
 *   domain: 'my-app-domain.com',
 *   hashMode: true
 * })
 *
 * enableAutoPageviews()
 *
 * function onUserRegister() {
 *   trackEvent('register')
 * }
 * ```
 *
 * @param defaults - Default event parameters that will be applied to all requests.
 */function Plausible(e){const getConfig=()=>({hashMode:false,trackLocalhost:false,url:location.href,domain:location.hostname,referrer:document.referrer||null,deviceWidth:window.innerWidth,apiHost:"https://plausible.io",...e});const trackEvent=(e,t,o)=>{sendEvent(e,{...getConfig(),...o},t)};const trackPageview=(e,t)=>{trackEvent("pageview",t,e)};const enableAutoPageviews=()=>{const page=()=>trackPageview();const t=history.pushState;if(t){history.pushState=function(e,o,n){t.apply(this,[e,o,n]);page()};addEventListener("popstate",page)}e&&e.hashMode&&addEventListener("hashchange",page);trackPageview();return function cleanup(){if(t){history.pushState=t;removeEventListener("popstate",page)}e&&e.hashMode&&removeEventListener("hashchange",page)}};const enableAutoOutboundTracking=(e=document,t={subtree:true,childList:true,attributes:true,attributeFilter:["href"]})=>{function trackClick(e){trackEvent("Outbound Link: Click",{props:{url:this.href}});"undefined"!==typeof process&&process&&"test"===process.env.NODE_ENV||setTimeout((()=>{location.href=this.href}),150);e.preventDefault()}const o=new Set;function addNode(e){if(e instanceof HTMLAnchorElement){if(e.host!==location.host){e.addEventListener("click",trackClick);o.add(e)}}else"querySelectorAll"in e&&e.querySelectorAll("a").forEach(addNode)}function removeNode(e){if(e instanceof HTMLAnchorElement){e.removeEventListener("click",trackClick);o.delete(e)}else"querySelectorAll"in e&&e.querySelectorAll("a").forEach(removeNode)}const n=new MutationObserver((e=>{e.forEach((e=>{if("attributes"===e.type){removeNode(e.target);addNode(e.target)}else if("childList"===e.type){e.addedNodes.forEach(addNode);e.removedNodes.forEach(removeNode)}}))}));e.querySelectorAll("a").forEach(addNode);n.observe(e,t);return function cleanup(){o.forEach((e=>{e.removeEventListener("click",trackClick)}));o.clear();n.disconnect()}};return{trackEvent:trackEvent,trackPageview:trackPageview,enableAutoPageviews:enableAutoPageviews,enableAutoOutboundTracking:enableAutoOutboundTracking}}export{Plausible as default};

