import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  QUIZ_FINISH,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
  QUIZ_SET_STATE
} from "../actions/actionTypes";

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
      return { ...state, loading: true };
    case FETCH_QUIZ_SUCCESS:
      return { ...state, loading: false, quiz: action.quiz };
    case FETCH_QUIZES_SUCCESS:
      return { ...state, loading: false, quizes: action.quizes };
    case FETCH_QUIZES_ERROR:
      return { ...state, loading: false, error: action.error };
    case QUIZ_SET_STATE:
      return { ...state, answerState: action.answerState, results: action.results };
    case QUIZ_FINISH:
      return { ...state, isFinish: true };
    case QUIZ_NEXT_QUESTION:
      return { ...state, answerState: null, activeQuestion: action.number };
    case QUIZ_RETRY:
      return { ...state, activeQuestion: 0, answerState: null, isFinish: false, results: {} };
    default: return state;
  }
}
