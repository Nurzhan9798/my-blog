const express = require('express')
const app = express();

console.log('ok')

app.get('/test', (req, res) => {
    res.json("Test ok")
})

app.listen(5000)