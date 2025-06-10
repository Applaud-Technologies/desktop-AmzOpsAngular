
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MainFormService, Branch, Contact, ContactRowState } from './mainform.service';
import { AmazonAccountRowState } from './amazon-account.model';
import { AmazonTeamMemberRowState } from './amazon-team-member.model';
import { AmazonAccount } from './amazon-account.model';
import { AmazonSite, SiteRowState } from './amazon-site.model';
import { AmazonTeamMember } from './amazon-team-member.model';

@Component({
// ...
  selector: 'app-mainform',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './mainform.component.html',
  styleUrls: ['./mainform.component.css'],
  providers: [MainFormService],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatTableModule, MatSortModule, MatPaginatorModule, MatTabsModule, MatButtonModule]
})
export class MainFormComponent implements OnInit {
  // Data sources for WinForms tabs
  public accounts: AmazonAccount[] = [];
  public sites: AmazonSite[] = [];
  public sitesDataSource = new MatTableDataSource<AmazonSite>();
  public teamMembers: AmazonTeamMember[] = [];

  @ViewChild(MatSort) sitesSort!: MatSort;

  // ... WinForms legacy fields preserved for compatibility
  path: string = '';
  searchUser: string = '';
  permissions: string[] = [];
  users: any[] = [];
  groups: any[] = [];
  selectedUser: string = '';
  selectedGroup: string = '';
  public disposed: any = '';
  public TabControl: any = '';
  public TabSites: any = '';
  public TabContacts: any = '';
  public TabTeamMembers: any = '';
  public CbBranch: any[] = [];
  public LblBranch: any = '';
  public TabAccounts: any = '';
  public btnSaveSites: any = '';
  public Location: any = '';
  public Size: any = '';
  public Padding: any = '';
  public AutoScaleDimensions: any = '';
  public ClientSize: any = '';
  public col: any = '';
  public option: any = '';
  public branches: Branch[] = [];
  public contacts: Contact[] = [];
  public contactDisplayedColumns: string[] = [];
  public editRowId: number | null = null;
  public editForm: FormGroup | null = null;

  // Contacts CRUD state
  public editContactRowId: number | null = null;
  public editContactForm: FormGroup | null = null;

  addContact() {
    // Add a new contact row locally with default values and state 'New'
    const newContact: any = { id: 0, name: '', email: '', phone: '', address: '', notes: '', state: 'New' };
    this.contacts = [newContact, ...this.contacts];
    this.selectContactRow(newContact);
  }

  selectContactRow(row: any) {
    if (row && row.id !== undefined && row.id !== null) {
      this.editContactRowId = row.id;
      this.editContactForm = this.fb.group({});
      this.contactDisplayedColumns.forEach(col => {
        if (col !== 'id' && col !== 'state') {
          this.editContactForm!.addControl(col, this.fb.control(row[col]));
        }
      });
    }
  }

  isContactRowInEditMode(row: any): boolean {
    return !!row && row.id !== undefined && row.id !== null && this.editContactRowId === row.id;
  }

  saveContactEdit(row: any) {
    if (this.editContactForm && this.editContactForm.valid) {
      Object.keys(this.editContactForm.value).forEach(col => {
        row[col] = this.editContactForm!.value[col];
      });
      // Mark as Modified if not New or Deleted
      if (row.state !== 'New' && row.state !== 'Deleted') {
        row.state = 'Modified';
      }
      this.editContactRowId = null;
      this.editContactForm = null;
    }
  }

  cancelContactEdit() {
    this.editContactRowId = null;
    this.editContactForm = null;
  }

  getContactFormControl(col: string): FormControl | null {
    if (!this.editContactForm) return null;
    const ctrl = this.editContactForm.get(col);
    return ctrl instanceof FormControl ? ctrl : null;
  }

  deleteContact(contactId: number) {
    const contact = this.contacts.find((c: any) => c.id === contactId);
    if (contact && contact.state !== ContactRowState.New) {
      contact.state = ContactRowState.Deleted;
    } else if (contact && contact.state === ContactRowState.New) {
      this.contacts = this.contacts.filter((c: any) => c !== contact);
    }
    this.editContactRowId = null;
    this.editContactForm = null;
  }
  myGroup = new FormGroup({
    CbBranch: new FormControl(''),
  });


