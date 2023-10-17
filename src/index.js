const expres = require('express')
const morgan = require('morgan')
const cors = require('cors')


const taskRoute = require('./routes/tasks.routes')

const app = expres()

app.use(cors())
app.use(morgan('dev'));
app.use(expres.json());

app.use(taskRoute)

//midleware de error
app.use((err, req, res, next)=> {
    return res.json({
        message: 'Error, algo ocurrio, revise los datos!!!!'
    })
})

app.listen(3000)
console.log("servidor puerto 3000")