import { component$, useComputed$, useSignal, useTask$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
interface Props {
    id: number | string;
    size?: number;
    backImage?: boolean;
    isVisible?: boolean
}



export const PokemonImage = component$(({id, size=200, backImage = false, isVisible=false}: Props)=>{

    const imageLoaded = useSignal(false);
    

    //useTask -> Disparar efectos secundarios
    useTask$(({track})=>{
        track(()=> id);
        imageLoaded.value=false;
    })

    //if(id === '') return '';

    const imageUrl = useComputed$(()=>{
        return ( backImage )
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ id }.png`
        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${ id }.png`
    })


    return(
        <div 
        class="flex items-center justify-center"
        style={{width: `${size}px`, height: `${size}px`}}
        >
            
            {!imageLoaded.value && <span>Cargando... </span>}

            
                <img 
                src={imageUrl.value}
                onLoad$={()=> imageLoaded.value = true}
                style={{width:`${size}px`}}
                alt='pokemon Sprite'
                class={[{'hidden':!imageLoaded.value, 'brightness-0': isVisible}, 'transition-all']}
                />

        </div>
    )
})