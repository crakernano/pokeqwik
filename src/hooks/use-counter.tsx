import { $, useComputed$, useSignal } from "@builder.io/qwik";

export const useCounter = (initialValue:number = 0 )=>{
    
    const counter = useSignal(initialValue)

    const increaseCounter = $(() =>{
        counter.value++;
    });
    
    const decreaseCounter = $(() =>{
        counter.value--;
    });

    return {
        increaseCounter,
        decreaseCounter,        
        counter: useComputed$(()=> counter.value) //Esto evita que el counter pueda ser modificado si no es mediante sus funciones
    };
}