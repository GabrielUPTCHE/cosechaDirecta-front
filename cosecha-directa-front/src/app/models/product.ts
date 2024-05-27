export interface Product {
    id_product:       number;
    product_name:     string;
    variety:          string;
    unit_measure:     string;
    description:      string;
    time_period_size: string;
    time_period_type: string;
    location_id:      number;
    product_images:   ProductImage[];
    inventory:        Inventory[];
    location:         Location;
    begin_period_date: Date | string;
}

export interface Inventory {
    id_product: number;
    id_user:    number;
    quantity:   number;
    unit_price: number;
    user?: {fullname:string, id_user:number};
    next_delivery_date: Date | string;
    quantity_available?: number;
}

export interface Location {
    id_location:     number;
    location_name:   string;
    location_parent: number;
    location_type:   string;
}

export interface ProductImage {
    id_product_images: number;
    id_product:        number;
    url_image:         string;
}

