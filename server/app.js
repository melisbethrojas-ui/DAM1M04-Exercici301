const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();
const port = 3000;

// 1. Configurar Handlebars
app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: false,
  helpers: {
    lte: (a, b) => a <= b
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// 2. Archivos estáticos
app.use(express.static('public'));

// 3. Cargar JSON
const site = require('./data/site.json');
const cities = require('./data/cities.json');
const countries = require('./data/countries.json');

// 4. Ruta principal "/"
app.get('/', (req, res) => {
  res.render('index', site);
});

// 5. Ruta "/informe"
app.get('/informe', (req, res) => {
  res.render('informe', {
    title: site.title,
    subtitle: site.subtitle,
    cities: cities.cities,
    countries: countries.countries,
    threshold: 800000
  });
});

// 6. Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor en marxa: http://localhost:${port}`);
});
