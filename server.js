const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 4000;
const data = require('./db.json');

server.use(middlewares);


// Add custom routes before JSON Server router
server.get('/search', (req, res) => {
  let response = {categories: []};
  console.log(req.query)
  if (req.query['query']) {
    data.categories.forEach(function(element) {
      var products = element.products.filter(function(e) {
        return e.name.toLowerCase().includes(req.query['query'].toLowerCase()) 
      });
      if (products.length > 0) {
        element.products = products;
        response.categories.push(element);
      }
    })
  }
  res.json(response)
})

server.use(router);

server.listen(port);