const {app} = require('./routes/Express');

const PORT = process.env.PORT || 3789;

app.get('/login',(req, resp)=>{

});

app.listen(PORT, ()=>{
    console.log(`Process listening on port ${PORT}`);
});

