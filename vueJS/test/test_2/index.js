
const express = require('express');
const app = express();
const port = 3000;


const axios = require('axios');


app.use(express.static('public'))

// app.get('/', (req, res) => {
//     res.render(__dirname + "/public/index.html")
// });


// app.get('/p/:tagId', function(req, res) {
//     res.send("tagId is set to " + req.params.tagId);
//   });

app.get('/json/:mood', (req, res) => {

    axios.get(`http://musicovery.com/api/V6/playlist.php?&fct=getfromtag&resultsnumber=3&tag=${req.params.mood}&popularitymin=80`)
    .then(response => {
        res.json(response.data);
    })
    .catch(error => {
        console.log(error.code);
    });

    
});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));