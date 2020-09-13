# TP MongoDB


## Start docker 

Docker will run mongodb in a container. You can optionally use node with express to expose a HTTP API.

You have two options for the HTTP API:

- run locally with node (option 1)
- run node in a container (option 2)

### Option 1 (mongo containerized, node locally)

build and run MongoDB and Node.js API with `orders.json` dump:

```
docker-compose up --build -d 
```

if you encounter any problem (no order db), run `mongo-seed` first :

```
docker-compose up --build -d mongo-seed
docker-compose up -d
```

use mongodb (mongo shell):

```
docker-compose exec mongo-orders mongo admin
```

### Option 2 (mongo and node containerized)

```js
docker-compose -f docker-compose-with-node.yml up --build -d
```

## Use MongoDB

in mongodb shell:

```js
show dbs;
use order;
show collections;
db.orders.find();
```

function `pretty()` prettify the document

```js
db.orders.find().pretty();
```

compter le nombre d'enregistrements:

```js
db.orders.find().count();
```

il est possible d'exécuter du javascript pour ajouter des fonctionnalités supplémentaires (mais faites le maximum avec 
l'API de mongodb):

```js
db.orders.find().map( obj => obj.vendors );
```


## Use a HTTP Serveur (optional)

### Using node locally (option 1)

```js
cd api
npm install
npm start
```

API in Node.js available, example route http://localhost:3000/by-customer-pseudo/A**D

### Using node locally (option 2)

API already available at http://localhost:8080/by-customer-pseudo/A**D


# Missions

### Contraintes

- Utilisation du [`find()`](https://docs.mongodb.com/manual/reference/method/db.collection.find/#db.collection.find) pour les quatre premières requêtes
- Utilisation du [`aggregate()`](https://docs.mongodb.com/manual/reference/method/db.collection.aggregate/#db.collection.aggregate) pour les suivantes

### Requêtes à réaliser

1. liste des commandes qui ont deux sacs
2. liste des commandes concernant "les-fromages-de-gaetan"
3. comptez le nombre de commandes qui ont plus de quatre sacs
4. affichez les pseudos des acheteurs qui ont quatre sacs ou plus
5. liste des commandes du client avec l'id NumberLong("1848533681975648")
6. pour chaque client (id et pseudo), comptez le nombre de commandes
7. pour chaque vendeur, comptez le chiffre d'affaire (indication: `$unwind`)


# Vos solutions

### requête 1 

```js
db.orders.find({"shipping.bags" : 2}).pretty();
```

### requête 2

```js
db.orders.find({"vendors.slug" : "les-fromages-de-gaetan"}).pretty();
```

### requête 3

```js
db.orders.find({"shipping.bags" : {$gt : 4}}).count();
```

### requête 4

```js
db.orders.find({"shipping.bags" : {$gt : 3}}).map(function(i) { return i.customer.pseudo; });
```

### requête 5

```js
db.orders.aggregate([ { $match: { "customer.id": NumberLong("1848533681975648") } },
{ $project: {_id: 0, order: "$oid" } } ]);
```

### requête 6

```js
db.orders.aggregate([{$group: { _id: { id:"$customer.id", pseudo:"$customer.pseudo" },
"order(s)": {$sum:1} }} ]);
```

### requête 7

```js
db.orders.aggregate([ {$unwind: "$items" }, { $group : { _id: "$items.vendor",
chiffre_affaire: { $sum: { $multiply: [ "$items.finalprice", "$items.qty" ] } } }} ]);
```
