import { createContext, useContext, useState } from "react";
import { LogBox } from "react-native";
LogBox.ignoreLogs(['Warning: ...'])

export const UserContext = createContext()

export const UpdateUserContext = createContext()

export function useUserContext(){return useContext(UserContext);}

export function useUpdateUserContext(){return useContext(UpdateUserContext);}

export const UserProvider = ({value, children}) => {
    const [userLoginInfo, setUserLoginInfo] = useState(value);
    const val = {
        userLoginInfo: userLoginInfo,
        setUserLoginInfo: setUserLoginInfo
    }
    return(
        <UserContext.Provider value={userLoginInfo}>
            <UpdateUserContext.Provider value={setUserLoginInfo}>
                {children}
            </UpdateUserContext.Provider>
        </UserContext.Provider>
    );
};

export function SetContext(content){
    const use = () => {
        useContext(UpdateUserContext)};

    console.log("reday");
    use(content);

}