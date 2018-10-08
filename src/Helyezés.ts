/** Egy helyezést leíró osztály */
export default class Helyezés {
  public Hely: number;
  public SportolókSzáma: number;
  public Sportág: string;
  public Versenyszám: string;

  /**
   * Az osztály konstruktora
   * @constructor
   * @param {string} sor - A forrás file egy sora
   */
  public constructor(sor: string) {
    let m: string[] = sor.split(" ");
    if (m.length !== 4) throw new Error("Hibás forrás!");
    this.Hely = parseInt(m[0]);
    if (Number.isNaN(this.Hely)) throw new Error("Hibás forrás!");
    this.SportolókSzáma = parseInt(m[1]);
    this.Sportág = m[2];
    if (this.Sportág === "") throw new Error("Hibás forrás!");
    this.Versenyszám = m[3];
    if (this.Versenyszám === "") throw new Error("Hibás forrás!");
  }
}
