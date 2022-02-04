import { Injectable } from '@nestjs/common';
import { newProduct, product } from './product.model';

@Injectable()

export class ProductsService {
    product: product[] = [new newProduct(1, 'xaimoi mi ai', 20000), new newProduct(2, 'nokia m12', 30000), new newProduct(3, 'asus 34tyu', 600000)]

    getAll(): product[] {

        return this.product
    }
    getOneById(id: number): product {
        return this.product.find((sig, index) => { return sig.id == id })
    }
    deleteOne(id: number): product[] {
        return this.product.filter(sig => sig.id !== id)
    }


}
