import React from 'react';

export const initialValue = {
  var1: '',
  var2: '',
  counter: 0,
};

export const Context = React.createContext(initialValue);
export const useContext = React.useContext;
