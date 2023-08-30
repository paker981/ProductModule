import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ProductForm } from "../modules/product/interfaces/product.interface";

export const productForm = new FormGroup<ProductForm>({
    title: new FormControl('' , Validators.required) as FormControl<string>,
    price: new FormControl('' as unknown as number , Validators.required) as FormControl<number>,
    description: new FormControl('' , Validators.required) as FormControl<string>,
    image: new FormControl('' , Validators.required) as FormControl<string>,
    category: new FormControl('' , Validators.required) as FormControl<string>
})