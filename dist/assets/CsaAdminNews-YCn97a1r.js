import{s as F}from"./index-Dyh1YEDD.js";import{s as R,n as U,a as V,b as E}from"./const-B2POtSkm.js";import{B as L,o as i,d as f,c as q,A as w,D as I,k as z,C as Y,e as s,t as k,E as G,ck as H,a as m,a4 as J,g as e,Y as c,a2 as C,w as l,F as T,i as K,z as M,f as O}from"./index-CZYgH6tE.js";import{_ as Q}from"./CsaEditNews-Bk_xXtHF.js";import"./index-D5NAPjYu.js";import"./index-BjFShyY9.js";import"./index-YhSpr_Ru.js";import"./imageUtils-DvtRU3aV.js";var W=function(d){var n=d.dt;return`
.p-tag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: `.concat(n("tag.primary.background"),`;
    color: `).concat(n("tag.primary.color"),`;
    font-size: `).concat(n("tag.font.size"),`;
    font-weight: `).concat(n("tag.font.weight"),`;
    padding: `).concat(n("tag.padding"),`;
    border-radius: `).concat(n("tag.border.radius"),`;
    gap: `).concat(n("tag.gap"),`;
}

.p-tag-icon {
    font-size: `).concat(n("tag.icon.size"),`;
    width: `).concat(n("tag.icon.size"),`;
    height:`).concat(n("tag.icon.size"),`;
}

.p-tag-rounded {
    border-radius: `).concat(n("tag.rounded.border.radius"),`;
}

.p-tag-success {
    background: `).concat(n("tag.success.background"),`;
    color: `).concat(n("tag.success.color"),`;
}

.p-tag-info {
    background: `).concat(n("tag.info.background"),`;
    color: `).concat(n("tag.info.color"),`;
}

.p-tag-warn {
    background: `).concat(n("tag.warn.background"),`;
    color: `).concat(n("tag.warn.color"),`;
}

.p-tag-danger {
    background: `).concat(n("tag.danger.background"),`;
    color: `).concat(n("tag.danger.color"),`;
}

.p-tag-secondary {
    background: `).concat(n("tag.secondary.background"),`;
    color: `).concat(n("tag.secondary.color"),`;
}

.p-tag-contrast {
    background: `).concat(n("tag.contrast.background"),`;
    color: `).concat(n("tag.contrast.color"),`;
}
`)},X={root:function(d){var n=d.props;return["p-tag p-component",{"p-tag-info":n.severity==="info","p-tag-success":n.severity==="success","p-tag-warn":n.severity==="warn","p-tag-danger":n.severity==="danger","p-tag-secondary":n.severity==="secondary","p-tag-contrast":n.severity==="contrast","p-tag-rounded":n.rounded}]},icon:"p-tag-icon",label:"p-tag-label"},Z=L.extend({name:"tag",theme:W,classes:X}),nn={name:"BaseTag",extends:G,props:{value:null,severity:null,rounded:Boolean,icon:String},style:Z,provide:function(){return{$pcTag:this,$parentInstance:this}}},D={name:"Tag",extends:nn,inheritAttrs:!1};function an(a,d,n,h,p,u){return i(),f("span",w({class:a.cx("root")},a.ptmi("root")),[a.$slots.icon?(i(),q(I(a.$slots.icon),w({key:0,class:a.cx("icon")},a.ptm("icon")),null,16,["class"])):a.icon?(i(),f("span",w({key:1,class:[a.cx("icon"),a.icon]},a.ptm("icon")),null,16)):z("",!0),a.value!=null||a.$slots.default?Y(a.$slots,"default",{key:2},function(){return[s("span",w({class:a.cx("label")},a.ptm("label")),k(a.value),17)]}):z("",!0)],16)}D.render=an;const tn={class:"main-part-lg mx-auto"},en={class:"min-w-48"},on={key:0,class:"flex gap-1"},sn={class:"pagination-wrapper"},fn={__name:"CsaAdminNews",setup(a){const d=H(),n=K("axios"),h=m([]),p=m(!1),u=m(1),B=m(0),v=m(10),_=m(null),S=(g,o)=>{d.require({target:g.currentTarget,message:"确认删除该信息？",icon:"pi pi-exclamation-triangle",rejectProps:{label:"取消",severity:"secondary",outlined:!0},acceptProps:{label:"删除",severity:"danger"},accept:()=>{n.post("/delete/news",{nid:o}).then(()=>{y(),window.notyf.success("删除成功")})}})},y=()=>{n.get("/news/list",{params:{page:u.value,size:v.value}}).then(g=>{h.value=g.data})};return n.get("/news/count").then(g=>{B.value=g.data.count}).then(()=>{y()}),J([u,v],()=>{y()}),(g,o)=>{const P=Q,x=V,$=M,r=E,N=D,j=R,A=F;return i(),f(T,null,[e(P,{show:c(p),"onUpdate:show":o[0]||(o[0]=t=>C(p)?p.value=t:null),onFinish:y,nid:c(_)},null,8,["show","nid"]),e(x),s("div",tn,[o[4]||(o[4]=s("div",{class:"text-3xl font-bold mb-6"},"信息管理",-1)),e($,{label:"创建信息",class:"mb-4",onClick:o[1]||(o[1]=()=>{p.value=!0,_.value=null})}),e(j,{value:c(h),class:"mb-4"},{default:l(()=>[e(r,{field:"nid",header:"编号"}),e(r,{field:"title",header:"标题"},{body:l(({data:t})=>[s("div",en,k(t.title),1)]),_:1}),e(r,{field:"category",header:"类型"},{body:l(({data:t})=>[s("div",null,k(c(U)[t.category]),1)]),_:1}),e(r,{field:"tag",header:"标签"},{body:l(({data:t})=>[t.tag?(i(),f("div",on,[(i(!0),f(T,null,O(t.tag.split(" "),b=>(i(),f("div",{key:b},[e(N,{value:b,class:"text-nowrap"},null,8,["value"])]))),128))])):z("",!0)]),_:1}),e(r,{field:"last_update",header:"上次更新"},{body:l(({data:t})=>[s("div",null,k(new Date(t.last_update*1e3).toLocaleString()),1)]),_:1}),e(r,{field:"edit",header:"编辑"},{body:l(({data:t})=>[s("div",null,[e($,{label:"编辑",size:"small",class:"whitespace-nowrap",onClick:()=>{_.value=t.nid,p.value=!0}},null,8,["onClick"])])]),_:1}),e(r,{field:"delete",header:"删除"},{body:l(({data:t})=>[s("div",null,[e($,{label:"删除",severity:"danger",size:"small",class:"whitespace-nowrap",onClick:b=>S(b,t.nid)},null,8,["onClick"])])]),_:1})]),_:1},8,["value"]),s("div",sn,[e(A,{page:c(u),"onUpdate:page":o[2]||(o[2]=t=>C(u)?u.value=t:null),rows:c(v),"onUpdate:rows":o[3]||(o[3]=t=>C(v)?v.value=t:null),totalRecords:c(B)},null,8,["page","rows","totalRecords"])])])],64)}}};export{fn as default};
