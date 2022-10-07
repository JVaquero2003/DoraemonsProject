const express = require("express");
const app = express();

const cors = require('cors');
app.use(cors());

app.get('/weather', function (req, res) {
  const data = require("./temperatures.json")
  const {year, month} = req.query;
  const filteredData = data
    .filter(item => !year ? true : item.year === year)
    .filter(item => !month ? true : item.month.toLowerCase() === month.toLowerCase());
  res.send(filteredData);
})
app.get('/bushfire', function (req, res) {
  const data = require("./incendios.json")
  res.send(data);
})
app.get('/fires', function (req, res) {
  const data = require("./historico.json")
  const {year, month} = req.query;
  const filteredData = data
    .filter(item => !year ? true : item.year === year)
    .filter(item => !month ? true : item.month.toLowerCase() === month.toLowerCase());
  res.send(filteredData);
});


app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});

