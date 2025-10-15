import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persister, store } from '../redux/store';

export const ReduxProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        {children}
      </PersistGate>
    </Provider>
  );
};
