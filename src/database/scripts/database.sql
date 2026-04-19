-- =============================================
-- BASE DE DATOS: Venta_VehiculoDB
-- =============================================
CREATE DATABASE Venta_VehiculoDB;
GO
USE Venta_VehiculoDB;
GO

-- =============================================
-- TABLAS
-- =============================================

CREATE TABLE ROL (
    Id_Rol      INT IDENTITY(1,1) PRIMARY KEY,
    nombreRol   VARCHAR(50)  NOT NULL,
    descripcion VARCHAR(255) NULL
);

CREATE TABLE TIPO (
    Id_Tipo    INT IDENTITY(1,1) PRIMARY KEY,
    nombreTipo VARCHAR(50) NOT NULL
);

CREATE TABLE ESTADO (
    Id_Estado    INT IDENTITY(1,1) PRIMARY KEY,
    nombreEstado VARCHAR(50) NOT NULL
);

CREATE TABLE VEHICULO (
    Id_Vehiculo INT IDENTITY(1,1) PRIMARY KEY,
    marca       VARCHAR(50)   NOT NULL,
    modelo      VARCHAR(50)   NOT NULL,
    año         INT           NOT NULL,
    precio      DECIMAL(12,2) NOT NULL,
    disponible  BIT           NOT NULL DEFAULT 1
);

CREATE TABLE CLIENTE (
    Id_Cliente     INT IDENTITY(1,1) PRIMARY KEY,
    nombreCompleto VARCHAR(150)  NOT NULL,
    cedula         VARCHAR(20)   NOT NULL UNIQUE,
    telefono       VARCHAR(20)   NULL,
    ingresoMensual DECIMAL(12,2) NOT NULL,
    fechaRegistro  DATE          NOT NULL DEFAULT GETDATE()
);

CREATE TABLE USUARIO (
    Id_Usuario INT IDENTITY(1,1) PRIMARY KEY,
    nombre     VARCHAR(100) NOT NULL,
    email      VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    Id_Rol     INT          NOT NULL,
    CONSTRAINT FK_Usuario_Rol FOREIGN KEY (Id_Rol) REFERENCES ROL(Id_Rol)
);

CREATE TABLE SOLICITUD (
    Id_Solicitud    INT IDENTITY(1,1) PRIMARY KEY,
    tasaInteres     DECIMAL(5,2)  NOT NULL,
    plazoMeses      INT           NOT NULL,
    montoSolicitado DECIMAL(12,2) NOT NULL,
    fechaSolicitud  DATE          NOT NULL DEFAULT GETDATE(),
    Id_Usuario      INT           NOT NULL,
    Id_Cliente      INT           NOT NULL,
    Id_Vehiculo     INT           NOT NULL,
    Id_Tipo         INT           NOT NULL,
    Id_Estado       INT           NOT NULL,
    CONSTRAINT FK_Solicitud_Usuario  FOREIGN KEY (Id_Usuario)  REFERENCES USUARIO(Id_Usuario),
    CONSTRAINT FK_Solicitud_Cliente  FOREIGN KEY (Id_Cliente)  REFERENCES CLIENTE(Id_Cliente),
    CONSTRAINT FK_Solicitud_Vehiculo FOREIGN KEY (Id_Vehiculo) REFERENCES VEHICULO(Id_Vehiculo),
    CONSTRAINT FK_Solicitud_Tipo     FOREIGN KEY (Id_Tipo)     REFERENCES TIPO(Id_Tipo),
    CONSTRAINT FK_Solicitud_Estado   FOREIGN KEY (Id_Estado)   REFERENCES ESTADO(Id_Estado)
);

CREATE TABLE CUOTAS (
    Id_Cuotas        INT IDENTITY(1,1) PRIMARY KEY,
    numeroCuota      INT           NOT NULL,
    fechaVencimiento DATE          NOT NULL,
    montoCuota       DECIMAL(12,2) NOT NULL,
    Id_Solicitud     INT           NOT NULL,
    Id_Estado        INT           NOT NULL,
    CONSTRAINT FK_Cuotas_Solicitud FOREIGN KEY (Id_Solicitud) REFERENCES SOLICITUD(Id_Solicitud),
    CONSTRAINT FK_Cuotas_Estado    FOREIGN KEY (Id_Estado)    REFERENCES ESTADO(Id_Estado)
);
GO

