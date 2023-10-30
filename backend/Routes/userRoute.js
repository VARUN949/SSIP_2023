const express = require("express");
const { RegisterUser, LoginUser, Logout, forgotPassword, resetPassword, getUserProfile, UpdatePassword, UpdateProfile, getalluser, getSinglealluser, UpdateRole, DeleteUser, adminLogin } = require("../controller/userController");
const { isAuthenticator, isUserAuthorized } = require("../Middleware/auth");

const router = express.Router()
router.route("/register").post(RegisterUser)
router.route("/login").post(LoginUser)
router.route("/admin-login").post(adminLogin)
router.route("/password/reset").post(forgotPassword)
router.route("/password/change/:token").put(resetPassword)
router.route("/logout").get(Logout)
router.route("/me").get(isAuthenticator, getUserProfile)
router.route("/me/updatepassword").put(isAuthenticator, UpdatePassword)
router.route("/me/updateprofile").put(isAuthenticator, UpdateProfile)
router.route("/admin/getusers").get(isAuthenticator, isUserAuthorized("admin"), getalluser)
router.route("/admin/getuser/:id").get(isAuthenticator, isUserAuthorized("admin"), getSinglealluser)
router.route("/admin/updaterole/:id").put(isAuthenticator, isUserAuthorized("admin"), UpdateRole)
router.route("/admin/deleteuser/:id").delete(isAuthenticator, isUserAuthorized("admin"), DeleteUser)
module.exports = router
