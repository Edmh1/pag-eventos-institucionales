document.getElementById("registroEstudianteForm").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const nombre = document.getElementById("nombreEstudiante").value;
    const correo = document.getElementById("correoEstudiante").value;
    const contrasena = document.getElementById("contrasenaEstudiante").value;
  
    try {
      const response = await fetch(`${API_BASE_URL}/registro/estudiante`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombreCompleto: nombre, correo, contrasena }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Estudiante registrado correctamente");
      } else {
        alert(`Error: ${data.message || "No se pudo registrar"}`);
      }
    } catch (error) {
      alert("Error de red: " + error.message);
    }
  });
  
  document.getElementById("registroFuncionarioForm").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const nombre = document.getElementById("nombreFuncionario").value;
    const correo = document.getElementById("correoFuncionario").value;
    const contrasena = document.getElementById("contrasenaFuncionario").value;
    const cargo = document.getElementById("cargoFuncionario").value;
  
    try {
      const response = await fetch(`${API_BASE_URL}/registro/funcionario`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombreCompleto: nombre, correo, contrasena, cargo }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Funcionario registrado correctamente");
      } else {
        alert(`Error: ${data.message || "No se pudo registrar"}`);
      }
    } catch (error) {
      alert("Error de red: " + error.message);
    }
  });
  