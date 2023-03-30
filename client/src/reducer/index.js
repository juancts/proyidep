//import { bindActionCreators } from "redux";
import {
  GET_POKEMONES,
  SEARCH_POKEMONES,
  ADD_TYPES,
  DETAIL_POKEMONES,
  SORT_POKEMONES_ALF,
  SORT_POKEMONES_ATK,
  FILTER_POKEMONES_DB,
  FILTER_POKEMONES_TYPE,
  FILTER_POKEMONES_API,
} from "../actions/types";
import { ATTACKASC, ATTACKDSC, AZ, ZA } from "../components/Order/types";

const initialState = {
  pokemones: [],
  filteredPokemones: [],
  types: [],
  pokedetail: [],
  orderchanged: false,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_POKEMONES:
      return {
        ...state,
        pokemones: payload,
        filteredPokemones: payload,
      };

    case SEARCH_POKEMONES:
      return {
        ...state,
        filteredPokemones: payload,
      };

    //SORT POKEMONES

    case SORT_POKEMONES_ALF:
      let orderedPokemones;
      if (payload === AZ) {
        orderedPokemones = state.pokemones.sort((a, b) =>
          a.name > b.name ? 1 : a.name < b.name ? -1 : 0
        );
      } else if (payload === ZA) {
        orderedPokemones = state.pokemones.sort((a, b) =>
          a.name > b.name ? -1 : a.name < b.name ? 1 : 0
        );
      }
      return {
        ...state,
        filteredPokemones: orderedPokemones,
        orderchanged: !state.orderchanged,
      };

    case SORT_POKEMONES_ATK:
      let orderedPokeAtk;
      if (payload === ATTACKASC) {
        orderedPokeAtk = state.filteredPokemones.sort((a, b) =>
          a.attack > b.attack ? 1 : a.attack < b.attack ? -1 : 0
        );
      } else if (payload === ATTACKDSC) {
        orderedPokeAtk = state.filteredPokemones.sort((a, b) =>
          a.attack > b.attack ? -1 : a.attack < b.attack ? 1 : 0
        );
      }
      return {
        ...state,
        filteredPokemones: orderedPokeAtk,
        orderchanged: !state.orderchanged,
      };
    case FILTER_POKEMONES_TYPE:
      let result = [] 
      state.pokemones.map( (e)=>{if( e.types.includes(payload)){result.push(e)}})
                                 
      if (!result.length) {window.alert("Sorry, there are no pokemones with this type")
      return{
        ...state,
      }
    }else{
      return {
        ...state,
        filteredPokemones: result,
      };
    }


    case FILTER_POKEMONES_DB:
      if (payload === "database") {
        let result = state.pokemones.filter((e) => e.fromDb === true);
        if (!result.length) {window.alert("Sorry, there are no pokemons on the Db")
        return{
          ...state,
        }
      }else{
        return {
          ...state,
          filteredPokemones: result,
        };
      }
      }
    case FILTER_POKEMONES_API:
      if (payload === "api") {
        let result = state.pokemones.filter((e) => e.fromDb === false);
        if (!result.length) window.alert("No hay pokemones Cargados");
        return {
          ...state,
          filteredPokemones: result,
        };
      }
    case ADD_TYPES:
      return {
        ...state,
        types: payload,
      };
    case DETAIL_POKEMONES:
      return {
        ...state,
        pokedetail: payload,
      };

    default:
      return state;
  }
}
