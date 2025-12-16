const VALID_USERS = {
    'admin': '1234',
    'tecnico1': 'pass01',
    'recepcionista': 'pass02'
};

function simulatedLogin() {
    const usernameInput = document.getElementById('username').value.trim();
    const passwordInput = document.getElementById('password').value.trim();
    const statusDiv = document.getElementById('login-status');

    statusDiv.style.display = 'block';

    if (VALID_USERS[usernameInput] === passwordInput) {
        
        
        statusDiv.style.backgroundColor = '#ddffdd';
        statusDiv.style.color = '#28a745';
        statusDiv.textContent = ` Acceso Autorizado. Bienvenido, ${usernameInput}.`;

        
        document.getElementById('login').classList.add('hidden');
        document.querySelector('header').classList.remove('hidden'); 
        document.getElementById('main-content').classList.remove('hidden');
        
        
        initializePageFeatures();

    } else {
        
        statusDiv.style.backgroundColor = '#ffdddd';
        statusDiv.style.color = '#dc3545';
        
        if (usernameInput === '' || passwordInput === '') {
            statusDiv.textContent = 'Error: Por favor, introduce usuario y contraseña.';
        } else {
            statusDiv.textContent = ' Error: Credenciales incorrectas o usuario no encontrado.';
        }
    }
}


function initializePageFeatures() {
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); 
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                
                const headerHeight = 56; 
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight, 
                    behavior: 'smooth'
                });
            }
        });
    });

    
    const sections = document.querySelectorAll('#main-content section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    const handleScroll = () => {
        let current = '';
        const targetSectionIds = ['inicio', 'dashboard', 'servicios', 'registro', 'api', 'contacto'];
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            if (!targetSectionIds.includes(section.id)) return;
            
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
}



function simulatedApiAddProduct() {
    const nombreInput = document.getElementById('nombre-producto');
    const precioInput = document.getElementById('precio-producto');
    const statusDiv = document.getElementById('api-status');
    const repuestosList = document.getElementById('repuestos-list');

    const nombre = nombreInput.value.trim();
    const precio = parseFloat(precioInput.value.trim());

    if (!nombre || isNaN(precio) || precio <= 0) {
        statusDiv.style.display = 'block';
        statusDiv.style.backgroundColor = '#ffdddd';
        statusDiv.style.border = '1px solid #ff4444';
        statusDiv.style.color = '#ff4444';
        statusDiv.textContent = 'Error: Completa todos los campos con valores válidos.';
        return;
    }
    
    statusDiv.style.display = 'block';
    statusDiv.style.backgroundColor = '#ffffcc';
    statusDiv.style.border = '1px solid #ffc107';
    statusDiv.style.color = '#333';
    statusDiv.textContent = ' Llamando a la API... (Simulación)';

    setTimeout(() => {
        
        statusDiv.style.backgroundColor = '#ddffdd';
        statusDiv.style.border = '1px solid #28a745';
        statusDiv.style.color = '#28a745';
        statusDiv.textContent = ` API Response 201: Repuesto "${nombre}" agregado.`;

        const newItem = document.createElement('li');
        newItem.className = 'p-2 mb-2 rounded border-start border-primary border-4'; 
        newItem.innerHTML = ` ${nombre} - <b>${precio.toFixed(2)} Bs</b> (Agregado vía API)`;
        repuestosList.appendChild(newItem);

        nombreInput.value = '';
        precioInput.value = '';
        
    }, 1500); 
}
