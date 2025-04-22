export interface SettingCreateUpdateRequestModel {
    keyName: string;
    value: string;
    dataType: string;
}

export interface SettingTurnOnOffRequestModel {
    keyName: string;
    isApplied: boolean;
}
