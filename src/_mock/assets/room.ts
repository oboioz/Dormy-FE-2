const _buildingList = [...Array(10)].map((_, index) => ({
    buildingID: index + 1,
    name: `Building ${index + 1}`,
    floorNumber: Math.floor(Math.random() * 10) + 1, // Random floor number between 1-10
    genderRestriction: index % 2 === 0 ? "male" : "female", // Alternating male and female
    roomID: index + 100, // Simulating foreign key reference
  }));
const roomTypes = ["single", "double", "suite"];

const _roomList = [...Array(20)].map((_, index) => {
  const building = _buildingList[index % _buildingList.length]; // Assign rooms to existing buildings
  const totalBeds = Math.floor(Math.random() * 4) + 1; // Random total beds between 1-4
  const usedBeds = Math.floor(Math.random() * totalBeds); // Used beds should be <= total beds

  return {
    roomID: index + 1,
    roomNumber: `R${index + 101}`,
    floorNumber: building.floorNumber, // Assign same floor as the building
    roomType: roomTypes[index % roomTypes.length], // Cycle through room types
    totalUsedBed: usedBeds,
    totalAvailableBed: totalBeds - usedBeds,
    status: usedBeds === totalBeds ? "occupied" : "available",
    building: building, // Assign corresponding building
  };
});

export default _roomList;
