import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import Comment from "./Comment"

@Entity('moment')
export default class Moment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { length: 100 })
  title: string

  @Column()
  description: string

  @Column()
  image: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.moment, { nullable: true, eager: true })
  comments: Comment[]
}
