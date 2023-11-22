import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, map, merge, startWith, switchMap } from 'rxjs';
import {
  GetReservationsParams,
  UserReservation,
} from '../../../core/models/reservation.model';
import { ReservationService } from '../../../core/services/reservation.service';
import { Size } from '../../../core/models/spinner.model';
import { format } from 'date-fns';
import { ReservationDetailsModalComponent } from '../reservation-details-modal/reservation-details-modal.component';
import { UserService } from 'src/app/modules/core/services/user.service';
import { toDateWithHour } from 'src/app/modules/shared/tools/date-formatter';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
})
export class ReservationsComponent implements AfterViewInit, OnDestroy, OnInit {
  private reservationCreatedSub: Subscription = new Subscription();
  private reservationsDataSub: Subscription = new Subscription();
  displayedColumns: string[] = ['id', 'date', 'status', 'action'];
  data!: MatTableDataSource<UserReservation>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(ReservationDetailsModalComponent)
  detailsModal!: ReservationDetailsModalComponent;
  resultsLength = 0;
  spinnerSize: Size = Size.BIG;
  isLoadingResults = true;
  selectedFilter: string | undefined = '';

  constructor(
    private reservationService: ReservationService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.reservationCreatedSub =
      this.reservationService.reservationCreated$.subscribe((created) => {
        if (created) {
          this.getUserReservations();
        }
      });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.getUserReservations();
  }

  getUserReservations(): void {
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
              status: this.selectedFilter,
            };
            return this.userService.getReservations(params);
          }),
          map((data) => {
            this.isLoadingResults = false;
            this.resultsLength = data.totalCount;
            return data.reservations;
          })
        )
        .subscribe(
          (reservations) =>
            (this.data = new MatTableDataSource<UserReservation>(reservations))
        );
    }
  }

  applyFilter(): void {
    this.paginator.pageIndex = 0;
    this.getUserReservations();
  }

  getReservationDetails(id: string): void {
    this.detailsModal.getReservationDetails(id);
  }

  reservationUpdated(): void {
    this.paginator.pageIndex = 0;
    this.getUserReservations();
  }

  formatDate(date: string, hour: string): string {
    return toDateWithHour(date, hour);
  }

  ngOnDestroy(): void {
    this.reservationCreatedSub.unsubscribe();
    this.reservationsDataSub.unsubscribe();
  }
}
