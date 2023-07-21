public  class ProductWrapperController {
    // Creating separate classes 

    @AuraEnabled
    public static ProductAttribute attributeList(){
        ProductAttribute pd = new ProductAttribute();

        List<Product_Attribute__c> attributeName = new List<Product_Attribute__c>();

        attributeName = [SELECT  Name FROM Product_Attribute__c];
        pd.attributeName = attributeName; 

        return pd;
        
    }

    public class ProductAttribute{

        @AuraEnabled public List<Product_Attribute__c> attributeName;
        @AuraEnabled public String step;
        @AuraEnabled public Boolean optional;
        @AuraEnabled public List<Tag__c> parentTags ;

    }
    
    public class Tags{

        @AuraEnabled public String tagId;
        @AuraEnabled public String tagName;
        @AuraEnabled public List<Tag__c> childTags;
        @AuraEnabled public List<Tag__c> disabledTags;

    }
    
}