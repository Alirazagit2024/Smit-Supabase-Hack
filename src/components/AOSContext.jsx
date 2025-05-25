import React, { createContext, useEffect, useContext } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AOSContext = createContext();

export const useAOS = () => useContext(AOSContext);

export const AOSProvider = ({ children }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <AOSContext.Provider value={{}}>
      {children}
    </AOSContext.Provider>
  );
};
