(function () {
  var S = window.SITE, NS = "http://www.w3.org/2000/svg";
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function $(id) { return document.getElementById(id); }
  function link(text, href, cls) { var a = el("a", cls || null, text); a.href = href; if (/^https?:/.test(href)) { a.rel = "noopener"; a.target = "_blank"; } return a; }
  function on(list) { return (list || []).filter(function (x) { return x.visible !== false; }); }

  // ---- hero (static markup, data-filled)
  $("name").textContent = S.name;
  $("intro").textContent = S.intro;
  $("foot").textContent = "\u00A9 " + new Date().getFullYear() + " " + S.name;
  S.card.forEach(function (kv) { $("card").appendChild(el("dt", "px-font", kv[0])); $("card").appendChild(el("dd", null, kv[1])); });
  var map = ["...hhhhhh...", "..hhhhhhhh..", ".hhssssssshh", ".hhsesseshh.", ".hhsssssshh.", "...ssmmss...", "....ssss....", "..llllllll..", ".lllllllllll", "..llllllll.."];
  var col = { h: "#FF5BAE", s: "#FFF3E8", e: "#211326", m: "#FF5BAE", l: "#B9A0F5" }, av = $("avatar");
  if (S.photo) {
    var ph = el("img", "photo"); ph.src = S.photo; ph.alt = "Portrait of " + S.name; ph.width = 112; ph.height = 112;
    av.replaceWith(ph); av = document.createElementNS(NS, "svg");   // detached; skips drawing the avatar
  }
  av.setAttribute("viewBox", "0 0 12 10"); av.setAttribute("shape-rendering", "crispEdges");
  map.forEach(function (row, y) { row.split("").forEach(function (c, x) {
    if (c === ".") return; var r = document.createElementNS(NS, "rect");
    r.setAttribute("x", x); r.setAttribute("y", y); r.setAttribute("width", 1); r.setAttribute("height", 1); r.setAttribute("fill", col[c]); av.appendChild(r);
  }); });

  // ---- renderers: each fills `body` and returns true if it has content
  var R = {};
  function entryBlock(title, meta, text, extra) {
    var d = el("div", "entry"); d.appendChild(el("h3", null, title));
    if (meta) d.appendChild(el("p", "meta", meta));
    if (text) d.appendChild(el("p", null, text));
    if (extra) d.appendChild(extra);
    return d;
  }
  R.about = function (b) { (S.about || []).forEach(function (t) { b.appendChild(el("p", "prose", t)); }); return !!(S.about && S.about.length); };
  R.experience = function (b) { var l = on(window.EXPERIENCE); l.forEach(function (e) { b.appendChild(entryBlock(e.role, [e.org, e.period].filter(Boolean).join(", "), e.summary)); }); return l.length > 0; };
  R.education = function (b) { var l = on(window.EDUCATION); l.forEach(function (e) {
    b.appendChild(entryBlock(e.school, [e.degree, e.period].filter(Boolean).join(", "), e.cgpa ? "CGPA: " + e.cgpa : null)); }); return l.length > 0; };
  R.skills = function (b) {
    var l = (window.SKILLS || []).filter(function (g) { return g.items && g.items.length; });
    var dl = el("dl", "groups"); l.forEach(function (g) {
      dl.appendChild(el("dt", "px-font", g.group));
      var dd = el("dd"), ul = el("ul", "chips"); g.items.forEach(function (i) { ul.appendChild(el("li", null, i)); }); dd.appendChild(ul); dl.appendChild(dd);
    }); b.appendChild(dl); return l.length > 0;
  };
  R.coursework = function (b) {
    var l = (window.COURSEWORK || []).filter(function (c) { return c.show; });
    var ul = el("ul", "chips"); l.forEach(function (c) { ul.appendChild(el("li", null, c.name)); }); b.appendChild(ul); return l.length > 0;
  };
  R.achievements = function (b) {
    var l = on(window.ACHIEVEMENTS), ul = el("ul", "ach"); l.forEach(function (a) {
      var li = el("li"); li.appendChild(el("strong", null, a.title)); li.appendChild(document.createTextNode(" " + (a.result || "")));
      if (a.certificate) { li.appendChild(document.createTextNode(" ")); li.appendChild(link("View certificate", a.certificate)); }
      ul.appendChild(li);
    }); b.appendChild(ul); return l.length > 0;
  };
  R.certificates = function (b) {
    var l = on(window.CERTIFICATES), ul = el("ul", "ach"); l.forEach(function (c) {
      var li = el("li"); li.appendChild(el("strong", null, c.title)); li.appendChild(document.createTextNode(" " + [c.issuer, c.year].filter(Boolean).join(", ") + " "));
      if (c.url) li.appendChild(link("View", c.url)); ul.appendChild(li);
    }); b.appendChild(ul); return l.length > 0;
  };
  R.resume = function (b) {
    if (!S.links.resume) return false;
    var row = el("div", "cta-row"); row.appendChild(link("View R\u00E9sum\u00E9", S.links.resume, "btn btn-main"));
    var d = link("Download R\u00E9sum\u00E9", S.links.resume, "btn"); d.setAttribute("download", ""); row.appendChild(d); b.appendChild(row); return true;
  };
  R.contact = function (b) {
    var L = S.links, ul = el("ul", "links"), n = 0;
    [["GitHub", L.github], ["LinkedIn", L.linkedin],
     [L.email, L.email && "mailto:" + L.email],
     [L.phone, L.phone && "tel:" + String(L.phone).replace(/[^+\d]/g, "")]].forEach(function (k) {
      if (!k[0] || !k[1]) return; var li = el("li"); li.appendChild(link(k[0], k[1], "btn")); ul.appendChild(li); n++;
    }); b.appendChild(ul); return n > 0;
  };

  // ---- projects selector
  R.projects = function (b) {
    var P = on(window.PROJECTS).filter(function (p) { return p.name && p.description; });
    if (!P.length) return false;
    var wrap = el("div", "select px"), list = el("ul", "plist"), box = el("article", "pdetail");
    list.setAttribute("role", "listbox"); list.setAttribute("aria-label", "Projects"); box.setAttribute("aria-live", "polite");
    function row(label, node) { var r = el("div", "f"); r.appendChild(el("dt", "px-font", label)); var d = el("dd"); d.appendChild(node); r.appendChild(d); return r; }
    function show(i) {
      var p = P[i]; box.textContent = ""; box.appendChild(el("h3", "px-font pname", p.name));
      var dl = el("dl", "fields");
      dl.appendChild(row("About", el("span", null, p.description)));
      if (p.stack && p.stack.length) { var ul = el("ul", "chips"); p.stack.forEach(function (s) { ul.appendChild(el("li", null, s)); }); dl.appendChild(row("Stack", ul)); }
      var ls = el("span", "plinks");
      if (p.repo) ls.appendChild(link("Repository", p.repo));
      if (p.demo) ls.appendChild(link("Live demo", p.demo));
      if (ls.children.length) dl.appendChild(row("Links", ls));
      box.appendChild(dl);
      if (p.type === "fork" && p.forkOf) { var f = el("p", "note", "Forked from "); f.appendChild(link(p.forkOf.name, p.forkOf.url)); f.appendChild(document.createTextNode(".")); box.appendChild(f); }
      if (p.note) box.appendChild(el("p", "note", p.note));
      [].forEach.call(list.children, function (li, j) { li.firstChild.setAttribute("aria-selected", j === i); });
    }
    P.forEach(function (p, i) {
      var li = el("li"), bt = el("button", "item", p.name); bt.type = "button"; bt.setAttribute("role", "option");
      bt.addEventListener("click", function () { show(i); }); li.appendChild(bt); list.appendChild(li);
    });
    list.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return; e.preventDefault();
      var items = [].slice.call(list.querySelectorAll("button")), k = items.indexOf(document.activeElement);
      var n = items[(k + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length]; n.focus(); n.click();
    });
    wrap.appendChild(list); wrap.appendChild(box); b.appendChild(wrap);
    var f = 0; P.some(function (p, i) { if (p.featured) { f = i; return true; } }); show(f); return true;
  };

  // ---- assemble in configured order; hidden/empty sections vanish with their nav item
  var main = $("main"), nav = $("nav");
  S.sections.forEach(function (s) {
    if (s.visible === false) return;
    var sec;
    if (s.id === "home") sec = $("home");
    else {
      if (!R[s.id]) return;
      sec = el("section", "wrap block"); sec.id = s.id; sec.setAttribute("aria-labelledby", s.id + "-h");
      var h = el("h2", "px-font h2", s.label); h.id = s.id + "-h"; sec.appendChild(h);
      if (s.sub) sec.appendChild(el("p", "sub", s.sub));
      var body = el("div", "body"); sec.appendChild(body);
      if (!R[s.id](body)) return;
    }
    main.appendChild(sec);
    if (s.id !== "home") { var li = el("li"); li.appendChild(link(s.label, "#" + s.id)); nav.appendChild(li); }
  });
  // hero "Contact" button only if a contact section exists
  if (!$("contact")) { var cb = document.querySelector('.cta-row a[href="#contact"]'); if (cb) cb.remove(); }
})();
