export class Tag {
    constructor(
      private id: string,
      private name: string
    ) {}
    
    public getId(): string {
      return this.id;
    }
    public getName(): string {
      return this.name;
    }
    public setId(id: string): void {
      this.id = id;
    }
    public setName(name: string): void {
      this.name = name;
    }
  }
  