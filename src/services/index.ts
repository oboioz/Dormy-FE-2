import { authService } from "./authService";
import { buildingService } from "./buildingService";
import { guardianService } from "./guardianService";
import { roomService } from "./roomService";
import { registrationService } from "./registrationService";
import { roomServiceService } from "./roomServiceService";
import { roomTypeService } from "./roomTypeService";
import { userService } from "./userService";
import { workplaceService } from "./workplaceService";

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
};