// ============================================================
// LDS 다국어 경전 v2.10
// ============================================================

// [추가] 성경 문장 부호 및 띄어쓰기 정제 함수
function cleanVerse(str){
  if(!str) return '';
  return str.replace(/^[\s\u00B6¶*#.,:;·\-_~^]+/g, '').replace(/[ \t\u00A0\u3000]+/g, ' ').trim();
}

// ── UI Language Strings ──
var UI_STRINGS={
  kor:{
    home:'홈',search:'검색',lang:'언어 설정',history:'기록',bookmarks:'북마크',
    notes:'노트',highlights:'형광펜',share:'앱 공유',settings:'설정',about:'정보',
    hl:'형광',note:'노트',bm:'북마크',shr:'공유',
    save:'저장',close:'닫기',prev:'◀ 이전',next:'다음 ▶',
    loading:'불러오는 중...',no_content:'내용이 없습니다',
    need_net:'인터넷 연결이 필요합니다',
    search_ph:'경전 검색...',results:'개 검색 결과',
    recent:'최근에 읽은 글',scriptures:'경전',
    read_all:'전체 읽기',go_verse:'절 바로 이동',
    apply:'✓ 적용',theme:'테마',font:'글꼴',
    fontsize:'글자 크기 (12–50px)',brightness:'밝기',
    light:'밝게',dark:'어둡게',sepia:'세피아',
    lang1:'기본 언어',lang2:'추가 언어',lang2_show:'추가 언어 표시',
    ui_lang:'앱 표시 언어',
    lang1_desc:'경전 절에 표시되는 주요 언어',
    lang2_desc:'각 절 아래 이탤릭으로 표시되는 보조 언어',
    bible_no_l2:'⚠️ 추가언어는 구약·신약 성경에서 지원되지 않습니다',
    ch_note_write:'노트 작성',ch_note_ph:'노트를 입력하세요...',
    lang_loading:'언어 데이터 불러오는 중...',net_loading:'교회 공식 사이트 접속 중',
    bm_empty:'저장된 북마크가 없습니다',note_empty:'저장된 노트가 없습니다',
    hl_empty:'저장된 형광 표시가 없습니다',hist_empty:'최근에 읽은 내용이 없습니다',
    share_title:'LDS 다국어 경전 공유하기',share_desc:'가족과 친구들에게 이 앱을 소개해 주세요',
    share_btn:'공유하기',download_link:'앱 다운로드 링크',copy_link:'링크 복사',
    lang_note:'교회 공식 번역본만 사용 · 임의 번역 없음'
  },
  eng:{
    home:'Home',search:'Search',lang:'Language',history:'History',bookmarks:'Bookmarks',
    notes:'Notes',highlights:'Highlights',share:'Share App',settings:'Settings',about:'About',
    hl:'Color',note:'Note',bm:'Bookmark',shr:'Share',
    save:'Save',close:'Close',prev:'◀ Prev',next:'Next ▶',
    loading:'Loading...',no_content:'No content',
    need_net:'Internet connection required',
    search_ph:'Search scriptures...',results:' results',
    recent:'Recently Read',scriptures:'Scriptures',
    read_all:'Read All',go_verse:'Jump to Verse',
    apply:'✓ Apply',theme:'Theme',font:'Font',
    fontsize:'Font Size (12–50px)',brightness:'Brightness',
    light:'Light',dark:'Dark',sepia:'Sepia',
    lang1:'Primary Language',lang2:'Secondary Language',lang2_show:'Show Secondary',
    ui_lang:'App Display Language',
    lang1_desc:'The main language shown on each verse',
    lang2_desc:'Secondary language shown below each verse (italic)',
    bible_no_l2:'⚠️ Secondary language is not supported for the Old/New Testament',
    ch_note_write:'Write Note',ch_note_ph:'Enter note...',
    lang_loading:'Loading language data...',net_loading:'Connecting to church site',
    bm_empty:'No bookmarks saved',note_empty:'No notes saved',
    hl_empty:'No highlights saved',hist_empty:'No reading history',
    share_title:'Share LDS Multilingual Scriptures',share_desc:'Introduce this app to family and friends',
    share_btn:'Share',download_link:'App Download Link',copy_link:'Copy Link',
    lang_note:'Uses only official Church translations — no unofficial translations'
  },
  jpn:{
    home:'ホーム',search:'検索',lang:'言語設定',history:'履歴',bookmarks:'ブックマーク',
    notes:'メモ',highlights:'マーカー',share:'共有',settings:'設定',about:'情報',
    hl:'色付け',note:'メモ',bm:'ブックマーク',shr:'共有',
    save:'保存',close:'閉じる',prev:'◀ 前へ',next:'次へ ▶',
    loading:'読込中...',no_content:'内容がありません',need_net:'インターネット接続が必要です',
    search_ph:'経典を検索...',results:'件の結果',recent:'最近読んだ',scriptures:'経典',
    read_all:'全文を読む',go_verse:'節へジャンプ',
    apply:'✓ 適用',theme:'テーマ',font:'フォント',
    fontsize:'文字サイズ (12–50px)',brightness:'明るさ',
    light:'明るい',dark:'ダーク',sepia:'セピア',
    lang1:'主要言語',lang2:'追加言語',lang2_show:'追加言語を表示',
    ui_lang:'表示言語',
    lang1_desc:'各節に表示される主要言語',
    lang2_desc:'各節の下にイタリックで表示される追加言語',
    bible_no_l2:'⚠️ 追加言語は旧約・新約聖書では対応していません',
    ch_note_write:'メモを書く',ch_note_ph:'メモを入力...',
    lang_loading:'言語データ読込中...',net_loading:'教会サイトに接続中',
    bm_empty:'ブックマークがありません',note_empty:'メモがありません',
    hl_empty:'マーカーがありません',hist_empty:'履歴がありません',
    share_title:'LDS多言語経典を共有',share_desc:'家族や友人にアプリを紹介してください',
    share_btn:'共有',download_link:'ダウンロードリンク',copy_link:'リンクをコピー',
    lang_note:'教会公式翻訳のみ使用 · 非公式翻訳なし'
  }
};
function t(k){var ui=S.st.ui||'kor';return(UI_STRINGS[ui]&&UI_STRINGS[ui][k])||UI_STRINGS.kor[k]||k;}

// ── Official Book Name Overrides ──
var BOOK_NAMES={
  '1-ne':{kor:'니파이전서',eng:'1 Nephi'},
  '2-ne':{kor:'니파이후서',eng:'2 Nephi'},
  '3-ne':{kor:'제3니파이서',eng:'3 Nephi'},
  '4-ne':{kor:'제4니파이서',eng:'4 Nephi'},
  'js-m':{kor:'조셉 스미스—마태',eng:'Joseph Smith—Matthew'},
  'js-h':{kor:'조셉 스미스—역사',eng:'Joseph Smith—History'},
  'a-of-f':{kor:'신앙개조',eng:'Articles of Faith'},
  'w-of-m':{kor:'몰몬의 말씀',eng:'Words of Mormon'},
  'mosiah':{kor:'모사이야서',eng:'Mosiah'}
};
function getBN(b){var o=BOOK_NAMES[b.id];return{kor:o?o.kor:b.name_kor,eng:o?o.eng:b.name_eng};}
function pickName(kor,eng){var L=(S.st&&S.st.l1)||'kor';var p=(L==='kor')?kor:(eng||kor);var ss='';if(S.st&&S.st.sl2&&S.st.l2!==S.st.l1){var sn=(S.st.l2==='kor')?kor:(eng||kor);if(sn&&sn!==p)ss=sn;}return{p:p,s:ss};}
function bookNames(b){var o=getBN(b);return pickName(o.kor,o.eng);}
function secName(sec){return ((S.st&&S.st.l1)==='kor')?sec.name_kor:(sec.name_eng||sec.name_kor);}

// ── Scripture icons (local bundled images) ──
var SCR_IMG={
  'bible-ot':'assets/img/ot.jpg',
  'bible-nt':'assets/img/nt.jpg',
  'bom':     'assets/img/bom.jpg',
  'dc':      'assets/img/dc.jpg',
  'pgp':     'assets/img/pgp.jpg'
};

// ── Languages ──
var LANGS=[
  // ── 번들 언어 (오프라인) ──
  {c:'kor',n:'한국어',bundled:true},{c:'eng',n:'English',bundled:true},
  // ── 아시아 ──
  {c:'jpn',n:'日本語'},{c:'zhs',n:'简体中文'},{c:'zho',n:'繁體中文'},
  {c:'tha',n:'ภาษาไทย'},{c:'vie',n:'Tiếng Việt'},{c:'ind',n:'Bahasa Indonesia'},
  {c:'msa',n:'Bahasa Melayu'},{c:'tgl',n:'Tagalog'},
  // ── 유럽 ──
  {c:'spa',n:'Español'},{c:'por',n:'Português'},{c:'fra',n:'Français'},
  {c:'deu',n:'Deutsch'},{c:'ita',n:'Italiano'},{c:'nld',n:'Nederlands'},
  {c:'pol',n:'Polski'},{c:'ukr',n:'Українська'},{c:'rus',n:'Русский'},
  {c:'hun',n:'Magyar'},{c:'ron',n:'Română'},{c:'ces',n:'Česky'},
  {c:'slk',n:'Slovenčina'},{c:'slv',n:'Slovenščina'},{c:'hrv',n:'Hrvatski'},
  {c:'bul',n:'Български'},{c:'dan',n:'Dansk'},{c:'nor',n:'Norsk'},
  {c:'swe',n:'Svenska'},{c:'fin',n:'Suomi'},{c:'ell',n:'Ελληνικά'},
  // ── 기타 ──
  {c:'afr',n:'Afrikaans'},{c:'mri',n:'Te Reo Māori'},
  {c:'smo',n:'Gagana Samoa'},{c:'tpi',n:'Tok Pisin'},
  {c:'ara',n:'العربية'},{c:'cat',n:'Català'},{c:'ceb',n:'Cebuano'}
];

// ── Fonts (9 options including Google Fonts) ──
var FONTS=[
  {id:'sys', n:'기본 (System)',    sample:'가나다 Abc', css:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif'},
  {id:'nng', n:'나눔고딕',         sample:'가나다 Abc', css:'"Nanum Gothic","나눔고딕","Malgun Gothic",sans-serif'},
  {id:'nnm', n:'나눔명조',         sample:'가나다 Abc', css:'"Nanum Myeongjo","나눔명조",Georgia,serif'},
  {id:'nsr', n:'노토 세리프 KR',   sample:'가나다 Abc', css:'"Noto Serif KR","Noto Serif",serif'},
  {id:'ga1', n:'고딕 A1',         sample:'가나다 Abc', css:'"Gothic A1","고딕 A1","Noto Sans KR",sans-serif'},
  {id:'gwd', n:'고운 돋움',        sample:'가나다 Abc', css:'"Gowun Dodum","Noto Sans KR",sans-serif'},
  {id:'gwb', n:'고운 바탕',        sample:'가나다 Abc', css:'"Gowun Batang","Noto Serif KR",serif'},
  {id:'ser', n:'바탕 (Serif)',     sample:'가나다 Abc', css:'Georgia,"Times New Roman",serif'},
  {id:'mon', n:'고정폭',           sample:'가나다 Abc', css:'"Courier New","Nanum Gothic Coding",monospace'}
];
var HLC={y:'#FFE066',g:'#7FE082',b:'#87CEEB',p:'#FFB6C1',o:'#FFB347',r:'#FF8080',pu:'#C8A2C8',cy:'#7FFFD4',lm:'#ADFF2F',sk:'#B0E2FF'};
var HLC_KEYS=['y','g','b','p','o','r','pu','cy','lm','sk'];
var HLN={y:'노랑',g:'초록',b:'파랑',p:'분홍',o:'주황',r:'빨강',pu:'보라',cy:'청록',lm:'연두',sk:'하늘'};

// ── State ──
var S={
  nav:'home',stk:[],
  sid:null,book:null,ch:null,
  vs:{l1:[],l2:[]},
  sbOpen:false,
  hl:{},bm:[],nt:{},rc:[],phl:{},
  lc:{},lcOrder:[],
  pvk:null,pvn:null,nc:'y',
  st:{l1:'kor',l2:'eng',sl2:true,fs:16,ff:'sys',theme:'light',br:1.0,ui:'eng',av:''},
  srch:{q:'',res:null},
  sp:{uri:'',title:'',content:null},
  phlSel:{vk:null,vn:1,t1:'',t2:'',l1:{},l2:{},c:'y'}
};

// ── Init ──
document.addEventListener('DOMContentLoaded',function(){
  loadSt();applyTheme();applyUI();renderScreen();
});

// ── Persistence ──
function loadSt(){
  try{
    var h=localStorage.getItem('lds_hl');if(h)S.hl=JSON.parse(h);
    var b=localStorage.getItem('lds_bm');if(b)S.bm=JSON.parse(b);
    var n=localStorage.getItem('lds_nt');if(n)S.nt=JSON.parse(n);
    var r=localStorage.getItem('lds_rc');if(r)S.rc=JSON.parse(r);
    var s=localStorage.getItem('lds_st');if(s)S.st=Object.assign({},S.st,JSON.parse(s));
    var p=localStorage.getItem('lds_phl');if(p)S.phl=JSON.parse(p);
    loadLC();
  }catch(e){}
}
function savHL(){try{localStorage.setItem('lds_hl',JSON.stringify(S.hl));}catch(e){}}
function savBM(){try{localStorage.setItem('lds_bm',JSON.stringify(S.bm));}catch(e){}}
function savNT(){try{localStorage.setItem('lds_nt',JSON.stringify(S.nt));}catch(e){}}
function savRC(){try{localStorage.setItem('lds_rc',JSON.stringify(S.rc));}catch(e){}}
function savST(){try{localStorage.setItem('lds_st',JSON.stringify(S.st));}catch(e){}}
function savPHL(){try{localStorage.setItem('lds_phl',JSON.stringify(S.phl));}catch(e){}}

// ── Language cache persistence (localStorage, max 150 chapters, LRU eviction) ──
var LC_KEY='lds_lc';var LC_MAX=150;
function loadLC(){
  try{
    var raw=localStorage.getItem(LC_KEY);
    if(raw){var parsed=JSON.parse(raw);S.lc=parsed.data||{};S.lcOrder=parsed.order||[];}
  }catch(e){S.lc={};S.lcOrder=[];}
}
function savLC(){
  try{
    // LRU eviction: if over LC_MAX entries, remove oldest
    var keys=Object.keys(S.lc);
    if(keys.length>LC_MAX){
      // remove from order + data
      var toRemove=keys.length-LC_MAX;
      for(var i=0;i<toRemove;i++){
        var oldest=S.lcOrder.shift()||keys[i];
        delete S.lc[oldest];
      }
    }
    localStorage.setItem(LC_KEY,JSON.stringify({data:S.lc,order:S.lcOrder||[]}));
  }catch(e){}
}
function lcPut(ck,verses){
  S.lc[ck]=verses;
  if(!S.lcOrder)S.lcOrder=[];
  var idx=S.lcOrder.indexOf(ck);
  if(idx>=0)S.lcOrder.splice(idx,1);
  S.lcOrder.push(ck);
  savLC();
}

function applyTheme(){
  document.body.className=S.st.theme==='light'?'':S.st.theme;
  document.body.style.filter=S.st.br!==1?'brightness('+S.st.br+')':'';
}
function applyUI(){
  // Update all [data-ui] elements in sidebar/popup with current language
  document.querySelectorAll('[data-ui]').forEach(function(el){
    var k=el.getAttribute('data-ui');
    el.textContent=t(k);
  });
}

// ── Navigation ──
function renderScreen(){
  var sc=document.getElementById('screen');if(!sc)return;
  hideTopBar();
  if(window.stopAudio)stopAudio();
  switch(S.nav){
    case'home':       sc.innerHTML=buildHome();break;
    case'books':      sc.innerHTML=buildBooks();break;
    case'chapters':   sc.innerHTML=buildChs();break;
    case'vsel':       sc.innerHTML=buildVsel();break;
    case'cv':         sc.innerHTML=buildCV();initCV();break;
    case'static-page':sc.innerHTML=buildStaticPage();loadStaticPage();break;
    case'guide':     sc.innerHTML=(window.buildGuide?buildGuide():'');if(window.loadGuide)loadGuide();break;
    case'guide-topic':sc.innerHTML=(window.buildGuideTopic?buildGuideTopic():'');if(window.loadGuideTopic)loadGuideTopic();break;
    case'search':     sc.innerHTML=buildSearch();focusSearch();break;
    case'settings':   sc.innerHTML=buildSettings();break;
    case'appearance': sc.innerHTML=buildAppearance();break;
    case'language':   sc.innerHTML=buildLanguage();break;
    case'bookmarks':  sc.innerHTML=buildBMs();break;
    case'notes':      sc.innerHTML=buildNotes();break;
    case'highlights': sc.innerHTML=buildHLs();break;
    case'history':    sc.innerHTML=buildHistory();break;
    case'about':      sc.innerHTML=buildAbout();break;
    case'share':      sc.innerHTML=buildShare();break;
    default:          sc.innerHTML=buildHome();
  }
  sc.scrollTop=0;
}
function navTo(scr,p){
  S.stk.push({nav:S.nav,sid:S.sid,book:S.book,ch:S.ch,sp:{uri:S.sp.uri,title:S.sp.title}});
  if(S.stk.length>40)S.stk.shift();
  S.nav=scr;
  if(p){
    if(p.sid!==undefined)S.sid=p.sid;
    if(p.book!==undefined)S.book=p.book;
    if(p.ch!==undefined)S.ch=p.ch;
    if(p.sp!==undefined)S.sp=p.sp;
  }
  renderScreen();
}
window.goBack=function(){
  if(S.stk.length>0){
    var p=S.stk.pop();
    S.nav=p.nav;S.sid=p.sid;S.book=p.book;S.ch=p.ch;
    if(p.sp)S.sp=p.sp;
    renderScreen();
  }else if(S.nav!=='home'){S.stk=[];S.nav='home';renderScreen();}
};
window.reloadL2=function(){
  if(!S.book)return;
  var bid=S.book.id,ch=S.ch,l2=S.st.l2;
  var ck2=l2+'__'+bid+'__'+ch;
  delete S.lc[ck2];
  savLC();
  var sc=document.getElementById('screen');
  if(sc)sc.innerHTML='<div class="loading" style="flex-direction:column;gap:10px;padding-top:60px"><div>🌐</div><div style="font-size:13px">'+t('lang_loading')+'</div></div>';
  fetchLang(l2,bid,ch).then(function(vs){
    if(vs&&vs.length)lcPut(ck2,vs);
    S.vs.l2=vs||[];
    navTo('cv');
  }).catch(function(){
    showToast(t('need_net'));
    navTo('cv');
  });
};
window.goHome=function(){S.stk=[];S.nav='home';renderScreen();};
window.toggleSidebar=function(){S.sbOpen?closeSidebar():openSidebar();};
window.openSidebar=function(){
  S.sbOpen=true;
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sb-overlay').classList.add('show');
};
window.closeSidebar=function(){
  S.sbOpen=false;
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sb-overlay').classList.remove('show');
};
window.sbGo=function(t){
  closeSidebar();
  if(t==='home'){S.stk=[];S.nav='home';renderScreen();}
  else navTo(t);
};
window.exitApp=function(){
  if(window.Android&&window.Android.exitApp)window.Android.exitApp();
  else try{window.history.go(-window.history.length);}catch(e){}
};

// ── Top bar ──
function showTopBar(title){
  var tb=document.getElementById('top-bar');if(!tb)return;
  tb.classList.add('show');
  var ttl=document.getElementById('top-bar-title');if(ttl)ttl.textContent=title||'';
  updLangBtn();
}
function hideTopBar(){var tb=document.getElementById('top-bar');if(tb)tb.classList.remove('show');}
function updLangBtn(){
  var btn=document.getElementById('lang-btn');if(!btn)return;
  btn.textContent=S.st.l1.toUpperCase().substr(0,3)+(S.st.sl2?'|'+S.st.l2.toUpperCase().substr(0,3):'');
}
window.toggleLang2=function(){
  if(window.stopAudio)stopAudio();
  S.st.sl2=!S.st.sl2;savST();updLangBtn();
  if(S.nav==='cv'){var sc=document.getElementById('screen');sc.innerHTML=buildCV();initCV();}
};
window.adjFs=function(d){S.st.fs=Math.max(12,Math.min(50,S.st.fs+d));savST();applyFsDOM();};
function applyFsDOM(){
  var vc=document.getElementById('vc');if(!vc)return;
  vc.querySelectorAll('.vt1').forEach(function(e){e.style.fontSize=S.st.fs+'px';});
  vc.querySelectorAll('.vt2').forEach(function(e){e.style.fontSize=Math.max(12,S.st.fs-2)+'px';});
}

// ============================================================
// HOME
// ============================================================
function buildHome(){
  var rc='';
  if(S.rc&&S.rc.length){
    rc='<div class="sec-label">'+t('recent')+'</div><div class="quick-list">';
    S.rc.slice(0,5).forEach(function(r){
      rc+='<div class="q-item" onclick="openRC(\''+ea(r.k)+'\')">'+
        '<img src="'+SCR_IMG[r.sid]+'" style="width:32px;height:42px;object-fit:cover;border-radius:3px;flex-shrink:0" onerror="this.style.display=\'none\'">'+
        '<div class="qi-txt"><div class="qi-title">'+eh(r.t)+'</div><div class="qi-sub">'+eh(r.s)+'</div></div>'+
        '<div class="qi-arrow">›</div></div>';
    });
    rc+='</div>';
  }
  var SCRIPS=[
    {id:'bible-ot',kor:'구약전서',   eng:'Old Testament'},
    {id:'bible-nt',kor:'신약전서',   eng:'New Testament'},
    {id:'bom',     kor:'몰몬경',     eng:'Book of Mormon'},
    {id:'dc',      kor:'교리와 성약',eng:'D&C'},
    {id:'pgp',     kor:'값진 진주',  eng:'Pearl of Great Price'}
  ];
  var grid='<div class="sc-img-grid">';
  SCRIPS.forEach(function(s){
    var uiL=S.st.ui||'kor';
    var lbl=uiL==='eng'?s.eng:s.kor;
    grid+='<div class="sc-img-card" onclick="selSc(\''+s.id+'\')">'+
      '<img src="'+SCR_IMG[s.id]+'" class="sc-img" onerror="this.style.display=\'none\'">'+
      '</div>';
  });
  grid+='</div>';
  return'<div class="home-hero">'+
    '<div style="display:flex;align-items:center;gap:12px">'+
    '<img src="assets/img/logo.png" style="width:44px;height:44px;object-fit:contain;border-radius:50%" onerror="this.style.display=\'none\'">'+
    '<div><div class="home-title">'+t('app_title')+'</div></div>'+
    '</div></div>'+
    '<div class="sec-label">'+t('scriptures')+'</div>'+grid+(window.buildGuideCard?buildGuideCard():'');
}
window.selSc=function(sid){S.sid=sid;navTo('books');};
window.openRC=function(k){
  var r=(S.rc||[]).find(function(x){return x.k===k;});if(!r||!r.book)return;
  S.sid=r.sid;S.book=r.book;S.ch=r.ch;
  doLoadCD(r.book.id,r.ch,function(v1,v2){S.vs={l1:v1,l2:v2};navTo('cv');});
};

// ============================================================
// BOOKS — Grid layout
// ============================================================
// ── Bundled static page HTML (canonical pages that require no internet) ──
var BUNDLED_PAGES={
  'kor':{
    'bom-wit3':'<p style="font-weight:700;font-size:1.1em;margin:0 0 14px;text-align:center">세 증인의 증언</p><p style="margin:0 0 12px;text-indent:1em;line-height:1.85">하나님 아버지와 우리 주 예수 그리스도의 은혜로, 우리는 몰몬경의 판들이 참으로 존재한다는 것을 세상에 알리노니, 이 판들은 하나님의 기이한 능력으로 조셉 스미스 이차 세대에게 나타났으며, 우리는 그 위에 새겨진 것을 목격하였고, 하나님의 은사와 능력으로 이것이 번역되었다는 것을 안다. 하나님의 음성이 이를 우리에게 선언하셨으니 이러므로 우리는 그 사역이 참됨을 확실히 아노라.</p><p style="margin:0 0 12px;text-indent:1em;line-height:1.85">우리는 또한 판들 위에 새겨진 것을 보았음을 증거하노라. 하나님의 천사가 하늘로부터 내려와 이 판들을 우리 눈앞에 펼쳐 보이셨으므로 우리가 직접 보고 관찰하였노라. 우리는 이 일들이 참됨을 엄숙한 말로 선언하노니, 오직 하나님 아버지와 우리 주 예수 그리스도의 은혜로 이것들을 보았으며 이 일들이 참됨을 증거하노라. 이것이 우리 눈에 기이하도다. 하나님의 이름에 영광이 있을지어다. 아멘.</p><p style="margin:0 0 5px;line-height:1.85">올리버 카우드리 · 데이빗 휘트머 · 마틴 해리스</p>',
    'bom-wit8':'<p style="font-weight:700;font-size:1.1em;margin:0 0 14px;text-align:center">여덟 증인의 증언</p><p style="margin:0 0 12px;text-indent:1em;line-height:1.85">이 기록의 번역이 이루어지고 그로부터 얼마 후에, 우리는 조셉 스미스 이차 세대가 하나님의 능력으로 숨겨졌던 판들을 우리에게 내보이는 것을 목격하니, 우리는 실제로 우리 자신의 손으로 이 판들을 들었으며, 또한 판들의 모양새와 새겨진 것들을 느꼈노라. 판들은 고대의 사역처럼 보였으며 훌륭한 솜씨로 만들어진 듯하였노라. 또한 우리는 이것들이 어떻게 보이는지, 또 어떻게 느껴지는지를 단호하게 선언하노니, 조셉 스미스 이차 세대가 하나님의 능력으로 이 판들을 우리에게 나타내었노라. 우리의 이름으로 이를 세상에 알리노라.</p><p style="margin:0 0 5px;line-height:1.85">크리스찬 휘트머 · 야곱 휘트머 · 피터 휘트머 이차 세대 · 존 휘트머<br>히람 페이지 · 조셉 스미스 일세 · 하이럼 스미스 · 사무엘 해리슨 스미스</p>'
  },
  'eng':{
    'bom-wit3':'<p style="font-weight:700;font-size:1.1em;margin:0 0 14px;text-align:center">The Testimony of Three Witnesses</p><p style="margin:0 0 12px;text-indent:1em;line-height:1.85">Be it known unto all nations, kindreds, tongues, and people, unto whom this work shall come: That we, through the grace of God the Father, and our Lord Jesus Christ, have seen the plates which contain this record, which is a record of the people of Nephi, and also of the Lamanites, their brethren, and also of the people of Jared, who came from the tower of which hath been spoken. And we also know that they have been translated by the gift and power of God, for his voice hath declared it unto us; wherefore we know of a surety that the work is true.</p><p style="margin:0 0 12px;text-indent:1em;line-height:1.85">And we also testify that we have seen the engravings which are upon the plates; and they have been shown unto us by the power of God, and not of man. And we declare with words of soberness, that an angel of God came down from heaven, and he brought and laid before our eyes, that we beheld and saw the plates, and the engravings thereon; and we know that it is by the grace of God the Father, and our Lord Jesus Christ, that we beheld and bear record that these things are true. And it is marvellous in our eyes. Nevertheless, the voice of the Lord commanded us that we should bear record of it; wherefore, to be obedient unto the commandments of God, we bear testimony of these things. And we know that if we are faithful in Christ, we shall rid our garments of the blood of all men, and be found spotless before the judgment-seat of Christ, and shall dwell with him eternally in the heavens. And the honor be to the Father, and to the Son, and to the Holy Ghost, which is one God. Amen.</p><p style="margin:0 0 5px;line-height:1.85">Oliver Cowdery &nbsp; David Whitmer &nbsp; Martin Harris</p>',
    'bom-wit8':'<p style="font-weight:700;font-size:1.1em;margin:0 0 14px;text-align:center">The Testimony of Eight Witnesses</p><p style="margin:0 0 12px;text-indent:1em;line-height:1.85">Be it known unto all nations, kindreds, tongues, and people, unto whom this work shall come: That Joseph Smith, Jun., the translator of this work, has shown unto us the plates of which hath been spoken, which have the appearance of gold; and as many of the leaves as the said Smith has translated we did handle with our hands; and we also saw the engravings thereon, all of which has the appearance of ancient work, and of curious workmanship. And this we bear record with words of soberness, that the said Smith has shown unto us, for we have seen and hefted, and know of a surety that the said Smith has got the plates of which we have spoken. And we give our names unto the world, to witness unto the world that which we have seen. And we lie not, God bearing witness of it.</p><p style="margin:0 0 5px;line-height:1.85">Christian Whitmer &nbsp; Jacob Whitmer &nbsp; Peter Whitmer, Jun. &nbsp; John Whitmer<br>Hiram Page &nbsp; Joseph Smith, Sen. &nbsp; Hyrum Smith &nbsp; Samuel H. Smith</p>'
  }
};
function getBundledPage(pid,lang){
  var bl=BUNDLED_PAGES[lang];
  if(bl&&bl[pid])return bl[pid];
  var be=BUNDLED_PAGES['eng'];
  return(be&&be[pid])||null;
}

var BOM_FRONT=[
  {id:'bom-title',kor:'몰몬경 표제지',             eng:'Title Page',                   uri:'/scriptures/bofm/bofm-title'},
  {id:'bom-intro',kor:'소개',                      eng:'Introduction',                 uri:'/scriptures/bofm/introduction'},
  {id:'bom-brief',kor:'몰몬경에 대한 간단한 해설', eng:'A Brief Explanation',           uri:'/scriptures/bofm/explanation'},
  {id:'bom-wit3', kor:'세 증인의 증언',             eng:'Testimony of Three Witnesses', uri:'bundled:bom-wit3'},
  {id:'bom-wit8', kor:'여덟 증인의 증언',           eng:'Testimony of Eight Witnesses', uri:'bundled:bom-wit8'}
];
var DC_FRONT=[{id:'dc-intro',kor:'소개',eng:'Introduction',uri:'/scriptures/dc-testament/introduction'}];
var PGP_FRONT=[{id:'pgp-intro',kor:'소개',eng:'Introduction',uri:'/scriptures/pgp/introduction'}];

function buildBooks(){
  var sec=getSection(S.sid);
  if(!sec)return'<div class="s-head"><span class="s-head-title">오류</span></div>';
  var html='<div class="s-head">'+
    '<img src="'+SCR_IMG[S.sid]+'" style="width:36px;height:46px;object-fit:cover;border-radius:3px;flex-shrink:0" onerror="this.style.display=\'none\'">'+
    '<span class="s-head-title" style="margin-left:8px">'+eh(secName(sec))+'</span></div>';

  // List-style front matter rows (BOM with many items)
  function frontRows(items,label){
    html+='<div class="bl-section-hdr">'+label+'</div>';
    items.forEach(function(item){
      var _n=pickName(item.kor,item.eng);
      html+='<button class="bl-row" onclick="openStaticPage(\''+ea(item.uri)+'\',\''+ea(item.kor)+'\')">'+
        '<div><div class="bl-name">'+eh(_n.p)+'</div>'+(_n.s?'<div class="bl-eng">'+eh(_n.s)+'</div>':'')+'</div>'+
        '<div class="bl-arrow">›</div></button>';
    });
  }
  // Box/card style front matter (DC, PGP intro)
  function frontCards(items,label){
    html+='<div class="bl-section-hdr">'+label+'</div>';
    html+='<div style="padding:10px 12px 6px;display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px">';
    items.forEach(function(item){
      html+='<button onclick="openStaticPage(\''+ea(item.uri)+'\',\''+ea(item.kor)+'\')'+'" '+
        'style="background:var(--bg2);border:1.5px solid var(--primary2);border-radius:12px;padding:14px 12px;cursor:pointer;'+
        'display:flex;flex-direction:column;align-items:flex-start;gap:4px;text-align:left;width:100%">';
      var _n=pickName(item.kor,item.eng);
      html+='<div style="font-size:13px;font-weight:700;color:var(--primary2)">📖</div>';
      html+='<div style="font-size:14px;font-weight:700;color:var(--fg)">'+eh(_n.p)+'</div>';
      html+=_n.s?'<div style="font-size:11px;color:var(--fg3)">'+eh(_n.s)+'</div>':'';
      html+='</button>';
    });
    html+='</div>';
  }
  if(S.sid==='bom') frontCards(BOM_FRONT,t('front_matter'));
  if(S.sid==='dc')  frontCards(DC_FRONT,t('intro_word'));
  if(S.sid==='pgp') frontCards(PGP_FRONT,t('intro_word'));

  var bookLabel=(S.sid==='dc')?t('dc_sections'):t('books_word');
  if(S.sid==='bom'||S.sid==='dc'||S.sid==='pgp')
    html+='<div class="bl-section-hdr">'+bookLabel+'</div>';

  // Book grid (box style)
  html+='<div class="bk-grid">';
  (sec.books||[]).forEach(function(b){
    var bn=bookNames(b);
    var cc=b.chapter_count||1;
    html+='<button class="bk-card" onclick="selBook(\''+ea(b.id)+'\')">'+
      '<div class="bk-name">'+eh(bn.p)+'</div>'+
      (bn.s?'<div class="bk-eng">'+eh(bn.s)+'</div>':'')+
      (cc>1?'<div class="bk-cnt">'+cc+t('ch_unit')+'</div>':'')+
      '</button>';
  });
  html+='</div>';
  return html;
}

window.selBook=function(bid){
  var sec=getSection(S.sid);if(!sec)return;
  var b=(sec.books||[]).find(function(x){return x.id===bid;});if(!b)return;
  S.book=b;
  var cc=b.chapter_count||1;
  if(cc<=1){
    S.ch=(b.id==='od/1'||b.id==='od/2')?b.id:1;
    navTo('vsel');
  }else{navTo('chapters');}
};

// ============================================================
// CHAPTERS
// ============================================================
function buildChs(){
  if(!S.book)return'<div class="empty"><div class="empty-icon">⚠️</div></div>';
  var b=S.book,bn=getBN(b),nch=b.chapter_count||1;
  var html='<div class="s-head"><span class="s-head-title">'+eh(bookNames(b).p)+'</span></div>';
  html+='<div class="ch-grid">';
  for(var i=1;i<=nch;i++){
    var hasBm=S.bm.some(function(bm){return bm.bid===b.id&&String(bm.ch)===String(i);});
    html+='<button class="ch-btn'+(hasBm?' bm':'')+'" onclick="selCh('+i+')">'+i+'</button>';
  }
  return html+'</div>';
}
window.selCh=function(ch){S.ch=ch;navTo('vsel');};

// ============================================================
// VERSE SELECTION
// ============================================================
function buildVsel(){
  if(!S.book)return'<div class="empty"><div class="empty-icon">⚠️</div></div>';
  var b=S.book,bn=getBN(b);
  var lbl=getChTitle();
  var raw=getRawChapter(b.id,S.ch);
  var cnt=Math.max((raw.kor||[]).length,(raw.eng||[]).length);
  var html='<div class="s-head"><span class="s-head-title">'+eh(lbl)+'</span></div>';
  html+='<div style="padding:12px 16px 4px">'+
    '<button onclick="selVerse(0)" style="width:100%;padding:12px;background:var(--primary);color:#fff;border:none;border-radius:9px;font-size:15px;font-weight:700;cursor:pointer">'+t('read_all')+'</button>'+
    '</div>';
  if(cnt>0){
    html+='<div style="padding:6px 16px 4px;font-size:12px;color:var(--fg3)">절 바로 이동</div>';
    html+='<div class="ch-grid">';
    for(var i=1;i<=cnt;i++){
      html+='<button class="ch-btn" onclick="selVerse('+i+')">'+i+'</button>';
    }
    html+='</div>';
  }
  return html;
}
window.selVerse=function(vn){
  var bid=S.book.id,ch=S.ch;
  // Show loading indicator for non-bundled languages
  var raw=getRawChapter(bid,ch);
  var ck1=S.st.l1+'__'+bid+'__'+ch;
  var ck2=S.st.l2+'__'+bid+'__'+ch;
  var needFetch=(S.st.l1!=='kor'&&S.st.l1!=='eng'&&!raw[S.st.l1]&&!S.lc[ck1])||
    (S.st.sl2&&S.st.l2!=='kor'&&S.st.l2!=='eng'&&!raw[S.st.l2]&&!S.lc[ck2]);
  if(needFetch){
    var sc=document.getElementById('screen');
    if(sc)sc.innerHTML='<div class="loading" style="flex-direction:column;gap:12px;padding-top:60px"><div style="font-size:32px">🌐</div><div style="font-size:14px">언어 데이터 불러오는 중...<br><small style="color:var(--fg3)">교회 공식 사이트 접속 중</small></div></div>';
  }
  doLoadCD(bid,ch,function(v1,v2){
    S.vs={l1:v1,l2:v2};
    addRC(S.sid,S.book,ch);
    navTo('cv');
    if(vn>0){
      setTimeout(function(){
        var el=document.getElementById('v'+vn);
        scrollToVerse(vn,false);
      },350);
    }
  });
};

// ============================================================
// STATIC PAGE (BOM/DC/PGP intro, witnesses, etc.)
// ============================================================
window.openStaticPage=function(uri,title){
  S.sp={uri:uri,title:title,content:null};navTo('static-page');
};
function buildStaticPage(){
  return'<div class="s-head"><span class="s-head-title">'+eh(S.sp.title)+'</span></div>'+
    '<div id="sp-body"><div class="loading">불러오는 중...</div></div>';
}
function loadStaticPage(){
  if(!S.sp.uri)return;
  var l1=S.st.l1,l2=S.st.l2;
  var showL2=S.st.sl2&&l2&&l2!==l1;
  var API='https://www.churchofjesuschrist.org/study/api/v3/language-pages/type/content?lang=';
  var area=document.getElementById('sp-body');
  var ff=getFontCss();
  var uri=S.sp.uri;
  var pid=getPageId(uri);
  var isBundled=uri.indexOf('bundled:')===0;

  if(isBundled){
    // Bundled pages: interleave bundled paragraphs per-paragraph
    var h1b=getBundledPage(pid,l1)||getBundledPage(pid,'kor')||'';
    var h2b=showL2?(getBundledPage(pid,l2)||getBundledPage(pid,'eng')||''):'';
    if(area){
      // Parse bundled HTML into paragraphs for interleaving
      var pars1=parseBundledParas(h1b);
      var pars2=showL2?parseBundledParas(h2b):[];
      renderStaticArea(area,pars1,pars2,showL2&&pars2.length>0,ff);
    }
    return;
  }

  function fetchParas(lang){
    return new Promise(function(resolve){
      xhrJson(API+lang+'&uri='+encodeURIComponent(uri),function(d){
        var body=(d&&d.content&&d.content.body)||'';
        resolve(parseStaticParas(body));
      },function(){resolve([]);});
    });
  }

  var tasks=[fetchParas(l1)];
  if(showL2)tasks.push(fetchParas(l2));

  Promise.all(tasks).then(function(results){
    var paras1=results[0]||[];
    var paras2=showL2?(results[1]||[]):[];
    if(!paras1.length){
      var fallbackLang=(l1!=='kor'&&l1!=='eng')?'kor':((l2&&l2!=='kor'&&l2!=='eng')?'eng':'eng');
      fetchParas(fallbackLang).then(function(pe){
        if(area)renderStaticArea(area,pe,[],false,ff);
      }).catch(function(){
        if(area)area.innerHTML='<div class="empty"><div class="empty-icon">🌐</div>'+'<div class="empty-txt">'+t('need_net')+'</div></div>';
      });
      return;
    }
    if(area)renderStaticArea(area,paras1,paras2,showL2&&paras2.length>0,ff);
  }).catch(function(){
    if(area)area.innerHTML='<div class="empty"><div class="empty-icon">🌐</div><div class="empty-txt">'+t('need_net')+'</div></div>';
  });
}

// Parse simple bundled HTML into paragraphs
function parseBundledParas(html){
  var paras=[];
  if(!html)return paras;
  try{
    var wrap=document.createElement('div');
    wrap.innerHTML=html;
    wrap.querySelectorAll('p').forEach(function(p){
      var style=p.getAttribute('style')||'';
      var tag=style.indexOf('font-weight:700')>=0?'h2':'p';
      paras.push({tag:tag,text:p.textContent.trim()});
    });
  }catch(e){}
  return paras;
}

function renderStaticArea(area,paras1,paras2,showL2,ff){
  var fs=S.st.fs;
  if(!paras1||!paras1.length){
    area.innerHTML='<div class="empty"><div class="empty-icon">📄</div><div class="empty-txt">'+t('no_content')+'</div></div>';
    return;
  }
  // 박스/카드 스타일로 표시
  var html='<div style="padding:12px;font-family:'+ff+'">';
  html+='<div style="background:var(--bg2);border-radius:12px;border:1px solid var(--border);box-shadow:0 2px 10px rgba(0,0,0,.08);overflow:hidden">';
  var max=paras1.length;
  for(var i=0;i<max;i++){
    var p1=paras1[i];
    var isFirst=(i===0);
    html+='<div style="padding:14px 16px 0'+(isFirst?';border-top:none':';border-top:1px solid var(--border)')+'">';
    html+=parasToHtml([p1],fs,false);
    if(showL2&&paras2[i]){
      html+='<div style="border-left:3px solid var(--accent);padding:8px 0 8px 12px;margin:0 0 14px;background:var(--bg3);border-radius:0 6px 6px 0">';
      html+=parasToHtml([paras2[i]],Math.max(12,fs-2),true);
      html+='</div>';
    }
    html+='</div>';
  }
  if(showL2&&paras2.length>max){
    for(var j=max;j<paras2.length;j++){
      html+='<div style="padding:0 16px">';
      html+='<div style="border-left:3px solid var(--accent);padding:8px 0 8px 12px;margin:0 0 14px;background:var(--bg3);border-radius:0 6px 6px 0">';
      html+=parasToHtml([paras2[j]],Math.max(12,fs-2),true);
      html+='</div></div>';
    }
  }
  html+='<div style="height:12px"></div>';
  html+='</div></div>';
  area.innerHTML=html;
}


function getPageId(uri){
  // Extract page id from uri or bundled uri
  if(!uri)return '';
  if(uri.indexOf('bundled:')===0)return uri.slice(8);
  var parts=uri.split('/');
  return parts[parts.length-1]||'';
}
// Parse HTML body into paragraph objects for interleaving
function parseStaticParas(bodyHtml){
  var paras=[];
  if(!bodyHtml||typeof bodyHtml!=='string')return paras;
  if(bodyHtml.indexOf('<nav')>=0&&bodyHtml.length>10000)return paras;
  try{
    var wrap=document.createElement('div');
    wrap.innerHTML=bodyHtml;
    wrap.querySelectorAll('sup,.verse-number,.study-note-ref sup,script,style,nav,.manifest,rt').forEach(function(e){e.remove();});
    var h1=wrap.querySelector('h1');
    if(h1){var t=h1.textContent.trim();if(t)paras.push({tag:'h1',text:t});}
    var seenSub={};
    wrap.querySelectorAll('p.subtitle,p.intro,.subtitle,.intro').forEach(function(p){
      var t=p.textContent.trim();if(!t||seenSub[t])return;seenSub[t]=1;
      paras.push({tag:'sub',text:t});
    });
    var bb=wrap.querySelector('.body-block')||wrap;
    var seenTxt={};
    paras.forEach(function(p){seenTxt[p.text]=1;});
    bb.querySelectorAll('h2,h3,h4,p').forEach(function(el){
      if(el.closest&&el.closest('.manifest,.toc'))return;
      var t=el.textContent.trim();if(!t||seenTxt[t])return;
      var cls=el.className||'';
      if(cls.indexOf('subtitle')>=0||cls.indexOf('intro')>=0)return;
      seenTxt[t]=1;
      paras.push({tag:el.tagName.toLowerCase(),text:t});
    });
  }catch(e){}
  return paras;
}
// Legacy wrapper: returns HTML string (used internally where needed)
function parseStaticContent(d){
  try{
    var bodyHtml=(d.content&&d.content.body)||'';
    var paras=parseStaticParas(bodyHtml);
    if(!paras.length)return null;
    return parasToHtml(paras,S.st.fs,false);
  }catch(e){return null;}
}
function parasToHtml(paras,fs,italic){
  var html='';
  paras.forEach(function(p){
    if(p.tag==='h1')html+='<p style="font-weight:700;font-size:'+(fs+2)+'px;margin:0 0 14px;text-align:center;color:var(--fg)">'+eh(p.text)+'</p>';
    else if(p.tag==='sub')html+='<p style="font-size:'+(fs-1)+'px;margin:0 0 10px;text-align:center;font-style:italic;color:var(--fg2)">'+eh(p.text)+'</p>';
    else if(p.tag==='h2'||p.tag==='h3')html+='<p style="font-weight:700;font-size:'+fs+'px;margin:14px 0 6px;color:var(--fg)">'+eh(p.text)+'</p>';
    else html+='<p style="font-size:'+fs+'px;margin:0 0 12px;text-indent:1em;line-height:1.85'+(italic?';font-style:italic;color:var(--fg2)':';color:var(--fg)')+'">'+eh(p.text)+'</p>';
  });
  return html;
}

// ============================================================
// SCRIPTURE DATA
// ============================================================
function doLoadCD(bid,ch,cb){
  var raw=getRawChapter(bid,ch);
  var l1=S.st.l1,l2=S.st.l2;
  // Bible(구약·신약)은 추가언어 지원 안됨
  var isBibleSec=false;
  // bundled: kor and eng are in data.js
  var bv1=raw[l1]||null;
  var bv2=raw[l2]||null;
  if(!bv1&&!bv2&&l1===l2){
    var ck0=l1+'__'+bid+'__'+ch;
    if(S.lc[ck0]){cb(S.lc[ck0],[]);return;}
    fetchLang(l1,bid,ch).then(function(d){if(d&&d.length)lcPut(ck0,d);cb(S.lc[ck0]||[],[]);}).catch(function(){cb([],[]);});
    return;
  }
  var need1=!bv1,need2=!bv2&&S.st.sl2&&l2!==l1&&!isBibleSec;
  if(!need1&&!need2){cb(bv1||[],bv2||[]);return;}

  var ck1=l1+'__'+bid+'__'+ch;
  var ck2=l2+'__'+bid+'__'+ch;
  var proms=[];
  if(need1&&!S.lc[ck1])proms.push(
    fetchLang(l1,bid,ch).then(function(d){if(d&&d.length)lcPut(ck1,d);})
  );
  if(need2&&!S.lc[ck2])proms.push(
    fetchLang(l2,bid,ch).then(function(d){if(d&&d.length)lcPut(ck2,d);})
  );

  Promise.all(proms).then(function(){
    var v1=bv1||(S.lc[ck1])||[];
    var v2=bv2||(S.lc[ck2])||[];
    cb(v1,v2);
  }).catch(function(){cb(bv1||[],bv2||[]);});
}

function getRawChapter(bid,ch){
  var db=window.SCRIPTURE_DB;
  if(!db)return{kor:[],eng:[]};
  if(bid==='od/1')return(db['dc']&&db['dc']['od/1'])||{kor:[],eng:[]};
  if(bid==='od/2')return(db['dc']&&db['dc']['od/2'])||{kor:[],eng:[]};
  if(bid==='dc')return(db['dc']&&db['dc'][String(ch)])||{kor:[],eng:[]};
  return(db[bid]&&db[bid][String(ch)])||{kor:[],eng:[]};
}

function getSecURI(bid){
  var ot=['gen','ex','lev','num','deut','josh','judg','ruth','1-sam','2-sam','1-kgs','2-kgs','1-chr','2-chr','ezra','neh','esth','job','ps','prov','eccl','song','isa','jer','lam','ezek','dan','hosea','joel','amos','obad','jonah','micah','nahum','hab','zeph','hag','zech','mal'];
  var nt=['matt','mark','luke','john','acts','rom','1-cor','2-cor','gal','eph','philip','col','1-thes','2-thes','1-tim','2-tim','titus','philem','heb','james','1-pet','2-pet','1-jn','2-jn','3-jn','jude','rev'];
  var bom=['1-ne','2-ne','jacob','enos','jarom','omni','w-of-m','mosiah','alma','hel','3-ne','4-ne','morm','ether','moro'];
  var pgp=['moses','abr','js-m','js-h','a-of-f'];
  if(ot.indexOf(bid)>=0)return'ot';
  if(nt.indexOf(bid)>=0)return'nt';
  if(bom.indexOf(bid)>=0)return'bofm';
  if(bid==='dc'||bid==='od/1'||bid==='od/2')return'dc-testament';
  if(pgp.indexOf(bid)>=0)return'pgp';
  return'ot';
}
// XHR wrapper (more reliable than fetch() in Android WebView file://)
function xhrJson(url,cb,errCb){
  try{
    var xhr=new XMLHttpRequest();
    xhr.open('GET',url,true);
    xhr.timeout=15000;
    xhr.onreadystatechange=function(){
      if(xhr.readyState!==4)return;
      if(xhr.status>=200&&xhr.status<300){
        try{var d=typeof xhr.response==='object'&&xhr.response?xhr.response:JSON.parse(xhr.responseText);cb(d);}
        catch(e){errCb&&errCb(e);}
      }else{errCb&&errCb(new Error('HTTP '+xhr.status));}
    };
    xhr.ontimeout=function(){errCb&&errCb(new Error('timeout'));};
    xhr.onerror=function(){errCb&&errCb(new Error('network'));};
    xhr.responseType='json';
    xhr.send();
  }catch(e){errCb&&errCb(e);}
}
function fetchLang(lang,bid,ch){
  var sec=getSecURI(bid);
  var uri;
  if(bid==='od/1')uri='/scriptures/dc-testament/od/1';
  else if(bid==='od/2')uri='/scriptures/dc-testament/od/2';
  else if(bid==='dc')uri='/scriptures/dc-testament/dc/'+ch;
  else uri='/scriptures/'+sec+'/'+bid+'/'+ch;
  var url='https://www.churchofjesuschrist.org/study/api/v3/language-pages/type/content?lang='+lang+'&uri='+encodeURIComponent(uri);
  return new Promise(function(resolve){
    xhrJson(url,function(d){resolve(parseApiVs(d,lang));},function(){resolve([]);});
  });
}
function parseApiVs(d,lang){
  // API returns content.body as an HTML string (not a blocks array)
  var vs=[];
  try{
    var bodyHtml=(d.content&&d.content.body)||'';
    if(typeof bodyHtml!=='string'||!bodyHtml)return vs;
    var wrap=document.createElement('div');
    wrap.innerHTML=bodyHtml;
    // Remove study note refs, verse numbers, phonetic ruby tags' rt
    wrap.querySelectorAll('sup,span.verse-number,.verse-number,script,style,.study-note-ref sup').forEach(function(e){e.remove();});
    // Also remove <rt> (Japanese phonetic) to get clean text
    wrap.querySelectorAll('rt').forEach(function(e){e.remove();});
    // Verses are <p class="verse" id="pN"> or just <p id="pN">
    var pVerse=wrap.querySelectorAll('p[id^="p"]');
    pVerse.forEach(function(p){
      var id=p.getAttribute('id')||'';
      if(!/^p\d+$/.test(id))return; // skip intro/subtitle (id="intro1","subtitle1")
      var t=p.textContent.trim();
      // Remove leading verse number digits
      // Strip leading verse number in any script (Arabic, Asian, etc.)
      t=t.replace(/^[\s\u0660-\u0669\u06F0-\u06F9\d０-９\uFF10-\uFF19]+[\s.·、。,:：\u3002\uFF0C]*/,'').trim();
      if(t&&t.length>1)vs.push(t);
    });
    // Fallback 1: body-block 내 p 태그
    if(!vs.length){
      var bb=wrap.querySelector('.body-block')||wrap.querySelector('[class*="body"]');
      if(bb){
        bb.querySelectorAll('p').forEach(function(p){
          var id2=p.getAttribute('id')||'';
          if(id2&&(id2.indexOf('intro')>=0||id2.indexOf('subtitle')>=0||id2.indexOf('title')>=0))return;
          var t=p.textContent.replace(/^[\s\d０-９\uFF10-\uFF19]+[\s.、。\u3002]*/,'').trim();
          if(t&&t.length>3)vs.push(t);
        });
      }
    }
    // Fallback 2: 모든 p 태그 (최후 수단)
    if(!vs.length){
      wrap.querySelectorAll('p').forEach(function(p){
        var t=p.textContent.trim();
        if(t&&t.length>10&&!p.closest('nav')&&!p.closest('.manifest'))vs.push(t);
      });
    }
  }catch(e){}
  return vs;
}

// ============================================================
// CHAPTER VIEW
// ============================================================
function getChTitle(){
  if(!S.book)return'';
  var b=S.book,bn=getBN(b);
  var ui=S.st.l1||'kor';var nm=(ui==='kor')?bn.kor:(bn.eng||bn.kor);
  if(b.id==='od/1')return t('od1');
  if(b.id==='od/2')return t('od2');
  if((b.chapter_count||1)>1)return nm+' '+S.ch+(ui==='kor'?'장':' ch');
  return nm;
}

// ── Partial Highlight rendering ──
function renderVersePHL(text,phMap){
  if(!phMap||!Object.keys(phMap).length)return eh(text);
  var words=text.split(' ');
  return words.map(function(w,i){
    var c=phMap[String(i)];
    if(c&&HLC[c])return'<span style="background:'+HLC[c]+';border-radius:2px;padding:0 1px">'+eh(w)+'</span>';
    return eh(w);
  }).join(' ');
}

function buildCV(){
  var lbl=getChTitle();
  showTopBar(lbl);
  var l1=S.vs.l1||[],l2=S.vs.l2||[];
  var max=Math.max(l1.length,l2.length);
  var ff=getFontCss();
  var isOD=(S.book&&(S.book.id==='od/1'||S.book.id==='od/2'||S.book.id==='a-of-f'));
  var isBible=false;
  if(!max)return'<div class="empty"><div class="empty-icon">📖</div><div class="empty-txt">내용이 없습니다'+(S.st.l1!=='kor'&&S.st.l1!=='eng'?'<br><small>인터넷 연결 확인</small>':'')+'</div></div>';
  var html='<div id="vc" style="font-family:'+ff+'"><div id="audio-box"></div><div id="ch-head"></div>';

  if(isOD){
    // OD/신앙개조: 단락별 주언어 → 추가언어 인터리빙
    html+='<div style="padding:14px 16px 24px">';
    var odMax=Math.max(l1.length,l2.length);
    for(var oi=0;oi<odMax;oi++){
      if(l1[oi]){
        html+='<p style="font-size:'+S.st.fs+'px;line-height:1.85;color:var(--fg);margin:0 0 6px;text-indent:1em">'+eh(l1[oi])+'</p>';
      }
      if(S.st.sl2&&!isBible&&l2[oi]){
        html+='<div style="border-left:3px solid var(--accent);padding:4px 0 4px 12px;margin:0 0 16px;background:var(--bg2);border-radius:0 6px 6px 0">';
        html+='<p style="font-size:'+Math.max(12,S.st.fs-2)+'px;line-height:1.85;color:var(--fg2);font-style:italic;margin:0">'+eh(l2[oi])+'</p>';
        html+='</div>';
      }else if(l1[oi]){
        html+='<div style="height:10px"></div>';
      }
    }
    html+='</div>';
  } else {
  for(var i=0;i<max;i++){
    var vk=mkVK(S.book.id,S.ch,i+1);
    var hlc=S.hl[vk]?'hl-'+S.hl[vk]:'';
    var hasNote=!!S.nt[vk];
    var phlData=S.phl[vk]||null;
    var hasPHL=!!(phlData&&(Object.keys(phlData.l1||{}).length||Object.keys(phlData.l2||{}).length));
    var ndClr=hasNote?(HLC[S.nt[vk].c]||'transparent'):'transparent';
    html+='<div class="vi '+hlc+(hasNote?' has-note':'')+(hasPHL?' has-phl':'')+'" id="v'+(i+1)+'" onclick="vpOpen(\''+ea(vk)+'\','+(i+1)+',event)">';
    html+='<div class="vnum" onclick="event.stopPropagation();vpOpen(\''+ea(vk)+'\','+(i+1)+',event)">'+(i+1)+'</div>';
    var isBM=S.bm.some(function(b){return b.k===vk;});
    var bmIcon=isBM?'<span title="bookmark" style="font-size:13px;margin-left:3px;opacity:.85">🔖</span>':'';
    var ntIcon=hasNote?'<span title="note" style="font-size:13px;margin-left:2px;opacity:.85;background:'+ndClr+';border-radius:2px;padding:0 2px">📝</span>':'';
    html+='<div class="vtexts" style="-webkit-user-select:text;user-select:text">';
    if(l1[i]){
      var phL1=phlData&&phlData.l1;
      html+='<div class="vt1" style="font-size:'+S.st.fs+'px">'+(phL1?renderVersePHL(cleanVerse(l1[i]),phL1):eh(cleanVerse(l1[i])))+bmIcon+ntIcon+'</div>';
    if(S.st.sl2&&!isBible&&l2[i]){
      var phL2=phlData&&phlData.l2;
     html+='<div class="vt2" style="font-size:'+Math.max(12,S.st.fs-2)+'px">'+(phL2?renderVersePHL(cleanVerse(l2[i]),phL2):eh(cleanVerse(l2[i])))+'</div>';
    }
    html+='</div></div>';
  }
  } // end isOD else
  // Show retry button when L2 language failed to load
  if(S.st.sl2&&!isBible&&l2!==S.vs.l1&&S.st.l2!==S.st.l1&&l2.length===0&&max>0){
    var l2name=(LANGS.find(function(x){return x.c===S.st.l2;})||{n:S.st.l2}).n;
    html+='<div style="text-align:center;padding:10px 16px;border-top:1px solid var(--border)">'
      +'<div style="font-size:12px;color:var(--fg3);margin-bottom:6px">'+l2name+' '+t('need_net')+'</div>'
      +'<button onclick="reloadL2()" style="padding:8px 20px;background:var(--primary2);color:#fff;border:none;border-radius:8px;font-size:13px;cursor:pointer">🔄 '+l2name+' 다시 불러오기</button>'
      +'</div>';
  }
  var prevOk=canPrev(),nextOk=canNext();
  html+='<div class="ch-nav-row">'+
    '<button class="ch-nav-btn" onclick="prevCh()" style="opacity:'+(prevOk?'1':'0.3')+';cursor:'+(prevOk?'pointer':'default')+'">'+t('prev')+'</button>'+
    '<span style="font-size:12px;color:var(--fg3)">'+lbl+'</span>'+
    '<button class="ch-nav-btn" onclick="nextCh()" style="opacity:'+(nextOk?'1':'0.3')+';cursor:'+(nextOk?'pointer':'default')+'">'+t('next')+'</button>'+
    '</div></div>';
  return html;
}

function mkVK(bid,ch,vn){return bid+'__'+ch+'__'+vn;}

// 북마크·노트 즉시 반영 — 절 텍스트 DOM 갱신
function refreshVerseIcons(vk,vn){
  var el=document.getElementById('v'+vn);
  if(!el||!S.vs||!S.vs.l1)return;
  var t1=S.vs.l1[vn-1]||'',t2=(S.vs.l2&&S.vs.l2[vn-1])||'';
  var phlData=S.phl[vk]||null;
  var phL1=phlData&&phlData.l1,phL2=phlData&&phlData.l2;
  var isBM=S.bm.some(function(b){return b.k===vk;});
  var hasNote=!!S.nt[vk];
  var bmIcon=isBM?'<span style="font-size:13px;margin-left:3px;opacity:.85">🔖</span>':'';
  var ntIcon=hasNote?'<span style="font-size:13px;margin-left:2px;opacity:.85;background:'+(S.nt[vk]?(HLC[S.nt[vk].c]||'transparent'):'transparent')+';border-radius:2px;padding:0 2px">📝</span>':'';
  var hlc=S.hl[vk]?'hl-'+S.hl[vk]:'';
  var hasPHL=!!(phlData&&(Object.keys(phlData.l1||{}).length||Object.keys(phlData.l2||{}).length));
  el.className='vi '+hlc+(hasNote?' has-note':'')+(hasPHL?' has-phl':'');
  var vtxts=el.querySelector('.vtexts');
  if(vtxts&&t1){
    var isBibleCV=false;
    var h='<div class="vt1" style="font-size:'+S.st.fs+'px">'+(phL1?renderVersePHL(t1,phL1):eh(t1))+bmIcon+ntIcon+'</div>';
    if(S.st.sl2&&!isBibleCV&&t2)h+='<div class="vt2" style="font-size:'+Math.max(12,S.st.fs-2)+'px">'+(phL2?renderVersePHL(t2,phL2):eh(t2))+'</div>';
    vtxts.innerHTML=h;
  }
}
function canPrev(){if(!S.book)return false;var cc=S.book.chapter_count||1;return cc>1&&S.ch>1;}
function canNext(){if(!S.book)return false;var cc=S.book.chapter_count||1;return cc>1&&S.ch<cc;}

function initCV(){
  var vc=document.getElementById('vc');if(!vc)return;
  var sx=0,sy=0,locked=false;
  vc.addEventListener('touchstart',function(e){if(e.touches.length===1){sx=e.touches[0].clientX;sy=e.touches[0].clientY;locked=false;}},{passive:true});
  vc.addEventListener('touchend',function(e){
    if(e.changedTouches.length===1&&!locked){
      var dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;
      if(Math.abs(dx)>80&&Math.abs(dx)>Math.abs(dy)*1.5){dx<0?nextCh():prevCh();}
    }
  },{passive:true});
  var pd=0,pfs=S.st.fs;
  vc.addEventListener('touchstart',function(e){if(e.touches.length===2){pd=td(e.touches[0],e.touches[1]);pfs=S.st.fs;locked=true;}},{passive:true});
  vc.addEventListener('touchmove',function(e){
    if(e.touches.length===2&&pd>0){
      var ns=Math.max(12,Math.min(50,Math.round(pfs*td(e.touches[0],e.touches[1])/pd)));
      if(ns!==S.st.fs){S.st.fs=ns;applyFsDOM();}
    }
  },{passive:true});
  vc.addEventListener('touchend',function(e){if(e.touches.length<2&&pd>0){savST();pd=0;}},{passive:true});

  // ── Text selection toolbar ──
  function showSelBar(){
    var sel=window.getSelection();
    if(!sel||sel.isCollapsed||!sel.toString().trim()){hideSelBar();return;}
    var selTxt=sel.toString().trim();
    var bar=document.getElementById('sel-bar');
    if(!bar)return;
    bar.style.display='flex';
    bar.querySelector('[data-act="copy"]').onclick=function(){
      try{navigator.clipboard.writeText(selTxt);}catch(e){
        var ta=document.createElement('textarea');ta.value=selTxt;
        document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);
      }
      showToast(t('copied'));sel.removeAllRanges();hideSelBar();
    };
    bar.querySelector('[data-act="share"]').onclick=function(){
      shareText(selTxt);sel.removeAllRanges();hideSelBar();
    };
  }
  function hideSelBar(){var b=document.getElementById('sel-bar');if(b)b.style.display='none';}
  if(window._cvSelHandler){document.removeEventListener('selectionchange',window._cvSelHandler);}
  window._cvSelHandler=function(){setTimeout(showSelBar,120);};
  document.addEventListener('selectionchange',window._cvSelHandler);
  document.getElementById('sel-bar').querySelector('[data-act="close"]').onclick=function(){
    window.getSelection().removeAllRanges();hideSelBar();
  };
  if(window.loadChapterMeta)loadChapterMeta();
}
function td(a,b){return Math.sqrt(Math.pow(b.clientX-a.clientX,2)+Math.pow(b.clientY-a.clientY,2));}
// Safe scroll: only moves #screen, never the body/window (fixes top-bar disappearing in WebView)
function scrollToVerse(vn,center){
  var el=document.getElementById('v'+vn);if(!el)return;
  var sc=document.getElementById('screen');if(!sc)return;
  var elR=el.getBoundingClientRect(),scR=sc.getBoundingClientRect();
  var diff=elR.top-scR.top;
  if(center){diff-=(scR.height/2)-(elR.height/2);}
  sc.scrollTop+=diff-6;
}

function chNav(dir){
  if(!canNext()&&dir>0)return;if(!canPrev()&&dir<0)return;
  var nc=parseInt(S.ch)+dir;S.ch=nc;
  doLoadCD(S.book.id,nc,function(v1,v2){
    S.vs={l1:v1,l2:v2};addRC(S.sid,S.book,nc);
    var tb=document.getElementById('top-bar-title');if(tb)tb.textContent=getChTitle();
    var sc=document.getElementById('screen');sc.innerHTML=buildCV();initCV();sc.scrollTop=0;
  });
}
window.nextCh=function(){chNav(1);};
window.prevCh=function(){chNav(-1);};

// ============================================================
// VERSE POPUP
// ============================================================
window.vpOpen=function(vk,vn,e){
  S.pvk=vk;S.pvn=vn;
  var bn=S.book?getBN(S.book):{kor:''};
  var refEl=document.getElementById('vp-ref');if(refEl)refEl.textContent=bn.kor+' '+S.ch+':'+vn;
  var vp=document.getElementById('vp');if(!vp)return;
  vp.classList.add('show');document.getElementById('vp-bg').classList.add('show');
  var cx=(e&&e.clientX)||window.innerWidth/2,cy=(e&&e.clientY)||window.innerHeight/2;
  var pw=260,ww=window.innerWidth;
  var lft=Math.max(8,Math.min(cx-pw/2,ww-pw-8));
  var top=cy-100;if(top<56)top=cy+14;if(top+100>window.innerHeight-60)top=window.innerHeight-165;
  vp.style.left=lft+'px';vp.style.top=top+'px';
};
window.closeVP=function(){
  var vp=document.getElementById('vp');if(vp)vp.classList.remove('show');
  var cp=document.getElementById('cp');if(cp)cp.classList.remove('show');
  var bg=document.getElementById('vp-bg');if(bg)bg.classList.remove('show');
};
window.vpHL=function(){
  var vp=document.getElementById('vp'),cp=document.getElementById('cp');if(!vp||!cp)return;
  var r=vp.getBoundingClientRect();cp.style.left=r.left+'px';cp.style.top=(r.bottom+6)+'px';
  cp.classList.add('show');vp.classList.remove('show');
};
window.doHL=function(c){
  if(!S.pvk)return;
  if(c==='')delete S.hl[S.pvk];else S.hl[S.pvk]=c;
  savHL();
  var el=document.getElementById('v'+S.pvn);
  if(el){
    var phlData=S.phl[S.pvk]||null;
    var hasPHL=!!(phlData&&(Object.keys(phlData.l1||{}).length||Object.keys(phlData.l2||{}).length));
    el.className='vi'+(c?' hl-'+c:'')+(S.nt[S.pvk]?' has-note':'')+(hasPHL?' has-phl':'');
  }
  closeVP();
};
window.vpNote=function(){
  closeVP();
  var ex=S.nt[S.pvk];
  var ta=document.getElementById('nm-ta');if(ta)ta.value=ex?ex.text:'';
  selNC(ex?(ex.c||'y'):'y',document.getElementById('nc-'+(ex?(ex.c||'y'):'y')));
  var nm=document.getElementById('nm-bg');if(nm)nm.classList.add('show');
};
window.vpBM=function(){
  if(!S.pvk)return;
  var idx=S.bm.findIndex(function(x){return x.k===S.pvk;});
  if(idx>=0){S.bm.splice(idx,1);showToast(t('bm_removed'));}
  else{S.bm.push({k:S.pvk,bid:S.book?S.book.id:'',ch:S.ch,vn:S.pvn,bname:S.book?getBN(S.book).kor:'',sid:S.sid,ts:Date.now()});showToast(t('bm_added'));}
  savBM();closeVP();
  refreshVerseIcons(S.pvk,S.pvn);
};
function shareText(txt){
  if(window.Android&&window.Android.share)window.Android.share(txt);
  else if(navigator.share)navigator.share({text:txt}).catch(function(){});
  else{try{navigator.clipboard.writeText(txt);}catch(e){}showToast(t('share_copied'));}
}
window.vpShare=function(){
  if(!S.book)return;closeVP();
  var bn=getBN(S.book);
  var ref=bn.kor+' '+S.ch+':'+S.pvn;
  var t1=S.vs.l1[S.pvn-1]||'',t2=S.st.sl2?(S.vs.l2[S.pvn-1]||''):'';
  var txt=ref+'\n\n'+t1+(t2?'\n\n'+t2:'');
  if(navigator.share)navigator.share({title:ref,text:txt});
  else if(window.Android&&window.Android.share)window.Android.share(txt);
  else showToast(t('share_unsupported'));
};
window.vpPartial=function(){
  if(!S.pvk)return;
  closeVP();
  var vn=S.pvn;
  var t1=S.vs.l1[vn-1]||'';
  var t2=S.vs.l2[vn-1]||'';
  var ex=S.phl[S.pvk]||{l1:{},l2:{}};
  S.phlSel={vk:S.pvk,vn:vn,t1:t1,t2:t2,l1:Object.assign({},ex.l1||{}),l2:Object.assign({},ex.l2||{}),c:'y'};
  showPHLModal();
};

// ============================================================
// PARTIAL HIGHLIGHT MODAL
// ============================================================
function showPHLModal(){
  var ps=S.phlSel;
  var bn=S.book?getBN(S.book):{kor:''};
  var ref=bn.kor+' '+S.ch+':'+ps.vn;

  function wordsHTML(text,phMap,lang){
    if(!text)return'';
    var words=text.split(' ');
    var h='<div style="line-height:2.2;padding:8px 0;">';
    words.forEach(function(w,i){
      var c=phMap[String(i)];
      var bg=c&&HLC[c]?HLC[c]:'transparent';
      var border=c?'1px solid '+HLC[c]:'1px dashed var(--border)';
      h+='<span class="phl-w" data-i="'+i+'" data-lang="'+lang+'" '+
        'style="display:inline-block;background:'+bg+';border-radius:4px;padding:2px 5px;margin:2px 1px;'+
        'cursor:pointer;border:'+border+';font-size:'+S.st.fs+'px">'+eh(w)+'</span>';
    });
    return h+'</div>';
  }

  var colorsHTML='<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-bottom:10px">';
  HLC_KEYS.forEach(function(c){
    colorsHTML+='<button onclick="phlSetC(\''+c+'\')" id="phlc-'+c+'" '+
      'style="width:100%;height:34px;border-radius:8px;background:'+HLC[c]+
      ';border:'+(ps.c===c?'3px solid var(--fg)':'2px solid transparent')+
      ';cursor:pointer;flex-shrink:0"></button>';
  });
  colorsHTML+='<button onclick="phlSetC(\'0\')" id="phlc-0" '+
    'style="width:100%;height:34px;border-radius:8px;background:var(--bg3);'+
    'border:'+(ps.c==='0'?'3px solid var(--fg)':'2px solid var(--border)')+
    ';cursor:pointer;font-size:14px;color:var(--fg3)">✕</button></div>';

  var html='<div class="nm-top">'+
    '<div class="nm-title">✏️ 부분 형광 — '+eh(ref)+'</div>'+
    '<button class="nm-close" onclick="closePHL()">✕</button></div>';
  html+='<div style="font-size:12px;color:var(--fg3);margin-bottom:8px">색 선택 후 단어를 탭하세요. ✕ = 지우기</div>';
  html+=colorsHTML;

  if(ps.t1){
    html+='<div style="font-size:12px;font-weight:700;color:var(--primary2);margin-bottom:2px">기본 언어</div>';
    html+=wordsHTML(ps.t1,ps.l1,'l1');
  }
  if(S.st.sl2&&ps.t2){
    html+='<div style="font-size:12px;font-weight:700;color:var(--fg3);margin-top:6px;margin-bottom:2px">추가 언어</div>';
    html+=wordsHTML(ps.t2,ps.l2,'l2');
  }
  html+='<div style="display:flex;gap:8px;margin-top:14px">'+
    '<button onclick="clearPHL()" style="flex:1;padding:11px;background:var(--bg2);border:1px solid var(--border);border-radius:9px;color:var(--fg3);font-size:13px;cursor:pointer">전체 지우기</button>'+
    '<button onclick="savePHL()" style="flex:2;padding:11px;background:var(--primary);color:#fff;border:none;border-radius:9px;font-size:14px;font-weight:700;cursor:pointer">✓ 저장</button>'+
    '</div>';

  var modal=document.getElementById('phl-modal');
  if(modal)modal.innerHTML=html;
  var bg=document.getElementById('phl-bg');
  if(bg)bg.classList.add('show');

  setTimeout(function(){
    var bg2=document.getElementById('phl-bg');
    if(!bg2)return;
    bg2.querySelectorAll('.phl-w').forEach(function(span){
      span.addEventListener('click',function(e){
        e.stopPropagation();
        var idx=String(span.dataset.i);
        var lang=span.dataset.lang;
        var ps2=S.phlSel;
        var c=ps2.c;
        var map=lang==='l1'?ps2.l1:ps2.l2;
        if(c==='0'){
          delete map[idx];
          span.style.background='transparent';
          span.style.border='1px dashed var(--border)';
        }else{
          map[idx]=c;
          span.style.background=HLC[c];
          span.style.border='1px solid '+HLC[c];
        }
      });
    });
  },60);
}

window.phlSetC=function(c){
  S.phlSel.c=c;
  HLC_KEYS.concat(['0']).forEach(function(x){
    var btn=document.getElementById('phlc-'+x);
    if(!btn)return;
    if(x===c)btn.style.border='3px solid var(--fg)';
    else btn.style.border=x==='0'?'2px solid var(--border)':'2px solid transparent';
  });
};
window.clearPHL=function(){
  S.phlSel.l1={};S.phlSel.l2={};
  showPHLModal();
};
window.savePHL=function(){
  var vk=S.phlSel.vk;if(!vk)return;
  var l1=S.phlSel.l1,l2=S.phlSel.l2;
  if(!Object.keys(l1).length&&!Object.keys(l2).length){
    delete S.phl[vk];showToast(t('phl_removed'));
  }else{
    S.phl[vk]={l1:l1,l2:l2};showToast(t('phl_saved'));
  }
  savPHL();closePHL();
  // Re-render verse text
  var el=document.getElementById('v'+S.phlSel.vn);
  if(el){
    var phlData=S.phl[vk]||null;
    var hasPHL=!!(phlData&&(Object.keys(phlData.l1||{}).length||Object.keys(phlData.l2||{}).length));
    var hlc=S.hl[vk]?'hl-'+S.hl[vk]:'';
    el.className='vi '+hlc+(S.nt[vk]?' has-note':'')+(hasPHL?' has-phl':'');
    var txt=el.querySelector('.vtexts');
    if(txt){
      var h='',t1=S.phlSel.t1,t2=S.phlSel.t2;
      var phL1=phlData&&phlData.l1,phL2=phlData&&phlData.l2;
      if(t1)h+='<div class="vt1" style="font-size:'+S.st.fs+'px">'+(phL1?renderVersePHL(t1,phL1):eh(t1))+'</div>';
      if(S.st.sl2&&t2)h+='<div class="vt2" style="font-size:'+Math.max(12,S.st.fs-2)+'px">'+(phL2?renderVersePHL(t2,phL2):eh(t2))+'</div>';
      txt.innerHTML=h;
    }
  }
};
window.closePHL=function(){
  var bg=document.getElementById('phl-bg');if(bg)bg.classList.remove('show');
};

// ── Note modal helpers ──
window.selNC=function(c,el){
  S.nc=c;document.querySelectorAll('.nc-dot').forEach(function(x){x.classList.remove('sel');});if(el)el.classList.add('sel');
};
window.saveNM=function(){
  if(!S.pvk)return;
  var t=(document.getElementById('nm-ta')||{}).value||'';t=t.trim();
  if(t){S.nt[S.pvk]={text:t,c:S.nc,bid:S.book?S.book.id:'',ch:S.ch,vn:S.pvn,bname:S.book?getBN(S.book).kor:'',sid:S.sid,ts:Date.now()};}
  else{delete S.nt[S.pvk];}
  savNT();closeNM();
  showToast(t?'노트 저장됨':'노트 삭제됨');
  refreshVerseIcons(S.pvk,S.pvn);
};
window.closeNM=function(){var nm=document.getElementById('nm-bg');if(nm)nm.classList.remove('show');};
window.nmBgClick=function(e){if(e.target===document.getElementById('nm-bg'))closeNM();};

// ============================================================
// SEARCH — searches both l1 and l2 bundled text
// ============================================================
function buildSearch(){
  var res='';
  if(S.srch.res&&S.srch.res.length){
    res='<div style="padding:6px 16px;font-size:12px;color:var(--fg3)">'+S.srch.res.length+t('results')+'</div>';
    S.srch.res.forEach(function(r,i){res+='<div class="sr-item" onclick="openSR('+i+')"><div class="sr-ref">'+eh(r.ref)+'</div><div class="sr-txt">'+hlTxt(r.text,S.srch.q)+'</div></div>';});
  }else if(S.srch.res!==null&&S.srch.q){
    res='<div class="empty"><div class="empty-icon">🔍</div><div class="empty-txt">'+t('no_content')+'</div></div>';
  }
  return'<div class="s-head"><span class="s-head-title">🔍 '+t('search')+'</span></div>'+
    '<div class="srch-bar"><input type="text" class="srch-in" id="srch-in" placeholder="'+t('search_ph')+'" value="'+eh(S.srch.q)+'" oninput="doSearch(this.value)"/></div>'+res;
}
function focusSearch(){setTimeout(function(){var e=document.getElementById('srch-in');if(e)try{e.focus();}catch(x){}},200);}
window.doSearch=function(q){
  S.srch.q=q;
  if(!q||q.length<2){S.srch.res=null;updSR();return;}
  var res=[],ql=q.toLowerCase(),lim=100;
  outer:for(var si=0;si<(window.SCRIPTURE_SECTIONS||[]).length;si++){
    var sec=window.SCRIPTURE_SECTIONS[si];
    for(var bi=0;bi<(sec.books||[]).length;bi++){
      var b=sec.books[bi],bn=getBN(b);
      var bd=window.SCRIPTURE_DB[b.id];
      if(!bd){if(b.id==='dc'||b.id==='od/1'||b.id==='od/2')bd=window.SCRIPTURE_DB['dc'];else continue;}
      var useKey=(b.id==='od/1'||b.id==='od/2')?b.id:null;
      var cks=useKey?[useKey]:Object.keys(bd).filter(function(k){return k!=='od/1'&&k!=='od/2';});
      for(var ci=0;ci<cks.length;ci++){
        var ck=cks[ci],cd=bd[ck];if(!cd)continue;
        // Search l1: bundled first, then cache
        // 검색: UI언어 번들 우선 (kor/eng), 아니면 l1
        var uiLang=S.st.ui||'kor';
        var srchLang=(uiLang==='kor'||uiLang==='eng')?uiLang:S.st.l1;
        var chKey1=srchLang+'__'+b.id+'__'+ck;
        var vl1=cd[srchLang]||(S.lc[chKey1])||cd.kor||[];
        // L2도 검색 (UI언어와 다른 경우)
        var chKey2=S.st.l2+'__'+b.id+'__'+ck;
        var vl2=(S.st.sl2&&S.st.l2!==srchLang)?(cd[S.st.l2]||(S.lc[chKey2])||[]):[];
        var seenIdx={};
        for(var vi=0;vi<vl1.length;vi++){
          if((vl1[vi]||'').toLowerCase().indexOf(ql)>=0){
            seenIdx[vi]=true;
            res.push({ref:bn.kor+' '+(useKey?'':ck+':')+(vi+1),text:vl1[vi],sid:sec.id,book:b,ch:useKey||ck,vn:vi+1});
            if(res.length>=lim)break outer;
          }
        }
        for(var vi2=0;vi2<vl2.length;vi2++){
          if(!seenIdx[vi2]&&(vl2[vi2]||'').toLowerCase().indexOf(ql)>=0){
            res.push({ref:bn.kor+' '+(useKey?'':ck+':')+(vi2+1),text:vl2[vi2],sid:sec.id,book:b,ch:useKey||ck,vn:vi2+1});
            if(res.length>=lim)break outer;
          }
        }
      }
    }
  }
  S.srch.res=res;updSR();
};
function updSR(){
  var sc=document.getElementById('screen');if(!sc)return;
  var ex=sc.querySelector('.sr-area');
  var html='';
  if(S.srch.res&&S.srch.res.length){
    html='<div style="padding:6px 16px;font-size:12px;color:var(--fg3)">'+S.srch.res.length+t('results')+'</div>';
    S.srch.res.forEach(function(r,i){html+='<div class="sr-item" onclick="openSR('+i+')"><div class="sr-ref">'+eh(r.ref)+'</div><div class="sr-txt">'+hlTxt(r.text,S.srch.q)+'</div></div>';});
  }else if(S.srch.res!==null&&S.srch.q){
    html='<div class="empty"><div class="empty-icon">🔍</div><div class="empty-txt">'+t('no_content')+'</div></div>';}
  if(ex){ex.innerHTML=html;}else{var d=document.createElement('div');d.className='sr-area';d.innerHTML=html;sc.appendChild(d);}
}
function hlTxt(txt,q){if(!q)return eh(txt);return eh(txt).replace(new RegExp(eh(q).replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi'),'<span class="sr-hl">$&</span>');}
window.openSR=function(i){
  var r=S.srch.res[i];if(!r)return;
  S.sid=r.sid;S.book=r.book;S.ch=r.ch;
  doLoadCD(r.book.id,r.ch,function(v1,v2){
    S.vs={l1:v1,l2:v2};navTo('cv');
    setTimeout(function(){scrollToVerse(r.vn,true);},300);
  });
};

// ============================================================
// SETTINGS
// ============================================================
function mkLOpts(sel){return LANGS.map(function(l){return'<option value="'+l.c+'"'+(l.c===sel?' selected':'')+'>'+l.n+'</option>';}).join('');}
var _tL1=null,_tL2=null;
window.tmpL1=function(v){_tL1=v;};
window.tmpL2=function(v){_tL2=v;};
window.applyLangs=function(){
  if(_tL1!==null)S.st.l1=_tL1;
  if(_tL2!==null)S.st.l2=_tL2;
  _tL1=null;_tL2=null;
  S.vs={l1:[],l2:[]};
  savST();updLangBtn();
  showToast(t('lang_applied'));
};

function buildFontRows(){
  return FONTS.map(function(f){
    return'<button class="font-btn'+(S.st.ff===f.id?' on':'')+'" onclick="setFF(\''+f.id+'\',this)" '+
      'style="font-family:'+f.css+';padding:10px 12px;margin-bottom:4px;border-radius:8px;width:100%;'+
      'text-align:left;display:flex;justify-content:space-between;align-items:center">'+
      '<span style="font-size:15px">'+f.sample+'</span>'+
      '<span style="font-size:12px;color:var(--fg3)">'+f.n+'</span></button>';
  }).join('');
}

function buildSettings(){
  return'<div class="s-head"><span class="s-head-title">⚙️ '+t('settings')+'</span></div>'+
    '<div class="cfg-grp">'+
    '<div class="cfg-sec-ttl">'+t('ui_lang')+'</div>'+
    '<div style="font-size:11px;color:var(--fg3);padding:0 0 8px">'+t('ui_lang_desc')+'</div>'+
    '<div class="cfg-row"><div class="cfg-lbl">'+t('ui_lang')+'</div>'+
    '<select class="cfg-sel" onchange="setUI(this.value)">'+
    LANGS.filter(function(l){return !!UI_STRINGS[l.c];}).map(function(l){return'<option value="'+l.c+'"'+(S.st.ui===l.c?' selected':'')+'>'+l.n+'</option>';}).join('')+
    '</select></div>'+
    
    '<div class="cfg-sec-ttl">'+t('theme')+'</div><div class="theme-row">'+
    '<button class="thm-btn'+(S.st.theme==='light'?' on':'')+'" onclick="setThm(\'light\',this)">☀️ '+t('light')+'</button>'+
    '<button class="thm-btn'+(S.st.theme==='dark'?' on':'')+'" onclick="setThm(\'dark\',this)">🌙 '+t('dark')+'</button>'+
    '<button class="thm-btn'+(S.st.theme==='sepia'?' on':'')+'" onclick="setThm(\'sepia\',this)">📜 '+t('sepia')+'</button>'+
    '</div>'+
    '<div class="cfg-sec-ttl">'+t('brightness')+'</div>'+
    '<div style="padding:10px 0;display:flex;align-items:center;gap:10px">'+
    '<span>🌑</span><input type="range" min="0.3" max="1.0" step="0.05" value="'+S.st.br+'" oninput="liveBr(this.value)" onchange="savBr(this.value)" style="flex:1"><span>☀️</span>'+
    '</div>'+
    '<div class="cfg-sec-ttl">'+t('font')+'</div>'+buildFontRows()+
    '<div style="padding:6px 0 2px;font-size:11px;color:var(--fg3)">* 나눔/노토/고운/고딕A1 — 인터넷 연결 시 Google Fonts 로드</div>'+
    '<div class="cfg-sec-ttl">'+t('fontsize')+'</div>'+
    '<div style="padding:10px 0;display:flex;align-items:center;gap:10px">'+
    '<button onclick="adjFs(-1)" style="padding:8px 14px;background:var(--bg2);border:1px solid var(--border);border-radius:6px;color:var(--fg);font-size:15px;cursor:pointer">A-</button>'+
    '<input type="range" min="12" max="50" value="'+S.st.fs+'" oninput="liveFs(this.value)" onchange="savFs(this.value)" style="flex:1">'+
    '<button onclick="adjFs(1)" style="padding:8px 14px;background:var(--bg2);border:1px solid var(--border);border-radius:6px;color:var(--fg);font-size:15px;cursor:pointer">A+</button>'+
    '<span style="width:32px;text-align:right;font-size:14px;color:var(--fg)" id="fs-val">'+S.st.fs+'</span></div>'+
    '</div><div style="height:20px"></div>';
}

function buildLanguage(){
  return'<div class="s-head"><span class="s-head-title">🌐 '+t('lang')+'</span></div>'+
    '<div style="padding:12px 16px 0">'+
    '<div style="padding:10px 12px;background:var(--bg2);border-radius:8px;margin-bottom:16px;border-left:3px solid var(--primary2)">'+
    '<div style="font-size:11px;font-weight:700;color:var(--primary2);margin-bottom:4px">📌 '+t('lang_note')+'</div>'+
    '<div style="font-size:11px;color:var(--fg3);line-height:1.6">'+t('lang_page_note')+'</div>'+
    '</div>'+

    '<div style="font-size:13px;font-weight:700;color:var(--fg);margin-bottom:2px">'+t('lang1')+'</div>'+
    '<div style="font-size:11px;color:var(--fg3);margin-bottom:8px">'+t('lang1_desc')+'</div>'+
    '<select style="width:100%;padding:11px;border:1px solid var(--border);border-radius:9px;background:var(--bg2);color:var(--fg);font-size:15px;margin-bottom:18px" onchange="tmpL1(this.value)">'+mkLOpts(S.st.l1)+'</select>'+

    '<div style="font-size:13px;font-weight:700;color:var(--fg);margin-bottom:2px">'+t('lang2')+'</div>'+
    '<div style="font-size:11px;color:var(--fg3);margin-bottom:4px">'+t('lang2_desc')+'</div>'+
    '<select style="width:100%;padding:11px;border:1px solid var(--border);border-radius:9px;background:var(--bg2);color:var(--fg);font-size:15px;margin-bottom:10px" onchange="tmpL2(this.value)">'+mkLOpts(S.st.l2)+'</select>'+

    '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-top:1px solid var(--border)">'+
    '<span style="font-size:14px;color:var(--fg)">'+t('lang2_show')+'</span>'+
    '<button class="tgl'+(S.st.sl2?' on':'')+'" onclick="togSL2(this)"></button></div>'+

    '<div style="margin-top:14px">'+
    '<button onclick="applyLangs()" style="width:100%;padding:14px;background:var(--primary);color:#fff;border:none;border-radius:10px;font-size:16px;font-weight:700;cursor:pointer">'+t('apply')+'</button>'+
    '</div></div><div style="height:20px"></div>';
}

function buildAppearance(){
  return'<div class="s-head"><span class="s-head-title">🔤 텍스트 설정</span></div>'+
    '<div class="cfg-grp">'+
    '<div class="cfg-sec-ttl">글꼴 선택 (9종)</div>'+buildFontRows()+
    '<div style="padding:8px 0 2px;font-size:11px;color:var(--fg3)">* 나눔/노토/고운/고딕A1 — 인터넷 연결 시 Google Fonts 로드</div>'+
    '<div class="cfg-sec-ttl">글자 크기 (12 – 50px)</div>'+
    '<div style="padding:12px 0;display:flex;align-items:center;gap:10px">'+
    '<button onclick="adjFs(-1)" style="padding:8px 14px;background:var(--bg2);border:1px solid var(--border);border-radius:6px;color:var(--fg);font-size:15px;cursor:pointer">A-</button>'+
    '<input type="range" min="12" max="50" value="'+S.st.fs+'" oninput="liveFs(this.value)" onchange="savFs(this.value)" style="flex:1">'+
    '<button onclick="adjFs(1)" style="padding:8px 14px;background:var(--bg2);border:1px solid var(--border);border-radius:6px;color:var(--fg);font-size:15px;cursor:pointer">A+</button>'+
    '<span style="width:32px;text-align:right;font-size:14px;color:var(--fg)" id="fs-val">'+S.st.fs+'</span></div>'+
    '<div class="cfg-sec-ttl">배경 테마</div><div class="theme-row">'+
    '<button class="thm-btn'+(S.st.theme==='light'?' on':'')+'" onclick="setThm(\'light\',this)">☀️ 밝게</button>'+
    '<button class="thm-btn'+(S.st.theme==='dark'?' on':'')+'" onclick="setThm(\'dark\',this)">🌙 어둡게</button>'+
    '<button class="thm-btn'+(S.st.theme==='sepia'?' on':'')+'" onclick="setThm(\'sepia\',this)">📜 세피아</button>'+
    '</div><div class="cfg-sec-ttl">밝기</div><div style="padding:10px 0;display:flex;align-items:center;gap:10px">'+
    '<span>🌑</span><input type="range" min="0.3" max="1.0" step="0.05" value="'+S.st.br+'" oninput="liveBr(this.value)" onchange="savBr(this.value)" style="flex:1"><span>☀️</span>'+
    '</div></div>';
}

window.setL1=function(v){S.st.l1=v;S.vs={l1:[],l2:[]};savST();updLangBtn();};
window.setL2=function(v){S.st.l2=v;S.vs={l1:[],l2:[]};savST();};
window.togSL2=function(btn){S.st.sl2=!S.st.sl2;if(btn)btn.classList.toggle('on',S.st.sl2);savST();};
window.setUI=function(v){
  S.st.ui=v;savST();applyUI();renderScreen();
};
window.setThm=function(t,btn){S.st.theme=t;savST();applyTheme();document.querySelectorAll('.thm-btn').forEach(function(b){b.classList.remove('on');});if(btn)btn.classList.add('on');};
window.setFF=function(id,btn){S.st.ff=id;savST();document.querySelectorAll('.font-btn').forEach(function(b){b.classList.remove('on');});if(btn)btn.classList.add('on');};
window.liveFs=function(v){S.st.fs=parseInt(v);var e=document.getElementById('fs-val');if(e)e.textContent=v;applyFsDOM();};
window.savFs=function(v){S.st.fs=parseInt(v);savST();};
window.liveBr=function(v){S.st.br=parseFloat(v);applyTheme();};
window.savBr=function(v){S.st.br=parseFloat(v);savST();};

// ============================================================
// BOOKMARKS / NOTES / HIGHLIGHTS / HISTORY
// ============================================================
function buildBMs(){
  var html='<div class="s-head"><span class="s-head-title">🔖 '+t('bookmarks')+'</span></div>';
  if(!S.bm.length)return html+'<div class="empty"><div class="empty-icon">🔖</div><div class="empty-txt">'+t('bm_empty')+'</div></div>';
  html+='<div>';
  S.bm.slice().sort(function(a,b){return b.ts-a.ts;}).forEach(function(bm){
    html+='<div class="bnh-item" onclick="openBM(\''+ea(bm.k)+'\')">'+
      '<img src="'+(SCR_IMG[bm.sid||'']||'')+'" style="width:28px;height:36px;object-fit:cover;border-radius:2px;flex-shrink:0" onerror="this.style.display=\'none\'">'+
      '<div style="flex:1;margin-left:8px"><div class="bnh-ref">'+eh((bm.bname||bm.bid)+' '+bm.ch+':'+bm.vn)+'</div></div>'+
      '<div style="color:var(--fg3);font-size:17px">›</div></div>';
  });
  return html+'</div>';
}
window.openBM=function(k){
  var bm=S.bm.find(function(x){return x.k===k;});if(!bm)return;
  var sec=getSection(bm.sid);if(!sec)return;
  var book=(sec.books||[]).find(function(b){return b.id===bm.bid;});if(!book)return;
  S.sid=bm.sid;S.book=book;S.ch=bm.ch;
  doLoadCD(bm.bid,bm.ch,function(v1,v2){S.vs={l1:v1,l2:v2};navTo('cv');setTimeout(function(){scrollToVerse(bm.vn,true);},300);});
};

function buildNotes(){
  var html='<div class="s-head"><span class="s-head-title">📝 '+t('notes')+'</span></div>';
  var ks=Object.keys(S.nt);
  if(!ks.length)return html+'<div class="empty"><div class="empty-icon">📝</div><div class="empty-txt">'+t('note_empty')+'</div></div>';
  html+='<div>';
  ks.sort(function(a,b){return(S.nt[b].ts||0)-(S.nt[a].ts||0);}).forEach(function(k){
    var nt=S.nt[k],clr=nt.c!=='0'?(HLC[nt.c]||'transparent'):'transparent';
    html+='<div class="bnh-item" onclick="openNT(\''+ea(k)+'\')">'+
      '<div class="hl-dot" style="background:'+clr+';margin-top:4px"></div>'+
      '<div style="flex:1"><div class="bnh-ref">'+eh((nt.bname||nt.bid)+' '+nt.ch+':'+nt.vn)+'</div>'+
      '<div class="bnh-note">'+eh((nt.text||'').substr(0,80))+((nt.text||'').length>80?'...':'')+'</div></div>'+
      '<div style="color:var(--fg3);font-size:17px">›</div></div>';
  });
  return html+'</div>';
}
window.openNT=function(k){
  var nt=S.nt[k];if(!nt)return;
  var sec=getSection(nt.sid);if(!sec)return;
  var book=(sec.books||[]).find(function(b){return b.id===nt.bid;});if(!book)return;
  S.sid=nt.sid;S.book=book;S.ch=nt.ch;S.pvk=k;S.pvn=nt.vn;
  doLoadCD(nt.bid,nt.ch,function(v1,v2){S.vs={l1:v1,l2:v2};navTo('cv');setTimeout(function(){scrollToVerse(nt.vn,true);},300);});
};

function buildHLs(){
  var html='<div class="s-head"><span class="s-head-title">🎨 '+t('highlights')+'</span></div>';
  var ks=Object.keys(S.hl);
  if(!ks.length)return html+'<div class="empty"><div class="empty-icon">🎨</div><div class="empty-txt">'+t('hl_empty')+'</div></div>';
  var byC={};
  HLC_KEYS.forEach(function(c){byC[c]=[];});
  ks.forEach(function(k){var c=S.hl[k];if(byC[c])byC[c].push(k);});
  html+='<div>';
  HLC_KEYS.forEach(function(c){
    if(!byC[c].length)return;
    html+='<div style="padding:7px 16px;font-size:12px;font-weight:700;color:var(--fg3);background:var(--bg2);display:flex;align-items:center;gap:8px">'+
      '<div style="width:12px;height:12px;border-radius:50%;background:'+(HLC[c]||'#ccc')+'"></div>'+HLN[c]+' ('+byC[c].length+')</div>';
    byC[c].forEach(function(k){
      var pts=k.split('__'),vn=pts[pts.length-1],ch=pts[pts.length-2],bid=pts.slice(0,pts.length-2).join('__');
      html+='<div class="bnh-item" onclick="openHL(\''+ea(k)+'\')">'+
        '<div class="hl-dot" style="background:'+(HLC[c]||'#ccc')+'"></div>'+
        '<div style="flex:1"><div class="bnh-ref">'+eh(bid+' '+ch+':'+vn)+'</div></div>'+
        '<div style="color:var(--fg3);font-size:17px">›</div></div>';
    });
  });
  return html+'</div>';
}
window.openHL=function(k){
  var pts=k.split('__'),vn=parseInt(pts[pts.length-1]),ch=pts[pts.length-2],bid=pts.slice(0,pts.length-2).join('__');
  var fb=null,fs=null;
  (window.SCRIPTURE_SECTIONS||[]).forEach(function(sec){(sec.books||[]).forEach(function(b){if(b.id===bid){fb=b;fs=sec;}});});
  if(!fb)return;
  S.sid=fs.id;S.book=fb;S.ch=ch;
  doLoadCD(bid,ch,function(v1,v2){S.vs={l1:v1,l2:v2};navTo('cv');setTimeout(function(){scrollToVerse(vn,true);},300);});
};

function buildHistory(){
  var html='<div class="s-head"><span class="s-head-title">🕐 '+t('history')+'</span></div>';
  if(!S.rc||!S.rc.length)return html+'<div class="empty"><div class="empty-icon">🕐</div><div class="empty-txt">'+t('hist_empty')+'</div></div>';
  html+='<div>';
  S.rc.forEach(function(r){
    html+='<div class="bnh-item" onclick="openRC(\''+ea(r.k)+'\')">'+
      '<img src="'+(SCR_IMG[r.sid||'']||'')+'" style="width:28px;height:36px;object-fit:cover;border-radius:2px;flex-shrink:0" onerror="this.style.display=\'none\'">'+
      '<div style="flex:1;margin-left:8px"><div class="bnh-ref">'+eh(r.t)+'</div><div class="bnh-txt">'+eh(r.s)+'</div></div>'+
      '<div style="color:var(--fg3);font-size:17px">›</div></div>';
  });
  return html+'</div>';
}

// ============================================================
// ABOUT / SHARE
// ============================================================
function buildAbout(){
  var ui=S.st?S.st.ui||'kor':'kor';
  var title=ui==='eng'?'ℹ️ About':ui==='jpn'?'ℹ️ 情報':'ℹ️ 정보';
  var vh_title=ui==='eng'?'📋 Version History':ui==='jpn'?'📋 バージョン履歴':'📋 버전 이력';
  var dev_label=ui==='eng'?'Developer':ui==='jpn'?'開発者':'개발자';
  var contact_label=ui==='eng'?'Contact':ui==='jpn'?'連絡先':'문의';
  var bg_title=ui==='eng'?'📖 Background':ui==='jpn'?'📖 開発背景':'📖 개발 배경';
  var bg_text=ui==='eng'
    ?'The official app of The Church of Jesus Christ of Latter-day Saints displays scriptures in a single language. This app was created for those who wish to read scriptures side by side in two languages — for language learners or multilingual families. All content uses only official Church translations; no unofficial translations are included.'
    :ui==='jpn'
    ?'末日聖徒イエス・キリスト教会の公式アプリは一言語のみ表示されます。このアプリは、二言語で並べて経典を読みたい方々のために作られました。すべての内容は教会の公式翻訳のみを使用しています。'
    :'예수 그리스도 후기 성도 교회의 공식 앱은 단일 언어만 표시되어 다국어 동시 읽기가 지원되지 않습니다. 이 앱은 두 가지 언어로 경전을 나란히 읽고자 하는 분들을 위해 제작되었습니다. 모든 내용은 교회 공식 번역본만을 사용하며, 임의 번역은 일절 포함하지 않습니다.';
  var sc_title=ui==='eng'?'📚 Scriptures Included':ui==='jpn'?'📚 収録経典':'📚 수록 경전';
  var feat_title=ui==='eng'?'✏️ Key Features':ui==='jpn'?'✏️ 主な機能':'✏️ 주요 기능';
  var src_label=ui==='eng'?'Scripture source: churchofjesuschrist.org (official Church site)':ui==='jpn'?'経典出典: churchofjesuschrist.org（教会公式サイト）':'경전 자료 출처: churchofjesuschrist.org (교회 공식 사이트)';

  return'<div class="s-head"><span class="s-head-title">'+title+'</span></div>'+
    '<div class="about-wrap">'+
    '<div style="width:80px;height:80px;margin:0 auto 14px;border-radius:50%;overflow:hidden;background:var(--primary);display:flex;align-items:center;justify-content:center;box-shadow:0 3px 12px rgba(0,0,0,.25)">'+
    '<img src="assets/img/logo.png" style="width:72px;height:72px;object-fit:contain" onerror="this.outerHTML=\'<span style=&quot;font-size:40px&quot;>✦</span>\'"></div>'+
    '<div class="about-name">LDS 다국어 경전</div>'+
    '<div style="font-size:13px;color:var(--fg3);margin-bottom:4px">LDS Scriptures — Multilingual Edition</div>'+
    '<div class="about-ver">버전 2.9.0</div>'+

    '<div style="margin:0 0 20px;text-align:left;background:var(--bg2);border-radius:10px;padding:12px 14px">'+
    '<p style="font-size:12px;font-weight:700;color:var(--primary2);margin-bottom:8px">'+vh_title+'</p>'+

    '<p style="font-size:11px;color:var(--fg2);line-height:1.7"><b>v2.9</b> — 2026.06<br>'+
    '• 신앙개조 절번호 없이 전체 표시<br>'+
    '• 공식선언·소개 단락별 인터리빙 (주/추가 언어)<br>'+
    '• 표제지·소개·증언 박스 카드 레이아웃<br>'+
    '• 설정: 앱 표시언어+외관 통합 / 경전 언어는 언어 설정 메뉴로 분리<br>'+
    '• 검색 앱 표시 언어 기반으로 동작<br>'+
    '• 구약·신약 추가언어 비활성화<br>'+
    '• 북마크·노트 추가 즉시 절 아이콘 반영<br>'+
    '• 형광펜 10가지 색상으로 확장<br>'+
    '• 언어 파싱 강화 (3단계 폴백)</p>'+

    '<p style="font-size:11px;color:var(--fg2);line-height:1.7;margin-top:6px"><b>v2.8</b> — 2026.06<br>'+
    '• 런처 아이콘 정식 적용 (전화기 홈화면 표시)<br>'+
    '• 화면 전환 오류 수정 (구형 WebView CSS 호환)<br>'+
    '• 추가 언어 로드 안정화 (XHR 방식으로 전환)<br>'+
    '• 공유하기 기능 정상화<br>'+
    '• 텍스트 복사 토스트 오류 수정</p>'+

    '<p style="font-size:11px;color:var(--fg2);line-height:1.7"><b>v2.7</b> — 2026.06<br>'+
    '• 앱 표시 언어 선택 기능 (한국어·영어·일본어)<br>'+
    '• 단락별 1언어↔2언어 인터리빙 표시<br>'+
    '• 절 메뉴 단순화 (선택 버튼 제거, 4버튼)<br>'+
    '• 북마크·노트 절 끝 아이콘 표시<br>'+
    '• About·공유 화면 다국어화<br>'+
    '• 개발자 정보 및 다운로드 링크 추가</p>'+

    '<p style="font-size:11px;color:var(--fg2);line-height:1.7;margin-top:6px"><b>v2.6</b> — 2026.06<br>'+
    '• 공식선언 절번호 삭제, 단락 연속 표시<br>'+
    '• 세·여덟 증인 증언 번들 내장<br>'+
    '• 추가언어 fetch HTML 파싱 완전 수정<br>'+
    '• 경전 본문 텍스트 선택·복사 가능<br>'+
    '• 모로나이 실루엣 로고 및 배경화면 추가<br>'+
    '• About 버전 이력 페이지 추가</p>'+

    '<p style="font-size:11px;color:var(--fg2);line-height:1.7;margin-top:6px"><b>v2.5</b> — 2026.06<br>'+
    '• 언어 캐시 로컬DB 영구 저장 (LRU 150챕터)<br>'+
    '• 지원 언어 20→37개 확대<br>'+
    '• 검색 캐시 언어 포함<br>'+
    '• 몰몬경·D&C·값진진주 이중언어 표제지·소개 표시</p>'+

    '<p style="font-size:11px;color:var(--fg2);line-height:1.7;margin-top:6px"><b>v2.4</b> — 2026.05<br>'+
    '• 단어 선택 부분 형광펜 기능 (기본·추가 언어 각각)<br>'+
    '• 책 목록 3열 그리드 레이아웃<br>'+
    '• 폰트 9종 추가<br>'+
    '• 글자 크기 최대 50px</p>'+

    '<p style="font-size:11px;color:var(--fg2);line-height:1.7;margin-top:6px"><b>v2.3</b> — 2026.04<br>'+
    '• 교리와 성약 공식선언 1·2 추가<br>'+
    '• 값진 진주 전권 추가<br>'+
    '• 스와이프 장 이동 제스처<br>'+
    '• 밝기 슬라이더</p>'+

    '<p style="font-size:11px;color:var(--fg2);line-height:1.7;margin-top:6px"><b>v2.2</b> — 2026.03<br>'+
    '• 핀치 줌 텍스트 크기 조절<br>'+
    '• 테마 세피아 추가<br>'+
    '• 시스템 폰트 자동 적용<br>'+
    '• 장 이동 버튼 UI 개선</p>'+

    '<p style="font-size:11px;color:var(--fg2);line-height:1.7;margin-top:6px"><b>v2.1</b> — 2026.02<br>'+
    '• 전체 검색 기능 (기본 언어 + 추가 언어 동시)<br>'+
    '• 절 직접 이동 (장 헤더 탭)<br>'+
    '• 형광 목록 화면 추가<br>'+
    '• 최근 읽은 기록 15개 저장</p>'+

    '<p style="font-size:11px;color:var(--fg2);line-height:1.7;margin-top:6px"><b>v2.0</b> — 2026.01<br>'+
    '• 전체 구조 재설계 (SPA 방식)<br>'+
    '• 추가 언어 API 실시간 로드 지원<br>'+
    '• 이중언어 동시 표시 (상단/하단 배치)<br>'+
    '• 노트 기능 추가<br>'+
    '• 다크 모드 지원</p>'+

    '<p style="font-size:11px;color:var(--fg2);line-height:1.7;margin-top:6px"><b>v1.2</b> — 2025.12<br>'+
    '• 노트 작성 기능 추가<br>'+
    '• 절 북마크 목록 화면<br>'+
    '• 글자 크기 슬라이더 (12–32px)</p>'+

    '<p style="font-size:11px;color:var(--fg2);line-height:1.7;margin-top:6px"><b>v1.1</b> — 2025.11<br>'+
    '• 북마크 기능 추가<br>'+
    '• 절 전체 형광 표시<br>'+
    '• 홈 화면 최근 기록 표시</p>'+

    '<p style="font-size:11px;color:var(--fg2);line-height:1.7;margin-top:6px"><b>v1.0</b> — 2025.10<br>'+
    '• 최초 출시<br>'+
    '• 한국어·영어 오프라인 내장<br>'+
    '• 구약·신약·몰몬경·교리와성약 수록<br>'+
    '• 라이트·다크 모드</p>'+

    '</div>'+

    '<div class="about-desc" style="text-align:left">'+
    '<p style="font-weight:700;font-size:15px;margin-bottom:8px;color:var(--fg)">'+bg_title+'</p>'+
    '<p style="margin-bottom:14px">'+bg_text+'</p>'+
    '<p style="font-weight:700;font-size:14px;margin-bottom:6px;color:var(--fg)">'+sc_title+'</p>'+
    '<p style="margin-bottom:14px">• 구약전서 (39권) · 신약전서 (27권)<br>• 몰몬경 (15권 + 표제지·소개·해설·증언)<br>• 교리와 성약 (138편 + 공식선언 1·2 + 소개)<br>• 값진 진주 (5권 + 소개)<br><em style="color:var(--fg3)">총 42,020개 구절 수록</em></p>'+
    '<p style="font-weight:700;font-size:14px;margin-bottom:6px;color:var(--fg)">'+feat_title+'</p>'+
    '<p style="margin-bottom:14px">• 두 언어 동시 표시 · 단락별 인터리빙<br>• 단어 선택 부분 형광 (기본·추가 언어 각각)<br>• 북마크 · 노트 · 형광 목록 · 최근 기록<br>• 전체 검색 (기본 + 추가 언어 동시)<br>• 폰트 9종 · 글자 크기 12–50px · 핀치 줌<br>• 앱 표시 언어: 한국어·영어·일본어</p>'+
    '</div>'+

    '<div style="background:var(--bg2);border-radius:10px;padding:12px 14px;margin-bottom:16px;text-align:left">'+
    '<p style="font-size:12px;font-weight:700;color:var(--primary2);margin-bottom:8px">👤 '+dev_label+'</p>'+
    '<p style="font-size:13px;color:var(--fg);line-height:1.8">'+
    '서울 남스테이크 강남2 와드<br><b>Peter S. Choi</b></p>'+
    '<p style="font-size:12px;font-weight:700;color:var(--primary2);margin:10px 0 6px">📧 '+contact_label+'</p>'+
    '<p style="font-size:13px;color:var(--fg)"><a href="mailto:ntec21c@gmail.com" style="color:var(--primary2)">ntec21c@gmail.com</a></p>'+
    '</div>'+

    '<div class="about-credit">'+src_label+'</div>'+
    '</div>';
}

function buildShare(){
  var ui=S.st?S.st.ui||'kor':'kor';
  var title_str=ui==='eng'?'📤 Share App':ui==='jpn'?'📤 アプリ共有':'📤 앱 공유';
  var heading=ui==='eng'?'Share LDS Multilingual Scriptures':ui==='jpn'?'LDS 多言語経典を共有':'LDS 다국어 경전 공유하기';
  var desc=ui==='eng'?'Introduce this app to family and friends':ui==='jpn'?'家族や友人にこのアプリを紹介してください':'가족과 친구들에게 이 앱을 소개해 주세요';
  var share_btn=ui==='eng'?'Share':ui==='jpn'?'共有':'공유하기';
  var dl_label=ui==='eng'?'📥 App Download Link':ui==='jpn'?'📥 アプリダウンロード':'📥 앱 다운로드 링크';
  var copy_btn=ui==='eng'?'Copy Link':ui==='jpn'?'リンクをコピー':'링크 복사';
  var copied_msg=ui==='eng'?'Link copied!':ui==='jpn'?'コピーしました':'링크가 복사되었습니다';

  var DL_URL='https://github.com/ntec2000/LDS_Multi_Scriptures/releases/download/v2.15.0/lds-scripture-v2.15.apk';

  return'<div class="s-head"><span class="s-head-title">'+title_str+'</span></div>'+
    '<div style="padding:30px 20px;text-align:center">'+
    '<img src="assets/img/logo.png" style="width:72px;height:72px;border-radius:50%;margin-bottom:16px" onerror="this.outerHTML=\'<div style=&quot;font-size:52px;margin-bottom:16px&quot;>📲</div>\'">'+
    '<div style="font-size:16px;font-weight:600;color:var(--fg);margin-bottom:8px">'+heading+'</div>'+
    '<div style="font-size:13px;color:var(--fg3);line-height:1.65;margin-bottom:24px">'+desc+'</div>'+
    '<button onclick="doShare()" style="padding:14px 36px;background:var(--primary);color:#fff;border:none;border-radius:10px;font-size:15px;cursor:pointer;margin-bottom:28px">'+share_btn+'</button>'+

    '<div style="background:var(--bg2);border-radius:12px;padding:16px;text-align:left">'+
    '<div style="font-size:12px;font-weight:700;color:var(--primary2);margin-bottom:10px">'+dl_label+'</div>'+
    '<div style="display:flex;align-items:center;gap:8px;background:var(--bg);border-radius:8px;padding:10px 12px;margin-bottom:12px">'+
    '<span style="flex:1;font-size:11px;color:var(--fg3);word-break:break-all;font-family:monospace">'+DL_URL+'</span>'+
    '</div>'+
    '<button onclick="copyDlLink()" style="width:100%;padding:12px;background:var(--primary2);color:#fff;border:none;border-radius:8px;font-size:14px;cursor:pointer">'+copy_btn+'</button>'+
    '</div>'+
    '</div>';
}
window.doShare=function(){
  var ui=S.st?S.st.ui||'kor':'kor';
  var DL_URL='https://github.com/ntec2000/LDS_Multi_Scriptures/releases/download/v2.15.0/lds-scripture-v2.15.apk';
  var appName='LDS 다국어 경전';
  var shareText=ui==='eng'
    ?'Try this multilingual LDS scriptures app!\n'+DL_URL
    :ui==='jpn'
    ?'多言語LDS経典アプリをご紹介します！\n'+DL_URL
    :'LDS 다국어 경전 앱을 소개합니다!\n교회 공식 번역본으로 2개 언어를 동시에 읽을 수 있습니다.\n'+DL_URL;
  if(navigator.share){
    navigator.share({title:appName,text:shareText}).catch(function(){
      copyDlLink();
    });
  }else if(window.Android&&window.Android.share){
    window.Android.share(shareText);
  }else{
    copyDlLink();
  }
};
window.copyDlLink=function(){
  var url='https://github.com/ntec2000/LDS_Multi_Scriptures/releases/download/v2.15.0/lds-scripture-v2.15.apk';
  var ui=S.st?S.st.ui||'kor':'kor';
  var msg=ui==='eng'?'Link copied!':ui==='jpn'?'コピーしました':'링크가 복사되었습니다';
  if(navigator.clipboard){navigator.clipboard.writeText(url).then(function(){showToast(msg);});}
  else{
    var ta=document.createElement('textarea');ta.value=url;
    document.body.appendChild(ta);ta.select();
    try{document.execCommand('copy');showToast(msg);}catch(e){}
    document.body.removeChild(ta);
  }
};

// ============================================================
// UTILS
// ============================================================
function addRC(sid,book,ch){
  if(!book)return;
  var sec=getSection(sid),bn=getBN(book);
  var k=sid+'_'+book.id+'_'+ch;
  var t=bn.kor+((book.chapter_count||1)>1?' '+ch+'장':'');
  var s=sec?sec.name_kor:'';
  S.rc=S.rc.filter(function(r){return r.k!==k;});
  S.rc.unshift({k:k,sid:sid,book:book,ch:ch,t:t,s:s,ts:Date.now()});
  if(S.rc.length>15)S.rc=S.rc.slice(0,15);
  savRC();
}
function getSection(sid){return(window.SCRIPTURE_SECTIONS||[]).find(function(s){return s.id===sid;});}
function getFontCss(){var f=FONTS.find(function(x){return x.id===S.st.ff;});return f?f.css:FONTS[0].css;}
function eh(s){if(s==null)return'';return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function ea(s){if(s==null)return'';return String(s).replace(/\\/g,'\\\\').replace(/'/g,"\\'");}
var _tid=null;
function showToast(msg){
  var t=document.getElementById('toast');if(!t)return;
  t.textContent=msg;t.classList.add('show');
  clearTimeout(_tid);_tid=setTimeout(function(){t.classList.remove('show');},2200);
}
