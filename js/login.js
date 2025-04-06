document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
  
    try {
        const response = await fetch(`${API_BASE_URL}/usuarios/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ correo: email, contrasena: password }),
        });
      
        const text = await response.text();
      
        try {
          const data = JSON.parse(text);
      
          if (response.ok) {
            alert(`Login exitoso. ¿Es admin?: ${data.admin}`);
          } else {
            alert(`Error: ${data.message || "Credenciales inválidas"}`);
          }
        } catch (jsonError) {
          alert("Respuesta inesperada del servidor (no es JSON):\n" + text);
        }
      
      } catch (error) {
        alert("Error de red: " + error.message);
      }
      
  });
  