-- =============================================
-- SEMILLAS
-- =============================================

INSERT INTO ROL (nombreRol, descripcion) VALUES ('Administrador', 'Acceso total al sistema');
INSERT INTO ROL (nombreRol, descripcion) VALUES ('Vendedor', 'Gestión de solicitudes y vehículos');
INSERT INTO ROL (nombreRol, descripcion) VALUES ('Cliente', 'Consulta de solicitudes y cuotas');
GO

INSERT INTO ESTADO (nombreEstado) VALUES ('Pendiente');
INSERT INTO ESTADO (nombreEstado) VALUES ('Aprobado');
INSERT INTO ESTADO (nombreEstado) VALUES ('Rechazado');
INSERT INTO ESTADO (nombreEstado) VALUES ('Pagado');
GO

INSERT INTO TIPO (nombreTipo) VALUES ('Crédito Personal');
INSERT INTO TIPO (nombreTipo) VALUES ('Leasing');
INSERT INTO TIPO (nombreTipo) VALUES ('Financiamiento Bancario');
GO

INSERT INTO VEHICULO (marca, modelo, año, precio, disponible)
VALUES 
('Toyota',  'Corolla', 2022, 18500, 1),
('Hyundai', 'Tucson',  2023, 27000, 1),
('Nissan',  'Sentra',  2021, 16000, 1);
GO

INSERT INTO USUARIO (nombre, email, contraseña, Id_Rol)
VALUES ('Admin', 'admin@sistema.com', '1234', 1);
GO

-- =============================================
-- SP ROL
-- =============================================

CREATE PROCEDURE sp_ObtenerRoles
AS BEGIN SET NOCOUNT ON;
    SELECT Id_Rol, nombreRol, descripcion FROM ROL;
END;
GO

CREATE PROCEDURE sp_ObtenerRolPorId @Id_Rol INT
AS BEGIN SET NOCOUNT ON;
    SELECT Id_Rol, nombreRol, descripcion FROM ROL WHERE Id_Rol = @Id_Rol;
END;
GO

-- =============================================
-- SP CRUD: TIPO
-- =============================================

CREATE PROCEDURE sp_InsertarTipo @nombreTipo VARCHAR(50)
AS BEGIN SET NOCOUNT ON;
    INSERT INTO TIPO (nombreTipo) VALUES (@nombreTipo);
    SELECT SCOPE_IDENTITY() AS Id_Tipo;
END;
GO

CREATE PROCEDURE sp_ObtenerTipos
AS BEGIN SET NOCOUNT ON;
    SELECT Id_Tipo, nombreTipo FROM TIPO;
END;
GO

CREATE PROCEDURE sp_ObtenerTipoPorId @Id_Tipo INT
AS BEGIN SET NOCOUNT ON;
    SELECT Id_Tipo, nombreTipo FROM TIPO WHERE Id_Tipo = @Id_Tipo;
END;
GO

CREATE PROCEDURE sp_ActualizarTipo @Id_Tipo INT, @nombreTipo VARCHAR(50)
AS BEGIN SET NOCOUNT ON;
    UPDATE TIPO SET nombreTipo = @nombreTipo WHERE Id_Tipo = @Id_Tipo;
    SELECT @@ROWCOUNT AS FilasAfectadas;
END;
GO

CREATE PROCEDURE sp_EliminarTipo @Id_Tipo INT
AS BEGIN SET NOCOUNT ON;
    DELETE FROM TIPO WHERE Id_Tipo = @Id_Tipo;
    SELECT @@ROWCOUNT AS FilasAfectadas;
END;
GO

-- =============================================
-- SP CRUD: ESTADO
-- =============================================

CREATE PROCEDURE sp_InsertarEstado @nombreEstado VARCHAR(50)
AS BEGIN SET NOCOUNT ON;
    INSERT INTO ESTADO (nombreEstado) VALUES (@nombreEstado);
    SELECT SCOPE_IDENTITY() AS Id_Estado;
END;
GO

CREATE PROCEDURE sp_ObtenerEstados
AS BEGIN SET NOCOUNT ON;
    SELECT Id_Estado, nombreEstado FROM ESTADO;
END;
GO

