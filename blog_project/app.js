const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/api', blogRoutes);

sequelize
.sync()
.then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT: ${process.env.PORT}`);
  });
}).catch(err => console.log(err));
