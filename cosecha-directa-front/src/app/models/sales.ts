export interface Sale  {
    sale_date: string | Date;
    sale_status: string;
    payment_method: string;
    delivery_status: string;
    is_paid: number;
    id_user_bussines: number;
    id_sale?: number;
}

export interface SaleDetail {
    unit_price: number;
    amount: number;
    id_sale: number;
    id_product: number;
    id_user_producer: number;
}

export interface SaleDTO {
    sale :Sale,
    salesDetail: SaleDetail[]
}