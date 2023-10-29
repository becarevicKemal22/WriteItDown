import{_ as E}from"./blobBackground-e9449148.js";import{d as U,r as u,u as j,a as x,o as f,c as p,b as o,e as t,w as r,f as l,B,_ as g,t as A,g as N,F as G,h as L,i as h,s as R,j as S,G as T,k as F}from"./index-62d6cd1e.js";import{_ as v}from"./BaseInput.vue_vue_type_script_setup_true_lang-f474ff1c.js";const W=o("img",{src:E,alt:"Background",class:"w-screen h-screen object-cover"},null,-1),I={class:"flex h-screen justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"},$={class:"flex flex-col gap-3 xl:gap-4 p-8 xl:p-12 xl:px-14 bg-white rounded-md"},z=o("div",{class:"flex justify-center mb-5"},[o("h1",{class:"text-3xl xl:text-4xl font-title text-gray-700"},"Sign up")],-1),D={key:0},H={key:1,class:"flex justify-center"},M={key:0,class:"font-body text-red-500 text-sm"},q={class:"flex items-center gap-2 justify-center"},J={class:"font-body w-72 text-center text-gray-600 -mb-3 xl:-mb-6"},K=o("br",null,null,-1),Z=U({__name:"RegisterView",setup(O){const d=u(""),c=u(""),i=u(""),_=u(""),w=j(),e=u(""),b=()=>c.value.trim()===""||i.value.trim()===""||d.value.trim()===""?(e.value="Please fill in all fields",!1):i.value.length<8?(e.value="Password must be at least 8 characters",!1):i.value!==_.value?(e.value="Passwords do not match",!1):!0,y=a=>{switch(a.code){case"auth/invalid-email":e.value="Please enter a valid email address";break;case"auth/user-disabled":e.value="User disabled";break;case"auth/email-already-exists":e.value="This email is already in use";break;case"auth/email-already-in-use":e.value="This email is already in use";break;case"auth/account-exists-with-different-credential":e.value="This email is already in use";break;default:e.value="An error has occurred"}},m=u(!1),V=async()=>{if(m.value=!0,!b()){m.value=!1;return}await L(h(),c.value,i.value).then(async()=>{const a=h().currentUser;await R(a),await S(a,{displayName:d.value}),await w.push({name:"VerifyEmail"})}).catch(a=>{console.log(a.code),y(a)}),m.value=!1},k=()=>{const a=new T;F(h(),a).then(()=>{w.push({name:"Home"})}).catch(s=>{y(s)})};return(a,s)=>{const C=x("font-awesome-icon"),P=x("RouterLink");return f(),p(G,null,[W,o("div",I,[o("div",$,[z,t(v,{name:"full name",placeholder:"Enter your name",modelValue:d.value,"onUpdate:modelValue":s[0]||(s[0]=n=>d.value=n),class:"w-full"},{default:r(()=>[l(" Full name ")]),_:1},8,["modelValue"]),t(v,{name:"email",placeholder:"Enter your email",modelValue:c.value,"onUpdate:modelValue":s[1]||(s[1]=n=>c.value=n),class:"w-full"},{default:r(()=>[l(" Email ")]),_:1},8,["modelValue"]),t(v,{name:"password",placeholder:"Enter your password",type:"password",modelValue:i.value,"onUpdate:modelValue":s[2]||(s[2]=n=>i.value=n),class:"w-full"},{default:r(()=>[l(" Password ")]),_:1},8,["modelValue"]),t(v,{name:"confirmPassword",placeholder:"Confirm your password",type:"password",modelValue:_.value,"onUpdate:modelValue":s[3]||(s[3]=n=>_.value=n),class:"w-full"},{default:r(()=>[l(" Confirm password ")]),_:1},8,["modelValue"]),t(g,{onClick:V,class:"px-5 mt-3"},{default:r(()=>[m.value?(f(),p("span",H,[t(B,{size:24,color:"white"})])):(f(),p("span",D,"Sign up"))]),_:1}),e.value?(f(),p("p",M,A(e.value),1)):N("",!0),t(g,{type:"secondary",onClick:k},{default:r(()=>[o("div",q,[t(C,{icon:["fab","google"],class:"text-primary"}),l(" Continue with Google ")])]),_:1}),o("p",J,[l("Already have an acount? "),K,t(P,{to:"/login",class:"text-primary underline"},{default:r(()=>[l("Login")]),_:1}),l(" instead ")])])])],64)}}});export{Z as default};