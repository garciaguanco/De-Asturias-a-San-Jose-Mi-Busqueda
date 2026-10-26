// Base de datos de la investigación genealógica de San José de Mayo (1783)
const familiasData = [
  {
    apellido: "Muñiz Fernández (Línea Directa)",
    concejo: "La Piñera, Concejo de Morcín",
    anio: "1783",
    oficio: "Labrador",
    integrantes: "Manuel Antonio Muñiz (35) y Serafina Fernández (35). Hijos: José (11) [Línea Antepasada Directa], Manuela (9), Manuel (7), María (4).",
    descripcion: "Padres de Manuel: Pedro Muñiz y Sevastiana Hernández. Arribaron en la expedición fundacional. Manuel se desempeñaba como labrador en La Piñera.",
    documentos: 4,
    destacado: true
  },
  {
    apellido: "Fernández (Línea Agregada)",
    concejo: "La Piñera, Concejo de Morcín",
    anio: "1783",
    oficio: "Poblador soltero",
    integrantes: "José Fernández (20 años), primo hermano de Serafina Fernández.",
    descripcion: "Viajó integrado a la unidad familiar de Manuel Antonio Muñiz en calidad de soltero en la nómina de pobladores de 1783.",
    documentos: 2,
    destacado: false
  },
  {
    apellido: "Muñiz (Otras Ramas Pobladoras)",
    concejo: "Principado de Asturias",
    anio: "1783",
    oficio: "Pobladores fundadores",
    integrantes: "Familias Muñiz registradas en la nómina de 40 familias.",
    descripcion: "Pobladores portadores del apellido Muñiz en la expedición original. En proceso de análisis documental para confirmar o descartar parentesco colateral.",
    documentos: 1,
    destacado: false
  },
  {
    apellido: "Fernández (Otras Ramas Pobladoras)",
    concejo: "Principado de Asturias",
    anio: "1783",
    oficio: "Pobladores fundadores",
    integrantes: "Familias Fernández registradas en el contingente de 1783.",
    descripcion: "Registros parroquiales y de embarque en revisión para cotejar posibles enlaces de consanguinidad con Serafina y José Fernández.",
    documentos: 1,
    destacado: false
  }
];

// Función para renderizar las tarjetas en el DOM
function renderFamilias(data) {
  const grid = document.getElementById('familiasGrid');
  if (!grid) return;
  
  grid.innerHTML = '';

  if (data.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-12 text-gray-400">
        No se encontraron registros con ese criterio de búsqueda.
      </div>
    `;
    return;
  }

  data.forEach(fam => {
    const card = document.createElement('div');
    const borderClass = fam.destacado ? 'border-astur-gold/80 bg-astur-blue/10' : 'border-gray-700/60 bg-gray-800/50';
    
    card.className = `${borderClass} border rounded-2xl p-6 hover:border-astur-gold transition-all group relative overflow-hidden`;
    
    card.innerHTML = `
      ${fam.destacado ? '<div class="absolute top-0 right-0 bg-astur-gold text-gray-950 font-extrabold text-[10px] uppercase px-3 py-1 rounded-bl-xl tracking-wider">Línea Directa</div>' : ''}
      <div class="flex justify-between items-start mb-3">
        <div>
          <h3 class="text-xl font-bold text-white group-hover:text-astur-gold transition-colors">${fam.apellido}</h3>
          <p class="text-xs text-astur-gold/90 font-medium">${fam.concejo}</p>
        </div>
        <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-900/40 text-blue-300 border border-blue-700/50">${fam.anio}</span>
      </div>
      
      <p class="text-xs text-gray-400 font-semibold mb-2">Oficio: <span class="text-gray-200 font-normal">${fam.oficio}</span></p>
      <p class="text-xs text-gray-400 font-semibold mb-3">Integrantes: <span class="text-gray-300 font-normal">${fam.integrantes}</span></p>
      
      <p class="text-sm text-gray-300 mb-4 leading-relaxed">
        ${fam.descripcion}
      </p>
      
      <div class="pt-4 border-t border-gray-700/50 flex justify-between items-center text-xs text-gray-400">
        <span class="flex items-center gap-1.5"><i data-lucide="file-text" class="w-3.5 h-3.5 text-astur-gold"></i> ${fam.documentos} Registros vinculados</span>
        <span class="text-astur-gold group-hover:translate-x-1 transition-transform flex items-center gap-1 font-medium cursor-pointer">Ver expediente &rarr;</span>
      </div>
    `;
    grid.appendChild(card);
  });

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  renderFamilias(familiasData);

  // Lógica del Botón Expandir/Ocultar detalles históricos
  const toggleExpandBtn = document.getElementById('toggleExpandBtn');
  const expandableContent = document.getElementById('expandableContent');
  const expandIcon = document.getElementById('expandIcon');
  const expandBtnText = document.getElementById('expandBtnText');

  if (toggleExpandBtn && expandableContent) {
    toggleExpandBtn.addEventListener('click', () => {
      const isHidden = expandableContent.classList.contains('hidden');
      if (isHidden) {
        expandableContent.classList.remove('hidden');
        expandIcon.style.transform = 'rotate(180deg)';
        expandBtnText.textContent = 'Ocultar detalles históricos';
      } else {
        expandableContent.classList.add('hidden');
        expandIcon.style.transform = 'rotate(0deg)';
        expandBtnText.textContent = 'Ver más detalles históricos (52 familias y pobladores)';
      }
    });
  }

  // Buscador
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const filtradas = familiasData.filter(fam => 
        fam.apellido.toLowerCase().includes(query) || 
        fam.concejo.toLowerCase().includes(query) ||
        fam.integrantes.toLowerCase().includes(query) ||
        fam.descripcion.toLowerCase().includes(query)
      );
      renderFamilias(filtradas);
    });
  }

  // Envío AJAX del formulario a Formspree
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(contactForm);
      const action = contactForm.action;

      try {
        const response = await fetch(action, {
          method: 'POST',
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          contactForm.reset();
          alert('¡Gracias! Tu mensaje ha sido enviado exitosamente a los investigadores.');
        } else {
          alert('Hubo un problema al enviar el mensaje. Inténtalo de nuevo.');
        }
      } catch (error) {
        alert('Ocurrió un error de conexión al enviar el mensaje.');
      }
    });
  }

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});