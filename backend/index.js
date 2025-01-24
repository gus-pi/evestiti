const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//middlewares setup
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb' }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

main()
  .then(() => console.log('mongodb successfully connected'))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);

  app.get('/', (req, res) => {
    res.send('Evestiti Server is Running!');
  });
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
