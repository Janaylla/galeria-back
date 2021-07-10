export class User {
    constructor(
      private id: string,
      private subtitle: string,
      private author: string,
      private date: string,
      private file: string,
      private tags: string[],
      private collection: string
    ) {}

    public getCollection(): string {
      return this.collection;
    }
    public setCollection(value: string) {
      this.collection = value;
    }
    public getTags(): string[] {
      return this.tags;
    }
    public setTags(value: string[]) {
      this.tags = value;
    }
    public getFile(): string {
      return this.file;
    }
    public setFile(value: string) {
      this.file = value;
    }
    public getDate(): string {
      return this.date;
    }
    public setDate(value: string) {
      this.date = value;
    }
    public getAuthor(): string {
      return this.author;
    }
    public setAuthor(value: string) {
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
  