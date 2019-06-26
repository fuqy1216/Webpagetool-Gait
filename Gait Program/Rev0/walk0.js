
 	var lnk0;	// Center torso - hip
// 	var 1nk1;	// upper leg
 	var lnk2;	// lower leg
 	var lnk3;	//  ankle ht
 	var lnk4;	//	foot length
 	var lnk5;	//	ankle - toe
 	var lkn6;	// 	ankle - heel
 	var lnk01234;
 	var ang0;
 	var ang1;
 	var ang2;
 	var ang2;
 	var ang3;
 	
	var Stature;
	
function ComputeLinks() {

	Stature=document.getElementById("L1").innerHTML;
//	alert(Stature);
	document.getElementById("L2").innerHTML = Math.round(Stature*document.getElementById("F2").innerHTML);     // shoulder height
    document.getElementById("L3").innerHTML = Math.round(Stature*document.getElementById("F3").innerHTML);
    document.getElementById("L4").innerHTML = Math.round(Stature*document.getElementById("F4").innerHTML);
    document.getElementById("L5").innerHTML = Math.round(Stature*document.getElementById("F5").innerHTML);
    document.getElementById("L6").innerHTML = Math.round(Stature*document.getElementById("F6").innerHTML);
    document.getElementById("L7").innerHTML = Math.round(Stature*document.getElementById("F7").innerHTML);
    document.getElementById("L8").innerHTML = Math.round(Stature*document.getElementById("F8").innerHTML);
    document.getElementById("L9").innerHTML = Math.round(Stature*document.getElementById("F9").innerHTML);
    document.getElementById("L10").innerHTML = Math.round(Stature*document.getElementById("F10").innerHTML);
    document.getElementById("L11").innerHTML = Math.round(Stature*document.getElementById("F11").innerHTML);
    document.getElementById("L12").innerHTML = Math.round(Stature*document.getElementById("F12").innerHTML);
    document.getElementById("L13").innerHTML = Math.round(document.getElementById("L12").innerHTML*document.getElementById("F12").innerHTML);
    document.getElementById("L14").innerHTML = Math.round(document.getElementById("L12").innerHTML*document.getElementById("F14").innerHTML);
}

function Female5() {

	Stature=document.getElementById("5F").innerHTML;
	document.getElementById("L1").innerHTML=Stature
    var cell = document.getElementById("L1");    
    cell.style.color = "red"; 
    ComputeLinks(); 
}

function Female50() {
	Stature=document.getElementById("50F").innerHTML;
	document.getElementById("L1").innerHTML = Stature;
    var cell = document.getElementById("L1");    
    cell.style.color = "red"; 
    ComputeLinks(); 
}

function Female95() {
	Stature=document.getElementById("95F").innerHTML;
	document.getElementById("L1").innerHTML = Stature;
    var cell = document.getElementById("L1");    
    cell.style.color = "red"; 
    ComputeLinks(); 
}

function Male5() {
	Stature=document.getElementById("5M").innerHTML;
	document.getElementById("L1").innerHTML = Stature;
    var cell = document.getElementById("L1");    
    cell.style.color = "blue"; 
    ComputeLinks(); 
}

function Male50() {
	Stature=document.getElementById("50M").innerHTML;
	document.getElementById("L1").innerHTML = Stature;
    var cell = document.getElementById("L1");    
    cell.style.color = "blue"; 
    ComputeLinks();
}

function Male95() {
	Stature=document.getElementById("95M").innerHTML;
	document.getElementById("L1").innerHTML = Stature;
    var cell = document.getElementById("L1");    
    cell.style.color = "blue"; 
    ComputeLinks(); 
}
function Other() {
	Stature=document.getElementById("OtherHt").value;
	document.getElementById("L1").innerHTML = Stature;
    var cell = document.getElementById("L1");    
    ComputeLinks();
}

// -------------------------------------------------------------------


// Start with heel contact at beginning of stance phase
// Compute thigh-leg, l12', length based on specified knee angle
// Compute hip location based on 1/2 stride and specified lean
// compute hip location at specified time increments and specified horizontal speed
// Assume opposite foot contact when body travels 1 stride 
// model remainder of stance and swing based on ratio of stance to swing time
// Assumes that ankle rotation and knee flexion start with as second foot makes contact
// Note foot contact shifts to toe during kick
// compute final ankle angle based on knee angle at end of stance
// Compute knee angle for given toe clearance and ankle angle

 	

