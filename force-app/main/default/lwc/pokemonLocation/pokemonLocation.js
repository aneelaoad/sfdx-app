import { LightningElement, wire, api } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

const OBJ_NAME = 'Pokemon__c'
// const RECORD_NAME ='Pokemon__c.Name'
const NAME ='Pokemon__c.Name'
const LATITUDE = 'Pokemon__c.Location__Latitude__s';
const LONGITUDE = 'Pokemon__c.Location__Longitude__s';

const pokemonFields = [NAME,LATITUDE,LONGITUDE];




export default class PokemonLocation extends LightningElement {

    
    //-----TO GET THE RECORD ID OF A PARTICULAR RECORD FROM ORG---------
    @api recordId;
     MapMarkers = [];
     name = '';
     cardTitle;

    //  ------Getting the record id and fields as function----
     @wire(getRecord, {recordId: '$recordId', fields: pokemonFields})
     getPokemons({err, data}){

     if(err) {
        console.log("ERROR " + err)
     }
     else if (data) {
        this.name = getFieldValue(data, NAME);
        this.cardTitle =  this.name ;
        const Latitude = getFieldValue(data, LATITUDE);
        const Longitude = getFieldValue(data, LONGITUDE);
        this.MapMarkers = [{
            location: {Latitude, Longitude},
            title :  this.name,
            description: `This is the geolcation of the pokemon: ${Latitude}: ${Longitude}`
        }]
        console.log("This is data " +JSON.stringify(this.MapMarkers));
     }
    }
}