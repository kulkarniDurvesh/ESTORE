import { Observable,of } from "rxjs";
import { Category } from "src/app/home/types/category.types";
export class CategoriesStoreItemMock{
    
    loadCategories():any{};
    categories$: Observable<Category[]> = of([
        { ID: 1, CATEGORY: 'Category 1', PARENT_CATEGORY_ID: 1 },
        { ID: 2, CATEGORY: 'Category 2', PARENT_CATEGORY_ID: 1 },
        { ID: 3, CATEGORY: 'Category 3'},
        { ID: 4, CATEGORY: 'Category 4'},
      ]);

    topLevelCategories$:Observable<Category[]>=of([
        {
            ID:1,
            CATEGORY:'Category 1',
           // PARENT_CATEGORY_ID:1
        },
        {
            ID:2,
            CATEGORY:'Category 2',
            //PARENT_CATEGORY_ID:1
        }
    ])
    get categoriesOb():Observable<Category[]>{
        return this.categories$;
    }
}