import{f as a,g as n,h as t,i as e,o as r,c as i,a as o}from"./entry.a47edd57.js";const s={id:"scene"},c=o("div",{class:"cube1"},[o("div",{class:"face front"}," We are innovators in creating and maximizing investments through a 360 investment ecosystem approach. "),o("div",{class:"face left"}," 360 ")],-1),u=[c],b=a({__name:"test",setup(m){return n(()=>{t.to(".cube1",{duration:1,rotationY:60,rotationX:30,rotationZ:-20,ease:"linear"}),e.create({trigger:".text-cube",start:"top bottom",end:"top bottom",scrub:!0,animation:t.to(".cube1",{duration:1,rotationY:60,rotationX:30,rotationZ:-20,ease:"linear"})}),e.create({trigger:".text-cube",start:"top bottom",end:"bottom+=200 bottom",scrub:!0,animation:t.fromTo(".text-cube-360",{rotationZ:90,rotationX:90,x:150,y:125,z:0},{rotationZ:40,rotationX:50,x:250,y:375,duration:2,ease:"power1.inOut"})})}),(d,p)=>(r(),i("div",s,u))}});export{b as default};