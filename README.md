# Aplicación CRUD - Práctica 1 - SO1 2S 2022

**Toda la aplicación esta servida en contenedores de docker-compose

## __Contenedor Backend en Golang__

Se utilizó el lenguaje de programación golang para la realización del servidor de backend para el manejo de la información y las peticiones desde la página web.

-Versión de go: 1.17.6
-Contenedor: backend
-Puerto (out/in) : 4000:4000

La estructura del proyecto es la siguiente:

-- main.go : Archivo que contiene la lógica para levantar el servidor y manejar las rutas
-- Controllers
----controller.go : Archivo que contiene los métodos que realizan las peticiones a la base de datos
------Create() : Método encargado de realizar las operaciones de creación de carros.
------createLog() : Método encargado de realizar las operaicones de registro de actividades.
------GetLogs() : Método encargado de retornar todos lo registros de operación en la base de datos.
------GetCar() : Método encargado de retornar todos los carros creados.
------Update() : Método encargado de actualizar los datos de un carro solicitado.
------Delete() : Método encargado de borrar un carro especificado
------enableCors() : Método encargado de habilitar los protocolos de cors.
-- Models
----car.go
------type Car : Estructura utilizada para crear un modelo de datos de un carro.
------type Cars[] : Estructura utilizada para crear un modelo de datos de todos los carros de la base de datos.
------type Log : Estructura utilizada para crear un modelo de datos de un log.
------type Logs[] : Estructura de datos utilizada para crear un modelo de datos de todos los logos de la base de datos.


## __Contenedor Frontend con ReactJS__

Se utilizó la libreria de React con lenguaje Javascript para el desarrollo de la página web dinámica de la aplicación CRUD y npm para el manejo de paquetes.

-Versión de node: node 16.13.0
-Versión de npm: 8.3.1
-Contenedor: frontend
-Puerto (out/in) : 3000:3000

La estructura del proyecto es la siguiente:

--App.js
--Index.js
--components 
----CrearModal.js : Componente que contiene el form con los datos necesarios para la creación de un carro.
----CreateCar.js : Componente que contiene el form con los datos necesarios para la creación de un carro v2.
----EditarModal.js : Componente que contiene el form con los datos necesarios para la edición de un carro.
----EliminarModal.js : Componenete que contiene el form con los datos necesarios para la eliminación de un carro.
----GetCarros.js : Componente que muestra una tabla con todos los carros creados y registrados actualmente en la aplicación.
----ListaPlacas.js : Componente que retorna la lista de todas las placas registradas en la aplicación.
----Navigation.js : Componenete que contiene la barra de navegación de la aplicación.
--containers
----Home.js : Componente principal en donde están montados todos los demás elementos de la aplicación. También es la página de inicio de la aplicación


## __Contenedor con base de datos en mongodb__

Se utilizó una base de datos en mongodb para el registro de toda la información de los carros en la aplicación.
El contenedor se creo con la última versión de mongo hasta agosto de 2022, la versión 5.0.11

-Versión mongo: 5.0.11
-Contenedor: database
-Puerto (out/in) : 27017:27017


Modelos en mongo:
Base de Datos: practica1
Collecciones:
--cars : Colección encargada de guardar toda la información de los carros.
----atributos:
------color
------marca
------modelo
------serie
------placa
--logs : Colección encargada de registrar todas las actividades realizadas en la aplicación por los usuariros.
----atributos:
------placa
------hora (UTC)
------tarea (Create, Update, Delete, Read)

## __Instrucciones__
- Clonar el repositorio
- Ejecutar el archivo docker-compose.yaml con el comando sudo docker-compose up -d (Para correrlo en segundo plano)
