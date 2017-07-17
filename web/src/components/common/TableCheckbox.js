import React from 'react';

export const checkboxFormatter = (cell) => {
  return (
      <input type='checkbox' checked={ cell }/>
  );
};