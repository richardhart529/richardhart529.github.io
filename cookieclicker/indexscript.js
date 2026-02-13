let cps = 0;
let z = false;


let towersOwnedDict = {
    "gnomes":0,
    "mines":0,
    "eGods":0,
    "holes":0,
    "pyr":0,
    "pyr-vict":0,
    "ant":0,
    "chemt":0,
    "ovens":0,
}

let multsActiveDict = {
    1:1,
    2:0,
    3:1,
    4:1,
    5:0,
}

//1=cookies per click mult
//2= extra cookies per click
//3=total cps mult
//4=clicks per click mult
//5=extra clicks per click

let specialUUnlockedDict = {
    "hdayclick":false,
    "gamdice":false,
}


let clicks = 0;

let cookies = 0;
let cookie = document.getElementById("cookie");
let cookieDisplay = document.getElementById("cookienum");

let cookieUnlockDict = {
    'bejeweled':false,
    'chrono':false,
    'prot':false,
    'worm':false,
};

cookie.addEventListener('click', function(e){
    console.log(e.clientX, e.clientY);
    cookiePressed(e.clientX, e.clientY);
})

function cookiePressed(x, y) {

    if (specialUUnlockedDict["hdayclick"]) {
    clicks = Math.floor(clicks + multsActiveDict[4]*(1+multsActiveDict[5]));
    }

    cookies = cookies + multsActiveDict[1]*(multsActiveDict[2]+1);

    document.getElementById("cookienum").innerHTML = Math.floor(cookies);

    let test_num = Math.floor(Math.random()*1000);

    let new_div = document.createElement("div");
    new_div.id = "test" + test_num;
    new_div.classList.add("test");
    document.body.appendChild(new_div);
    let test_div = document.querySelector("#test"+test_num);

    test_div.innerHTML = "+" + ((Math.floor(10*multsActiveDict[1]*(multsActiveDict[2]+1)))/10)

    test_div.style.left = (x-20) + "px";
    test_div.style.top = (y-40) + "px";

    test_div.style.animation = "example 1.5s linear";

    setTimeout(() => {
        test_div.remove();
    }, 1500);
}

function placeTower(basePrice, elem, name, ownedDisplayId, priceDisplayId) {
    if (elem.classList.contains("unbuyable") == false && cookies >= basePrice*(1.2**towersOwnedDict[name])) {
        cookies = cookies - basePrice*(1.2**towersOwnedDict[name]);

        towersOwnedDict[name] = towersOwnedDict[name] + 1;

        document.getElementById(ownedDisplayId).innerHTML = "owned: " + towersOwnedDict[name];
        document.getElementById(priceDisplayId).innerHTML = "Price: " + Math.floor(basePrice*(1.2**towersOwnedDict[name])) + " cookies";

        let newPrice = basePrice*(1.2**towersOwnedDict[name])
        for (i = 0;i<newPrice.length();i++) {
            if (i%3 == 0) {
                
            }
        }
        }
    
    
    else {
        elem.style.animation = "nomoney 0.4s linear";

        setTimeout(()=> {
            elem.style.animation = "";
        },400)
    }
}



setInterval(function(){
    gnomeMines = document.getElementById("gnome-mines");
    cpsDisplay = document.getElementById("cps-display");
    clicksDisplay = document.getElementById("clicks-display");
    gnomeMinesCurrentEffects = document.getElementById("current-effects-gnome-mines");

    cps = (multsActiveDict[3])*((towersOwnedDict["gnomes"]*0.5)*(towersOwnedDict["mines"]*20/100)+(towersOwnedDict["gnomes"]*0.5)+(towersOwnedDict["eGods"]*10)+(towersOwnedDict["holes"]*100)+((1.1*towersOwnedDict["pyr-vict"])*(50*towersOwnedDict["pyr"]))+towersOwnedDict["ant"]*10000+towersOwnedDict["chemt"]*60000+towersOwnedDict["ovens"]*700000);


    cpsDisplay.innerHTML = Math.round(10*cps)/10;

    gnomeMinesCurrentEffects.innerHTML = "current effects: generating " + Math.floor((towersOwnedDict["gnomes"]*0.2)*(10/100*towersOwnedDict["mines"])) + " additonal cookies from gnomes";

    cookies = (cps/100)+cookies;
    document.getElementById("cookienum").innerHTML = Math.floor(cookies);

    clicksDisplay.innerHTML = "clicks: " + clicks;

    if (towersOwnedDict["gnomes"]>0) {
        gnomeMines.classList.remove("unbuyable");
        gnomeMines.classList.add("towers");
        gnomeMines.classList.add("transform-hover");
    
    }
    
    if (towersOwnedDict["eGods"] > 0) {
        checkSpawnCookie("ecookie.png", 1500, "eCookiePressed");
    }

    if (cookieUnlockDict['bejeweled']) {
        checkSpawnCookie("bejcookie.png", 5000, "bejCookiePressed");
    }

    if (cookieUnlockDict['chrono']) {
        checkSpawnCookie("chronocookie.png", 20000, "ChronocookiePressed");
    }

    if (cookieUnlockDict['prot']) {
        checkSpawnCookie('protcoookie.png', 50000, "ProtBCookiePressed")
    }

    if (cookieUnlockDict['worm']) {
        checkSpawnCookie('wormcookie.png', 10, "WormCookiePressed")
    }




}, 10)


