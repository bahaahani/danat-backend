import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Enrollment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    studentName: string;

    @Column()
    courseName: string;

    // Add more columns as needed

    // Add relationships with other entities if necessary

    // Add custom methods or decorators as needed
}