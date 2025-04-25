import { API_USER_LOGIN, API_USER_REGISTER, API_USER_UPDATE } from './api.js';
import {showLoader, hideLoader} from './modal.js'

async function registrarEstudiante(data) {
    try {
        showLoader();
        const response = await fetch(API_USER_REGISTER + "/estudiante", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || "Error al registrar estudiante");
        }

        Swal.fire({
            title: "Registro Exitoso!",
            text: "El estudiante ha sido registrado correctamente.",
            icon: "success"
          });
    } catch (error) {
        const errorInfo = JSON.parse(error.message);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errorInfo.info,
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#3085d6",
          });
    }finally{
        hideLoader();
    }
}

async function registrarFuncionario(data) {
    try {
        showLoader();
        const response = await fetch(API_USER_REGISTER + "/funcionario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || "Error al registrar funcionario");
        }

        Swal.fire({
            title: "Registro Exitoso!",
            text: "El funcionario ha sido registrado correctamente.",
            icon: "success"
          });
    } catch (error) {
        const errorInfo = JSON.parse(error.message);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errorInfo.info,
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#3085d6",
          });
    }finally{
        hideLoader();
    }
}

async function login(data) {
    try {
        showLoader();
        const response = await fetch(API_USER_LOGIN, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const responseText = await response.text();

        if (!response.ok) {
            // Intentamos parsear el texto a JSON si se puede
            let message = responseText;
            try {
                const json = JSON.parse(responseText);
                message = json.info || JSON.stringify(json);
            } catch (e) {
                // No es JSON, dejamos el texto tal cual
            }

            throw new Error(message);
        }

        const userData = JSON.parse(responseText);
        localStorage.setItem("userType", userData.tipoUsuario);
        localStorage.setItem("admin", userData.admin);
        localStorage.setItem("username", userData.nombreUsuario);
        localStorage.setItem("email", userData.emailUsuario);
        localStorage.setItem("rutaImg", userData.rutaImg);

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#3085d6",
        });
    }finally{
        hideLoader();
    }
}

async function actualizarContrasena(data) {
    try {
        showLoader();
        const response = await fetch(API_USER_UPDATE + "/contrasena", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const responseText = await response.text();

        if (!response.ok) {
            let message = responseText;
            try {
                const json = JSON.parse(responseText);
                message = json.info || JSON.stringify(json);
            } catch (e) {
                // No es JSON, se mantiene el texto crudo
            }
            throw new Error(message);
        }

        const result = JSON.parse(responseText);

        Swal.fire({
            title: "¡Contraseña actualizada!",
            text: result.info || "Tu contraseña se actualizó correctamente.",
            icon: "success"
        });

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#3085d6",
        });
    } finally {
        hideLoader();
    }
}



export { registrarEstudiante, registrarFuncionario, login, actualizarContrasena };
