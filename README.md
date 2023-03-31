# 🏪 eCommerce 🏪

Este eCommerce fue desarrollado para el curso de CoderHouse con el nombre **Programación Backend** El mismo cumplirá con los fixtures pedidos para la aprobación del curso.

---

## 👨‍💻 Datos del Creador 👨‍💻

![Pato](https://patojad.com.ar/img/perfil.jpg)

- **Nombre:** Joaquin Decima
- **Apodo:** Pato
- **Perfil CoderHouse:** https://plataforma.coderhouse.com/perfil/612cf2300afccd0011ec6c36
- **Sitio Personal:** https://joaquindecima.gitlab.io/

---

## 📁 Datos del proyecto 📁

- **Version de Node:** 😊 16.X
- **Tecnologias Utilizadas:**
  - 😍 Express
  - 😍 JavaScript
  - 😊 MongoDB
  - 😍 Compression
  - 😵 ~~Passport~~
  - 🙄 Winston
  - 😵 ~~Flash~~
  - 🙄 Handlebars
  - 🙄 Twilio
  - 😊 Nodemailer
  - 😍 Bootstrap 5
  - 😍 Fork Awesome
  - 😊 SocketIO
  - 😊 JsonWebToken
- **URL de muestra:** _No Disponible_
- **Servidor:** 🙄 Heroku
- **Theme:** 😍 Vasak PatoJAD (Creado bajo el nombre de Vasak Software Design para PatoJAD)

---

## 🚀 Como ejecutar el proyecto 🚀

Para poder correr el proyecto debemos clonarlo e instalar las dependencias, esto lo podemos hacer de la siguiente manera:

```shell
git clone https://github.com/JoaquinDecima/coderhouse-js-ecommerce
cd coderhouse-js-ecommerce
npm i
```

Luego debemos poder nuestras prorpias credecianles en el `.env` para eso podemos copiar el `.env.example` que nos muestra las credenciales que necesitamos.

```dotenv
## MongoDB
MONGO_USERS=sample
MONGO_PRODUCTS=sample
MONGO_CARTS=sample
MONGO_CHAT=sample
MONGO_ORDER=sample

## Secrets
SECRET_SESSION=sample

#Twilio
TWILIO_SMS_SID=sample
TWILIO_SMS_TOKEN=sample


## JWT
JWT_SECRET=sample
```

Una vez que tengamos las dependencias instaladas podemos ejecutarlo de la siguiente manera:

```shell
npm start
```

---

## 💻 Parametros de Lanzamiento 💻

El proyecto permite utilizar variables para modificar el comportamiento, estos parametros son los siguientes:

- `--modo=` permite cambiar el modo cluster y fork _(default fork)_

Un ejemplo del uso de esto es:

```bash
npm start -- --modo=cluster
```

---

## 🙌 Agradecimientos 🙌

Quiero agradecer en primer lugar a mi familia por el apoyo incondicional durante todo este proceso de aprendizaje.
Tambien a Telecom por permitirme formar parte de este curso.
A CoderHouse por la predispocicion y a los tutores y profesores del proceso, entre ellos quiero resaltar un agradecimiento especial a **Cristian Cuello** por su paciencia y gran predispocicion.
Y a **Mariano Aquino** por su didactica y las exelentes clases.
