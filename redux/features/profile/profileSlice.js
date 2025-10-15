import { createSlice } from "@reduxjs/toolkit";
import { getProfile } from "./profileAsynkThunk";
import { RequestStatus } from "../../../utils/RequestStatus";

const initialState = {
  data: null,
  status: RequestStatus.IDLE,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.status = RequestStatus.LOADING;
        state.data = null;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.status = RequestStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.status = RequestStatus.FAILED;
        state.error = action.payload || "An error occurred";
      });
  },
});

export const getProfileInfo = (state) => state.profileInfo.data;
export const {} = profileSlice.actions;
export default profileSlice.reducer;
