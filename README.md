<p align="center">
  <a href="https://edwarcastillo.netlify.app/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>
  <p align="center">Repositorio Backend Elsolnec Node.js</a> </p>
    <p align="center">
    <p align="center">
  <a href="https://edwarcastillo.netlify.app/" target="blank"><img src="https://raw.githubusercontent.com/edcastillob/Countries-ProyectoIndividual/main/client/src/assets/ec.png" width="150" alt="EDCastillo Logo" /></a>
</p>
</p>
 
## Descripcion

Proyecto Backend para Prueba Técnica  

## Installation
Descarga ó Clona el Proyecto, 
```bash
$ npm install
```
De estas maneras ya con las dependencias instaladas procedemos a configurar las variables de entorno y base de datos.

## .ENV, Develop
 Revisamos o creamos el archivo ".develop.env" para configurar el puerto 8000 como default en las colecciones
```bash
    #Config DataBase

    DB_HOST=localhost, Tu localhost
    DB_PORT=5432, Puerto por defecto Postgres
    DB_USER=          :Ingresa el usuario de tu cliente postgres 
    DB_PASSWORD=      :Ingresa la Contraseña de tu cliente postgres
    DB_NAME=          :Ingresa la base de datos para correr la migración
```
## Mi .ENV, Develop Utilizado
 ```
    PORT=8000

    #Config DataBase

    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=elsolnec
    DB_PASSWORD=elsolnec
    DB_NAME=elsolnec
```
## Para Correr la migración en ambiente windows
 ```bash
$ npm run m:gen -- ./migrations/init

# Una vez completada procedemos a:

$ npm run m:run
```
## En esta instancia contamos con la base de datos para proceder a realizar las pruebas

<p align="center">
  <img src="https://res.cloudinary.com/prodelevatepf/image/upload/v1706714198/prodelevatepf/kxyq5bu3rtrpxjggk5pl.png" alt="Img Migracion" />
</p>


## En Windows se setea el `.env` para la migración

<p align="center">
  <img src="https://res.cloudinary.com/prodelevatepf/image/upload/v1706714852/prodelevatepf/mykurn0t7hugo2u2ndmj.png" alt="Img Migracion" />
</p>

## Si tu Sistema operativo es Linux deberas modificar el package.json para poder correr la migración
## En Linux, se establece la configuración del entorno en el archivo `.env` para la migración

Aquí, debes cambiar el `set` por `export`:

```bash
    "m:gen": "export NODE_ENV=develop && npm run orm:init migration:generate",
    "m:run": "export NODE_ENV=develop && npm run orm:init migration:run"
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## La documentación adicional la encontraras con Swagger donde están modelados y documentados todos los endpoint de la aplicación

### Endpoints
<p align="center">
  <img src="https://res.cloudinary.com/prodelevatepf/image/upload/v1706716249/prodelevatepf/ddneyv9fvjgxewjiuhr3.png" alt="Img Migracion" />
</p>

### Esquemas DTO Entity
<p align="center">
  <img src="https://res.cloudinary.com/prodelevatepf/image/upload/v1706716307/prodelevatepf/irrxzhvhjtv7p7jfzwjz.png" alt="Img Migracion" />
</p>

### Consultas Product All
<p align="center">
  <img src="https://res.cloudinary.com/prodelevatepf/image/upload/v1706716353/prodelevatepf/hj175ikkrdavkqglsb54.png" alt="Img Migracion" />
</p>

### Server On
<p align="center">
  <img src="https://res.cloudinary.com/prodelevatepf/image/upload/v1706716409/prodelevatepf/h9gox7tfelzbc7azrpdm.png" alt="Img Migracion" />
</p>

 <p align="center"></a> </p>
    <p align="center">
    <p align="center">
  <a href="https://edwarcastillo.netlify.app/" target="blank"><img src="https://raw.githubusercontent.com/edcastillob/Countries-ProyectoIndividual/main/client/src/assets/ec.png" width="150" alt="EDCastillo Logo" /></a>
</p>
<hr/>
<hr/>
