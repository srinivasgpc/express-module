
const Joi = require('joi')
const express = require('express');
const app = express();
app.use(express.json());
const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'},
];

app.get('/', (req, res) => {
   res.send('hello world');
});
app.get('/api/courses' , (req,res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {

    const schema = {
        name: Joi.String().min(3).required()
        };

    const result: Joi.validate(req.body,schema);
    if (result.error){
        res.status(400).send(result.error.default[0].message);
        return;
    };
 if (!req.body.name || req.body.name.lenght < 3 ){
    //404 Bad request
    res.status(400).send('Name of the required and should be more than three charactors')
    return;
 }

     const course = {
        id: courses.lenght + 1,
        name: req.body.name
     };
     courses.push(course);
     res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
   const course = courses.find(c => c.id === parseInt (req.params.id));
    if (!course) res.status(404).send('this course with the give id not found')//404
    res.send(course);
});

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});


//Environment variable
//PORT

// in terminal >> set port=5000
// then >> nodemon index.js
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));

