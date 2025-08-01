const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSSLgGNN4yJJhCNSFpAgYDyd_jfY6dK7RA0VVhtz73qb18kHh0Cs16T-XOlrUYDcLsf_JJdYlYJWg-q/pub?gid=0&single=true&output=csv';

const input = document.getElementById("documento");
const consultarBtn = document.getElementById("consultarBtn");
const limpiarBtn = document.getElementById("limpiarBtn");
const resultado = document.getElementById("resultado");

consultarBtn.addEventListener("click", async () => {
  const doc = input.value.trim();
  resultado.innerHTML = "<p>Buscando datos...</p>";

  try {
    const res = await fetch(sheetURL);
    const text = await res.text();
    const rows = text.trim().split("\n").map(r => r.split(","));
    const headers = rows[0].map(h => h.trim());
    const fila = rows.find(r => r[0] === doc);

    if (!fila) {
      resultado.innerHTML = "<p style='text-align:center;'>No se encontró información.</p>";
      return;
    }

    const datos = Object.fromEntries(headers.map((h, i) => [h, (fila[i] || "").trim()]));

    const estadoChalecoColor = datos.Estado_Chaleco?.toLowerCase() === "vigente" ? "green" : "red";
    const estadoLicColor = datos.Estado_Lic?.toLowerCase() === "vigente" ? "green" : "red";

    resultado.innerHTML = `
      <div class="card">
        <h3>DATOS GENERALES</h3>
        <p><strong>Jerarquía:</strong> ${datos.Jerarquía || '-'}</p>
        <p><strong>Nombre y Apellido:</strong> ${datos.Nombre_Apellido || '-'}</p>
        <p><strong>Dependencia:</strong> ${datos.Dependencia || '-'}</p>
      </div>

      <div class="card">
        <h3>ARMAMENTO</h3>
        <p><strong>Marca:</strong> ${datos.Marca_Arma || '-'}</p>
        <p><strong>Modelo:</strong> ${datos.Modelo_Arma || '-'}</p>
        <p><strong>Serie:</strong> ${datos.Serie_Arma || '-'}</p>
        <p><strong>Calibre:</strong> ${datos.Calibre_Arma || '-'}</p>
        <p><strong>Cargadores:</strong> ${datos.Cargadores || '-'}</p>
      </div>

      <div class="card">
        <h3>CHALECO PROVISTO</h3>
        <p><strong>Marca:</strong> ${datos.Marca_Chaleco || '-'}</p>
        <p><strong>Modelo:</strong> ${datos.Modelo_Chaleco || '-'}</p>
        <p><strong>Serie:</strong> ${datos.Serie_Chaleco || '-'}</p>
        <p><strong>Vencimiento:</strong> ${datos.Venc_Chaleco || '-'}</p>
        <p><strong>Estado:</strong> <span style="color:${estadoChalecoColor}; font-weight: bold;">${datos.Estado_Chaleco || '-'}</span></p>
      </div>

      <div class="card">
        <h3>LICENCIA DE CONDUCIR</h3>
        <p><strong>Categoría:</strong> ${datos.Categoria_Lic || '-'}</p>
        <p><strong>Municipio:</strong> ${datos.Municipio_Lic || '-'}</p>
        <p><strong>Otorgamiento:</strong> ${datos.Otorgamiento_Lic || '-'}</p>
        <p><strong>Vencimiento:</strong> ${datos.Vencimiento_Lic || '-'}</p>
        <p><strong>Estado:</strong> <span style="color:${estadoLicColor}; font-weight: bold;">${datos.Estado_Lic || '-'}</span></p>
      </div>
    `;
  } catch (error) {
    resultado.innerHTML = "<p style='text-align:center;color:red;'>Error al consultar datos.</p>";
    console.error(error);
  }
});

limpiarBtn.addEventListener("click", () => {
  input.value = "";
  resultado.innerHTML = "";
});
