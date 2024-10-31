-- Creación de Enum para Marca
CREATE TYPE marca AS ENUM (
  'BARKO', 'BELL', 'CASE', 'CATERPILLAR', 'DOOSAN', 'HITACHI', 
  'JCB', 'JOHN_DEERE', 'KOBELCO', 'KOMATSU', 'YUNDAI', 
  'LIUGONG', 'LOGMAX', 'NEW_HOLLAND', 'PRENTICE', 
  'PONCE', 'QUADCO', 'SATCO', 'TIGERCART', 'VOLVO', 'WARATAH'
);

-- Creación de Enum para Estado
CREATE TYPE estado AS ENUM (
  'pendiente', 'aprobado', 'cancelado', 'pagado'
);

-- Creación de Enum para Metodo_pago
CREATE TYPE metodo_pago AS ENUM (
  'debito', 'tranferencia', 'mercado_pago'
);

-- Tabla Usuarios
CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    fecha_creacion DATE DEFAULT CURRENT_DATE,
    condicion BOOLEAN
);

-- Tabla Admin
CREATE TABLE Admin (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    fecha_creacion DATE DEFAULT CURRENT_DATE,
    condicion BOOLEAN
);

-- Tabla Categorias
CREATE TABLE Categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) UNIQUE NOT NULL,
    descripcion TEXT,
    condicion BOOLEAN
);

-- Tabla Productos
CREATE TABLE Productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    imagen_url VARCHAR(500),
    descripcion TEXT,
    precio INTEGER NOT NULL,
    categoria_id INTEGER REFERENCES Categorias(id),
    stock INTEGER DEFAULT 0,
    fecha_creacion DATE DEFAULT CURRENT_DATE,
    condicion BOOLEAN
);

-- Tabla Pedidos
CREATE TABLE Pedidos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES Usuarios(id),
    total INTEGER NOT NULL,
    fecha_pedido DATE DEFAULT CURRENT_DATE,
    estado estado DEFAULT 'pendiente',
    condicion BOOLEAN
);

-- Tabla Pedidos_productos
CREATE TABLE Pedidos_productos (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER REFERENCES Pedidos(id),
    producto_id INTEGER REFERENCES Productos(id),
    cantidad INTEGER
);

-- Tabla Orden_de_pago
CREATE TABLE Orden_de_pago (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER REFERENCES Pedidos(id),
    metodo_pago metodo_pago,
    monto INTEGER NOT NULL,
    fecha_pago DATE DEFAULT CURRENT_DATE,
    estado estado DEFAULT 'pendiente',
    condicion BOOLEAN
);

-- Tabla Cotizacion
CREATE TABLE Cotizacion (
    id SERIAL PRIMARY KEY,
    marca marca,
    cilindro VARCHAR(255) NOT NULL,
    modelo VARCHAR(255) NOT NULL,
    año INTEGER NOT NULL,
    usuario_id INTEGER REFERENCES Usuarios(id),
    condicion BOOLEAN,
    estado estado DEFAULT 'pendiente'
);

-- Tabla Favoritos
CREATE TABLE Favoritos (
    id SERIAL PRIMARY KEY,
    Usuarios_id INTEGER REFERENCES Usuarios(id),
    Producto_id INTEGER REFERENCES Productos(id)
);
