import React from "react";
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CCol,
  CContainer,
  CRow,
  CBadge,
} from "@coreui/react-pro";
import Bottle from "../../assets/images/dispenser-maior.png";
import GrayBottel from "../../assets/images/dispenser-menor.png";
import fullBattery from "../../assets/images/full-battery.png";
import { useTranslation } from "react-i18next";
import RemoveBottle from "../../assets/images/dispenser/dispenser01.png";
import EmptyBottle from "../../assets/images/dispenser/dispenser02.png";
import lessThanHalfBottle from "../../assets/images/dispenser/dispenser03.png";
import HalfBottle from "../../assets/images/dispenser/dispenser04.png";
import MoreThanHalfBottle from "../../assets/images/dispenser/dispenser05.png";
import FullBottle from "../../assets/images/dispenser/dispenser06.png";
import PropTypes from "prop-types";
import batteryFull from "../../assets/images/battery/battery3.png";
import batteryMorethaHalf from "../../assets/images/battery/battery2.png";
import batteryLessThanHalf from "../../assets/images/battery/battery1.png";
import battaryEmpty from "../../assets/images/battery/battery0.png";
import noVoiceIcon from "../../assets/images/nosignal.png";
import RedBottel from "../../assets/images/dispenser/dispenser-red-icon.png";
import NoBarBottle from "../../assets/images/dispenser/dispenser-big.png";
import AlertsIcon from "../../assets/images/alert.png";
import emptyIcon from "../../assets/images/no-dispenser.png";

