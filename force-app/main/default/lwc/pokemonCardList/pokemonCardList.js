import { LightningElement, wire } from 'lwc';
// Fetching the pokemonList from auraEnabled apex class as getPokemons
import getPokemons from '@salesforce/apex/PokemonDetails.getPokemons'

export default class PokemonCardList extends LightningElement {

    //Pokemons --> It will store details of all the pokemons
    pokemons;
    //error ---> It will be used to show error if the detail is failed to be fetch in the component
    error;
    

    //We want the details of the pokemon to be shown as soon as the page is loaded. Therefore
    // we are using the connectedCallback() function. It allows us to load the component after it is 
    // rendered in DOM on the browser

   
    connectedCallback(){
        getPokemons()
        .then( result => {
           this.pokemons = result;
           console.log(this.pokemons);

        })
        .catch(error => {
            this.error = error
        })
    }
}