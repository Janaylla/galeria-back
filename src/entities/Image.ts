import { Tag } from './Tag'
import { Collection } from './Collection'
import { User } from './User'
export class Image {
  constructor(
    private id: string,
    private subtitle: string,
    private file: string,
    private date: string | Date,
    private tags?: Tag[],
    private collections?: Collection[],
    private author?: User,
  ) { }

  public getCollections(): Collection[] | false {
    return this.collections ? this.collections : false;
  }
  public setCollections(value: Collection[]) {
    this.collections = value;
  }
  public getTags(): Tag[] | false {
    return this.tags ? this.tags : false
  }
  public setTags(value: Tag[]) {
    this.tags = value;
  }
  public getFile(): string {
    return this.file;
  }
  public setFile(value: string) {
    this.file = value;
  }
  public getDate(): string | Date {
    return this.date;
  }
  public setDate(value: string | Date) {
    this.date = value;
  }
  public getAuthor(): User | false {
    return this.author ? this.author : false;
  }
  public setAuthor(value: User) {
    this.author = value;
  }
  public getSubtitle(): string {
    return this.subtitle;
  }
  public setSubtitle(value: string) {
    this.subtitle = value;
  }
  public getId(): string {
    return this.id;
  }
  public setId(value: string) {
    this.id = value;
  }
}
