window.onload=function(){
	 
    var ctx=document.querySelector("#canvas").getContext("2d");
    var image=new Image();
      image.src="images/beijing.jpg";
      
         image.onload=function(){
                  ctx.drawImage(image,0,0);
         }
  var demo=function(){
    var image=new Image();
      image.src="images/beijing.jpg";

         image.onload=function(){
                  ctx.drawImage(image,0,0);
         }
    var birdimage=new Image();//也可直接在body加上img 效果一样
      birdimage.src="images/bird.png";

         birdimage.onload=function(){
                  ctx.drawImage(image,140,264);
         }


    var bird={
    	x:140,
    	y:264,
    	w:40,
        h:40,
    }

    var guandao=[
    {top:{
       x:50,
       y:0,
       w:50,
       h:200
    },bottom:{
       x:50,
       y:350,
       w:50,
       h:218
    }},
    {top:{
       x:240,
       y:0,
       w:50,
       h:200
    },bottom:{
       x:240,
       y:350,
       w:50,
       h:218
    }}
]

     //检测举行之间的碰撞
     
    var recvsrec =  function(rect0,rect1){
    if (rect0.x >= rect1.x && rect0.x >= rect1.x + rect1.w) {
      return false;
    } else if (rect0.x <= rect1.x && rect0.x + rect0.w <= rect1.x) {
      return false;
    } else if (rect0.y >= rect1.y && rect0.y >= rect1.y + rect1.h) {
      return false;
    } else if (rect0.y <= rect1.y && rect0.y + rect0.h <= rect1.y) {
      return false;
    }
    return true;
  }

    
    var imgx=0;
    var draw=function(){

    	ctx.clearRect(0,0,320,584);

       imgx--;
       if(imgx==-320){
        imgx=0;
       }
       ctx.drawImage(image,imgx,0);
        //画小鸟
    	bird.y+=2;
         ctx.drawImage(birdimage,bird.x,bird.y)
        //画管道
          ctx.fillStyle="rgba("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+1+")";
        	for(var i=0;i<guandao.length;i++){
        		var vs;//页面完整
        		var z=guandao[i];
        		z.top.x-=3;
        		z.bottom.x-=3;
        	    ctx.fillRect(z.top.x,z.top.y,z.top.w,z.top.h);
                ctx.fillRect(z.bottom.x,z.bottom.y,z.bottom.w,z.bottom.h);

                // 只在鸟过柱子区域的时候才判断碰撞 0~80
                if(z.top.x<(bird.x+bird.w)&&z.top.x>(bird.x - z.top.w)){
                if(recvsrec(bird,z.top)||recvsrec(bird,z.bottom)){
                	vs=true;
                  document.querySelector('.cxstart').style.display='block'
                }
            }
              

        	if(z.top.x<=-z.top.w){
        		z.top.x=320;
        		z.bottom.x=320;

        		z.top.h=Math.random()*60+170;  
        		z.bottom.y=z.top.h+150;
        		z.bottom.h=218+(200-z.top.h);
        	}

        	
         }
    	if(vs){
    	     return;
          }
    	//边界判断
    	if(bird.y>=528){
    		ctx.fillRect(140,528,bird.w,bird.h);
    	}else if(bird.y<=0){
    		ctx.fillRect(140,0,bird.w,bird.h);
    	}else{
    		window.requestAnimationFrame(draw);
    	}

       
    }


    canvas.onclick=function(){
    	bird.y-=40;
    }
      requestAnimationFrame(draw);

  }
  
  var start=document.querySelector('.start');
  start.onclick=function(){
    demo();
    this.style.display='none';
  }
   document.querySelector('.cxstart').onclick=function(){
    demo();
    this.style.display='none';
   }

}