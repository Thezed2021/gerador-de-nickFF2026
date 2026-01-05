/* script.js - VERSÃO FINAL C/ TODOS OS EMOJIS (v2026) */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa funções globais
    initToastSystem();

    // Roteamento por existência de elemento
    if(document.getElementById('btn-generate-filtered')) initNickGenerator();
    if(document.getElementById('text-input')) initFontConverter();
    if(document.getElementById('rare-symbols-container')) initSymbolsPage();
});

// --- SISTEMA DE COPIAR E TOAST ---
function copyText(text) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => showToast("Copiado!"))
    .catch(() => {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("Copy");
        ta.remove();
        showToast("Copiado!");
    });
}

function showToast(msg) {
    const t = document.getElementById("toast");
    if(t) {
        t.innerText = msg;
        t.className = "show";
        setTimeout(() => t.className = t.className.replace("show", ""), 3000);
    }
}

function initToastSystem() {
    if(!document.getElementById('toast')) {
        const div = document.createElement('div');
        div.id = 'toast';
        document.body.appendChild(div);
    }
}

// ======================================================
// PARTE 1: GERADOR DE NICKS (HOME)
// ======================================================
const nickData = {
    bruto: {
        names: ["Killer", "Sniper", "Kratos", "Zeus", "Ghost", "Soldier", "General", "Hunter", "Venom", "Demon", "Titan", "Thor", "Wolf", "Shadow", "Doom", "Bane", "Viper", "Rex"],
        adjs: ["Dark", "Pro", "Mad", "Silent", "Hyper", "Toxic", "Dead", "Black", "Red", "Metal", "Mega", "Master", "Lord", "King"],
        decorators: ["☠", "⚡", "⚔️", "🔫", "☢️", "🩸", "★"]
    },
    feminino: {
        names: ["Angel", "Baby", "Queen", "Moon", "Star", "Lua", "Sol", "Nina", "Kira", "Witch", "Fada", "Lady", "Diva", "Girl", "Chan", "Loli", "Barbie"],
        adjs: ["Cute", "Sweet", "Dark", "Pink", "Bad", "Sad", "Baby", "Ice", "Fire", "Miss", "Gata", "Bela"],
        decorators: ["🌸", "✨", "♥", "❥", "🦋", "🎀", "🦄", "✿"]
    },
    sad: {
        names: ["Alone", "Sad", "Cry", "Empty", "Lost", "Pain", "Dead", "Nobody", "Shadow", "Void", "Sorry", "Fim", "Silence", "Vazio"],
        adjs: ["Lonely", "Broken", "Lost", "Last", "No", "Fake", "Hurt", "Dying"],
        decorators: ["💔", "🥀", "☁️", "☂", "☹", "✝", "✖", "∅"]
    },
    funny: {
        names: ["Batata", "Noob", "Bot", "Pato", "Frango", "Jumento", "Capivara", "Tijolo", "Zé", "Primo", "Bananinha", "Mito", "Lenda", "Kiko"],
        adjs: ["Super", "Ultra", "Mega", "Rei", "Mestre", "Dr", "Capitão", "MatadorDe"],
        decorators: ["🤡", "💩", "🍌", "🥒", "🤪", "👻"]
    },
    tryhard: {
        names: ["Syx", "Ryz", "Koz", "Lyn", "Zyp", "Vex", "Nox", "Lux", "Ash", "Zen", "Kai", "Jin", "Sol", "Rei", "One", "Red", "Dzt", "Fps", "Lag", "Hs"],
        adjs: ["iAm", "Its", "Not", "Only", "The", "Da", "El", "444", "777", "999"],
        decorators: ["⚡", "❄", "★", "ツ", "☂", "×", "", "†"]
    },
    casal: {
        names: ["Rei", "Rainha", "Patrão", "Patroa", "Dono", "Dona", "Romeu", "Julieta", "Batman", "Robin", "Sol", "Lua", "Adão", "Eva", "Bonnie", "Clyde"],
        adjs: ["Meu", "Minha", "Sr", "Sra", "Love", "Amor", "Vida"],
        decorators: ["♥", "∞", "💍", "🔒"]
    }
};

function initNickGenerator() {
    const btn = document.getElementById('btn-generate-filtered');
    const filters = document.querySelectorAll('.filter-btn');
    
    filters.forEach(b => b.addEventListener('click', () => {
        filters.forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        generateNicks();
    }));
    
    btn.addEventListener('click', generateNicks);
    generateNicks();
}

