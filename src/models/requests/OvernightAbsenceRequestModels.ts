export interface CreateOvernightAbsenceRequestModel {
    // startDateTime: string,
    // endDateTime: string,
    startDateTime: Date,
    endDateTime: Date,
    reason: string
}

export interface UpdateOvernightAbsenceRequestModel extends CreateOvernightAbsenceRequestModel {
    id: string;
}

export interface GetBatchOvernightAbsenceRequestModel {
    ids: string[];
}

export interface ApproveOrRejectOvernightAbsenceRequestModel {
    isApproved: boolean;
}