// script.js

const cursos = [
  // I Ciclo
  { codigo: "EG-", nombre: "Curso de Arte", creditos: 2, ciclo: "I", requisitos: [] },
  { codigo: "EG-I", nombre: "Humanidades I", creditos: 6, ciclo: "I", requisitos: [] },
  { codigo: "IF1300", nombre: "Introducción a la Computación", creditos: 4, ciclo: "I", requisitos: [] },
  { codigo: "IF1400", nombre: "Lógica para Informáticos", creditos: 2, ciclo: "I", requisitos: [] },
  { codigo: "LM1030", nombre: "Inglés I", creditos: 4, ciclo: "I", requisitos: [] },

  // II Ciclo
  { codigo: "EF-", nombre: "Actividad Deportiva", creditos: 0, ciclo: "II", requisitos: [] },
  { codigo: "EG-II", nombre: "Humanidades II", creditos: 6, ciclo: "II", requisitos: [] },
  { codigo: "IF2000", nombre: "Programación I", creditos: 4, ciclo: "II", requisitos: ["IF1300"] },
  { codigo: "LM1032", nombre: "Inglés II", creditos: 4, ciclo: "II", requisitos: ["LM1030"] },
  { codigo: "MA0320", nombre: "Estructuras Matemáticas", creditos: 4, ciclo: "II", requisitos: [] },

  // III Ciclo
  { codigo: "IF3000", nombre: "Programación II", creditos: 4, ciclo: "III", requisitos: ["IF2000"] },
  { codigo: "IF3001", nombre: "Algoritmos y Estructuras de Datos", creditos: 4, ciclo: "III", requisitos: ["IF2000"] },
  { codigo: "IF3100", nombre: "Introducción a Sistemas de Información", creditos: 3, ciclo: "III", requisitos: ["IF1300"] },
  { codigo: "MA0321", nombre: "Cálculo Diferencial e Integral", creditos: 4, ciclo: "III", requisitos: [] },
  { codigo: "XS0105", nombre: "Estadística para Informáticos", creditos: 3, ciclo: "III", requisitos: [] },

  // IV Ciclo
  { codigo: "IF4000", nombre: "Arquitectura de Computadores", creditos: 3, ciclo: "IV", requisitos: ["IF3000"] },
  { codigo: "IF4001", nombre: "Sistemas Operativos", creditos: 4, ciclo: "IV", requisitos: ["IF3000", "IF3001"] },
  { codigo: "IF4100", nombre: "Fundamentos de Bases de Datos", creditos: 4, ciclo: "IV", requisitos: ["IF3000"] },
  { codigo: "IF5200", nombre: "Fundamentos de las Organizaciones", creditos: 3, ciclo: "IV", requisitos: ["IF3100"] },
  { codigo: "MA0322", nombre: "Álgebra Lineal", creditos: 4, ciclo: "IV", requisitos: ["MA0320", "MA0321"] },

  // V Ciclo
  { codigo: "IF4101", nombre: "Lenguajes para Aplicaciones Comerciales", creditos: 4, ciclo: "V", requisitos: ["IF3100", "IF4100"] },
  { codigo: "IF5000", nombre: "Redes y Comunicaciones de Datos", creditos: 4, ciclo: "V", requisitos: ["IF4001"] },
  { codigo: "IF5100", nombre: "Administración de Bases de Datos", creditos: 4, ciclo: "V", requisitos: ["IF4100"] },
  { codigo: "MA0323", nombre: "Métodos Numéricos", creditos: 4, ciclo: "V", requisitos: ["MA0322"] },
  { codigo: "SR-I", nombre: "Seminario de Realidad Nacional I", creditos: 2, ciclo: "V", requisitos: [] },

  // VI Ciclo
  { codigo: "IF6000", nombre: "Redes en los Negocios", creditos: 4, ciclo: "VI", requisitos: ["IF5000"] },
  { codigo: "IF6100", nombre: "Análisis y Diseño de Sistemas", creditos: 4, ciclo: "VI", requisitos: ["IF5100"] },
  { codigo: "IF6200", nombre: "Economía de la Computación", creditos: 4, ciclo: "VI", requisitos: ["MA0323"] },
  { codigo: "IF6201", nombre: "Informática Aplicada a los Negocios", creditos: 2, ciclo: "VI", requisitos: ["IF5200"] },
  { codigo: "SR-II", nombre: "Seminario de Realidad Nacional II", creditos: 2, ciclo: "VI", requisitos: [] },

  // VII Ciclo
  { codigo: "IF7100", nombre: "Ingeniería de Software", creditos: 4, ciclo: "VII", requisitos: ["IF6100"] },
  { codigo: "IF7101", nombre: "Compromiso Social de la Informática", creditos: 3, ciclo: "VII", requisitos: ["IF7100"] },
  { codigo: "IF7200", nombre: "Métodos Cuantitativos para Decisiones", creditos: 4, ciclo: "VII", requisitos: ["IF6000", "IF6200"] },
  { codigo: "IF7201", nombre: "Gestión de Proyectos", creditos: 3, ciclo: "VII", requisitos: ["IF6200"] },
  { codigo: "OPT453", nombre: "Optativo Temas Especiales", creditos: 3, ciclo: "VII", requisitos: [] },

  // VIII Ciclo
  { codigo: "IF8100", nombre: "Práctica Empresarial Supervisada", creditos: 6, ciclo: "VIII", requisitos: ["IF7100", "IF7201"] },
  { codigo: "IF8200", nombre: "Auditoría Informática", creditos: 4, ciclo: "VIII", requisitos: ["IF7100", "IF7201"] },
  { codigo: "IF8201", nombre: "Planificación Informática", creditos: 4, ciclo: "VIII", requisitos: ["IF7201"] },
  { codigo: "RP-I", nombre: "Repertorio", creditos: 3, ciclo: "VIII", requisitos: [] },
];

