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
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
  startWith,
  switchMap,
} from 'rxjs';
import {
  CreateDish,
  Dish,
  GetDishesParams,
  EditDish,
} from 'src/app/modules/core/models/dish.model';
import { DishForm } from 'src/app/modules/core/models/forms.model';
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
  dishForm: FormGroup<DishForm> = this.formService.initDishForm();
  resultsLength: number = 0;
  spinnerSize: Size = Size.BIG;
  isLoadingResults: boolean = true;
  nameFilter = new FormControl('', { nonNullable: true });
  typeFilter: string = '';
  term: string | undefined;
  displayedFilter: boolean = false;
  action: string | undefined;
  actionDish: Dish | undefined;
  submitted: boolean = false;
  actionStatus: string | null = null;

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

  setAction(action: string, dish?: Dish): void {
    this.resetValues();
    this.action = action;
    this.actionDish = dish;
    if (action === 'edit' && dish) {
      this.dishForm.controls.name.setValue(dish.name);
      this.dishForm.controls.ingredients.setValue(dish.ingredients);
      this.dishForm.controls.type.setValue(dish.type);
      this.dishForm.controls.price.setValue(dish.price);
      if (typeof dish.isSpicy != 'undefined') {
        this.dishForm.controls.isSpicy.setValue(dish.isSpicy);
      }
      if (typeof dish.isVegan != 'undefined') {
        this.dishForm.controls.isVegan.setValue(dish.isVegan);
      }
      if (typeof dish.isDisplayed != 'undefined') {
        this.dishForm.controls.isDisplayed.setValue(dish.isDisplayed);
      }
    }
  }

  deleteDish(): void {
    if (this.actionDish) {
      if (this.action === 'delete') {
        this.dishService.delete(this.actionDish.id).subscribe({
          next: () => {
            this.notifierService.notify(
              'success',
              `${this.actionDish!.type} ${this.actionDish!.name} deleted!`
            );
            this.getDishes();
          },
          error: () => {
            this.notifierService.notify(
              'error',
              'Something went wrong, please try again.'
            );
            this.getDishes();
          },
        });
      }
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.dishForm.valid) {
      this.actionStatus = 'Loading';
      const formData = this.dishForm.getRawValue();
      const dish: CreateDish = {
        name: formData.name,
        ingredients: formData.ingredients,
        price: formData.price,
        type: formData.type,
        isSpicy:
          formData.type !== 'Dessert' && formData.type !== 'Drink'
            ? formData.isSpicy
            : undefined,
        isVegan:
          formData.type !== 'Dessert' && formData.type !== 'Drink'
            ? formData.isVegan
            : undefined,
      };
      if (this.action === 'add') {
        this.dishService.create(dish).subscribe({
          next: () => {
            this.actionStatus = 'Success';
            this.getDishes();
          },
          error: () => {
            this.actionStatus = 'Failed';
          },
        });
      }

      if (this.action === 'edit' && this.actionDish) {
        const editDish: EditDish = {
          ...dish,
          isDisplayed: formData.isDisplayed,
        };
        this.dishService.update(editDish, this.actionDish.id).subscribe({
          next: () => {
            this.actionStatus = 'Success';
            this.getDishes();
          },
          error: () => {
            this.actionStatus = 'Failed';
          },
        });
      }
    }
  }

  getErrorMessage(control: FormControl, name?: string) {
    return this.formService.getErrorMessage(control, name);
  }

  checkControlInvalid(control: FormControl): boolean {
    return this.formService.controlInvalid(control, this.submitted);
  }

  resetValues(): void {
    this.dishForm.reset();
    this.actionStatus = null;
    this.submitted = false;
  }

  ngOnDestroy(): void {
    this.nameFilterSub.unsubscribe();
    this.dishesDataSub.unsubscribe();
  }
}
