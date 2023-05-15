import axios from 'axios'

const {
  REACT_APP_GITHUB_URL: GITHUB_URL,
  REACT_APP_GITHUB_TOKEN: GITHUB_TOKEN,
} = process.env

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
})

/* =============================================================================
  * GITHUB ACTIONS
============================================================================= */
// ? Get search results
export const searchUsers = async text => {
  const params = new URLSearchParams({ q: text })
  const res = await github.get(`/search/users?${params}`)
  return res.data.items
}

// ? Get user and repos
export const getUserAndRepos = async login => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos?sort=created&per_page=10`)
  ])
  return { user: user.data, repos: repos.data }
}
