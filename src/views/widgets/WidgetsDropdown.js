import React, { useState, useEffect } from "react";
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CContainer,
  CCard,
  CProgress,
  CImage,
} from "@coreui/react-pro";
import CIcon from "@coreui/icons-react";
import { FaBottleWater } from "react-icons/fa6";
import * as icon from "@coreui/icons";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import fillterIcon from "../../assets/images/filtro-icon.png";
import axios from "axios";
import BurnDownChart from "./BurnDownChart";


// Bottel Icon component for color change when filled ------------
const BottleIcon = ({ filled, color }) => {
  return (
    <div>
      <FaBottleWater style={{ color: `${filled ? color : "#e0e0e0"}` }} />
    </div>
  );
};

BottleIcon.propTypes = {
  filled: PropTypes.bool.isRequired,
  color: PropTypes.string,
};



// main Top component ------------------
const WidgetsDropdown = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiData, setApiData] = useState({});
  const [liquidTypeData, setLiquidTypeData] = useState([]);
  const [liquidTypeError, setLiquidTypeError] = useState(null);
  const [liquidloading, setLiquidloading] = useState(true);
  const [percentageOfConsumedQuantity, setPercentageOfConsumedQuantity] =
    useState("");
  const [percentageOfQuantityInStock, setPercentageQuantityInStock] =
    useState("");
  const [selectedType, setSelectedType] = useState();
  const [totelEmptyBottles, setTotelEmptyBottles] = useState(0);
  const [emptyBottels, setEmptyBottels] = useState(0);
  const [totalReplacements, setTotalReplacements] = useState(0);
  const [replacements, setReplacements] = useState(0);
  const [period, setPeriod] = useState("day");
  const [percentageEmptyDispensers, setPercentageEmptyDispensers] =
    useState("");
  const [replacementsPercentage, setReplacementsPercentage] = useState("");
  const [rechargePoints, setRechargePoints] = useState([]);
  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://demo.fluxmon.com.br/api/v1/dispenser/basicStats`,
          {
            params: {
              period: period,
              product: selectedType,
            },
          }
        );

        const data = response.data;
        setApiData(data);
        setTotelEmptyBottles(data.totalEmptyBottles);
        setEmptyBottels(data.emptyBottles);
        setReplacements(data.replacements);
        setTotalReplacements(data.totalReplacements);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 500000); // 500 seconds

    return () => clearInterval(interval);
  }, [period, selectedType]);

  // called liquidTypeData api ---------------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://demo.fluxmon.com.br/api/v1/dispenser/liquidTypes"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLiquidTypeData([...data.types, ""]);
      } catch (error) {
        setLiquidTypeError(error);
      } finally {
        setLiquidloading(false);
      }
    };

    fetchData();
  }, []);

  const handleLiquidTypeChange = (type) => {
    setSelectedType(type);
  };

  //percentage calculation of progress bar of the four boxes ----------------------------------------
  useEffect(() => {
    const percentage =
      (apiData?.consumedQuantity / apiData?.totalConsumedQuantity) * 100;
    setPercentageOfConsumedQuantity(percentage);
  }, [apiData]);

  useEffect(() => {
    const percentage =
      (apiData?.quantityInStock / apiData?.totalQuantityInStock) * 100;

    setPercentageQuantityInStock(percentage);
  }, [apiData]);

  useEffect(() => {
    const percentage =
      (apiData?.emptyBottles / apiData?.totalEmptyBottles) * 100;

    setPercentageEmptyDispensers(percentage);
  }, [apiData]);

  useEffect(() => {
    const percentage =
      (apiData?.replacements / apiData?.totalReplacements) * 100;

    setReplacementsPercentage(percentage);
  }, [apiData]);

  return (
    <CRow>
      {/* Top Dropdowns of data and liquidTypes -----------------*/}
      <CContainer className="py-2 ">
        <CRow xs={{ gutterX: 5 }}>
          <CCol style={{ paddingTop: "2rem" }}>
            <CImage src={fillterIcon} className=" iconRotate" />

            <CDropdown className="px-2">
              <CDropdownToggle className="dropDownBox">
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem onClick={() => handlePeriodChange("day")}>
                  Day
                </CDropdownItem>
                <CDropdownItem onClick={() => handlePeriodChange("week")}>
                  Week
                </CDropdownItem>
                <CDropdownItem onClick={() => handlePeriodChange("month")}>
                  Month
                </CDropdownItem>
                <CDropdownItem onClick={() => handlePeriodChange("year")}>
                  Year
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>

            <CDropdown className="px-2 ">
              {liquidloading && <div>Loading...</div>}
              {liquidTypeError && <div>Error: {liquidTypeError.message}</div>}
              <CDropdownToggle
                className="dropDownBox"
                alignment="end"
                color="primary"
              >
                {selectedType}
              </CDropdownToggle>
              <CDropdownMenu>
                {liquidTypeData?.map((type, index) => (
                  <CDropdownItem
                    key={index}
                    onClick={() => handleLiquidTypeChange(type)}
                  >
                    {type}
                  </CDropdownItem>
                ))}
              </CDropdownMenu>
            </CDropdown>
          </CCol>
        </CRow>
      </CContainer>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      <div className="infoBoxs">
        <CCol sm={6} lg={3} className="margintopBox">
          <CCard style={{ height: "100%", justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                padding: "20px",
                justifyContent: "space-between",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div
                style={{
                  marginRight: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h5 style={{ textAlign: "left" }}>{t("Empty Dispensers")}</h5>

                {emptyBottels > 0 ? (
                  <CRow>
                    <CIcon
                      icon={icon.cilWarning}
                      height={36}
                      className="text-danger"
                    />
                  </CRow>
                ) : (
                  ""
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "10px",
                }}
              >
                <h1 style={{ color: "#ff0000", margin: "0" }}>
                  {apiData.emptyBottles}
                </h1>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    maxWidth: "180px",
                  }}
                >
                  {Array.from({ length: totelEmptyBottles }).map((_, index) => (
                    <BottleIcon
                      key={index}
                      // filled={index + 1}
                      filled={index < emptyBottels}
                      color={"rgb(255, 0, 0)"}
                    />
                  ))}
                </div>
              </div>
            </div>
            <CProgress color="danger" value={percentageEmptyDispensers} />
          </CCard>
        </CCol>

        <CCol sm={6} lg={3} className="margintopBox">
          <CCard>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "20px",
                paddingBottom: "0px",
              }}
            >
              <div
                style={{
                  marginRight: "20px",
                  height: "150px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <h5>{t("Consumed quantity")}</h5>
                <h1 style={{ color: "rgb(249 177 21)" }}>
                  {apiData.consumedQuantity}ml
                </h1>
              </div>
              <div
                style={{
                  position: "relative",

                  height: "150px",
                  border: "2px solid #ddd",
                  borderRadius: "16px 16px  0 0",
                  overflow: "hidden",
                }}
                className="containerColor"
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    height: `${percentageOfConsumedQuantity}%`,

                    // height: `${50}%`,
                    backgroundColor: "rgb(249 177 21)",
                    transition: "height 0.5s ease-in-out",
                  }}
                ></div>
              </div>
            </div>
            <CProgress color="warning" value={percentageOfConsumedQuantity} />
          </CCard>
        </CCol>

        <CCol sm={6} lg={3} className="margintopBox">
          <CCard style={{ height: "100%", justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                padding: "20px",
                justifyContent: "space-between",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div style={{ marginRight: "20px" }}>
                <h5 style={{ textAlign: "left" }}>{t("Replacements Done")}</h5>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "10px",
                }}
              >
                <h1 style={{ color: "rgb(51 153 255)", margin: "0" }}>
                  {apiData?.replacements}
                </h1>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    maxWidth: "180px",
                  }}
                >
                  {Array.from({ length: totalReplacements }).map((_, index) => (
                    <BottleIcon
                      key={index}
                      filled={index < replacements}
                      // filled={index + 1}
                      color={"rgb(51 153 255)"}
                    />
                  ))}
                </div>
              </div>
            </div>
            <CProgress color="info" value={replacementsPercentage} />
          </CCard>
        </CCol>

        <CCol sm={6} lg={3} className="margintopBox">
          <CCard>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "20px",
                paddingBottom: "0px",
              }}
            >
              <div
                style={{
                  marginRight: "20px",
                  height: "150px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <h5>{t("Stock quantity")}</h5>
                <h1 style={{ color: "rgb(46 184 92)" }}>
                  {apiData.quantityInStock}ml
                </h1>
                {/* <input
              type="number"
              value={consumption}
              onChange={handleInputChange}
              style={{ marginTop: '10px', width: '100%', padding: '5px' }}
              min="0"
              max={maxConsumption}
            /> */}
              </div>
              <div
                style={{
                  position: "relative",

                  height: "150px",
                  border: "2px solid #ddd",
                  borderRadius: "16px 16px  0 0",
                  overflow: "hidden",
                }}
                className="containerColor"
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    height: `${percentageOfQuantityInStock}%`,
                    // height: `${percentage}%`,
                    // height: `${50}%`,
                    backgroundColor: "rgb(46 184 92)",
                    transition: "height 0.5s ease-in-out",
                  }}
                ></div>
              </div>
            </div>
            <CProgress color="success" value={percentageOfQuantityInStock} />
          </CCard>
        </CCol>
      </div>

      {/* chat--------------- */}

      <BurnDownChart
        selectedType={selectedType}
        period={period}
        setVisible={setVisible}
        visible={visible}
      />
    </CRow>
  );
};

export default WidgetsDropdown;
