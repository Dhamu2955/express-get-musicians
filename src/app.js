const express = require("express");
const app = express();
const { Musician, Band } = require("../models/index")
const { db } = require("../db/connection")


const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 
app.use(express.json())
app.use(express.urlencoded())

app.get("/musicians", async (request, response) => {
    const data = await Musician.findAll()
    response.json(data)
})

app.get("/musicians/:id", async (request, response) => {
    const musiciansId = request.params.id
    const data = await Musician.findByPk(musiciansId)
    response.json(data)
})

app.get("/bands", async (request, response) => {
    const data = await Band.findAll()
    response.json(data)
})

app.get("/bands/:id", async (request, response) => {
    const bandsId = request.params.id
    const data = await Band.findByPk(bandsId)
    response.json(data)
})

app.post("/musicians/", async (req, res) => {
    const data = req.body
    const musician = await Musician.create(req.body) 
    res.json(musician)
})

app.put("/musicians/:id", async (req, res) => {
    const param = req.params.id
    const data = req.body
    const musician = await Musician.update(data, {
        where: {id: param}
    }) 
    res.json(musician)
})

app.delete("/musicians/:id", async (req, res) => {
    const param = req.params.id
    const musician = await Musician.destroy({where: {id: param}})
    res.json(musician)
})



module.exports = app;