const tips = [
      "自习想不动？先做 5 分钟最简单的那一步：打开课本、写下题号。",
      "社团面试紧张：准备 30 秒自我介绍 + 1 个你最想学到的技能。",
      "食堂排队太久：避开 11:30-12:10 & 17:30-18:10 的高峰段。",
      "想交朋友：把“你来自哪里？”换成“你最近在追什么/学什么？”",
      "记单词别硬背：用 3 个例句把词放进生活场景里。",
      "晨跑不需要狠：坚持 10 分钟就赢过大多数“计划型选手”。",
      "课多疲惫：午后 15 分钟闭眼休息，比刷手机更解压。",
      "作业写不下去：先写“目录/要点”，再填内容，速度会翻倍。"
    ];

    const baseEvents = [
      { m:"12月", d:"16", title:"期末复习共学夜", meta:"地点：图书馆自习区 · 主题：高效复盘 + 互相打气" },
      { m:"12月", d:"18", title:"社团招新展示台", meta:"地点：主干道广场 · 摄影/音乐/志愿者等" },
      { m:"12月", d:"21", title:"校园跑团夜跑", meta:"地点：操场入口 · 3km/5km 自由选择" },
      { m:"12月", d:"24", title:"冬日市集与明信片交换", meta:"地点：食堂门口 · 小礼物/手作/祝福卡" },
      { m:"12月", d:"28", title:"学期总结分享会", meta:"地点：教学楼 A101 · 经验/踩坑/建议" }
    ];

    const extraEventPool = [
      { m:"1月", d:"03", title:"新年计划工作坊", meta:"地点：学生活动中心 · 目标拆解 + 习惯跟踪" },
      { m:"1月", d:"05", title:"摄影社外拍：傍晚校园", meta:"地点：钟楼集合 · 适合新手入门" },
      { m:"1月", d:"08", title:"篮球友谊赛", meta:"地点：体育馆 · 观赛/助威也欢迎" },
      { m:"1月", d:"10", title:"英语角：电影台词朗读", meta:"地点：咖啡吧 · 轻松聊天" }
    ];

    const shots = [
      { t:"图书馆光影", u:"assets/images/campus1.jpg", c:"安静的角落，总能让思绪变得清晰。" },
      { t:"操场晚风", u:"assets/images/campus1.jpg", c:"跑一圈，把烦恼交给风。" },
      { t:"课堂笔记", u:"assets/images/campus1.jpg", c:"把知识写下来，就是在和未来的自己对话。" },
      { t:"校园小路", u:"assets/images/campus1.jpg", c:"偶遇和告别，都发生在路上。" },
      { t:"午后咖啡", u:"assets/images/campus1.jpg", c:"给自己一个小小的能量补给。" },
      { t:"社团舞台", u:"assets/images/campus1.jpg", c:"勇敢上台的那一刻，你已经赢了。" },
      { t:"团队合作", u:"assets/images/campus1.jpg", c:"一起做事的日子，会变成最暖的回忆。" },
      { t:"宿舍日常", u:"assets/images/campus1.jpg", c:"把小空间过成自己的宇宙。" },
      { t:"雨后操场", u:"assets/images/campus1.jpg", c:"雨停之后，空气里全是新的开始。" },
      { t:"食堂美食", u:"assets/images/campus1.jpg", c:"今天也要好好吃饭。" },
      { t:"夕阳建筑", u:"assets/images/campus1.jpg", c:"金色时刻，校园像电影一样。" },
      { t:"夜读时刻", u:"assets/images/campus1.jpg", c:"灯下的专注，会悄悄改变你。" }
    ];

    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => Array.from(document.querySelectorAll(sel));

    function renderEvents(list){
      const ul = $("#eventList");
      ul.innerHTML = "";
      list.forEach(ev => {
        const li = document.createElement("li");
        li.className = "event";
        li.setAttribute("data-tags", (ev.title + " " + ev.meta).toLowerCase());
        li.innerHTML = `
          <div class="date"><small>${ev.m}</small><span>${ev.d}</span></div>
          <div>
            <b>${ev.title}</b>
            <div class="meta">${ev.meta}</div>
          </div>
        `;
        ul.appendChild(li);
      });
    }

    function renderGallery(){
      const grid = $("#galleryGrid");
      grid.innerHTML = "";
      $("#galleryCount").textContent = shots.length.toString();
      shots.forEach((s, idx) => {
        const div = document.createElement("div");
        div.className = "shot";
        div.style.backgroundImage = `linear-gradient(180deg, rgba(7,10,20,.08), rgba(7,10,20,.55)), url('${s.u}')`;
        div.setAttribute("role", "button");
        div.setAttribute("tabindex", "0");
        div.setAttribute("aria-label", "打开图片：" + s.t);
        div.innerHTML = `<span>#${String(idx+1).padStart(2,"0")} · ${s.t}</span>`;
        div.addEventListener("click", () => openModal(s));
        div.addEventListener("keydown", (e) => {
          if(e.key === "Enter" || e.key === " ") openModal(s);
        });
        grid.appendChild(div);
      });
    }

    function openModal(shot){
      const modal = $("#modal");
      $("#modalTitle").textContent = shot.t;
      $("#modalImg").style.backgroundImage = `url('${shot.u}')`;
      $("#modalCap").textContent = shot.c;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden","false");
      document.body.style.overflow = "hidden";
    }
    function closeModal(){
      const modal = $("#modal");
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden","true");
      document.body.style.overflow = "";
    }

    function setHighlight(query){
      const q = query.trim().toLowerCase();
      const cards = $$("#featureGrid .card");
      const events = $$("#eventList .event");

      const set = (el, hit) => {
        el.style.outline = hit ? "2px solid rgba(46,230,166,.65)" : "none";
        el.style.boxShadow = hit ? "0 0 0 6px rgba(46,230,166,.12), 0 10px 22px rgba(0,0,0,.25)" : "";
      };

      if(!q){
        cards.forEach(c => set(c,false));
        events.forEach(e => set(e,false));
        $("#searchHint").innerHTML = "试试输入：<b>自习</b>、<b>社团</b>、<b>晚风</b> 或 <b>食堂</b>。下面的卡片会高亮匹配内容。";
        return;
      }

      let hits = 0;
      cards.forEach(c => {
        const tags = (c.getAttribute("data-tags") || "").toLowerCase();
        const text = (c.innerText || "").toLowerCase();
        const hit = tags.includes(q) || text.includes(q);
        set(c, hit);
        if(hit) hits++;
      });

      events.forEach(e => {
        const tags = (e.getAttribute("data-tags") || "");
        const hit = tags.includes(q);
        set(e, hit);
        if(hit) hits++;
      });

      $("#searchHint").innerHTML = `已为你高亮匹配 <b>${q}</b> 的内容：共 <b>${hits}</b> 处。`;
    }

    function randomTip(){
      const tip = tips[Math.floor(Math.random() * tips.length)];
      const box = document.createElement("div");
      box.style.position = "fixed";
      box.style.left = "50%";
      box.style.bottom = "18px";
      box.style.transform = "translateX(-50%)";
      box.style.padding = "12px 14px";
      box.style.maxWidth = "min(720px, calc(100% - 24px))";
      box.style.borderRadius = "16px";
      box.style.background = "rgba(15,23,51,.88)";
      box.style.border = "1px solid rgba(38,48,90,.8)";
      box.style.boxShadow = "0 18px 60px rgba(0,0,0,.55)";
      box.style.backdropFilter = "blur(12px)";
      box.style.color = "rgba(232,236,255,.95)";
      box.style.fontSize = "13px";
      box.style.lineHeight = "1.6";
      box.style.zIndex = "100";
      box.innerHTML = `<b style="color:#c9fff1">校园小贴士</b>：${tip} <span style="opacity:.65">（点击关闭）</span>`;
      box.addEventListener("click", () => box.remove());
      document.body.appendChild(box);
      setTimeout(() => box.remove(), 6500);
    }

    function smoothAnchors(){
      $$('a[href^="#"]').forEach(a => {
        a.addEventListener("click", (e) => {
          const id = a.getAttribute("href");
          if(!id || id.length < 2) return;
          const target = document.querySelector(id);
          if(target){
            e.preventDefault();
            target.scrollIntoView({behavior:"smooth", block:"start"});
          }
        });
      });
    }

    // init
    let eventsList = [...baseEvents];
    renderEvents(eventsList);
    renderGallery();
    smoothAnchors();
    $("#year").textContent = new Date().getFullYear();

    $("#searchInput").addEventListener("input", (e) => setHighlight(e.target.value));
    $("#randomTipBtn").addEventListener("click", randomTip);

    $("#addEventBtn").addEventListener("click", () => {
      const remaining = extraEventPool.filter(x => !eventsList.some(e => e.title === x.title));
      const pick = remaining.length ? remaining[Math.floor(Math.random()*remaining.length)] : null;
      if(!pick){
        randomTip();
        return;
      }
      eventsList = [pick, ...eventsList];
      renderEvents(eventsList);
      setHighlight($("#searchInput").value);
    });

    $("#resetEventBtn").addEventListener("click", () => {
      eventsList = [...baseEvents];
      renderEvents(eventsList);
      setHighlight($("#searchInput").value);
    });

    // modal controls
    $("#closeModalBtn").addEventListener("click", closeModal);
    $("#modal").addEventListener("click", (e) => {
      if(e.target.id === "modal") closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if(e.key === "Escape") closeModal();
    });