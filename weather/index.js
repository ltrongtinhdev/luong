const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors')

const app = express();
const server = require("http").Server(app);
const io = require('socket.io')(server);
const logger = require('./helpers/winston')

const config = require('./helpers/config')

const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./helpers/swagger.json');


app.use(cors())
const indexRouter = require('./routes')
const userRouter = require('./routes/user')
const _linkRouter = require('./routes/link')


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'views')));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use('/',indexRouter)
app.use('/chat', function(req, res){
    res.render("chat");;
});
app.use('/v1/users',userRouter);
app.use('/v1/links',_linkRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(function(req, res, next) {
    next(createError(404));
});
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    logger.error(config.bodyWinston(1,JSON.stringify(err)))
    // render the error page
    return res.status(err.status || 500);
});
io.on('connection', function(socket){
    socket.on('disconnect',function(){

    })
    console.log("user connect")
    socket.on('chat-message', function(msg){
        console.log('message: '+msg)
    })
    socket.on("client-sent-data", function(data){
        socket.emit("server-sent-data", data);
	});
})
const PORT = process.env.PORT || 3000
server.listen(PORT,() => {
    console.log(`Server running .. ${PORT}`)
    logger.info(`Server running .. ${PORT}`)
})

    
