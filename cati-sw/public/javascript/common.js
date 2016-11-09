/**
 * Created by Anghelo on 09-09-2016.
 */
// Here put the js functions will be executed in the client side (or the server side too)

function easter_eggColor(){
    document.getElementById("easter_egg").style.backgroundColor = "gainsboro";
    document.getElementById("easter_egg").style.backgroundImage = "";
    document.getElementById("easter_egg2").style.opacity = "1.0";
    document.getElementById("easter_egg3").style.opacity = "1.0";
    document.getElementById("easter_egg4").style.opacity = "1.0";
    document.getElementById("easter_egg5").style.opacity = "1.0";
}
function easter_eggImage(){
    document.getElementById("easter_egg").style.backgroundImage = "url('/static/konga.gif')";
    document.getElementById("easter_egg").style.backgroundSize = "70px 70px";
    document.getElementById("easter_egg2").style.opacity = "0.6";
    document.getElementById("easter_egg3").style.opacity = "0.7";
    document.getElementById("easter_egg4").style.opacity = "0.7";
    document.getElementById("easter_egg5").style.opacity = "0.7";
}

//Algoritmo para generar el digito verificador del rut
function dV(rut_start){
    var c = 2;
    var sum = 0;
    for(var i = rut_start.length - 1; i >= 0; i--){
        sum += parseInt(rut_start[i])*c++;
        if(c > 7){
            c = 2;
        }
    }
    rut_end = 11 - sum%11;
    if(rut_end == 10){
        return "k";
    }
    if(rut_end == 11){
        return "0";
    }
    return rut_end.toString();
}

//True if is a valid rut
function validateRut(rut){
    var pat = /^[0-9]{1,9}-([0-9]|k|K)$/;
    if(pat.test(rut)){
        var splited_rut = rut.split("-");
        return dV(splited_rut[0]) == splited_rut[1].toLowerCase();
    }
    return false;
}

//True if pass has only ascii characters
function testAscii(string){
    var pat = /^[\x00-\x7F]+$/;
    return pat.test(string);
}

//
function validatePass(pass){
    return testAscii(pass);
}


function validateMail(mail){
    var pat = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return pat.test(mail);
}

function validateLogin(){
    var rut = document.getElementById("rut").value;
    var pass = document.getElementById("password").value;
    if(validateRut(rut) && validatePass(pass)){
        document.getElementById("error").innerHTML = "";
        return true;
    }
    else{
        document.getElementById("error").innerHTML = "Ingrese rut y clave validos";
        //alert("Ingrese rut y clave validos");
        return false;
    }
}

function testDate(string){
    var pat = /^[1-9][0-9]{3}\-(0[1-9]|1[0-2])\-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    return pat.test(string);
}

function testIsANumber(string){
    var pat = /^[0-9]+$/;
    return pat.test(string);
}

function testUrl(string){
    var pat = /^(http(s)?:\/\/)?[a-zA-Z0-9_\-.]+\.[a-zA-Z0-9_\-]+$/ ;
    return pat.test(string);
}

function testEqualsPass(pass1, pass2){
    return pass1 == pass2;
}


function fixNumber(number){
    if(number.substring(0, 3) != "+569"){
        /*if (number.lenght != 8) {//TODO: for some reason, this if is triggered when number.length == 8
            console.log(number.lenght != 8);
            console.log(number.lenght);
            return "+56" + number;
        } else {
            return "+569" + number;
        }*/
        return "+569" + number;
    }
    return number;
}

/*
function validateCreateUser(){
    var pass1 = document.getElementById("interPass").value;
    var pass2 = document.getElementById("interPass2").value;
    return testEqualsPass(pass1, pass2);
}
*/

(function(exports){
    exports.validateRut = validateRut;
    exports.validatePass = validatePass;
    exports.dV = dV;
    exports.testAscii = testAscii;
    exports.validateMail = validateMail;
    exports.testDate = testDate;
    exports.testIsANumber = testIsANumber;
    exports.testUrl = testUrl;
    exports.testEqualsPass = testEqualsPass;
    exports.fixNumber = fixNumber;
}(typeof exports === 'undefined' ? this.common = {} : exports));
