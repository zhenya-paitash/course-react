const githubReducer = (state, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return { ...state, users: action.payload, loading: false }
    case 'GET_USER_AND_REPOS':
      return {
        ...state,
        ...action.payload, // user, repos
        // user: action.payload.user,
        // repos: action.payload.repos,
        loading: false,
      }
    case 'CLEAR_USERS':
      return { ...state, users: [], user: {} }
    case 'SET_LOADING':
      return { ...state, loading: true }
    default:
      return state
  }
}

export default githubReducer
