import { atom } from "recoil";


export const Authenticated = atom({
    key: "Authenticated",
    default: false  
}); 


export const Org = atom({
    key : "Org",
    default : {}
})