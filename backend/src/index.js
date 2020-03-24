const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://boss:boss@cluster0-1rupk.mongodb.net/omni10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);

// .use significado que vai funcionar para todos os métodos http (get,post,delete..)
app.use(express.json()); // precisa vir antes das rotas
app.use(routes);


// Query params: request.query
// Route params: request.params
// Body: request.body

app.listen(3333);