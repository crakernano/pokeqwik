import { component$ } from '@builder.io/qwik';
import { DocumentHead, Link } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { usePokemonGame } from '~/hooks/use-pokemon-game';

export default component$(() => {

  // const pokemonId = useSignal(1); //useSignal se usa para almacenar primitivos
  // const showBackImage = useSignal(false)
  // const ocultar = useSignal(false)

  //const pokemonGame = useContext(PokemonGameContext);

  //const nav = useNavigate();
  const {
    isPokemonVisible,
    showBackPokemon,
    nextPokemon,
    prevPokemon,
    toogleFromBack,
    toogleVisible,
    pokemonId,
    
  } = usePokemonGame();


  // const goToPokemon = $((id: number)=>{
  //   nav(`/pokemon/${id}/`)
  // });

  return (
    <>
    <span class="text-2xl">Buscador simple</span>
    <span class="text-9xl">{ pokemonId.value }</span>    

    <Link href={`/pokemon/${pokemonId.value}/`}>
      <PokemonImage 
        id={pokemonId.value}
        backImage={showBackPokemon.value}
        isVisible={isPokemonVisible.value}
        />
    </Link>

    <div class="mt-2">
      <button onClick$={prevPokemon} class="btn btn-primary mr-2">Anterior</button>
      <button onClick$={nextPokemon}class="btn btn-primary mr-2">Siguente</button>
      <button onClick$={toogleFromBack}class="btn btn-primary mr-2">Voltear</button>
      <button onClick$={toogleVisible}class="btn btn-primary mr-2">Ocultar</button>
    </div>
  
  </>
  );
});

export const head: DocumentHead = {
  title: 'PokeQwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
