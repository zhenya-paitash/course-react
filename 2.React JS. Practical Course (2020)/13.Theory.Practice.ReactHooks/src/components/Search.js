import React, {useContext} from 'react';
import {AlertContext} from "../context/alert/alertContext";


export const Search = () => {
  const {show} = useContext(AlertContext);
  const onSubmit = e => {
    if (e.key === 'Enter') show('Enter alert!')
  };

  return (
    <div className="form-group">
      <input
        className="form-control"
        placeholder="Enter username..."
        onKeyPress={onSubmit}
      />
    </div>
  );
};