let aprobados = new Set();

function renderMalla() {
  const contenedor = document.getElementById("mallaContainer");
  contenedor.innerHTML = "";
  const ciclos = [...new Set(cursos.map(c => c.ciclo))];

  ciclos.forEach(ciclo => {
    const divCiclo = document.createElement("div");
    divCiclo.classList.add("ciclo");
    divCiclo.innerHTML = `<h2>${ciclo} Ciclo</h2>`;

    cursos.filter(c => c.ciclo === ciclo).forEach(curso => {
      const btn = document.createElement("button");
      btn.textContent = curso.nombre;
      btn.classList.add("curso-btn");

      const requisitosCumplidos = curso.requisitos.every(r => aprobados.has(r));

      if (requisitosCumplidos) {
        btn.classList.add("habilitado");
        btn.disabled = false;
        btn.onclick = () => mostrarCurso(curso);
      } else {
        btn.disabled = true;
      }

      if (aprobados.has(curso.codigo)) {
        btn.classList.add("aprobado");
      }

      btn.id = `btn-${curso.codigo}`;
      divCiclo.appendChild(btn);
    });

    contenedor.appendChild(divCiclo);
  });
}

function mostrarCurso(curso) {
  const info = document.getElementById("infoCurso");
  const requisitos = curso.requisitos.length > 0 ? curso.requisitos.join(", ") : "Ninguno";

  info.innerHTML = `
    <h3>${curso.nombre} (${curso.codigo})</h3>
    <p><strong>Créditos:</strong> ${curso.creditos}</p>
    <p><strong>Requisitos:</strong> ${requisitos}</p>
    <button onclick="aprobarCurso('${curso.codigo}')">Aprobar curso</button>
  `;
}

function aprobarCurso(codigo) {
  aprobados.add(codigo);
  renderMalla();
  document.getElementById("infoCurso").innerHTML = `<p>¡Curso ${codigo} aprobado! La malla se ha actualizado.</p>`;
}

renderMalla();
