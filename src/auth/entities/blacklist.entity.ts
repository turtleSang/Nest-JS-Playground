import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BlackList {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 500 })
    @Index({ unique: true })
    token: string; // Token bị thu hồi

    @Column({ type: 'datetime', nullable: false })
    expireAt: Date; // Thời gian hết hạn của token

    @CreateDateColumn()
    createAt: Date; // Thời gian thêm vào blacklist
}