import {FETCH_QUIZ_SUCCESS, FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS} from "../actions/actionTypes";

const initialState = {
  quizes: [],
  loading: false,
  error: null,
  isFinish: false,
  results: {},
  activeQuestion: 0,
  answerState: null,
  quiz: null
};


export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state,
        loading: true
      };
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        quiz: action.payload
      };
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        loading: false,
        quizes: action.payload
      };
    case FETCH_QUIZES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default: return state;
  }
}
