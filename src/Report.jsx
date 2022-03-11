/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { connect } from "react-redux";
import logo from "./Logo_Wired_Beauty.png";
import ChartCanvas from "./charts/chart/canvas/index.tsx";
import ChartEvent from "./charts/chart/events/index.tsx";
import BubbleGraph from "./charts/bubble/default/index.tsx";
import BarGrouped from "./charts/bar/grouped/index.tsx";
import { BarHorizontal } from "./charts/bar/horizontal/index.tsx";
import { BarStacked } from "./charts/bar/stacked/index.tsx";
import { BarVertical } from "./charts/bar/vertical/index.tsx";
import { DoughnutGraph } from "./charts/doughnut/default/index.tsx";
import { LineGraph } from "./charts/line/default/index.tsx";
import { PieGraph } from "./charts/pie/default/index.tsx";
import { PolarAreaGraph } from "./charts/polarArea/default/index.tsx";
import { RadarGraph } from "./charts/radar/default/index.tsx";
import { ScatterGraph } from "./charts/scatter/default/index.tsx";
import Pdf from "react-to-pdf";

const getChartData = (exceldata, data) => {
  console.log("datacoming", exceldata);
  const data_return = [];
  Object.values(data.name_list).forEach((element) => {
    const index = exceldata.rows[0].indexOf(element);
    let optdata = [];
    exceldata.rows.forEach((row, index2) => {
      if (index2 > 0) {
        optdata.push(row[index]);
      }
    });
    data_return.push(optdata);
  });

  return data_return;
};

const RenderGraph = (data, exceldata) => {
  let graph = () => null;
  switch (data.type) {
    case "chart canvas":
      graph = () => <ChartCanvas data={getChartData(exceldata, data)} />;
      break;
    case "chart event":
      graph = () => <ChartEvent data={getChartData(exceldata, data)} />;
      break;
    case "bubble":
      graph = () => <BubbleGraph data={getChartData(exceldata, data)} />;
      break;
    case "bar grouped":
      graph = () => <BarGrouped data={getChartData(exceldata, data)} />;
      break;
    case "bar horizontal":
      graph = () => <BarHorizontal data={getChartData(exceldata, data)} />;
      break;
    case "bar stacked":
      graph = () => <BarStacked data={getChartData(exceldata, data)} />;
      break;
    case "bar vertical":
      graph = () => <BarVertical data={getChartData(exceldata, data)} />;
      break;
    case "doughnut":
      graph = () => <DoughnutGraph data={getChartData(exceldata, data)} />;
      break;
    case "line":
      graph = () => (
        <LineGraph data={getChartData(exceldata, data)} dataInfo={data} />
      );
      break;
    case "pie":
      graph = () => <PieGraph data={getChartData(exceldata, data)} />;
      break;
    case "polar area":
      graph = () => <PolarAreaGraph data={getChartData(exceldata, data)} />;
      break;
    case "radar":
      graph = () => <RadarGraph data={getChartData(exceldata, data)} />;
      break;
    case "scatter":
      graph = () => <ScatterGraph data={getChartData(exceldata, data)} />;
      break;
    default:
      graph = () => null;
      break;
  }
  return (
    <div
      className="flex flex-col bg-white pb-16"
      style={{ maxWidth: "600px", maxHeight: "500px" }}
    >
      {graph()}
    </div>
  );
};

const Report = (props) => {
  const ref = React.createRef();
  const options = {
    orientation: "landscape",
    unit: "in",
    format: [4, 2],
  };

  return (
    <div className="flex flex-col  bg-white min-h-screen min-w-screen bg-red-400 pb-16 justify-center items-center">
      <div className="flex justify-end w-full items-end mr-8 mt-8">
        <Pdf
          targetRef={ref}
          filename={"rapport" + props.reportdata.company_name + ".pdf"}
          //options={options}
          //x={0.5}
          //y={0.5}
          scale={1}
        >
          {({ toPdf }) => (
            <button
              onClick={toPdf}
              className="rounded p-2"
              style={{ background: "#22d3ee" }}
            >
              Generate the report
            </button>
          )}
        </Pdf>
      </div>

      <div
        className="flex flex-col bg-white"
        style={{ width: "800px" }}
        ref={ref}
      >
        <div className="flex w-full justify-center items-center pt-8">
          <img src={logo} height={80} width={120}></img>
        </div>

        <div className="w-full flex items-center justify-center mt-16 mb-8">
          <p className="text-4xl font-bold">{props.reportdata.title}</p>
        </div>

        {props.chartdata.chartdata &&
          props.chartdata.chartdata.map((data) => {
            return (
              <div className="flex flex-col  justify-between  px-4 my-2">
                {data.title && (
                  <div className="flex flex-row items-center mr-4">
                    <p className="text-black font-bold pt-2 overflow-hidden truncate w-48">
                      {data.title}
                    </p>
                  </div>
                )}

                {data.type && (
                  <div className="flex justify-center items-center mr-4">
                    <p
                      className="text-black pt-2 overflow-hidden truncate"
                      style={{ width: 550, height: 350 }}
                    >
                      {RenderGraph(data, props.exceldata)}
                    </p>
                  </div>
                )}

                {data.description && (
                  <div className="flex items-center mr-4">
                    <p className="text-black pt-2 overflow-hidden truncate w-48">
                      {data.description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

Report.propTypes = {};

const mapStateToProps = (state) => {
  const { exceldata } = state.exceldata;
  const { chartdata } = state.chartdata;
  const { reportdata } = state.reportdata;
  return { exceldata, chartdata, reportdata };
};

export default connect(mapStateToProps)(Report);
