var express = require('express');
var contentful = require('contentful')

var app = express();

var client = contentful.createClient({
    accessToken: process.env.TOKEN,
    space: process.env.SPACEID,
})

app.get('/', function (req, res) {
    const getProducts = () => client.getEntries()
        .then(response => {
            const data = response.items;
            const cleanProducts = 
                data.map((item) => {
                    let obj = {};
                    obj.id = item.fields.sku;
                    obj.price = item.fields.price;
                    obj.url = `https://www.pearlsbeforeswine.ca/productData/${item.sys.id}`;
                    return obj;
                });

            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify(cleanProducts));
        });
       
    getProducts();
});
app.listen(3000, function () {
  console.log('Ears are open');
});