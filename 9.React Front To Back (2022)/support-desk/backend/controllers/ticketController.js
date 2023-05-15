const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @desc    Get user tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const tickets = await Ticket.find({ user: req.user.id })

  res.status(200).send(tickets)
}

// @desc    Get ticket by ID
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  res.status(200).send(ticket)
}

// @desc    Create new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = async (req, res) => {
  const { product, description } = req.body
  if (!product || !description) {
    res.status(400)
    throw new Error('Please add a product and description')
  }

  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.create({
    user: req.user.id,
    product,
    description,
    status: 'new',
  })

  res.status(201).send(ticket)
}

// @desc    Delete ticket
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  await ticket.remove()

  res.status(200).send({ success: true })
}

// @desc    Update ticket
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  const updTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).send(updTicket)
}

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
}
