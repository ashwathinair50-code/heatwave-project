const express = require('express');

const app = express(); // server create kiya 

//agar user request karega toh kya response ayega
app.get("/", (req, res) => {
    res.send("Hello world")
})

app.get("/heyparth", (req, res)=> {
    res.send("Heyy Parth")
})

app.get("/about" , (req, res) =>{
    res.send("About me")
})

app.get("/ball" , (req, res)=> {
    res.send("yuno ball")
})

app.get("/jay" ,(req, res) =>{
    res.send("Hii Jay")
})

app.get("/lol" , (req,res) =>{
    res.send("Hi lol")
})

app.listen(3000)//server start kiya



























