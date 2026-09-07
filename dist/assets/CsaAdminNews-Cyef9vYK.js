import{s as U}from"./index-C_7rhq2i.js";import{s as X,n as Y,a as G,b as J}from"./const-MyUBPRLT.js";import{B as O,o as c,e as w,c as M,C as k,E as K,l as $,D as Q,g as r,t as C,G as Z,_ as ee,ci as ne,H as ae,b as D,a as m,a2 as te,h as t,J as f,$ as oe,w as d,F as S,A as se,f as re,i as ce,cj as le}from"./index-DswPc8MD.js";import{_ as ie}from"./CsaEditNews-DaYUoyZW.js";import"./index-CvOUlaXT.js";import"./index-Dl9MnVUL.js";import"./index-DNzd9s2r.js";import"./index-BLAL8THo.js";import"./_commonjsHelpers-C4iS2aBk.js";import"./imageUtils-DvtRU3aV.js";var de=function(l){var e=l.dt;return`
.p-tag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: `.concat(e("tag.primary.background"),`;
    color: `).concat(e("tag.primary.color"),`;
    font-size: `).concat(e("tag.font.size"),`;
    font-weight: `).concat(e("tag.font.weight"),`;
    padding: `).concat(e("tag.padding"),`;
    border-radius: `).concat(e("tag.border.radius"),`;
    gap: `).concat(e("tag.gap"),`;
}

.p-tag-icon {
    font-size: `).concat(e("tag.icon.size"),`;
    width: `).concat(e("tag.icon.size"),`;
    height:`).concat(e("tag.icon.size"),`;
}

.p-tag-rounded {
    border-radius: `).concat(e("tag.rounded.border.radius"),`;
}

.p-tag-success {
    background: `).concat(e("tag.success.background"),`;
    color: `).concat(e("tag.success.color"),`;
}

.p-tag-info {
    background: `).concat(e("tag.info.background"),`;
    color: `).concat(e("tag.info.color"),`;
}

.p-tag-warn {
    background: `).concat(e("tag.warn.background"),`;
    color: `).concat(e("tag.warn.color"),`;
}

.p-tag-danger {
    background: `).concat(e("tag.danger.background"),`;
    color: `).concat(e("tag.danger.color"),`;
}

.p-tag-secondary {
    background: `).concat(e("tag.secondary.background"),`;
    color: `).concat(e("tag.secondary.color"),`;
}

.p-tag-contrast {
    background: `).concat(e("tag.contrast.background"),`;
    color: `).concat(e("tag.contrast.color"),`;
}
`)},ue={root:function(l){var e=l.props;return["p-tag p-component",{"p-tag-info":e.severity==="info","p-tag-success":e.severity==="success","p-tag-warn":e.severity==="warn","p-tag-danger":e.severity==="danger","p-tag-secondary":e.severity==="secondary","p-tag-contrast":e.severity==="contrast","p-tag-rounded":e.rounded}]},icon:"p-tag-icon",label:"p-tag-label"},pe=O.extend({name:"tag",theme:de,classes:ue}),ge={name:"BaseTag",extends:Z,props:{value:null,severity:null,rounded:Boolean,icon:String},style:pe,provide:function(){return{$pcTag:this,$parentInstance:this}}},N={name:"Tag",extends:ge,inheritAttrs:!1};function me(a,l,e,z,L,P){return c(),w("span",k({class:a.cx("root")},a.ptmi("root")),[a.$slots.icon?(c(),M(K(a.$slots.icon),k({key:0,class:a.cx("icon")},a.ptm("icon")),null,16,["class"])):a.icon?(c(),w("span",k({key:1,class:[a.cx("icon"),a.icon]},a.ptm("icon")),null,16)):$("",!0),a.value!=null||a.$slots.default?Q(a.$slots,"default",{key:2},function(){return[r("span",k({class:a.cx("label")},a.ptm("label")),C(a.value),17)]}):$("",!0)],16)}N.render=me;const fe={class:"main-part-lg mx-auto admin-news-page"},we={class:"min-w-48"},be={key:0,class:"flex gap-1 news-tag-list"},ve={class:"pagination-wrapper"},he={__name:"CsaAdminNews",setup(a){const l=ne(),e=ce("axios"),z=ae(),L=D(()=>z.admin_role_id===7),P=m([]),b=m(!1),u=m(1),T=m(0),p=m(10),j=D(()=>Math.max(0,(u.value-1)*p.value)),x=m(null),A=()=>e.get("/news/count").then(n=>{T.value=n.data.count}),v=()=>A().then(()=>{const n=Math.max(1,Math.ceil(T.value/p.value));if(u.value>n){u.value=n;return}return B()}),E=n=>{u.value=n.page+1,p.value=n.rows},F=n=>{const o=n.currentTarget;if(!(o instanceof HTMLElement))return;const g=o.querySelector(".p-datatable-table-container")??o;if(!(g instanceof HTMLElement)||g.scrollWidth<=g.clientWidth+1)return;const h=Math.abs(n.deltaX)>Math.abs(n.deltaY)?n.deltaX:n.deltaY;h&&(n.preventDefault(),g.scrollLeft+=h)},H=(n,o)=>{l.require({group:"news-delete",target:n.currentTarget,message:"确认删除该信息？",icon:"pi pi-exclamation-triangle",rejectProps:{label:"取消",severity:"secondary",outlined:!0},acceptProps:{label:"删除",severity:"danger"},accept:()=>{e.post("/delete/news",{nid:o}).then(()=>{v(),window.notyf.success("删除成功")})}})},R=()=>{l.require({group:"news-cleanup",modal:!0,header:"清理废弃草稿",message:"确认清理所有24小时前的废弃草稿？此操作将删除旧草稿及其关联图片，且不可恢复。",icon:"pi pi-exclamation-triangle",rejectProps:{label:"取消",severity:"secondary",outlined:!0,class:"news-cleanup-cancel"},acceptProps:{label:"清理",severity:"danger",class:"news-cleanup-confirm"},accept:()=>{e.post("/admin/cleanup_drafts").then(n=>{const o=n.data.details||{news_deleted:0,events_deleted:0};v(),window.notyf.success(`清理完成: 删除新闻草稿${o.news_deleted}条, 活动草稿${o.events_deleted}条`)})}})},B=()=>e.get("/news/list",{params:{page:u.value,size:p.value}}).then(n=>{P.value=n.data});return v(),te([u,p],()=>{B()}),(n,o)=>{const g=ie,h=G,W=le,y=se,i=J,q=N,V=X,I=U;return c(),w(S,null,[t(g,{show:f(b),"onUpdate:show":o[0]||(o[0]=s=>oe(b)?b.value=s:null),onFinish:v,nid:f(x)},null,8,["show","nid"]),t(h,{group:"news-delete"}),t(W,{group:"news-cleanup",class:"news-cleanup-dialog"}),r("div",fe,[o[2]||(o[2]=r("div",{class:"text-3xl font-bold mb-6"},"信息管理",-1)),t(y,{label:"创建信息",class:"mb-4 news-toolbar-btn news-toolbar-btn--primary",onClick:o[1]||(o[1]=()=>{b.value=!0,x.value=null})}),L.value?(c(),M(y,{key:0,label:"清理废弃草稿",class:"mb-4 ml-2 news-toolbar-btn news-toolbar-btn--warning",onClick:R})):$("",!0),r("div",{class:"overflow-x-auto mb-4 table-scroll-wrap",onWheel:F},[t(V,{value:f(P),class:"mb-4 min-w-full"},{default:d(()=>[t(i,{field:"nid",header:"编号"}),t(i,{field:"title",header:"标题"},{body:d(({data:s})=>[r("div",we,C(s.title),1)]),_:1}),t(i,{field:"category",header:"类型"},{body:d(({data:s})=>[r("div",null,C(f(Y)[s.category]),1)]),_:1}),t(i,{field:"tag",header:"标签"},{body:d(({data:s})=>[s.tag?(c(),w("div",be,[(c(!0),w(S,null,re(s.tag.split(" "),_=>(c(),w("div",{key:_},[t(q,{value:_,class:"text-nowrap news-tag-pill"},null,8,["value"])]))),128))])):$("",!0)]),_:1}),t(i,{field:"last_update",header:"上次更新"},{body:d(({data:s})=>[r("div",null,C(new Date(s.last_update*1e3).toLocaleString()),1)]),_:1}),t(i,{field:"edit",header:"编辑"},{body:d(({data:s})=>[r("div",null,[t(y,{label:"编辑",size:"small",class:"whitespace-nowrap news-table-action news-table-action--edit",onClick:()=>{x.value=s.nid,b.value=!0}},null,8,["onClick"])])]),_:1}),t(i,{field:"delete",header:"删除"},{body:d(({data:s})=>[r("div",null,[t(y,{label:"删除",size:"small",class:"whitespace-nowrap news-table-action news-table-action--delete",onClick:_=>H(_,s.nid)},null,8,["onClick"])])]),_:1})]),_:1},8,["value"])],32),r("div",ve,[t(I,{first:j.value,rows:f(p),totalRecords:f(T),rowsPerPageOptions:[10,20,30],template:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown",onPage:E},null,8,["first","rows","totalRecords"])])])],64)}}},Be=ee(he,[["__scopeId","data-v-6894e04a"]]);export{Be as default};