function generateNicks() {
    const output = document.getElementById('nick-output');
    const active = document.querySelector('.filter-btn.active');
    const cat = active ? active.dataset.cat : 'bruto';
    const data = nickData[cat];
    
    output.innerHTML = '';
    
    for(let i=0; i<15; i++) {
        const n = data.names[Math.floor(Math.random()*data.names.length)];
        const a = data.adjs[Math.floor(Math.random()*data.adjs.length)];
        const d = data.decorators[Math.floor(Math.random()*data.decorators.length)];
        let res = "";
        let r = Math.random();
        
        if(cat === 'casal') res = `${a}${n} ${d}`;
        else if(cat === 'tryhard') res = r < 0.5 ? `${a}${n}` : `${n}${d}`;
        else {
            if(r < 0.2) res = `${a}${n}`;
            else if(r < 0.4) res = `${d}${n}${d}`;
            else if(r < 0.6) res = `${n}_${a}`;
            else if(r < 0.8) res = `꧁${n}꧂`;
            else res = `${d} ${a} ${n} ${d}`;
        }
        
        // Leet speak (trocar letras por numeros)
        if(cat !== 'casal' && Math.random() > 0.7) {
            const chars = {'a':'4','e':'3','i':'1','o':'0','t':'7','s':'5'};
            res = res.split('').map(c => chars[c.toLowerCase()] && Math.random()>0.5 ? chars[c.toLowerCase()] : c).join('');
        }
        
        const div = document.createElement('div');
        div.className = 'result-item';
        div.innerHTML = `<span class="nick-result">${res}</span><button class="copy-btn" onclick="copyText('${res}')">Copiar</button>`;
        output.appendChild(div);
    }
}

// ======================================================
// PARTE 2: GERADOR DE FONTES
// ======================================================
const fonts = [
    {n:"Negrito Serif", m:"𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗"},
    {n:"Negrito Sans", m:"𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵"},
    {n:"Itálico", m:"𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧0123456789"},
    {n:"Cursiva", m:"𝒜𝐵𝒞𝒟𝐸𝐹𝒢𝐻𝐼𝒥𝒦𝐿𝑀𝒩𝒪𝒫𝒬𝑅𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏0123456789"},
    {n:"Cursiva Bold", m:"𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗"},
    {n:"Gótica", m:"𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷0123456789"},
    {n:"Gótica Bold", m:"𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟0123456789"},
    {n:"Double", m:"𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡"},
    {n:"Monospace", m:"𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣0𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿"},
    {n:"Bolhas", m:"ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ0①②③④⑤⑥⑦⑧⑨"},
    {n:"Bolhas Pretas", m:"🅐𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁🅐𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁⓿➊➋➌➍➎➏➐➑➒"},
    {n:"Small Caps", m:"ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ0123456789"},
    {n:"Quadrado", m:"🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉0123456789"},
    {n:"Quadrado Borda", m:"🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉0123456789"},
    {n:"Vaporwave", m:"ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ０１２３４５６７８９"},
    {n:"Russo Fake", m:"ДБCDЗFGHЇJКLМИФPQЯSГЦVЩXYZдбcdзfghїjкlмифpqяsгцvщxyz0123456789"},
    {n:"Grego Fake", m:"ΑΒCDΕFGΗΙJΚLΜΝΟΡQΓSΤυνWΧΥΖαβcdεfgηιjκlμνορqγsτυνwχγz0123456789"},
    {n:"Rúnico", m:"ᚪᛒᚳᛞᛄᚩᚷᚻᛁᛡᚳᛚᛗᚿᚢᛈᚳᚱᛋᛏᚢᚡᚹᛪᚣᛎᚪᛒᚳᛞᛄᚩᚷᚻᛁᛡᚳᛚᛗᚿᚢᛈᚳᚱᛋᛏᚢᚡᚹᛪᚣᛎ0123456789"},
    {n:"Sorriso", m:"A◡B◡C◡D◡E◡F◡G◡H◡I◡J◡K◡L◡M◡N◡O◡P◡Q◡R◡S◡T◡U◡V◡W◡X◡Y◡Z◡a◡b◡c◡d◡e◡f◡g◡h◡i◡j◡k◡l◡m◡n◡o◡p◡q◡r◡s◡t◡u◡v◡w◡x◡y◡z◡0123456789"},
    {n:"Parenteses", m:"⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵0123456789"},
    {n:"Moeda", m:"₳฿₵ĐɆ₣₲ⱧłJ₭Ⱡ₥₦Ø₱QⱤ₴₮ɄV₩ӾɎⱫ₳฿₵ĐɆ₣₲ⱧłJ₭Ⱡ₥₦Ø₱QⱤ₴₮ɄV₩ӾɎⱫ0123456789"}
];

