import { $, component$, useComputed$, useStore, useStylesScoped$ } from '@builder.io/qwik';

import styles from './login.css?inline';

export default component$(() => {

    useStylesScoped$(styles);

    const formState = useStore({
        email: '',
        password: '',
        formPosted: false,
    })

    const onSubmit = $(()=>{
        formState.formPosted = true;
        //const {email, password} = formState;
    })

    const emailError = useComputed$(()=>{
        if(formState.email.includes('@')) return '';
        return 'not-valid'
    }
    );

    const passwordError = useComputed$(()=>{
        if(formState.password.length > 6) return '';
        return 'not-valid'
    }
    );

    const isFormValid = useComputed$(()=>{
        if(emailError.value === 'not-valid' || passwordError.value === 'not-valid')return false;
        return true
    })

    return (
        <form 
        class="login-form" 
        onSubmit$={onSubmit}
        preventdefault:submit>
            <div class="relative">
                <input 
                onInput$={ (ev) => formState.email = (ev.target as HTMLInputElement).value}
                value= { formState.email}
                name="email" 
                type="text" 
                class={formState.formPosted ? emailError.value : ''}
                placeholder="Email address" />
                <label for="email">Email Address</label>
            </div>
            <div class="relative">
                <input 
                value= { formState.password}
                onInput$={ (ev) => formState.password = (ev.target as HTMLInputElement).value}
                id="password" 
                name="password" 
                type="password" 
                class={formState.formPosted ? passwordError.value : ''}
                placeholder="Password" />

                <label for="password">Password</label>
            </div>
            <div class="relative">
                <button 
                    type='submit'
                    disabled={!isFormValid.value}
                    >Ingresar</button>
            </div>


            {<code>
                { JSON.stringify( formState, undefined , 2 ) }
            </code>}
        </form>
    )
});