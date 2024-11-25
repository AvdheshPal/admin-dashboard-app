import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  basicDetails: Record<string, any> | null;
  address: Record<string, any> | null;
  files : File[]
}

const initialState: FormState = {
  basicDetails: null,
  address: null,
  files : []
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setBasicDetails(state, action: PayloadAction<Record<string, any>>) {
      state.basicDetails = action.payload;
    },
    setAddress(state, action: PayloadAction<Record<string, any>>) {
      state.address = action.payload;
    },
    setFilesToRedux(state, action: PayloadAction<File[]>) {
      state.files = action.payload;
    },
    resetForm(state) {
      state.basicDetails = initialState.basicDetails;
      state.address = initialState.address;
      state.files = initialState.files;
    },
  },
});

export const { setBasicDetails, setAddress, resetForm , setFilesToRedux } = formSlice.actions;
export default formSlice.reducer;
