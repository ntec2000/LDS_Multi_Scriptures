/* v2.12 / v2.13 additions — loads after v211.js */
(function(){
'use strict';

/* ---------- i18n ---------- */
function ext(lang,obj){
  try{ if(window.UI_STRINGS&&window.UI_STRINGS[lang]) Object.assign(window.UI_STRINGS[lang],obj); }catch(e){}
}
ext('kor',{word_hl:'단어',study_resources:'경전 안내서',guide_card:'경전 안내서',
  guide_select_hint:'주제를 선택하세요',web_search:'웹검색',
  sel_hl_fail:'형광 처리할 절을 찾지 못했습니다',loading:'불러오는 중…'});
ext('eng',{word_hl:'Word',study_resources:'Guide to the Scriptures',guide_card:'Guide to the Scriptures',
  guide_select_hint:'Select a topic',web_search:'Web search',
  sel_hl_fail:'Could not find a verse to highlight',loading:'Loading…'});
ext('jpn',{word_hl:'単語',study_resources:'聖典ガイド',guide_card:'聖典ガイド',
  guide_select_hint:'項目を選択してください',web_search:'ウェブ検索',
  sel_hl_fail:'ハイライトする節が見つかりません',loading:'読み込み中…'});
function T(k){ try{return window.t?window.t(k):k;}catch(e){return k;} }

/* ---------- styles ---------- */
(function(){
  var st=document.createElement('style');
  st.textContent=
  '.guide-row{display:block;width:100%;text-align:left;padding:13px 16px;border:none;'+
  'border-bottom:1px solid var(--border);background:transparent;cursor:pointer;color:var(--fg)}'+
  '.guide-row:active{background:var(--bg3)}'+
  '.gr-t1{font-size:15px;font-weight:600;line-height:1.35}'+
  '.gr-t2{font-size:13px;color:var(--fg3);margin-top:2px;line-height:1.3;font-style:italic}'+
  '.guide-chev{float:right;color:var(--fg3);font-size:15px;margin-top:2px}'+
  '#guide-list-scroll::-webkit-scrollbar{width:5px}';
  document.head.appendChild(st);
})();

/* ============================================================
   ITEM 9 + 10 — pinch-zoom resizes chapter heading/summary AND verses
   (fix: renderChHead repopulates #ch-head in place; never replaces it)
   ============================================================ */
(function(){
  if(typeof window.renderChHead==='function'){
    var orig=window.renderChHead;
    window.renderChHead=function(m1,m2,showL2){
      window._chMeta={m1:m1,m2:m2,showL2:showL2};
      return orig.apply(this,arguments);
    };
  }
  if(typeof window.applyFsDOM==='function'){
    var of=window.applyFsDOM;
    window.applyFsDOM=function(){
      var r=of.apply(this,arguments);
      try{
        if(window._chMeta&&typeof window.renderChHead==='function'
           &&document.getElementById('ch-head')){
          var m=window._chMeta;
          window.renderChHead(m.m1,m.m2,m.showL2); /* repopulates #ch-head at new fs */
        }
      }catch(e){}
      return r;
    };
  }
})();

/* ============================================================
   ITEM 7 — selection toolbar: web search + highlight
   ============================================================ */
(function(){
  document.addEventListener('selectionchange',function(){
    try{
      var sel=window.getSelection();
      if(sel&&sel.rangeCount&&(''+sel).trim()){
        window._lastSelText=(''+sel).trim();
        var n=sel.anchorNode;
        window._lastSelNode=(n&&n.nodeType===3)?n.parentNode:n;
      }
    }catch(e){}
  });

  window.webSearch=function(q){
    q=(q||window._lastSelText||'').trim();
    if(!q) return;
    var url='https://www.google.com/search?q='+encodeURIComponent(q);
    try{ if(window.Android&&window.Android.openUrl){window.Android.openUrl(url);return;} }catch(e){}
    try{ var w=window.open(url,'_blank'); if(w) return; }catch(e){}
    try{ var a=document.createElement('a'); a.href=url; a.target='_blank'; a.rel='noopener';
         document.body.appendChild(a); a.click(); a.remove(); }catch(e){}
  };

  window.selHLFromNode=function(node){
    try{
      node=node||window._lastSelNode;
      if(!node) return false;
      var vi=node.closest?node.closest('.vi'):null;
      if(!vi&&node.parentNode&&node.parentNode.closest) vi=node.parentNode.closest('.vi');
      if(!vi||!vi.id) return false;
      var vn=parseInt(vi.id.replace(/^v/,''),10);
      if(!vn||isNaN(vn)) return false;
      if(!window.S||!window.S.book||typeof window.mkVK!=='function') return false;
      window.S.pvn=vn;
      window.S.pvk=window.mkVK(window.S.book.id,window.S.ch,vn);
      if(typeof window.vpPartial==='function'){ window.vpPartial(); return true; }
      return false;
    }catch(e){ return false; }
  };

  function wireSelBar(){
    var bar=document.getElementById('sel-bar');
    if(!bar) return;
    var hl=bar.querySelector('[data-act="hl"]');
    var sr=bar.querySelector('[data-act="search"]');
    if(hl&&!hl._w212){ hl._w212=1; hl.addEventListener('click',function(ev){
      ev.preventDefault();ev.stopPropagation();
      var ok=window.selHLFromNode(window._lastSelNode);
      if(!ok&&window.showToast) window.showToast(T('sel_hl_fail'));
    },true); }
    if(sr&&!sr._w212){ sr._w212=1; sr.addEventListener('click',function(ev){
      ev.preventDefault();ev.stopPropagation();
      window.webSearch(window._lastSelText);
    },true); }
  }
  if(document.readyState!=='loading') wireSelBar();
  document.addEventListener('DOMContentLoaded',wireSelBar);
  setTimeout(wireSelBar,800);
})();

/* ============================================================
   ITEM 1/2/4/5/16 — Guide to the Scriptures: two-screen flow
     screen 'guide'       -> topic LIST (select on a previous screen)
     screen 'guide-topic' -> full-page content, per-paragraph L1->L2
   ============================================================ */
(function(){
  var GS_API='https://www.churchofjesuschrist.org/study/api/v3/language-pages/type/content?lang=';
  var GS_IDX='/scriptures/gs';
  var LOC={kor:'ko',eng:'en',jpn:'ja',cht:'zh-Hant',chs:'zh-Hans',spa:'es',por:'pt',fra:'fr',deu:'de',rus:'ru'};
  function localeOf(l){ return LOC[l]||'en'; }
  function st(){ return (window.S&&window.S.st)||{}; }
  function l1(){ return st().l1||'kor'; }
  function l2(){ return st().l2||'eng'; }
  function showL2(){ var s=st(); return !!(s.sl2&&s.l2&&s.l2!==s.l1); }
  function apiUrl(lang,uri){ return GS_API+lang+'&uri='+encodeURIComponent(uri); }
  function ea(s){ return (''+s).replace(/'/g,"\\'"); }
  function eh(s){ return window.eh?window.eh(s):(''+s); }
  function imgFor(){ return 'assets/img/guide.jpg'; }

  /* home card next to PGP — NO text label (title is baked into the image) */
  window.buildGuideCard=function(){
    var img=imgFor();
    return '<div class="sec-label">'+T('guide_card')+'</div>'+
      '<div class="sc-img-grid">'+
      '<div class="sc-img-card" onclick="navTo(\'guide\')">'+
      '<img class="sc-img" src="'+img+'" onerror="this.style.display=\'none\'">'+
      '</div></div>';
  };

  /* ---------- screen 1: topic list ---------- */
  window.buildGuide=function(){
    return '<div class="s-head"><span class="s-head-title">'+T('guide_card')+'</span></div>'+
      '<div id="guide-list-scroll" style="-webkit-overflow-scrolling:touch">'+
      '<div id="guide-list">'+
      '<div style="padding:16px;color:var(--fg3);font-size:14px">'+T('loading')+'</div>'+
      '</div></div>';
  };

  function parseGuideIndex(body){
    var out=[],seen={};
    try{
      var doc=new DOMParser().parseFromString(body,'text/html');
      var as=doc.querySelectorAll('a[href*="/scriptures/gs/"]');
      for(var i=0;i<as.length;i++){
        var href=as[i].getAttribute('href')||'';
        var m=href.match(/\/scriptures\/gs\/([^?#"]+)/);
        if(!m) continue;
        var slug=m[1];
        if(seen[slug]) continue; seen[slug]=1;
        var tt=as[i].querySelector('.title');
        var txt=(tt?tt.textContent:as[i].textContent||'').replace(/\s+/g,' ').trim();
        out.push({uri:'/scriptures/gs/'+slug,t:txt});
      }
    }catch(e){}
    return out;
  }

  window.loadGuide=function(){
    /* cache the topic list across navigations */
    if(window._guideTopics&&window._guideTopics.length){ renderGuideList(); return; }
    var L1=l1(), dual=showL2(), L2=l2(), loc1=localeOf(L1);
    window.xhrJson(apiUrl(L1,GS_IDX),function(d){
      var idx1=parseGuideIndex((d&&d.content&&d.content.body)||'');
      function finish(idx2){
        var map2={};
        if(idx2){ for(var j=0;j<idx2.length;j++) map2[idx2[j].uri]=idx2[j].t; }
        var topics=idx1.map(function(o){ return {uri:o.uri,t1:o.t,t2:dual?(map2[o.uri]||''):''}; });
        topics.sort(function(a,b){ return (a.t1||'').localeCompare((b.t1||''),loc1); });
        window._guideTopics=topics;
        renderGuideList();
      }
      if(dual){
        window.xhrJson(apiUrl(L2,GS_IDX),function(d2){
          finish(parseGuideIndex((d2&&d2.content&&d2.content.body)||''));
        },function(){ finish(null); });
      }else finish(null);
    },function(){
      var el=document.getElementById('guide-list');
      if(el) el.innerHTML='<div style="padding:16px;color:var(--fg3);font-size:14px">'+T('sel_hl_fail')+'</div>';
    });
  };

  function renderGuideList(){
    var el=document.getElementById('guide-list');
    if(!el) return;
    var t=window._guideTopics||[];
    if(!t.length){ el.innerHTML='<div style="padding:16px;color:var(--fg3);font-size:14px">—</div>'; return; }
    var h='';
    for(var i=0;i<t.length;i++){
      h+='<button class="guide-row" onclick="guidePick(\''+ea(t[i].uri)+'\',\''+ea(t[i].t1||'')+'\')">'+
        '<span class="guide-chev">›</span>'+
        '<div class="gr-t1">'+eh(t[i].t1||'')+'</div>'+
        (t[i].t2?'<div class="gr-t2">'+eh(t[i].t2)+'</div>':'')+
        '</button>';
    }
    el.innerHTML=h;
  }
  window.renderGuideList=renderGuideList;

  /* tapping a topic -> go to the content screen (uses S.sp like static-page) */
  window.guidePick=function(uri,title){
    window.S.sp={uri:uri,title:title||'',content:null};
    window.navTo('guide-topic');
  };

  /* ---------- screen 2: full-page content ---------- */
  window.buildGuideTopic=function(){
    var ttl=(window.S&&window.S.sp&&window.S.sp.title)||T('guide_card');
    return '<div class="s-head"><span class="s-head-title">'+eh(ttl)+'</span></div>'+
      '<div id="guide-topic-body" style="-webkit-user-select:text;user-select:text">'+
      '<div style="padding:16px;color:var(--fg3);font-size:14px">'+T('loading')+'</div>'+
      '</div>';
  };

  window.loadGuideTopic=function(){
    var uri=(window.S&&window.S.sp&&window.S.sp.uri)||'';
    if(!uri) return;
    var L1=l1(), dual=showL2(), L2=l2();
    var ff=(window.getFontCss?window.getFontCss():'inherit');
    window.xhrJson(apiUrl(L1,uri),function(d){
      var p1=window.parseStaticParas((d&&d.content&&d.content.body)||'');
      function done(p2){
        var area=document.getElementById('guide-topic-body');
        if(!area) return;
        var has2=!!(p2&&p2.length);
        window.renderStaticArea(area,p1,p2||[],dual&&has2,ff);
      }
      if(dual){
        window.xhrJson(apiUrl(L2,uri),function(d2){
          done(window.parseStaticParas((d2&&d2.content&&d2.content.body)||''));
        },function(){ done(null); });
      }else done(null);
    },function(){
      var area=document.getElementById('guide-topic-body');
      if(area) area.innerHTML='<div style="padding:16px;color:var(--fg3);font-size:14px">—</div>';
    });
  };
})();

})();

/* ============================================================
   v2.15 — Req 1 (cv language picker), Req 3 (guide/static pinch-zoom),
   Req 4 (top bar on content screens + global font reflow)
   ============================================================ */
(function(){
  var S=window.S;
  function _L(ko,en,ja){var u=(window.S&&window.S.st&&window.S.st.ui)||'kor';return u==='eng'?en:(u==='jpn'?ja:ko);}

  /* ---- Req 4a: remember last static/guide render for font reflow ---- */
  if(typeof window.renderStaticArea==='function'){
    var _rsa=window.renderStaticArea;
    window.renderStaticArea=function(area,p1,p2,showL2,ff){
      try{ if(area&&area.id) window._lastStatic={id:area.id,p1:p1,p2:p2,showL2:showL2,ff:ff}; }catch(e){}
      return _rsa.apply(this,arguments);
    };
  }

  /* ---- Req 4b: applyFsDOM re-renders static/guide content at new font size ---- */
  if(typeof window.applyFsDOM==='function'){
    var _afd=window.applyFsDOM;
    window.applyFsDOM=function(){
      var r=_afd.apply(this,arguments);
      try{
        var nav=window.S&&window.S.nav;
        if((nav==='guide-topic'||nav==='static-page')&&window._lastStatic){
          var ls=window._lastStatic;
          var area=document.getElementById(ls.id);
          if(area&&typeof window.renderStaticArea==='function')
            window.renderStaticArea(area,ls.p1,ls.p2,ls.showL2,ls.ff);
        }
      }catch(e){}
      return r;
    };
  }

  /* ---- Req 4c: top bar (language + font) shown on content screens ---- */
  if(typeof window.renderScreen==='function'){
    var _rs=window.renderScreen;
    window.renderScreen=function(){
      var r=_rs.apply(this,arguments);
      try{
        var nav=window.S&&window.S.nav;
        if(nav==='static-page'||nav==='guide-topic'){
          var ttl=(window.S&&window.S.sp&&window.S.sp.title)||'';
          if(typeof window.showTopBar==='function')window.showTopBar(ttl);
        }
      }catch(e){}
      return r;
    };
  }

  /* ---- Req 3: two-finger pinch-zoom on guide/static content ---- */
  var _pd=0;
  function _gate(){var nav=window.S&&window.S.nav;return nav==='guide-topic'||nav==='static-page';}
  function _dist(t){var dx=t[0].clientX-t[1].clientX,dy=t[0].clientY-t[1].clientY;return Math.sqrt(dx*dx+dy*dy);}
  document.addEventListener('touchstart',function(e){
    if(!_gate())return;
    if(e.touches&&e.touches.length===2)_pd=_dist(e.touches);
  },{passive:true});
  document.addEventListener('touchmove',function(e){
    if(!_gate())return;
    if(e.touches&&e.touches.length===2&&_pd>0){
      var nd=_dist(e.touches),diff=nd-_pd;
      if(Math.abs(diff)>=38){
        var step=diff>0?1:-1;
        var nf=Math.max(12,Math.min(50,window.S.st.fs+step));
        if(nf!==window.S.st.fs){window.S.st.fs=nf;if(window.savST)window.savST();if(window.applyFsDOM)window.applyFsDOM();}
        _pd=nd;
      }
      if(e.cancelable)e.preventDefault();
    }
  },{passive:false});
  document.addEventListener('touchend',function(e){if(!e.touches||e.touches.length<2)_pd=0;},{passive:true});

  /* ---- Req 1: language picker modal (from cv top bar) ---- */
  if(!document.getElementById('lp-style')){
    var st=document.createElement('style');
    st.id='lp-style';
    st.textContent=
      '.lp-ov{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9999;display:flex;align-items:flex-end;justify-content:center}'+
      '.lp-box{background:var(--bg2);width:100%;max-width:520px;border-radius:16px 16px 0 0;padding:18px 18px 22px;box-shadow:0 -6px 24px rgba(0,0,0,.3);animation:lpup .18s ease}'+
      '@keyframes lpup{from{transform:translateY(100%)}to{transform:translateY(0)}}'+
      '.lp-ttl{font-size:17px;font-weight:700;color:var(--fg);margin-bottom:14px;text-align:center}'+
      '.lp-lbl{display:block;font-size:13px;color:var(--fg3);margin:10px 0 6px}'+
      '.lp-sel{width:100%;padding:11px 12px;font-size:15px;background:var(--bg3);color:var(--fg);border:1px solid var(--border);border-radius:9px;-webkit-appearance:menulist}'+
      '.lp-tgrow{display:flex;align-items:center;justify-content:space-between;margin:16px 0 4px}'+
      '.lp-lbl2{font-size:14px;color:var(--fg)}'+
      '.lp-tgl{width:46px;height:26px;border-radius:13px;border:none;background:var(--border);position:relative;cursor:pointer;transition:background .15s}'+
      '.lp-tgl:before{content:"";position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;transition:left .15s}'+
      '.lp-tgl.on{background:var(--accent)}.lp-tgl.on:before{left:23px}'+
      '.lp-btns{display:flex;gap:10px;margin-top:20px}'+
      '.lp-btns button{flex:1;padding:13px;font-size:15px;font-weight:600;border-radius:10px;cursor:pointer;border:1px solid var(--border)}'+
      '.lp-cancel{background:var(--bg3);color:var(--fg)}'+
      '.lp-ok{background:var(--accent);color:#fff;border-color:var(--accent)}';
    document.head.appendChild(st);
  }

  window.closeLangPicker=function(){var ov=document.getElementById('lp-ov');if(ov&&ov.parentNode)ov.parentNode.removeChild(ov);};

  window.lpTogSL2=function(btn){
    btn.classList.toggle('on');
    var w=document.getElementById('lp-l2wrap');
    if(w)w.style.display=btn.classList.contains('on')?'':'none';
  };

  window.openLangPicker=function(){
    window.closeLangPicker();
    var st=window.S.st,L1=st.l1,L2=st.l2,SL2=!!st.sl2;
    var opts=window.mkLOpts;
    var ov=document.createElement('div');
    ov.id='lp-ov';ov.className='lp-ov';
    ov.onclick=function(e){if(e.target===ov)window.closeLangPicker();};
    ov.innerHTML='<div class="lp-box">'+
      '<div class="lp-ttl">'+_L('언어 선택','Language','言語選択')+'</div>'+
      '<label class="lp-lbl">'+_L('주 언어','Primary language','主言語')+'</label>'+
      '<select id="lp-l1" class="lp-sel">'+opts(L1)+'</select>'+
      '<div class="lp-tgrow"><span class="lp-lbl2">'+_L('부 언어 함께 보기','Show secondary language','副言語を併記')+'</span>'+
        '<button id="lp-sl2" class="lp-tgl'+(SL2?' on':'')+'" onclick="lpTogSL2(this)"></button></div>'+
      '<div id="lp-l2wrap" style="'+(SL2?'':'display:none')+'">'+
        '<label class="lp-lbl">'+_L('부 언어','Secondary language','副言語')+'</label>'+
        '<select id="lp-l2" class="lp-sel">'+opts(L2)+'</select></div>'+
      '<div class="lp-btns">'+
        '<button class="lp-cancel" onclick="closeLangPicker()">'+_L('취소','Cancel','キャンセル')+'</button>'+
        '<button class="lp-ok" onclick="lpApply()">'+_L('적용','Apply','適用')+'</button>'+
      '</div></div>';
    document.body.appendChild(ov);
  };

  window.lpApply=function(){
    var e1=document.getElementById('lp-l1'),e2=document.getElementById('lp-l2'),sb=document.getElementById('lp-sl2');
    if(!e1)return;
    var l1=e1.value,sl2=sb&&sb.classList.contains('on'),l2=e2?e2.value:window.S.st.l2;
    window.S.st.l1=l1;window.S.st.l2=l2;window.S.st.sl2=!!sl2;
    window.S.vs={l1:[],l2:[]};
    if(window.savST)window.savST();
    if(typeof window.updLangBtn==='function')window.updLangBtn();
    window.closeLangPicker();
    if(window.stopAudio)window.stopAudio();
    var nav=window.S.nav;
    if(nav==='cv'&&window.S.book){
      var sc=document.getElementById('screen');
      if(sc)sc.innerHTML='<div class="loading" style="flex-direction:column;gap:10px;padding-top:60px"><div>🌐</div><div style="font-size:13px">'+(window.t?window.t('lang_loading'):'…')+'</div></div>';
      window.doLoadCD(window.S.book.id,window.S.ch,function(v1,v2){
        window.S.vs={l1:v1,l2:v2};
        var sc2=document.getElementById('screen');
        if(sc2){sc2.innerHTML=window.buildCV();if(window.initCV)window.initCV();}
      });
    }else{
      if(window.renderScreen)window.renderScreen();
    }
  };
})();
