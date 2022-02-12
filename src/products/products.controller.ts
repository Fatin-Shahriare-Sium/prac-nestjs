import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { productDto } from './product.dto';
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

    @UsePipes(new ValidationPipe({
        whitelist: true//it will remove unwanted property
    }))
    //curl -X POST -H "Content-Type:application/json" -d '{"myCreator":"Allah"}' http://localhost:5500/products/create
    createOne(@Body() body: productDto) {
        console.log(body.price)
        return this.productsService.createProduct(body.name, body.price)

    }
    @Get('/delete/:id')
    deleteOne(@Param('id', ParseIntPipe) id: number) {
        //ParseIntPipe will parse the coming string into number
        return this.productsService.deleteOne(id)

    }
}
