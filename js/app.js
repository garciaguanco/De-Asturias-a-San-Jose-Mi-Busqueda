// Base de datos simulada de familias investigadas
const familiasData = [
  {
    apellido: "Álvarez de Toledo",
    concejo: "Concejo de Gijón",
    anio: "1783",
    descripcion: "Llegados en la expedición del navío San Sebastián. Se asentaron en la zona norte del solar asignado para la nueva villa.",
    documentos: 2
  },
  {
    apellido: "Fernández de Oviedo",
    concejo: "Concejo de Oviedo",
    anio: "1784",
    descripcion: "Registrados en los primeros padrones de pobladores dedicados a las labores agrícolas y de abasto.",
    documentos: 3
  },
  {
    apellido: "González de Quirós",
    concejo: "Concejo de Quirós",
    anio: "1783",
    descripcion: "Familias vinculadas a la ganadería inicial y estructuración de los primeros solares urbanos.",
    documentos: 1
  },
  {
    apellido: "Valdés y Noreña",
    concejo: "Concejo de Avilés",
    anio: "1785",
    descripcion: "Comerciantes y marinos mercantes que establecieron rutas comerciales fluviales hacia Montevideo.",
    documentos: 4
  },
  {
    apellido: "Rodríguez de Pravia",
    concejo: "Concejo de Pravia",
    anio: "1783",
    descripcion: "Pioneros fundadores presentes en el reparto de tierras dispuesto por los comisionados reales.",
    documentos: 2
  },
  {
    apellido: "Llanes y Cangas",
    concejo: "Concejo de Llanes",
    anio: "1786",
    descripcion: "Familias marineras integradas posteriormente al tejido productivo josefino.",
    documentos: 1
  }
];

// Función para renderizar las tarjetas en el DOM
function renderFamilias(data) {
  const grid = document.getElementById('familiasGrid');
  grid.innerHTML = '';

  if (data.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-12 text-gray-400">
        No se encontraron familias con ese criterio de búsqueda.
      </div>
    `;
    return;
  }

  data.forEach(fam => {
    const card = document.createElement('div');
    card.className = "bg-gray-800/50 border border-gray-700/60 rounded-2xl p-6 hover:border-astur-gold/50 transition-all group";
    card.innerHTML = `
      <div class="flex justify-between items-start mb-4">
        <div>
          <h3 class="text-xl font-bold text-white group-hover:text-astur-gold transition-colors">${fam.apellido}</h3>
          <p class="text-xs text-gray-400">Origen: ${fam.concejo}</p>
        </div>
        <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-900/40 text-blue-300 border border-blue-700/50">${fam.anio}</span>
      </div>
      <p class="text-sm text-gray-300 mb-4 line-clamp-3">
        ${fam.descripcion}
      </p>
      <div class="pt-4 border-t border-gray-700/50 flex justify-between items-center text-xs text-gray-400">
        <span>${fam.documentos} Documentos vinculados</span>
        <span class="text-astur-gold group-hover:translate-x-1 transition-transform flex items-center gap-1 font-medium">Ver detalles &rarr;</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  // Renderizar todas las familias al inicio
  renderFamilias(familiasData);

  // Configurar buscador en tiempo real
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const filtradas = familiasData.filter(fam => 
        fam.apellido.toLowerCase().includes(query) || 
        fam.concejo.toLowerCase().includes(query)
      );
      renderFamilias(filtradas);
    });
  }

  // Manejar envío del formulario de contacto
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.reset();
      formSuccess.classList.remove('hidden');
      setTimeout(() => {
        formSuccess.classList.add('hidden');
      }, 5000);
    });
  }

  // Inicializar iconos de Lucide si están disponibles
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});