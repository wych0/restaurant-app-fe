import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotifierService } from 'angular-notifier';
import { format } from 'date-fns';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
  startWith,
  switchMap,
} from 'rxjs';
import { CancelReservationForm } from 'src/app/modules/core/models/forms.model';
import {
  AdditionalOptions,
  CancelReservation,
  GetReservationsParams,
  Reservation,
} from 'src/app/modules/core/models/reservation.model';
import { Size } from 'src/app/modules/core/models/spinner.model';
import { FormService } from 'src/app/modules/core/services/form-service';
import { ReservationService } from 'src/app/modules/core/services/reservation.service';
import { badgeClasses } from 'src/app/modules/shared/tools/badge-classes';
import { toDateWithHour } from 'src/app/modules/shared/tools/date-formatter';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss', '../../common-styles.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ReservationsComponent implements AfterViewInit, OnDestroy {
  columnsToDisplay: string[] = [
    'id',
    'name',
    'date',
    'people',
    'table',
    'status',
    'complete',
    'cancel',
    'expand',
  ];
  expandedElement!: Reservation | null;
  private reservationsDataSub: Subscription = new Subscription();
  private nameFilterSub: Subscription = new Subscription();
  data!: MatTableDataSource<Reservation>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  cancelForm: FormGroup<CancelReservationForm> =
    this.formService.initCancelReservationForm();
  resultsLength: number = 0;
  spinnerSize: Size = Size.BIG;
  isLoadingResults: boolean = true;
  nameFilter = new FormControl('', { nonNullable: true });
  statusFilter: string = '';
  todaysDate: string = format(new Date(), 'dd.MM.yyyy');
  todaysFilter: boolean = false;
  term: string | undefined;
  actionReservationId: string | undefined;
  action: string | undefined;
  cancelledReservation!: Reservation;

  constructor(
    private reservationService: ReservationService,
    private notifierService: NotifierService,
    private formService: FormService
  ) {}

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.nameFilterSub = this.nameFilter.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((term) => {
        this.term = term;
        this.getReservations();
        this.paginator.pageIndex = 0;
      });
    this.getReservations();
  }

  getReservations(): void {
    this.reservationsDataSub.unsubscribe();
    if (this.sort) {
      this.reservationsDataSub = merge(
        this.sort.sortChange,
        this.paginator.page
      )
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoadingResults = true;
            const params: GetReservationsParams = {
              sort: this.sort.active,
              dir: this.sort.direction,
              page: this.paginator.pageIndex + 1,
              size: this.paginator.pageSize,
              status: this.statusFilter,
              date: this.todaysFilter ? this.todaysDate : undefined,
              term: this.term,
            };
            return this.reservationService.getAll(params);
          }),
          map((data) => {
            this.isLoadingResults = false;
            this.resultsLength = data.totalCount;
            return data.reservations;
          })
        )
        .subscribe(
          (reservations) =>
            (this.data = new MatTableDataSource<Reservation>(reservations))
        );
    }
  }

  applyFilter(filterBy: string): void {
    if (filterBy === 'todays') {
      this.todaysFilter = !this.todaysFilter;
    }
    this.paginator.pageIndex = 0;
    this.getReservations();
  }

  formatDate(date: string, hour: string): string {
    return toDateWithHour(date, hour);
  }

  setBadgeClass(status: string): string {
    return badgeClasses(status);
  }

  optionsToArray(additionalOptions: AdditionalOptions): string[] {
    return Object.entries(additionalOptions)
      .filter(([key, value]) => value === true)
      .map(([key]) => key);
  }

  setAction(action: string, id: string): void {
    this.action = action;
    this.actionReservationId = id;
  }

  setCancelledReservation(reservation: Reservation): void {
    this.cancelledReservation = reservation;
    this.setAction('cancel', reservation.id);
  }

  updateReservation(): void {
    if (this.actionReservationId) {
      if (this.action === 'complete') {
        this.reservationService.complete(this.actionReservationId).subscribe({
          next: () => {
            this.notifierService.notify('success', 'Reservation completed!');
            this.getReservations();
          },
          error: () => {
            this.notifierService.notify(
              'error',
              'Something went wrong, please try again.'
            );
            this.getReservations();
          },
        });
      }
      if (this.action === 'cancel') {
        const formData = this.cancelForm.getRawValue();
        const cancelReservation: CancelReservation = {
          reason: formData.reason,
        };
        this.reservationService
          .cancel(this.actionReservationId, cancelReservation)
          .subscribe({
            next: () => {
              this.notifierService.notify('success', 'Reservation cancelled!');
              this.getReservations();
            },
            error: () => {
              this.notifierService.notify(
                'error',
                'Something went wrong, please try again.'
              );
              this.getReservations();
            },
          });
      }
    }
  }

  resetValues(): void {
    this.cancelForm.reset();
  }

  ngOnDestroy(): void {
    this.nameFilterSub.unsubscribe();
    this.reservationsDataSub.unsubscribe();
  }
}
