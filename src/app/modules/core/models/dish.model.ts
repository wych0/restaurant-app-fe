export interface Dish {
  id: string;
  name: string;
  ingredients: string;
  price: number;
  type: string;
  isSpicy?: boolean;
  isVegan?: boolean;
  isDisplayed?: boolean;
  createdBy?: string;
  editedBy?: string;
}

export type CreateDish = Omit<
  Dish,
  'id' | 'isDisplayed' | 'createdBy' | 'editedBy'
>;

export interface EditDish extends CreateDish {
  isDisplayed: boolean;
}

export interface CreateDishResponse {
  name: string;
  type: string;
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

export interface MessageResponse {
  message: string;
}
