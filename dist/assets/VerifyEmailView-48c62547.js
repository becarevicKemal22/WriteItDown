import{_ as f}from"./blobBackground-e9449148.js";import{d as p,n as v,r as n,p as _,o as a,c as l,b as e,t as m,e as u,w as y,B as g,_ as k,g as x,i as b,s as w}from"./index-6c0c36ac.js";const B={key:0},E=e("img",{src:f,alt:"Background",class:"w-screen h-screen object-cover"},null,-1),V={class:"flex h-screen justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"},C={class:"bg-white rounded-md p-8 xl:p-12 text-gray-500 font-body flex flex-col gap-8 items-center text-center"},S=e("h1",{class:"font-title text-gray-600 text-2xl text-center xl:text-4xl"},"Please verify your email",-1),N={class:"flex flex-col items-center"},j=e("p",{class:"xl:text-lg"},"You're almost there! We've sent an email to",-1),A={class:"font-title xl:text-lg text-gray-600"},P=e("div",null,[e("p",{class:"text-sm xl:text-md"},"Click on the link in the email to complete the signup process."),e("p",{class:"text-sm mt-2 xl:text-md"},"If you don't see the email, be sure to check your spam folder.")],-1),R={class:"flex flex-col items-center gap-4"},z=e("p",null,"Still can't find the email?",-1),D={key:0,class:"px-12"},I={key:1},U={key:0},F=p({__name:"VerifyEmailView",setup(W){const{user:o}=v(),c=n(0),t=n(""),s=n(!1),h=async()=>{if(c.value>0){t.value="Email has already been resent";return}const i=await b().currentUser;s.value=!0;try{await w(i)}catch{s.value=!1;return}c.value++,s.value=!1,t.value="Email resent!"};return(i,Y)=>{var r,d;return(r=_(o))!=null&&r.email?(a(),l("div",B,[E,e("div",V,[e("div",C,[S,e("div",N,[j,e("p",A,m((d=_(o))==null?void 0:d.email),1)]),P,e("div",R,[z,u(k,{onClick:h,class:"text-sm"},{default:y(()=>[s.value?(a(),l("div",D,[e("span",null,[u(g,{color:"white",size:20})])])):(a(),l("span",I," Resend email "))]),_:1}),t.value?(a(),l("p",U,m(t.value),1)):x("",!0)])])])])):x("",!0)}}});export{F as default};
