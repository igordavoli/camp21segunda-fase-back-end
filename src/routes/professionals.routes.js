// eslint-disable-next-line new-cap
const router = require('express').Router();
const { professionalsController } = require('../controllers');
const { isAuthorized, isSameUser } = require('../middlewares');

router.use(isAuthorized);

// List professionals
router.get('/', professionalsController.list);

// Profile details
router.get('/:id', isSameUser, professionalsController.account);

// Profile update
router.patch('/:id', isSameUser, professionalsController.update);

// Profile delete
router.delete('/:id', isSameUser, professionalsController.delete);

// Switch status
router.post('/:id/active-status', isSameUser, professionalsController.switchStatus);

// List consultations
router.get('/:id/consultations', isSameUser, professionalsController.listConsultations);

module.exports.professionals = router;
