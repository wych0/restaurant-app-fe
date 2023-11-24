export interface Dish {
  id: string;
  name: string;
  ingredients: string;
  price: number;
  type: string;
  isSpicy: boolean;
  isVegan: boolean;
  isDisplayed?: boolean;
  createdBy?: string;
  editedBy?: string;
}

export interface GetDishesResponse {
  dishes: Dish[];
  totalCount: number;
}

export interface GetDishesParams {
  sort: string;
  dir: string;
  page: number;
  size: number;
  type?: string;
  term?: string;
  isDisplayed?: boolean;
}
