# BiblioInfo — Plataforma de Reseñas de Libros
> **Evaluación del Componente Práctico Web | Desarrollo Full Stack (React + Node.js/Express + Persistencia JSON)**  
> **Temática Asignada:** Opción 6 — *Reseñas de libros* (Publicar y consultar reseñas con libro, autor de la reseña, email, fecha, género y contenido de la reseña).

---

## Datos del Equipo y Distribución del Trabajo

**Temática Seleccionada:** Opción 6 — *Reseñas de libros*.  

| N.° | Integrante | Rol Principal | Actividad Técnica Asignada |
|:---:|:---|:---|:---|
| **1** | **Danilo** | **Backend Lead** | Desarrollo de la API REST en Express (`GET` y `POST /registros`), validación en servidor, generación de UUID y persistencia atómica en `reviews.json` con `fs/promises`. |
| **2** | **Darly** | **Formularios y Validaciones** | Formulario controlado con `useState`, validaciones en tiempo real en cliente (correo, fechas no futuras, requeridos) y componentes de alertas (`ReviewForm`, `AlertMessage`). |
| **3** | **Francisco** | **Frontend Lead** | Configuración de SPA con `react-router-dom` (`/`, `/registro`, `/lista`), servicio `api.js` (Fetch API), consumo con `useEffect`, buscador en tiempo real y filtros por género. |
| **4** | **Gabriel** | **QA, Pruebas y Documentación** | Componentes reutilizables (`Navbar`, `Footer`, `ReviewCard`, `Spinner`), verificación de persistencia tras reinicio, auditoría de Git y redacción del informe de entrega. |

---

## Flujo de Datos de Extremo a Extremo

El sistema opera bajo un flujo continuo y desacoplado cliente-servidor:

```
[Formulario React (/registro)]
         │
         ▼ (Validación en Cliente)
   Petición HTTP POST (JSON)
         │
         ▼
[API REST Express (Puerto 5000)] ──► Middleware CORS & express.json()
         │
         ▼ (Validación en Servidor + UUID)
[Escritura Asíncrona (fs/promises)]
         │
         ▼
[Archivo data/reviews.json] ◄── Almacenamiento Persistente
         │
         ▲
[Lectura Asíncrona (fs/promises)]
         │
         ▲
   Petición HTTP GET /registros
         │
         ▲
[Consulta y Renderizado en React (/lista)] ──► Estados: Carga, Lista vacía, Tarjetas
```

1. **Captura:** El usuario diligencia el formulario en React (`/registro`). Las entradas se controlan en el estado local con validaciones instantáneas.
2. **Envío:** Al enviar datos válidos, el servicio `api.js` ejecuta un `POST` con encabezado `Content-Type: application/json` hacia `http://localhost:5000/registros`.
3. **Procesamiento:** Express recibe la carga útil, valida obligatoriedad, formato de correo, fecha no futura y rangos de calificación.
4. **Persistencia:** Si es válida, asigna un ID único con `crypto.randomUUID()` y la guarda en `backend/data/reviews.json` sin perder los registros previos.
5. **Consulta:** En la ruta `/lista`, un hook `useEffect` realiza un `GET` a la API, renderizando el catálogo interactivo o los estados correspondientes (carga, lista vacía o error).

---

## Estructura de Carpetas del Proyecto

El repositorio organiza el frontend y el backend en carpetas separadas dentro de la misma raíz:

