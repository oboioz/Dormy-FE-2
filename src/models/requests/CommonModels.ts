export interface GetBatchRequestModel {
  ids: string[];
}

export interface GetVehicleRequestBatchModel extends GetBatchRequestModel {
  userId?: string;
}

export interface ICreateRequest {
  roomId: string;
  requestType: string;
  description: string;
}

export interface IUpdateRequest extends ICreateRequest {
  id: string;
}
