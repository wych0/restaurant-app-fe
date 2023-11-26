import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotifierService } from 'angular-notifier';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
  startWith,
  switchMap,
} from 'rxjs';
import { WorkerForm } from 'src/app/modules/core/models/forms.model';
import { Size } from 'src/app/modules/core/models/spinner.model';
import {
  GetWorkersParams,
  User,
  Worker,
  WorkerData,
} from 'src/app/modules/core/models/user.model';
import { FormService } from 'src/app/modules/core/services/form-service';
import { UserService } from 'src/app/modules/core/services/user.service';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss', '../../common-styles.scss'],
})
export class WorkersComponent implements AfterViewInit, OnDestroy {
  columnsToDisplay: string[] = ['email', 'delete'];
  element!: User | null;
  private workersDataSub: Subscription = new Subscription();
  private emailFilterSub: Subscription = new Subscription();
  data!: MatTableDataSource<Worker>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  workerForm: FormGroup<WorkerForm> = this.formService.initWorkerForm();
  resultsLength: number = 0;
  spinnerSize: Size = Size.BIG;
  isLoadingResults: boolean = true;
  emailFilter = new FormControl('', { nonNullable: true });
  term: string | undefined;
  submitted: boolean = false;
  actionStatus: string | null = null;
  error: string | null = null;
  deletingWorker!: Worker;

  constructor(
    private userService: UserService,
    private notifierService: NotifierService,
    private formService: FormService
  ) {}

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.emailFilterSub = this.emailFilter.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((term) => {
        this.term = term;
        this.getWorkers();
        this.paginator.pageIndex = 0;
      });
    this.getWorkers();
  }

  getWorkers(): void {
    this.workersDataSub.unsubscribe();
    if (this.sort) {
      this.workersDataSub = merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoadingResults = true;
            const params: GetWorkersParams = {
              sort: this.sort.active,
              dir: this.sort.direction,
              page: this.paginator.pageIndex + 1,
              size: this.paginator.pageSize,
              term: this.term,
            };
            return this.userService.getWorkers(params);
          }),
          map((data) => {
            this.isLoadingResults = false;
            this.resultsLength = data.totalCount;
            return data.workers;
          })
        )
        .subscribe(
          (workers) => (this.data = new MatTableDataSource<Worker>(workers))
        );
    }
  }

  setDeletingWorker(worker: Worker): void {
    this.deletingWorker = worker;
  }

  deleteWorker(): void {
    this.userService.deleteWorker(this.deletingWorker.id).subscribe({
      next: () => {
        this.notifierService.notify(
          'success',
          `Worker ${this.deletingWorker.email} deleted!`
        );
        this.getWorkers();
      },
      error: () => {
        this.notifierService.notify(
          'error',
          'Something went wrong, please try again.'
        );
        this.getWorkers();
      },
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.workerForm.valid) {
      this.actionStatus = 'Loading';
      const formData = this.workerForm.getRawValue();
      const worker: WorkerData = {
        email: formData.email,
        password: formData.password,
      };

      this.userService.createWorker(worker).subscribe({
        next: () => {
          this.actionStatus = 'Success';
          this.getWorkers();
        },
        error: (response) => {
          this.actionStatus = 'Failed';
          this.error = response.error.message;
        },
      });
    }
  }

  getErrorMessage(control: FormControl, name?: string) {
    return this.formService.getErrorMessage(control, name);
  }

  checkControlInvalid(control: FormControl): boolean {
    return this.formService.controlInvalid(control, this.submitted);
  }

  resetValues(): void {
    this.workerForm.reset();
    this.actionStatus = null;
    this.submitted = false;
    this.error = null;
  }

  ngOnDestroy(): void {
    this.emailFilterSub.unsubscribe();
    this.workersDataSub.unsubscribe();
  }
}
