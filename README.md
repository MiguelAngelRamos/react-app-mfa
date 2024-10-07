
# MFA Authentication App with React, Vite, and Laravel API

## Descripción del Proyecto

Este proyecto es una aplicación frontend en **React** construida con **Vite** para la autenticación de usuarios, que incluye la opción de habilitar **autenticación multifactor (MFA)** utilizando **Google Authenticator**. La aplicación se comunica con una API en Laravel que maneja el registro, inicio de sesión y MFA. Los usuarios pueden iniciar sesión, acceder a su perfil y habilitar MFA escaneando un código QR generado por el backend.

## Características

- **Autenticación JWT**: Se utiliza JSON Web Token (JWT) para autenticar a los usuarios.
- **Autenticación Multifactor (MFA)**: Los usuarios pueden habilitar MFA en su perfil, escanear un código QR y luego utilizar Google Authenticator para proporcionar un código de verificación al iniciar sesión.
- **React Router**: Navegación entre diferentes páginas como inicio de sesión, perfil y activación de MFA.
- **Bootstrap**: Se utiliza Bootstrap para la creación de una interfaz de usuario responsiva y moderna.

## Tecnologías Utilizadas

- **React**: Biblioteca JavaScript para la creación de interfaces de usuario.
- **Vite**: Un entorno de desarrollo rápido y ligero para proyectos de frontend.
- **Axios**: Cliente HTTP para hacer peticiones a la API.
- **qrcode.react**: Librería para generar y mostrar códigos QR.
- **Bootstrap**: Framework CSS para un diseño responsivo.
- **Laravel API**: Backend que maneja la autenticación y MFA (necesario tenerlo configurado por separado).

## Instalación

### Requisitos Previos

- **Node.js**: Asegúrate de tener instalado Node.js (v14 o superior).
- **Laravel API**: Necesitarás configurar el backend en Laravel que maneje la autenticación JWT y MFA.

### Instrucciones de Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tuusuario/mfa-app.git
   cd mfa-app
   ```

2. **Instalar las dependencias**:
   Ejecuta el siguiente comando para instalar las dependencias de npm necesarias para el proyecto:
   ```bash
   npm install
   ```

3. **Instalar Bootstrap**:
   Bootstrap se instala como una dependencia de npm. Ya está incluido en `package.json`:
   ```bash
   npm install bootstrap
   ```

4. **Instalar Axios**:
   Axios es necesario para hacer las peticiones HTTP al backend:
   ```bash
   npm install axios
   ```

5. **Instalar qrcode.react**:
   Para mostrar los códigos QR en la interfaz, se instala la librería `qrcode.react`:
   ```bash
   npm install qrcode.react
   ```

6. **Correr la aplicación**:
   Una vez que las dependencias estén instaladas, puedes iniciar el servidor de desarrollo ejecutando:
   ```bash
   npm run dev
   ```

7. **Configurar el Backend**:
   Asegúrate de que tu API en Laravel esté corriendo y respondiendo correctamente en `http://127.0.0.1:8000/api`.

## Estructura de Carpetas

```plaintext
mfa-app/
│
├── src/
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Profile.jsx
│   │   ├── QRCodeDisplay.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── ProfilePage.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│
├── public/
│   └── index.html
│
├── package.json
└── vite.config.js
```

## Endpoints de la API en Laravel

Asegúrate de que los siguientes endpoints estén disponibles en tu API en Laravel:

- `POST /api/register`: Registro de usuarios.
- `POST /api/login`: Inicio de sesión con credenciales.
- `POST /api/enable-mfa`: Activación de MFA para usuarios autenticados.
- `POST /api/verify-mfa`: Verificación del código MFA enviado por el usuario.
- `GET /api/user-profile`: Ruta protegida que requiere autenticación JWT.

## Contribuciones

Las contribuciones son bienvenidas. Si encuentras algún error o tienes sugerencias para mejorar este proyecto, no dudes en abrir un issue o enviar un pull request.

## Licencia

Este proyecto está licenciado bajo la licencia MIT.


### Instrucciones y Notas

Este archivo README está pensado para proporcionar una descripción clara del proyecto y facilitar la configuración inicial del entorno. Asegúrate de que los endpoints y configuraciones en el backend estén correctamente integrados con el frontend para que todo funcione como se espera.