CREATE PROCEDURE sp_ObtenerEstadoPorId @Id_Estado INT
AS BEGIN SET NOCOUNT ON;
    SELECT Id_Estado, nombreEstado FROM ESTADO WHERE Id_Estado = @Id_Estado;
END;
GO

CREATE PROCEDURE sp_ActualizarEstado @Id_Estado INT, @nombreEstado VARCHAR(50)
AS BEGIN SET NOCOUNT ON;
    UPDATE ESTADO SET nombreEstado = @nombreEstado WHERE Id_Estado = @Id_Estado;
    SELECT @@ROWCOUNT AS FilasAfectadas;
END;
GO

CREATE PROCEDURE sp_EliminarEstado @Id_Estado INT
AS BEGIN SET NOCOUNT ON;
    DELETE FROM ESTADO WHERE Id_Estado = @Id_Estado;
    SELECT @@ROWCOUNT AS FilasAfectadas;
END;
GO

-- =============================================
-- SP CRUD: VEHICULO
-- =============================================

CREATE PROCEDURE sp_InsertarVehiculo
    @marca VARCHAR(50), @modelo VARCHAR(50),
    @año INT, @precio DECIMAL(12,2), @disponible BIT
AS BEGIN SET NOCOUNT ON;
    INSERT INTO VEHICULO (marca, modelo, año, precio, disponible)
    VALUES (@marca, @modelo, @año, @precio, @disponible);
    SELECT SCOPE_IDENTITY() AS Id_Vehiculo;
END;
GO

CREATE PROCEDURE sp_ObtenerVehiculos
AS BEGIN SET NOCOUNT ON;
    SELECT * FROM VEHICULO;
END;
GO

CREATE PROCEDURE sp_ActualizarVehiculo
    @Id_Vehiculo INT, @marca VARCHAR(50), @modelo VARCHAR(50),
    @año INT, @precio DECIMAL(12,2), @disponible BIT
AS BEGIN SET NOCOUNT ON;
    UPDATE VEHICULO SET marca=@marca, modelo=@modelo, año=@año,
    precio=@precio, disponible=@disponible WHERE Id_Vehiculo=@Id_Vehiculo;
    SELECT @@ROWCOUNT AS FilasAfectadas;
END;
GO

CREATE PROCEDURE sp_EliminarVehiculo @Id_Vehiculo INT
AS BEGIN SET NOCOUNT ON;
    DELETE FROM VEHICULO WHERE Id_Vehiculo=@Id_Vehiculo;
    SELECT @@ROWCOUNT AS FilasAfectadas;
END;
GO

-- =============================================
-- SP CRUD: CLIENTE
-- =============================================

CREATE PROCEDURE sp_InsertarCliente
    @nombreCompleto VARCHAR(150), @cedula VARCHAR(20),
    @telefono VARCHAR(20), @ingresoMensual DECIMAL(12,2)
AS BEGIN SET NOCOUNT ON;
    INSERT INTO CLIENTE (nombreCompleto, cedula, telefono, ingresoMensual)
    VALUES (@nombreCompleto, @cedula, @telefono, @ingresoMensual);
    SELECT SCOPE_IDENTITY() AS Id_Cliente;
END;
GO

CREATE PROCEDURE sp_ObtenerClientes
AS BEGIN SET NOCOUNT ON;
    SELECT * FROM CLIENTE;
END;
GO

CREATE PROCEDURE sp_ActualizarCliente
    @Id_Cliente INT, @nombreCompleto VARCHAR(150),
    @telefono VARCHAR(20), @ingresoMensual DECIMAL(12,2)
AS BEGIN SET NOCOUNT ON;
    UPDATE CLIENTE SET nombreCompleto=@nombreCompleto,
    telefono=@telefono, ingresoMensual=@ingresoMensual
    WHERE Id_Cliente=@Id_Cliente;
    SELECT @@ROWCOUNT AS FilasAfectadas;
END;
GO

CREATE PROCEDURE sp_EliminarCliente @Id_Cliente INT
AS BEGIN SET NOCOUNT ON;
    DELETE FROM CLIENTE WHERE Id_Cliente=@Id_Cliente;
    SELECT @@ROWCOUNT AS FilasAfectadas;
END;
GO

-- =============================================
-- SP CRUD: USUARIO
-- =============================================

