const PRO = false; // true = TOMCAT EXTERNO || false = TOMCAT EMBEBIDO

const API_BASE_URL = "http://localhost:8080/pag-eventos-institucionales-back-0.0.1-SNAPSHOT";
const API_BASE_URL_PRUEBA = "http://localhost:8080";

const API_URL = PRO ? API_BASE_URL : API_BASE_URL_PRUEBA;

const API_USER = API_URL + "/usuarios";
const API_USER_LOGIN = API_USER + "/login";
const API_USER_REGISTER = API_USER + "/registro";

export {API_USER_REGISTER, API_USER_LOGIN};