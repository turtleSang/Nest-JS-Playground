import { Blog } from "src/blog/entities/blog.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        length: 10,
        unique: true
    })
    username: string;

    @Column({
        length: 255,
    })
    password: string;


    @OneToMany(() => Blog, (blog) => blog.user)
    blogs: Blog[]
}
