public  class WhatsController {
   
    @AuraEnabled
    public static boolean sendTemplateMsg (String contactId){
        Contact contactDetails = [ Select id, Phone FROM Contact WHERE Id=:contactId];
        String WhatsAppNumber = '92' + contactDetails.Phone;
        system.debug('whatsAppNumber: ' +WhatsAppNumber);
        
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        //Rest Api -> https://graph.facebook.com/v13.@/Phone number ID/messages
		//(Phone number ID -> is available in your app create on meta developer console)
		req.setEndpoint('https://graph.facebook.com/v13.@/111796115078397/messages');
        req.setHeader('Content-type', 'application/json');
        req.setMethod('POST');
        
        String body = '{ "messaging_product" : "whatsapp", "to": " '+WhatsAppNumber +'" , "type":"template", "template": {"name": "hello_world", "language": {"code":"en_US"}}}';
		req.setBody(body);
       
        // String ApiToken = 'EAAHfCqh1UiUBAKevZA3MOZAJ8lCZAl8OO75ZBc0YjxE1tUua39OjQHtBnEsusv1LvYU2VC2EAAfqI8ypva5znacZCmr5M8jd6vFerPQJLKE6ZB91TZCnLt88hPa45R6dIojj2dP2zcCXKqDqfyQ1poiaCKnXYMKZBZAmkZBPWhZC8LF1TcEGywZCdQkN7nVHyrZBtBhL3zWzroYcohAZDZD';
       String ApiToken = 'EAAHfCqh1UiUBAIHqHUgkgbrIGIMvy9Y8NU0xsfcZCsSYB5M6VPZA0y1tBZB9Nbcz6hdNFS6pw72gz4Vl73xSiriLivL24CRxRNztQ1nRz33FJXCZBYIDvPLLCQaZAZBfuZCbqg4C4zXoZBNIYh6696eGaZCus8O3LQ0Eln4flgkRa8yTVB1mSOgJUQPZCAZAw2oW55PJsL1QByiNQZDZD';
        req.setHeader('Authorization', 'Bearer' +ApiToken);
        
        HttpResponse res = http.send(req);
        
        if (res.getStatusCode() ==200) {
            return true;
            
        }
        else return false;
       
        
    }
}
