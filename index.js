//imports
const express = require('express');

const app = express();
app.use(express.json());

const Joi = require('joi');
const schema = { //schema for validation
    name: Joi.string().min(3).required()
};

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
];

app.get('/', (req, res) => {
    res.send('Hi, everybody!')
});

app.get('/api/courses', (req, res) => {
    res.send(courses)
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