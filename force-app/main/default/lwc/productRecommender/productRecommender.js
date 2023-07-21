import { LightningElement,wire,api, track } from 'lwc';

import productList from '@salesforce/apex/ProductController.productList'
import attributeList from '@salesforce/apex/ProductWrapperController.attributeList'

import { getRelatedListRecords } from 'lightning/uiRelatedListApi';



export default class ProductRecommender extends LightningElement {

    @track attributes;
    list;
    @api recordId;
    error;
    records;
    @track tags;
    names ;
    attributeVar = 'Step 1: Application';

    @wire(productList, {
        attributeVar : '$attributeVar'
    })
    attributes({data, error}){
        if(error){
            console.log('Attribute not available: ' +JSON.stringify(error));
        }
        else if(data){
            this.attributes = data.attributes;
            this.tags = data.tags;
        }
    }
    // Fetching related records/parent records of tags
   
      handleChange(event) {
        let i;
        let checkboxes = this.template.querySelectorAll('[data-id="checkbox"]');
        for(i=0; i<checkboxes.length; i++) {
            checkboxes[i].checked = event.target.checked;
        }
    }

    handleAtrributes(e){
        console.log('test ---> '+e.target.value);
        this.attributeVar = e.target.value;
        productList({
            attributeVar :this.attributeVar
        }).then(response => {
            this.attributes = response.attributes;
            this.tags = response.tags;
        }).catch(error => {
            console.log(error);
        })

    }




    // -------------------------
  
   
}