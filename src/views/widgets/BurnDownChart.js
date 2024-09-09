import { CChartLine } from "@coreui/react-chartjs";
import {
  CCard,
  CCol,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from "@coreui/react-pro";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

function BurnDownChart({ selectedType, period, setVisible, visible }) {
  const { t } = useTranslation();
  const [ChartData, setChartData] = useState([]);
  const [charDataAll, setAllCharData] = useState({});
  const [ChartError, setChartError] = useState(null);
  const [Chartloading, setChartloading] = useState(true);
  const [XData, setXData] = useState([]);
  const [YData, setYData] = useState([]);
  const [XDataTwo, setXDataTwo] = useState([]);
  const [YDataTwo, setYDataTwo] = useState([]);
  const [rechargePoints, setRechargePoints] = useState([]);

  //chart api called =============================================================

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://demo.fluxmon.com.br/api/v1/dispenser/basicStats/burnDown",
          {
            params: {
              period: period,
              product: selectedType,
            },
          }
        );

        const data = response.data;
        setChartData(data.points);
        setAllCharData(data);
        setRechargePoints(data.rechargePoints);
      } catch (error) {
        setChartError(error);
      } finally {
        setChartloading(false);
      }
    };

    fetchData();
  }, [selectedType, period]);

  useEffect(() => {
    const formatDate = (dateString) => {
      const options = { day: "2-digit", month: "short", year: "2-digit" };
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", options);
    };
    const xData = ChartData.map((point) => formatDate(point.date));
    const yData = ChartData.map((point) => point.value);
    console.log(rechargePoints);
    const xDataTwo = rechargePoints.map((point) => formatDate(point.date));
    const yDataTwo = rechargePoints.map((point) => point.value);

    console.log(xDataTwo, yDataTwo);

    setXData(xData);
    setYData(yData);
    setXDataTwo(xDataTwo);
    setYDataTwo(yDataTwo);
  }, [charDataAll]);

  return (
    <div>
      <div className="infoBoxs">
        <CCol sm={6} lg={3} style={{ padding: "0px" }}>
          {Chartloading && <div>Loading...</div>}
          {ChartError && <div>Error: {ChartError.message}</div>}
          <CCard style={{ marginTop: "1rem" }}>
            <div
              style={{ padding: "8px" }}
              onClick={() => setVisible(!visible)}
            >
              <div>
                <h5 style={{ textAlign: "left", padding: "0 13px" }}>
                  {t("empty dispensers stock overview")}
                </h5>
                <p className="GraphPecentage">
                  <span> Remaining stock </span>
                  {charDataAll.remainingStock}%
                </p>
              </div>
              <div>
                <CChartLine
                  data={{
                    labels: XData,
                    datasets: [
                      {
                        label: "Actual",
                        backgroundColor: "rgb(5 222 2 / 20%)",
                        borderColor: " rgb(32 106 2)",
                        pointBackgroundColor: " rgb(32 106 2)",
                        pointBorderColor: "rgb(32 106 2)",
                        data: YData,
                        fill: true,
                      },
                      {
                        label: "Reloaded",
                        backgroundColor: "transparent",
                        borderColor: "transparent",
                        pointBackgroundColor: "rgb(50 131 202)",
                        pointBorderColor: "rgb(50 131 202)",
                        data: YDataTwo,
                        fill: true,
                        showLine: false,
                      },
                    ],
                  }}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        grid: {
                          display: false,
                        },
                      },
                      y: {
                        beginAtZero: true,
                        grid: {
                          display: false,
                        },
                      },
                    },
                    elements: {
                      line: {
                        tension: 0.4,
                      },
                      point: {
                        radius: 4,
                      },
                    },
                    plugins: {
                      legend: false,
                    },
                  }}
                />
              </div>
            </div>
          </CCard>
        </CCol>
      </div>

      {/* Popup of Chart  ---------------------------------*/}
      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="LiveDemoExampleLabel" className="ModelTitle">
            <h5 style={{ textAlign: "left" }}>
              {t("empty dispensers stock overview")}
            </h5>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p className="GraphPecentage">
            Remaining stock {charDataAll.remainingStock}%
          </p>
          <CChartLine
            data={{
              labels: XData,
              datasets: [
                {
                  label: "Actual",
                  backgroundColor: "rgb(5 222 2 / 20%)",
                  borderColor: " rgb(32 106 2)",
                  pointBackgroundColor: " rgb(32 106 2)",
                  pointBorderColor: "rgb(32 106 2)",
                  data: YData,
                  fill: true,
                },
                {
                  label: "Reloaded",
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                  pointBackgroundColor: "rgb(50 131 202)",
                  pointBorderColor: "rgb(50 131 202)",
                  data: YDataTwo,
                  fill: true,
                  showLine: false,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                },
                y: {
                  beginAtZero: true,
                  grid: {
                    display: false,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 4,
                },
              },
              plugins: {
                legend: false,
              },
            }}
          />
        </CModalBody>
      </CModal>
    </div>
  );
}

BurnDownChart.propTypes = {
  selectedType: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  setVisible: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};
export default BurnDownChart;
