# Estructura base de un proyecto en node
```
my-express-app/
├── config/
│   └── config.js             # Configuración del proyecto (e.g., variables de entorno)
├── controllers/
│   └── userController.js     # Controladores (manejo de la lógica de negocio)
├── middleware/
│   └── authMiddleware.js     # Middleware (autenticación, validaciones, etc.)
├── models/
│   └── userModel.js          # Modelos (esquemas de datos)
├── routes/
│   └── userRoutes.js         # Rutas (definición de rutas del API)
├── .env                      # Variables de entorno
├── app.js                    # Configuración de Express.js y middleware general
├── server.js                 # Archivo principal para inicializar el servidor
└── package.json              # Dependencias y scripts del proyecto
```