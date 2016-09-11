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
    document.getElementById("easter_egg").style.backgroundImage = "url('static/konga.gif')";
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
function validate_rut(rut){
    var pat = /^[0-9]{1,9}-([0-9]|k|K)$/;
    if(pat.test(rut)){
        var splited_rut = rut.split("-");
        return dV(splited_rut[0]) == splited_rut[1].toLowerCase();
    }
    return false;
}

//True if pass has only ascii characters
function validate_pass(pass){
    var pat = /^[\x00-\x7F]+$/;
    return pat.test(pass);
}

function validate_login(){
    var rut = document.getElementById("rut").value;
    var pass = document.getElementById("password").value;
    if(validate_rut(rut) && validate_pass(pass)){
        document.getElementById("error").innerHTML = "";
        return true;
    }
    else{
        document.getElementById("error").innerHTML = "Ingrese rut y clave validos";
        //alert("Ingrese rut y clave validos");
        return false;
    }
}

(function(exports){
    exports.validate_rut = validate_rut;
    exports.validate_pass = validate_pass;
    exports.dV = dV;
}(typeof exports === 'undefined' ? this.common = {} : exports));
