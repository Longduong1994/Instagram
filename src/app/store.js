import { configureStore } from '@reduxjs/toolkit'
import instaSlice from "./instaSlice"

export const store = configureStore({
  reducer: { instaSlice},
})