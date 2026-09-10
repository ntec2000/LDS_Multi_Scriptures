// ============================================================
// v2.11 additions — chapter headings/summaries, official audio,
// i18n expansion, English default UI
// ============================================================

// ── i18n: new keys ──
Object.assign(UI_STRINGS.kor,{
  copied:'복사됨',bm_added:'북마크 추가됨',bm_removed:'북마크 제거됨',
  share_copied:'공유 텍스트 복사됨',share_unsupported:'공유가 지원되지 않습니다',
  phl_removed:'부분 형광 제거됨',phl_saved:'부분 형광 저장됨',
  lang_applied:'✓ 언어 설정이 적용되었습니다',
  front_matter:'머리글',intro_word:'소개',dc_sections:'각 편 · 공식 선언',
  books_word:'각 서',ch_unit:'장',
  ui_lang_desc:'앱 메뉴·버튼에 표시되는 언어입니다 (경전 언어는 언어 설정 메뉴에서)',
  lang_page_note:'한국어·영어 외 언어는 교회 공식 사이트에서 실시간 로드됩니다. 인터넷 연결 필요.',
  app_title:'LDS 다국어 경전',od1:'공식 선언 1',od2:'공식 선언 2',
  listen:'음성 듣기',audio_loading:'음성 불러오는 중...',
  audio_unavailable:'이 장은 음성이 제공되지 않습니다',
  audio_female:'여성',audio_male:'남성',audio_default:'음성',
  text_settings:'텍스트 설정',font_select:'글꼴 선택 (9종)',
  font_size_lbl:'글자 크기 (12 – 50px)',theme_bg:'배경 테마',
  ver_label:'버전'
});
Object.assign(UI_STRINGS.eng,{
  copied:'Copied',bm_added:'Bookmark added',bm_removed:'Bookmark removed',
  share_copied:'Copied for sharing',share_unsupported:'Sharing not supported',
  phl_removed:'Highlight removed',phl_saved:'Highlight saved',
  lang_applied:'✓ Language settings applied',
  front_matter:'Front Matter',intro_word:'Introduction',dc_sections:'Sections · Official Declarations',
  books_word:'Books',ch_unit:' ch',
  ui_lang_desc:'The language used for app menus and buttons (scripture language is set in the Language menu)',
  lang_page_note:'Languages other than Korean/English are loaded live from the official Church site. Internet required.',
  app_title:'LDS Multilingual Scriptures',od1:'Official Declaration 1',od2:'Official Declaration 2',
  listen:'Listen',audio_loading:'Loading audio...',
  audio_unavailable:'Audio is not available for this chapter',
  audio_female:'Female',audio_male:'Male',audio_default:'Audio',
  text_settings:'Text Settings',font_select:'Font (9 options)',
  font_size_lbl:'Font Size (12 – 50px)',theme_bg:'Theme',
  ver_label:'Version'
});
Object.assign(UI_STRINGS.jpn,{
  copied:'コピーしました',bm_added:'ブックマークを追加',bm_removed:'ブックマークを削除',
  share_copied:'共有テキストをコピー',share_unsupported:'共有はサポートされていません',
  phl_removed:'部分マーカーを削除',phl_saved:'部分マーカーを保存',
  lang_applied:'✓ 言語設定を適用しました',
  front_matter:'前付け',intro_word:'紹介',dc_sections:'各章 · 公式の宣言',
  books_word:'各書',ch_unit:'章',
  ui_lang_desc:'アプリのメニュー・ボタンの表示言語です（経典の言語は言語設定で）',
  lang_page_note:'韓国語・英語以外の言語は教会公式サイトからリアルタイムで読み込まれます。インターネット接続が必要です。',
  app_title:'LDS多言語経典',od1:'公式の宣言1',od2:'公式の宣言2',
  listen:'音声を聞く',audio_loading:'音声を読み込み中...',
  audio_unavailable:'この章の音声はありません',
  audio_female:'女性',audio_male:'男性',audio_default:'音声',
  text_settings:'テキスト設定',font_select:'フォント（9種）',
  font_size_lbl:'文字サイズ (12 – 50px)',theme_bg:'テーマ',
  ver_label:'バージョン'
});

