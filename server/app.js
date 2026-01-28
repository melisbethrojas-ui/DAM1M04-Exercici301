const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();

// Paths
const viewsPath = path.join(__dirname, "views");
const partialsPath = path.join(__dirname, "views/partials");
const publicPath = path.join(__dirname, "../public");

// Configurar HBS
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Helper lte (<=)
hbs.registerHelper("lte", function (a, b) {
  return a <= b;
});

// Cargar datos JSON
const site = require("./data/site.json");
const cities = require("./data/cities.json");
const countries = require("./data/countries.json");

// Archivos estáticos
app.use(express.static(publicPath));


// ----------------------
// RUTA PRINCIPAL /
// ----------------------
app.get("/", (req, res) => {
  res.render("index", site);
});


// ----------------------
// RUTA INFORME /informe
// ----------------------
app.get("/informe", (req, res) => {
  res.render("informe", {
    title: site.title,
    subtitle: site.subtitle,
    cities: cities.cities,
    countries: countries.countries,
    threshold: 800000
  });
});


// ----------------------
// INICIAR SERVIDOR
// ----------------------
app.listen(3000, () => {
  console.log("Servidor en marxa: http://localhost:3000");
});