const decs = [{s:"",e:""}, {s:"꧁",e:"꧂"}, {s:"★",e:"★"}, {s:"⚡",e:"⚡"}, {s:"♥",e:"♥"}, {s:"×͜×",e:""}];

function initFontConverter() {
    const inp = document.getElementById('text-input');
    const out = document.getElementById('font-output');
    const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    function run() {
        let txt = inp.value || "Digite algo";
        out.innerHTML = '';
        
        fonts.forEach(f => {
            let res = "";
            for(let c of txt) {
                let i = abc.indexOf(c);
                res += i !== -1 ? [...f.m][i] : c;
            }
            // Add variations
            decs.forEach(d => {
                const final = `${d.s} ${res} ${d.e}`.trim();
                const div = document.createElement('div');
                div.className = 'result-item';
                div.innerHTML = `<div style="overflow:hidden"><span class="nick-result">${final}</span><br><small style="font-size:0.7rem;color:#666">${f.n}</small></div><button class="copy-btn" onclick="copyText('${final}')">Copiar</button>`;
                out.appendChild(div);
            });
        });

        // EFEITOS ESPECIAIS (MANUAIS)
        const specials = [
            {l:"Riscado", f: c => c + '\u0336'},
            {l:"Sublinhado", f: c => c + '\u0332'},
            {l:"Onda", f: c => c + '\u0330'},
            {l:"Pontilhado", f: c => c + '\u0323'},
            {l:"Invisível", f: c => '\u3164'}, // Troca tudo por espaço invisível
            {l:"Glitch", f: c => c + '\u0336\u0332'}
        ];

        specials.forEach(eff => {
            const transformed = txt.split('').map(eff.f).join('');
            const div = document.createElement('div');
            div.className = 'result-item';
            div.innerHTML = `<div style="overflow:hidden"><span class="nick-result">${transformed}</span><br><small style="font-size:0.7rem;color:#666">Efeito: ${eff.l}</small></div><button class="copy-btn" onclick="copyText('${transformed}')">Copiar</button>`;
            out.appendChild(div);
        });
    }
    inp.addEventListener('input', run);
    run();
}

