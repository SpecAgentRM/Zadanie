
async function getData() {
	const xmlhttp = new XMLHttpRequest();
xmlhttp.onload = function() {
  const myObj = JSON.parse(this.responseText);
  document.getElementById("wynik0").innerHTML = "Identyfikator żądania: " + myObj.result.requestId + " z dnia " + myObj.result.requestDateTime;
	
	if(myObj.result.subject.authorizedClerks == null)
	{
	document.getElementById("wynik1").innerHTML = "Autoryzowani urzędnicy: ";
	}
	else {
	document.getElementById("wynik1").innerHTML = "Autoryzowani urzędnicy: " + myObj.result.subject.authorizedClerks;
	}
	
	if(myObj.result.subject.regon == null) {
	document.getElementById("wynik2").innerHTML = "Numer REGON: ";
	}
	else {
	document.getElementById("wynik2").innerHTML = "Numer REGON: " + myObj.result.subject.regon;
	}
	
	if(myObj.result.subject.restorationDate == null)
	{
	document.getElementById("wynik3").innerHTML = "Data uznania jako podatnik VAT: ";
	}
	else {
	document.getElementById("wynik3").innerHTML = "Data uznania jako podatnik VAT: " + myObj.result.subject.restorationDate;	
	}
	
	if(myObj.result.subject.workingAddress == null) {
	document.getElementById("wynik4").innerHTML = "Lokalizacja działalności: ";
	}
	else {
	document.getElementById("wynik4").innerHTML = "Lokalizacja działalności: " + myObj.result.subject.workingAddress;	
	}
	
	if(myObj.result.subject.hasVirtualAccounts == "true")
	document.getElementById("wynik5").innerHTML = "Posiadanie kont wirtualnych: Tak";
	else {
	document.getElementById("wynik5").innerHTML = "Posiadanie kont wirtualnych: Nie";
	}
	
	document.getElementById("wynik6").innerHTML = "Status podatnika VAT: " + myObj.result.subject.statusVat;
	
	if(myObj.result.subject.krs == null)
	{
	document.getElementById("wynik7").innerHTML = "Numer KRS: ";
	}
	else {
	document.getElementById("wynik7").innerHTML = "Numer KRS: " + myObj.result.subject.krs;	
	}
	
	if(myObj.result.subject.restorationBasis == null)
	{
	document.getElementById("wynik8").innerHTML = "Podstawa uznania: ";
	}
	else {
	document.getElementById("wynik8").innerHTML = "Podstawa uznania: " + myObj.result.subject.restorationBasis;	
	}
	
	document.getElementById("wynik9").innerHTML = "Numery kont: " + myObj.result.subject.accountNumbers;
	
	if(myObj.result.subject.registrationDenialBasis == null){
	document.getElementById("wynik10").innerHTML = "Podstawa odmowy: ";		
	}
	else {
	document.getElementById("wynik10").innerHTML = "Podstawa odmowy: " + myObj.result.subject.registrationDenialBasis;	
	}
	
	document.getElementById("wynik11").innerHTML = "Numer NIP: " + myObj.result.subject.nip;
	
	if(myObj.result.subject.removalDate == null) {
    document.getElementById("wynik12").innerHTML = "Data usunięcia: ";
	}
	else {
	document.getElementById("wynik12").innerHTML = "Data usunięcia: " + myObj.result.subject.removalDate;	
	}
		
	document.getElementById("wynik14").innerHTML = "Nazwa: " + myObj.result.subject.name;
	document.getElementById("wynik15").innerHTML = "Data rejestracji: " + myObj.result.subject.registrationLegalDate;
	
	if(myObj.result.subject.removalBasis == null) {
	document.getElementById("wynik16").innerHTML = "Podstawa usunięcia: ";
	}
	else {
	document.getElementById("wynik16").innerHTML = "Podstawa usunięcia: " + myObj.result.subject.removalBasis;	
	}
	
	if(myObj.result.subject.pesel == null) {
	document.getElementById("wynik17").innerHTML = "Numer PESEL: ";
	}
	else {
	document.getElementById("wynik17").innerHTML = "Numer PESEL: " + myObj.result.subject.pesel;
	}
	
	document.getElementById("wynik18").innerHTML = "Adres rezydencji: " + myObj.result.subject.residenceAddress;
	
	if(myObj.result.subject.registrationDenialDate == null) {
	document.getElementById("wynik19").innerHTML = "Data odmowy: ";
	}
	else {
	document.getElementById("wynik19").innerHTML = "Data odmowy: " + myObj.result.subject.registrationDenialDate;	
	}
	var answer = this.responseText;
	var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  var sql = "INSERT INTO customers (id, json-data) VALUES (myObj.result.requestId, answer)";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
});
}

var today = new Date();
var month = today.getMonth()+1
var day = today.getDate();
if (month < 10) {
	month = "0" + month
}
	if (day < 10) {
		day = "0" + day
	}
var address = 'https://wl-api.mf.gov.pl/api/search/nip/' + document.getElementById("nrnip").value + '?date=' + today.getFullYear()+'-'+month+'-'+day;
document.getElementById("adres").innerHTML = address;
xmlhttp.open("GET", address);
xmlhttp.send();
	
}
