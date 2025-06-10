
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AmazonAccount } from './amazon-account.model';
import { AmazonSite } from './amazon-site.model';
import { AmazonTeamMember } from './amazon-team-member.model';

export interface Branch {
  id: number;
  name: string;
  location: string;
  code: string;
}

export enum ContactRowState {
  New = 'New',
  Modified = 'Modified',
  Deleted = 'Deleted',
  Unchanged = 'Unchanged'
}

export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  branchId: number;
  state?: ContactRowState;
}

@Injectable({ providedIn: 'root' })
export class MainFormService {
  private apiUrl = 'http://localhost:5000/api'; // Adjust as needed

  constructor(private http: HttpClient) {}

  // AmazonAccount CRUD
  getAccounts(): Observable<AmazonAccount[]> {
    return this.http.get<AmazonAccount[]>(`${this.apiUrl}/AmazonAccount`);
  }
  getAccountById(id: string): Observable<AmazonAccount> {
    return this.http.get<AmazonAccount>(`${this.apiUrl}/AmazonAccount/${id}`);
  }
  createAccount(account: AmazonAccount): Observable<AmazonAccount> {
    return this.http.post<AmazonAccount>(`${this.apiUrl}/AmazonAccount`, account);
  }
  updateAccount(id: string, account: AmazonAccount): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/AmazonAccount/${id}`, account);
  }
  deleteAccount(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/AmazonAccount/${id}`);
  }

  // AmazonAccount bulk save
  saveAccountsBatch(accounts: AmazonAccount[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/AmazonAccount/save`, accounts);
  }

  // AmazonSite CRUD
  getSites(): Observable<AmazonSite[]> {
    return this.http.get<AmazonSite[]>(`${this.apiUrl}/AmazonSite`);
  }
  getSiteById(id: number): Observable<AmazonSite> {
    return this.http.get<AmazonSite>(`${this.apiUrl}/AmazonSite/${id}`);
  }
  createSite(site: AmazonSite): Observable<AmazonSite> {
    return this.http.post<AmazonSite>(`${this.apiUrl}/AmazonSite`, site);
  }
  updateSite(id: number, site: AmazonSite): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/AmazonSite/${id}`, site);
  }
  deleteSite(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/AmazonSite/${id}`);
  }
  saveSitesBatch(sites: AmazonSite[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/AmazonSite/save`, sites);
  }

  // AmazonTeamMember CRUD
  getTeamMembers(): Observable<AmazonTeamMember[]> {
    return this.http.get<AmazonTeamMember[]>(`${this.apiUrl}/AmazonTeamMember`);
  }
  getTeamMemberById(id: string): Observable<AmazonTeamMember> {
    return this.http.get<AmazonTeamMember>(`${this.apiUrl}/AmazonTeamMember/${id}`);
  }
  createTeamMember(teamMember: AmazonTeamMember): Observable<AmazonTeamMember> {
    return this.http.post<AmazonTeamMember>(`${this.apiUrl}/AmazonTeamMember`, teamMember);
  }
  updateTeamMember(id: string, teamMember: AmazonTeamMember): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/AmazonTeamMember/${id}`, teamMember);
  }
  deleteTeamMember(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/AmazonTeamMember/${id}`);
  }
  saveTeamMembersBatch(teamMembers: AmazonTeamMember[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/AmazonTeamMember/save`, teamMembers);
  }

  // Branches
  getBranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>(`${this.apiUrl}/Branch`);
  }

  // Contacts
  getContactsByBranch(branchId: number): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/Contact/ByBranch/${branchId}`);
  }

  saveContactsBatch(contacts: Contact[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Contact/save`, contacts);
  }
}
