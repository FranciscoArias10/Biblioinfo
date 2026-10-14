# 📚 BiblioInfo — Contexto del Proyecto y Plan de Trabajo

> **Evaluación Práctica Web:** React + Node.js (Express) + Almacenamiento JSON  
> **Temática Seleccionada:** Opción 6 — *Reseñas de libros*  
> **Puntaje Total:** 30 Puntos (20 pts Video Grupal + 10 pts Pregunta Técnica Individual)  
> **Estado:** En desarrollo (Backend listo / Frontend en fase de integración)

---

## 📌 1. Contexto General y Reglas de la Evaluación

### 1.1. Propósito de la Aplicación
**BiblioInfo** es una Single Page Application (SPA) para una comunidad de lectores donde los usuarios pueden:
1. Conocer la plataforma y navegar por sus secciones (`/`).
2. Publicar reseñas literarias mediante un formulario con validaciones (`/registro`).
3. Consultar y filtrar las reseñas existentes almacenadas en el servidor (`/lista`).

### 1.2. Reglas Críticas de Aprobación
* **Exclusividad de Temática:** Ningún otro grupo del curso puede tener la temática de *Reseñas de libros*. Se debe conservar una captura del registro compartido del curso como evidencia obligatoria en el PDF final.
* **Flujo de Extremo a Extremo:** Formulario React $\rightarrow$ Petición HTTP $\rightarrow$ API Express $\rightarrow$ Archivo JSON (`reviews.json`) $\rightarrow$ Consulta y renderizado en React.
* **Persistencia sin BD Externa:** Toda la información se guarda y consulta desde un archivo local JSON utilizando `fs/promises`. Los datos deben sobrevivir al reinicio del backend.
* **Evaluación Individual (10 Puntos):** Cada uno de los 4 integrantes defenderá el código respondiendo una pregunta técnica en clase.
* **Video Grupal (20 Puntos):** Video demostrativo de entre 20 y 30 minutos donde intervienen los 4 estudiantes en 7 etapas definidas.

---

## 👥 2. Estructura del Equipo y Distribución de Roles

| N.° | Integrante | Rol en el Proyecto | Responsabilidad Técnica Principal |
| :---: | :---| :---| :---|
| **1** | **Danilo** | **Backend Lead** | API REST en Express, endpoints (`GET` y `POST /registros`), validaciones de servidor, persistencia `fs/promises`. |
| **2** | **Darly** | **Forms & Validations** | Formulario controlado con `useState`, validaciones en tiempo real en cliente y alertas de feedback (`ReviewForm`, `AlertMessage`). |
| **3** | **Francisco** | **Frontend Lead** | Enrutador SPA (`react-router-dom`), servicio `api.js` (fetch), catálogo con `useEffect`, filtros por género y buscador. |
| **4** | **Gabriel** | **QA, UI & Documentación** | Componentes UI (`ReviewCard`, `Spinner`), pruebas de persistencia, auditoría de Git y redacción del informe PDF. |

---

## 📊 3. Diagnóstico del Estado Actual del Proyecto

### ✅ Lo que ya está terminado
1. **Backend completo y probado:**
   * Servidor Express configurado en el puerto 5000 (`backend/src/server.js`) con soporte de CORS.
   * Endpoints obligatorios creados: `GET /registros` y `POST /registros` (`backend/src/routes/reviewsRoutes.js`).
   * Manejador de persistencia asíncrona en JSON con inicialización automática (`backend/src/utils/fileHandler.js`).
   * Validación estricta en servidor de tipos, email, fecha y longitud (`backend/src/utils/validator.js`).
   * Generación de identificadores únicos con `crypto.randomUUID()`.
2. **Estructura base de Frontend:**
   * React 19 + Vite + Tailwind CSS configurados.
   * Enrutador SPA con React Router v7 (`/`, `/registro`, `/lista`).
   * Landing Page principal (`/`) con estética editorial, modo claro/oscuro y componentes visuales.
3. **Documentación:**
   * `README.md` general con pautas de instalación, comandos y arquitectura.

