// Código del servidor
const express = require("express");
const morgan = require("morgan");
const path = require("path");
// Interfaz gráfica
const exphbs = require("express-handlebars");
const app = express();
////Configuración de handlebars
// *Indicamos en donde estaran las vistas
app.set("views", path.join(__dirname, "views"));
// *Indicamos el motor de plantilla y se le pasa el objeto de configuración
app.engine(
  ".hbs",
  exphbs.create({
    defaultLayout: "main",
    extname: ".hbs"
  }).engine
);
// *Pot último pasamos el engine que vamos a crear
app.set("view engine", ".hbs");
// *Al hacer una petición podremos ver como se realiza
app.use(morgan("dev"));
// *Cuando se envie un dato por medio de post, el servidor podra entenderlo
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// *Cargamos las rutas que se encuentren en index
app.use(require("./routes/index"));

// Traemos el método static para hacer archivos públicos
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
