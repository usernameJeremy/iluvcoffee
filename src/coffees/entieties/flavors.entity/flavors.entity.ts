import { Coffee } from 'src/coffees/entities/coffee.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';


@Entity()
export class Flavor{
    map(arg: (name: any) => Promise<Flavor>): any {
        throw new Error('Method not implemented.');
    }
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(
        type => Coffee,
        coffee => coffee.flavors,       
    )
    coffees: Coffee[];
}
