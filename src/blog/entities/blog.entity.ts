import { User } from "src/auth/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Blog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    title: string;

    @Column({
        type: 'varchar',
        length: 200,
        nullable: true
    })
    summary: string;

    @Column({
        type: 'text'
    })
    content: string;

    @ManyToOne(() => User, (user) => user.blogs)
    user: User
}