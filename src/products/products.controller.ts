import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ProductsService } from './products.service'
@Controller('products')
export class ProductsController {
    constructor(readonly productsService: ProductsService) { }
    @Get()
    getAllProducts() {
        return this.productsService.getAll()
    }
    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        console.log(id);

        return this.productsService.getOneById(id)
    }
    @Post('/create')
    createOne(@Body() body: any) {
        console.log(body.price)
        return this.productsService.createProduct(body.name, body.price)

    }
    @Get('/delete/:id')
    deleteOne(@Param('id', ParseIntPipe) id: number) {
        //ParseIntPipe will parse the coming string into number
        return this.productsService.deleteOne(id)

    }
}
