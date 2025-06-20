const express = require('express');
const app = express();
const routes = require('./routes');
const userModel = require('./models/user');
const questionModel = require('./models/question');
const questionBankModel = require('./models/questionBank');
const classModel = require('./models/class');

app.use(express.json());
app.use('/api', routes);

(async () => {
  try {
    await userModel.createTable();
    await questionModel.createTable();
    await questionBankModel.createTable();
    await classModel.createTable();
  } catch (err) {
    console.error('Database initialization error', err);
  }
})();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
