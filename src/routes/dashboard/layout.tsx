import { Slot, component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

export const useCheckAuthCoockie = routeLoader$(({cookie, redirect})=>{
    const jwtCookie = cookie.get('jwt');

    if(jwtCookie){
        return;
    }

    redirect(302, '/login')
})

export default component$(() => {
    return (  <>
    <div class = "flex flex-col items-center justify-center mt-2">

    <h3>Dashboard</h3>
    <Slot/>
    </div>
    </>)
});