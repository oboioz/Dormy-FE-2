export interface GetBatchRequestModel {
  ids: string[];
}

export interface GetVehicleRequestBatchModel extends GetBatchRequestModel {
  userId?: string;
}
