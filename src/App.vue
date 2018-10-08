<template>
  <div id="app">
    <p>
      Linkek: <a href="helsinki.txt" download>helsinki.txt   </a>
      <a href="helsinki_fel.pdf" target="_blank">Feladat   </a>
      <a href="helsinki_jav.pdf" target="_blank">Javítási  </a>
      <a href="https://github.com/tothdanieljedlike/HelsinkiErettsegiVueJS" target="_blank">Forrás </a>
      <a href="https://github.com/tothdanieljedlike/HelsinkiErettsegiVueJS" target="_blank">SDK</a>
    </p>
    <txt-olvaso v-on:load="forras = $event" title="Kérem töltse fel a forrás (helsinki.txt) állományt!" />
    <div id="megoldas" v-show="mutat">
      <p>2. feladat:<br>Az adatok beolvasása</p>
      <p>3. feladat:<br>Pontszerző helyezések száma {{PontszerzőHelyezésekSzáma}}.</p>
      <p>4. feladat:<br>Arany: {{ErmekSzáma[0]}}<br> Ezüst: {{ErmekSzáma[1]}}<br>
      Bronz: {{ErmekSzáma[2]}}<br> </p>
      <p>5. feladat:<br>Olimpiai pontok száma:{{olimpiaiPontok}}</p>     
      <p>6. feladat:<br>{{toru}}</p>        
      <p>7.feladat:<br> <span v-for="t in h" :key="t">{{fki}} </span> </p>
      <p>8.feladat:<br> <span v-for="t in nyolc" :key="t">{{nyolcadikfel}} </span> </p>
    </div>
    <!-- Nem a feladat része : -->
      <p v-show="mutat"><b>helsinki.txt fájl:</b></p>
      <span v-for="(t, index) in forras.split('\n')" :key="index">{{t.trim()}}<br></span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Helyezés from "./Helyezés";
import TxtOlvaso from "./components/TxtOlvaso.vue";
import { write } from "fs";
import { listeners } from "cluster";

// eslint-disable-next-line
@Component({ components: { TxtReader } })
export default class App extends Vue {
  public h: Helyezés[] = [];
  private forras: string = "";
  private mutat: boolean = false;

  @Watch("txtSorai", { immediate: true, deep: true })
  haForrásVáltozik(val: string, oldVal: string) {
    if (val != "") {
      this.Feldolgoz();
    }
  }

  private Feldolgoz(): void {
    try {
      this.forras.split("\n").forEach(i => {
        this.h.push(new Helyezés(i.trim()));
      });
      this.mutat = true;
    } catch (error) {
      this.mutat = false;
      this.h = [];
      this.forras = "";
      window.alert("Hibás forrás!");
    }
    console.log(this.h);
  }

  // 3. feladat
  private get PontszerzőHelyezésekSzáma(): number {
    return this.h.length;
  }

  // 4. feladat
  private get ErmekSzáma(): number[] {
    let ész: number[] = [0, 0, 0];
    this.h.forEach(i => {
      if (i.Hely < 4) ész[i.Hely - 1]++;
    });
    return ész;
  }

  private get olimpiaiPontok(): number {
    let op = 0;
    let pont: number[] = [7, 5, 4, 3, 2, 1];
    this.h.forEach(i => {
      op = op + pont[i.Hely - 1];
    });
    return op;
  }

  // 6. feladat
  private get toru(): string {
    let edbu = 0;
    let edbt = 0;
    let szoveg: string = "";
    this.h.forEach(i => {
      if (i.Hely < 4 && i.Sportág == "uszas") {
        edbu++;
      }
      if (i.Hely < 4 && i.Sportág == "torna") {
        edbt++;
      }
    });
    if (edbu > edbt) szoveg = "Úszás sportágban szereztek több érmet";
    else if (edbu < edbt) szoveg = "Torna sportágban szereztek több érmet";
    else if ((edbu = edbt)) szoveg = "Egyenlő volt az érmek száma";
    return szoveg;
  }
  //List<string> ki = new List<string>();
  //foreach (var i in h)
  // {
  //   string sportág = i.Sportág;
  //    if (sportág == "kajakkenu") sportág = "kajak-kenu";
  //    ki.Add($"{i.Hely} {i.SportolókSzáma} {pont[i.Hely - 1]} {sportág} {i.Versenyszám}");
  //   }
  //    File.WriteAllLines("helsinki2.txt",ki);
  // 7. feladat
  public fki(): void {
    this.h.forEach(i => {
      let sportag: string = i.Sportág;
      if ((sportag = "kajakkenu")) sportag = "kajak-kenu";
    });
  }

  //8. feladat
  //int maxi = 0;
  //    for (int i = 1; i < h.Count; i++)
  //   {
  //       if (h[i].SportolókSzáma > h[maxi].SportolókSzáma) maxi = i;
  //   }
  //   Console.WriteLine("8. feladat:");
  //    Console.WriteLine($"Helyezés: {h[maxi].Hely}");
  //    Console.WriteLine($"Sportág: {h[maxi].Sportág}");
  //     Console.WriteLine($"Versenyszám: {h[maxi].Versenyszám}");
  //     Console.WriteLine($"Sportolók száma: {h[maxi].SportolókSzáma}");
  public nyolc: [number, number, string, string] = [0, 0, "", ""];
  public nyolcadikfel(): void {
    let maxi: number = 0;
    for (let i = 1; i < this.h.length; i++) {
      if (this.h[i].SportolókSzáma > this.h[maxi].SportolókSzáma) maxi = i;
    }
    this.nyolc = [
      this.h[maxi].Hely,
      this.h[maxi].SportolókSzáma,
      this.h[maxi].Sportág,
      this.h[maxi].Versenyszám
    ];
  }
} // class bezáró, ne töröld!
</script>

<style>
#app {
  font-family: Courier;
}
#megoldás {
  background-color: lightgrey;
}
a {
  text-decoration: none;
}
</style>
