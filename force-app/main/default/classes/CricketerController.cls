public  class CricketerController {
    public CricketerController() {

    }
@AuraEnabled(cacheable=true)
public static List<Cricketer__c	> getCricketerList(String keySearch){

    
    return [SELECT Name, Id, Age__c, Nationality__c, Runs__c, Image_URL__c FROM Cricketer__c WHERE Nationality__c=:keySearch];
    
}
 
}