import { createContext, useContext, useState } from "react";

const RegisterContext = createContext();

function RegisterProvider(props) {
    const [data, setData] = useState({
        name: "",
        dateOfBirth: "",
        location: "",
        city: "",
        username: "",
        email: "",
        password: ""
    })
    return (
        <RegisterContext.Provider value={{ data, setData }}>{props.children}</RegisterContext.Provider>
    )
}

const useRegister = () => useContext(RegisterContext);

export { RegisterProvider, useRegister }