```text
Biblioinfo/
├── README.md                          # Documentación final con requisitos de entrega
├── .gitignore                         # Exclusión de node_modules, dist, logs y secretos
├── backend/                           # Servidor Node.js con Express
│   ├── data/
│   │   └── reviews.json               # Almacenamiento persistente en formato JSON
│   ├── src/
│   │   ├── controllers/
│   │   │   └── reviewsController.js   # Manejo de peticiones y respuestas (GET y POST)
│   │   ├── routes/
│   │   │   └── reviewsRoutes.js       # Enrutamiento de la API (/registros)
│   │   ├── utils/
│   │   │   ├── fileHandler.js         # Lectura y escritura atómica con fs/promises
│   │   │   └── validator.js           # Validaciones estrictas de reglas de negocio
│   │   └── server.js                  # Inicialización de Express, CORS y puerto 5000
│   ├── package.json                   # Dependencias y scripts del backend
│   └── package-lock.json              # Bloqueo determinista de dependencias backend
└── frontend/                          # Cliente SPA desarrollado en React + Vite
    ├── public/                        # Recursos públicos y favicon
    ├── src/
    │   ├── components/                # Componentes reutilizables
    │   │   ├── form/                  # Subcomponentes modulares de formulario
    │   │   ├── Navbar.jsx             # Navegación accesible con indicador activo
    │   │   ├── Footer.jsx             # Pie de página institucional
    │   │   ├── ReviewForm.jsx         # Formulario controlado de registro
    │   │   ├── ReviewCard.jsx         # Tarjeta de visualización de cada reseña
    │   │   ├── BookCover.jsx          # Portada literaria dinámica
    │   │   ├── AlertMessage.jsx       # Alertas de confirmación y error
    │   │   └── Spinner.jsx            # Indicador de estado de carga
    │   ├── context/                   # Estado global de tema (modo claro / oscuro)
    │   ├── pages/                     # Páginas principales del enrutador
    │   │   ├── Home.jsx               # Ruta '/' (Bienvenida y navegación)
    │   │   ├── Register.jsx           # Ruta '/registro' (Formulario)
    │   │   ├── ReviewList.jsx         # Ruta '/lista' (Catálogo y filtros)
    │   │   └── BookDetail.jsx         # Ruta '/libro/:id' (Ficha detallada)
    │   ├── services/
    │   │   ├── api.js                 # Métodos Fetch centralizados (GET y POST)
    │   │   └── bookSearch.js          # Búsqueda complementaria de metadatos
    │   ├── styles/
    │   │   └── index.css              # Estilos base y variables responsivas
    │   ├── utils/                     # Validadores y utilidades de paleta
    │   ├── App.jsx                    # Enrutador principal de React
    │   └── main.jsx                   # Montaje en el DOM
    ├── index.html                     # Plantilla HTML con metadatos SEO
    ├── package.json                   # Dependencias y scripts del frontend
    └── package-lock.json              # Bloqueo determinista de dependencias frontend
```

---

##  Requisitos Previos e Instalación

### Prerrequisitos
- **Node.js:** Versión 18.x o superior instalada.
- **npm:** Gestor de paquetes incluido con Node.js.
- **Git:** Para control de versiones.

### Paso 1: Clonar el Repositorio
```bash
git clone https://github.com/FranciscoArias10/Biblioinfo.git
cd Biblioinfo
```

### Paso 2: Instalación y Ejecución del Backend (Puerto 5000)
Abra una primera terminal:
```bash
cd backend
npm install
npm run dev
# o bien: npm start
```
El servidor backend iniciará en: **`http://localhost:5000`**

### Paso 3: Instalación y Ejecución del Frontend (Puerto 5173)
Abra una segunda terminal independiente:
```bash
cd frontend
npm install
npm run dev
```
La aplicación React iniciará en: **`http://localhost:5173`**

---

## Especificación y Ejemplos de la API REST

### Endpoints Disponibles

| Método | Ruta | Descripción | Códigos de Respuesta |
|:---:|:---|:---|:---:|
| `GET` | `/registros` | Retorna todas las reseñas registradas (soporta `?genero=`) | `200 OK`, `500 Internal Error` |
| `POST` | `/registros` | Valida, asigna UUID y guarda una nueva reseña en JSON | `201 Created`, `400 Bad Request`, `500 Internal Error` |

---

### Ejemplo 1: Consultar Reseñas (`GET /registros`)
**Petición:**
```bash
curl -X GET http://localhost:5000/registros
```