function Room({ data, key }) {
  const { t } = useTranslation();

  const vars = {
    "--cui-accordion-btn-icon": `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='currentColor'%3e%3cpath fill-rule='evenodd' d='M8 3a.5.5 0 0 1 .5.5V7H12a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8H4a.5.5 0 0 1 0-1h3.5V3.5A.5.5 0 0 1 8 3z'/%3e%3c/svg%3e")`,
    "--cui-accordion-btn-active-icon": `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='currentColor'%3e%3cpath fill-rule='evenodd' d='M3 8a.5.5 0 0 1 .5-.5H12a.5.5 0 0 1 0 1H3.5A.5.5 0 0 1 3 8z'/%3e%3c/svg%3e")`,
    "--cui-btn-color": "white",
  };

  // bottle level images accoding to percentage of rooms---------
  const getBottleImage = (percentage, liquidStatus) => {
    if (percentage >= 84) return FullBottle;
    if (percentage >= 68) return MoreThanHalfBottle;
    if (percentage >= 50) return HalfBottle;
    if (percentage >= 30) return lessThanHalfBottle;
    if (percentage >= 5) return EmptyBottle;
    if (liquidStatus === "INEXISTENTE") return NoBarBottle;
    else return RemoveBottle;
  };

  // different battery images accoding to battery 
  const GetBattery = (battery) => {
    if (battery >= 3050) return batteryFull;
    else if (battery >= 2950) return batteryMorethaHalf;
    else if (battery >= 2900) return batteryLessThanHalf;
    else return battaryEmpty;
  };


  //param selection for accoding to btn status 
  const getLiquidParam = (param, status) => {
    if (status === "CHEIO") return param.cheioParam;
    if (status === "VAZIO") return param.vazioParam;
    if (status === "MEDIO") return param.medioParam;
    if (status === "INEXISTENTE") return param.inexistenteParam;
  };

  const getTopBottels = (liquidStatus) => {
    if (liquidStatus === "VAZIO" || "INEXISTENTE") return RedBottel;
    else return GrayBottel;
  };

  const firstDispenserWithAlert = data?.dispensers?.find(
    (item) => item.liquidStatus === "INEXISTENTE"
  );

  const firstRedBatteryShow = data?.dispensers?.find(
    (item) => item.vccBattery < 2900
  );


  return (
    <>
      <CCol xs={6} key={key} className="pb-2">
        <CAccordion activeItemKey={2} style={vars}>
          <CAccordionItem itemKey={1}>
            <CAccordionHeader>
              <div className="accordionHeader">
                <p>
                  {t("Hotel")} {data?.name}
                </p>

                <div className="grayBottelBox">
                  {data?.dispensers?.map((item, index) => (
                    <div key={index}>
                      {item.enabled === true ? (
                        <div className="grayBottle">
                          {item.liquidStatus === "VAZIO" ||
                          item.liquidStatus === "INEXISTENTE" ? (
                            <img
                              src={RedBottel}
                              alt={`redBottel ${index + 1}`}
                            />
                          ) : (
                            <img
                              src={GrayBottel}
                              alt={`redBottel ${index + 1}`}
                            />
                          )}
                        </div>
                      ) : (
                        " "
                      )}
                    </div>
                  ))}
                </div>
                <div>
                  {firstRedBatteryShow ? (
                    <div className="LowBattery" key={firstRedBatteryShow.id}>
                      <img src={battaryEmpty} alt="emptyBottel" />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  {firstDispenserWithAlert ? (
                    <div className="alertIcon" key={firstDispenserWithAlert.id}>
                      <img src={AlertsIcon} alt="alert" />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </CAccordionHeader>
            <CAccordionBody>
              <CContainer>
                <CRow>
                  {data?.dispensers?.map((bottel, index) => (
                    <CCol
                      key={index}
                      className={`${bottel.enabled ? "" : "AccordionBoxNone"}`}
                    >
                      <div className="AccordionBox">
                        <div className="innerBox">
                          <div className="noVoiceBox">
                            <p className="AccordionPara">
                              {bottel?.details?.name}
                            </p>
                          </div>

                          <p className="AccordionHd">
                            {bottel?.details?.liquidType}
                            <p>{bottel?.details?.capacity}ml</p>
                          </p>
                          <div className="battery">
                            <img
                              src={GetBattery(bottel?.vccBattery)}
                              alt="fullBattery"
                            />
                          </div>
                          <p className="bottlePercentage">
                            {bottel?.liquidStatus === "INEXISTENTE" ? (
                              <>—</>
                            ) : (
                              <>
                                {Math.round(
                                  (bottel.liquidMeasurement /
                                    getLiquidParam(
                                      bottel.measurementParams,
                                      bottel.liquidStatus
                                    )) *
                                    100
                                )}
                                %
                              </>
                            )}
                          </p>

                          <CBadge
                            color={
                              bottel?.liquidStatus === "CHEIO"
                                ? "success"
                                : bottel?.liquidStatus === "MEDIO"
                                ? "warning"
                                : bottel?.liquidStatus === "VAZIO"
                                ? "danger"
                                : bottel?.liquidStatus === "INEXISTENTE"
                                ? ""
                                : "default"
                            }
                            style={{
                              ...vars,
                              backgroundColor:
                                bottel?.liquidStatus === "INEXISTENTE"
                                  ? "#6261cc"
                                  : undefined,
                            }}
                          >
                            {/* {t('full')} */}
                            {bottel?.liquidStatus}
                          </CBadge>
                        </div>

                        <div>
                          <div
                            className={`${
                              bottel.status === "NOCOMM"
                                ? "noVoiceImg"
                                : "noDisplay"
                            }`}
                          >
                            <img src={noVoiceIcon} />
                          </div>
                          <div className="outerBox">
                            <img
                              src={getBottleImage(
                                Math.round(
                                  (bottel.liquidMeasurement /
                                    getLiquidParam(
                                      bottel.measurementParams,
                                      bottel.liquidStatus
                                    )) *
                                    100
                                ),
                                bottel?.liquidStatus
                              )}
                              alt="bottle"
                            />
                          </div>
                        </div>
                      </div>
                    </CCol>
                  ))}
                </CRow>
              </CContainer>
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
      </CCol>
    </>
  );
}

Room.propTypes = {
  key: PropTypes.number,

  data: PropTypes.shape({
    name: PropTypes.string,
    floor: PropTypes.number,
    dispensers: PropTypes.arrayOf(
      PropTypes.shape({
        commType: PropTypes.string,
        vccBattery: PropTypes.number,
        details: PropTypes.shape({
          liquidType: PropTypes.string,
          capacity: PropTypes.number,
        }),
        liquidStatus: PropTypes.string,
      })
    ),
  }),
};

export default Room;
