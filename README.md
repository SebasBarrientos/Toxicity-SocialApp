# Toxicity: Red Social Basada en React con Funcionalidades Avanzadas

Bienvenido a Toxicity, una red social avanzada desarrollada en React que utiliza Redux Toolkit para la gestión del estado global y `react-router-dom` para la navegación entre diferentes vistas de la aplicación. A continuación se detallan las funcionalidades implementadas y cómo está estructurada la aplicación.

## Configuración del Proyecto

1. **Instalación de Dependencias**

   Asegúrate de tener Node.js y npm instalados en tu entorno de desarrollo. Para instalar las dependencias del proyecto, ejecuta:
   npm install


2. **Ejecución del Proyecto**

    Para iniciar la aplicación en modo de desarrollo, utiliza el siguiente comando:
    npm start


Esto iniciará la aplicación en `http://localhost:3000` por defecto.

## Estructura del Proyecto

El proyecto está organizado con varios componentes y funcionalidades que se explican a continuación.

### Componentes Principales

- **`App.js`**: Configuración principal de las rutas de la aplicación utilizando `react-router-dom`.

- **`Header.js`**: Componente de encabezado que se muestra en la parte superior de todas las páginas.

- **`Footer.js`**: Componente de pie de página que se muestra en la parte inferior de todas las páginas.

- **`BackGround.js`**: Componente de fondo que proporciona un fondo común a todas las páginas de la aplicación.

### Componentes de Páginas

- **`Home.js`**: Página de inicio que muestra una vista general de la aplicación.

- **`UserSelected.js`**: Página para ver detalles de un usuario específico, incluidas sus publicaciones y detalles de perfil.

- **`Posts.js`**: Página que muestra todas las publicaciones realizadas por los usuarios.

- **`CreatePost.js`**: Página para que los usuarios creen nuevas publicaciones adjuntando imágenes y ubicaciones.

- **`PostDetail.js`**: Página para ver detalles específicos de una publicación, incluidos los comentarios y la interacción de me gusta.

- **`Login.js`**: Página para que los usuarios inicien sesión en la aplicación.

- **`Profile.js`**: Página protegida que muestra el perfil del usuario actual y permite realizar acciones como seguir a otros usuarios.

- **`Register.js`**: Página para que los usuarios nuevos se registren en la aplicación.

- **`Search.js`**: Página para buscar publicaciones por nombre de usuario o por contenido.

- **`NotFound.js`**: Página de error que se muestra cuando una ruta no coincide con ninguna página existente.

### Servicios y Configuraciones

- **`authService.js`**: Contiene funciones para el registro, inicio de sesión, cierre de sesión, obtener información de usuario y seguir/dejar de seguir a otros usuarios.

- **`commentsService.js`**: Contiene funciones para agregar, modificar y eliminar comentarios en las publicaciones.

- **`postsService.js`**: Contiene funciones para obtener publicaciones, crear nuevas publicaciones, actualizar, eliminar, dar me gusta y no me gusta a las publicaciones.

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

---

Este README.md proporciona una visión general completa del proyecto "Toxicity", incluidas las funcionalidades implementadas, la estructura del proyecto y las configuraciones clave. Asegúrate de actualizar este archivo conforme realices cambios y mejoras en tu aplicación.
