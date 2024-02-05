/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import wrapWithProvider from "./wrap-with-provider"
import ReactDOM from "react-dom/client";
export const wrapRootElement = wrapWithProvider
// trigger an immediate page refresh when an update is found
export const onServiceWorkerUpdateReady = () => {

  window.location.reload(true);

}


function serviceWorkerJob() {

}

export const onServiceWorkerActive = () => {

  serviceWorkerJob();

}

export const onClientEntry = () => {
  //if (process.env.ENABLE_LOCAL_SW) {
  registerServiceWorker();
  //}
};

export const registerServiceWorker = () => {
  if (typeof window !== 'undefined') {
    // Do magic
    serviceWorkerJob();
  }
}

/*
export const onRouteUpdate = () => {
  console.log("onRouteUpdate") // this works
}
*/

export const replaceHydrateFunction = () => {
  return (element, container) => {
    const root = ReactDOM.createRoot(container)
    root.render(element)
  }
}