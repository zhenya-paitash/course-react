const route = require("express").Router()
const User = require("../models/User")
const CryptoJS = require("crypto-js")

// @route   GET api/user/
// @desc    Get User
// @access  Public
route.get("", (req, res) => {})

// @route   GET api/user/
// @desc    Get ALL Users
// @access  Public
route.get("", (req, res) => {})

// @route   GET api/user/
// @desc    Get User Stats
// @access  Public
route.get("", (req, res) => {})

// @route   PUT api/user/
// @desc    Update User information
// @access  Public
route.delete("", (req, res) => {})

// @route   DELETE api/user/
// @desc    Delete User
// @access  Public
route.delete("", (req, res) => {})

module.exports = route
