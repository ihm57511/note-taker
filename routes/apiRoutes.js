let db = require('../db/db.json');
const path = require('path')
const fs = require('fs');
const {v4 : uuidv4} = require('uuid');


module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
            res.json(db);
        });
        
        app.post('/api/notes', (req, res) => {
            db.push(req.body);
            for (const note of db) {
                const newId = uuidv4();
                note.id = newId;
            };
            let newData = JSON.stringify(db);
            fs.writeFileSync(__dirname + "/../db/db.json", newData, (err) => {
                if (err) throw err
            })
            res.json(newData);
        });
        
        app.delete('/api/notes/:id', (req,res) => {
            let filter = db.filter((note) => {
                return note.id != req.params.id;
            });
            let newData = JSON.stringify(filter);
            db = filter;
            fs.writeFileSync(__dirname + "/../db/db.json", newData, (err) => {
                if (err) throw err
            })
            res.end();
        });
        
    }
    