import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Podcast: null,
};

export const podcastSlice = createSlice({
  name: "Podcast",
  initialState,
  reducers: {
    setpodcast: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.Podcast = action.payload;
    },
    clearpodcast: (state) => {
      state.Podcast = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPodcast, clearPodcast } = podcastSlice.actions;

export default podcastSlice.reducer;
