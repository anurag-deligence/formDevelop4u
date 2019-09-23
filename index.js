const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const projects = require("./routes/projects");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));
app.use(express.static(path.join(__dirname, 'public')));

port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server listen at ' + port)
})

app.get('/', (req, res) => {
  res.send("here");
});

app.use("/", projects)
