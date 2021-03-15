const db = require('../db/db.json');

module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        let id = 0;
        for (const note of db) {
            note.id = id++
        };
        res.json(db)});

    app.post('/api/notes', (req, res) => {
        db.push(req.body);
        res.json(db);
    })

}