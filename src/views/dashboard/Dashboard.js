import React, { useState, useEffect } from "react";
import { FaBottleWater } from "react-icons/fa6";
import {
  CCol,
  CContainer,
  CImage,
  CRow,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from "@coreui/react-pro";
import WidgetsDropdown from "../widgets/WidgetsDropdown";
import { useTranslation } from "react-i18next";
import * as icon from "@coreui/icons";
import fillterIcon from "../../assets/images/filtro-icon.png";
import Room from "./Room";

const Dashboard = () => {
  ///===============================api calling
  const [hotelsData, setHotelsData] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [areas, setAreas] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [filteredData, setFilteredData] = useState(null);
  const [showFirstArrayData, setshowfirstarraydata] = useState(false);
  const [groupedRooms, setGroupedRooms] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [defaultRoomShow, setDefaultRoomShow] = useState({});

  const [selectedFloor, setSelectedFloor] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://demo.fluxmon.com.br/api/v1/room");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // console.log(data);
        setHotelsData(data);

        setSelectedHotel(data[0]?.hotelName);
        // setRooms(data[0].areas[0].rooms);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // const interval = setInterval(fetchData, 500000);

    // return () => clearInterval(interval);
  }, []);

  console.log(hotelsData, "dayta");
  console.log(selectedHotel);

  const handleHotelChange = (hotelName) => {
    setSelectedHotel(hotelName);
    setSelectedArea("");
    setSelectedFloor("");
    setSelectedRoom("");
    setshowfirstarraydata(false);
  };

  const handleAreaChange = (areaName) => {
    setSelectedArea(areaName);
    setSelectedFloor("");
    setSelectedRoom("");
  };

  const handleFloorChange = (floorName) => {
    setSelectedFloor(floorName);
    setSelectedRoom("");
  };

  const handleRoomChange = (roomId) => {
    setSelectedRoom(roomId);
  };

  const selectedHotelData = hotelsData.find(
    (hotel) => hotel.hotelName === selectedHotel
  );

  const DefaultAreaOptions = hotelsData[0]?.areas?.map((item) => item.areaName);

  const areaOptions = selectedHotelData ? selectedHotelData.areas : [];

  console.log(areaOptions);

  const selectedAreaData = areaOptions?.find(
    (area) => area?.areaName === selectedArea
  );

  const floorOptions = selectedAreaData ? selectedAreaData.floors : [];
  const selectedFloorData = floorOptions.find(
    (floor) => floor.name === selectedFloor
  );
  const roomOptions = selectedFloorData ? selectedFloorData.rooms : [];
  const selectedRoomData = roomOptions.find(
    (room) => room.name === selectedRoom
  );
  const AllRoomsOfArea = selectedAreaData?.floors.reduce((acc, floor) => {
    return acc.concat(floor.rooms);
  }, []);

  console.log(selectedAreaData);

  console.log(AllRoomsOfArea);

  console.log(selectedRoom);
  return (
    <>
      <WidgetsDropdown />
      <CContainer className="py-2">
        <CRow xs={{ gutterX: 5 }}>
          <CCol style={{ paddingTop: "2rem" }}>
            <CImage src={fillterIcon} className=" iconRotate" />

            {/* Hotel Dropdown */}
            <CDropdown className="px-2 ">
              <CDropdownToggle className="dropDownBox" color="primary">
                {selectedHotel}
              </CDropdownToggle>
              <CDropdownMenu>
                {hotelsData.map((hotel) => (
                  <CDropdownItem
                    key={hotel.hotelName}
                    onClick={() => handleHotelChange(hotel.hotelName)}
                  >
                    {hotel.hotelName}
                  </CDropdownItem>
                ))}
              </CDropdownMenu>
            </CDropdown>

            {/* Area Dropdown */}
            <CDropdown className="px-2">
              <CDropdownToggle className="dropDownBox" color="primary">
                {selectedArea || "Select Area"}
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem onClick={() => handleAreaChange("All")}>
                  All Areas
                </CDropdownItem>
                {
                  // selectedHotel
                  //   ?
                  areaOptions.map((area) => (
                    <CDropdownItem
                      key={area?.areaName}
                      onClick={() => handleAreaChange(area?.areaName)}
                    >
                      {area.areaName}
                    </CDropdownItem>
                  ))
                  // : hotelsData[0]?.areas?.map((area) => (
                  //     <CDropdownItem
                  //       key={area?.areaName}
                  //       onClick={() => handleAreaChange(area?.areaName)}
                  //     >
                  //       {area.areaName}
                  //     </CDropdownItem>
                  //   ))
                }
              </CDropdownMenu>
            </CDropdown>

            {/* Floor Dropdown */}
            <CDropdown className="px-2">
              <CDropdownToggle
                className="dropDownBox"
                color="primary"
                disabled={!selectedArea || selectedArea === "All"}
              >
                {selectedFloor || "Select Floor"}
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem onClick={() => handleFloorChange("All")}>
                  All Floors
                </CDropdownItem>
                {floorOptions.map((floor) => (
                  <CDropdownItem
                    key={floor.name}
                    onClick={() => handleFloorChange(floor.name)}
                  >
                    {floor.name}
                  </CDropdownItem>
                ))}
              </CDropdownMenu>
            </CDropdown>

            {/* Room Dropdown */}
            <CDropdown className="px-2">
              <CDropdownToggle
                className="dropDownBox"
                color="primary"
                disabled={!selectedArea || selectedArea === "All"}
              >
                {selectedRoom || "Select Room"}
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem onClick={() => handleRoomChange("All")}>
                  All Rooms
                </CDropdownItem>
                {selectedArea &&
                  (selectedFloor === "All" || !selectedFloor) &&
                  AllRoomsOfArea?.map((room) => (
                    <CDropdownItem
                      key={room.name}
                      onClick={() => handleRoomChange(room.name)}
                    >
                      {room.name}
                    </CDropdownItem>
                  ))}
                {roomOptions.map((room) => (
                  <CDropdownItem
                    key={room.name}
                    onClick={() => handleRoomChange(room.name)}
                  >
                    {room.name}
                  </CDropdownItem>
                ))}
              </CDropdownMenu>
            </CDropdown>
          </CCol>
        </CRow>
      </CContainer>
      <CContainer className="spaceInAccordion">
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}

        {showFirstArrayData ? (
          <CRow>
            {hotelsData[0]?.areas?.map((area, index) => (
              <div key={index} className="HotelBox">
                <p className="areaName">{area.areaName}</p>
                <div>
                  {area?.floors.map((floor, floorIndex) => (
                    <div key={floorIndex}>
                      <p className="leveP">{floor.name}</p>
                      <CRow>
                        {floor.rooms.map((room, roomIndex) => (
                          <Room data={room} key={roomIndex} />
                        ))}
                      </CRow>
                    </div>
                  ))}
                </div>
                <hr />
              </div>
            ))}
          </CRow>
        ) : (
          <CRow>
            {selectedHotel && !selectedArea && (
              <div>
                {selectedHotelData.areas.map((area, index) => (
                  <div key={index} className="HotelBox">
                    <p className="areaName">{area.areaName}</p>
                    <div>
                      {area.floors.map((floor, floorIndex) => (
                        <div key={floorIndex}>
                          <p className="leveP">{floor.name}</p>
                          <CRow>
                            {floor.rooms.map((room, roomIndex) => (
                              <Room data={room} key={roomIndex} />
                            ))}
                          </CRow>
                        </div>
                      ))}
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            )}

            {selectedArea === "All" && (
              <div>
                {selectedHotelData.areas.map((area, index) => (
                  <div key={index} className="HotelBox">
                    <p className="areaName">{area.areaName}</p>
                    {area.floors.map((floor, floorIndex) => (
                      <div key={floorIndex}>
                        <p className="leveP">{floor.name}</p>
                        <CRow>
                          {floor.rooms.map((room, roomIndex) => (
                            <Room data={room} key={roomIndex} />
                          ))}
                        </CRow>
                        <hr />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {selectedArea &&
              selectedArea !== "All" &&
              !selectedFloor &&
              !selectedRoom && (
                <div>
                  <p className="areaName">{selectedAreaData.areaName}</p>
                  {selectedAreaData.floors.map((floor, floorIndex) => (
                    <div key={floorIndex}>
                      <p className="leveP">{floor.name}</p>
                      <CRow>
                        {floor.rooms.map((room, roomIndex) => (
                          <Room data={room} key={roomIndex} />
                        ))}
                      </CRow>
                      <hr />
                    </div>
                  ))}
                </div>
              )}

            {selectedFloor && selectedFloor !== "All" && !selectedRoom && (
              <div>
                <p className="areaName">{selectedAreaData?.areaName}</p>
                <p className="leveP">{selectedFloorData?.name}</p>
                <CRow>
                  {selectedFloorData.rooms.map((room, roomIndex) => (
                    <Room data={room} key={roomIndex} />
                  ))}
                </CRow>
              </div>
            )}

            {selectedRoom && selectedRoom !== "All" && selectedRoomData && (
              <div>
                <p className="areaName">{selectedAreaData.areaName}</p>
                <p className="leveP">{selectedFloorData.name}</p>
                <Room data={selectedRoomData} />
              </div>
            )}

            {selectedHotel &&
              selectedArea &&
              selectedFloor === "All" &&
              !selectedRoom && (
                <div>
                  <p className="areaName">{selectedAreaData.areaName}</p>
                  {selectedAreaData.floors.map((floor, floorIndex) => (
                    <div key={floorIndex}>
                      <p className="leveP">{floor.name}</p>
                      <CRow>
                        {floor.rooms.map((room, roomIndex) => (
                          <Room data={room} key={roomIndex} />
                        ))}
                      </CRow>
                      <hr />
                    </div>
                  ))}
                </div>
              )}

            {selectedHotel &&
              selectedArea && selectedFloor &&
              selectedFloor !== "All" &&
              selectedRoom === "All" && (
                <div>
                  <p className="areaName">{selectedAreaData.areaName}</p>
                  <p className="leveP">{selectedFloorData.name}</p>
                  <CRow>
                    {selectedFloorData.rooms.map((room, roomIndex) => (
                      <Room data={room} key={roomIndex} />
                    ))}
                  </CRow>
                </div>
              )}

            {selectedArea &&
              (selectedFloor === "All" || !selectedFloor) &&
              selectedRoom && (
                <div>
                  <CRow>
                    {AllRoomsOfArea?.map((room, roomIndex) =>
                      room.name === selectedRoom ? (
                        <Room data={room} key={roomIndex} />
                      ) : (
                        ""
                      )
                    )}
                  </CRow>
                </div>
              )}

            {selectedArea &&
              (selectedFloor === "All" || !selectedFloor) &&
              selectedRoom === "All" && (
                <div>
                  <CRow>
                    {AllRoomsOfArea?.map((room, roomIndex) => (
                      <Room data={room} key={roomIndex} />
                    ))}
                  </CRow>
                </div>
              )}

            {selectedFloor === "All" && selectedArea === "All" && (
              <div>
                <CRow>
                  {AllRoomsOfArea?.map((room, roomIndex) => (
                    <Room data={room} key={roomIndex} />
                  ))}
                </CRow>
              </div>
            )}

            {/* {selectedArea && !selectedFloor && selectedRoom === "All" && (
              <div>
                <CRow>
                  {AllRoomsOfArea?.map((room, roomIndex) => (
                    <Room data={room} key={roomIndex} />
                  ))}
                </CRow>
              </div>
            )} */}
          </CRow>
        )}
      </CContainer>
    </>
  );
};

export default Dashboard;



//old code

// import React, { useState, useEffect } from "react";
// import { FaBottleWater } from "react-icons/fa6";
// import {
//   CCol,
//   CContainer,
//   CImage,
//   CRow,
//   CDropdown,
//   CDropdownMenu,
//   CDropdownItem,
//   CDropdownToggle,
// } from "@coreui/react-pro";
// import WidgetsDropdown from "../widgets/WidgetsDropdown";
// import { useTranslation } from "react-i18next";
// import * as icon from "@coreui/icons";
// import fillterIcon from "../../assets/images/filtro-icon.png";
// import Room from "./Room";

// const Dashboard = () => {
//   ///===============================api calling
//   const [hotelsData, setHotelsData] = useState([]);
//   const [selectedHotel, setSelectedHotel] = useState("");
//   const [selectedArea, setSelectedArea] = useState("");
//   const [selectedRoom, setSelectedRoom] = useState("");
//   const [areas, setAreas] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [filteredData, setFilteredData] = useState(null);
//   const [showFirstArrayData, setshowfirstarraydata] = useState(true);
//   const [groupedRooms, setGroupedRooms] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [defaultRoomShow, setDefaultRoomShow] = useState({});

//   const [selectedFloor, setSelectedFloor] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("https://demo.fluxmon.com.br/api/v1/room");
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         // console.log(data);
//         setHotelsData(data);
//         setDefaultRoomShow();
//         // setRooms(data[0].areas[0].rooms);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();

//     const interval = setInterval(fetchData, 500000);

//     return () => clearInterval(interval);
//   }, []);

//   console.log(hotelsData);

//   const handleHotelChange = (hotelName) => {
//     setSelectedHotel(hotelName);
//     setSelectedArea("");
//     setSelectedFloor("");
//     setSelectedRoom("");
//     setshowfirstarraydata(false);
//   };

//   const handleAreaChange = (areaName) => {
//     setSelectedArea(areaName);
//     setSelectedFloor("");
//     setSelectedRoom("");
//   };

//   const handleFloorChange = (floorName) => {
//     setSelectedFloor(floorName);
//     setSelectedRoom("");
//   };

//   const handleRoomChange = (roomId) => {
//     setSelectedRoom(roomId);
//   };

//   const selectedHotelData = hotelsData.find(
//     (hotel) => hotel.hotelName === selectedHotel
//   );
//   const areaOptions = selectedHotelData ? selectedHotelData.areas : [];
//   const selectedAreaData = areaOptions.find(
//     (area) => area.areaName === selectedArea
//   );
//   const floorOptions = selectedAreaData ? selectedAreaData.floors : [];
//   const selectedFloorData = floorOptions.find(
//     (floor) => floor.name === selectedFloor
//   );
//   const roomOptions = selectedFloorData ? selectedFloorData.rooms : [];
//   const selectedRoomData = roomOptions.find(
//     (room) => room.name === selectedRoom
//   );

//   return (
//     <>
//       <WidgetsDropdown />
//       <CContainer className="py-2">
//         <CRow xs={{ gutterX: 5 }}>
//           <CCol style={{ paddingTop: "2rem" }}>
//             <CImage src={fillterIcon} className=" iconRotate" />

//             {/* Hotel Dropdown */}
//             <CDropdown className="px-2 ">
//               <CDropdownToggle className="dropDownBox" color="primary">
//                 {selectedHotel || hotelsData[0]?.hotelName || "Select Hotel"}
//               </CDropdownToggle>
//               <CDropdownMenu>
//                 {hotelsData.map((hotel) => (
//                   <CDropdownItem
//                     key={hotel.hotelName}
//                     onClick={() => handleHotelChange(hotel.hotelName)}
//                   >
//                     {hotel.hotelName}
//                   </CDropdownItem>
//                 ))}
//               </CDropdownMenu>
//             </CDropdown>

//             {/* Area Dropdown */}
//             <CDropdown className="px-2">
//               <CDropdownToggle
//                 className="dropDownBox"
//                 color="primary"
//                 // disabled={!selectedHotel}
//               >
//                  {selectedArea || "Select Area"}
//               </CDropdownToggle>
//               <CDropdownMenu>
//                 {areaOptions.map((area) => (
//                   <CDropdownItem
//                     key={area.areaName}
//                     onClick={() => handleAreaChange(area.areaName)}
//                   >
//                     {area.areaName}
//                   </CDropdownItem>
//                 ))}
//               </CDropdownMenu>
//             </CDropdown>

//             {/* Floor Dropdown */}
//             <CDropdown className="px-2">
//               <CDropdownToggle
//                 className="dropDownBox"
//                 color="primary"
//                 // disabled={!selectedArea}
//               >
//                 {selectedFloor || "Select Floor"}
//               </CDropdownToggle>
//               <CDropdownMenu>
//                 {floorOptions.map((floor) => (
//                   <CDropdownItem
//                     key={floor.name}
//                     onClick={() => handleFloorChange(floor.name)}
//                   >
//                     {floor.name}
//                   </CDropdownItem>
//                 ))}
//               </CDropdownMenu>
//             </CDropdown>

//             {/* Room Dropdown */}
//             <CDropdown className="px-2">
//               <CDropdownToggle
//                 className="dropDownBox"
//                 color="primary"
//                 // disabled={!selectedFloor}
//               >
//                 {selectedRoom || "Select Room"}
//               </CDropdownToggle>
//               <CDropdownMenu>
//                 {roomOptions.map((room) => (
//                   <CDropdownItem
//                     key={room.name}
//                     onClick={() => handleRoomChange(room.name)}
//                   >
//                     {room.name}
//                   </CDropdownItem>
//                 ))}
//               </CDropdownMenu>
//             </CDropdown>
//           </CCol>
//         </CRow>
//       </CContainer>
//       <CContainer className="spaceInAccordion">
//         {loading && <div>Loading...</div>}
//         {error && <div>Error: {error.message}</div>}

//         {showFirstArrayData ? (
//           <CRow>
//             {hotelsData[0]?.areas?.map((area, index) => (
//               <div key={index} className="HotelBox">
//                 {" "}
//                 <p className="areaName">{area.areaName}</p>{" "}
//                 <div>
//                   {area?.floors.map((floor, floorIndex) => (
//                     <div key={floorIndex}>
//                       <p className="leveP">{floor.name}</p>
//                       <CRow>
//                         {floor.rooms.map((room, roomIndex) => (
//                           <Room data={room} key={roomIndex} />
//                         ))}
//                       </CRow>
//                     </div>
//                   ))}
//                 </div>
//                 <hr />
//               </div>
//             ))}
//           </CRow>
//         ) : (
//           <CRow>
//             {selectedHotel && !selectedArea && (
//               <div>
//                 {selectedHotelData.areas.map((area, index) => (
//                   <div key={index} className="HotelBox">
//                     <p className="areaName">{area.areaName}</p>
//                     <div>
//                       {area.floors.map((floor, floorIndex) => (
//                         <div key={floorIndex}>
//                           <p className="leveP">{floor.name}</p>
//                           <CRow>
//                             {floor.rooms.map((room, roomIndex) => (
//                               <Room data={room} key={roomIndex} />
//                             ))}
//                           </CRow>
//                         </div>
//                       ))}
//                     </div>
//                     <hr />
//                   </div>
//                 ))}
//               </div>
//             )}

//             {selectedArea && !selectedFloor && (
//               <div>
//                 <p className="areaName">{selectedAreaData.areaName}</p>
//                 {selectedAreaData.floors.map((floor, floorIndex) => (
//                   <div key={floorIndex}>
//                     <p className="leveP">{floor.name}</p>
//                     <CRow>
//                       {floor.rooms.map((room, roomIndex) => (
//                         <Room data={room} key={roomIndex} />
//                       ))}
//                     </CRow>
//                     <hr />
//                   </div>
//                 ))}
//               </div>
//             )}

//             {selectedFloor && !selectedRoom && (
//               <div>
//                 <p className="areaName">{selectedAreaData.areaName}</p>
//                 <p className="leveP">{selectedFloorData.name}</p>
//                 <CRow>
//                   {selectedFloorData.rooms.map((room, roomIndex) => (
//                     <Room data={room} key={roomIndex} />
//                   ))}
//                 </CRow>
//               </div>
//             )}

//             {selectedRoom && selectedRoomData && (
//               <div>
//                 <p className="areaName">{selectedAreaData.areaName}</p>
//                 <p className="leveP">{selectedFloorData.name}</p>
//                 <Room data={selectedRoomData} />
//               </div>
//             )}
//           </CRow>
//         )}
//       </CContainer>
//     </>
//   );
// };

// export default Dashboard;
