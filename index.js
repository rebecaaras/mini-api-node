//imports
const express = require('express');
const fs = require('fs');
const Joi = require('joi');
const app = express();

app.use(express.json());

//schema for validation
const schema = Joi.object({
    name: Joi.string().min(3).required()
});

//Data import
const artistData = JSON.parse(fs.readFileSync('data/artist.json', 'utf-8'))
const albumsData = JSON.parse(fs.readFileSync('data/albums.json', 'utf-8'))
const topTracksData = JSON.parse(fs.readFileSync('data/top-tracks.json', 'utf-8'))

//Array with all albums
const albums = albumsData.items.map((item, index) => ({
    id: index + 1,
    name: item.name,
    cover: item.images[0].url,
    release_date: item.release_date,
    total_tracks: item.total_tracks,
}));

//Array with top tracks
const topTracks = topTracksData.tracks.map(track => ({
    name: track.name,
    album: track.album.name,
    release_date: track.album.release_date,
    popularity: track.popularity
}));

app.get('/api/artist/hozier', (req, res) => {
    artist = {name: artistData.name, 
        followers: artistData.followers.total,
        genres: artistData.genres,
        image: artistData.images[0].url}

    res.send(artist);
});

app.get('/api/artist/hozier/albums', (req, res) => {
    res.send(albums)
});

app.get('/api/artist/hozier/albums/:id', (req, res) => {
    //This code is a bit unclear to me...
    index = parseInt(req.params.id)
    let album = albums[index]
    if (!album){
        res.status(404).send('The album with the given id was not found.');
    } else {
        res.send(album);
    }
});

app.get('/api/artist/hozier/top-tracks', (req, res) => {
    res.send(topTracks)
});

myFavouriteTracks = [];
//POST favourite track
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

//DELETE favourite tracks
app.delete('/api/artist/hozier/my-favourite-tracks/:id', (req, res) => {
    index = parseInt(req.params.id)
    const trackToDelete = myFavouriteTracks.find(t => t.id === index)
    if (!trackToDelete){
        res.status(404).send('The track with the given id was not found.');
    } else {
        const index = myFavouriteTracks.indexOf(trackToDelete)
        myFavouriteTracks.splice(index, 1)
        res.send(trackToDelete);
    }
});

const port = process.env.PORT || 5000;

app.listen(port, () => 
    {console.log(`App listening on port ${port}...`)
});