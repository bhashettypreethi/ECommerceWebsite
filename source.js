
var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
  
                if (this.readyState == 4 && this.status == 200) {
                    productDetails(this);
                }
            };
         
  xmlhttp.open("GET", "products.xml", false);
  xmlhttp.send();

  function updateDate(date, idelement, nodays, shipOnWeekends){
    date = new Date(date);
    date = getDate(date,nodays, shipOnWeekends);
    document.getElementById(idelement).innerHTML="Estimated Shipping Date: "+(date.getMonth()+1)+"-"+date.getDate()+"-"+date.getFullYear();
  }
  function getDate(date, maxBusinessDaysToShip, shipOnWeekends){
    if(shipOnWeekends==="true"){
      date = new Date(date.getTime()+(maxBusinessDaysToShip*24*60*60*1000));
      console.log(date);
    }
    else{
      date = addBusinessDays(date, parseInt(maxBusinessDaysToShip));
    }
    return date;
  }
  function addBusinessDays(d,n) {
    d = new Date(d.getTime());
    var day = d.getDay();
    d.setDate(d.getDate() + n + (day === 6 ? 2 : +!day) + (Math.floor((n - 1 + (day % 6 || 1)) / 5) * 2));
    return d;
}
  function productDetails(xmlHttp){
  // Parse the XML data
  var xmlDoc = xmlHttp.responseXML;
  var products = xmlDoc.getElementsByTagName("product");
  var productsElement = document.getElementById("sample");
  // Generate HTML for each product
  var details = "";
  for(var i = 0; i < products.length; i++) {
    var product = products[i];
    var productName = product.getElementsByTagName("productName")[0].childNodes[0].nodeValue;
    var inventoryQuantity = product.getElementsByTagName("inventoryQuantity")[0].childNodes[0].nodeValue;
    var shipOnWeekends = product.getElementsByTagName("shipOnWeekends")[0].childNodes[0].nodeValue;
    var maxBusinessDaysToShip = product.getElementsByTagName("maxBusinessDaysToShip")[0].childNodes[0].nodeValue; 
    var date = getDate(new Date(),maxBusinessDaysToShip,shipOnWeekends);
    details += "<div class='singleProduct'>" +
               "<h2 class='alignleft'>" + productName + "</h2>" +
               "<p class='alignright'>Inventory Quantity: " + inventoryQuantity + "</p>" +
               "<p class='alignright'>Select Order Date: <input type='date' id='orderdate"+i+"' min='"+new Date().toISOString().split('T')[0]+"' onChange='updateDate(this.value,\"esd"+i+"\",\""+maxBusinessDaysToShip+"\",\""+shipOnWeekends+"\")'></input></p>"+ 
               "<p class='alignright' id='esd"+i+"'>Estimated Shipping Date: " + (date.getMonth()+1)+"-"+date.getDate()+"-"+date.getFullYear() + "</p>" +
               "</div>";
  }
  
  // Display the products
  productsElement.innerHTML = details;
}