CREATE PROCEDURE sp_InsertarUsuario
    @nombre VARCHAR(100), @email VARCHAR(100),
    @contraseña VARCHAR(255), @Id_Rol INT
AS BEGIN SET NOCOUNT ON;
    INSERT INTO USUARIO (nombre, email, contraseña, Id_Rol)
    VALUES (@nombre, @email, @contraseña, @Id_Rol);
    SELECT SCOPE_IDENTITY() AS Id_Usuario;
END;
GO

CREATE PROCEDURE sp_ObtenerUsuarios
AS BEGIN SET NOCOUNT ON;
    SELECT U.Id_Usuario, U.nombre, U.email, R.nombreRol
    FROM USUARIO U INNER JOIN ROL R ON U.Id_Rol = R.Id_Rol;
END;
GO

CREATE PROCEDURE sp_ActualizarUsuario
    @Id_Usuario INT, @nombre VARCHAR(100),
    @email VARCHAR(100), @Id_Rol INT
AS BEGIN SET NOCOUNT ON;
    UPDATE USUARIO SET nombre=@nombre, email=@email,
    Id_Rol=@Id_Rol WHERE Id_Usuario=@Id_Usuario;
    SELECT @@ROWCOUNT AS FilasAfectadas;
END;
GO

CREATE PROCEDURE sp_EliminarUsuario @Id_Usuario INT
AS BEGIN SET NOCOUNT ON;
    DELETE FROM USUARIO WHERE Id_Usuario=@Id_Usuario;
    SELECT @@ROWCOUNT AS FilasAfectadas;
END;
GO

-- =============================================
-- SP CRUD: SOLICITUD
-- =============================================

CREATE PROCEDURE sp_InsertarSolicitud
    @tasaInteres DECIMAL(5,2), @plazoMeses INT,
    @montoSolicitado DECIMAL(12,2), @Id_Usuario INT,
    @Id_Cliente INT, @Id_Vehiculo INT,
    @Id_Tipo INT, @Id_Estado INT
AS BEGIN SET NOCOUNT ON;
    INSERT INTO SOLICITUD
    (tasaInteres, plazoMeses, montoSolicitado, Id_Usuario, Id_Cliente, Id_Vehiculo, Id_Tipo, Id_Estado)
    VALUES
    (@tasaInteres, @plazoMeses, @montoSolicitado, @Id_Usuario, @Id_Cliente, @Id_Vehiculo, @Id_Tipo, @Id_Estado);
    SELECT SCOPE_IDENTITY() AS Id_Solicitud;
END;
GO

CREATE PROCEDURE sp_ObtenerSolicitudes
AS BEGIN SET NOCOUNT ON;
    SELECT S.Id_Solicitud, C.nombreCompleto,
           V.marca + ' ' + V.modelo AS Vehiculo,
           S.montoSolicitado, E.nombreEstado
    FROM SOLICITUD S
    INNER JOIN CLIENTE C ON S.Id_Cliente = C.Id_Cliente
    INNER JOIN VEHICULO V ON S.Id_Vehiculo = V.Id_Vehiculo
    INNER JOIN ESTADO E ON S.Id_Estado = E.Id_Estado;
END;
GO

-- =============================================
-- SP CRUD: CUOTAS
-- =============================================

CREATE PROCEDURE sp_InsertarCuota
    @numeroCuota INT, @fechaVencimiento DATE,
    @montoCuota DECIMAL(12,2), @Id_Solicitud INT, @Id_Estado INT
AS BEGIN SET NOCOUNT ON;
    INSERT INTO CUOTAS (numeroCuota, fechaVencimiento, montoCuota, Id_Solicitud, Id_Estado)
    VALUES (@numeroCuota, @fechaVencimiento, @montoCuota, @Id_Solicitud, @Id_Estado);
    SELECT SCOPE_IDENTITY() AS Id_Cuotas;
END;
GO

CREATE PROCEDURE sp_ObtenerCuotasPorSolicitud @Id_Solicitud INT
AS BEGIN SET NOCOUNT ON;
    SELECT C.numeroCuota, C.fechaVencimiento, C.montoCuota, E.nombreEstado
    FROM CUOTAS C
    INNER JOIN ESTADO E ON C.Id_Estado = E.Id_Estado
    WHERE C.Id_Solicitud = @Id_Solicitud;
END;
GO