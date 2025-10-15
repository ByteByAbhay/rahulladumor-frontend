import { createAsyncThunk } from "@reduxjs/toolkit";
import apiEndpoints from "../../../utils/api/apiEndpoints";
import api from "../../../utils/api/api";

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, thunkAPI) => {
    try {
      const response = await api.get(`${apiEndpoints.profile}`);
      if (response.status === "success") {
        return response.data;
      } else {
        throw new Error(response.message || "Failed to fetch profile");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "An error occurred");
    }
  }
);
