import { authService } from "./authService";
import { buildingService } from "./buildingService";
import { guardianService } from "./guardianService";
import { roomService } from "./roomService";
import { registrationService } from "./registrationService";
import { roomServiceService } from "./roomServiceService";
import { roomTypeService } from "./roomTypeService";
import { userService } from "./userService";
import { workplaceService } from "./workplaceService";
import { healthInsuranceService } from "./healthInsuranceService";
import { overnightAbsenceService } from "./overnightAbsenceService";
import { requestService } from "./requestService";
import { contractService } from "./contractService";
import { parkingRequestService } from "./parkingRequestService";

export const httpClient = {
  authService: authService,
  roomServiceService: roomServiceService,
  roomTypeService: roomTypeService,
  userService: userService,
  guardianService: guardianService,
  workplaceService: workplaceService,
  buildingService: buildingService,
  roomService: roomService,
  registrationService: registrationService,
  healthInsuranceService: healthInsuranceService,
  overnightAbsenceService: overnightAbsenceService,
  requestService: requestService,
  contractService: contractService,
  parkingRequestService: parkingRequestService,
};
