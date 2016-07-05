module.exports = function(app){

  app.all('/ping', function(req, res) {
    res.status(204).send();
  });

};
