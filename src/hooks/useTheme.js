import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
 
 export default function useTheme() {
    const context = useContext(ThemeContext);
    
    if(context === undefined){
        throw new Error("useTheme() must be inside ThemeProvider.");
    }

    return context;
 }
 