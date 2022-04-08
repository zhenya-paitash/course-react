import axios from 'axios'

const API_URL = '/api/goal/'

// Create new goal
const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  const res = await axios.post(API_URL, goalData, config)
  return res.data
}

// Get user goals
const getGoals = async token => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  const res = await axios.get(API_URL, config)
  return res.data
}

// Delete user goal
const deleteGoal = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
  const res = await axios.delete(API_URL + goalId, config)
  return res.data
}

const goalService = {
  getGoals,
  createGoal,
  deleteGoal,
}
export default goalService
