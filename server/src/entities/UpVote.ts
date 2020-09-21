import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";
import { ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class UpVote extends BaseEntity {
  @Column({ type: "int" })
  value: number;

  @PrimaryColumn()
  userId: number;

  // @ManyToOne(() => User, (user) => user.upvotes)
  user: User;

  @PrimaryColumn()
  postId: number;

  // @ManyToOne(() => Post, (post) => post.upvotes,onDelete: "CASCADE")
}
