import User from '../../../DB/Models/user.model.js'
import cloudinaryConnection from "../../utils/cloudinary.js"
import generateUniqueString from "../../utils/generate-Unique-String.js"
import bcrypt from 'bcrypt'
import sendEmailService from "../../services/send-email.service.js"
// ======================= update profile user =======================//
/**
 * destructuring data from req.body
 * destructuring data from req.authUser ( loggedInUser)
 * if user want to update his email so we need to if the email is already exists
 * if exists return error
 * update user data
 * return success response
*/
export const updateAccount = async (req, res, next) => {
    const { username, email, age,phoneNumbers, addresses} = req.body
    const { _id } = req.authUser

    if (email) {
        // email check
        const isEmailExists = await User.findOne({ email })
        if (isEmailExists) return next(new Error('Email is already exists', { cause: 409 }))
    }
    const updatedUser = await User.findByIdAndUpdate(_id, {
        username, email, age,phoneNumbers, addresses
    }, {
        new: true
    })
    if (!updatedUser) return next(new Error('update fail'))
    res.status(200).json({ message: 'done', updatedUser })
}

// ======================= delete profile user =======================//
// * destructuring data from req.authUser ( loggedInUser)
// * delete user data
// * return success response
// */
export const deleteAccount = async (req, res, next) => {
   const { _id } = req.authUser
   const deletedUser = await User.findByIdAndDelete(_id)
   if (!deletedUser) return next(new Error('delete fail'))
   res.status(200).json({ message: 'done' })
}
// ======================= get user profile data =======================//
/**
 * destructuring data from req.authUser ( loggedInUser)
 * return success response
*/
export const getUserProfile = async (req, res, next) => {
    res.status(200).json({ message: "User data:", data: req.authUser })
}