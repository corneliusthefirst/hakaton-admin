import React, { useState } from "react";
import Grid from "./Grid";
import { useDispatch, useSelector, connect } from "react-redux";
import { Dropdown, DropdownButton } from "react-bootstrap";
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
import { addOneChart } from "./features/data/chartdataSlice";
import { Link } from "react-router-dom";
import { setReportdata } from "./features/data/reportdataSlice";

const Home = (props) => {
  const dispatch = useDispatch();
  const [fillreport, setFillReport] = useState(false);
  const [currentForm, setCurrentForm] = useState({
    title: "",
    description: "",
    type: "",
    noFields: 1,
    name_list: {},
  });

  const [reportForm, setReportForm] = useState({
    title: "",
    company_name: "",
    logo: "",
  });

  const onclickDropDown = (num_field, type) => {
    //initialise the list_names
    const name_list = Array.from(Array(num_field).keys()).reduce(
      (acc, c, index) => {
        acc[`field${index}`] = "";
        return acc;
      },
      {}
    );

    console.log("type here", type, "name_list", name_list);
    setCurrentForm({
      title: "",
      description: "",
      noFields: num_field,
      type: type,
      name_list: name_list,
    });
    console.log("data start", currentForm);
  };

  const onchangeTitle = (event) => {
    event.preventDefault();
    setCurrentForm({ ...currentForm, title: event.target.value });
  };
  const onchangeDescription = (event) => {
    event.preventDefault();
    setCurrentForm({ ...currentForm, description: event.target.value });
  };

  const onchangeFields = (event, name) => {
    event.preventDefault();
    setCurrentForm({
      ...currentForm,
      name_list: { ...currentForm.name_list, [name]: event.target.value },
    });
  };

  // For Report Info

  const onchangeReportTitle = (event) => {
    event.preventDefault();
    setReportForm({ ...reportForm, title: event.target.value });
  };
  const onchangeCompanyName = (event) => {
    event.preventDefault();
    setReportForm({ ...reportForm, company_name: event.target.value });
  };

  const AddChart = (e) => {
    e.preventDefault();
    console.log("formdata", currentForm);
    dispatch(addOneChart(currentForm));
    setCurrentForm({
      ...currentForm,
      type: "",
      title: "",
      description: "",
      name_list: {},
    });
    console.log("all formdata", props.chartdata);
  };

  const AddReportInfo = (e) => {
    e.preventDefault();
    dispatch(setReportdata(reportForm));
    setReportForm({
      title: "",
      logo: "",
      company_name: "",
    });
    console.log("report formdata", props.reportdata);
  };

  const examples = [
    { title: "Line", body: <LineGraph /> },
    { title: "Scatter", body: <ScatterGraph /> },
    { title: "Chart Event", body: <ChartEvent /> },
    { title: "Pie", body: <PieGraph /> },
    { title: "Chart Canvas", body: <ChartCanvas /> },
    { title: "Bubble", body: <BubbleGraph /> },
    { title: "Bar Grouped", body: <BarGrouped /> },
    { title: "Bar Horizontal", body: <BarHorizontal /> },
    { title: "Bar Stacked", body: <BarStacked /> },
    { title: "Bar Vertical", body: <BarVertical /> },
    { title: "Doughnut", body: <DoughnutGraph /> },
    { title: "PolarArea", body: <PolarAreaGraph /> },
    { title: "Radar", body: <RadarGraph /> },
  ];

  return (
    <div className="flex flex-col bg-white min-h-screen pb-16 mx-48">
      <Grid />
      <div className="flex flex-col mx-8">
        <div className="w-full flex itemx-center justify-center">
          <p className="text-4xl font-bold">Chart examples</p>
        </div>
        <div className="my-8 overflow-x-scroll flex flex-row">
          {examples.map((comp) => {
            return (
              <div className="w-1/2  mx-8">
                <p>{comp.title}</p>
                <div>{comp.body}</div>
              </div>
            );
          })}
        </div>

        <div className="w-full flex itemx-center justify-center mt-8 mb-16">
          <p className="text-3xl font-bold">Report Form Generation</p>
        </div>

        <div className="w-full flex itemx-center ">
          <div className="w-full flex itemx-center w-1/2">
            <p className="text-xl font-bold">Add a new section</p>
          </div>

          <div className="w-full flex itemx-center w-1/2 pl-8">
            <p className="text-xl font-bold">Added blocks</p>
          </div>
        </div>

        <div className="flex flex-row">
          {!fillreport ? (
            <form className="flex flex-col my-8 w-1/2 pr-4 ">
              <div className="flex flex-row items-center justify-between">
                <div className="flex items-center justify-center">
                  <DropdownButton
                    align={"start"}
                    size="sm"
                    variant="info"
                    id="dropdown-basic-button"
                    title="Chart Type"
                  >
                    <Dropdown.Item onClick={() => onclickDropDown(2, "line")}>
                      Line
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => onclickDropDown(2, "scatter")}
                    >
                      Scatter
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => onclickDropDown(3, "chart event")}
                    >
                      Chart Event
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => onclickDropDown(2, "chart canvas")}
                    >
                      Chart Canvas
                    </Dropdown.Item>

                    <Dropdown.Item onClick={() => onclickDropDown(2, "bubble")}>
                      Bubble
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => onclickDropDown(3, "bar grouped")}
                    >
                      Bar Grouped
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => onclickDropDown(2, "bar horizontal")}
                    >
                      Bar Horizontal
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => onclickDropDown(3, "bar stacked")}
                    >
                      Bar Stacked
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => onclickDropDown(2, "bar vertical")}
                    >
                      Bar Vertical
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => onclickDropDown(1, "doughnut")}
                    >
                      Doughnut
                    </Dropdown.Item>

                    <Dropdown.Item onClick={() => onclickDropDown(1, "pie")}>
                      Pie
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => onclickDropDown(1, "polar area")}
                    >
                      PolarArea
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => onclickDropDown(1, "radar")}>
                      Radar
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
                <div
                  onClick={() => setFillReport(true)}
                  className="flex flex-row hover:bg-gray-100 items-center  cursor-pointer"
                >
                  <p className="pt-3 pr-2">Report Info</p>

                  <i
                    class=" border-0 fa fa-arrow-right"
                    style={{ fontSize: 22 }}
                  ></i>
                </div>
              </div>
              <label className="w-full mt-4">
                Title :
                <input
                  type="text"
                  name="name"
                  className="form-control  border-1 border-gray-600 w-full py-2 my-2"
                  placeholder="Your graph title"
                  onChange={onchangeTitle}
                  value={currentForm.title}
                />
              </label>
              <label className="my-2">
                Description:
                <textarea
                  className="
                form-control
                block
        px-8
        py-1.5
        mt-2
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
                  name="description"
                  rows="3"
                  placeholder="Your description"
                  value={currentForm.description}
                  onChange={onchangeDescription}
                ></textarea>
              </label>

              {currentForm.type && <label>Enter your Fields:</label>}
              {currentForm.type && (
                <p className="text-sm text-gray-500">
                  It represents the column title in the excel table
                </p>
              )}
              {currentForm.type && (
                <div className="flex flex-row w-full">
                  {Array.from(Array(currentForm.noFields).keys()).map(
                    (c, index) => {
                      return (
                        <input
                          type="text"
                          name={`field${index}`}
                          value={currentForm.name_list[`field${index}`]}
                          onChange={(e) => onchangeFields(e, `field${index}`)}
                          className="form-control  border-1 border-gray-600 mx-2"
                        />
                      );
                    }
                  )}
                </div>
              )}
              <button
                className="btn btn-md my-4  text-black "
                style={{ background: "#61dafb" }}
                onClick={AddChart}
              >
                <p>Add Block</p>
              </button>

              <Link
                to={"/report"}
                className="btn btn-md my-4  text-black "
                style={{ background: "#61dafb" }}
              >
                <p>View The Report</p>
              </Link>
            </form>
          ) : (
            <form className="flex flex-col my-8 w-1/2 pr-4 ">
              <div className="flex flex-row items-center ">
                <i
                  onClick={() => setFillReport(false)}
                  class="btn hover:bg-sky-100 border-0 fa fa-arrow-left"
                  style={{ fontSize: 22 }}
                ></i>
              </div>

              <label className="w-full mt-4">
                Report Title :
                <input
                  type="text"
                  name="report_title"
                  className="form-control  border-1 border-gray-600 w-full py-2 my-2"
                  placeholder="Your graph title"
                  onChange={onchangeReportTitle}
                  value={reportForm.title}
                />
              </label>

              <label className="w-full mt-4">
                Company Name :
                <input
                  type="text"
                  name="compeny_name"
                  className="form-control  border-1 border-gray-600 w-full py-2 my-2"
                  placeholder="Your graph title"
                  onChange={onchangeCompanyName}
                  value={reportForm.company_name}
                />
              </label>

              <button
                className="btn btn-md my-4  text-black "
                style={{ background: "#61dafb" }}
                onClick={AddReportInfo}
              >
                <p>Add Report Info</p>
              </button>

              <Link
                to={"/report"}
                className="btn btn-md my-4  text-black "
                style={{ background: "#61dafb" }}
              >
                <p>View The Report</p>
              </Link>
            </form>
          )}

          <div className="flex flex-col my-8 w-1/2  pl-16 ">
            {props.chartdata.chartdata &&
              props.chartdata.chartdata.map((data) => {
                console.log("data", data);
                return (
                  <div className="flex flex-row  justify-between bg-green-100  px-4 my-2">
                    <div className="flex flex-row items-center mr-4">
                      <p className="text-black pt-6 overflow-hidden truncate w-48">
                        {data.type
                          ? data.type
                          : data.title
                          ? data.title
                          : data.description}
                      </p>
                    </div>
                    <div className="flex flex-row items-center">
                      <button>
                        <i class="far fa-eye text-2xl"></i>
                      </button>
                      <button>
                        <i class="fal fa-trash pl-8 text-red-400"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {};

const mapStateToProps = (state) => {
  const { exceldata } = state.exceldata;
  const { chartdata } = state.chartdata;
  const { reportdata } = state.reportdata;
  return { exceldata, chartdata, reportdata };
};

export default connect(mapStateToProps)(Home);
