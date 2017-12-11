/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Modal from './Modal';

export default class ModalView extends React.Component {
  state = { isOpen: true };
  onClose = () => this.setState({ isOpen: false });
  onOpen = () => this.setState({ isOpen: true });

  render() {
    return (
      <div>
        <Modal
          header="Pseudo Modal"
          isOpen={this.state.isOpen}
          onClose={this.onClose}
          onOpen={this.onOpen}
          close={this.onClose}
        >
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <p>This react component is appended to the document body.</p>
        </Modal>
        <p>
          Hvis en minister skal vurderes på sin evne til at lytte til kritikken
          – lægge sig fladt ned og rette ind efter den – er der topkarakterer
          til den konservative erhvervsminister Brian Mikkelsen. Han har stort
          set fjernet alle de skarpe kanter i de nye og omstridte låneregler,
          der skulle begrænse de mest risikable flexlån i de dele af landet,
          hvor boligpriserne er gået amok. Vrede borgmestre og kritiske banker
          Med et såkaldt styresignal har Nationalbanken og det Systemiske
          Risikoråd tydeligt anbefalet regeringen at stramme kraftigt op på
          långivningen for at afværge truende boligbobler i København og
          Aarhus-området. Men styresignalet blev mødt med så massive protester
          fra realkreditinstitutter, banker og boligeksperter – og ikke mindst
          fra de berørte kommuner – at Brian Mikkelsen i sidste måned måtte hive
          hårdt i nødbremsen og trække styresignalet tilbage.
        </p>
        <p>
          Siden da har Mikkelsens embedsmænd i Finanstilsynet arbejdet på
          højtryk for at udvikle et nyt og mere spiseligt sæt låneregler, der
          også kan genskabe roen blandt borgmestre og kommunalpolitikere, forud
          for kommunalvalget i næste måned. Nu er Brian Mikkelsen klar til at
          præsentere sin light-udgave af de nye låneregler. Nye låneregler
          gælder over hele landet Som tidligere omtalt i Politiken afliver
          ministeren planen om at lade de nye og skærpede låneregler omfatte en
          række navngive kommuner i hovedstadsområdet og Aarhus. De nye
          låneregler bliver i stedet rettet mod de ejerboliger, huse og
          lejligheder, der har de dyreste kvadratmeterpriser, eller er steget
          mest i værdi, uanset om de så har adresse i Herning, Høje Tåstrup
          eller Hørsholm. Her holder ministeren fast i en strammere
          kreditvurdering af de boligejere, der har stor gæld og farlige flexlån
          uden renter og afdrag. Som udgangspunkt er der lukket for de fleksible
          lånetyper, hvis en boligejer bærer rundt på en gæld, der er fire gange
          større end husstandens samlede indkomst. Minister freder de gamle og
          de unge Men som en konsekvens af kritikken vil regeringen og
          Finanstilsynet blandt andet frede de pensionister og
          førstegangskøbere, der i sagens natur ikke har de store indkomster og
          dermed risikerer at slå sig urimeligt hårdt på en stram
          kreditvurdering.
        </p>
        <p>
          Det betyder, at de pensionister, der har en dokumenteret formue og en
          utvivlsom betalingsevne, slipper for den skrappe kreditvurdering. Det
          samme gør førstegangskøbere, der bruger deres flexlån fornuftigt,
          eksempelvis på at afdrage andre og dyrere lån og gældsposter. Nye
          regler kan få social slagside Og som en ekstra gave til boligejerne
          kommer den skrappe kreditvurdering heller ikke til at gælde de
          boligejere, der har en dokumenteret lav belåning under 60 procent af
          boligens værdi. »Med de nye retningslinjer ønsker vi at skabe et mere
          robust og balanceret boligmarked. Det gør vi ved at begrænse
          udbredelsen af de mest risikobetonede lån for husstande med høj gæld.
          Samtidigt sikrer vi, med de nye retningslinjer, at man fortsat kan
          optage lån til køb af bolig, selv om man har høj gæld. Det skal bare
          ske med større forsigtighed i forhold til valg af lånetype«, siger
          Brian Mikkelsen i en kommentar til de nye regler. Det nye udspil
          bliver mødt med roser fra BRF Kredits cheføkonom Mikkel Høegh: FORBRUG
          & LIV DIREKTE I DIN INDBAKKE Få nyheder om sundhed, privatøkonomi og
          forbrug – og deres betydning for dig. Sendes hver dag klokken 12
          henriklouv@gmail.com Tilmeld Ja tak. Politiken må lejlighedsvis gerne
          kontakte mig med nyheder, tilbud om gratis e-bøger og andre gode
          tilbud, på mail, sms og telefon. Jeg kan, til en hver tid, framelde
          mig.
        </p>
        <p>
          »Det her er mere balanceret- man forskelsbehandler ikke i forhold til
          kommuner, der er taget højde for boligejernes formueforhold - og det
          ser ikke ud til at vi skal begrænse antallet af flexlån til et bestemt
          niveau«. Gode lån til de unge boligejere Også Nordea er positiv:
          Videnskab | Lidenskab: Kom med til en aften om TotalNatur, hvor du
          blandt andre kan møde professor Jens-Christian Svenning og kunstner
          Tue Greenfort. Læs mere »Det her kommer til at gælde hele landet, og
          det er også en del af udspillet, at vi fortsat kan tilbyde kunderne
          fastforrentede lån med og uden afdrag, og du kan fortsat få F5-lån,
          det er især vigtigt for de unge boligejere, fordi det giver dem en
          mulighed for at få et billigt realkreditlån og så bruge besparelsen på
          at afdrage den dyre del af lånet«, siger Peter Smith, direktør i
          Nordea Kredit. Men selv om erhvervsministeren har bøjet sig for
          kritikken, er der stadig flere løse ender i udspillet. For hvad gør de
          boligejere, der pludselig bliver ramt af ledighed, sygdom eller ryger
          ind i skilsmisse og dermed mister så stor en del af indtægten, at de
          ikke kan betale boliglånet? Med de nye låneregler er det ikke længere
          muligt at klare krisen ved at lægge lånet om til en lavere fleksibel
          ydelse. Og dermed kan de nye låneregler få en voldsom social slagside,
          advarer flere eksperter.
        </p>
        <h1>
          Anmeldelse: ’Stranger Things’ er stadig god hygge - og uhyggeligt
          uoriginal
        </h1>
        <p>
          Der er ikke noget så hyggeligt som uhygge. Når man sidder der om
          lejrbålet og føler kuldegysninger i vennernes eller families varme
          nærvær, mens fortællingerne går på rundgang. Gyserhistorier er moderne
          folklore, der ved at følge genrens koder forstærker følelsen af
          fællesskab og forankrer øjeblikket i en større fortælling. Den slags
          horror er ikke designet til at vække ubehag og vende verden på
          hovedet. Den er tryg, bekræftende og først og fremmest underholdende,
          og som sådan er den udgangspunkt for halloween og al den industri, der
          følger med højtiden, som er over os i disse dage.
        </p>
        <p>
          I morgen er der en uge, til gyserhyggen sænker sig over hele verden,
          når halloween-showet kulminerer 31. oktober. Og det er ikke
          tilfældigt, at det er nu, Netflix har premiere på anden sæson af
          serien ’Stranger Things’, der næst efter sommerens ’Twin Peaks - The
          Return’ er årets mest ventede tilbagekomst. Intet er tilfældigt hos
          Netflix, som helt konsekvent adlyder de algoritmer, der afslører
          seernes streaming-vaner ned i mindste detalje. De ved, om du
          foretrækker drama, gys eller teenagefilm, og så tilpasser de
          markedsføringen af ’Stranger Things’ med dine præferencer ved at
          placere netop den karakter fra serien, som du nok identificerer dig
          med, i de billeder, der reklamerer for anden sæson i din indboks’
          nyhedsbreve. Hvis du klikker dig ind på serien på Netflix, er der
          sandsynligvis en forskel, om du gør det hjemme hos din far eller hos
          din niece.
        </p>
        <p>
          Hos din far er det Winona Ryder som bekymret mor, der dukker op som
          baggrundsbillede, mens din niece får præsenteret showet med et billede
          af den 13-årige Eleven. Netflix bruger deres algoritmer som rettesnor
          ’Stranger Things’ blev kaldt et overraskende monsterhit, da det sidste
          år blev serien, alle talte om. Med sin skamløse 80’er-nostalgi fangede
          den både forældre, der husker ’E.T.’ og Sonys walkmen som ren
          barndomslykke, den tiltrak de unge, der i forvejen er forelskede i det
          syntetiske årtis popmusik og modetøj, og den talte direkte til de
          yngste teenagere med sit enkle, fortegnede drama mellem de 12-årige
          hovedpersoner. Men et overraskende hit var det langtfra. For Netflix
          bruger også deres algoritmer som rettesnor, når de skaber nye serier.
          I ’House of Cards’ var castingen af skuespillere, plot og stil
          designet til at møde seernes præferencer, og med ’Stranger Things’
          ramte de ikke bare seervaner, men en hel nostalgisk tidsånd med et
          pletskud. Brødrene Matt og Ross Duffer lægger ikke skjul på, at de gik
          målrettet efter at genskabe fornemmelsen af 80’erne ved at kalkere
          stilen fra Steven Spielberg, John Carpenter, Stephen King og utallige
          andre af årtiets mestre.{' '}
        </p>
        hey?
        <p>
          Og det ned i mindste detalje, så karakterer, plot og de fleste scener
          er direkte kopier fra film som ’E.T’, ’Goonierne’, ’Nærkontakt af
          tredje grad’, ’Poltergeist’, ’Stand By Me’, ’Firestarter’ og mange
          flere. Selv introsekvensens røde bogstaver ligner coveret fra en slidt
          Stephen King-paperback. »Vi ville skabe en fornemmelse af, at du
          sidder og læser en stor fed Stephen King-roman«, sagde Ross Duffer i
          et interview med Empire. Så der måtte både moderne og forældet
          teknologi til, for at de røde bogstaver kunne se slidte og primitive
          ud på den helt rigtige måde. Titelsekvensens elektroniske score er
          heller ikke en original idé, men et rip off af John Carpenters
          ikoniske synth-melodier fra hans 80’er-filmografi. Den ene
          80'er-reference afløser den anden Fortællingen om de tre store børn,
          der leder efter deres forsvundne kammerat Will og finder ud af, at han
          er forsvundet ind i parallelverdenen Upside Down, hvor et monster
          regerer, fortsætter i anden sæson et år efter, at Will kom
          traumatiseret tilbage til gruppen. Børnene er blevet teenagere og
          forsøger at finde tilbage til en normal verden med skole og
          arkadespil, og det er en ny verden med hormoner i kredsløbet og
          usikker kurs mod fremtiden. Men snart begynder den nære fortid at
          trænge sig på igen, og med den læner serien sig igen tilbage i den
          fjerne fortid og 80’er-fornemmelser. Læs også: Derfor er Netflix så
          god til at få dig til at se med Allerede første scene i første afsnit
          er en reference. En maskeklædt ungdomsbande begår et røveri og flygter
          i en bil, hvor de tager maskerne af og raser ud som outlaws med
          punkfrisure, tatoveringer og vilde blik i øjnene. »Warriors come out
          and play«, tænker man og mindes filmen ’The Warriors’ fra 1979, som
          indledte en bølge af bøllefilm med hærgende street gangs som for
          eksempel John Carpenters ’Flugtaktion New York’. Politibilerne jagter
          dem som brølende konservesdåser og blå blink, hvis lyskegler danser
          rundt i natten, sådan som Spielberg skabte diagonale projektørlinjer i
          sine frames. Så kommer titelsekvensen, første kapitel hedder ’Madmax’,
          inden vi ankommer til drengeværelset, hvor nuttebollen Dustin taler
          oprevet i walkie-talkie med sine venner Mike, Will og Lucas om, hvor
          mange mønter de har samlet sammen. De skal nemlig ned i arkaden og
          spille videospil. I første sæson spillede de brætspil på værelset, nu
          er det arkadespil i hallen, hvor der er social kontakt og piger, der
          kigger på. Op på ’E.T.’-cyklerne og fuld fart ud ad villavejen, hvor
          forældrene står uforstående tilbage. Og da de ankommer til den
          neonoplyste arkade er det til tonerne af Devos ’Whip It Good’, som er
          kendt fra ungdomsfilmen ’Last American Virgin’ fra 1982, hvor
          teenagere bøvler med sex, stoffer og kærlighedsintriger. Så langt er
          drengene her ikke endnu. De ankommer på cykler, ikke i bil, og
          befinder sig præcis i tilstanden mellem hårløs tissemand og ’Whip It
          Good’. FILM DIREKTE I DIN INDBAKKE Få ugens filmanmeldelser. Sendes
          torsdag kl. 12. henriklouv@gmail.com Tilmeld Ja tak. Politiken må
          lejlighedsvis gerne kontakte mig med nyheder, tilbud om gratis e-bøger
          og andre gode tilbud, på mail, sms og telefon. Jeg kan, til en hver
          tid, framelde mig. Læs mere her. MEST LÆSTE Congolesisk familie: Vi
          har ikke plukket svampe, ellers havde vi sagt det Fysioterapeut: For
          mange kvinder stræber efter at få en flad mave, selv om de ikke engang
          kan holde på vandet Feministisk debattør: Hashtagget 'NotAllMen' er
          ikke bare forkert, men også direkte skadeligt Den rette karakter i
          fokus Sådan kan man lege detektiv og finde reference efter reference,
          ligesom fans gjorde det i første sæson, hvor der gik konkurrence i at
          finde flest og dele dem på nettet. I løbet af anden sæsons fire første
          afsnit stoppede jeg hurtigt med at tælle. 1983 er kun blevet til 1984,
          så det er samme nostalgi, der næres af kulhydrater gennem kulisser,
          rekvisitter, musik, karakterer og plot. Men det er blevet mere
          oppustet i format. Neonfarverne er de samme, men baggrunden er blevet
          mørkere. Monsteret fra Upside Down er mere mægtigt og viser sig at
          have langt større planer for kloden end det bæst, vi mødte i første
          sæson, og som viser sig kun at være en soldat for dronningen. Læs
          også: 'Stranger Things' er en hyldest til fortidens herlige gys og gru
          Det er Will, som efter sin tur i Upside Down lider af anfald og kan se
          dronningen, der som et blækspruttelignende væsen spreder sine arme
          over himmelhvælvingen og meddeler ham, at den er kommet for at dræbe.
          Ikke ham, men »alle andre«, som han fortæller den psykiater, han
          konsulterer sammen med sin mor. Barnets udsyn er forstørret fra
          drengeværelset til verden udenfor, hans bekymringer får et større
          perspektiv, efterhånden som han vokser ud af drengekroppen, og på
          markerne omkring lillebyen Hawkins rådner landmændenes græskar
          indefra. Will fylder mere i anden sæson. Og det er godt. Noah Schnapp
          er den bedste skuespiller af børnene. Han spiller med en naturlighed,
          der synes at overskride karakterens grove 80’er-skabelon. Millie Bobby
          Brown har fået mest ros for sin præstation som pigen Eleven, der er
          flygtet fra laboratoriet, hvor hun blev tvangsopgraderet til at
          besidde telekinetiske evner. Hende blev jeg aldrig berørt af i første
          sæson og bliver det heller ikke i de nye afsnit. Hendes
          børneromantiske forhold til Mike virker postuleret, og selv om hun
          spiller med stor patos, når hun slipper vreden og gråden løs, føles
          det som en skal. Det er problemet med ’Stranger Things’. Trods al dens
          hyggelige horror er plottet karakterbåret, men Duffer-brødrene stikker
          ikke dybt nok ned i de personlige historier, til at man rigtigt får
          grund til at bekymre sig. 'Stranger Things' vækker en nostalgisk rus
          Undtagelsen i første sæson var Barb, den trofaste veninde til Nancy.
          Mens Nancy er slank, smuk og scorer skolens populære hunk, er Barb
          indadvendt, buttet, rødhåret, stort bebrillet og så usexet klædt som
          en husmor. Barb blev en kultfigur blandt fans, der lavede
          onlinekampagner for at få hende tilbage i serien, selv om hun blev
          dræbt af monsteret i Upside Down. Hun var et billede på den usikre
          person, de fleste genkendte fra deres skoleår, hvor de gjorde alt for
          at være en Nancy. Barb var det menneskeligste i ’Stranger Things’, men
          trods massive opfordringer vil Netflix og Duffer-brødrene trods alt
          ikke tilpasse serien til seernes præferencer på det punkt. Barb er og
          bliver død. Så vi er efterladt med de glatte typer. En nytilflyttet
          pige skal udfylde Barbs plads. Hun er rødhåret og outsider, men
          alligevel så cool på skateboard og så god til videospil, at drengene
          tager hende til sig. Mike er dog stadig forelsket i Eleven, så der er
          lagt op til et trekantsdrama for trettenårige, men efter fire afsnit
          oplever jeg ikke den uro, som Barbs skæbne vakte i første sæson. LÆS
          MERE Anmeldelse: ’Stranger Things’ er stadig god hygge - og uhyggeligt
          uoriginal 2 timer siden 'Lady Macbeth' er en velfungerende
          filmatisering trods de helt igennem kyniske mænd 3 timer siden Nej,
          Lisette. Brombær hører ikke hjemme på en pizza 19 timer siden Nostalgi
          og ikke så meget andet ’Stranger Things’ vækker umiddelbart en
          nostalgisk rus. Men den fiser hurtigt ud. Det føles som et besøg hos
          en ven, der lige har været i kælderen efter støvede ting fra fortiden.
          Videnskab | Lidenskab: Kom med til en aften om TotalNatur, hvor du
          blandt andre kan møde professor Jens-Christian Svenning og kunstner
          Tue Greenfort. Læs mere Først viser han mig et Anders And-blad, hvor
          bagsiden er en reklame for Faxe Kondi med Jesper Olsen i hvid
          polotrøje. Wow, hvor vildt! Den kan jeg godt huske. Så viser han mig
          en plastikfigur som er maskotten fra VM i Mexico 1986. Gud, ja! Den
          havde jeg også. Så har han også gemt en Spark-sodavand med den
          mærkelige kapsel, og jeg kan øjeblikkeligt smage den i hukommelsen.
          Men min ven er ikke en god historiefortæller, så efter fem, ti og tyve
          souvenirs fra vores barndom begynder effekten at tage af. Jesper Olsen
          åbnede porten til 80’erne, men det viser sig, at der ikke er så meget
          at hente derinde. ’Stranger Things’ er pastiche, som er effektivt sat
          i scene til en tid, hvor nostalgien er en stærk valuta, men der er
          stadig ikke meget mere at komme efter.
        </p>
        <button onClick={() => this.setState({ isOpen: true })}>
          Toggle ({this.state.isOpen.toString()})
        </button>
      </div>
    );
  }
}
