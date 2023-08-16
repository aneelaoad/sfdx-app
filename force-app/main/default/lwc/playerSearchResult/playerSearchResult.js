import { LightningElement, wire, api} from 'lwc';
import getCricketerList from '@salesforce/apex/CricketerController.getCricketerList'

export default class PlayerSearchResult extends LightningElement {

    @api gotSeletedNationality;
    // cricketersNationality = ''
    selectedCardId;
    list;
    @wire(getCricketerList, {keySearch: '$gotSeletedNationality'})
    playersList({data, error}){
        if(error){
            console.log("THIS IS ERROR" +error);
        }
        else if(data){
            this.list = data
            console.log("Player--->" +JSON.stringify(data) );
            console.log("gotSeletedNationality--->" +this.gotSeletedNationality );

            if(this.gotSeletedNationality= ''){
                keySearch = ''
            }
        }
    }
   
    handleCardClick(event){

        this.selectedCardId = event.currentTarget.dataset.id
        console.log("CARD ID: "+this.selectedCardId);

        let cardSeleted = this.template.querySelectorAll('.selected')
        // console.log('card selected ' +cardSeleted);
        if(cardSeleted.length > 0){
            this.removeClass()
        }
        let playerCard = this.template.querySelector(`[data-id="${this.selectedCardId}"]`)

        if(playerCard){ 
            playerCard.className = 'title_wrapper selected'
        }
    }
    removeClass(){
        this.template.querySelectorAll('.selected')[0].classList.remove('selected')
       
    }
    
}