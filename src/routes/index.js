const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('TODO ES MEJOR SI NO ES PYTHON :C')
});

module.exports = router;