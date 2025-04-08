import { API_USER_LOGIN, API_USER_REGISTER } from './api.js';

async function registrarEstudiante(data) {
    try {
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
    }
}

async function registrarFuncionario(data) {
    try {
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
    }
}

async function login(data) {
    try {
        const response = await fetch(API_USER_LOGIN, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || "Error al iniciar sesión");
        }

        const userData = await response.json();
        
        localStorage.setItem("userType", userData.tipoUsuario);
        localStorage.setItem("admin", userData.admin);
        localStorage.setItem("username", userData.nombreUsuario);
    } catch (error) {
        const errorInfo = JSON.parse(error.message);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errorInfo.info,
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#3085d6",
          });
    }
}

export { registrarEstudiante, registrarFuncionario, login };
