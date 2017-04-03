module.exports = function(app, express) {
  // Public directory
  app.set('views', __dirname + '/views/');
  console.log(__dirname);
  app.use(express.static(__dirname +'/public/makina_corpus'));

  var utils = require('./utils.js')(app, express);

  app.get('/', (req,res) => {
    utils.graph((err, html) => {
      res.render('index.ejs', {graph: html});
    })
  });
}
