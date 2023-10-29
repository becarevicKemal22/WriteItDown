import{d as K,r as u,u as U,a as k,o as p,c as h,b as o,e as t,w as n,f as l,g,B as A,_ as b,t as B,h as N,F as L,i as R,j as v,s as S,k as T,G as W,l as C,m as F}from"./index-65db4b1b.js";import{_ as H}from"./blobBackground-e9449148.js";import{_}from"./BaseInput.vue_vue_type_script_setup_true_lang-ba5aebd5.js";const I=o("img",{src:H,alt:"Background",class:"w-screen h-screen object-cover"},null,-1),$={class:"flex h-screen justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"},z={class:"flex flex-col gap-3 xl:gap-4 p-8 xl:p-12 xl:px-14 bg-white rounded-md"},D=o("div",{class:"flex justify-center mb-5"},[o("h1",{class:"text-3xl xl:text-4xl font-title text-gray-700"},"Sign up")],-1),M={key:0},q={key:1,class:"flex justify-center"},J={key:0,class:"font-body text-red-500 text-sm"},O={class:"flex items-center gap-2 justify-center"},Q={class:"flex items-center gap-2 justify-center"},X={class:"font-body w-72 text-center text-gray-600 -mb-3 xl:-mb-6"},Y=o("br",null,null,-1),te=K({__name:"RegisterView",setup(Z){const d=u(""),c=u(""),i=u(""),y=u(""),w=U(),s=u(""),P=()=>c.value.trim()===""||i.value.trim()===""||d.value.trim()===""?(s.value="Please fill in all fields",!1):i.value.length<8?(s.value="Password must be at least 8 characters",!1):i.value!==y.value?(s.value="Passwords do not match",!1):!0,x=e=>{switch(e.code){case"auth/invalid-email":s.value="Please enter a valid email address";break;case"auth/user-disabled":s.value="User disabled";break;case"auth/email-already-exists":s.value="This email is already in use";break;case"auth/email-already-in-use":s.value="This email is already in use";break;case"auth/account-exists-with-different-credential":s.value="This email is already in use";break;default:s.value="An error has occurred"}},m=u(!1),f=async()=>{if(m.value=!0,!P()){m.value=!1;return}await R(v(),c.value,i.value).then(async()=>{const e=v().currentUser;await S(e),await T(e,{displayName:d.value}),await w.push({name:"VerifyEmail"})}).catch(e=>{console.log(e.code),x(e)}),m.value=!1},E=()=>{const e=new W;C(v(),e).then(()=>{w.push({name:"Home"})}).catch(a=>{x(a)})},j=()=>{const e=new F;C(v(),e).then(()=>{w.push({name:"Home"})}).catch(a=>{x(a)})};return(e,a)=>{const V=k("font-awesome-icon"),G=k("RouterLink");return p(),h(L,null,[I,o("div",$,[o("div",z,[D,t(_,{name:"full name",placeholder:"Enter your name",modelValue:d.value,"onUpdate:modelValue":a[0]||(a[0]=r=>d.value=r),class:"w-full"},{default:n(()=>[l(" Full name ")]),_:1},8,["modelValue"]),t(_,{name:"email",placeholder:"Enter your email",modelValue:c.value,"onUpdate:modelValue":a[1]||(a[1]=r=>c.value=r),onKeydown:g(f,["enter"]),class:"w-full"},{default:n(()=>[l(" Email ")]),_:1},8,["modelValue","onKeydown"]),t(_,{name:"password",placeholder:"Enter your password",type:"password",modelValue:i.value,"onUpdate:modelValue":a[2]||(a[2]=r=>i.value=r),onKeydown:g(f,["enter"]),class:"w-full"},{default:n(()=>[l(" Password ")]),_:1},8,["modelValue","onKeydown"]),t(_,{name:"confirmPassword",placeholder:"Confirm your password",type:"password",modelValue:y.value,"onUpdate:modelValue":a[3]||(a[3]=r=>y.value=r),onKeydown:g(f,["enter"]),class:"w-full"},{default:n(()=>[l(" Confirm password ")]),_:1},8,["modelValue","onKeydown"]),t(b,{onClick:f,class:"px-5 mt-3"},{default:n(()=>[m.value?(p(),h("span",q,[t(A,{size:24,color:"white"})])):(p(),h("span",M,"Sign up"))]),_:1}),s.value?(p(),h("p",J,B(s.value),1)):N("",!0),t(b,{type:"secondary",onClick:E},{default:n(()=>[o("div",O,[t(V,{icon:["fab","google"],class:"text-primary"}),l(" Continue with Google ")])]),_:1}),t(b,{type:"secondary",onClick:j},{default:n(()=>[o("div",Q,[t(V,{icon:["fab","github"],class:"text-primary"}),l(" Continue with GitHub ")])]),_:1}),o("p",X,[l("Already have an acount? "),Y,t(G,{to:"/login",class:"text-primary underline"},{default:n(()=>[l("Login")]),_:1}),l(" instead ")])])])],64)}}});export{te as default};