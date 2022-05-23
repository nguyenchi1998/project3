import React, { useState } from 'react';

const WithFormWrapper = ({ children }) => {
  const [currentValues, setCurrentValues] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setCurrentValues({ ...currentValues, [name]: value });
  };

  return <>{children({ onChange, currentValues })}</>;
};

export default WithFormWrapper;
