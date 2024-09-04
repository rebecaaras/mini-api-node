//imports
const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());
const Joi = require('joi');

const schema = Joi.object({ //schema for validation
    name: Joi.string().min(3).required()
});

//data import
const artistData = JSON.parse(fs.readFileSync('data/artist.json', 'utf-8'))
const albumsData = JSON.parse(fs.readFileSync('data/albums.json', 'utf-8'))
const topTracksData = JSON.parse(fs.readFileSync('data/top-tracks.json', 'utf-8'))

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
];

//GET METHODS
app.get('/api/artist/hozier', (req, res) => {
    artist = {name: artistData.name, 
        followers: artistData.followers.total,
        genres: artistData.genres,
        image: artistData.images[0].url}

    res.send(artist);
});

//Fazer dicionário com albums e informações do album
let albums = {}
     for (i = 0; i < albumsData.items.length; i++){
        albums[parseInt(i + 1)] = {name: albumsData.items[i].name, 
            cover: albumsData.items[i].images[0].url,
            release_date: albumsData.items[i].release_date,
            total_tracks: albumsData.items[i].total_tracks};
     }

app.get('/api/artist/hozier/albums', (req, res) => {
    res.send(albums)
});

app.get('/api/artist/hozier/albums/:id', (req, res) => {
    //This code is a bit unclear to me...
    let album = albums[req.params.id]//.find(a => a === parseInt(req.params.id));
    if (!album){
        res.status(404).send('The album with the given id was not found.');
    } else {
        res.send(album);
    }
    
});

let topTracks = [] //topTracksData//[]
for (i = 0; i < topTracksData.tracks.length; i++){
    topTracks[i] = {name: topTracksData.tracks[i].name,
        album: topTracksData.tracks[i].album.name,
        release_date: topTracksData.tracks[i].album.release_date,
        popularity: topTracksData.tracks[i].popularity,     
        }
 }

 app.get('/api/artist/hozier/top-tracks', (req, res) => {
    res.send(topTracks)
});

myFavouriteTracks = [];
app.post('/api/artist/hozier/my-favourite-tracks', (req, res) => {
    const result = schema.validate(req.body);
    if (result.error){
         res.status(400).send(result.error.details[0].message)
         return
     } else {
         const track = {
         id: myFavouriteTracks.length + 1,
         name: req.body.name,
         };

         myFavouriteTracks.push(track);
         res.send(track);
     };
})

//GET favourite tracks
app.get('/api/artist/hozier/my-favourite-tracks', (req, res) => {
    res.send(myFavouriteTracks)
});

app.delete('/api/artist/hozier/my-favourite-tracks/:id', (req, res) => {
    const trackToDelete = myFavouriteTracks.find(t => t.id === parseInt(req.params.id))
    if (!trackToDelete){
        res.status(404).send('The track with the given id was not found.');
    } else {
        const index = myFavouriteTracks.indexOf(trackToDelete)
        myFavouriteTracks.splice(index, 1)
        res.send(trackToDelete);
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => 
    {console.log(`App listening on port ${port}...`)
});