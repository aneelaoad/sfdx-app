trigger TotalContactstsPerAccount on Contact (after insert) {

    Set<Id> accId = new Set<Id>();
    // getting the accoundId of newly created contact
    for(Contact con : trigger.new){
        accId.add(con.AccountId);
    }
    
    // fetching Id and Name of the newly created Contact by making AccoundId equal to accId
    // that we are using to get newly created contact
    List<Contact> contactList = [SELECT Id, Name FROM Contact WHERE AccountId IN : accId];

      Map<Id, Decimal> totalMappedContacts = new Map<Id, Decimal>();
    for(Contact con : contactList){
    
        if(totalMappedContacts.containsKey(con.AccountId)){
            Decimal noContact = totalMappedContacts.get(con.AccountId) + 1;
            totalMappedContacts.put(con.AccountId, noContact);
        }
        else{
             totalMappedContacts.put(con.AccountId, 1);
        }
    }
    
    List<Account> accList = new List<Account>();
    for(Id aId : totalMappedContacts.keySet()){
        Account acc = new Account();
        acc.Number_of_Contacts__c = totalMappedContacts.get(aId);
        acc.Id = aId;
        accList.add(acc);
    }
    update accList;
}