**Respuesta Exitosa (`200 OK`):**
```json
[
  {
    "id": "9d51fd3d-d42f-4729-818a-57648e8c7f95",
    "libro": "El Nombre de la Rosa",
    "autorLibro": "Umberto Eco",
    "nombre": "Mateo Silva",
    "email": "mateo.silva@correo.com",
    "genero": "Misterio",
    "fecha": "2026-10-12",
    "calificacion": 5,
    "descripcion": "Una apasionante novela de misterio eclesiástico en una abadía benedictina del siglo XIV.",
    "createdAt": "2026-10-13T00:46:41.486Z"
  }
]
```

---

### Ejemplo 2: Registrar una Reseña Válida (`POST /registros`)
**Encabezados:** `Content-Type: application/json`  
**Cuerpo de la Petición:**
```json
{
  "libro": "El Principito",
  "autorLibro": "Antoine de Saint-Exupéry",
  "nombre": "Carlos Gómez",
  "email": "carlos.gomez@correo.com",
  "genero": "Ficción",
  "fecha": "2026-10-10",
  "calificacion": 5,
  "descripcion": "Un clásico imprescindible con lecciones eternas sobre la vida, el amor y la amistad."
}
```

**Respuesta Exitosa (`201 Created`):**
```json
{
  "success": true,
  "message": "Reseña registrada con éxito",
  "data": {
    "id": "c1f7a220-4df7-4fa5-9831-4ce88d22d21a",
    "libro": "El Principito",
    "autorLibro": "Antoine de Saint-Exupéry",
    "nombre": "Carlos Gómez",
    "email": "carlos.gomez@correo.com",
    "genero": "Ficción",
    "fecha": "2026-10-10",
    "calificacion": 5,
    "descripcion": "Un clásico imprescindible con lecciones eternas sobre la vida, el amor y la amistad.",
    "createdAt": "2026-10-15T22:30:00.000Z"
  }
}
```

---

### Ejemplo 3: Envío con Datos Inválidos (`POST /registros`)
**Cuerpo con errores:**
```json
{
  "libro": "",
  "email": "correo-invalido",
  "fecha": "2030-01-01",
  "descripcion": "Corta"
}
```

**Respuesta de Error de Validación (`400 Bad Request`):**
```json
{
  "success": false,
  "message": "Errores de validación en la solicitud",
  "errors": [
    "El título del libro es obligatorio y debe tener al menos 2 caracteres",
    "El formato de correo electrónico es inválido",
    "La fecha de la reseña no puede ser futura",
    "La descripción debe contener al menos 15 caracteres"
  ]
}
```

---

## Verificación de Requisitos Técnicos y Persistencia

### 1. Pruebas de Funcionamiento Realizadas
- **Registro Correcto:** El formulario envía los datos con POST, el servidor responde con 201, se visualiza la alerta de éxito y el usuario es redirigido a `/lista`, donde la nueva reseña aparece de inmediato.
- **Rechazo de Datos Inválidos:** Tanto el cliente como el servidor impiden el envío de campos vacíos, correos mal formados o fechas futuras, mostrando mensajes claros.
- **Estados de Interfaz:** Se probó el estado de carga (`Spinner`), el estado de lista vacía cuando no hay coincidencias con el buscador o filtro, y el estado de error ante desconexión de red.
- **Diseño Responsivo:** Verificado en pantallas móviles (<640px), tablets (768px) y monitores de escritorio (>=1024px).

### 2. Prueba de Persistencia tras Reinicio del Backend
1. Iniciar backend con `npm start` y registrar una reseña desde `/registro`.
2. Detener completamente el servidor Node.js presionando `Ctrl + C` en la terminal.
3. Volver a iniciar el servidor con `npm start`.
4. Ingresar a `/lista` en React y ejecutar `curl http://localhost:5000/registros`.
5. **Resultado comprobado:** Todas las reseñas guardadas persisten intactas en `backend/data/reviews.json`.

---

