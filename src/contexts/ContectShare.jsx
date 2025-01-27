import React, { createContext, useState } from 'react'
export const addContext = createContext()
export const editContext = createContext();
const ContectShare = ({children}) => {
    const [addResponse,setAddResponse] = useState("")
    const [editResponse, setEditResponse] = useState("");
  return (
    <>
      <addContext.Provider value={{ addResponse, setAddResponse }}>
        <editContext.Provider value={{ editResponse, setEditResponse }}>
          {children}
        </editContext.Provider>
      </addContext.Provider>
    </>
  );
}

export default ContectShare