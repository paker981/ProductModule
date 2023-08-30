import { Form, FormControl } from "@angular/forms"

export interface Product {
    id: number,
    title: string,
    price: number,
    category: string,
    description: string,
    image: string
}

export interface ProductBody {
    title: string,
    price: number,
    category: string,
    description: string,
    image: string
}

export type ProductForm = {
    title: FormControl<string>,
    price: FormControl<number>,
    category: FormControl<string>,
    description: FormControl<string>,
    image: FormControl<string>
}