-- Crear la tabla de negocios
CREATE TABLE Negocios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Crear la tabla de usuarios
CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
    nombre_completo VARCHAR(100) NOT NULL,
    nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
    contrasena_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(20) CHECK (rol IN ('Admin', 'Personal')) NOT NULL,
    foto_perfil TEXT,
    negocio_id INT REFERENCES Negocios(id) -- Relación con el negocio (solo para personal)
);

-- Crear la tabla de tareas
CREATE TABLE Tareas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_completada TIMESTAMP,
    estado VARCHAR(20) CHECK (estado IN ('Pendiente', 'En Progreso', 'Completada')) NOT NULL,
    negocio_id INT REFERENCES Negocios(id), -- Negocio asignado
    asignado_por INT REFERENCES Usuarios(id) -- Usuario admin que asignó la tarea
);

-- Crear la tabla de asignaciones de tareas
CREATE TABLE Asignaciones_Tareas (
    id SERIAL PRIMARY KEY,
    tarea_id INT REFERENCES Tareas(id) ON DELETE CASCADE,
    usuario_id INT REFERENCES Usuarios(id) ON DELETE CASCADE,
    fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_completada TIMESTAMP,
    completada BOOLEAN DEFAULT FALSE
);

CREATE TABLE historial_tareas (
    id SERIAL PRIMARY KEY,
    tarea_id INT REFERENCES tareas(id) ON DELETE CASCADE,
    usuario_id INT REFERENCES usuarios(id),
    actividad VARCHAR(100) NOT NULL, -- Ejemplo: "Cambio de estado a Completada"
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

