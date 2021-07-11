
export class DataConvert {
  private date: Date
  constructor (date: Date){
    this.date = date
  }
  public getDateToMySql(): string {
    return  this.date.toISOString().slice(0, 19).replace('T', ' ')
  }
}
