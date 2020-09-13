const u = require('./utils');
const queries = require('./queries');
const router = require('express').Router();

router.get('/hello', (req, res) => {
    u.logReq(req);
    res.send({ message: 'hello' });
});

router.get('/by-customer-pseudo/:pseudo', queries.byCustomerPseudo);

router.use((_, res) => res.status(404).send({ message: 'Route not found' }));

module.exports = router;
