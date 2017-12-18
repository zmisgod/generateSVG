var dnode = require('dnode');
var server = dnode({
    transform: function(s, cb) {
        console.log(s, cb)
            // cb(s.replace(/[aeiou]{2,}/, 'oo').toUpperCase())
    }
});
server.listen(5004);