// ── meta cache (chapter headings/summaries + audio) ──
S.mc=S.mc||{};
function savMC(){try{
  var keys=Object.keys(S.mc);
  if(keys.length>200){for(var i=0;i<keys.length-200;i++)delete S.mc[keys[i]];}
  localStorage.setItem('lds_mc',JSON.stringify(S.mc));
}catch(e){}}
try{var _mc=localStorage.getItem('lds_mc');if(_mc)S.mc=JSON.parse(_mc);}catch(e){}

function metaUri(bid,ch){
  var sec=getSecURI(bid);
  if(bid==='od/1')return'/scriptures/dc-testament/od/1';
  if(bid==='od/2')return'/scriptures/dc-testament/od/2';
  if(bid==='dc')return'/scriptures/dc-testament/dc/'+ch;
  return'/scriptures/'+sec+'/'+bid+'/'+ch;
}
function metaById(wrap,id){
  var els=wrap.querySelectorAll('[id]');
  for(var i=0;i<els.length;i++){if(els[i].getAttribute('id')===id)return els[i].textContent.trim();}
  return'';
}
function parseMeta(d){
  var m={sub:'',intro:'',title:'',sum:'',audio:[]};
  try{
    var body=(d.content&&d.content.body)||'';
    if(body){
      var wrap=document.createElement('div');wrap.innerHTML=body;
      wrap.querySelectorAll('sup,.verse-number,rt,script,style').forEach(function(e){e.remove();});
      m.sub=metaById(wrap,'subtitle1');
      m.intro=metaById(wrap,'intro1');
      m.title=metaById(wrap,'title_number1');
      m.sum=metaById(wrap,'study_summary1');
    }
    var au=(d.meta&&d.meta.audio)||[];
    if(au&&au.length){m.audio=au.map(function(a){return{url:a.mediaUrl,variant:a.variant||'audio'};}).filter(function(a){return a.url;});}
  }catch(e){}
  return m;
}
function fetchMeta(lang,bid,ch){
  var ck=lang+'__'+bid+'__'+ch;
  if(S.mc[ck])return Promise.resolve(S.mc[ck]);
  var url='https://www.churchofjesuschrist.org/study/api/v3/language-pages/type/content?lang='+lang+'&uri='+encodeURIComponent(metaUri(bid,ch));
  return new Promise(function(resolve,reject){
    xhrJson(url,function(d){var m=parseMeta(d);S.mc[ck]=m;savMC();resolve(m);},function(){reject();});
  });
}

// ── render chapter heading / book front matter ──
function renderChHead(m1,m2,showL2){
  var box=document.getElementById('ch-head');if(!box||!m1)return;
  var fs=S.st.fs;
  var isFirst=(parseInt(S.ch)===1)||(S.book&&(S.book.chapter_count||1)===1);
  var h='';
  if(isFirst&&(m1.sub||m1.intro)){
    h+='<div style="padding:4px 2px 12px;border-bottom:1px solid var(--border);margin-bottom:14px">';
    if(m1.sub)h+='<div style="font-size:'+(fs+2)+'px;font-weight:700;color:var(--primary2);text-align:center;margin-bottom:'+((showL2&&m2&&m2.sub)?'2px':'10px')+'">'+eh(m1.sub)+'</div>';
    if(showL2&&m2&&m2.sub)h+='<div style="font-size:'+fs+'px;font-style:italic;color:var(--fg2);text-align:center;margin-bottom:10px">'+eh(m2.sub)+'</div>';
    if(m1.intro)h+='<div style="font-size:'+Math.max(12,fs-2)+'px;line-height:1.7;color:var(--fg2);text-align:justify">'+eh(m1.intro)+'</div>';
    if(showL2&&m2&&m2.intro)h+='<div style="font-size:'+Math.max(11,fs-3)+'px;line-height:1.65;color:var(--fg3);font-style:italic;text-align:justify;margin-top:7px">'+eh(m2.intro)+'</div>';
    h+='</div>';
  }
  if(m1.title||m1.sum){
    h+='<div style="padding:0 2px 14px;margin-bottom:8px;border-bottom:1px solid var(--border)">';
    if(m1.title)h+='<div style="font-size:'+(fs+1)+'px;font-weight:700;color:var(--fg);text-align:center;margin-bottom:6px">'+eh(m1.title)+'</div>';
    if(m1.sum)h+='<div style="font-size:'+Math.max(12,fs-2)+'px;line-height:1.6;color:var(--fg2);text-align:justify">'+eh(m1.sum)+'</div>';
    if(showL2&&m2&&m2.sum)h+='<div style="font-size:'+Math.max(11,fs-3)+'px;line-height:1.55;color:var(--fg3);font-style:italic;text-align:justify;margin-top:5px">'+eh(m2.sum)+'</div>';
    h+='</div>';
  }
  box.innerHTML=h;
}

