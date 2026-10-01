const CAT=[
["📹","Cámara IP Wi‑Fi interior 2MP",89000,12],
["🎥","Cámara bala exterior 4MP",135000,10],
["🔍","Cámara domo 5MP",149000,8],
["📦","Kit CCTV 4 cámaras + DVR",890000,3],
["📼","DVR 8 canales",280000,6],
["💽","Disco duro 1 TB vigilancia",230000,9],
["🧠","Cámara con reconocimiento facial",420000,3],
["🚗","Lector de placas LPR",980000,2],
["🚨","Sirena inalámbrica",65000,10],
["📡","Sensor de movimiento PIR",48000,15],
["🚪","Sensor magnético puerta/ventana",32000,20],
["📲","Panel de alarma smart Wi‑Fi",245000,4]];
const IVA=.19,$=id=>document.getElementById(id),fmt=n=>"$"+Math.round(n).toLocaleString("es-CO");
const fresh=()=>({inv:CAT.map(c=>c[3]),n:0,ventas:0,last:null});
let S=fresh(),cart={},sort={by:"name",asc:true},tt;
try{const r=JSON.parse(localStorage.getItem("cajarapida2"));if(r&&r.inv&&r.inv.length===CAT.length)S=r}catch(e){}
const save=()=>{try{localStorage.setItem("cajarapida2",JSON.stringify(S))}catch(e){}};
const pad=n=>"#"+String(n).padStart(4,"0");
function toast(t){const el=$("toast");el.textContent=t;el.classList.add("on");clearTimeout(tt);tt=setTimeout(()=>el.classList.remove("on"),3500)}
function order(){
  const ix=CAT.map((_,i)=>i),d=sort.asc?1:-1;
  return ix.sort((a,b)=>sort.by==="name"?d*CAT[a][1].localeCompare(CAT[b][1],"es"):d*(S.inv[a]-S.inv[b])||CAT[a][1].localeCompare(CAT[b][1],"es"));
}
function render(){
  $("grid").innerHTML=order().map(i=>{const c=CAT[i],s=S.inv[i],cls=s===0?"out":s<=5?"low":"";
    return `<button class="p ${cls}" data-i="${i}"><span class="e">${c[0]}</span><span class="n">${c[1]}</span><span class="pr">${fmt(c[2])}</span><span class="st">${s===0?"Agotado":s+" en stock"}</span></button>`}).join("");
  const ids=Object.keys(cart);let total=0;
  $("items").innerHTML=ids.length?ids.map(i=>{const q=cart[i],t=q*CAT[i][2];total+=t;
    return `<div class="row"><span>${CAT[i][1]}</span><span class="q"><button data-m="${i}" aria-label="Quitar uno">−</button>${q}<button data-a="${i}" aria-label="Agregar uno">+</button></span><b>${fmt(t)}</b></div>`}).join(""):`<div class="empty">Toca un producto para empezar la factura.</div>`;
  const sub=total/(1+IVA);$("sub").textContent=fmt(sub);$("iva").textContent=fmt(total-sub);$("tot").textContent=fmt(total);
  $("fac").disabled=!ids.length;$("num").textContent=pad(S.n+1);
  $("kv").textContent=fmt(S.ventas);$("kf").textContent=S.n;$("kl").textContent=S.inv.filter(s=>s>0&&s<=5).length;
  $("dot").hidden=!S.inv.some(s=>s===0);
  $("sortDir").textContent=sort.by==="name"?(sort.asc?"A → Z":"Z → A"):(sort.asc?"Menor → mayor":"Mayor → menor");
}
const add=i=>{if((cart[i]||0)<S.inv[i]){cart[i]=(cart[i]||0)+1;$("msg").textContent=""}render()};
document.addEventListener("click",e=>{
  const p=e.target.closest("[data-i]"),a=e.target.closest("[data-a]"),m=e.target.closest("[data-m]");
  if(p)add(p.dataset.i);if(a)add(a.dataset.a);
  if(m){const i=m.dataset.m;if(--cart[i]<=0)delete cart[i];render()}
});
$("sortBy").onchange=e=>{sort.by=e.target.value;sort.asc=true;render()};
$("sortDir").onclick=()=>{sort.asc=!sort.asc;render()};
$("fac").onclick=()=>{
  let t=0;const lines=[],agotados=[];
  for(const i in cart){S.inv[i]-=cart[i];t+=cart[i]*CAT[i][2];lines.push([CAT[i][1],cart[i],cart[i]*CAT[i][2]]);if(S.inv[i]===0)agotados.push(CAT[i][1])}
  S.ventas+=t;S.n++;S.last={n:S.n,lines,total:t,fecha:new Date().toLocaleString("es-CO")};cart={};save();render();
  $("msg").textContent="Factura "+pad(S.n)+" emitida por "+fmt(t)+". Inventario actualizado.";
  if(agotados.length)toast("🔔 Se agotó: "+agotados.join(", "));
};
$("bell").onclick=()=>{
  const out=CAT.map((c,i)=>[c,i]).filter(([c,i])=>S.inv[i]===0);
  $("mdesc").textContent=out.length?"Hay que reponer estos productos para seguir vendiéndolos.":"Todos los productos tienen stock. Cuando uno se agote, aparecerá aquí.";
  $("mlist").innerHTML=out.map(([c])=>`<li><span>${c[0]}</span>${c[1]}<i>Agotado</i></li>`).join("");
  $("modal").showModal();
};
$("mclose").onclick=()=>$("modal").close();
$("modal").addEventListener("click",e=>{if(e.target===$("modal"))$("modal").close()});
$("imp").onclick=()=>{
  const ids=Object.keys(cart);let d;
  if(ids.length){const lines=ids.map(i=>[CAT[i][1],cart[i],cart[i]*CAT[i][2]]);d={n:S.n+1,lines,total:lines.reduce((a,l)=>a+l[2],0),fecha:new Date().toLocaleString("es-CO"),borrador:true}}
  else d=S.last;
  if(!d){toast("Agrega productos o emite una factura para imprimir");return}
  const sub=d.total/(1+IVA);
  $("receipt").innerHTML=`<h2>Caja Rápida</h2><div>Factura ${pad(d.n)}${d.borrador?" (borrador)":""}</div><div style="margin-bottom:8px">${d.fecha}</div>`+
    d.lines.map(l=>`<div class="r"><span>${l[1]} × ${l[0]}</span><span>${fmt(l[2])}</span></div>`).join("")+
    `<div class="r"><span>Subtotal</span><span>${fmt(sub)}</span></div><div class="r"><span>IVA 19%</span><span>${fmt(d.total-sub)}</span></div><div class="r t"><span>Total</span><span>${fmt(d.total)}</span></div>`;
  window.print();
};
$("rst").onclick=()=>{S=fresh();cart={};save();render();$("msg").textContent=""};
$("fecha").textContent=new Date().toLocaleDateString("es-CO",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
render();
