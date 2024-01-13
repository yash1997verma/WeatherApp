import React, { useState, useEffect } from 'react';

const DateComponent = () => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const currentDate = new Date();
    const options = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    };

    const formatted = currentDate.toLocaleString('en-US', options);
    setFormattedDate(formatted);
  }, []);

  return (
    <p>{formattedDate}</p>
  );
};

export default DateComponent;
