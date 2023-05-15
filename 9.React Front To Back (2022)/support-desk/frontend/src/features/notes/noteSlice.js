import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import noteService from './noteService'

const initialState = {
  notes: [],

  isSuccess: false,
  isError: false,
  isLoading: false,
  message: '',
}

// * FUNCTIONS
// Get ticket notes
export const getNotes = createAsyncThunk(
  'notes/getAll',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await noteService.getNotes(ticketId, token)
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Create ticket note
export const createNote = createAsyncThunk(
  'notes/create',
  async ({ noteText, ticketId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await noteService.createNote(noteText, ticketId, token)
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    reset: state => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(getNotes.pending, state => {
        state.isLoading = true
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.notes = action.payload
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createNote.pending, state => {
        state.isLoading = true
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.notes.push(action.payload)
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = noteSlice.actions
export default noteSlice.reducer
