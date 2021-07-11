export class User {
    constructor(
      private id: string,
      private name?: string,
      private nickname?: string,
      private email?: string,
      private password?: string
    ) {}
  
    public getId(): string {
      return this.id;
    }
    public getName(): string {
      return this.name || "";
    }
    public getNickname(): string {
      return this.nickname|| "";
    }
    public getEmail(): string {
      return this.email || "";
    }
    public getPassword(): string {
      return this.password || "";
    }
    public setId(id: string): void {
      this.id = id;
    }
    public setName(name: string): void {
      this.name = name;
    }
    public setNickname(nickname: string): void {
      this.nickname = nickname;
    }
    public setEmail(email: string): void {
      this.email = email;
    }
    public setPassword(password: string): void {
      this.password = password;
    }
  }
  