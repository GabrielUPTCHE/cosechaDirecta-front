export interface Product {
    id_product?: number;
    product_name: string;
    variety: string;
    unit_measure: string;
    description?: string;
    time_period_size: string;
    time_period_type: string;
    product_images:ProductImage[];
}

export interface ProductImage {
    url_image: string,
    id_product:number
}


