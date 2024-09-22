const express = require('express');
const router = express.Router();


router.get('/', function (req, res, next) {
    res.render('admin/accountManagement/dashboard', { title: 'Account Management',  user: req.userName  });
});

const registerRouter = require('./registerUsers');
const viewRouter = require('./viewUsers');
const updateRouter = require('./editUsers')
const deleteRouter = require('./deleteUsers')


router.use('/register', registerRouter);
router.use('/view', viewRouter);
router.use('/edit', updateRouter)
router.use('/delete', deleteRouter)

module.exports = router;
