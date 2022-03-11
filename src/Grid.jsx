import React, { Component } from "react";
import "./App.css";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import {
  Col,
  Input,
  InputGroup,
  FormGroup,
  Button,
  Fade,
  FormFeedback,
  Container,
  Card,
} from "reactstrap";
import { getExcelData, setExceldata } from "./features/data/exceldataSlice";
import { useState } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { setChartdata } from "./features/data/chartdataSlice";
import { setReportdata } from "./features/data/reportdataSlice";

const Grid = (props) => {
  const data = useSelector(getExcelData);
  console.log("exceldataboy", props.exceldata);
  console.log("chartdata", props.chartdata);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    isOpen: false,
    dataLoaded: false,
    isFormInvalid: false,
    exceldata: { rows: data.exceldata.rows, cols: data.exceldata.cols },
  });

  const fileInput = React.useRef();

  const renderFile = (fileObj) => {
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        dispatch(setChartdata({ chartdata: [] }));
        console.log(resp);
        dispatch(setExceldata({ cols: resp.cols, rows: resp.rows }));
        dispatch(setReportdata({ company_name: "", logo: "", title: "" }));

        setState({
          ...state,
          dataLoaded: true,
          exceldata: { cols: resp.cols, rows: resp.rows },
        });
      }
    });
  };

  const fileHandler = (event) => {
    if (event.target.files.length) {
      console.log("fileshere", event.target.files);
      let fileObj = event.target.files[0];
      let fileName = fileObj.name;

      //check for file extension and pass only if it is .xlsx and display error message otherwise
      if (fileName.slice(fileName.lastIndexOf(".") + 1) === "xlsx") {
        setState({
          ...state,
          uploadedFileName: fileName,
          isFormInvalid: false,
        });
        renderFile(fileObj);
      } else {
        setState({ ...state, isFormInvalid: true, uploadedFileName: "" });
      }
    }
  };

  const openFileBrowser = () => {
    fileInput.current.click();
  };

  return (
    <div className="py-16">
      <Container>
        <form encType="multipart/form-data">
          <FormGroup row>
            <Col xs={4} sm={8} lg={10}>
              <InputGroup>
                <Button
                  color="info"
                  style={{ color: "white", zIndex: 0 }}
                  onClick={openFileBrowser}
                >
                  <i className="cui-file"></i> Browse Excel&hellip;
                </Button>
                <input
                  type="file"
                  hidden
                  multiple={true}
                  onChange={fileHandler}
                  ref={fileInput}
                  onClick={(event) => {
                    event.target.value = null;
                  }}
                  style={{ padding: "10px" }}
                />

                <Input
                  type="text"
                  className="form-control"
                  value={state.uploadedFileName}
                  readOnly
                  invalid={state.isFormInvalid}
                />
                <FormFeedback>
                  <Fade
                    in={state.isFormInvalid}
                    tag="h6"
                    style={{ fontStyle: "italic" }}
                  >
                    Please select a .xlsx file only !
                  </Fade>
                </FormFeedback>
              </InputGroup>
            </Col>
          </FormGroup>
        </form>

        {
          <div>
            <Card body outline color="secondary" className="restrict-card ">
              <OutTable
                data={props.exceldata.rows}
                columns={props.exceldata.cols}
                tableClassName="ExcelTable2007"
                tableHeaderRowClass="heading"
              />
            </Card>
          </div>
        }
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { exceldata } = state.exceldata;
  const { chartdata } = state.chartdata;
  return { exceldata, chartdata };
};

export default connect(mapStateToProps)(Grid);
