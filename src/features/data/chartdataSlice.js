import { createSlice } from "@reduxjs/toolkit";

const chartdataSlice = createSlice({
  name: "chartdata",
  initialState: { chartdata: [] },
  reducers: {
    setChartdata: (state, action) => {
      state.chartdata = action.payload;
    },
    addOneChart: (state, action) => {
      state.chartdata = {
        chartdata: [...state.chartdata.chartdata, action.payload],
      };
    },
  },
});

export const { setChartdata, addOneChart } = chartdataSlice.actions;

export const getChartData = (state) => state.chartdata;

export default chartdataSlice.reducer;
