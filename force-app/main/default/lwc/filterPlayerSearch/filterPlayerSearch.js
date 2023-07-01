import { LightningElement, wire } from 'lwc';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import {NavigationMixin } from 'lightning/navigation'
import Cricketer from '@salesforce/schema/Cricketer__c'
import Nationality from '@salesforce/schema/Cricketer__c.Nationality__c'


export default class FilterPlayerSearch extends NavigationMixin(LightningElement) {

recordTypeId;
arrOptions;
pickValues;
selectedValue ='';

    createCrickters(){
        this[NavigationMixin.Navigate](
            {
                type: 'standard__objectPage',
                attributes:{
                    objectApiName: 'Cricketer__c',
                    actionName: 'new'
                }
            }
        )
    }
// Getting default recordId for any object using getObjectInfo method
    @wire(getObjectInfo, {objectApiName: Cricketer})
    getCricketersInfo({data, error}){
        if(error){ console.log("eror: " + error); }
        else if(data){  this.recordTypeId = data.defaultRecordTypeId; }
    }

// Using the default record api in the getPicklistValues method to fetch the 
    @wire(getPicklistValues, {recordTypeId: '$recordTypeId', fieldApiName: Nationality})
    getPickListOptions({data, error}){
        if(error){ console.log(error); }
        else if(data){ 
            let arr = []
            this.pickValues = data.values ;
            this.pickValues.forEach(element => {
               
                arr.push({label: element.value, value: element.value})
            });

            this.arrOptions = arr;
        }

    }
    handleChange(event) {  this.selectedValue = event.detail.value;  }
}