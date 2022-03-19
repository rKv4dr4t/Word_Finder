import "../css/main.css";
import xss from 'xss';

// sanitize against xss
xss(document.getElementById('a-firstLine__textarea').innerText);
xss(document.getElementById('a-inputFind').innerText);
xss(document.getElementById('a-inputReplace').innerText);


// show or hide submit copy button, hr line and text helper of finder form
document.getElementById('a-submit_copy').style.display = 'none';
document.getElementById('a-numberUnderline').style.display = 'none';

// change height when replace toggle is on
export function replaceHeight() {
    document.getElementById("m-options__replace").classList.toggle("m-heightReplace-transition");
    document.getElementById("o-options").classList.toggle("m-options-height");
    document.getElementById("m-replace__secondLine").classList.toggle("a-inputReplace-transition");
}
window.replaceHeight = replaceHeight;


//////////////////// focus child and effect on parent (textarea) ////////////////////

let textAreaChild = document.getElementById('a-firstLine__textarea');
let textAreaParent = document.getElementById('a-parentTextArea');
let labelAreaParent = document.getElementById('a-putSomeTextHere');

textAreaChild.addEventListener("focusin", function (event) {
    textAreaParent.style.border = 'solid var(--secondary-color) var(--border)';
    labelAreaParent.style.color = 'var(--secondary-color)';
});
textAreaChild.addEventListener("focusout", function (event) {
    textAreaParent.style.border = 'solid var(--side-color) var(--border)';
    labelAreaParent.style.color = 'var(--side-color)';
});


//////////////////// checkboxes ////////////////////

// key is case sensitive?
// 'g' stand for 'all matches', 'i' for 'case sensitive'
let caseSense = 'gi';
export function caseSensitive() {
    var checkBox = document.getElementById("a-switch1");
    if (checkBox.checked == true) {
        return caseSense = 'g';
    } else {
        return caseSense = 'gi';
    }
}
window.caseSensitive = caseSensitive;

// match whole word using boundaries
let wholeW = '';
export function wholeWord() {
    var checkBoxx = document.getElementById("a-switch2");
    if (checkBoxx.checked == true) {
        return wholeW = '\\b';
    } else {
        return wholeW = '';
    }
}
window.wholeWord = wholeWord;


//////////////////// matching and underline ////////////////////

// show result of matching
// document.getElementById('a-inputFind').oninput = 


export function matchingResult() {

    // get the values
    let toFind = document.getElementById('a-inputFind').value;
    let totalString = document.getElementById('a-firstLine__textarea').value;

    // escape character so will not apply their effect on RegExp
    function escapeRegExp(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }

    // regular expression
    let regFind = new RegExp(`(${wholeW}${escapeRegExp(toFind)}${wholeW})`, caseSense);
    let resultRegFind = totalString.match(regFind);

    // let resultTotalString = document.getElementById('a-secondLine__results');


    // print result
    if (toFind == '') {
        document.getElementById('a-numberUnderline').style.display = 'none';
        resultTotalString.innerText = 'no word search yet';
    } else {
        if (resultRegFind) {
            resultTotalString.innerText = 'elements found: ';
            document.getElementById('a-numberUnderline').style.display = 'inline';
            document.getElementById('a-numberUnderline').innerText = resultRegFind.length;
            // resultTotalString.innerHTML = `elements found: <p id="a-numberUnderline">${resultRegFind.length}</p>`;
        }
        else {
            resultTotalString.innerText = 'elements found: 0';
            document.getElementById('a-numberUnderline').style.display = 'none';
        }
    }


    // print underlines
    let regRepl = '';
    if (resultRegFind) {

        // replace method is not enough. Case insensitive created issues
        // so the elements matched mustn't be replaced, therefore it need a capture group
        // using '(...)' in RegExp declaration, and using '$1' to call the group


        regRepl = totalString.replace(regFind, `<p class="regUnderline">$1</p>`);
    } else {
        regRepl = totalString.replace(regFind, '');
    }
    resultUnderlines.innerHTML = regRepl;

    // hide button to copy (is visible just when is replaced something)
    document.getElementById('a-submit_copy').style.display = 'none';
}
window.matchingResult = matchingResult;

