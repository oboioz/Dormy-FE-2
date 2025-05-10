export interface SettingCreateUpdateRequestModel {
    keyName: string;
    value?: string | null;
    dataType: string;
}

export interface SettingTurnOnOffRequestModel {
    keyName: string;
    isApplied: boolean;
}
