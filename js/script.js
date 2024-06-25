const tokenCookieName = "accesstoken";
const signoutBtn = document.getElementById("signout-btn");
const roleCookieName = "role"

signoutBtn.addEventListener("click", signout);

function getRole() {
    return getCookie(roleCookieName)
}

function signout() {
    eraseCookie(tokenCookieName);
    eraseCookie("role")
    window.location.reload();
}


function setToken(token) {
    //le 7 correspond aux jours où les cookies sont valides, date d'expiration. Au bout de 7 jours il faudra donc se reconnecter
    setCookie(tokenCookieName, token, 7);
}

function getToken() {
    return getCookie(tokenCookieName);
}

//script par défaut trouvable sur internet
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function isConnected() {
    if (getToken() == null || getToken() == undefined) {
        return false
    } else {
        return true
    }
}


/*
Les différents rôles existants :
disconnected
connected
    - admin
    - client
*/

function showAndHideElementsForRoles() {
    const userConnected = isConnected();
    const role = getRole();

    let allElementsToEdit = document.querySelectorAll('[data-show]');
    
    allElementsToEdit.forEach(element =>{

        //dataset permet de récupérer toutes les datas
        //data-show aurait pu être data-blabla, il aurait donc fallu mettre dataset.blabla
        //switch nous permet de parcourir toutes les rôles (data-show) possibles
        switch(element.dataset.show){
            case 'disconnected': 
                if(userConnected){
                    //si l'utilisateur est connecté, display none afin de caché les éléments connected
                    element.classList.add("d-none")
                }
                break;
            case 'connected':
                // le ! est une négation
                if(!userConnected){
                    //si l'utilisateur est connecté, display none afin de caché les éléments connected
                    element.classList.add("d-none")
                }
                break;
            case 'admin':
                if(!userConnected || role != "admin"){
                    //si l'utilisateur est connecté, display none afin de caché les éléments connected
                    element.classList.add("d-none")
                }
                break;
            case 'client':
                //si l'utilisateur et déconnecter ou si son rôle est différent de client alors
                if(!userConnected || role != "client"){
                    //si l'utilisateur est connecté, display none afin de caché les éléments connected
                    element.classList.add("d-none")
                }
                break;
        }
    });
}