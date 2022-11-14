public with sharing class PokemonDetails {
   
    @AuraEnabled
    public static List<Pokemon__c> getPokemons(String searchkey){


        if( searchkey != ''){
            String key = '%' +searchkey+ '%';

            List<Pokemon__c> pokemonSearchList = [SELECT Id, Name, Height__c, Trainer__r.Name, Location__c, Img_URL__c FROM Pokemon__c
                WHERE Name LIKE: key
            ];
            return pokemonSearchList;

        }
       
        // List<Pokemon__c> pokemonList = [SELECT Id, Name, Height__c, Weight__c, Trainer__c FROM Pokemon__c];

        //SELECT Trainer__c FROM Pokemon__c will only return the Id of the Trainer not the name. 
        //Because it is relationship field. To fetch the name of relationship field 'c' is replaced by 'r'
        // and then the api name of the required field is added using dot operator.
        //EXAMPLE:
        // Trainer__r.Name
       else{
        List<Pokemon__c> pokemonList = [SELECT Id, Name, Height__c, Trainer__r.Name, Location__c, Img_URL__c FROM Pokemon__c];

        if( !pokemonList.isEmpty()){
           return pokemonList;

        }
        else return null;
       }
    }
}
