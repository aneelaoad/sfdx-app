import {api,wire, LightningElement } from 'lwc';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';

import num from '@salesforce/schema/Account.Range__c'
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import CREATED_FIELD from '@salesforce/schema/Account.CreatedDate';
import EXP_FIELD from '@salesforce/schema/Account.SLAExpirationDate__c';


const fields = [num];

export default class ChangeColor extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '0015g000014jfi7AAA', fields })
    account;

    get range() {
        return getFieldValue(this.account.data, num);
    }

    get totalClass(){
        return `slds-col slds-size_1-of-3 slds-text-align_center slds-text-title_bold ${
            this.range > 10 ? "green" : "orange"
          }`;
    }
  
}