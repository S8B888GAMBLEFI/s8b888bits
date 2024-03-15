/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import React from "react"
import { Provider } from 'react-redux';
import { createAppStore } from "./src/redux/stores/AppStore";

import '@formatjs/intl-displaynames/polyfill';
import '@formatjs/intl-displaynames/locale-data/en';
import '@formatjs/intl-locale/polyfill';
import '@formatjs/intl-getcanonicallocales/polyfill';
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/en'; // Add English data
import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/locale-data/en'; // Add English data
import '@formatjs/intl-datetimeformat/polyfill';
import '@formatjs/intl-datetimeformat/locale-data/en';
import '@formatjs/intl-numberformat/polyfill';
import '@formatjs/intl-numberformat/locale-data/en';

export const wrapRootElement = ({ element }) => (
    <Provider store={createAppStore()}>
        {element}
    </Provider>
);

export const onRenderBody = ({ setHtmlAttributes }) => {
    setHtmlAttributes({ key: 1, lang: "en" });
};