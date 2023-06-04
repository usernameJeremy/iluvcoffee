import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { Flavor } from './entieties/flavors.entity/flavors.entity';

@Injectable()
export class CoffeesService {
    


constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>
){}


    async findAll(){
        return this.coffeeRepository.find({
            relations: {
                flavors: true,
            }
        });
    }

    async findOne(id: string){
        const coffee = await this.coffeeRepository.findOne({
            where: {
                id: +id},
            relations: {
            flavors: true,
            }
         });
        if(!coffee){
            throw new NotFoundException(`Coffee #${id} not found`);
        }
        return coffee;
    }

    async create(createCoffeeDto: CreateCoffeeDto){
        const coffee = this.coffeeRepository.create(createCoffeeDto)
        return this.coffeeRepository.save(coffee);
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto){
        const coffee = await this.coffeeRepository.preload({
            id: +id,
            ...updateCoffeeDto
        });
        if (!coffee){
            throw new NotFoundException(`Coffee #${id} not found`);
        }
        return this.coffeeRepository.save(coffee);
    }

    async remove(id: string){
       const coffee = await this.findOne(id);
       return this.coffeeRepository.remove(coffee);
    }
}
