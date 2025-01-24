const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;

main()
  .then(() => console.log('mongodb successfully connected'))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    'mongodb+srv://admin:admin@evestiti.j5gav.mongodb.net/?retryWrites=true&w=majority&appName=evestiti'
  );

  app.get('/', (req, res) => {
    res.send('Evestiti Server is Running!');
  });
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
