export enum SiteRowState {
  New = 'New',
  Modified = 'Modified',
  Deleted = 'Deleted',
  Unchanged = 'Unchanged'
}

export interface AmazonSite {
  id: number;
  siteCode: string;
  siteType?: string;
  size?: number;
  population?: number;
  notes?: string;
  status?: string;
  address1?: string;
  address2?: string;
  city?: string;
  region?: string;
  country?: string;
  postalCode?: string;
  state?: SiteRowState;
}
