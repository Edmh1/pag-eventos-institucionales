const PRO = true; // true = TOMCAT EXTERNO || false = TOMCAT EMBEBIDO

const API_BASE_URL = "https://pag-eventos-institucionales-back.onrender.com";
const API_BASE_URL_PRUEBA = "http://localhost:8080";

const API_URL = PRO ? API_BASE_URL : API_BASE_URL_PRUEBA;

/////////////////////////////////////////////////////////////////////////////
//api usuario
const API_USER = API_URL + "/usuarios";
const API_USER_LOGIN = API_USER + "/login";
const API_USER_REGISTER = API_USER + "/registro";

const API_USER_UPDATE = API_USER + "/actualizar";
const API_USER_DELETE = API_USER + "/eliminar"

const API_PROGRAM = API_URL + "/programas";
const API_CARG = API_URL + "/cargos";

/////////////////////////////////////////////////////////////////////////////
//api eventos
const API_EVENTO = API_URL + "/eventos";
const API_EVENTO_CONTAR = API_EVENTO + "/contar";
const API_TIPO_EVENTO = API_URL + "/tipos-evento";

//////////////////////////////////////////////////////////////////////////////////
//carga api
async function esperarBackend() {
    const intentos = PRO ? 20 : 0;
    const intervalo = 3000; 
    if (!PRO){
        console.log("Modo desarrollo: salto la espera del backend");
        return true;
    } 

    for (let i = 0; i < intentos; i++) {
        try {
            const res = await fetch(API_EVENTO + "/status");
            if (res.ok) {
                return true;
            }
            console.log(`Intento ${i + 1}: Backend no disponible`);
        } catch (e) {
            console.log(`Intento ${i + 1}: Backend aún no disponible`);
        }

        await new Promise(resolve => setTimeout(resolve, intervalo));
    }

    throw new Error("⛔ No se pudo conectar con el servidor. Intenta más tarde.");
}


export {esperarBackend,
    API_USER_REGISTER, API_USER_LOGIN, API_USER_UPDATE, API_USER_DELETE ,API_PROGRAM, API_CARG
,API_EVENTO_CONTAR, API_EVENTO, API_TIPO_EVENTO
};