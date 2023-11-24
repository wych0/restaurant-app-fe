import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
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
import { Dish, GetDishesParams } from 'src/app/modules/core/models/dish.model';
import { Size } from 'src/app/modules/core/models/spinner.model';
import { DishService } from 'src/app/modules/core/services/dish.service';
import { FormService } from 'src/app/modules/core/services/form-service';
import { badgeClasses } from 'src/app/modules/shared/tools/badge-classes';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss', '../../common-styles.scss'],
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
export class DishesComponent implements AfterViewInit, OnDestroy {
  columnsToDisplay: string[] = [
    'id',
    'name',
    'price',
    'type',
    'displayed',
    'edit',
    'delete',
    'expand',
  ];
  expandedElement!: Dish | null;
  private dishesDataSub: Subscription = new Subscription();
  private nameFilterSub: Subscription = new Subscription();
  data!: MatTableDataSource<Dish>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  resultsLength: number = 0;
  spinnerSize: Size = Size.BIG;
  isLoadingResults: boolean = true;
  nameFilter = new FormControl('', { nonNullable: true });
  typeFilter: string = '';
  term: string | undefined;
  displayedFilter: boolean = false;

  constructor(
    private dishService: DishService,
    private notifierService: NotifierService,
    private formService: FormService
  ) {}

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.nameFilterSub = this.nameFilter.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((term) => {
        this.term = term;
        this.getDishes();
        this.paginator.pageIndex = 0;
      });
    this.getDishes();
  }

  getDishes(): void {
    this.dishesDataSub.unsubscribe();
    if (this.sort) {
      this.dishesDataSub = merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoadingResults = true;
            const params: GetDishesParams = {
              sort: this.sort.active,
              dir: this.sort.direction,
              page: this.paginator.pageIndex + 1,
              size: this.paginator.pageSize,
              type: this.typeFilter,
              isDisplayed: this.displayedFilter
                ? this.displayedFilter
                : undefined,
              term: this.term,
            };
            return this.dishService.getAll(params);
          }),
          map((data) => {
            this.isLoadingResults = false;
            this.resultsLength = data.totalCount;
            return data.dishes;
          })
        )
        .subscribe(
          (dishes) => (this.data = new MatTableDataSource<Dish>(dishes))
        );
    }
  }

  applyFilter(filterBy: string): void {
    if (filterBy === 'displayed') {
      this.displayedFilter = !this.displayedFilter;
    }
    this.paginator.pageIndex = 0;
    this.getDishes();
  }

  setBadgeClass(isDisplayed: boolean): string {
    return badgeClasses(isDisplayed);
  }

  ngOnDestroy(): void {
    this.nameFilterSub.unsubscribe();
    this.dishesDataSub.unsubscribe();
  }
}
