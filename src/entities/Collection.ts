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
  