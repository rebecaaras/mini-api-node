//imports
const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());
const Joi = require('joi');

const schema = { //schema for validation
    name: Joi.string().min(3).required()
};

//data import
const artistData = JSON.parse(fs.readFileSync('data/artist.json', 'utf-8'))
const albumsData = JSON.parse(fs.readFileSync('data/albums.json', 'utf-8'))

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
];

//GET METHODS
app.get('/api/artist/hozier', (req, res) => {
    hozierData = {name: artistData.name, 
        followers: artistData.followers.total,
        genres: artistData.genres,
        image: artistData.images[0].url}

    res.send(hozierData);
});

//Fazer dicionário com albums e informações do album
app.get('/api/artist/hozier/albums', (req, res) => {
     let hozierAlbumsData = {}
     i = 10
     //for (i = 0; albumsData.items.length; i++){
        hozierAlbumsData[i] = {name: albumsData.items[i].name, 
            cover: albumsData.items[i].images[0].url,
            release_date: albumsData.items[i].release_date,
            total_tracks: albumsData.items[i].total_tracks};
     //}

    res.send(hozierAlbumsData)
});

app.get('/api/courses/:id', (req, res) => {
    //This code is a bit unclear to me...
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course){
        res.status(404).send('The course with the given id was not found.');
    } else {
        res.send(course);
    }
    
});

app.post('/api/courses', (req, res) => {
    const result = Joi.validate(req.body, schema);
    if (result.error){
         res.status(400).send(result.error.details[0].message)
         return
     } else {
         const course = {
         id: courses.length + 1,
         name: req.body.name,
         };

         courses.push(course);
         res.send(course);
     };
})

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course){
        res.status(404).send('The course with the given id was not found.');
    }
    
    const result = Joi.validate(req.body, schema);
    if (result.error){
         res.status(400).send(result.error.details[0].message)
         return
    } else {
        course.name = req.body.name;
        res.send(course);
    };
})

const port = process.env.PORT || 3000;

app.listen(port, () => 
    {console.log(`App listening on port ${port}...`)
});