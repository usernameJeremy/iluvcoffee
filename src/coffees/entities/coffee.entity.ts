import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Flavor } from "../entieties/flavors.entity/flavors.entity";


@Entity()
export class Coffee {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column()
    brand: string;

    @Column({default: 0})
    recommendations: number;
    
    //join table is owner
    @JoinTable()
    @ManyToMany(
        type  => Flavor, 
        (flavor) => flavor.coffees,
        {
            cascade: true //['insert']
        }
         )
    flavors: Flavor[];
    
}