import React, { createContext, useContext, useState } from "react";

const ActiveTabContext = createContext();

export const useActiveTab = () => useContext(ActiveTabContext);//intha ui en ipide kidakku

export const ActiveTabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("tab1");//Asdfths

  console.log("ActiveTabProvider", activeTab);
  return (
    <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}  
    </ActiveTabContext.Provider>
  );//
};