### ⚠️ Lo que está pendiente en el CÓDIGO
* **`frontend/src/services/api.js`:** Archivo vacío. Debe centralizar las llamadas `fetch` a `http://localhost:5000/registros`.
* **`frontend/src/components/ReviewForm.jsx`:** Archivo vacío. Falta el formulario controlado por estado (`useState`) con validaciones en cliente.
* **`frontend/src/components/AlertMessage.jsx`:** Archivo vacío. Falta el componente de retroalimentación de éxito/error.
* **`frontend/src/components/Spinner.jsx`:** Archivo vacío. Falta el indicador visual de estado de carga.
* **`frontend/src/pages/Register.jsx`:** Contiene solo texto placeholder; debe montar el formulario e interactuar con la API.
* **`frontend/src/pages/ReviewList.jsx`:** Contiene solo texto placeholder; debe obtener las reseñas de la API y renderizarlas.
* **`frontend/src/components/ReviewCard.jsx`:** Ajustar nombres de campos (actualmente espera propiedades en inglés `title`, `bookAuthor`, etc., y deben mapearse a `libro`, `autorLibro`, `nombre`, `genero`, `calificacion`, `descripcion`, etc.).

---

## 📝 4. Plan de Tareas Pendientes (Checklist de Ejecución)

### FASE 1: Construcción del Frontend y Conexión HTTP (Código)
- [ ] **Tarea 1.1 — Servicio de API (`frontend/src/services/api.js`):**
  - Implementar función `getReviews()` para consultar `GET /registros`.
  - Implementar función `createReview(reviewData)` para enviar `POST /registros`.
  - Configurar manejo robusto de excepciones de red y parsing de respuestas JSON.
- [ ] **Tarea 1.2 — Componentes de Apoyo Visual:**
  - Implementar `Spinner.jsx` para feedback durante la carga de datos.
  - Implementar `AlertMessage.jsx` con variantes para mensajes de éxito y errores de validación.
- [ ] **Tarea 1.3 — Componente `ReviewForm.jsx`:**
  - Crear estado controlado para los campos:
    - `libro` (Título de la obra)
    - `autorLibro` (Autor del libro)
    - `nombre` (Nombre del reseñador)
    - `email` (Correo electrónico del reseñador)
    - `genero` (Selector: Ficción, No Ficción, Misterio, Ciencia Ficción, Fantasía, Historia, etc.)
    - `fecha` (Selector de fecha con validación de no ser fecha futura)
    - `calificacion` (Valor numérico de 1 a 5 estrellas)
    - `descripcion` (Texto de la reseña, mínimo 10-15 caracteres)
  - Implementar validaciones instantáneas en el cliente antes de emitir la petición.
  - Deshabilitar el botón durante el envío para prevenir envíos duplicados.
- [ ] **Tarea 1.4 — Integración en `Register.jsx`:**
  - Integrar el componente `ReviewForm`.
  - Manejar el envío hacia `api.createReview`.
  - Mostrar feedback con `AlertMessage` y dar opción de redirigir a `/lista` tras guardar con éxito.
- [ ] **Tarea 1.5 — Adaptación de `ReviewCard.jsx`:**
  - Compatibilizar el componente para que soporte tanto los campos de la API (`libro`, `autorLibro`, `nombre`, `genero`, `fecha`, `calificacion`, `descripcion`) como datos de fallback.
- [ ] **Tarea 1.6 — Integración en `ReviewList.jsx`:**
  - Ejecutar `getReviews()` al montar el componente con `useEffect`.
  - Controlar estados: `loading`, `error`, `empty` (sin reseñas registradas) y `success`.
  - Agregar barra de búsqueda y filtro rápido por categoría/género.
  - Renderizar el listado en tarjetas responsivas.

---

