import { createSlice } from "@reduxjs/toolkit";

const reportSlice = createSlice({
  name: "reportdata",
  initialState: {
    reportdata: { company_name: "", logo: "", title: "" },
  },
  reducers: {
    setReportdata: (state, action) => {
      state.reportdata = action.payload;
    },
  },
});

export const { setReportdata } = reportSlice.actions;

export const getExcelData = (state) => state.reportdata;

export default reportSlice.reducer;
