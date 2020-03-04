//#!javascript
//$ node init
loadScript('math-solver.js', function() {
    //alert('script ready!'); 
  });
  loadScript('js-solver.js', function() {
    //alert('script ready!'); 
  });
  
  loadScript('Cubic-Spline.js', function() {
    //alert('script ready!'); 
  });
  loadScript('plotly-latest.min.js', function() {
    //alert('script ready!'); 
  });
function solvedoublestanceAFO(DSItheta0,DSItheta1,DSItheta2,DSIdtheta0,DSIdtheta1){
   /* LegSolver = new Solver({
      l1: 'l1',
      l2: 'l2',
      l3: 'l3',
      l4: 'l4',
      theta0: 'theta0',
      theta1: 'theta1',
      theta2: 'theta2',
      dtheta0: 'dtheta0',
      dtheta1: 'dtheta1',
      Radius: '(-(l1+l2+l4)*cos(theta4)+l1*cos(theta0+theta1-theta2)+l2*cos(theta0+theta1)+l4*cos(theta0)+l3*sin(theta0))/(1-cos(theta4))',
      //Radius: 'Radius',
      Toeangle: 'atan(l4/l3)',
      theta4: 'acos((l3*sin(theta0) + l4*cos(theta0) + l2*cos(theta0+theta1) + l1*cos(theta0+theta1-theta2) - Radius)/(l2+l1+l4-Radius))',
      dtheta4: '-((l3^2+l4^2)^0.5*dtheta0*cos(theta0+Toeangle) - l2*(dtheta0+dtheta1)*sin(theta0+theta1) - l1*(dtheta0+dtheta1-dtheta2)*sin(theta0+theta1-theta2))/(l1+l2+l4-Radius)/sin(theta4)',
      dtheta2: '-(-(l3^2+l4^2)^0.5*dtheta0*sin(theta0+Toeangle) - l2*(dtheta0+dtheta1)*cos(theta0+theta1) - (l1+l2+l4-Radius)*dtheta4*cos(theta4)-Radius*dtheta4)/l1/cos(theta0+theta1-theta2)-dtheta0-dtheta1'
    })
    Fsolve = LegSolver.solve({
      l1: 'len1',
      l2: 'len2',
      l3: 'len3',
      l4: 'len5',
      theta0: 'DSItheta0',
      theta1: 'DSItheta1',
      //theta2: 'DSItheta2',
      dtheta0: 'DSIdtheta0',
      dtheta1: 'DSIdtheta1',
      Radius: '0.2'
      })   
      return Fsolve;*/
      
      Radius = 0.1;
      Toeangle = atan(len5/len3);
      DSItheta4 = acos((len3*sin(DSItheta0) + len5*cos(DSItheta0) + len2*cos(DSItheta0+DSItheta1) + len1*cos(DSItheta0+DSItheta1-DSItheta2) - Radius)/(len1+len2+len5-Radius));
      if(isNaN(DSItheta4)) 
      {DSItheta4 = 0;
        //alert("DSItheta4 NaN");
      }
      a24 = [
        [-len1*sin(DSItheta0+DSItheta1-DSItheta2), (len1+len2+len5-Radius)*sin(DSItheta4)],
        [len1*cos(DSItheta0+DSItheta1-DSItheta2), -(len1+len2+len5-Radius)*cos(DSItheta4)-Radius]
      ];
      //alert("DSIdtheta0: "+DSIdtheta0+"\nDSIdtheta1: "+DSIdtheta1+"\nDSIdtheta2: "+DSIdtheta2);
      b24 = [
          -math.pow((math.pow(len3,2)+math.pow(len5,2)),0.5)*DSIdtheta0*cos(DSItheta0+Toeangle)+len2*(DSIdtheta0+DSIdtheta1)*sin(DSItheta0+DSItheta1)+len1*(DSIdtheta0+DSIdtheta1)*sin(DSItheta0+DSItheta1-DSItheta2),
          math.pow((math.pow(len3,2)+math.pow(len5,2)),0.5)*DSIdtheta0*sin(DSItheta0+Toeangle)+len2*(DSIdtheta0+DSIdtheta1)*cos(DSItheta0+DSItheta1)-len1*(DSIdtheta0+DSIdtheta1)*cos(DSItheta0+DSItheta1-DSItheta2)
    ];
    //alert("a24: "+a24+"\nb24: "+b24);
    result24 = math.multiply(math.inv(a24),b24);
    return [DSItheta4,abs(result24[0]),result24[1]];
    //console.log(b24);
    //console.log(a24);
    
  }
  function solveleg(theta, dtheta, Tankle, Thip, Tknee) {
    m1 = mass1;
    m2 = mass2;
    m3 = mass3;
    l1 = len1;
    l2 = len2;
    l3 = len3*(1-footFraction);
    l4 = len5;
    I1 = 1/12*m1*math.pow(l1,2);
    I2 = 1/12*m2*math.pow(l2,2);
    I3 = 1/12*m3*math.pow(l3,2);
    g = 9.8;
    T3 = Tankle;
    k1 = Thip*180/PI;
    k2 = Tknee*180/PI;
   // k1 = 10;
   // k2 = 10;
    m = mass4;
      a = [
      [l3*cos(theta[1]),-l3*sin(theta[1]),0,0,0,0,0,0,0,0,0,0,0,0,I3,0,0,0],
      [-sin(theta[0]+theta[1])/m3,-cos(theta[0]+theta[1])/m3,0,0,0,0,1/m3,0,0,0,0,0,0,0,-l3*sin(theta[0])/2,0,0,0],
      [cos(theta[0]+theta[1])/m3,-sin(theta[0]+theta[1])/m3,0,0,0,0,0,-1/m3,0,0,0,0,0,0,l3*cos(theta[0])/2,0,0,0],
      [0,0,0,0,0,0,0,0,1,0,0,0,0,0,l3*sin(theta[0]),0,0,0],
      [0,0,0,0,0,0,0,0,0,1,0,0,0,0,-l3*cos(theta[0]),0,0,0],
      [0,0,-l2*sin(theta[2]),l2*cos(theta[2]),0,0,0,0,0,0,0,0,0,0,0,I2,0,0],
      [sin(theta[0]+theta[1])/m2,cos(theta[0]+theta[1])/m2,-sin(theta[0]+theta[1]-theta[2])/m2,-cos(theta[0]+theta[1]-theta[2])/m2,0,0,0,0,1,0,0,0,0,0,0,-l2*cos(theta[0]+theta[1])/2,0,0],
      [-cos(theta[0]+theta[1])/m2,sin(theta[0]+theta[1])/m2,cos(theta[0]+theta[1]-theta[2])/m2,-sin(theta[0]+theta[1]-theta[2])/m2,0,0,0,0,0,1,0,0,0,0,0,-l2*sin(theta[0]+theta[1])/2,0,0],
      [0,0,0,0,0,0,0,0,-1,0,1,0,0,0,0,l2*cos(theta[0]+theta[1]),0,0],
      [0,0,0,0,0,0,0,0,0,-1,0,1,0,0,0,l2*sin(theta[0]+theta[1]),0,0],
      [0,0,0,0,l1*sin(theta[3]+theta[0]+theta[1]-theta[2]),-l1*cos(theta[3]+theta[0]+theta[1]-theta[2]),0,0,0,0,0,0,0,0,0,0,-I1,0],
      [0,0,sin(theta[1]+theta[0]-theta[2])/m1,cos(theta[1]+theta[0]-theta[2])/m1,sin(theta[3])/m1,-cos(theta[3])/m1,0,0,0,0,1,0,0,0,0,0,-l1*cos(theta[0]+theta[1]-theta[2])/2,0],
      [0,0,-cos(theta[1]+theta[0]-theta[2])/m1,sin(theta[1]+theta[0]-theta[2])/m1,cos(theta[3])/m1,sin(theta[3])/m1,0,0,0,0,0,1,0,0,0,0,-l1*sin(theta[0]+theta[1]-theta[2])/2,0],
      [0,0,0,0,0,0,0,0,0,0,-1,0,1,0,0,0,l1*cos(theta[0]+theta[1]-theta[2]),0],
      [0,0,0,0,0,0,0,0,0,0,0,-1,0,1,0,0,l1*sin(theta[0]+theta[1]-theta[2]),0],
      [0,0,0,0,0,(l1+l2+l4),0,0,0,0,0,0,0,0,0,0,0,1/12*math.pow((l1+l2+l4),2)*(m1+m2+m3)],
      [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,-(l1+l2+l4)*cos(theta[3])],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,(l1+l2+l4)*sin(theta[3])]
      ]
      
      b = [T3-m3*g*l3*cos(theta[0])/2,
      math.pow((dtheta[0]),2)*l3*cos(theta[0])/2,
      math.pow((dtheta[0]),2)*l3*sin(theta[0])/2-g,
      -l3*cos(theta[0])*math.pow((dtheta[0]),2),
      -math.pow((dtheta[0]),2)*l3*sin(theta[0]),
      m2*g*l2*sin(theta[0]+theta[1])/2-T3-k2*theta[2],
      -math.pow((dtheta[0]+dtheta[1]),2)*l2*sin(theta[0]+theta[1])/2,
      math.pow((dtheta[0]+dtheta[1]),2)*l2*cos(theta[0]+theta[1])/2-g,
      math.pow((dtheta[0]+dtheta[1]),2)*l2*sin(theta[0]+theta[1]),
      -math.pow((dtheta[0]+dtheta[1]),2)*l2*cos(theta[0]+theta[1]),
      k1*(theta[0]+theta[1]-theta[2])-k2*theta[2]-m1*g*l1*sin(theta[0]+theta[1]-theta[2])/2-m*g*l1*sin(theta[0]+theta[1]-theta[2]),
      -math.pow(dtheta[0]+dtheta[1]-dtheta[2],2)*l1*sin(theta[0]+theta[1]-theta[2])/2,
      math.pow(dtheta[0]+dtheta[1]-dtheta[2],2)*l1*cos(theta[0]+theta[1]-theta[2])/2-g-m*g/m1,
      math.pow(dtheta[0]+dtheta[1]-dtheta[2],2)*l1*sin(theta[0]+theta[1]-theta[2]),
      -math.pow(dtheta[0]+dtheta[1]-dtheta[2],2)*l1*cos(theta[0]+theta[1]-theta[2]),
      (m1+m2+m3)*g*(l1+l2+l4)*sin(theta[3])/2+m*g*(l1+l2+l4)*sin(theta[3])-k1*(theta[0]+theta[1]-theta[2]),
      -math.pow(dtheta[3],2)*(l1+l2+l4)*sin(theta[3]),
      -math.pow(dtheta[3],2)*(l1+l2+l4)*cos(theta[3])
    ]
    try {
      math.inv(a)
    }
    catch(error) {
      //console.log(a);
      //console.log("forces calculation error");
      return 0;
      // expected output: ReferenceError: nonExistentFunction is not defined
      // Note - error messages will vary depending on browser
    }
    //console.log("forces calculation success!");
      return math.multiply(math.inv(a),b);
    }

  function solvelegAFO(theta, dtheta, Tankle, Thip, Tknee) {
  m1 = mass1;
  m2 = mass2;
  m3 = mass3;
  l1 = len1;
  l2 = len2;
  l3 = len3*(1-footFraction);
  l4 = len5;
  I1 = 1/12*m1*math.pow(l1,2);
  I2 = 1/12*m2*math.pow(l2,2);
  I3 = 1/12*m3*math.pow(l3,2);
  g = 9.8;
  k1 = Thip*180/PI;
  k2 = Tknee*180/PI;
 // k1 = 10;
 // k2 = 10;
  m = mass4;
    a = [
    [l3*cos(theta[1]),-l3*sin(theta[1]),0,0,0,0,0,0,0,0,0,0,0,0,I3,0,0,0],
    [-sin(theta[0]+theta[1])/m3,-cos(theta[0]+theta[1])/m3,0,0,0,0,1/m3,0,0,0,0,0,0,0,-l3*sin(theta[0])/2,0,0,0],
    [cos(theta[0]+theta[1])/m3,-sin(theta[0]+theta[1])/m3,0,0,0,0,0,-1/m3,0,0,0,0,0,0,l3*cos(theta[0])/2,0,0,0],
    [0,0,0,0,0,0,0,0,1,0,0,0,0,0,l3*sin(theta[0]),0,0,0],
    [0,0,0,0,0,0,0,0,0,1,0,0,0,0,-l3*cos(theta[0]),0,0,0],
    [0,0,-l2*sin(theta[2]),l2*cos(theta[2]),0,0,0,0,0,0,0,0,0,0,0,I2,0,0],
    [sin(theta[0]+theta[1])/m2,cos(theta[0]+theta[1])/m2,-sin(theta[0]+theta[1]-theta[2])/m2,-cos(theta[0]+theta[1]-theta[2])/m2,0,0,0,0,1,0,0,0,0,0,0,-l2*cos(theta[0]+theta[1])/2,0,0],
    [-cos(theta[0]+theta[1])/m2,sin(theta[0]+theta[1])/m2,cos(theta[0]+theta[1]-theta[2])/m2,-sin(theta[0]+theta[1]-theta[2])/m2,0,0,0,0,0,1,0,0,0,0,0,-l2*sin(theta[0]+theta[1])/2,0,0],
    [0,0,0,0,0,0,0,0,-1,0,1,0,0,0,0,l2*cos(theta[0]+theta[1]),0,0],
    [0,0,0,0,0,0,0,0,0,-1,0,1,0,0,0,l2*sin(theta[0]+theta[1]),0,0],
    [0,0,0,0,l1*sin(theta[3]+theta[0]+theta[1]-theta[2]),-l1*cos(theta[3]+theta[0]+theta[1]-theta[2]),0,0,0,0,0,0,0,0,0,0,-I1,0],
    [0,0,sin(theta[1]+theta[0]-theta[2])/m1,cos(theta[1]+theta[0]-theta[2])/m1,sin(theta[3])/m1,-cos(theta[3])/m1,0,0,0,0,1,0,0,0,0,0,-l1*cos(theta[0]+theta[1]-theta[2])/2,0],
    [0,0,-cos(theta[1]+theta[0]-theta[2])/m1,sin(theta[1]+theta[0]-theta[2])/m1,cos(theta[3])/m1,sin(theta[3])/m1,0,0,0,0,0,1,0,0,0,0,-l1*sin(theta[0]+theta[1]-theta[2])/2,0],
    [0,0,0,0,0,0,0,0,0,0,-1,0,1,0,0,0,l1*cos(theta[0]+theta[1]-theta[2]),0],
    [0,0,0,0,0,0,0,0,0,0,0,-1,0,1,0,0,l1*sin(theta[0]+theta[1]-theta[2]),0],
    [0,0,0,0,0,(l1+l2+l4),0,0,0,0,0,0,0,0,0,0,0,1/12*math.pow((l1+l2+l4),2)*(m1+m2+m3)],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,-(l1+l2+l4)*cos(theta[3])],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,(l1+l2+l4)*sin(theta[3])]
    ]
    if((mu_>0)||(mu_<0)){
      b = [-mu_*180/PI*theta[1]-m3*g*l3*cos(theta[0])/2,
      math.pow((dtheta[0]),2)*l3*cos(theta[0])/2,
      math.pow((dtheta[0]),2)*l3*sin(theta[0])/2-g,
      -l3*cos(theta[0])*math.pow((dtheta[0]),2),
      -math.pow((dtheta[0]),2)*l3*sin(theta[0]),
      m2*g*l2*sin(theta[0]+theta[1])/2+mu_*180/PI*theta[1]-k2*theta[2],
      -math.pow((dtheta[0]+dtheta[1]),2)*l2*sin(theta[0]+theta[1])/2,
      math.pow((dtheta[0]+dtheta[1]),2)*l2*cos(theta[0]+theta[1])/2-g,
      math.pow((dtheta[0]+dtheta[1]),2)*l2*sin(theta[0]+theta[1]),
      -math.pow((dtheta[0]+dtheta[1]),2)*l2*cos(theta[0]+theta[1]),
      k1*(theta[0]+theta[1]-theta[2])-k2*theta[2]-m1*g*l1*sin(theta[0]+theta[1]-theta[2])/2-m*g*l1*sin(theta[0]+theta[1]-theta[2]),
      -math.pow(dtheta[0]+dtheta[1]-dtheta[2],2)*l1*sin(theta[0]+theta[1]-theta[2])/2,
      math.pow(dtheta[0]+dtheta[1]-dtheta[2],2)*l1*cos(theta[0]+theta[1]-theta[2])/2-g-m*g/m1,
      math.pow(dtheta[0]+dtheta[1]-dtheta[2],2)*l1*sin(theta[0]+theta[1]-theta[2]),
      -math.pow(dtheta[0]+dtheta[1]-dtheta[2],2)*l1*cos(theta[0]+theta[1]-theta[2]),
      (m1+m2+m3)*g*(l1+l2+l4)*sin(theta[3])/2+m*g*(l1+l2+l4)*sin(theta[3])-k1*(theta[0]+theta[1]-theta[2]),
      -math.pow(dtheta[3],2)*(l1+l2+l4)*sin(theta[3]),
      -math.pow(dtheta[3],2)*(l1+l2+l4)*cos(theta[3])
    ]
    }else{
      b = [Tankle-m3*g*l3*cos(theta[0])/2,
      math.pow((dtheta[0]),2)*l3*cos(theta[0])/2,
      math.pow((dtheta[0]),2)*l3*sin(theta[0])/2-g,
      -l3*cos(theta[0])*math.pow((dtheta[0]),2),
      -math.pow((dtheta[0]),2)*l3*sin(theta[0]),
      m2*g*l2*sin(theta[0]+theta[1])/2-Tankle-k2*theta[2],
      -math.pow((dtheta[0]+dtheta[1]),2)*l2*sin(theta[0]+theta[1])/2,
      math.pow((dtheta[0]+dtheta[1]),2)*l2*cos(theta[0]+theta[1])/2-g,
      math.pow((dtheta[0]+dtheta[1]),2)*l2*sin(theta[0]+theta[1]),
      -math.pow((dtheta[0]+dtheta[1]),2)*l2*cos(theta[0]+theta[1]),
      k1*(theta[0]+theta[1]-theta[2])-k2*theta[2]-m1*g*l1*sin(theta[0]+theta[1]-theta[2])/2-m*g*l1*sin(theta[0]+theta[1]-theta[2]),
      -math.pow(dtheta[0]+dtheta[1]-dtheta[2],2)*l1*sin(theta[0]+theta[1]-theta[2])/2,
      math.pow(dtheta[0]+dtheta[1]-dtheta[2],2)*l1*cos(theta[0]+theta[1]-theta[2])/2-g-m*g/m1,
      math.pow(dtheta[0]+dtheta[1]-dtheta[2],2)*l1*sin(theta[0]+theta[1]-theta[2]),
      -math.pow(dtheta[0]+dtheta[1]-dtheta[2],2)*l1*cos(theta[0]+theta[1]-theta[2]),
      (m1+m2+m3)*g*(l1+l2+l4)*sin(theta[3])/2+m*g*(l1+l2+l4)*sin(theta[3])-k1*(theta[0]+theta[1]-theta[2]),
      -math.pow(dtheta[3],2)*(l1+l2+l4)*sin(theta[3]),
      -math.pow(dtheta[3],2)*(l1+l2+l4)*cos(theta[3])
    ]
    }
    
  try {
    math.inv(a)
  }
  catch(error) {
    //console.log(a);
    //console.log("forces calculation error");
    return 0;
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
  }
  //console.log("forces calculation success!");
    return math.multiply(math.inv(a),b);
  }

  function loadScript( url, callback ) {
    var script = document.createElement( "script" )
    script.type = "text/javascript";
    if(script.readyState) {  // only required for IE <9
      script.onreadystatechange = function() {
        if ( script.readyState === "loaded" || script.readyState === "complete" ) {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {  //Others
      script.onload = function() {
        callback();
      };
    }
  
    script.src = url;
    document.getElementsByTagName( "head" )[0].appendChild( script );
  }

  function calculateSwingHeel(index,theta1Array,theta2Array,theta4Array) {
    
    //stance side
    SwingToe = [];
    SwingHeel = [];
    var LandingT = 0;
    for (var drawIndex = 0; drawIndex < index; drawIndex = drawIndex + 1) {
   //alert(theta4Array);
    drawTheta4 = theta4Array[drawIndex] + PI/2; //theta3Array[drawIndex] + PI/2;
    var skneeX = width/2 + (len1)*100*Math.cos(2*PI - drawTheta4);
 var skneeY = height/2 + (len1)*100*Math.sin(2*PI - drawTheta4);
  var sankleX = skneeX + (len2)*100*Math.cos(2*PI - drawTheta4);
  var sankleY = skneeY + (len2)*100*Math.sin(2*PI - drawTheta4);
  var sfootX = sankleX;
  var sfootY = sankleY + len5*100;
  var sheelX = sfootX - footFraction*len3*100;
  var sheelY = sfootY;
  var stoeX = sfootX + (1 - footFraction)*len3*100;
  var stoeY = sfootY;
  drawTheta1 = theta1Array[drawIndex] + PI/2;
//calculated theta2 value (global angle)
if(theta2Array[drawIndex]<0)
theta2Array[drawIndex] = 0;

drawTheta2 = theta2Array[drawIndex] + theta1Array[drawIndex] + PI/2;
drawTheta3 = drawTheta2 + PI/2; //theta3Array[drawIndex] + PI/2;
//knee joint location
var jointX = width/2 + (len1*100)*Math.cos(drawTheta1);
var jointY = height/2 + (len1*100)*Math.sin(drawTheta1);
//ankle joint location
var endX = jointX + (len2*100)*Math.cos(drawTheta2);
var endY = jointY + (len2*100)*Math.sin(drawTheta2);
//center foot location
var footX = endX + (len5*100)*Math.cos(drawTheta2);
var footY = endY + (len5*100)*Math.sin(drawTheta2);
//heel location
var heelX = footX + footFraction*len3*100*Math.cos(drawTheta3);
var heelY = footY + footFraction*len3*100*Math.sin(drawTheta3);
//toe location
var toeX = footX + (1 - footFraction)*len3*100*Math.cos(drawTheta3 - PI);
var toeY = footY + (1 - footFraction)*len3*100*Math.sin(drawTheta3 - PI);
//SwingToe[drawIndex][0] = round((toeX-sheelX)*100)/100;
SwingToe[drawIndex] = -round((toeY-sheelY)*100)/100;
//SwingHeel[drawIndex][0] = round((heelX-sheelX)*100)/100;
SwingHeel[drawIndex] = -round((heelY-sheelY)*100)/100;
if(((drawTheta2-PI/2)/PI*180<15)&&(drawIndex>10)&&((SwingHeel[drawIndex] < 2) &&(SwingHeel[drawIndex] > -2) &&(SwingHeel[drawIndex] < SwingHeel[drawIndex-1]) &&(drawIndex > 0))){
LandingT = drawIndex * deltaT;
return LandingT;
    }
   
}
 return LandingT;
}
  function DoublestanceAFO(DStheta, DSdtheta, Tankle, Thip, Tknee, T1){
    var forces = [];  
    forces = solvelegAFO(DStheta, DSdtheta, Tankle, Thip, Tknee);
      if (forces == 0)      return;
      var index = 0;
      var temphip = PI/2;

      var  DStheta0 = DStheta[0];
      var  DStheta1 = DStheta[1];
      var  DStheta2 = DStheta[2];
      var  DStheta4 = DStheta[3];
      var  DSdtheta0 = DSdtheta[0];
      var  DSdtheta1 = DSdtheta[1];
      var  DSdtheta2 = DSdtheta[2];
      var  DSdtheta4 = DSdtheta[3];

    for (var i = 0; i < (time_-T1); i = i + deltaT) {
      if((mu_>0)||(mu_<0)){
    var DSthetaDbDot0 = (-forces[0]*len3*cos(DStheta1)+mu_*180/PI*DStheta1+forces[1]*len3*sin(DStheta1)-m3*g*0.5*len3*cos(DStheta0))/I3;
    var lowerlegrot = (-mu_*180/PI*DStheta1-k2*DStheta2 - forces[3]*len2*cos(DStheta2) + forces[2]*len2*sin(DStheta2)+m2*g*0.5*len2*sin(DStheta0+DStheta1))/I2;
       }
       else
       {
        var DSthetaDbDot0 = (-forces[0]*len3*cos(DStheta1)+Tankle+forces[1]*len3*sin(DStheta1)-m3*g*0.5*len3*cos(DStheta0))/I3;
        var lowerlegrot = (-Tankle-k2*DStheta2 - forces[3]*len2*cos(DStheta2) + forces[2]*len2*sin(DStheta2)+m2*g*0.5*len2*sin(DStheta0+DStheta1))/I2;    
       }
    var DSthetaDbDot1 = (-DSthetaDbDot0+lowerlegrot);
    DStheta0 = DStheta0 + DSdtheta0 * deltaT;
    DStheta1 = DStheta1 + DSdtheta1 * deltaT;
    DSdtheta0 = DSdtheta0 + DSthetaDbDot0 * deltaT;
    DSdtheta1 = DSdtheta1 + DSthetaDbDot1 * deltaT;
    //initialize for solve double stance
    var DSItheta0 = DStheta0;
    var DSItheta1 = DStheta1;
    var DSItheta2 = DStheta2;
    var DSIdtheta0 = DSdtheta0;
    var DSIdtheta1 = DSdtheta1;
    var result = solvedoublestanceAFO(DSItheta0,DSItheta1,DSItheta2,DSIdtheta0,DSIdtheta1);

    var DSIdtheta2 = result[1];
    var DSIdtheta4 = result[2];
    var DSItheta4 = result[0];
    //DStheta2 = initial.theta2;
    DStheta4 = DSItheta4;
    DSdtheta2 = DSIdtheta2;
    DSdtheta4 = DSIdtheta4;
    DStheta2 = DStheta2 + DSdtheta2 * deltaT;
    //console.log(DStheta2);
    //console.log(DSdtheta2);
    index = index + 1;
    //update data to solve force
    DStheta[0] = DStheta0;
    DStheta[1] = DStheta1;
    DStheta[2] = DStheta2;
    DStheta[3] = DStheta4;
    DSdtheta[0] = DSdtheta0;
    DSdtheta[1] = DSdtheta1;
    DSdtheta[2] = DSdtheta2;
    DSdtheta[3] = DSdtheta4;
    forces = solvelegAFO(DStheta, DSdtheta, Tankle, Thip, Tknee);
    //console.log(forces);
    //console.log(forces[7]);
    if (forces == 0)      
    {
      //console.log('Doublestance: forces all zero');
      return;}
      /*if((DStheta[2]>theta0_2/180*PI))
      {DStheta0Array[index] = DStheta0;
        DStheta1Array[index] = DStheta1;
        DStheta2Array[index] = DStheta2;
        DStheta4Array[index] = DStheta4;
        DSthetaDot0Array[index] = DSdtheta0;
        DSthetaDot1Array[index] = DSdtheta1;
        DSthetaDot2Array[index] = DSdtheta2;
        DSthetaDot4Array[index] = DSdtheta4;
        console.log('knee exceed limit');
        return;
      }*/
      if(forces[7]<0)     
      {
        //console.log('Doublestance: solve success - Force');
        return;
      }
      if(DStheta[0] > PI/2)
      {
        //console.log('Doublestance: solve success - Foot Angle');
        return;        
      }
      if(DStheta[0]+DStheta[1]-DStheta[2] >temphip)
      {
        //console.log('Doublestance: solve success - Hip Angle');
        return;        
      }
    DS2theta0Array[index] = DStheta0;
    DS2theta1Array[index] = DStheta1;
    DS2theta2Array[index] = DStheta2;
    DS2theta4Array[index] = DStheta4;
    DS2thetaDot0Array[index] = DSdtheta0;
    DS2thetaDot1Array[index] = DSdtheta1;
    DS2thetaDot2Array[index] = DSdtheta2;
    DS2thetaDot4Array[index] = DSdtheta4;
    temphip = DStheta[0]+DStheta[1]-DStheta[2];
    }

}
  function Doublestance(DStheta, DSdtheta, Tankle, Thip, Tknee, T1){
    var forces = [];  
    forces = solveleg(DStheta, DSdtheta, Tankle, Thip, Tknee);
      if (forces == 0)      return;
      var index = 0;
      var temphip = PI/2;

      var  DStheta0 = DStheta[0];
      var  DStheta1 = DStheta[1];
      var  DStheta2 = DStheta[2];
      var  DStheta4 = DStheta[3];
      var  DSdtheta0 = DSdtheta[0];
      var  DSdtheta1 = DSdtheta[1];
      var  DSdtheta2 = DSdtheta[2];
      var  DSdtheta4 = DSdtheta[3];

      for (var i = 0; i < (time_-T1); i = i + deltaT) {

      var DSthetaDbDot0 = (-forces[0]*len3*cos(DStheta1)+Tankle+forces[1]*len3*sin(DStheta1)-m3*g*0.5*len3*cos(DStheta0))/I3;
      var lowerlegrot = (-Tankle-k2*DStheta2 - forces[3]*len2*cos(DStheta2) + forces[2]*len2*sin(DStheta2)+m2*g*0.5*len2*sin(DStheta0+DStheta1))/I2;
      var DSthetaDbDot1 = (-DSthetaDbDot0+lowerlegrot);
      DStheta0 = DStheta0 + DSdtheta0 * deltaT;
      DStheta1 = DStheta1 + DSdtheta1 * deltaT;
      DSdtheta0 = DSdtheta0 + DSthetaDbDot0 * deltaT;
      DSdtheta1 = DSdtheta1 + DSthetaDbDot1 * deltaT;
      //initialize for solve double stance
      var DSItheta0 = DStheta0;
      var DSItheta1 = DStheta1;
      var DSItheta2 = DStheta2;
      var DSIdtheta0 = DSdtheta0;
      var DSIdtheta1 = DSdtheta1;
      var result = solvedoublestanceAFO(DSItheta0,DSItheta1,DSItheta2,DSIdtheta0,DSIdtheta1);
      //alert("result: "+result);
      var DSIdtheta2 = result[1];
      var DSIdtheta4 = result[2];
      var DSItheta4 = result[0];
      //alert("DSIdtheta4: "+DSIdtheta4);
      //DStheta2 = initial.theta2;
      DStheta4 = DSItheta4;
      DSdtheta2 = DSIdtheta2;
      DSdtheta4 = DSIdtheta4;
      DStheta2 = DStheta2 + DSdtheta2 * deltaT;
      //console.log(DStheta2);
      //console.log(DSdtheta2);
      index = index + 1;
      //update data to solve force
      DStheta[0] = DStheta0;
      DStheta[1] = DStheta1;
      DStheta[2] = DStheta2;
      DStheta[3] = DStheta4;
      DSdtheta[0] = DSdtheta0;
      DSdtheta[1] = DSdtheta1;
      DSdtheta[2] = DSdtheta2;
      DSdtheta[3] = DSdtheta4;
      //alert(DSdtheta[3]);
      forces = solveleg(DStheta, DSdtheta, Tankle, Thip, Tknee);
      //console.log(forces);
      //console.log(forces[7]);
      if (forces == 0)      
      {
        //console.log('Doublestance: forces all zero');
        return;}
        /*if((DStheta[2]>theta0_2/180*PI))
        {DStheta0Array[index] = DStheta0;
          DStheta1Array[index] = DStheta1;
          DStheta2Array[index] = DStheta2;
          DStheta4Array[index] = DStheta4;
          DSthetaDot0Array[index] = DSdtheta0;
          DSthetaDot1Array[index] = DSdtheta1;
          DSthetaDot2Array[index] = DSdtheta2;
          DSthetaDot4Array[index] = DSdtheta4;
          console.log('knee exceed limit');
          return;
        }*/
      if(forces[7]<0)     
      {
        //console.log('Doublestance: solve success - Force');
        return;
      }
      if(DStheta[0] > PI/2)
      {
        //console.log('Doublestance: solve success - Foot Angle');
        return;        
      }
      //alert("forces[7]: "+forces[7]);
      if(DStheta[0]+DStheta[1]-DStheta[2] >temphip)
      {
        //console.log('Doublestance: solve success - Hip Angle');
        return;        
      }
      DStheta0Array[index] = DStheta0;
      DStheta1Array[index] = DStheta1;
      DStheta2Array[index] = DStheta2;
      DStheta4Array[index] = DStheta4;
      DSthetaDot0Array[index] = DSdtheta0;
      DSthetaDot1Array[index] = DSdtheta1;
      DSthetaDot2Array[index] = DSdtheta2;
      DSthetaDot4Array[index] = DSdtheta4;
      temphip = DStheta[0]+DStheta[1]-DStheta[2];
      //alert("DStheta0Array: "+DStheta0Array);
      }

  }
  function DataProcess(marrayX, marrayY, minterRatio){
    //console.log('Doing interpolation');
    var p = [];
    var NewarrayY = [];
    NewarrayX = [];
    
    for (var i = 0; i < ((marrayX.length-1) * minterRatio + 1); i = i + 1){
      NewarrayX[i] = i * marrayX[marrayX.length - 1]/minterRatio/(marrayX.length-1);
    }
    for (var i = 0; i < marrayY.length; i = i + 1){
      p.push({
        x: marrayX[i], //i * deltaT,
        y: marrayY[i]//DStheta0Array[i]
    });
    }
    var fun = [];
    fun = cubicSplineInterpolation(p);
    //console.log(fun);
    //calculate new values
    //console.log(NewarrayX.length);
    for (var i = 0; i < NewarrayX.length; i = i + 1){
      //console.log(i);
      iter = math.floor((i)/(minterRatio));
      //console.log(iter);
      if (iter > (math.floor(NewarrayX.length / minterRatio) - 1)) iter = math.floor(NewarrayX.length / minterRatio) - 1;
      NewarrayY[i] = fun[iter].a * math.pow(NewarrayX[i],3) + fun[iter].b * math.pow(NewarrayX[i],2) + fun[iter].c * math.pow(NewarrayX[i],1) + fun[iter].d;
    }
    //console.log(NewarrayX);
    //console.log(NewarrayY);
    return NewarrayY;
    
  }

  function ProcessDSphasedata(Time, Angle){
    //cut angle
    var start = [];
    var end = [];
    var piece1 = [];
    var piece2 = [];
    var piece3 = [];
    var piece4 = [];
    var time1, time2, time3, time4;
    var num = 0;
    for(i = 1; i < Time.length; i = i + 1){
      if(Time[i] - Time[i-1]>0.015){
        start[num] = i-2;
        end[num] = i+1;
        num = num + 1;
      }
    }
    //cut the array
    piece1 = Angle.slice(0,start[0]);
    piece2 = Angle.slice(start[0],end[0]+1);
    piece3 = Angle.slice(end[0]+1,start[1]);
    piece4 = Angle.slice(start[1],end[1]);
    //piece5 = [Angle.slice(end[1]-1,end[1]),Angle[1]];
    time1 = Time.slice(0,start[0]);
    time2 = Time.slice(start[0],end[0]+1);
    time3 = Time.slice(end[0]+1,start[1]);
    time4 = Time.slice(start[1],end[1]);
   // time5 = [Time.slice(end[1]-1),Time.slice(end[1]-1)+0.01];
    piece2 = FillingGap(time2,piece2);
    piece4 = FillingGap(time4,piece4);
    var Newangle = [];
    Newangle = piece1.concat(Angle[start[0]],piece2,piece3,Angle[start[1]],piece4);
    return Newangle;
  }

  function FillingGap(T, ArrayVar){
    //alert(T+', '+ArrayVar);
    var NewarrayY=[];
    var p = [];
    var NewT= [];
    var Num= 0;
    for (var i = T[1]; i < T[T.length-1]; i = i + 0.01){
    NewT[Num] = i;
    Num = Num + 1;
    }   
    //alert('NewT: '+NewT);
    //console.log('Doing interpolation');
    for(var i = 0; i<T.length; i = i+1)
      p.push({
        x: T[i], //i * deltaT,
        y: ArrayVar[i]//DStheta0Array[i]
    });
    var fun = [];
    fun = cubicSplineInterpolation(p);
    //console.log(fun);
    //calculate new values
    //console.log(NewarrayX.length);
    for (var i = 0; i < NewT.length; i = i + 1){
      //console.log(i);
      NewarrayY[i] = fun[1].a * math.pow(NewT[i],3) + fun[1].b * math.pow(NewT[i],2) + fun[1].c * math.pow(NewT[i],1) + fun[1].d;
    }
    
    //console.log(NewarrayX);
    //console.log(NewarrayY);
    return NewarrayY;
    
  }
  
  function Drawplot(Arrayxplot, ArrayYplot, typeplot){
    var trace1 = {
      x: Arrayxplot,
      y: ArrayYplot,
      type: typeplot
    };
    /*
    var trace2 = {
      x: NewarrayX,
      y: NewarrayY,
      type: 'scatter'
    };
    */
    var data = [trace1];//, trace2];
    
    Plotly.newPlot('myDiv', data);   
  }
//initial = [D0,0,D1,1,D2,2,D3,3,D4,4]
  function calculateST(Initial){
    var VEC = [];
    var t = 2;
    var T1 = 0.3;
    var ENDT2 = 0;
     DStheta0Array = [];
     DSthetaDot0Array = [];
     DStheta1Array = [];
     DSthetaDot1Array = [];
   //DSthetaDbDot1Array = [];
     DStheta2Array = [];
     DSthetaDot2Array = [];
   //DSthetaDbDot2Array = [];
     DStheta4Array = [];
     DSthetaDot4Array = [];
    var DStheta0ArrayV = [];
    var DStheta1ArrayV = [];
    var DStheta2ArrayV = [];
    var DStheta4ArrayV = [];
    //calculate theta0
    DStheta0Array[0] = Initial[1]/180*PI;
    DSthetaDot0Array[0] = Initial[0]/180*PI;
    DStheta1Array[0] = Initial[3]/180*PI;
    DSthetaDot1Array[0] = Initial[2]/180*PI;
    //DStheta4Array[0] = theta1Array[T1/deltaT - 1];
    //DSthetaDot4Array[0] = thetaDot1Array[T1/deltaT - 1];
    DStheta2Array[0] = Initial[5]/180*PI;
    DStheta4Array[0] = Initial[9]/180*PI;
    DSthetaDot2Array[0] = Initial[4]/180*PI;
    DSthetaDot4Array[0] = Initial[8]/180*PI;

    //corrisponding to trigger double stance
    var DStheta = [DStheta0Array[0], DStheta1Array[0], DStheta2Array[0], DStheta4Array[0]];
    var DSdtheta = [DSthetaDot0Array[0], DSthetaDot1Array[0], DSthetaDot2Array[0], DSthetaDot4Array[0]];
    //alert(DStheta);
    //alert(DSdtheta);
    //alert(T1stswing)
    //alert("line 673: DStheta: "+DStheta+"\nDSdtheta: "+DSdtheta+"\nT23: "+T23+"\nk_7: "+k_7+"\nk_8: "+k_8);
    Doublestance(DStheta, DSdtheta, T23, k_7, k_8, 1);
    //alert("(line 675) length: "+DStheta0Array.length);
    //alert("DStheta0Array: " + DStheta0Array+"\nDStheta1Array: "+DStheta1Array+"\nDStheta2Array: "+DStheta2Array+"\nDStheta4Array: "+DStheta4Array);
    //for trim purpose
    DSthetainit = [DStheta0Array[0], DStheta1Array[0], DStheta2Array[0], DStheta4Array[0]];
    if(DStheta0Array.length == 1)
    {
      return NaN;
    }
     // length2 = 1;
      DStheta0ArrayV = DStheta0Array;
      DStheta1ArrayV = DStheta1Array;
      DStheta2ArrayV = DStheta2Array;
      DStheta4ArrayV = DStheta4Array;
    /*}
    else{
      //alert("DStheta0Array length: "+DStheta0Array.length);
    DStheta0ArrayM = [];
    DStheta1ArrayM = [];
    DStheta2ArrayM = [];
    DStheta4ArrayM = [];
    DStheta0ArrayM = DStheta0Array.slice(1);
    DStheta1ArrayM = DStheta1Array.slice(1);
    DStheta2ArrayM = DStheta2Array.slice(1);
    DStheta4ArrayM = DStheta4Array.slice(1); 

    //var p = [];
    arrayX = [];
    for (var i = 0; i < DStheta0ArrayM.length; i = i + 1){
      arrayX[i] = i * deltaT;
    }
/*     if(DStheta0Array.length < 8)
    interRatio = 20;
    else */
    /*interRatio = 4;
    //alert("DStheta0ArrayM: "+DStheta0ArrayM);
    //interpolation
    //alert(DStheta1Array);
    try{
    DStheta0ArrayV = DataProcess(arrayX, DStheta0ArrayM, interRatio);
    DStheta1ArrayV = DataProcess(arrayX, DStheta1ArrayM, interRatio);
    DStheta2ArrayV = DataProcess(arrayX, DStheta2ArrayM, interRatio);
    DStheta4ArrayV = DataProcess(arrayX, DStheta4ArrayM, interRatio);
    }
    catch(err)
    {
      //console.log("The first DS has no length.");
      VEC = NaN;
      return VEC;
    }
    DStheta0ArrayV = [DSthetainit[0]].concat(DStheta0ArrayV);
    DStheta1ArrayV = [DSthetainit[1]].concat(DStheta1ArrayV);
    DStheta2ArrayV = [DSthetainit[2]].concat(DStheta2ArrayV);
    DStheta4ArrayV = [DSthetainit[3]].concat(DStheta4ArrayV);
    for(var i = 0; i < DStheta0ArrayV.length; i = i + 1){
     if(DStheta2ArrayV[i] > 45/180*PI)
     {
       ENDT2 = i;
       break;
     }
     ENDT2 = DStheta0ArrayV.length;
    }
    DStheta0ArrayV = DStheta0ArrayV.slice(0,ENDT2);
    DStheta1ArrayV = DStheta1ArrayV.slice(0,ENDT2);
    DStheta2ArrayV = DStheta2ArrayV.slice(0,ENDT2);
    DStheta4ArrayV = DStheta4ArrayV.slice(0,ENDT2);  
    //length2 = DStheta0ArrayM.length * interRatio - (interRatio-1)+1;
  } 
  */
  //alert("DStheta0ArrayV length: "+DStheta0ArrayV.length);
  length2 = DStheta0ArrayV.length;
  //alert("line 750");
    //console.log('Finish interpolation');
    //Length for swing+stance
    length1 = round(T1/deltaT);
    //alert("length1 = "+length1);
    (zero1 = []).length = length1;
    zero1.fill(0);
    //ankle for swing+stance
    Maxankle = 15/180*PI;
    ankleswing = [];
    for (var i = 0; i < math.floor(length1/2); i = i + 1){
      ankleswing[i] = DStheta1Array[DStheta1Array.length-1] + (i+1) * (Maxankle - DStheta1Array[DStheta1Array.length-1])/math.floor(length1/2);
    }   
    for (var i = math.floor(length1/2); i < length1; i = i + 1){
      ankleswing[i] = Maxankle + (i + 1 - math.floor(length1/2)) * ( 0 - Maxankle )/(length1 - math.floor(length1/2));
    }   
    //Length for Doublestance
    //length2 = DStheta0Array.length * interRatio - (interRatio-1);
    
    interT = [];
    for (var i = 0; i < 2*(T1/deltaT + length2); i = i + 1){
      interT[i] = i * deltaT;
    }    
/*     //Correct Hip angle
    for (var i = 0; i < length1; i = i + 1){
      theta4ArrayDS[i] = theta4ArrayDS[i] - PI;
     }
     for (var i = 0; i < length1; i = i + 1){
      theta1ArrayDS[i] = -theta1ArrayDS[i];
     } */
     //Correct DSKnee angle
     for (var i = 0; i < length2; i = i + 1){
      if (DStheta2ArrayV[i] < 0)
      DStheta2ArrayV[i] = 0;
     }
    //Ankle during stnace
    anklestance = [];
/*     for (var i = 0; i < length1; i = i + 1){
     anklestance[i] = -theta4ArrayDS[i];
    } */
    //later hip during DS
    latterhip = [];
    //alert("DStheta0Array: " + DStheta0ArrayV+"\nDStheta1Array: "+DStheta1ArrayV+"\nDStheta2Array: "+DStheta2ArrayV+"\nDStheta4Array: "+DStheta4ArrayV);
    for (var i = 0; i < length2; i = i + 1){
      latterhip[i] = -(DStheta0ArrayV[i] + DStheta1ArrayV[i] - DStheta2ArrayV[i]);
     }   
     //alert("latterhip: "+latterhip);
     //console.log('Begain to Concat');
    //shrink knee and hip angle during double stance
            Kneezero1 = [];
            Kneezero2 = [];
            Anklezero2 = [];
        //knee bending at LTO and LHS
        for (var i = 0; i < length2; i = i + 1){
          if(i < length2/5*4){
            Kneezero2[i] = 0;
          continue;}
        Kneezero2[i] = 5*theta0_5/(length2)*(i-length2/5*4);
        }
        for (var i = 0; i < length1; i = i + 1){
          Kneezero1[i] = (theta0_5 - 4*theta0_5/length1*i); 
          if(Kneezero1[i]< 0)
          Kneezero1[i] = 0;
          anklestance[i] = anklestance[i]+Kneezero1[i];
          }
          //shrink knee and hip angle during double stance
     //VEC[1] = -DStheta4ArrayV[DStheta4ArrayV.length - 1] + Kneezero2[Kneezero2.length - 1];
     if(0){
       Ratioknee = theta2ArrayDS[0]/DStheta2ArrayV[DStheta2ArrayV.length-1];
       Ratiohip = theta1ArrayDS[0]/latterhip[latterhip.length-1];
       //Ratiohip1 = theta4Array[0]/DStheta4ArrayV[DStheta4ArrayV.length-1];
       Ratioankle = ankleswing[0]/DStheta1ArrayV[DStheta1ArrayV.length-1];
           for (var i = 0; i < length2; i = i + 1){
             DStheta2ArrayV[i] = DStheta2ArrayV[i] * (1 + (i+1)*(Ratioknee - 1)/length2);
             latterhip[i] = latterhip[i] * (1 + (i+1)*(Ratiohip - 1)/length2);
            // DStheta4ArrayV[i] = DStheta4ArrayV[i] * (1 + (i+1)*(Ratiohip1 - 1)/length2);
             DStheta1ArrayV[i] = DStheta1ArrayV[i] * (1 + (i+1)*(Ratioankle - 1)/length2);
            }
           }
          //alert(latterhip);
           if(0){
            for (var i = 0; i < length2; i = i + 1){
              latterhip[i] = -latterhip[i]/5;
              DStheta4ArrayV[i] = -DStheta4ArrayV[i]/5;
              }
             //alert(latterhip);
             elevatehip = theta4ArrayDS[theta4ArrayDS.length-1] - latterhip[0];
             //alert('elevatehip: '+elevatehip);
             //alert('theta4end: '+theta4Array[theta4Array.length-1]);
             diffknee = theta2ArrayDS[0]-DStheta2ArrayV[DStheta2ArrayV.length-1];
             diffhip = theta1ArrayDS[0]-latterhip[latterhip.length-1]-elevatehip;
            //alert('diffhip: '+diffhip);
             //Ratiohip1 = theta4Array[0]/DStheta4ArrayV[DStheta4ArrayV.length-1];
             diffankle = ankleswing[0]-DStheta1ArrayV[DStheta1ArrayV.length-1];
 
                 for (var i = 0; i < length2; i = i + 1){
                                     //adjust based on polynomial with order of 2
                  /*
                   DStheta2ArrayV[i] = DStheta2ArrayV[i] + diffknee * ((pow(i,2)+2*i+1)/pow(length2,2));
                   latterhip[i] = latterhip[i] + elevatehip + diffhip * ((pow(i,2)+2*i+1)/pow(length2,2));
                  // DStheta4ArrayV[i] = DStheta4ArrayV[i] * (1 + (i+1)*(Ratiohip1 - 1)/length2);
                   DStheta1ArrayV[i] = DStheta1ArrayV[i] + diffankle * ((pow(i,2)+2*i+1)/pow(length2,2));
                    */
                 //adjust based on linear correction
                 DStheta2ArrayV[i] = DStheta2ArrayV[i] + diffknee * ((i+1)/length2);
                 latterhip[i] = latterhip[i] + elevatehip + diffhip * ((i+1)/length2);
                // DStheta4ArrayV[i] = DStheta4ArrayV[i] * (1 + (i+1)*(Ratiohip1 - 1)/length2);
                 DStheta1ArrayV[i] = DStheta1ArrayV[i] + diffankle * ((i+1)/length2);
                  }
                  elevatehip = theta1ArrayDS[theta1ArrayDS.length-1] - DStheta4ArrayV[0];
                  //diffknee = Kneezero1[0]-Kneezero2[Kneezero2.length-1];
                  diffhip = theta4ArrayDS[0]-DStheta4ArrayV[DStheta4ArrayV.length-1]-elevatehip;
                  //Ratiohip1 = theta4Array[0]/DStheta4ArrayV[DStheta4ArrayV.length-1];
                  diffankle = anklestance[0]-Kneezero2[Kneezero2.length-1];
                  for (var i = 0; i < length2; i = i + 1){
                   //adjust based on polynomial with order of 2
                  /*
                   //Kneezero2[i] = Kneezero2[i] + diffknee * ((pow(i,2)+2*i+1)/pow(length2,2));
                   DStheta4ArrayV[i] = DStheta4ArrayV[i] + elevatehip + diffhip * ((pow(i,2)+2*i+1)/pow(length2,2));
                  // DStheta4ArrayV[i] = DStheta4ArrayV[i] * (1 + (i+1)*(Ratiohip1 - 1)/length2);
                  Anklezero2[i] = Kneezero2[i] + diffankle * ((pow(i,2)+2*i+1)/pow(length2,2));
                */
                   //adjust based on polynomial with linear
                  //Kneezero2[i] = Kneezero2[i] + diffknee * ((pow(i,2)+2*i+1)/pow(length2,2));
                  DStheta4ArrayV[i] = DStheta4ArrayV[i] + elevatehip + diffhip * ((i+1)/length2);
                 // DStheta4ArrayV[i] = DStheta4ArrayV[i] * (1 + (i+1)*(Ratiohip1 - 1)/length2);
                 Anklezero2[i] = Kneezero2[i] + diffankle *  ((i+1)/length2);  
                  }
                 }

                  diffankle = anklestance[0]-Kneezero2[Kneezero2.length-1];
                  for (var i = 0; i < length2; i = i + 1){
                 Anklezero2[i] = Kneezero2[i] + diffankle *  ((i+1)/length2);  
                  }
/*

 //left and right ankle dorsi +/plantar -
intertheta1 =  anklestance.concat(DStheta1ArrayV);
intertheta6 = ankleswing.concat(Anklezero2);
//console.log(intertheta6);
//left and right knee

intertheta2 = Kneezero1.concat(DStheta2ArrayV);
//console.log('DStheta2ArrayV-1st'+ DStheta2ArrayV);
intertheta5 = theta2ArrayDS.concat(Kneezero2);
//correct knee angle
for  (var i = 0; i < intertheta2.length; i = i + 1){
  if (intertheta2[i] < 0)  intertheta2[i] = 0;
  if (intertheta5[i] < 0)  intertheta5[i] = 0;
 }   
//left and right hip
intertheta3 = theta4ArrayDS.concat(latterhip);
//alert(latterhip);
//alert(theta1Array[theta1Array.length-1]+'vs'+DStheta4ArrayV[0]);
intertheta4 = theta1ArrayDS.concat(DStheta4ArrayV); */

timeArrayDS = [];
    theta1ArrayDS = [];
    theta2ArrayDS = [];
    theta3ArrayDS = [];
    theta4ArrayDS = [];
    thetaDot1ArrayDS = [];
    thetaDot2ArrayDS = []; 
    thetaDot3ArrayDS = [];
    thetaDot4ArrayDS = [];
    thetaDbDot1ArrayDS = [];
    thetaDbDot2ArrayDS = [];
    thetaDbDot3ArrayDS = [];
    thetaDbDot4ArrayDS =[];         


     //left and right ankle dorsi +/plantar -
intertheta11 =  DStheta1ArrayV;
intertheta61 = Anklezero2;
//console.log(intertheta6);
//left and right knee
//alert("DStheta2ArrayV: "+DStheta2ArrayV);
intertheta21 = DStheta2ArrayV;
//console.log('DStheta2ArrayV-1st'+ DStheta2ArrayV);
intertheta51 = Kneezero2;
//correct knee angle
for  (var i = 0; i < intertheta21.length; i = i + 1){
  if (intertheta21[i] < 0)  intertheta21[i] = 0;
  if (intertheta51[i] < 0)  intertheta51[i] = 0;
 }   
//left and right hip
intertheta31 = latterhip;
//alert(latterhip);
//alert(theta1Array[theta1Array.length-1]+'vs'+DStheta4ArrayV[0]);
intertheta41 = DStheta4ArrayV; 
       //double pendulum Left Second
       var Tolerance = 1.1;
       var theta1SEC = intertheta31[intertheta31.length-1];
       var theta2SEC = intertheta21[intertheta21.length-1];
       var theta3SEC = theta2SEC + PI/2;
       var theta5SEC= intertheta51[intertheta51.length-1];
       var thetaDot1SEC = -abs(latterhip[latterhip.length-1] - latterhip[latterhip.length-2])/deltaT/10;
       var thetaDot2SEC = DSthetaDot2Array[DSthetaDot2Array.length-1]/10; //same as the other leg
       var thetaDot3SEC = 0;
       var thetaDoubleDot1SEC;
       var thetaDoubleDot2SEC;
       var thetaDoubleDot3SEC;
       var indexSEC = 0;
       var theta4SEC =  PI + intertheta41[intertheta41.length-1];
       var theta4DotSEC = -abs(DSthetaDot4Array[DSthetaDot4Array.length-1]/10);
       var theta4DoubleDotSEC;

/*        if(0){
       console.log('2nd calculateThetaAFO: swing initial hip angle' + theta1SEC/PI*180);
       console.log('2nd calculateThetaAFO: swing initial knee angle' + theta2SEC/PI*180);
       console.log('2nd calculateThetaAFO: swing initial hip angular velocity' + thetaDot1SEC/PI*180);
       console.log('2nd calculateThetaAFO: swing initial knee angular velocity' + thetaDot2SEC/PI*180);
       //if((abs(thetaDot1SEC/PI*180)>Tolerance*abs(thetaDot0_1))||(thetaDot1SEC*thetaDot0_1 < 0)){
       if((abs(thetaDot1SEC/PI*180)>Tolerance*abs(thetaDot0_1))||(abs(thetaDot1SEC/PI*180)<abs(thetaDot0_1)/Tolerance)){
          thetaDot1SEC = thetaDot0_1/180*PI;
       }
       //if((abs(theta1SEC/PI*180)>Tolerance*abs(theta0_1))||(theta1SEC*theta0_1 < 0)){
       if((abs(theta1SEC/PI*180)>Tolerance*abs(theta0_1))||(abs(theta1SEC/PI*180)<abs(theta0_1)/Tolerance)){
        theta1SEC = theta0_1/180*PI;
        }
               //if((abs(thetaDot2SEC/PI*180)>Tolerance*abs(thetaDot0_2))||(thetaDot2SEC*thetaDot0_2 < 0)){
       if((abs(thetaDot2SEC/PI*180)>Tolerance*abs(thetaDot0_2))||(abs(thetaDot2SEC/PI*180)<abs(thetaDot0_2)/Tolerance)){
        thetaDot2SEC = thetaDot0_2/180*PI;
     }
        //if((abs(theta2SEC/PI*180)>Tolerance*abs(theta0_2))||(theta2SEC*theta0_2 < 0)){
        if((abs(theta2SEC/PI*180)>Tolerance*abs(theta0_2))||(abs(theta2SEC/PI*180)<abs(theta0_2)/Tolerance)){
        theta2SEC = theta0_2/180*PI;
        } 
       console.log('2nd calculateThetaAFO: corrected swing initial hip angle' + theta1SEC/PI*180);
       console.log('2nd calculateThetaAFO: corrected swing initial knee angle' + theta2SEC/PI*180);
       console.log('2nd calculateThetaAFO: corrected swing initial hip angular velocity' + thetaDot1SEC/PI*180);
       console.log('2nd calculateThetaAFO: corrected swing initial knee angular velocity' + thetaDot2SEC/PI*180);
      } */
      //alert("theta1SEC: "+theta1SEC+"\ntheta2SEC: "+theta2SEC+"\ntheta4SEC: "+theta4SEC+
      //"\nthetaDot1SEC: "+thetaDot1SEC+"\nthetaDot2SEC: "+thetaDot2SEC+"\nthetaDot4SEC: "+theta4DotSEC);
       for (var i = 0; i < t; i = i + deltaT) {
         TMtheta2SEC = theta1SEC+theta2SEC;
         TMthetaDot2SEC = thetaDot1SEC+thetaDot2SEC;
         thetaDoubleDot1SEC = doublePend_getThetaDoubleDot_1(theta1SEC, TMtheta2SEC, thetaDot1SEC, TMthetaDot2SEC, k_5, k_6);
         TMthetaDoubleDot2SEC = doublePend_getThetaDoubleDot_2(theta1SEC, TMtheta2SEC, thetaDot1SEC, TMthetaDot2SEC, thetaDoubleDot1SEC, k_6);
         thetaDoubleDot2SEC = TMthetaDoubleDot2SEC - thetaDoubleDot1SEC;
         theta1SEC = theta1SEC + thetaDot1SEC * deltaT;
         theta2SEC = theta2SEC + thetaDot2SEC * deltaT;
         // theta3 = theta3 + thetaDot3 * deltaT;
         theta3SEC = theta2SEC + PI/2; // Hard-coded
         thetaDot1SEC = thetaDot1SEC + thetaDoubleDot1SEC * deltaT;
         thetaDot2SEC = thetaDot2SEC + thetaDoubleDot2SEC * deltaT;
         thetaDot3SEC = thetaDot3SEC + thetaDoubleDot3SEC * deltaT;
         timeArrayDS[indexSEC] = i;
         theta1ArrayDS[indexSEC] = theta1SEC;
         theta2ArrayDS[indexSEC] = theta2SEC;
            thetaDot2ArrayDS[indexSEC] = thetaDot2SEC;
            thetaDbDot2ArrayDS[indexSEC] = thetaDoubleDot2SEC;
          theta3ArrayDS[indexSEC] = theta3SEC;
          thetaDot1ArrayDS[indexSEC] = thetaDot1SEC;
          thetaDot3ArrayDS[indexSEC] = thetaDot3SEC;
          thetaDbDot1ArrayDS[indexSEC] = thetaDoubleDot1SEC;
          thetaDbDot3ArrayDS[indexSEC] = thetaDoubleDot3SEC;
          indexSEC = indexSEC + 1;
        }
       //inverted pendulum
/*        if(0){
      console.log('2nd calculateThetaAFO: stance initial hip angle' + theta4SEC/PI*180);
       console.log('2nd calculateThetaAFO: stance initial hip angular velocity' + theta4DotSEC/PI*180);
       //alert('theta4SEC: '+theta4SEC+', theta0_4: '+theta0_4);
      // if((abs(theta4DotSEC/PI*180)>Tolerance*abs(thetaDot0_4))||(theta4DotSEC*thetaDot0_4 < 0)){
        if((abs(theta4DotSEC/PI*180)>Tolerance*abs(thetaDot0_4)) ||(abs(theta4DotSEC/PI*180)<abs(thetaDot0_4)/Tolerance))
      theta4DotSEC = thetaDot0_4/180*PI;
        
        //if((abs(theta4SEC/PI*180)>Tolerance*abs(theta0_4))||(theta4SEC*theta0_4 < 0)){
        if((abs(theta4SEC/PI*180)>Tolerance*abs(theta0_4))||(abs(theta4SEC/PI*180)<abs(theta0_4)/Tolerance)){
          theta4SEC = theta0_4/180*PI;
        }
        if(theta4SEC < 0)
        theta4SEC = -theta4SEC;
         console.log('2nd calculateThetaAFO: stance initial hip angle' + theta4SEC/PI*180);
         console.log('2nd calculateThetaAFO: stance initial hip angular velocity' + theta4DotSEC/PI*180);
      } */
        //if( abs(180 - theta4SEC/PI*180) > 0)
        //{
        //  theta4SEC = PI + (PI - theta4SEC);
        //}
       // console.log('theta4SEC' + theta4SEC);
       var indexSEC = 0;
       for (var i = 0; i < t; i = i + deltaT) {
         //alert("line 1041, theta4SEC: "+theta4SEC);
         theta4DoubleDotSEC = singlePendAFO_getThetaDoubleDot(theta4SEC, theta4DotSEC);
         theta4SEC = theta4SEC + theta4DotSEC * deltaT;
         //alert("line 1043, theta4SEC: "+theta4SEC);
         theta4DotSEC = theta4DotSEC + theta4DoubleDotSEC * deltaT;
         //timeArray[index] = i;
         theta4ArrayDS[indexSEC] = theta4SEC;
         //alert(theta4ArrayDS);
         thetaDot4ArrayDS[indexSEC] = theta4DotSEC;
         thetaDbDot4ArrayDS[indexSEC] = theta4DoubleDotSEC;
         indexSEC = indexSEC + 1;
       }
/*        alert("indexSEC: "+indexSEC);
       alert("theta1ArrayDS: "+theta1ArrayDS);
       alert("theta2ArrayDS: "+theta2ArrayDS);
       alert("theta4ArrayDS: "+theta4ArrayDS); */
       SECT1 = calculateSwingHeel(t/deltaT,theta1ArrayDS, theta2ArrayDS, theta4ArrayDS);
       //console.log(SECT1);
       if(SECT1 < 0.2)
       {
        return NaN;
       }
       length3 = math.floor(SECT1/deltaT);
       (zero1 = []).length = length3;
       zero1.fill(0);
       ankleswing = [];
       for (var i = 0; i < math.floor(length3/2); i = i + 1){
         ankleswing[i] = DStheta1Array[DStheta1Array.length-1] + (i+1) * (Maxankle - DStheta1Array[DStheta1Array.length-1])/math.floor(length3/2);
       }   
       for (var i = math.floor(length3/2); i < length3; i = i + 1){
         ankleswing[i] = Maxankle + (i + 1 - math.floor(length3/2)) * ( 0 - Maxankle )/(length3 - math.floor(length3/2));
       } 
       DStheta0Array = [];
    DSthetaDot0Array = [];
    DStheta1Array = [];
    DSthetaDot1Array = [];
    //DSthetaDbDot1Array = [];
    DStheta2Array = [];
    //DSthetaDot2Array = [];
    //DSthetaDbDot2Array = [];
    DStheta4Array = [];
    //DSthetaDot4Array = [];
    //second half
     //double stance phase, need to define T
     //timeArrayDS = timeArray.slice(0,length3);
     theta1ArrayDS = theta1ArrayDS.slice(0,length3);
     theta2ArrayDS = theta2ArrayDS.slice(0,length3);
     theta3ArrayDS = theta3ArrayDS.slice(0,length3);
     theta4ArrayDS = theta4ArrayDS.slice(0,length3);
     thetaDot1ArrayDS = thetaDot1ArrayDS.slice(0,length3);
     thetaDot2ArrayDS = thetaDot2ArrayDS.slice(0,length3);
     thetaDot3ArrayDS = thetaDot3ArrayDS.slice(0,length3);
     thetaDot4ArrayDS = thetaDot4ArrayDS.slice(0,length3);
     thetaDbDot1ArrayDS = thetaDbDot1ArrayDS.slice(0,length3);
     thetaDbDot2ArrayDS = thetaDbDot2ArrayDS.slice(0,length3);
     thetaDbDot3ArrayDS = thetaDbDot3ArrayDS.slice(0,length3);
     thetaDbDot4ArrayDS = thetaDbDot4ArrayDS.slice(0,length3);
     //alert("theta1ArrayDS: "+theta1ArrayDS+"\ntheta2ArrayDS: "+theta2ArrayDS+"\ntheta4ArrayDS: "+theta4ArrayDS);
     //calculate theta0

     intertheta12 = []; 
     intertheta62 = [];
     //console.log(intertheta6);
     //left and right knee
     //alert("DStheta2ArrayV: "+DStheta2ArrayV);
     intertheta22 = theta2ArrayDS;
     //console.log('DStheta2ArrayV-1st'+ DStheta2ArrayV);
     intertheta52 = [];
 
     //left and right hip
     intertheta32 = theta1ArrayDS;
     //alert(latterhip);
     //alert(theta1Array[theta1Array.length-1]+'vs'+DStheta4ArrayV[0]);
     intertheta42 = theta4ArrayDS; 


     DS2theta0Array = [];
     DS2thetaDot0Array = [];
     DS2theta1Array = [];
     DS2thetaDot1Array = [];
   //DSthetaDbDot1Array = [];
     DS2theta2Array = [];
     DS2thetaDot2Array = [];
   //DSthetaDbDot2Array = [];
     DS2theta4Array = [];
     DS2thetaDot4Array = [];


     DS2theta0Array[0] = 0;
     DS2thetaDot0Array[0] = abs(thetaDot4ArrayDS[length3 - 1]);
     DS2theta1Array[0] = theta4ArrayDS[length3 - 1];
     DS2thetaDot1Array[0] = 0;
     //DStheta4Array[0] = theta1Array[T1/deltaT - 1];
     //DSthetaDot4Array[0] = thetaDot1Array[T1/deltaT - 1];
     DS2theta2Array[0] = 0;
     DS2theta4Array[0] = theta4ArrayDS[length3 - 1];
     DS2thetaDot2Array[0] = 0;
     DS2thetaDot4Array[0] = -abs(thetaDot4ArrayDS[length3-1]*cos(theta4ArrayDS[length3 - 1])*cos(theta4ArrayDS[length3 - 1]));
 
     //corrisponding to trigger double stance
     var DStheta = [DS2theta0Array[0], DS2theta1Array[0], DS2theta2Array[0], DS2theta4Array[0]];
     var DSdtheta = [DS2thetaDot0Array[0], DS2thetaDot1Array[0], DS2thetaDot2Array[0], DS2thetaDot4Array[0]];
/*     DStheta = [0,0.087,0,0.087];
    DSdtheta = [1.745,0,0,-1.732]; */
     //alert("line 1133, DStheta: "+DStheta+"\nDSdtheta: "+DSdtheta+"\nT23: "+T13+"\nk_7: "+k_3+"\nk_8: "+k_4);
     DoublestanceAFO(DStheta, DSdtheta, T13, k_3,k_4,1);
     //alert("(line 1135) length: "+DS2theta0Array.length);
     
     //for trim purpose
     DSthetainit = [DS2theta0Array[0], DS2theta1Array[0], DS2theta2Array[0], DS2theta4Array[0]];
     if(DS2theta0Array.length == 1)
    {
      return NaN;
    }
     // length2 = 1;
      DS2theta0ArrayV = DS2theta0Array;
      DS2theta1ArrayV = DS2theta1Array;
      DS2theta2ArrayV = DS2theta2Array;
      DS2theta4ArrayV = DS2theta4Array;
    /*}
    else{
     DS2theta0ArrayM = [];
     DS2theta1ArrayM = [];
     DS2theta2ArrayM = [];
     DS2theta4ArrayM = [];
     DS2theta0ArrayM = DS2theta0Array.slice(1);
     DS2theta1ArrayM = DS2theta1Array.slice(1);
     DS2theta2ArrayM = DS2theta2Array.slice(1);
     DS2theta4ArrayM = DS2theta4Array.slice(1);
     //var p = [];
     arrayX = [];
     for (var i = 0; i < DS2theta0ArrayM.length; i = i + 1){
       arrayX[i] = i * deltaT;
     }
/*      if(DStheta0Array.length < 8)
     interRatio = 20;
     else */
     /*interRatio = 4;
     //interpolation
     try{
      DS2theta0ArrayV = DataProcess(arrayX, DS2theta0ArrayM, interRatio);
      DS2theta1ArrayV = DataProcess(arrayX, DS2theta1ArrayM, interRatio);
      DS2theta2ArrayV = DataProcess(arrayX, DS2theta2ArrayM, interRatio);
      DS2theta4ArrayV = DataProcess(arrayX, DS2theta4ArrayM, interRatio);
      }
      catch(err)
      {
        //console.log("The first DS has no length.");
        VEC = NaN;
        return VEC;
      }
      DS2theta0ArrayV = [DSthetainit[0]].concat(DS2theta0ArrayV);
      DS2theta1ArrayV = [DSthetainit[1]].concat(DS2theta1ArrayV);
      DS2theta2ArrayV = [DSthetainit[2]].concat(DS2theta2ArrayV);
      DS2theta4ArrayV = [DSthetainit[3]].concat(DS2theta4ArrayV);
      for(var i = 0; i < DS2theta0ArrayV.length; i = i + 1){
       if(DS2theta2ArrayV[i] > 45/180*PI)
       {
         ENDT2 = i;
         break;
       }
       ENDT2 = DS2theta0ArrayV.length;
      }
      DS2theta0ArrayV = DS2theta0ArrayV.slice(0,ENDT2);
      DS2theta1ArrayV = DS2theta1ArrayV.slice(0,ENDT2);
      DS2theta2ArrayV = DS2theta2ArrayV.slice(0,ENDT2);
      DS2theta4ArrayV = DS2theta4ArrayV.slice(0,ENDT2);  
      //length2 = DStheta0ArrayM.length * interRatio - (interRatio-1)+1;
    } 
    */
    //alert("DStheta0ArrayV length: "+DStheta0ArrayV.length);
    length4 = DS2theta0ArrayV.length;
     //Length for swing+stance
    
     //ankle for swing+stance
      
     //Length for Doublestance

     //alert(length1 + ',' + length2 + ',' + length3 + ',' + length4);
     //LenT1 = length1;
     T2 = length2*4;
     T3 = length3;
     T4 = length4*4;
     Step = -len3*(1-footFraction)*cos(DS2theta0ArrayV[DS2theta0ArrayV.length-1])+len5*sin(abs(DS2theta0ArrayV[DS2theta0ArrayV.length-1]))
     +len2*sin(abs(DS2theta0ArrayV[DS2theta0ArrayV.length-1]+DS2theta1ArrayV[DS2theta1ArrayV.length-1]))
     +len1*sin(abs(DS2theta0ArrayV[DS2theta0ArrayV.length-1]+DS2theta1ArrayV[DS2theta1ArrayV.length-1]-DS2theta2ArrayV[DS2theta2ArrayV.length-1]))
     +(len1+len2)*sin(abs(DS2theta4ArrayV[DS2theta4ArrayV.length-1]))+len3*(1-footFraction);
     //alert("DS2theta4ArrayV: "+DS2theta4Array);
     VEC = [T2*deltaT, T3*deltaT, T4*deltaT, 
     DS2theta0ArrayV[DS2theta0ArrayV.length-1]/PI*180, (DS2theta0ArrayV[DS2theta0ArrayV.length-1]-DS2theta0ArrayV[DS2theta0ArrayV.length-2])/deltaT/10/PI*180, 
     DS2theta1ArrayV[DS2theta1ArrayV.length-1]/PI*180, (DS2theta1ArrayV[DS2theta1ArrayV.length-1]-DS2theta1ArrayV[DS2theta1ArrayV.length-2])/deltaT/10/PI*180, 
     DS2theta2ArrayV[DS2theta2ArrayV.length-1]/PI*180, (DS2theta2ArrayV[DS2theta2ArrayV.length-1]-DS2theta2ArrayV[DS2theta2ArrayV.length-2])/deltaT/10/PI*180, 
     DS2theta4ArrayV[DS2theta4ArrayV.length-1]/PI*180, (DS2theta4ArrayV[DS2theta4ArrayV.length-1]-DS2theta4ArrayV[DS2theta4ArrayV.length-2])/deltaT/10/PI*180,
     abs(Step)];
     /*      interT = [];
     for (var i = 0; i < 2*(T1/deltaT + DStheta0ArrayM.length * interRatio - (interRatio-1)+1); i = i + 1){
      interT[i] = i * deltaT;
    }     */
     
    //alert("VEC: "+VEC);
  return VEC;
  }