import { LightningElement, wire} from 'lwc';
import getCricketerList from '@salesforce/apex/CricketerController.getCricketerList'

export default class PlayerSearchResult extends LightningElement {

    cricketersNationality = ''
    list;
    @wire(getCricketerList)
    playersList({data, error}){
        if(error){
            console.log("THIS IS ERROR" +error);
        }
        else if(data){
            this.list = data
            console.log("LIST" +JSON.stringify(this.list) );
        }
    }
}