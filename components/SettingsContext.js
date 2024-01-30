import React, {createContext, useContext, useState, useCallback} from 'react';
import { AsyncStorage } from 'react-native'; 

const initialUnits = {
  temperature: 'Celsius', 
  windSpeed: 'mph', 
  pressure: 'hg', 
};


const SettingsContext = createContext();


const SettingsProvider = ({children}) => {
  const [units, setUnits] = useState(initialUnits);


  const applyUnitChanges = useCallback(newUnits => {
    setUnits(prevUnits => ({...prevUnits, ...newUnits}));
  }, []);

  return (
    <SettingsContext.Provider value={{units, applyUnitChanges}}>
      {children}
    </SettingsContext.Provider>
  );
};


const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export {SettingsProvider,useSettings};

