const { join, resolve } = require('path');
const express = require('express');

const NODE_ENV = process.env.NODE_ENV || 'production';
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, '../')));
app.get('*', (request, response) => response.sendFile(resolve(__dirname, '../', 'index.html')));

app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});
