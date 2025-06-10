export enum AmazonAccountRowState {
  New = 'New',
  Modified = 'Modified',
  Deleted = 'Deleted',
  Unchanged = 'Unchanged'
}

export interface AmazonAccount {
  accountNumber: string;
  name: string;
  siteCode: string;
  class: string;
  installDate?: string; // ISO format
  pullDate?: string; // ISO format
  isInactive: boolean;
  address1: string;
  address2: string;
  city: string;
  postalCode: string;
  // Only one state property for CRUD tracking
  state?: AmazonAccountRowState;
}
