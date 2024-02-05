import React from 'react';
import { Provider } from 'react-redux';
import { createAppStore } from './src/redux/stores/AppStore';

export default ({ element }) => (
  <Provider store={createAppStore()}>
      {element}
  </Provider>
);