// ======================================================
// PARTE 3: SÍMBOLOS (DATABASE GIGANTE)
// ======================================================
const symbolsDB = {
    "🇯🇵 Nicks Japoneses": [
        {s:"暗殺者",d:"Assassino"},{s:"死神",d:"Shinigami"},{s:"無敵",d:"Invencível"},{s:"黒竜",d:"Dragão Negro"},
        {s:"夜影",d:"Sombra"},{s:"軍神",d:"Deus Guerra"},{s:"氷結",d:"Gelo"},{s:"雷切",d:"Raio"},
        {s:"悪夢",d:"Pesadelo"},{s:"紅蓮",d:"Lótus"},{s:"修羅",d:"Demônio"},{s:"忍者",d:"Ninja"}
    ],
    "🇷🇺 Nicks Russos": [
        {s:"Снайпер",d:"Sniper"},{s:"Убийца",d:"Assassino"},{s:"Зверь",d:"Besta"},{s:"Босс",d:"Chefe"},
        {s:"Царь",d:"Imperador"},{s:"Бог",d:"Deus"},{s:"Волк",d:"Lobo"},{s:"Тень",d:"Sombra"}
    ],
    "🐺 Runas Vikings": [
        {s:"ᚠ",d:"Riqueza"},{s:"ᚢ",d:"Força"},{s:"ᚦ",d:"Gigante"},{s:"ᚨ",d:"Odin"},{s:"ᚱ",d:"Jornada"},
        {s:"ᚲ",d:"Tocha"},{s:"ᚷ",d:"Presente"},{s:"ᚺ",d:"Granizo"},{s:"ᛁ",d:"Gelo"},{s:"ᛉ",d:"Proteção"},
        {s:"ᛋ",d:"Sol"},{s:"ᛏ",d:"Guerreiro"},{s:"ᛗ",d:"Homem"},{s:"ᛟ",d:"Herança"}
    ],
    "👁️ Egípcios": [
        {s:"𓄿",d:"A"},{s:"𓇋",d:"I/E"},{s:"𓅓",d:"M"},{s:"𓈖",d:"N"},{s:"𓂋",d:"R"},{s:"𓆑",d:"F"},
        {s:"𓃀",d:"B"},{s:"𓎡",d:"K"},{s:"𓆓",d:"J"},{s:"𓋹",d:"Vida"},{s:"𓁹",d:"Olho Horus"}
    ],
    "🧸 ASCII Art": [
        {s:"▄︻̷̿┻̿═━一",d:"Sniper"},{s:"▬▬ι═══════hu",d:"Espada"},{s:"︻デ═一",d:"Pistola"},
        {s:"/╲/\\╭( ͡° ͡° ͜ʖ ͡° ͡°)╮/\\╱\\",d:"Aranha"},{s:"(V) (°,,,,°) (V)",d:"Caranguejo"},
        {s:"[̲̅$̲̅(̲̅5̲̅)̲̅$̲̅]",d:"Dinheiro"},{s:"✈ ▌▌▌▌▌▌▌▌▌",d:"Jato"},
        {s:"(҂◡_◡) ᕤ",d:"Forte"}, {s:"(づ｡◕‿‿◕｡)づ",d:"Abraço"},
        {s:"(ノಠ益ಠ)ノ彡┻━┻",d:"Vira Mesa"}, {s:"┬─┬ノ( º _ ºノ)",d:"Arruma Mesa"},
        {s:"(=^･ω･^=)",d:"Gato"}, {s:"U^ｪ^U",d:"Cachorro"},
        {s:"ʕ •ᴥ•ʔ",d:"Urso"}, {s:"¯\\_(ツ)_/¯",d:"Shrug"},
        {s:"( ͡° ͜ʖ ͡°)",d:"Lenny"}, {s:"ಠ_ಠ",d:"Sério"},
        {s:"♡( ◡‿◡ )",d:"Love"}, {s:"(－‸ლ)",d:"Facepalm"},
        {s:"╾━╤デ╦︻",d:"Shotgun"}, {s:"⋌༼ •̀ ⌂ •́ ༽⋋",d:"Bravo"}
    ],
    "📏 Divisórias": [
        "━━━━━━ ◦ ❖ ◦ ━━━━━━", "»»————-　★　————-««", "●▬▬▬▬๑۩۩๑▬▬▬▬▬●", 
        "•───────•°•❀•°•───────•", "▬▬▬▬▬▬▬▬▬▬▬▬", "★・・・・・・★・・・・・・★"
    ],
    "👻 Invisíveis": [
        {s:"ㅤ",d:"Grande"},{s:"\u3164",d:"FF Invisível"},{s:"⁣⁣",d:"Médio"},{s:"⠀",d:"Braille"}
    ],
    "Populares": ["★","⚡","☂","☠","✞","✈","༒","⚔️","❄","❤","❥","♛","","꧂","꧁","👾","🎮","🤡"],
    "Kanji": [{s:"火",d:"Fogo"},{s:"水",d:"Água"},{s:"雷",d:"Raio"},{s:"闇",d:"Escuridão"},{s:"愛",d:"Amor"},{s:"神",d:"Deus"}],
    "Tech": [{s:"",d:"Apple"},{s:"⌘",d:"Cmd"},{s:"⌫",d:"Del"},{s:"🔋",d:"Bat"},{s:"📡",d:"Wifi"},{s:"🔒",d:"Lock"}],
    "Zodíaco": [{s:"♈",d:"Áries"},{s:"♉",d:"Touro"},{s:"♊",d:"Gêmeos"},{s:"♋",d:"Câncer"},{s:"♌",d:"Leão"},{s:"♍",d:"Virgem"},{s:"♎",d:"Libra"},{s:"♏",d:"Escorpião"},{s:"♐",d:"Sagitário"},{s:"♑",d:"Capricórnio"},{s:"♒",d:"Aquário"},{s:"♓",d:"Peixes"}],
    "Grego": [{s:"Ω",d:"Omega"},{s:"Σ",d:"Sigma"},{s:"Π",d:"Pi"},{s:"Δ",d:"Delta"},{s:"Ψ",d:"Psi"}],
    "Subscrito": [{s:"₀",d:"0"},{s:"₁",d:"1"},{s:"₂",d:"2"},{s:"₃",d:"3"},{s:"ₐ",d:"a"},{s:"ₑ",d:"e"},{s:"ₓ",d:"x"}],
    "Sobrescrito": ["⁰","¹","²","³","ᵃ","ᵇ","ᶜ","ᵈ","ᵉ","ˣ","ʸ","ᶻ"]
};

