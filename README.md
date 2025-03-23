# Toxicity: Red Social Basada en React con Funcionalidades Avanzadas

Bienvenido a Toxicity, una red social avanzada desarrollada en React que utiliza Redux para la gestión del estado global y `react-router-dom` para la navegación entre diferentes vistas de la aplicación. 
El "home" de la red social fue diseñado con renderizado 3D con threejs (https://threejs.org/) y React Three Fiber (https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) para la visualizacion de los posteos.

## Home:
![Home3d](https://github.com/SebasBarrientos/Toxicity-SocialApp/assets/117609894/6d45b0ac-655f-4d09-99b6-68e1aebd25d6)
![Home2](https://github.com/SebasBarrientos/Toxicity-SocialApp/assets/117609894/ec243ca8-1463-43b3-b78f-5da052f347ac)
## Feed:
![Feed](https://github.com/SebasBarrientos/Toxicity-SocialApp/assets/117609894/2a8c2552-e1ad-44ee-b800-d8c8e5cdfdd7)
## Login:
![Login](https://github.com/SebasBarrientos/Toxicity-SocialApp/assets/117609894/2ec2b9b6-2494-48b1-ad5d-932da978ebda)
## Register:
![Register](https://github.com/SebasBarrientos/Toxicity-SocialApp/assets/117609894/5ac12408-9158-4159-be5c-66166b038c76)
## Profile:
![Profile](https://github.com/SebasBarrientos/Toxicity-SocialApp/assets/117609894/54b98dc7-2a52-46c6-9deb-ba33f550f9d5)
## Resultados de la busqueda:
![Search](https://github.com/SebasBarrientos/Toxicity-SocialApp/assets/117609894/bc594047-62b7-490c-be4b-620b240634c4)
## Creando un nuevo post:
![New Post](https://github.com/SebasBarrientos/Toxicity-SocialApp/assets/117609894/6a20fdc7-b33d-44f8-9e00-6b0f62788861)
## Vista de un post en detalle:
![Post detail](https://github.com/SebasBarrientos/Toxicity-SocialApp/assets/117609894/9a2f01d5-6433-41b9-87db-37eeadb059c6)






A continuación se detallan las funcionalidades implementadas y cómo está estructurada la aplicación.
## Configuración del Proyecto

1. **Instalación de Dependencias**

   Asegúrate de tener Node.js y npm instalados en tu entorno de desarrollo. Para instalar las dependencias del proyecto, ejecuta:
   npm install


2. **Ejecución del Proyecto**

    Para iniciar la aplicación en modo de desarrollo, utiliza el siguiente comando:
    npm start


La base de datos implementada para este proyecto es la de este repositorio: https://github.com/SebasBarrientos/Back-End-red-social.
Una vez levantado el servidor y configurados los datos del env, se utiliza `http://localhost:3000` por defecto.

## Estructura del Proyecto

El proyecto está organizado con varios componentes y funcionalidades que se explican a continuación.

### Componentes Principales

- **`App.js`**: Configuración principal de las rutas de la aplicación utilizando `react-router-dom`.

- **`Header.js`**: Componente de encabezado que se muestra en la parte superior de todas las páginas.

- **`Footer.js`**: Componente de pie de página que se muestra en la parte inferior de todas las páginas.

- **`BackGround.js`**: Componente de fondo que proporciona un fondo 3d a todas las páginas de la aplicación.

### Componentes de Páginas

- **`Home.js`**: Página de inicio que muestra una vista general de la aplicación.

- **`UserSelected.js`**: Página protegida para ver detalles de un usuario específico, incluidas sus publicaciones, detalles de perfil y da la posibilidad de seguir al usuario.

- **`Posts.js`**: Página que muestra todas las publicaciones realizadas por los usuarios.

- **`CreatePost.js`**: Página para que los usuarios creen nuevas publicaciones adjuntando imágenes y ubicaciones.

- **`PostDetail.js`**: Página protegida para ver detalles específicos de una publicación, incluidos los comentarios y la interacción de me gusta.

- **`Login.js`**: Página para que los usuarios inicien sesión en la aplicación.

- **`Profile.js`**: Página protegida que muestra el perfil del usuario actual y permite realizar acciones como seguir a otros usuarios.

- **`Register.js`**: Página para que los usuarios nuevos se registren en la aplicación.

- **`Search.js`**: Página para buscar publicaciones por nombre de usuario o por contenido.

- **`NotFound.js`**: Página de error que se muestra cuando una ruta no coincide con ninguna página existente.

### Servicios y Configuraciones

- **`authService.js`**: Contiene funciones para el registro, inicio de sesión, cierre de sesión, obtener información de usuario y seguir/dejar de seguir a otros usuarios.

- **`commentsService.js`**: Contiene funciones para agregar, modificar y eliminar comentarios en las publicaciones.

- **`postsService.js`**: Contiene funciones para obtener publicaciones, crear nuevas publicaciones, actualizar, eliminar, dar me gusta y quitarlo a las publicaciones.

### Redux

La aplicación utiliza Redux Toolkit para manejar el estado global de manera eficiente. A continuación se detallan las configuraciones y funcionalidades relacionadas con Redux.

#### `authSlice.js`

Maneja el estado relacionado con la autenticación de usuarios, incluidas las acciones asíncronas para registrar usuarios, iniciar sesión, obtener información del usuario y buscar usuarios por nombre de usuario.

#### `postsSlice.js`

Maneja el estado relacionado con las publicaciones, incluidas las acciones asíncronas para obtener publicaciones, crear, actualizar y eliminar publicaciones, así como interactuar con me gusta y no me gusta en las publicaciones.

#### `reduxStore.js`

Configuración central del almacenamiento Redux que combina todos los reducers y configura el middleware necesario para manejar las acciones asíncronas.



### Configuración Adicional

- Asegúrate de configurar correctamente el backend para manejar las solicitudes HTTP esperadas por la aplicación. La configuración predeterminada asume un backend ejecutándose en `http://localhost:3000`.

- Ajusta los endpoints y configuraciones según sea necesario para que coincidan con la configuración de tu servidor backend.
  
### Explicaciones de librerias extra:
- La idea al comienzo del proyecto era utilizar tailwind pero para demostrar el manejo de scss se decidió continuar con el proyecto utilizando este último!

## 👥 Autores
Agustín Erimbaue

Sebastián Barrientos
