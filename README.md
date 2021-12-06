<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://www.armadilloamarillo.com/wp-content/uploads/logo-home.jpg" height="100"></a></p>

## Acerca de este código

La aplicación aquí escrita corresponde a la prueba técnica del proceso de selección de empleados y proveedores de Armadillo Amarillo.

Se trata de una aplicación web dividida en dos partes:

 - Frontend
    - Público:  Login y registro de nuevo usuario
    - Privado: Lista de usuarios registrados con búsqueda por nombre y filtro por mayor/menor de edad

- Backend: Api para el login, registro de nuevo usuario y lista de usuarios registrados con sus respectivos filtros (nombre y edad)

&nbsp;
## Qué se ha utilizado
### Backend
El backend fue desarrollado con el framework [Laravel](https://laravel.com/) debido a la familiaridad que tengo con él y las herramientas que dispone para crear fácilmente login y api

&nbsp;
### Frontend
Como frontend se utilizó la biblioteca [ReactJs](https://es.reactjs.org/) por su versatilidad en el manejo de datos, junto con [React Bootstrap](https://react-bootstrap.github.io/) para aprovechar los componentes que éste incluye.

&nbsp;
## Modelo Entidad Relación
La base de datos es sencilla, solo la tabla de usuarios (sin contar las generadas automáticamente por *Laravel*) por lo que el diagrama quedaría así:

<p align="center">
    <img src="MER.jpg?raw=yes" height="400">
</p>

> Autor: ***Marcos Javier Vazquez***