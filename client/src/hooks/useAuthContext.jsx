import { AuthContext } from "../context/authContext";
import { useContext } from "react"; // used inside this hook to consume the
// context
// creating the hook function
export const useAuthContext= ()=>{
    const context= useContext(AuthContext)
    // checking if we're using the hook inside the provider component
    if(!context){
        throw Error("useAuthContext must be used inside an AuthContextProvider")
    }

    return context;
}