import { authService } from "./authService";
import { guardianService } from "./guardianService";
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
};