// ── official audio player ──
function audioVarLabel(v){
  if(v==='female')return t('audio_female');
  if(v==='male')return t('audio_male');
  return t('audio_default');
}
function ensureAudioEl(){
  if(!window._audEl){
    var a=document.createElement('audio');a.preload='none';
    a.addEventListener('timeupdate',audUpd);
    a.addEventListener('loadedmetadata',audUpd);
    a.addEventListener('ended',function(){var b=document.getElementById('aud-btn');if(b)b.textContent='▶';});
    window._audEl=a;document.body.appendChild(a);
  }
  return window._audEl;
}
function fmtTime(s){s=Math.floor(s||0);var m=Math.floor(s/60),ss=s%60;return m+':'+(ss<10?'0':'')+ss;}
function audUpd(){
  var a=window._audEl;if(!a)return;
  var sk=document.getElementById('aud-seek'),tm=document.getElementById('aud-time');
  if(sk&&a.duration)sk.value=(a.currentTime/a.duration)*100;
  if(tm)tm.textContent=fmtTime(a.currentTime)+(a.duration?' / '+fmtTime(a.duration):'');
}
window.stopAudio=function(){var a=window._audEl;if(a)a.pause();var b=document.getElementById('aud-btn');if(b)b.textContent='▶';};
window.toggleAudio=function(){
  var a=ensureAudioEl(),btn=document.getElementById('aud-btn'),lbl=document.getElementById('aud-lbl');
  if(!S._audUrl)return;
  if(a.getAttribute('data-src')!==S._audUrl){a.src=S._audUrl;a.setAttribute('data-src',S._audUrl);}
  if(a.paused){
    if(lbl)lbl.textContent=t('audio_loading');
    a.play().then(function(){if(btn)btn.textContent='⏸';if(lbl)lbl.textContent=t('listen');})
      .catch(function(){if(lbl)lbl.textContent=t('audio_unavailable');});
  }else{a.pause();if(btn)btn.textContent='▶';}
};
window.seekAudio=function(v){var a=window._audEl;if(!a||!a.duration)return;a.currentTime=(v/100)*a.duration;};
window.setAudioVariant=function(v){
  S.st.av=v;savST();
  (S._audVariants||[]).forEach(function(x){if(x.variant===v)S._audUrl=x.url;});
  var a=window._audEl;
  if(a){a.pause();a.removeAttribute('data-src');var btn=document.getElementById('aud-btn');if(btn)btn.textContent='▶';var lbl=document.getElementById('aud-lbl');if(lbl)lbl.textContent=t('listen');}
};
function setupAudio(m1){
  var bar=document.getElementById('audio-box');if(!bar)return;
  if(!m1||!m1.audio||!m1.audio.length){bar.innerHTML='';S._audUrl=null;S._audVariants=[];return;}
  S._audVariants=m1.audio;
  var vi=0;
  if(S.st.av){for(var i=0;i<m1.audio.length;i++){if(m1.audio[i].variant===S.st.av){vi=i;break;}}}
  S._audUrl=m1.audio[vi].url;
  var vsel='';
  if(m1.audio.length>1){
    vsel='<select onchange="setAudioVariant(this.value)" style="background:var(--bg);border:1px solid var(--border);border-radius:6px;color:var(--fg);font-size:12px;padding:4px 6px">'+
      m1.audio.map(function(a){return'<option value="'+a.variant+'"'+(a.variant===m1.audio[vi].variant?' selected':'')+'>'+audioVarLabel(a.variant)+'</option>';}).join('')+'</select>';
  }
  bar.innerHTML='<div style="display:flex;align-items:center;gap:10px;padding:9px 12px;background:var(--bg2);border:1px solid var(--border);border-radius:10px;margin-bottom:14px">'+
    '<button id="aud-btn" onclick="toggleAudio()" style="width:38px;height:38px;border-radius:50%;background:var(--primary);color:#fff;border:none;font-size:16px;cursor:pointer;flex-shrink:0">▶</button>'+
    '<div style="display:flex;flex-direction:column;flex:1;gap:3px;min-width:0">'+
    '<span id="aud-lbl" style="font-size:12px;color:var(--fg)">🔊 '+t('listen')+'</span>'+
    '<input type="range" id="aud-seek" value="0" min="0" max="100" step="0.1" oninput="seekAudio(this.value)" style="width:100%">'+
    '</div>'+
    '<span id="aud-time" style="font-size:11px;color:var(--fg3);flex-shrink:0;min-width:34px;text-align:right">0:00</span>'+
    vsel+'</div>';
}