// ======================================================
// PARTE 4: EMOJIS (GERAÇÃO AUTOMÁTICA)
// ======================================================
const emojiRanges = [
    { name: "😀 Carinhas e Emoções", start: 0x1F600, end: 0x1F64F },
    { name: "🐻 Animais, Natureza e Comida", start: 0x1F300, end: 0x1F5FF },
    { name: "🚀 Transporte e Lugares", start: 0x1F680, end: 0x1F6FF },
    { name: "🧬 Objetos e Novos Emojis", start: 0x1F900, end: 0x1F9FF },
    { name: "✨ Dingbats e Decoração", start: 0x2700, end: 0x27BF },
    { name: "☀ Clima e Símbolos", start: 0x2600, end: 0x26FF },
    { name: "🔴 Formas Geométricas", start: 0x1F7E0, end: 0x1F7EB }
];

function initSymbolsPage() {
    const cont = document.getElementById('rare-symbols-container');
    const emojiCont = document.getElementById('emojis-container');
    const wideCats = ["Nicks", "Runas", "Egípcios", "ASCII", "Divisórias", "Kanji", "Russos", "Invisíveis", "Tech", "Zodíaco", "Grego", "Subscrito"];

    // 1. Renderiza Símbolos Raros
    if(cont) {
        cont.innerHTML = '';
        for(let [cat, items] of Object.entries(symbolsDB)) {
            const h4 = document.createElement('h4');
            h4.className = 'category-title';
            h4.innerText = cat;
            cont.appendChild(h4);

            const grid = document.createElement('div');
            grid.className = wideCats.some(w => cat.includes(w)) ? 'symbol-grid wide-grid' : 'symbol-grid';

            items.forEach(it => {
                const div = document.createElement('div');
                div.className = 'symbol-item';
                if(typeof it === 'object') {
                    div.innerHTML = `<span class="sym-main">${it.s}</span><span class="sym-desc">${it.d}</span>`;
                    div.onclick = () => copyText(it.s);
                } else {
                    div.innerText = it;
                    div.onclick = () => copyText(it);
                }
                grid.appendChild(div);
            });
            cont.appendChild(grid);
        }
    }

    // 2. Renderiza Emojis (Destaques + Automáticos)
    if(emojiCont) {
        emojiCont.innerHTML = '';
        
        // Destaques Manuais
        const manualEmojis = ["🤡","👹","👽","💩","👻","💀","👑","💎","🔥","💯","💢","💥","💫","👿","🤬"];
        const titleMan = document.createElement('h4');
        titleMan.className = 'category-title';
        titleMan.innerText = "🔥 Destaques";
        emojiCont.appendChild(titleMan);
        
        const gridMan = document.createElement('div');
        gridMan.className = 'emoji-grid';
        manualEmojis.forEach(e => {
            const d = document.createElement('div');
            d.className = 'emoji-item';
            d.innerText = e;
            d.onclick = () => copyText(e);
            gridMan.appendChild(d);
        });
        emojiCont.appendChild(gridMan);

        // Geração Automática das Faixas
        emojiRanges.forEach(range => {
            const title = document.createElement('h4');
            title.className = 'category-title';
            title.innerText = range.name;
            emojiCont.appendChild(title);

            const grid = document.createElement('div');
            grid.className = 'emoji-grid';

            for (let i = range.start; i <= range.end; i++) {
                try {
                    // Pula caracteres de tom de pele soltos
                    if (i >= 0x1F3FB && i <= 0x1F3FF) continue;

                    const emoji = String.fromCodePoint(i);
                    const div = document.createElement('div');
                    div.className = 'emoji-item';
                    div.innerText = emoji;
                    div.onclick = () => copyText(emoji);
                    grid.appendChild(div);
                } catch (e) {}
            }
            emojiCont.appendChild(grid);
        });
    }
}