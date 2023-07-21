public class ProductController {

    @AuraEnabled(cacheable=true)
    
    public static DataWrapper productList(string attributeVar){

        // create wrapper class instance
        DataWrapper dt = new DataWrapper();

        List<Product_Attribute__c> attributes = new List<Product_Attribute__c>();
        attributes = [SELECT Name FROM Product_Attribute__c];
        dt.attributes = attributes;
        List<Tag__c> tags = new List<Tag__c>();

        tags = [SELECT  Name FROM Tag__c WHERE Product_Attribute__r.Name =: attributeVar ];
        // tags = [SELECT Name, (SELECT Name FROM Parent_Tags__r) FROM Tag__c ];
        dt.tags = tags;
        return dt;

    }
    
    public class DataWrapper {
        @AuraEnabled public List<Product_Attribute__c> attributes {get;set;}
        @AuraEnabled public List<Tag__c> tags {get;set;}
}
    
}