import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
    length: 500,
  })
  url: string;

  @Column({
    default: 1,
  })
  position: number;
}

export class CreateImageDTO {
  readonly url: string;
}