function checkSpawnCookie(picture, odds, onclickfunc){
    if (Math.floor(Math.random()*odds) == 1){
        let randCookie = document.createElement("div");
        randCookie.id = "randcookie" + Math.floor(Math.random()*1000);
        randCookie.classList.add("eCookie");

        document.body.appendChild(randCookie);
        randCookie.innerHTML = "<img src = '"+picture+"' width = '75' onclick = '"+onclickfunc+"(this)'></img>";

        randCookie.style.left = Math.random()*100 + "vh";
        randCookie.style.top = Math.random()*100 + "vh";
        randCookie.style.animation = "e-cookie 5s linear";


        setTimeout(() => {
            randCookie.remove();
        }, 5000);
    }
}




function upgradeBuy(price, currency, elem, effect, linkId, specialtf, otutf) {
    if (currency == "cookies") {
        if (price <= cookies) {
        cookies = cookies-price;
        z = true
        }

        else {
            elem.style.animation = "nomoney 0.4s linear"
            z = false

            setTimeout(()=> {
                elem.style.animation = ""
            }, 400)
        }
    }

    else {
        if (price <= clicks) {
        clicks = clicks-price
        z = true
        }

        else {
            elem.style.animation = "nomoney 0.4s linear"
            z = false

            setTimeout(()=> {
                elem.style.animation = ""
            }, 400)
        }
    }

    if (z) {

        if (specialtf) {
            specialUUnlockedDict[elem.id] = true;
            window[elem.id]();
        }

        if (effect != "null"){

            if (effect[2] == "add") {
                multsActiveDict[effect[0]] = multsActiveDict[effect[0]] + effect[1];
            }

            if (effect[2] == "mult") {
                multsActiveDict[effect[0]] = multsActiveDict[effect[0]] * effect[1];
            }
        }

        if (linkId != "null") {
            for (let i = 0; i < linkId.length; i++) {
                document.getElementById(linkId[i]).style.display = "inline";
            }
            
        }

        if (otutf) {
            elem.remove()
        }
    }
}




//////////////////////////////////////////////////////////////////////////////////////////////////
function eCookiePressed(elem) {
    document.getElementById(elem.parentNode.id).remove();
    multsActiveDict[3] = multsActiveDict[3]*1.1;
    multsActiveDict[1] = multsActiveDict[1]*1.1;
    document.body.style.filter = "sepia(0.8)";
    
     setTimeout(() => {
        document.body.style.filter = "";
        multsActiveDict[3] = multsActiveDict[3]/1.1;
        multsActiveDict[1] = multsActiveDict[1]/1.1;
     },10000)
}

function bejCookiePressed(elem) {
    document.getElementById(elem.parentNode.id).remove();
    multsActiveDict[3] = multsActiveDict[3]*1.5;
    multsActiveDict[1] = multsActiveDict[1]*1.5;
    cookies = cookies + cps*60;
    
     setTimeout(() => {
        multsActiveDict[3] = multsActiveDict[3]/1.5;
        multsActiveDict[1] = multsActiveDict[1]/1.5;
     },10000)
}
function ChronocookiePressed(elem) {
    let origCookies = cookies;

    elem.remove();

    setTimeout(() => {
        cookies = origCookies;
    },5000)
}


function ProtBCookiePressed(elem) {
    document.getElementById(elem.parentNode.id).remove()

    multsActiveDict[4] = multsActiveDict[4]*2

    setTimeout(() => {
        multsActiveDict[4] = multsActiveDict[4]/2
    }, 10000)
}

function WormCookiePressed(elem) {
    document.getElementById(elem.parentnode.id).remove()

    let currentCookies = cookies

    cookies = cookies + cps*60*60*24*31*2

    setTimeout(()=> {
        cookies = currentCookies
    }, 200)
}
//////////////////////////////////////////////////////////////////////////////////////// fix later
function cookieUnlock(cookietype, elem, price) {
    if (cookies >= price) {
        cookies = cookies - price;
        document.getElementById(elem.id).remove();

        cookieUnlockDict[cookietype] = true;
    }

    else {
        elem.style.animation = "nomoney 0.4s linear"

        setTimeout(()=>{
            elem.style.animation = ""
        },400)
    }
}

function cMerchPlace() {
    let cookieMerchant = document.getElementById("cookie-merchant")
    if (cookies >= 750 && cookieMerchant.classList.contains("towers")) {

    cookies = cookies-750;

    document.getElementById("cookie-merchant").classList.add("unbuyable");
    document.getElementById("cookie-merchant").classList.remove("towers");

    document.getElementById("cookie-shop").style.display = "inline";
    }

    else {
        cookieMerchant.style.animation = "nomoney 0.4s linear";

        setTimeout (() => {
            cookieMerchant.style.animation = "none";
        },400)
    }
}

function minigameStart() {
    document.getElementById("minigame").style.display = "inline";
}

function hdayclick() {
    console.log("hdayclick")
}

function gamdice() {
    let randMult = Math.floor(Math.random()*4)+1
    let multEffect = Math.random()*2.1
    multsActiveDict[randMult] = multsActiveDict[randMult] * multEffect
}