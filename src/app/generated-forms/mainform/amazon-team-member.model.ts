export enum AmazonTeamMemberRowState {
  New = 'New',
  Modified = 'Modified',
  Deleted = 'Deleted',
  Unchanged = 'Unchanged'
}

export interface AmazonTeamMember {
  adpEmployeeId: string;
  firstName: string;
  lastName: string;
  hireDate?: string; // ISO format
  job: string;
  department: string;
  adpStatus: string;
  termDate?: string; // ISO format
  backgroundCheckDate?: string;
  backgroundCheckReferenceId?: string;
  avettaCreateDate?: string;
  avettaLogin?: string;
  avettaFlagStatus?: string;
  // Add additional badge fields if needed
  state?: AmazonTeamMemberRowState;
}
