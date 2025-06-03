import { createContext, useContext, useState } from "react";

const RegisterContext = createContext();

function RegisterProvider(props) {
    const [data, setData] = useState({
        name: "",
        date_of_birth: "",
        location: "",
        city: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        sexIdentities: "",
        sexPreferences: "",
        racialPreferences: "",
        meetingInterests: ""
    })
    const [tags, setTags] = useState([])
    const [avatars, setAvatars] = useState({})
    return (
        <RegisterContext.Provider value={{ data, setData, tags, setTags, avatars, setAvatars }}>{props.children}</RegisterContext.Provider>
    )
}

const useRegister = () => useContext(RegisterContext);

export { RegisterProvider, useRegister }