  // Angular Material Table DataSources and Columns
  // All columns for AmazonSite except 'state'
  public sitesDisplayedColumns: string[] = [
    'id',
    'siteCode',
    'siteType',
    'size',
    'population',
    'notes',
    'status',
    'address1',
    'address2',
    'city',
    'region',
    'country',
    'postalCode'
  ];
  public accountsDisplayedColumns: string[] = [];
  public teamMembersDisplayedColumns: string[] = [];

  // Expose enums for template row coloring
  public accountRowStateEnum = AmazonAccountRowState;
  public teamMemberRowStateEnum = AmazonTeamMemberRowState;
  public siteRowStateEnum = SiteRowState;
  public contactRowStateEnum = ContactRowState;

  // Accounts CRUD state
  public editAccountRowId: string | null = null;
  public editAccountForm: FormGroup | null = null;

  addAccount() {
    const newAccount: any = {
      accountNumber: '',
      name: '',
      siteCode: '',
      class: '',
      installDate: '',
      pullDate: '',
      isInactive: false,
      address1: '',
      address2: '',
      city: '',
      postalCode: '',
      state: AmazonAccountRowState.New
    };
    this.accounts = [newAccount, ...this.accounts];
    this.selectAccountRow(newAccount);
  }

  selectAccountRow(row: any) {
    if (row && row.accountNumber !== undefined && row.accountNumber !== null) {
      this.editAccountRowId = row.accountNumber;
      this.editAccountForm = this.fb.group({});
      this.accountsDisplayedColumns.forEach(col => {
        if (col !== 'accountNumber' && col !== 'state') {
          this.editAccountForm!.addControl(col, this.fb.control(row[col]));
        }
      });
    }
  }

  isAccountRowInEditMode(row: any): boolean {
    return !!row && row.accountNumber !== undefined && row.accountNumber !== null && this.editAccountRowId === row.accountNumber;
  }

  saveAccountEdit(row: any) {
    if (this.editAccountForm && this.editAccountForm.valid) {
      Object.keys(this.editAccountForm.value).forEach(col => {
        row[col] = this.editAccountForm!.value[col];
      });
      if (row.state !== AmazonAccountRowState.New && row.state !== AmazonAccountRowState.Deleted) {
        row.state = AmazonAccountRowState.Modified;
      }
      this.editAccountRowId = null;
      this.editAccountForm = null;
    }
  }

  cancelAccountEdit() {
    this.editAccountRowId = null;
    this.editAccountForm = null;
  }

  getAccountFormControl(col: string): FormControl | null {
    if (!this.editAccountForm) return null;
    const ctrl = this.editAccountForm.get(col);
    return ctrl instanceof FormControl ? ctrl : null;
  }

  deleteAccount(accountNumber: string) {
    const account = this.accounts.find((a: any) => a.accountNumber === accountNumber);
    if (account && account.state !== AmazonAccountRowState.New) {
      account.state = AmazonAccountRowState.Deleted;
    } else if (account && account.state === AmazonAccountRowState.New) {
      this.accounts = this.accounts.filter((a: any) => a !== account);
    }
    this.editAccountRowId = null;
    this.editAccountForm = null;
  }

  // Team Members CRUD state
  public editTeamMemberRowId: string | null = null;
  public editTeamMemberForm: FormGroup | null = null;

  addTeamMember() {
    const newTeamMember: any = {
      adpEmployeeId: '',
      firstName: '',
      lastName: '',
      hireDate: '',
      job: '',
      department: '',
      adpStatus: '',
      termDate: '',
      backgroundCheckDate: '',
      backgroundCheckReferenceId: '',
      avettaCreateDate: '',
      avettaLogin: '',
      avettaFlagStatus: '',
      state: AmazonTeamMemberRowState.New
    };
    this.teamMembers = [newTeamMember, ...this.teamMembers];
    this.selectTeamMemberRow(newTeamMember);
  }

