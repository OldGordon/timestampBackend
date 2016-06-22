var express = require('express'),
    moment = require('moment'),
    app = express(),
    port = process.env.PORT || 5000;

app.use(express.static('public'));

app.get('/:fecha',function(req, res){
     var fecha = req.params.fecha,
         time = null,
         data = null ,
         day , year, month,
         isNum = /^\d{8,}$/.test(fecha),
         monthNames = [ "January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December" ],
              //function that converts a unix time to a natural date
         convert = function(time){
         var temp = new Date(time);
         day = temp.getDate() ;
         year = temp.getFullYear();
         month = monthNames[temp.getMonth()];
            return month + ' ' + day + ', ' + year;
         };
            //termina declaración de variables y funciones
            //empieza la lógica
            //here  is used a function to format params.fecha into natural
        if(isNum){
            data = convert(parseInt(fecha)*1000);
            time = fecha;
        };
            //here I used the library moment.js just for fun
        if((isNaN(parseInt(fecha))) && (moment(fecha, "MMMM D, YYYY").isValid())){
           time = moment(fecha, "MMMM D, YYYY").format("X");
           data = moment.unix(time).format("MMMM D, YYYY");
        };
            //I can send a html piece instead of sending an object, looks a bit better
         res.send('<body background="bg.jpg"><h3>Unix: ' + time + '</h3><h3>Natural: '+ data +  '</h3></body>');
    });
app.listen(port, function () {
    console.log('running server on port ' + port);
});
