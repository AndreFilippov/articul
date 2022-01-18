const express = require('express');
const morgan = require('morgan');

const usersRouter = require('./routes/users');
const { port } = require("./environments/environment");

const app = express();

app.use(morgan('combined'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', usersRouter);

app.use((err, req, res, next) => {
  err = err.errors ? err.errors[0] : err;
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send(err);
});

app.listen(port, () => {
  console.log(`Listener :: ${port}`);
})
