import { IsString } from "class-validator";
import { Flavor } from "src/coffees/entieties/flavors.entity/flavors.entity";

export class CreateCoffeeDto {
    @IsString()
    readonly name: string;
   
    @IsString()
    readonly brand: string;
    
    @IsString({each: true})
    readonly flavors: Flavor;
}