  selectTeamMemberRow(row: any) {
    if (row && row.adpEmployeeId !== undefined && row.adpEmployeeId !== null) {
      this.editTeamMemberRowId = row.adpEmployeeId;
      this.editTeamMemberForm = this.fb.group({});
      this.teamMembersDisplayedColumns.forEach(col => {
        if (col !== 'adpEmployeeId' && col !== 'state') {
          this.editTeamMemberForm!.addControl(col, this.fb.control(row[col]));
        }
      });
    }
  }

  isTeamMemberRowInEditMode(row: any): boolean {
    return !!row && row.adpEmployeeId !== undefined && row.adpEmployeeId !== null && this.editTeamMemberRowId === row.adpEmployeeId;
  }

  saveTeamMemberEdit(row: any) {
    if (this.editTeamMemberForm && this.editTeamMemberForm.valid) {
      Object.keys(this.editTeamMemberForm.value).forEach(col => {
        row[col] = this.editTeamMemberForm!.value[col];
      });
      if (row.state !== AmazonTeamMemberRowState.New && row.state !== AmazonTeamMemberRowState.Deleted) {
        row.state = AmazonTeamMemberRowState.Modified;
      }
      this.editTeamMemberRowId = null;
      this.editTeamMemberForm = null;
    }
  }

  cancelTeamMemberEdit() {
    this.editTeamMemberRowId = null;
    this.editTeamMemberForm = null;
  }

  getTeamMemberFormControl(col: string): FormControl | null {
    if (!this.editTeamMemberForm) return null;
    const ctrl = this.editTeamMemberForm.get(col);
    return ctrl instanceof FormControl ? ctrl : null;
  }

  deleteTeamMember(adpEmployeeId: string) {
    const member = this.teamMembers.find((m: any) => m.adpEmployeeId === adpEmployeeId);
    if (member && member.state !== AmazonTeamMemberRowState.New) {
      member.state = AmazonTeamMemberRowState.Deleted;
    } else if (member && member.state === AmazonTeamMemberRowState.New) {
      this.teamMembers = this.teamMembers.filter((m: any) => m !== member);
    }
    this.editTeamMemberRowId = null;
    this.editTeamMemberForm = null;
  }

  constructor(public mainformService: MainFormService, private fb: FormBuilder) {}

  ngOnInit() {
    this.loadBranches();
    // Listen for branch changes
    this.myGroup.get('CbBranch')!.valueChanges.subscribe(branchId => {
      const id = typeof branchId === 'string' ? parseInt(branchId, 10) : branchId;
      if (id) {
        this.loadContacts(id);
      }
    });
    this.loadAccounts();
    this.loadSites();
    this.loadTeamMembers();
  }

  loadBranches() {
    this.mainformService.getBranches().subscribe(branches => {
      this.branches = branches;
      if (branches.length > 0) {
        this.myGroup.get('CbBranch')!.setValue(String(branches[0].id), { emitEvent: false });
        this.loadContacts(branches[0].id);
      }
    });
  }

  loadContacts(branchId: number) {
    this.mainformService.getContactsByBranch(branchId).subscribe(contacts => {
      this.contacts = contacts;
      this.contactDisplayedColumns = contacts.length > 0 ? Object.keys(contacts[0]) : [];
    });
  }

  // AmazonAccount methods
  loadAccounts() {
    this.mainformService.getAccounts().subscribe(accounts => {
      this.accounts = accounts;
      this.accountsDisplayedColumns = accounts.length > 0 ? Object.keys(accounts[0]) : [];
    });
  }

  // Row selection for editing
  selectSiteRow(row: AmazonSite | undefined) {
    if (row && row.id !== undefined && row.id !== null) {
      this.editRowId = row.id;
      // Build a FormGroup for the editable columns
      this.editForm = this.fb.group({});
      this.sitesDisplayedColumns.forEach(col => {
        if (col !== 'id' && col !== 'state') {
          this.editForm!.addControl(col, this.fb.control((row as any)[col]));
        }
      });
    }
  }

  isRowInEditMode(row: AmazonSite | undefined): boolean {
    return !!row && row.id !== undefined && row.id !== null && this.editRowId === row.id;
  }

  saveEdit(row: AmazonSite) {
    if (this.editForm && this.editForm.valid) {
      Object.keys(this.editForm.value).forEach(col => {
        (row as any)[col] = this.editForm!.value[col];
      });
      // Mark as Modified if not New or Deleted
      if (row.state !== SiteRowState.New && row.state !== SiteRowState.Deleted) {
        row.state = SiteRowState.Modified;
      }
      this.editRowId = null;
      this.editForm = null;
    }
  }

