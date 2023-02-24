import express from 'express'
import { clientsAPI } from './src/clients/index.js'
import cors from 'cors'
import { Config } from './src/config/index.js'
import { creditsAPI } from './src/credits/index.js'
import { engine } from 'express-handlebars'

// Alternative to __dirname for node.js when use ES Modules
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

// Set view engine for handlebars
app.engine('hbs', engine({
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', './src/view')

app.use(cors({
  origin: '*'
}))
console.log(__dirname)

// modulos
clientsAPI(app)
creditsAPI(app)

app.get('/home', (req, res) => {
  res.render('home')
})

app.listen(Config.port, () => {
  console.log(`Servidor escuchando en http://localhost:${Config.port}`)
})
