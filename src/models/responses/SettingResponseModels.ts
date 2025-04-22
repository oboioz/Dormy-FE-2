export interface SettingResponseModel {
    id: string;
    keyName: string;
    value: string;
    dataType: string;
    isApplied: boolean;
    createdByCreator?: string;
    lastUpdatedByUpdater?: string;
    createdDateUtc?: string;
    lastUpdatedDateUtc?: string;
    createdBy?: string;
    lastUpdatedBy?: string;
    isDeleted?: boolean;
}