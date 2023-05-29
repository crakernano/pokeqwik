import { component$, useContext } from '@builder.io/qwik';
import { routeLoader$, useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context/pokemon/pokemon-game.context';
import { usePokemonGame } from '~/hooks/use-pokemon-game';

export const usePokemonId = routeLoader$<number>(({params, redirect})=>{
  const id = Number(params.id);
  //if(isNaN(id))redirect(301,'/')
  //if(id <= 0)redirect(301,'/')
  //if(id >= 1000)redirect(301,'/')

  return id;
})

export default component$(() => {
  const pokemonId = usePokemonId();
  const pokemonGame = useContext(PokemonGameContext);

  const location = useLocation();
  const {toogleFromBack, toogleVisible} = usePokemonGame();
  return(
    <>Pokemon id: {pokemonId}
    <PokemonImage
    id={pokemonId.value}
    isVisible={pokemonGame.isPokemonVisible}
    backImage={pokemonGame.showBackImage}
    />

    <div class="mt-2">
      <button onClick$={toogleFromBack}class="btn btn-primary mr-2">Voltear</button>
      <button onClick$={toogleVisible}class="btn btn-primary mr-2">Ocultar</button>
    </div>
    </>
  )
});