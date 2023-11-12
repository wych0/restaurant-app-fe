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
  ReservationDetails,
  UserReservation,
} from '../../../core/models/reservation.model';
import { ReservationService } from '../../../core/services/reservation.service';
import { Size } from '../../../core/models/spinner.model';
import { format } from 'date-fns';

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
  resultsLength = 0;
  spinnerSize: Size = Size.BIG;
  isLoadingResults = true;
  reservationDetails!: ReservationDetails;

  constructor(private reservationService: ReservationService) {}
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

  getReservationDetails(id: string): void {
    this.reservationService.getReservationDetails(id).subscribe({
      next: (reservationDetails) => {
        this.reservationDetails = reservationDetails;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getUserReservations(): void {
    this.reservationsDataSub.unsubscribe();
    this.reservationsDataSub = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          const params: GetReservationsParams = {
            sort: this.sort.active,
            dir: this.sort.direction,
            page: this.paginator.pageIndex + 1,
            size: this.paginator.pageSize,
          };
          return this.reservationService.getUserReservations(params);
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

  reservationConfirmed(id: string): void {
    this.getReservationDetails(id);
    this.getUserReservations();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return format(date, 'dd.MM.yyyy');
  }

  ngOnDestroy(): void {
    this.reservationCreatedSub.unsubscribe();
    this.reservationsDataSub.unsubscribe();
  }
}
