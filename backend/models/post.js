const mongoose = require('mongoose');

var Post = mongoose.model('Post', {
    titre: { type: String },
    contenu: { type: String }
});

module.exports = { Post };