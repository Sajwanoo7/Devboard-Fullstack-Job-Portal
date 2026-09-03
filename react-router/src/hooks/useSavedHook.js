import { useState } from "react";


const key = 'SAVED_JOBS';
const readStorage = () => { // this will give us the initial value from local storage if it exists, otherwise it will return an empty array
    return JSON.parse(localStorage.getItem(key)) || [];
}

const useSavedHook = () => { // here i was taking a param key
   const [savedValue, setSavedValue] = useState(readStorage());


   const isSaved = (value) => {
    return savedValue.includes(value);
   }


   const toggle = (value) => {
    console.log('toggling', value);
        setSavedValue(prev => {
            let newValue;
            if (prev.includes(value)) {
                newValue = prev.filter(v => v !== value); // logic to remove the value from the array if it already exists
            } else {
                newValue = [...prev, value]; // logic to add the value to the array if it doesn't exist
            }  
            localStorage.setItem(key, JSON.stringify(newValue)); // logic to save the new value to local storage
            return newValue;
        }); 
   }

   return [savedValue, toggle, isSaved];
};

export default useSavedHook;