### FASE 2: Pruebas y Validación Técnica Obligatoria
- [ ] **Prueba de Flujo Completo (Happy Path):**
  - Iniciar backend (`cd backend && npm run dev`) en puerto 5000.
  - Iniciar frontend (`cd frontend && npm run dev`) en puerto 5173.
  - Registrar una nueva reseña desde el formulario y verificar su aparición inmediata en `/lista`.
  - Verificar que el nuevo registro se guardó en `backend/data/reviews.json`.
- [ ] **Prueba de Validaciones en Cliente:**
  - Intentar enviar con campos vacíos $\rightarrow$ Debe bloquearse y marcar el error en pantalla.
  - Ingresar un email inválido (ej: `usuario@sin-dominio`) $\rightarrow$ Debe mostrar mensaje de formato.
  - Seleccionar una fecha del día de mañana $\rightarrow$ Debe rechazar fechas futuras.
- [ ] **Prueba de Validaciones en Servidor:**
  - Enviar una petición defectuosa directamente con Postman / curl $\rightarrow$ Verificar respuesta `400 Bad Request` con array de errores.
- [ ] **Prueba de Persistencia tras Reinicio:**
  - Detener el backend con `Ctrl + C`.
  - Volver a iniciar el backend (`npm run dev`).
  - Recargar la página `/lista` en el navegador $\rightarrow$ Las reseñas creadas deben seguir visibles.

---

### FASE 3: Gestión del Repositorio Git
- [ ] **Verificación de archivos ignorados:**
  - Comprobar que `node_modules` no esté versionado ni en la raíz, ni en backend ni en frontend.
- [ ] **Distribución de Commits por Integrante:**
  - Asegurar que los 4 integrantes tengan commits reflejados en el historial de GitHub con mensajes descriptivos:
    - *Estudiante 1:* Commits de maquetación, rutas y componentes de React.
    - *Estudiante 2:* Commits de lógica de backend, rutas y persistencia en JSON.
    - *Estudiante 3:* Commits de integración `api.js`, conexión HTTP y manejo de errores.
    - *Estudiante 4:* Commits de pruebas, ajustes de estilos responsivos y documentación README.

---

### FASE 4: Grabación del Video Grupal (20 Puntos — 20 a 30 Minutos)

El video debe mostrar el desarrollo real, el código y las pruebas en vivo. Los 4 integrantes deben aparecer y hablar:

| Etapa | Duración Sugerida | Contenido a Exponer | Quién Expone |
| :---: | :---: | :--- | :--- |
| **1. Presentación** | ~3 min | Presentación de los 4 integrantes, justificación de la temática exclusiva de reseñas de libros, necesidad que resuelve la app y tabla de distribución de actividades. | Todo el equipo |
| **2. Preparación** | ~3 min | Mostrar estructura de carpetas (`frontend/`, `backend/`), archivos `package.json`, `.gitignore` y ejecución de comandos en dos terminales para levantar ambos servidores. | Integrante 4 |
| **3. Construcción Frontend** | ~5 min | Explicar las rutas en React Router (`/`, `/registro`, `/lista`), componentes reutilizables, estado del formulario (`useState`) y validaciones visuales. | Integrante 1 |
| **4. Construcción Backend** | ~5 min | Explicar el servidor Express, configuración de CORS, rutas `GET` y `POST`, validaciones en servidor, generación de UUID y lectura/escritura asíncrona con `fs/promises`. | Integrante 2 |
| **5. Integración** | ~4 min | Explicar la conexión HTTP mediante `fetch`, la URL base del backend, el consumo de datos y la sincronización del estado al crear un registro. | Integrante 3 |
| **6. Pruebas en Vivo** | ~6 min | Demostrar en vivo: <br>1. Registro de reseña exitosa.<br>2. Rechazo de formulario con datos inválidos.<br>3. Petición rechazada con `400` en backend.<br>4. Estados de carga y lista vacía.<br>5. **Prueba reina de persistencia:** Detener servidor backend, reiniciar y comprobar que los datos siguen ahí. | Todo el equipo |
| **7. Cierre** | ~4 min | Resumen de aportes individuales, dificultades encontradas y cómo se resolvieron, muestra del repositorio de GitHub con el historial de commits. | Todo el equipo |