// oninput = addEventListener. change automatically value also when match acse and match entire world toggle are clicked
document.getElementById("a-inputFind").addEventListener("input", matchingResult);
document.getElementById("a-switch1").addEventListener("change", matchingResult);
document.getElementById("a-switch2").addEventListener("change", matchingResult);


//////////////////// replacing ////////////////////

// replace word
export function replaceWord() {
    // get the values
    let toFind = document.getElementById('a-inputFind').value;
    let totalString = document.getElementById('a-firstLine__textarea').value;

    // regular expression
    let regFind = new RegExp(`(${wholeW}${toFind}${wholeW})`, caseSense);
    let resultReplace = totalString.replace(regFind, document.getElementById('a-inputReplace').value);
    resultUnderlines.innerText = resultReplace;

    // show button to copy
    document.getElementById('a-submit_copy').style.display = 'block';
}
window.replaceWord = replaceWord;

// replace word pressing enter in the form
document.getElementById('a-inputReplace').addEventListener("keyup", function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById("a-submit_replace").click();
    }
});


// copy button
// document.getElementById('a-submit_copy').addEventListener('click', clipboardCopy);
export function clipboardCopy() {
    let text = document.querySelector("#resultUnderlines").innerText;
    document.getElementById("a-submit_copy").value = 'COPIED!'
    document.getElementById("a-submit_copy").style.backgroundPosition = 'var(--backgroundPosition-a-submit_copy)';
    document.getElementById("a-submit_copy").style.paddingLeft = 'var(--paddingLeft-a-submit_copy)';
    navigator.clipboard.writeText(text);
    // await navigator.clipboard.writeText(text);
}
window.clipboardCopy = clipboardCopy;
document.getElementById('a-submit_copy').addEventListener('click', clipboardCopy);
// if button copy is 'blurred' so come to the initial state
document.getElementById('a-submit_copy').addEventListener('blur', function () {
    this.value = "COPY";
    document.getElementById("a-submit_copy").style.backgroundPosition = 'var(--backgroundPosition-a-submit_copy-default)'; /*3.5rem */
    document.getElementById("a-submit_copy").style.paddingLeft = 'var(--paddingLeft-a-submit_copy-default)'; /*2.5rem */
});


