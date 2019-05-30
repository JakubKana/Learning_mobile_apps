import React from "react";
import { Component } from "react";
import { ScrollView, Linking } from "react-native";
import HTMLRender from "react-native-render-html";

const htmlContent = `<div>
<h2>Heading 2</h2>
 <p>U každého pojištěnce musí být po celé období pojištění znám plátce pojistného. Plátcem pojistného je zaměstnavatel, stát nebo pojištěnec sám (jako osoba samostatně výdělečně činná nebo osoba bez zdanitelných příjmů).</p>
 <p>U vás eviduje pojišťovna období, kdy plátce pojistného není znám. Pokud jste byl/a v tomto období <a href="https://www.vzp.cz/platci/informace/zamestnavatel">zaměstnán/a</a> nebo jste vykonával/a samostatnou výdělečnou činnost nebo byl za vás <a href="https://www.vzp.cz/platci/informace/stat">plátcem pojistného stát</a>, doložte prosím tuto skutečnost dle níže uvedeného:</p>
 <ul>
 <li>zaměstnanec – výplatní lístek, případně pracovní smlouva nebo zápočtový list</li>
 <li>osoba samostatně výdělečně činná – živnostenský list</li>
 <li>student do 26 let – doklad o studiu</li>
 <li>důchodce – rozhodnutí o přiznání důchodu</li>
 <li>příjemce rodičovského příspěvku – rozhodnutí o přiznání rodičovského příspěvku</li>
 <li>osoba pobírající peněžitou pomoc v mateřství – doklad o přiznání dávky</li>
 <li>uchazeč o zaměstnání – doklad o evidenci na úřadu práce</li>
 <li>osoba pobírající dávky nemocenského pojištění – doklad z OSSZ/PSSZ nebo zápočtový list zaměstnavatele s uvedením doby pracovní neschopnosti</li>
 <li>osoba pobírající dávky v hmotné nouzi – doklad o přiznání dávky</li>
 <li>osoba, která je závislá na péči jiné osoby ve II.-IV. stupni, osoby pečující o tuto osobu, nebo osoba pečující o osobu mladší 10. let, která je závislá na péči jiné osoby – potvrzení o přiznání dávky popřípadě rozhodnutí příslušného úřadu</li>
 <li>osoba pečující o 1 dítě do 7 let věku nebo o 2 a více dětí do 15 let – čestné prohlášení</li>
 <li>osoba, která je invalidní ve III. stupni nebo která dosáhla věku potřebného pro nárok na starobní důchod, avšak nesplňuje podmínky pro přiznání invalidního důchodu pro invaliditu III stupně nebo starobního důchodu , nemá příjmy ze zaměstnání, výdělečné činnosti a důchod z ciziny nepřesahuje minimální mzdu – rozhodnutí o nesplnění podmínek pro přiznání důchodu</li>
 <li>osoba vykonávající dlouhodobou dobrovolnickou službu – smlouva s vysílající organizací, které byla udělena akreditace MVČR, s uvedením rozsahu vykonávané služby (min. 20 hod. týdně)</li>
 </ul>
 <p>Po předložení potřebných dokladů může být uvedené období opraveno. Pokud doklady nepředložíte, musíme vás po uvedené období považovat za <a href="https://www.vzp.cz/platci/informace/obzp">osobu bez zdanitelných příjmů</a>, s povinností <a href="https://www.vzp.cz/platci/informace/povinnosti-platcu-metodika/obzp/obzp-platba-pojistneho">platit si zdravotní pojištění</a>.</p>
 </div>`;

const htmLStyles = {
  // h2: {
  //     ...titleText,
  // },
  // h3: {
  //     ...titleText,
  // },

  h2: {
    fontSize: 10
  },
  p: {
    color: "black",
    fontSize: 17,
    lineHeight: 22
  },
  li: {},
  strong: {
    color: "black",
    fontSize: 17,
    lineHeight: 22
  },
  a: {
    color: "red"
  }
};

const styling = {
  baseFontStyle: {
    fontSize: 17,
    lineHeight: 22
  }
};

export class HTMLView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ScrollView>
        <HTMLRender
          html={htmlContent.replace(/\\"/g, "")}
          tagsStyles={htmLStyles}
          baseFontStyle={styling.baseFontStyle}
          onLinkPress={(_, href) => {
            Linking.openURL(href);
          }}
        />
      </ScrollView>
    );
  }
}
