import { $, component$, useOnDocument, useStore, useTask$ } from '@builder.io/qwik';
import type{ DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { getSmallPokemons } from '~/helpers/get-pokemons';
import { SmallPokemon } from '~/interfaces/small-pokemon';


interface PokemonPageState{
  currentPage: number;
  isLoading: boolean;
  pokemons: SmallPokemon[];
}

export default component$(() => {

  
  //const pokemonState = useStore<PokemonPageState>({
const pokemonState = useStore<PokemonPageState>({
  currentPage: 0,
  isLoading: false,
  pokemons: []
})

// useVisibleTask$(async({track})=>{
  //   track(()=> pokemonState.currentPage); //indica cuando debe volver a dispararse el visibleTask
  //   const pokemons = await getSmallPokemons(pokemonState.currentPage * 10);
  //   pokemonState.pokemons = pokemons;
  // })
  
  useTask$(async({track})=>{
    track(()=> pokemonState.currentPage);

    pokemonState.isLoading = true;
    const pokemons = await getSmallPokemons(pokemonState.currentPage * 10, 30);
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];

    pokemonState.isLoading = false;
  });
  
  useOnDocument('scroll', $(() => {
    const maxScroll = document.body.scrollHeight;
    const currentScroll = window.scrollY + window.innerHeight;

    if ( (currentScroll + 200) >= maxScroll && !pokemonState.isLoading   ) {
      pokemonState.isLoading = true;
      pokemonState.currentPage++;
    }
  }))

return(<>
<div class="flex flex-col">
  <span class="my-5 text-5xl">Status</span>
  <span>Pagina actual: {pokemonState.currentPage}</span>
  <span>Está cargando: </span>
</div>
<div class="mt-10">
  <button onClick$={() => pokemonState.currentPage++ }
    class="btn btn-primary mr-2">
    Siguientes
  </button>
</div>

<div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
  {
    pokemonState.pokemons.map(({ name, id }) => (
      <div key={name} class="m-5 flex flex-col justify-center items-center">
        <PokemonImage id={id} />
        <span class="capitalize">{name}</span>
      </div>
    ))
  }
</div>

</>)

});

export const head: DocumentHead = {
  title: 'List Client',
}