function initializeposture() {
	var k3 // const to comput planner hip length from hip-cntr distance
	k3=0.1
	lnk0=parseFloat(document.getElementById("L3").innerHTML)*k3;	//Pelvis
	lnk1=parseFloat(document.getElementById("L9").innerHTML);		//Upper Leg
 	lnk2=parseFloat(document.getElementById("L10").innerHTML);		//Lower Leg
 	lnk3=parseFloat(document.getElementById("L11").innerHTML);		//Foot Vertical
 	lnk4=parseFloat(document.getElementById("L13").innerHTML);		//Ankle-Heel 	
 	
 	ang0=parseFloat(document.getElementById("A00").innerHTML);	//Pelvis link angle -- global
	ang1=parseFloat(document.getElementById("A10").innerHTML);
	ang2=parseFloat(document.getElementById("A20").innerHTML);
	ang3=parseFloat(document.getElementById("A30").innerHTML);
	ang4=ang3-90;
		
//	alert("lnk0="+lnk0+" lnk1="+lnk1+" lnk2="+lnk2+" lnk3="+lnk4+" lnk4="+lnk3+
//		", \nang0"+ang0+" ang1="+ang1+" ang2="+ang2+" ang3="+ang3+" ang3="+ang4);

	lnk0x=lnk0*Math.cos((ang0/180) * Math.PI);
	lnk1x=lnk1*Math.cos((ang1/180) * Math.PI);
	lnk2x=lnk2*Math.cos((ang2/180) * Math.PI);
	lnk3x=lnk3*Math.cos((ang3/180) * Math.PI);
	lnk4x=lnk4*Math.cos((ang4/180) * Math.PI);
		
	lnk0y=lnk0*Math.sin((ang0/180) * Math.PI);
	lnk1y=lnk1*Math.sin((ang1/180) * Math.PI);
	lnk2y=lnk2*Math.sin((ang2/180) * Math.PI);
	lnk3y=lnk3*Math.sin((ang3/180) * Math.PI);
	lnk4y=lnk4*Math.sin((ang4/180) * Math.PI);
		
	lnk01234x=Math.round(lnk0x+lnk1x+lnk2x+lnk3x+lnk4x);
	lnk01234y=Math.round(lnk0y+lnk1y+lnk2y+lnk3y+lnk4y);
	

//	alert("lnk0x="+lnk0x+"\nlnk1x="+lnk1x+"\nlnk2x="+lnk2x+"\nlnk3x="+lnk3x+"\nlnk4x="+lnk4x+"\nlnk01234x="+lnk01234x
//	+"\nlnk0y="+lnk0y+"\nlnk1y="+lnk1y+"\nlnk2y="+lnk2y+"\nlnk3y="+lnk3y+"\nlnk4y="+lnk4y+"\nlnk01234y="+lnk01234y);	
//
	StepLen=parseFloat(document.getElementById("Step0").innerHTML);
	x0=300-lnk01234x;
	y0=1000+lnk01234y;
	
	document.getElementById("step0").innerHTML=
		"x0="+Math.round(x0)+", y0="+Math.round(y0)
		+"<br>lnk0x="+Math.round(lnk0x)+", lnk0y="+Math.round(lnk0y)+", lnk0="+Math.round(lnk0)+", ang0="+Math.round(ang0)
		+"<br>lnk1x="+Math.round(lnk1x)+", lnk1y="+Math.round(lnk1y)+", lnk1="+Math.round(lnk1)+", ang1="+Math.round(ang1)
		+"<br>lnk2x="+Math.round(lnk2x)+", lnk2y="+Math.round(lnk2y)+", lnk2="+Math.round(lnk2)+", ang2="+Math.round(ang2)
		+"<br>lnk3x="+Math.round(lnk3x)+", lnk3y="+Math.round(lnk3y)+", lnk3="+Math.round(lnk3)+", ang3="+Math.round(ang3)
		+"<br>nk4x="+Math.round(lnk4x)+", lnk4y="+Math.round(lnk4y)+", lnk4="+Math.round(lnk4)+", ang4="+Math.round(ang4)
		+"<br>lnk01234x="+Math.round(lnk01234x)+", lnk01234y="+Math.round(lnk01234y);


// compute knee angle for second leg given lean angle. Assume:
// line through torso bisects line connecting R & L heel
// pelvis & upper leg angles (global coordinates) the same
// foot flat on ground
// solve for knee angle.
	


// -------------------------------------------------------------------
// graphics


	var c=document.getElementById("StepCanvas");
	var ctx=c.getContext("2d");

// set scale --- calculate scale factor for inches or millimeters
	var v=800;											    //Canvas Ht
	var w=600;											    //Canvas Width
	
    var scale=parseFloat(v)/5000;



	x1=x0+lnk0x;
	y1=y0-lnk0y;

	x2=x1+lnk1x;
	y2=y1-lnk1y;	

	x3=x2+lnk2x;
	y3=y2-lnk2y;
	x4=x3+lnk3x;
	y4=y3-lnk3y;
	x5=x4+lnk4x;
	y5=y4-lnk4y;


	ctx.fillText("H",x1,y1);
	ctx.fillText("K",x2,y2);
	ctx.fillText("A",x3,y3);
	ctx.fillText("H",x5,y5);
	ctx.stroke();
	
	ctx.moveTo(x0,y0);	
	ctx.lineTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.lineTo(x3,y3);
	ctx.lineTo(x4,y4);
	ctx.lineTo(x5,y5);	
	ctx.stroke();
	
	
	
//	ctx.moveTo(x5,y5);
//	ctx.lineto(x12,y12);
	}
	
//	ctx.beginPath();
//	ctx.arc(xx1,yy2,rr,-Math.PI/2,Math.PI/2);  //Draw reach arc -- side view
//	ctx.stroke();

	
	//Reference line -- to show scale

//    	ctx.moveTo(300, 780);
//		ctx.lineTo(300+1000*scale, 780);
//		ctx.fillText("Scale: 1,000mm",300,770);
//		ctx.stroke();

