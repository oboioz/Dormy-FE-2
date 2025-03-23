import { authService } from "./authService";
import { guardianService } from "./guardianService";
import { roomServiceService } from "./roomServiceService";
import { userService } from "./userService";
import { workplaceService } from "./workplaceService";

export const httpClient = {
    authService: authService,
    roomServiceService: roomServiceService,
    userService: userService,
    guardianService: guardianService,
    workplaceService: workplaceService,
};