---

### FASE 5: Preparación de la Pregunta Técnica Individual (10 Puntos)

Cada estudiante debe dominar los siguientes 5 temas clave para responder al docente:

1. **Persistencia en archivo JSON:**
   * *Pregunta:* ¿Cómo se guardan los datos sin una base de datos convencional?
   * *Respuesta:* Con el módulo `fs/promises` de Node.js. Al llegar un `POST`, se lee `reviews.json`, se transforma el texto a array con `JSON.parse()`, se agrega el nuevo objeto con su UUID y se sobreescribe el archivo con `JSON.stringify(reviews, null, 2)` usando `fs.writeFile()`. Si el archivo no existe, `ensureDataFileExists()` lo inicializa como `[]`.
2. **Validación Dual (Frontend vs. Backend):**
   * *Pregunta:* ¿Por qué validar en el cliente y también en el servidor?
   * *Respuesta:* En el frontend ofrece feedback inmediato al usuario mejorando la experiencia (UX). En el backend es indispensable por seguridad e integridad, ya que cualquier usuario puede omitir el frontend y enviar datos directos con herramientas como Postman o curl.
3. **Manejo de CORS:**
   * *Pregunta:* ¿Por qué ocurre el error de CORS y cómo se soluciona?
   * *Respuesta:* Porque el frontend se ejecuta en `http://localhost:5173` y el backend en `http://localhost:5000`. Al ser orígenes (puertos) distintos, el navegador bloquea la petición por seguridad a menos que el backend incluya el middleware `cors()`.
4. **Ciclo de vida y consumo con `useEffect`:**
   * *Pregunta:* ¿Cómo y cuándo se cargan los datos en `/lista`?
   * *Respuesta:* En el montaje del componente mediante el hook `useEffect(() => { ... }, [])`. El array de dependencias vacío asegura que la consulta `GET /registros` se dispare una sola vez al cargar la vista.
5. **Generación de ID con UUID:**
   * *Pregunta:* ¿Por qué no usar un contador numérico correlativo (1, 2, 3...)?
   * *Respuesta:* Se usa `crypto.randomUUID()` para garantizar identificadores universales y aleatorios sin riesgo de colisión, evitando tener que calcular o buscar el último ID en el archivo JSON.

---

### FASE 6: Informe Final en PDF (`Componente_Practico_Web_BiblioInfo.pdf`)
- [ ] Portada formal con nombre del proyecto, tema y datos completos de los 4 integrantes.
- [ ] **Captura de pantalla de la hoja compartida del curso** donde conste la exclusividad de *Reseñas de libros*.
- [ ] Diagrama de arquitectura del flujo de datos (React $\rightarrow$ Express $\rightarrow$ JSON).
- [ ] Capturas de pantalla de la aplicación funcionando:
  - Vista de Inicio (`/`) en modo claro y oscuro.
  - Formulario de Registro (`/registro`) con datos correctos y con alertas de error.
  - Catálogo de Reseñas (`/lista`) con registros cargados y con filtros.
- [ ] Enlace al repositorio público de GitHub y enlace al video grupal (YouTube / Drive con permisos públicos).
- [ ] Resumen de las pruebas ejecutadas y conclusiones del equipo.

---

## 🎯 Resumen de Siguientes Acciones Recomendadas

1. **Paso Inmediato:** Codificar los archivos pendientes del frontend (`api.js`, `ReviewForm.jsx`, `Spinner.jsx`, `AlertMessage.jsx`, `Register.jsx`, `ReviewList.jsx`, `ReviewCard.jsx`).
2. **Segundo Paso:** Levantar ambos servicios y hacer la prueba de extremo a extremo y persistencia.
3. **Tercer Paso:** Realizar los commits distribuidos entre los 4 integrantes en GitHub.
4. **Cuarto Paso:** Grabar el video grupal siguiendo las 7 etapas de la tabla.
5. **Quinto Paso:** Generar el informe en PDF con las capturas requeridas.
