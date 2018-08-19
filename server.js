const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 4000;

server.use(middlewares);


// Add custom routes before JSON Server router
server.get('/search', (req, res) => {
  var response = [];
  var data = require('./db.json');
  var categories = data.categories;
  if (req.query['filters']) {
    var filters = req.query['filters'].split('-')
    categories = categories.filter((e) => {
      return filters.indexOf(e.id) !== -1
    })
  }


  if (req.query['query']) {
    categories.forEach(function(element) {
      var products = element.products.slice();
      products = products.filter(function(e) {
        return e.name.toLowerCase().includes(req.query['query'].toLowerCase()) 
      });
      if (products.length > 0) {
        var category = Object.assign({},element);
        category.products = products
        response.push(category);
      }
    })
    res.json(response)
  } else {
    res.json(categories);
  }
})

server.use(router);

server.listen(port);