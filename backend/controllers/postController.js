const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Post } = require('../models/post');

// => localhost:3000/post/
router.get('/', (req, res) => {
    Post.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Posts :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No post with given id : ${req.params.id}`);

        Post.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Post :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var po = new Post({
        titre: req.body.titre,
        contenu: req.body.contenu
    });
    po.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Post Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No post with given id : ${req.params.id}`);

    var po = {
        titre: req.body.titre,
        contenu: req.body.contenu
    };
    Post.findByIdAndUpdate(req.params.id, { $set: po }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Post Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No post with given id : ${req.params.id}`);

        Post.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Post Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;