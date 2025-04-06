import { IEnumModel } from "./EnumModels";
import { IGuardianCreationModel } from "./GuardianModels";
import { IHealthInsuranceCreationModel } from "./HealthInsuranceModels";
import { RoomTypeOptionModel } from "./RoomTypeModels";
import { UserSignUpModel } from "./UserModel";
import { IVehicleCreationModel } from "./VehicleModels";
import { WorkplaceOptionModel } from "./WorkplaceModels";

export interface IRegistrationInformationCreationModel {
    user: UserSignUpModel;
    workplaceId: string;
    roomId: string;
    startDate: string;
    endDate: string;
    healthInsurance: IHealthInsuranceCreationModel;
    guardians: IGuardianCreationModel[];
    vehicles: IVehicleCreationModel[];
}

export interface IGetInitialRegistrationDataModel {
    genderEnums: IEnumModel[];
    relationshipEnums: IEnumModel[];
    listWorkplaces: WorkplaceOptionModel[];
    listRoomTypes: RoomTypeOptionModel[];
}