// import { configureStore } from '@reduxjs/toolkit'

// export const store = configureStore({
//   reducer: {},
// })

import { configureStore } from "@reduxjs/toolkit";

import useReducer from "./slices/userSlice";
import podcastReducer from "./slices/podcastSlice";
import episodeReducer from "./slices/episodeSlice";

// export default store = configureStore({
//   reducer: {
//     user: useReducer,
//     podcast: podcastReducer,
//     episode: episodeReducer,
//   },
// });

export const store = configureStore({
  reducer: {
    user: useReducer,
    podcasts: podcastReducer,
    episode: episodeReducer,
  },
});
