import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "exceldata",
  initialState: { exceldata: { rows: [], cols: [] } },
  reducers: {
    setExceldata: (state, action) => {
      state.exceldata = action.payload;
    },
  },
});

export const { setExceldata } = dataSlice.actions;

export const getExcelData = (state) => state.exceldata;

export default dataSlice.reducer;
