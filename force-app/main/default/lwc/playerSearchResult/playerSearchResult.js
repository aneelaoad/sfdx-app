import { LightningElement, wire} from 'lwc';
import getCricketerList from '@salesforce/apex/CricketerController.getCricketerList'

export default class PlayerSearchResult extends LightningElement {

    cricketersNationality = ''
    selectedCard;
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

    handleCardClick(event){
        this.selectedCard = event.currentTarget.dataset.id
        this.selectedCard.classList.addClass('selected');
        let boxClass = this.template.querySelector('.selected')

        if(boxClass > 0){
            this.removeClass();
        }
    }

    removeClass(){
        this.template.querySelectorAll('.selected')[0].classList.remove('selected')
    }
}