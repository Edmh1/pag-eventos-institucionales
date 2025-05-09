const IMGUR_CLIENT_ID = "417179d99a680bc"; // Solo necesitas este

async function subirImagenAImgur(file) {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onloadend = async () => {
            const base64 = reader.result.split(',')[1];

            try {
                const res = await fetch("https://api.imgur.com/3/image", {
                    method: "POST",
                    headers: {
                        Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ image: base64 })
                });

                const data = await res.json();

                if (data.success) {
                    resolve(data.data.link);
                } else {
                    reject("Error al subir: " + data.data.error);
                }
            } catch (err) {
                reject("Error de red: " + err.message);
            }
        };

        reader.readAsDataURL(file);
    });
}


export { subirImagenAImgur };