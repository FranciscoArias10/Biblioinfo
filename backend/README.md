# ⚙️ BiblioInfo — Backend API REST

API REST desarrollada con **Node.js** y **Express** para la gestión y persistencia de reseñas de libros. Cumple con los requisitos del componente práctico web mediante almacenamiento en archivo JSON, validación en servidor, manejo de CORS y códigos de estado HTTP estándar.

---

## 📁 Estructura del Módulo

```text
backend/
├── data/
│   └── reviews.json               # Archivo de almacenamiento persistente
├── src/
│   ├── controllers/
│   │   └── reviewsController.js   # Lógica de negocio (getReviews, createReview)
│   ├── routes/
│   │   └── reviewsRoutes.js       # Definición de rutas GET y POST /registros
│   ├── utils/
│   │   ├── fileHandler.js         # Lectura y escritura asíncrona segura (fs/promises)
│   │   └── validator.js           # Validación de datos en servidor
│   └── server.js                  # Inicialización de Express, CORS y servidor
├── package.json                   # Dependencias y scripts
└── README.md                      # Esta guía técnica del backend
```

---

## 🛠️ Tecnologías y Dependencias

- **Node.js (v18+)**: Entorno de ejecución en servidor.
- **Express (^4.21.2)**: Framework para creación de rutas y middlewares HTTP.
- **CORS (^2.8.5)**: Habilita el intercambio de recursos de origen cruzado para conectar con React (puerto `5173`).
- **fs/promises (nativo)**: Manejo asíncrono y seguro de archivos sin bloquear el hilo principal.
- **crypto.randomUUID() (nativo)**: Generación de identificadores únicos universales para cada reseña.

---

## 🚀 Comandos de Ejecución

### 1. Instalación de dependencias
```bash
npm install
```
*(En Windows PowerShell si hay restricción de políticas de script, usar: `npm.cmd install`)*

### 2. Iniciar el servidor en modo desarrollo (recarga automática)
```bash
npm run dev
```

### 3. Iniciar el servidor en modo estándar
```bash
npm start
```

El servidor iniciará en: **`http://localhost:5000`**

---

## 📡 Endpoints de la API

### 1. Verificación del Servidor (Health Check)
- **Método:** `GET`
- **URL:** `http://localhost:5000/`
- **Respuesta (`200 OK`):**
  ```json
  {
    "status": "online",
    "project": "BiblioInfo - API de Reseñas de Libros",
    "version": "1.0.0",
    "endpoints": {
      "getAllReviews": "GET /registros",
      "createReview": "POST /registros"
    }
  }
  ```

---

### 2. Consultar Todas las Reseñas
- **Método:** `GET`
- **URL:** `http://localhost:5000/registros`
- **Parámetros Opcionales de Consulta (Query Params):**
  - `?genero=Misterio`: Filtra las reseñas por el género literario especificado.
- **Código de Respuesta:** `200 OK`
- **Ejemplo de Respuesta:**
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

### 3. Registrar una Nueva Reseña
- **Método:** `POST`
- **URL:** `http://localhost:5000/registros`
- **Headers:** `Content-Type: application/json`
- **Cuerpo de la Petición (JSON):**
  ```json
  {
    "libro": "El Principito",
    "autorLibro": "Antoine de Saint-Exupéry",
    "nombre": "Carlos Gómez",
    "email": "carlos.gomez@correo.com",
    "genero": "Ficción",
    "fecha": "2026-10-10",
    "calificacion": 5,
    "descripcion": "Un clásico lleno de reflexiones profundas sobre la vida, el amor y la amistad."
  }
  ```

#### Respuestas Posibles:
- **`201 Created` (Éxito):**
  ```json
  {
    "success": true,
    "message": "Reseña registrada exitosamente",
    "data": {
      "id": "c1f7a220-4df7-4fa5-9831-4ce88d22d21a",
      "libro": "El Principito",
      "autorLibro": "Antoine de Saint-Exupéry",
      "nombre": "Carlos Gómez",
      "email": "carlos.gomez@correo.com",
      "genero": "Ficción",
      "fecha": "2026-10-10",
      "calificacion": 5,
      "descripcion": "Un clásico lleno de reflexiones profundas sobre la vida, el amor y la amistad.",
      "createdAt": "2026-10-13T00:50:00.000Z"
    }
  }
  ```

- **`400 Bad Request` (Datos Inválidos):**
  ```json
  {
    "success": false,
    "message": "Datos de la reseña inválidos o incompletos",
    "errors": [
      "El título del libro es obligatorio y debe tener al menos 2 caracteres.",
      "El correo electrónico es obligatorio y debe tener un formato válido (ejemplo: usuario@correo.com).",
      "La fecha de la reseña no puede ser futura."
    ]
  }
  ```

- **`500 Internal Server Error`:**
  Si ocurre algún fallo en el sistema de archivos del servidor, responde con código 500 sin detener el proceso del servidor.

---

## 🧪 Pruebas de Persistencia y Comandos de Prueba

### Probar en PowerShell:
```powershell
# 1. Consultar reseñas
Invoke-RestMethod -Uri "http://localhost:5000/registros" -Method Get | ConvertTo-Json

# 2. Crear nueva reseña
$body = @{
    libro = "Rayuela"
    autorLibro = "Julio Cortázar"
    nombre = "Lucía Mendez"
    email = "lucia.mendez@correo.com"
    genero = "Ficción"
    fecha = "2026-10-12"
    calificacion = 5
    descripcion = "Una estructura lúdica e innovadora que cambió la narrativa hispanoamericana."
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/registros" -Method Post -Body $body -ContentType "application/json" | ConvertTo-Json
```

### Probar con cURL:
```bash
curl -X GET http://localhost:5000/registros

curl -X POST http://localhost:5000/registros \
  -H "Content-Type: application/json" \
  -d '{"libro":"Rayuela","autorLibro":"Julio Cortázar","nombre":"Lucía","email":"lucia@correo.com","genero":"Ficción","fecha":"2026-10-12","calificacion":5,"descripcion":"Una estructura lúdica e innovadora."}'
```

### Verificación de Persistencia:
1. Crear un registro mediante `POST /registros`.
2. Detener el servidor con `Ctrl + C`.
3. Volver a iniciar el servidor con `npm start`.
4. Consultar `GET /registros` y verificar que los datos registrados previamente permanecen intactos en `backend/data/reviews.json`.