// ── orchestrator: load meta for current chapter (online) ──
function loadChapterMeta(){
  if(!S.book)return;
  var bid=S.book.id,ch=S.ch,l1=S.st.l1,l2=S.st.l2;
  var isBible=false;
  var showL2=S.st.sl2&&!isBible&&l2!==l1;
  fetchMeta(l1,bid,ch).then(function(m1){
    setupAudio(m1);
    if(showL2){
      fetchMeta(l2,bid,ch).then(function(m2){renderChHead(m1,m2,true);}).catch(function(){renderChHead(m1,null,false);});
    }else{renderChHead(m1,null,false);}
  }).catch(function(){});
}

// ── Font selector: two columns ──
function buildFontRows(){
  return'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:4px 0">'+
    FONTS.map(function(f){
      return'<button class="font-btn'+(S.st.ff===f.id?' on':'')+'" onclick="setFF(\''+f.id+'\',this)" '+
        'style="font-family:'+f.css+';padding:11px 10px;border-radius:9px;width:100%;'+
        'display:flex;flex-direction:column;align-items:flex-start;gap:3px;text-align:left">'+
        '<span style="font-size:15px">'+f.sample+'</span>'+
        '<span style="font-size:11px;color:var(--fg3)">'+f.n+'</span></button>';
    }).join('')+'</div>';
}

// ── Appearance page: localized ──
function buildAppearance(){
  return'<div class="s-head"><span class="s-head-title">🔤 '+t('text_settings')+'</span></div>'+
    '<div class="cfg-grp">'+
    '<div class="cfg-sec-ttl">'+t('font_select')+'</div>'+buildFontRows()+
    '<div class="cfg-sec-ttl">'+t('font_size_lbl')+'</div>'+
    '<div style="padding:12px 0;display:flex;align-items:center;gap:10px">'+
    '<button onclick="adjFs(-1)" style="padding:8px 14px;background:var(--bg2);border:1px solid var(--border);border-radius:6px;color:var(--fg);font-size:15px;cursor:pointer">A-</button>'+
    '<input type="range" min="12" max="50" value="'+S.st.fs+'" oninput="liveFs(this.value)" onchange="savFs(this.value)" style="flex:1">'+
    '<button onclick="adjFs(1)" style="padding:8px 14px;background:var(--bg2);border:1px solid var(--border);border-radius:6px;color:var(--fg);font-size:15px;cursor:pointer">A+</button>'+
    '<span style="width:32px;text-align:right;font-size:14px;color:var(--fg)" id="fs-val">'+S.st.fs+'</span></div>'+
    '<div class="cfg-sec-ttl">'+t('theme_bg')+'</div><div class="theme-row">'+
    '<button class="thm-btn'+(S.st.theme==='light'?' on':'')+'" onclick="setThm(\'light\',this)">☀️ '+t('light')+'</button>'+
    '<button class="thm-btn'+(S.st.theme==='dark'?' on':'')+'" onclick="setThm(\'dark\',this)">🌙 '+t('dark')+'</button>'+
    '<button class="thm-btn'+(S.st.theme==='sepia'?' on':'')+'" onclick="setThm(\'sepia\',this)">📜 '+t('sepia')+'</button>'+
    '</div><div class="cfg-sec-ttl">'+t('brightness')+'</div><div style="padding:10px 0;display:flex;align-items:center;gap:10px">'+
    '<span>🌑</span><input type="range" min="0.3" max="1.0" step="0.05" value="'+S.st.br+'" oninput="liveBr(this.value)" onchange="savBr(this.value)" style="flex:1"><span>☀️</span>'+
    '</div></div>';
}