//////////////////// lorem ipsum ////////////////////
let counterLI = 0;
// generate random lorem ipsum in textarea
const textLoremIpsum = [
    `I'm baby intelligentsia hot chicken android, letterpress food truck lomo roof party celiac +1 photo booth yr thundercats affogato. Poke pork belly PBR&B, vape fashion axe hashtag chillwave brooklyn cloud bread marfa cold-pressed adaptogen. Ennui tilde fam, chicharrones irony you probably haven't heard of them raclette poutine. Intelligentsia seitan chicharrones, enamel pin brunch vaporware art party kitsch retro. Vegan sustainable tumeric cronut. Pug aesthetic PBR&B glossier selvage, art party salvia wayfarers. Etsy taiyaki typewriter chicharrones, taxidermy cold-pressed pabst vinyl cronut pok pok 8-bit fam.`,
    `Activated charcoal direct trade palo santo vape everyday carry pork belly mustache kitsch gochujang. Vexillologist shoreditch deep v, keytar ethical seitan sartorial kale chips irony tumeric microdosing brunch. Keffiyeh master cleanse next level, glossier lumbersexual shaman af edison bulb distillery knausgaard vape small batch portland. Cred truffaut vape deep v +1, pub hot chicken raw denim helvetica umami offal.`,
    `Dreamcatcher sartorial asymmetrical wolf godard, coloring book squid freegan affogato lumber franzen. Drinking vinegar vape chillwave pinterest tofu pug hella sartorial neutra cray tumeric. Poke cloud bread XOXO salvia. Glossier jean shorts craft beer pub, squid pitchfork humblebrag listicle taiyaki messenger bag retro thundercats subway tile raw denim. Hoodie asymmetrical food truck listicle pour-over.`,
    `Pop-up tote bag twee squid asymmetrical lyft roof party ugh try-hard glossier pabst bicycle rights jean shorts single-origin coffee. Android narwhal, tattooed mumblecore you probably haven't heard of them XOXO authentic art party bicycle rights. Bespoke bitters master cleanse austin authentic lumber mixtape man bun art party tilde swag. Tacos bitters chicharrones thundercats selfies chartreuse chia. Put a bird on it taxidermy cornhole VHS, tousled ennui fam hexagon craft beer marfa DIY pinterest.`,
    `Air plant deep v polaroid church-key. Farm-to-table ramps put a bird on it pickled aesthetic belly beard tbh street art pabst. Pop-up cliche before they sold out hoodie heirloom flannel schlitz organic. Forage cardigan before they sold out umami echo park subway tile art party squid shoreditch photo booth.`,
    `Yr offal cornhole neutra. Cronut kale chips hoodie, mustache tilde tacos palo santo fashion axe whatever pop-up post-ironic pitchfork pok pok ethical. Literally freegan post-ironic wolf listicle synth gochujang tousled palo santo 3 wolf moon health goth next level. Asymmetrical you probably haven't heard of them lomo post-ironic, pitchfork narwhal retro chia tofu schlitz. Kitsch keytar normcore listicle flexitarian fashion axe chartreuse jianbing yr vice flannel cred.`,
    `Jianbing live-edge bicycle rights messenger bag, street art offal squid gastropub food truck kale chips locavore. Mustache humblebrag banjo, shaman offal photo booth coloring book mumblecore typewriter tbh you probably haven't heard of them. Disrupt glossier umami pop-up, schlitz listicle keytar ramps. Try-hard aesthetic lyft.`,
    `Try-hard woke irony selvage listicle, literally adaptogen tilde messenger bag deep v hexagon stumptown gastropub. YOLO yuccie godard copper mug, slow-carb put a bird on it williamsburg offal craft beer trust fund sustainable palo santo 8-bit. Venmo XOXO drinking vinegar kale chips cred semiotics, vinyl helvetica hoodie bespoke leggings pop-up. Polaroid lomo tofu vape. Chicharrones mumblecore taiyaki, direct trade prism vinyl cardigan subway tile flexitarian. Aesthetic food truck glossier coloring book. Biodiesel distillery schlitz skateboard ennui master cleanse pok pok normcore cardigan.`,
    `Cliche organic woke yr gluten-free, twee PBR&B everyday carry 8-bit roof party. Hexagon craft beer pinterest humblebrag raw denim pabst schlitz celiac. Quinoa hoodie man braid, iPhone flannel chia scenester pinterest kickstarter enamel pin health goth aesthetic art party cliche mustache. Irony cred street art locavore green juice.`,
    `Tilde twee af drinking vinegar trust fund. Ramps vaporware hell of kombucha 8-bit chambray YOLO wolf vinyl pop-up cornhole activated charcoal mixtape. Mixtape marfa before they sold out XOXO poutine craft beer scenester cronut drinking vinegar knausgaard you probably haven't heard of them hella. Literally selvage mumblecore activated charcoal echo park vegan deep v fingerstache irony kogi microdosing trust fund. Schlitz cloud bread activated charcoal, master cleanse kitsch shoreditch umami bicycle rights la croix post-ironic biodiesel edison bulb. 8-bit disrupt banjo selvage. Flannel selfies organic put a bird on it keytar, lo-fi health goth umami fam four loko kombucha adaptogen hammock austin tilde.`
]

export function generateLoremIpsum() {
    let randomIpsum = textLoremIpsum[Math.floor(Math.random() * textLoremIpsum.length)];
    document.getElementById('a-firstLine__textarea').value = randomIpsum;
    counterLI++;
}
window.generateLoremIpsum = generateLoremIpsum;