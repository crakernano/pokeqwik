import { $, component$, useComputed$, useSignal, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { DocumentHead, Link, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { Modal } from '~/components/shared/modal/modal';
import { getFunFactAboutPokemon } from '~/helpers/get-chat-gpy-response';
import { getSmallPokemons } from '~/helpers/get-pokemons';
import { SmallPokemon } from '~/interfaces/small-pokemon';

// Esto ocurre del lado del backend y se envian los resultados al cliente
export const usePokemonList = routeLoader$<SmallPokemon[]>(async({query, redirect, pathname})=>{

  const offset = Number(query.get('offset') || '0');
  if(isNaN(offset)) redirect(301, pathname)
  if(offset<0) redirect(301, pathname);

  return await getSmallPokemons(offset);

  // const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);
  // const data = await resp.json() as PokemonListResponse;
  // return data.results;
});

export default component$(() => {
  const pokemons = usePokemonList();
  const location = useLocation();

  const modalVisible = useSignal(false);
  const modalPokemon = useStore({
    id: '',
    name: ''
  });

  const chatGptPokemonFact = useSignal('');

  const showModal = $((id: string, name: string)=>{
    modalPokemon.id = id,
    modalPokemon.name = name,
    modalVisible.value = true;

  });

  const closeModal = $(()=>{
    modalVisible.value = false;

  });

  useVisibleTask$(({track})=>{
    track(()=> modalPokemon.name);
    chatGptPokemonFact.value = '';

    if(modalPokemon.name.length > 0){
      getFunFactAboutPokemon(modalPokemon.name).then(resp => chatGptPokemonFact.value = resp);
    }
    
  });

  const currentOffset = useComputed$<number>(()=>{
    //const offsetString = location.url.searchParams.get('offset'); Eso no funciona bien
    const offsetString = new URLSearchParams(location.url.search)
    return Number(offsetString.get('offset') || 0); //ToDo Verificacion de que sea un numero
  })

  return(
    <>
    <div class="flex flex-col">
      <span class="my-5 text-5xl"> Statuts</span>
      <span>Página actual : { currentOffset }</span>
      <span>Está cargando la página : XXX</span>
    </div>
    
    <div class="mt-10">
      <Link 
      href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`}
      class="btn btn-primary mr-2"> Anteriores </Link>
      <Link 
      href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`}
      class="btn btn-primary mr-2"> Siguientes </Link>

    </div>

    <div class="grid grid-cols-6 mt-5">
      {pokemons.value.map(({name, id})=>(
        <>        
        <div 
          key={name} 
          onClick$={()=> showModal(id, name)}
          class="m-5 flex flex-col justify-center items-center">
          <PokemonImage id={id}/>
          <span class="capitalize">{name}</span>
        </div>
        </>
      ))}
    </div>

    <Modal 
      showModal = {modalVisible.value} 
      closeFn={closeModal}>
      <div q:slot='title'>{modalPokemon.name}</div>
      <div  q:slot='content'>
        <PokemonImage id={modalPokemon.id}/>
        <span>
          {
            chatGptPokemonFact.value === ''
            ? "Preguntando a ChatGPT"
            : chatGptPokemonFact
          }
        </span>
      </div>
    </Modal>
    </>
  )
});

export const head: DocumentHead = {
  title: 'List SSR',
}