  cancelEdit() {
    this.editRowId = null;
    this.editForm = null;
  }

  getEditingSite(): AmazonSite | undefined {
    return this.sites.find(site => site.id === this.editRowId);
  }

  getFormControl(col: string): FormControl | null {
    return this.editForm?.get(col) instanceof FormControl ? this.editForm.get(col) as FormControl : null;
  }

  // AmazonSite methods


  loadSites() {
    this.mainformService.getSites().subscribe(sites => {
      // Mark all loaded sites as Unchanged for state tracking
      this.sites = sites.map(site => ({ ...site, state: SiteRowState.Unchanged }));
      this.sitesDataSource.data = this.sites;
      if (this.sitesSort) {
        this.sitesDataSource.sort = this.sitesSort;
      }
      // Do not set sitesDisplayedColumns dynamically
    });
  }

  ngAfterViewInit() {
    if (this.sitesSort) {
      this.sitesDataSource.sort = this.sitesSort;
    }
  }

  addSite(site?: AmazonSite) {
    // Add a new site row locally with default values and state New
    const newSite: AmazonSite = {
      id: 0,
      siteCode: 'NEW',
      state: SiteRowState.New
    };
    this.sites = [newSite, ...this.sites];
    this.sitesDataSource.data = this.sites;
    // Optionally, scroll to or focus the new row in the UI
  }

  updateSite(row: AmazonSite) {
    // Mark as Modified if not New or Deleted
    if (row.state !== SiteRowState.New && row.state !== SiteRowState.Deleted) {
      row.state = SiteRowState.Modified;
    }
  }

  deleteSite(siteId: number) {
    // Mark site as Deleted for state tracking
    const site = this.sites.find(s => s.id === siteId);
    if (site && site.state !== SiteRowState.New) {
      site.state = SiteRowState.Deleted;
    } else if (site && site.state === SiteRowState.New) {
      // Remove from list if never saved
      this.sites = this.sites.filter(s => s !== site);
    }
    // Optionally, update in backend immediately or batch save later
    // this.mainformService.deleteSite(siteId).subscribe(() => this.loadSites());
  }

  // Test helpers for UI buttons
  editFirstSite() {
    if (this.sites.length > 0) {
      const site = this.sites[0];
      if (site.state !== SiteRowState.New && site.state !== SiteRowState.Deleted) {
        site.state = SiteRowState.Modified;
      }
    }
  }

  deleteFirstSite() {
    if (this.sites.length > 0) {
      const site = this.sites[0];
      if (site.state !== SiteRowState.New) {
        site.state = SiteRowState.Deleted;
      } else {
        this.sites = this.sites.slice(1);
      }
    }
  }

  saveSitesBatch(sites: AmazonSite[]) {
    this.mainformService.saveSitesBatch(sites).subscribe(() => this.loadSites());
    console.log('Batch save called for sites:', sites);
  }

  // AmazonTeamMember methods
  loadTeamMembers() {
    this.mainformService.getTeamMembers().subscribe(teamMembers => {
      this.teamMembers = teamMembers;
      this.teamMembersDisplayedColumns = teamMembers.length > 0 ? Object.keys(teamMembers[0]) : [];
    });
  }

  saveTeamMembersBatch(teamMembers: AmazonTeamMember[]) {
    this.mainformService.saveTeamMembersBatch(teamMembers).subscribe(() => this.loadTeamMembers());
  console.log('Batch save called for team members:', teamMembers);
  }

  saveAccountsBatch(accounts: AmazonAccount[]) {
    this.mainformService.saveAccountsBatch(accounts).subscribe(() => this.loadAccounts());
    console.log('Batch save called for accounts:', accounts);
  }

  saveContactsBatch(contacts: Contact[]) {
    const branchId = Number(this.myGroup.get('CbBranch')?.value);
    this.mainformService.saveContactsBatch(contacts).subscribe(() => this.loadContacts(branchId));
    console.log('Batch save called for contacts:', contacts);
  }
}
