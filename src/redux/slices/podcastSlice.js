import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Podcasts: [],
};

export const podcastSlice = createSlice({
  name: "Podcasts",
  initialState,
  reducers: {
    setPodcasts: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.Podcasts = action.payload;
    },
    clearpodcast: (state) => {
      state.Podcasts = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPodcasts } = podcastSlice.actions;

export default podcastSlice.reducer;
