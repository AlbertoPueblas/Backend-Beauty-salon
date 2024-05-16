 # Backend Beauty Salon

 ## Este proyecto consta de una base de datos relacional.

 ## Sobre el proyecto.
 Este proyecto es exclusivamente backend, he preparado las carpetas e instalado las dependencias correspondientes creando en primer lugar las migraciones y modelos pertientes. Y conexion con el servidor.
 Una vez realizada la conexión,cpmprobamos que todo funciona como debería creamos las rutas para poder probarlas con insomnia o postman para poder verificar que las rutas funcionan. Como reto, este proyecto incluye como opción extra crear administradores y otros endpoints.

 ## Stack
Tecnologías utilizadas:

![](https://img.shields.io/badge/TypeScript-lightblue?logo=TypeScript) ![](https://img.shields.io/badge/insomnia-purple?logo=Insomnia) ![](https://img.shields.io/badge/node-green?logo=node.js) ![](https://img.shields.io/badge/npm-red?logo=npm)

## Instalación
1. `$ git init`
2. ` $ npm install `
3. Conectamos nuestro repositorio con la base de datos 
4. ``` $ Ejecutamos las migraciones ``` 
5. ``` $ Ejecutamos los seeders ``` 
6. ``` $ npm run dev ``` (Inicializamos servior)
 
![Captura de pantalla 2024-03-16 100509](https://github.com/AlbertoPueblas/studio-tatto/assets/154467649/d11f601b-f1ef-4a49-999b-5b73b8d1f71e)

7. ``` $ npm run db:refresh ```(Ejecuta: Borrado de tablas, creacion de tablas , ejecuta Sedeers)

![image](https://github.com/AlbertoPueblas/studio-tatto/assets/154467649/9c39fe46-79a3-4ccc-a2dc-03e9c7e9129e)

## Endpoints
<details>
<summary>Endpoints</summary>

# Register y Login

- AUTH
    - REGISTER

            POST http://localhost:3000/api/register
        body:
        ``` ts
            {
                "user": "Marci",
                "email": "marci@mail.com",
                "password": "pasword"
            }
        ```

    - LOGIN

            POST http://localhost:3000/api/login  
        body:
        ``` ts
            {
                "user": "Marci",
                "email": "marci@mail.com",
                "password": "pasword"
            }
        ```

# Admin Routes

-   GET ALL USER

        GET http://localhost:3000/api/user/allUsers

    user:
    ``` ts
		{
			"id": 1,
			"firstName": "Velma",
			"lastName": "Reichel",
			"email": "admin1@admin.com",
			"phone": "2070084891309958"
		},
		{
			"id": 2,
			"firstName": "Matilde",
			"lastName": "Bruen",
			"email": "artist1@manager.com",
			"phone": "1994909995998439"
		},
    ```
- GET USER BY ID
 
        GET http://localhost:3000/api/user/user/19  
    ``` ts
        {
	        "id": 19,
	        "firstName": "Elizabeth",
	        "lastName": "Predovic",
	        "email": "Reed82@yahoo.com",
	        "phone": "0022397941668727"
        }
    ```

- GET ALL APPOINTMENT

        GET http://localhost:3000/api/appointment/totalDates

    ``` ts
		{
			"id": 1,
			"appointmentDate": "2024-11-06T21:20:11.000Z",
			"userId": 42,
			"treatsmentId": 22,
			"stylistId": 11
		},
		{
			"id": 2,
			"appointmentDate": "2024-08-31T11:18:26.000Z",
			"userId": 49,
			"treatsmentId": 30,
			"stylistId": 10
		},
    ```

- GET APPOINTMENT BY ID

        GET http://localhost:3000/api/appointment/date/2

    ``` ts
		{
			"id": 2,
			"appointmentDate": "2024-08-31T11:18:26.000Z",
			"userId": 49,
			"treatsmentId": 30,
			"stylistId": 10
		},
    ```

- GET ALL TREATSMENT

        GET http://localhost:3000/api/treatsment/allTreatsment/

    ``` ts
		{
			"id": 1,
			"treatsment": "Demens.",
			"price": 41
		},
		{
			"id": 2,
			"treatsment": "Deduco copiose.",
			"price": 20
		},
    ```

- GET TREATSMENT BY ID

        GET http://localhost:3000/api/treatsment/Treatsment/2

    ``` ts
		{
			"id": 2,
			"treatsment": "Deduco copiose.",
			"price": 20
		},
    ```
- PUT TREATSMENT

        GET http://localhost:3000/api/treatsment/Treatsment/2

    ``` ts
		{
			"id": 2,
			"treatsment": "Deduco copiose.",
			"price": 20
		},
        //---------------------------------------------
        {
	        "message": "Treatsment updated"
        }
    ```
- GET ALL STYLIST

        GET http://localhost:3000/api/user/allStyilist

    ``` ts
        {
			"id": 2,
			"firstName": "Matilde",
			"lastName": "Bruen",
			"email": "artist1@manager.com",
			"phone": "1994909995998439"
		},
		{
			"id": 3,
			"firstName": "Rosemary",
			"lastName": "Rau",
			"email": "artist2@manager.com",
			"phone": "1948602372588048"
		},
    ```
- PUT RESTORE USER PROFILE  (isActive:false)-->(isActive:true)

        PUT http://localhost:3000/api/user/restore/101

    ``` ts
		{
			"id": 101,
			"firstName": "Rosa",
			"lastName": "Rau",
			"email": "rosa@mail.com",
			"phone": "1948602372588048"
		},
    ```
- DELETE USER PROFILE BY ID

        DELETE http://localhost:3000/api/user/permanentDell/101

    ``` ts
		{
			"id": 101,
			"firstName": "Rosa",
			"lastName": "Rau",
			"email": "rosa@mail.com",
			"phone": "1948602372588048"
		},
        //-----------------------------------------------------
        {
	        "message": "User has been deleted"
        }
    ```
- DELETE TREATSMENT BY ID

        DELETE http://localhost:3000/api/treatsment/dellTreatsment/32

    ``` ts
        {
	        "message": "Treatsment deleted"
        }
    ```

# User Routes.

- CREATE APPOINTMENT

        POST http://localhost:3000/api/appointment/create
    ``` ts
        {
            "appointmentDate":"2024-12-31T23:00:00.000Z",
	        "treatsmentId": 10,
	        "stylistId":2,
	        "userId":103
        }
        //----------------------------------------------------
        {
        	"message": "Appointment created"
        }
    ```
- CREATE TREATSMENT

        POST http://localhost:3000/api/treatsment/newTreatsment
    ``` ts
        {
            "treatsment": "uñas mate",
	        "price":20
        }
        //----------------------------------------------------
        {
        	"message": "Treatsment created"
        }
    ```
- GET ME PROFILE

        GET http://localhost:3000/api/user/profile

    ``` ts
		{
        	"id": 97,
        	"firstName": "Hillard",
        	"lastName": "Halvorson",
        	"email": "Maribel_McCullough77@hotmail.com",
        	"phone": "5899619519110805"
		},
    ```
- GET ME APPOINTMENT

        GET http://localhost:3000/api/user/appointment

    ``` ts
		{
        		"id": 97,
	            "firstName": "Hillard",
	            "lastName": "Halvorson",
	            "email": "Maribel_McCullough77@hotmail.com",
	            "phone": "5899619519110805",
	            "clientDates": [
		{
			"id": 83,
			"appointmentDate": "2025-04-15T19:18:04.000Z",
			"userId": 97,
			"treatsmentId": 6,
			"stylistId": 2
		},
		{
			"id": 87,
			"appointmentDate": "2024-05-21T14:22:50.000Z",
			"userId": 97,
			"treatsmentId": 29,
			"stylistId": 9
		}
	]
    }
    ```
- PUT ME PROFILE

        PUT http://localhost:3000/api/user/putProfile

    ``` ts
	{
		"id": 97,
        "firstName": "Hillard",
        "lastName": "Halvorson",
        "email": "Maribel_McCullough77@hotmail.com",
        "phone": "5899619519110805",
    }
    //---------------------------------------------------
    {
	    "message": "User has been updated"
    }
    ```
- PUT ME APPOINTMENT

        PUT http://localhost:3000/api/user/putProfile

    ``` ts
	{
        "appointmentDate": "2024-05-14T19:30",
        "id":101,
        "treatsmentId":3,
        "stylistId": 3,
        "userId": 103
    }
    //---------------------------------------------------
    {
	    "message": "Date has been updated"
    }
    ```
- PUT DELETE APPOINTMENT (isActive:true)-->(isActive:false)

    PUT http://localhost:3000/api/user/delete

 ```ts
    {
	"message": "User has been deactivated"
    }
 ```

- DELETE APPOINTMENT BY ID

        DELETE http://localhost:3000/api/appointment/deleteAppointment
```ts
    {
	"message": "Appointment has been deleted"
    }
```




## Contribuciones
Las sugerencias y aportaciones son siempre bienvenidas.  

Puedes hacerlo de dos maneras:

1. Abriendo una issue
2. Crea un fork del repositorio
    - Crea una nueva rama  
        ```
        $ git checkout -b feature/nombreUsuario-mejora
        ```
    - Haz un commit con tus cambios 
        ```
        $ git commit -m 'feat: mejora X cosa'
        ```
    - Haz push a la rama 
        ```
        $ git push origin feature/nombreUsuario-mejora
        ```
    - Abre una solicitud de Pull Request

## Licencia
Este proyecto se encuentra bajo licencia de "Alberto Pueblas"

## Webgrafia:
Para conseguir adquirir mas conocimientos he recopilado información de:
- webs
- link a documentacion de librerias externas
