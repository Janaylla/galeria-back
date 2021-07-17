export class Collection {
    constructor(
      private id: string,
      private name: string,
      private author_id: string
    ) {}
    
    public getId(): string {
      return this.id;
    }
    public getName(): string {
      return this.name;
    }
    public getAuthorId(): string {
      return this.author_id;
    }
    public setId(id: string): void {
      this.id = id;
    }
    public setName(name: string): void {
      this.name = name;
    }
    public setAuthorId(id: string): void {
      this.author_id = id;
    }
  }
  
  
export class CollectionMoreDetails extends Collection {
  private image_file: string
  private number_of_images: string
    constructor(
      id: string,
      name: string,
      author_id: string,
      image_file: string,
      number_of_images: string
    ) {
      super(id, name, author_id);
      this.image_file = image_file;
      this.number_of_images = number_of_images
    }
}