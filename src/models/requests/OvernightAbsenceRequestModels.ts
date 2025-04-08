export interface CreateOvernightAbsenceRequestModel {
    startDateTime: string,
    endDateTime: string,
    reason: string
}

export interface UpdateOvernightAbsenceRequestModel {
    id: string;
    startDateTime: string,
    endDateTime: string,
    reason: string
}

export interface GetBatchOvernightAbsenceRequestModel {
    ids: string[];
}

export interface ApproveOrRejectOvernightAbsenceRequestModel {
    isApproved: boolean;
}