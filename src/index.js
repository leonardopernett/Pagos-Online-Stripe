const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const app = express();


app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'))
app.engine('.hbs', hbs({
  defaultLayout:'main',
  layoutsDir:path.join(app.get('views'), 'layout'),
  partialsDir:path.join(app.get('views'), 'partial'),
  extname:'.hbs'
}))

app.set('view engine', '.hbs')

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(require('./router/index'))

app.use(express.static(path.join(__dirname,'public')))

app.listen(app.get('port'),()=>console.log('server on port 3000'));








