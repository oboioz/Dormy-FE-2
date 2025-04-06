export interface WorkplaceModel {
  id: string;
  name: string;
  address: string;
  abbrevation: string;
  createdByCreator: string;
  lastUpdatedByUpdater: string;
  createdDateUtc: string;
  lastUpdatedDateUtc: string;
  createdBy: string;
  lastUpdatedBy: string;
  isDeleted: boolean;
}

export interface WorkplaceCreateModel {
  name: string;
  address: string;
  abbrevation: string;
}

export interface WorkplaceUpdateModel extends WorkplaceCreateModel {
  id: string;
}

export interface WorkplaceOptionModel {
  id: string;
  name: string;
  abbrevation: string;
}
