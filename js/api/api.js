const PRO = true; // true = TOMCAT EXTERNO || false = TOMCAT EMBEBIDO

const API_BASE_URL = "https://pag-eventos-institucionales-back.onrender.com";
const API_BASE_URL_PRUEBA = "http://localhost:8080";

const API_URL = PRO ? API_BASE_URL : API_BASE_URL_PRUEBA;

const API_USER = API_URL + "/usuarios";
const API_USER_LOGIN = API_USER + "/login";
const API_USER_REGISTER = API_USER + "/registro";

const API_USER_UPDATE = API_USER + "/actualizar";
const API_USER_DELETE = API_USER + "/eliminar"


const API_PROGRAM = API_URL + "/programas";
const API_CARG = API_URL + "/cargos";

export {API_USER_REGISTER, API_USER_LOGIN, API_USER_UPDATE, API_USER_DELETE ,API_PROGRAM, API_CARG};