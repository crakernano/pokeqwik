import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './login.css?inline';
import { Form, routeAction$, zod$, z } from '@builder.io/qwik-city';

export const useLoginUserAction = routeAction$( (data, {cookie, redirect}) =>{

    const {email, password } = data;

    //TypeORM, Prisma... 
    if(email === 'nano@gmail.com' && password === '1234567'){
        cookie.set('jwt', 'miToken', {secure: true, path: '/'})
        redirect(302, "/")       
    }
    return {success: false}
}, zod$({
    email: z.string().email('Formato no valido'),
    password: z.string().min(6, 'El password debe tener al menos 6 caracteres')
}));

export default component$(() => {

    useStylesScoped$(styles);
    const action = useLoginUserAction();

    return (
        <Form action={action} class="login-form mt-5">
            <div class="relative">
                <input 
                    name="email" 
                    type="text" 
                    placeholder="Email address" />
                <label for="email">Email Address</label>
            </div>
            <div class="relative">
                <input 
                    id="password" 
                    name="password" 
                    type="password" 
                    placeholder="Password" />
                <label for="password">Password</label>
            </div>
            <div class="relative">
                <button>Ingresar</button>
            </div>


            { 
            <code>
                { JSON.stringify( action.value, undefined , 2 ) }
            </code> 
            }
        </Form>
    )
});