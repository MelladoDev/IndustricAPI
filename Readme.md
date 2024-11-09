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
# Flujo de una consulta
1. El cliente realiza una petición HTTP al servidor.
2. El servidor recibe en la ruta, luego este llama al controller, el controller llama al modelo y el modelo realiza la consulta a la base de datos
3. El modelo devuelve la respuesta al controller, el controller devuelve la respuesta al servidor y el servidor responde al cliente.