// ── About page: version history (bilingual) ──
var VHIST=[
  {v:'v2.15',d:'2026.06',eng:['Chapter screen: tap the top-bar language button to pick primary & secondary languages, applied instantly','Scripture selection screen now shows book names in your primary language (English-only when primary is English)','Guide to the Scriptures content now supports pinch-to-zoom font resizing','Top-bar language & font-size controls now appear on all reading screens, and font size applies app-wide'],kor:['장 화면 상단 언어 버튼에서 주언어·부언어를 선택해 즉시 적용','경전 선택 화면에서 책 이름을 주언어로 표시(주언어가 영어이면 영어만 표시)','경전안내서 내용 화면에서 핀치 줌으로 글자 크기 조절 지원','상단 언어·글자크기 메뉴를 모든 읽기 화면에 표시하고 글자 크기를 앱 전체에 적용']},
  {v:'v2.14',d:'2026.06',eng:['Old Testament & New Testament now support dual-language (secondary language) display, like the other scriptures','Added a Technology Stack section to the About screen'],kor:['구약전서·신약전서에서도 다른 경전과 동일하게 두 언어(부언어) 동시 표시 지원','정보 화면에 기술 스택 정보 추가']},
  {v:'v2.13',d:'2026.06',eng:['Guide to the Scriptures: two-screen flow — pick a topic, then read it full-screen','Guide content shown paragraph-by-paragraph, primary then secondary language','Guide to the Scriptures cover added next to Pearl of Great Price','Home scripture grid: name labels removed from under the cover images','Sidebar: banner image above Home; title shown on two lines','Note editor: color swatches arranged in two rows','Fixed pinch-zoom on the chapter screen (no more "undefined"; summary kept)','Pinch-zoom now resizes the chapter summary and verses together'],
   kor:['경전 안내서: 두 화면 흐름 — 주제를 먼저 선택, 전체 화면으로 읽기','안내서 내용을 단락별로 주언어·부언어 표시','값진 진주 옆에 경전 안내서 표지 추가','홈 경전 목록: 표지 아래 이름 글자 제거','슬라이드 메뉴: 홈 위에 배너 이미지, 제목 두 줄 표시','노트 작성: 색상 표시 2단(두 줄)으로 표시','장 화면 핀치줌 오류 수정(undefined 제거, 요약 유지)','핀치줌 시 요약과 절이 함께 확대/축소']},  {v:'v2.12',d:'2026.06',eng:['Word/phrase-level highlight within a verse (verse menu + selection)','Text selection toolbar: web search & highlight added','Guide to the Scriptures added (bilingual split view)','Note color picker: 10 colors as box swatches','Pinch-zoom now also resizes chapter heading & summary','Chapter page: tighter margins, larger verse numbers','Book of Mormon front matter shown as cards','Home & sidebar header redesigned with logo','App-share link updated'],
   kor:['절 안의 단어·문장 단위 형광 (절 메뉴·선택)','본문 선택 메뉴에 웹검색·형광 추가','경전 안내서 추가 (이중언어 분할 화면)','노트 색상 10종 박스 선택','핀치줌이 장 머리말·요약도 함께 확대','장 페이지: 여백 축소·절 번호 확대','몰몬경 표제지 등 박스로 표시','홈·슬라이드바 상단 로고 적용','앱 공유 링크 수정']},
  {v:'v2.11',d:'2026.06',eng:['Book preface & subtitle shown at the start of each book','Chapter heading and summary shown atop every chapter','Official Church audio playback per chapter (primary language)','App display language limited to fully supported languages; instant full-UI switch','Default UI language set to English','Highlight color picker enlarged — 10 colors in two rows','Font selector shown in a two-column layout'],
   kor:['각 책 시작에 책 서문·부제 표시','모든 장 상단에 장 머리말·요약 표시','장별 교회 공식 음성 재생 (주언어)','앱 표시 언어를 완전 지원 언어로 제한 · 전체 UI 즉시 전환','기본 표시 언어 영어로 설정','형광펜 색상 선택 확대 — 두 줄 10색','글꼴 선택 2열 레이아웃']},
  {v:'v2.9',d:'2026.06',eng:['Articles of Faith shown in full without verse numbers','Official Declarations & introductions interleaved by language','Title page / introduction / witnesses as card layout','Settings: app language + appearance merged; scripture language separated','Search runs on the app display language','Secondary language disabled for Old/New Testament','Highlights expanded to 10 colors'],
   kor:['신앙개조 절번호 없이 전체 표시','공식선언·소개 단락별 인터리빙 (주/추가 언어)','표제지·소개·증언 박스 카드 레이아웃','설정: 앱 표시언어+외관 통합 / 경전 언어 분리','검색 앱 표시 언어 기반 동작','구약·신약 추가언어 비활성화','형광펜 10색 확장']},
  {v:'v2.8',d:'2026.06',eng:['Launcher icon applied','Screen transition fix for legacy WebView','Secondary-language loading stabilized (XHR)','Share feature fixed','Copy toast fix'],
   kor:['런처 아이콘 정식 적용','화면 전환 오류 수정 (구형 WebView 호환)','추가 언어 로드 안정화 (XHR)','공유하기 기능 정상화','텍스트 복사 토스트 수정']},
  {v:'v2.7',d:'2026.06',eng:['App display language selection (Korean/English/Japanese)','Paragraph-level 1↔2 language interleaving','Simplified verse menu (4 buttons)','Bookmark/note icons at verse end','About / Share localized'],
   kor:['앱 표시 언어 선택 (한·영·일)','단락별 1↔2언어 인터리빙','절 메뉴 단순화 (4버튼)','북마크·노트 절 끝 아이콘','About·공유 다국어화']},
  {v:'v2.6',d:'2026.06',eng:['Official Declarations without verse numbers','Three/Eight Witnesses bundled','Secondary-language HTML parsing fixed','Text selection & copy enabled','Version history page added'],
   kor:['공식선언 절번호 삭제','세·여덟 증인 증언 내장','추가언어 파싱 수정','본문 선택·복사 가능','버전 이력 페이지 추가']},
  {v:'v2.5',d:'2026.06',eng:['Language cache persisted locally (LRU 150)','Supported languages 20 → 37','Bilingual title pages / introductions'],
   kor:['언어 캐시 영구 저장 (LRU 150)','지원 언어 20→37개','이중언어 표제지·소개']},
  {v:'v2.0',d:'2026.01',eng:['Full SPA redesign','Live secondary-language API loading','Dual-language display','Notes & dark mode'],
   kor:['전체 SPA 재설계','추가 언어 API 실시간 로드','이중언어 동시 표시','노트·다크 모드']},
  {v:'v1.0',d:'2025.10',eng:['Initial release','Korean/English offline bundle','OT/NT/BoM/D&C included'],
   kor:['최초 출시','한·영 오프라인 내장','구약·신약·몰몬경·교성 수록']}
];
function buildAbout(){
  var ui=(S.st&&S.st.ui)||'kor';
  var L=function(o){return ui==='kor'?o.kor:o.eng;}; // jpn falls back to eng
  var title=ui==='eng'?'ℹ️ About':ui==='jpn'?'ℹ️ 情報':'ℹ️ 정보';
  var vh_title=ui==='eng'?'📋 Version History':ui==='jpn'?'📋 バージョン履歴':'📋 버전 이력';
  var dev_label=ui==='eng'?'Developer':ui==='jpn'?'開発者':'개발자';
  var contact_label=ui==='eng'?'Contact':ui==='jpn'?'連絡先':'문의';
  var bg_title=ui==='eng'?'📖 Background':ui==='jpn'?'📖 開発背景':'📖 개발 배경';
  var bg_text=ui==='eng'
    ?'The official app of The Church of Jesus Christ of Latter-day Saints displays scriptures in a single language. This app was created for those who wish to read scriptures side by side in two languages. All content uses only official Church translations; no unofficial translations are included.'
    :ui==='jpn'
    ?'末日聖徒イエス・キリスト教会の公式アプリは一言語のみ表示されます。このアプリは二言語で並べて経典を読みたい方々のために作られました。すべての内容は教会の公式翻訳のみを使用しています。'
    :'예수 그리스도 후기 성도 교회의 공식 앱은 단일 언어만 표시됩니다. 이 앱은 두 가지 언어로 경전을 나란히 읽고자 하는 분들을 위해 제작되었습니다. 모든 내용은 교회 공식 번역본만을 사용하며, 임의 번역은 일절 포함하지 않습니다.';
  var sc_title=ui==='eng'?'📚 Scriptures Included':ui==='jpn'?'📚 収録経典':'📚 수록 경전';
  var feat_title=ui==='eng'?'✏️ Key Features':ui==='jpn'?'✏️ 主な機能':'✏️ 주요 기능';
  var sc_body=ui==='eng'
    ?'• Old Testament (39) · New Testament (27)<br>• Book of Mormon (15 + title page, intro, witnesses)<br>• Doctrine & Covenants (138 + Official Declarations 1·2 + intro)<br>• Pearl of Great Price (5 + intro)'
    :ui==='jpn'
    ?'• 旧約聖書 (39) · 新約聖書 (27)<br>• モルモン書 (15 + 表題・紹介・証言)<br>• 教義と聖約 (138 + 公式の宣言1·2 + 紹介)<br>• 高価な真珠 (5 + 紹介)'
    :'• 구약전서 (39권) · 신약전서 (27권)<br>• 몰몬경 (15권 + 표제지·소개·증언)<br>• 교리와 성약 (138편 + 공식선언 1·2 + 소개)<br>• 값진 진주 (5권 + 소개)';
  var feat_body=ui==='eng'
    ?'• Dual-language display · paragraph interleaving<br>• Word-level partial highlighting<br>• Bookmarks · notes · highlights · history<br>• Full search · official audio playback<br>• 9 fonts · size 12–50px · pinch zoom<br>• App language: Korean / English / Japanese'
    :ui==='jpn'
    ?'• 二言語同時表示 · 段落インターリーブ<br>• 単語単位の部分マーカー<br>• ブックマーク · メモ · マーカー · 履歴<br>• 全文検索 · 公式音声再生<br>• フォント9種 · 12–50px · ピンチズーム<br>• 表示言語: 韓国語 / 英語 / 日本語'
    :'• 두 언어 동시 표시 · 단락 인터리빙<br>• 단어 선택 부분 형광<br>• 북마크 · 노트 · 형광 · 기록<br>• 전체 검색 · 공식 음성 재생<br>• 폰트 9종 · 12–50px · 핀치 줌<br>• 표시 언어: 한국어 / 영어 / 일본어';
  var src_label=ui==='eng'?'Scripture source: churchofjesuschrist.org (official Church site)':ui==='jpn'?'経典出典: churchofjesuschrist.org（教会公式サイト）':'경전 자료 출처: churchofjesuschrist.org (교회 공식 사이트)';
  var devName=ui==='eng'?'Seoul South Stake, Gangnam 2nd Ward':ui==='jpn'?'ソウル南ステーク 江南第2ワード':'서울 남스테이크 강남2 와드';
  var tech_title=ui==='eng'?'🛠️ Technology Stack':ui==='jpn'?'🛠️ 技術スタック':'🛠️ 기술 스택';
  var tech_body=ui==='eng'
    ?'• HTML5 · CSS3 · Vanilla JavaScript (no framework)<br>• Single-page app (SPA) · client-side rendering<br>• Android WebView wrapper (native APK)<br>• Offline-bundled scripture data (preloaded)<br>• churchofjesuschrist.org content API (online supplement)<br>• localStorage — settings · bookmarks · notes · highlights · history'
    :ui==='jpn'
    ?'• HTML5 · CSS3 · Vanilla JavaScript（フレームワーク不使用）<br>• シングルページアプリ (SPA) · クライアントサイドレンダリング<br>• Android WebView ラッパー（ネイティブ APK）<br>• オフライン同梱の経典データ（事前読み込み）<br>• churchofjesuschrist.org コンテンツ API（オンライン補完）<br>• localStorage — 設定 · ブックマーク · メモ · マーカー · 履歴'
    :'• HTML5 · CSS3 · 바닐라 JavaScript (프레임워크 미사용)<br>• 단일 페이지 앱 (SPA) · 클라이언트 사이드 렌더링<br>• 안드로이드 WebView 래퍼 (네이티브 APK)<br>• 오프라인 내장 경전 데이터 (사전 로드)<br>• churchofjesuschrist.org 콘텐츠 API (온라인 보완)<br>• localStorage — 설정 · 북마크 · 노트 · 형광 · 기록';

  var vh=VHIST.map(function(e){
    return'<p style="font-size:11px;color:var(--fg2);line-height:1.7;margin-top:8px"><b>'+e.v+'</b> — '+e.d+'<br>'+L(e).map(function(x){return'• '+x;}).join('<br>')+'</p>';
  }).join('');

  return'<div class="s-head"><span class="s-head-title">'+title+'</span></div>'+
    '<div class="about-wrap">'+
    '<div style="width:80px;height:80px;margin:0 auto 14px;border-radius:50%;overflow:hidden;background:var(--primary);display:flex;align-items:center;justify-content:center;box-shadow:0 3px 12px rgba(0,0,0,.25)">'+
    '<img src="assets/img/logo.png" style="width:72px;height:72px;object-fit:contain" onerror="this.outerHTML=\'<span style=&quot;font-size:40px&quot;>✦</span>\'"></div>'+
    '<div class="about-name">'+t('app_title')+'</div>'+
    '<div style="font-size:13px;color:var(--fg3);margin-bottom:4px">LDS Scriptures — Multilingual Edition</div>'+
    '<div class="about-ver">'+t('ver_label')+' 2.15.0</div>'+
    '<div style="margin:0 0 20px;text-align:left;background:var(--bg2);border-radius:10px;padding:12px 14px">'+
    '<p style="font-size:12px;font-weight:700;color:var(--primary2);margin-bottom:4px">'+vh_title+'</p>'+vh+'</div>'+
    '<div class="about-desc" style="text-align:left">'+
    '<p style="font-weight:700;font-size:15px;margin-bottom:8px;color:var(--fg)">'+bg_title+'</p>'+
    '<p style="margin-bottom:14px">'+bg_text+'</p>'+
    '<p style="font-weight:700;font-size:14px;margin-bottom:6px;color:var(--fg)">'+sc_title+'</p>'+
    '<p style="margin-bottom:14px">'+sc_body+'</p>'+
    '<p style="font-weight:700;font-size:14px;margin-bottom:6px;color:var(--fg)">'+feat_title+'</p>'+
    '<p style="margin-bottom:14px">'+feat_body+'</p>'+
    '</div>'+
    '<div style="background:var(--bg2);border-radius:10px;padding:12px 14px;margin-bottom:16px;text-align:left">'+
    '<p style="font-size:12px;font-weight:700;color:var(--primary2);margin-bottom:8px">👤 '+dev_label+'</p>'+
    '<p style="font-size:13px;color:var(--fg);line-height:1.8">'+devName+'<br><b>Peter S. Choi</b></p>'+
    '<p style="font-size:12px;font-weight:700;color:var(--primary2);margin:10px 0 6px">📧 '+contact_label+'</p>'+
    '<p style="font-size:13px;color:var(--fg)"><a href="mailto:ntec21c@gmail.com" style="color:var(--primary2)">ntec21c@gmail.com</a></p>'+
    '</div>'+
    '<div style="background:var(--bg2);border-radius:10px;padding:12px 14px;margin-bottom:16px;text-align:left">'+
    '<p style="font-size:12px;font-weight:700;color:var(--primary2);margin-bottom:8px">'+tech_title+'</p>'+
    '<p style="font-size:12px;color:var(--fg);line-height:1.9">'+tech_body+'</p>'+
    '</div>'+
    '<div class="about-credit">'+src_label+'</div>'+
    '</div>';
}
