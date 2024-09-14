const express = require('express');
const { loginController, registerController, authController, applyDoctorController, getAllNotificationDoctorController, deleteAllNotificationDoctorController, getAllDoctorController, bookAppointmentController, bookingAvailabilityController, userAppointmentsController } = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');



// router object
const router = express.Router();


// routes
// LOGIN || POST
router.post('/login', loginController);


// REGISTER || post
router.post('/register', registerController);


// AUTH || POST
router.post('/getUserData', authMiddleware, authController);

// APPLY DOCTOR || POST
router.post('/apply-doctor', authMiddleware, applyDoctorController);


// notification DOCTOR || POST
router.post('/get-all-notification', authMiddleware, getAllNotificationDoctorController);

// delete notification DOCTOR || POST
router.post('/delete-all-notification', authMiddleware, deleteAllNotificationDoctorController);


// GET ALL DOC
router.get('/getAllDoctor', authMiddleware, getAllDoctorController)

// BOOK APPOINTMENT
router.post('/book-appointment', authMiddleware, bookAppointmentController);

// BOOKING AVAILABILITY
router.post("/booking-availability", authMiddleware, bookingAvailabilityController);

// Appointment List
router.get('/user-appointments', authMiddleware, userAppointmentsController);


module.exports = router;