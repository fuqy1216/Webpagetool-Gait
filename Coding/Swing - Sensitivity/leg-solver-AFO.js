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
function solvedoublestanceAFO(){
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
      if(isNaN(DSItheta4)) DSItheta4 = 0;
      a24 = [
        [-len1*sin(DSItheta0+DSItheta1-DSItheta2), (len1+len2+len5-Radius)*sin(DSItheta4)],
        [len1*cos(DSItheta0+DSItheta1-DSItheta2), -(len1+len2+len5-Radius)*cos(DSItheta4)-Radius]
      ];
      b24 = [
          -math.pow((math.pow(len3,2)+math.pow(len5,2)),0.5)*DSIdtheta0*cos(DSItheta0+Toeangle)+len2*(DSIdtheta0+DSIdtheta1)*sin(DSItheta0+DSItheta1)+len1*(DSIdtheta0+DSIdtheta1)*sin(DSItheta0+DSItheta1-DSItheta2),
          math.pow((math.pow(len3,2)+math.pow(len5,2)),0.5)*DSIdtheta0*sin(DSItheta0+Toeangle)+len2*(DSIdtheta0+DSIdtheta1)*cos(DSItheta0+DSItheta1)-len1*(DSIdtheta0+DSIdtheta1)*cos(DSItheta0+DSItheta1-DSItheta2)
    ];
    result24 = math.multiply(math.inv(a24),b24);
    //console.log(b24);
    //console.log(a24);
    DSIdtheta2 = result24[0];
    DSIdtheta4 = result24[1];
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
      console.log("forces calculation error");
      return 0;
      // expected output: ReferenceError: nonExistentFunction is not defined
      // Note - error messages will vary depending on browser
    }
    console.log("forces calculation success!");
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
    console.log("forces calculation error");
    return 0;
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
  }
  console.log("forces calculation success!");
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

  function calculateSwingHeel(index) {
    
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
    forces = solvelegAFO(DStheta, DSdtheta, Tankle, Thip, Tknee);
    if (forces == 0)      return;
    index = 0;
    var temphip = PI/2;
    for (var i = 0; i < (time_-T1); i = i + deltaT) {
      DStheta0 = DStheta[0];
      DStheta1 = DStheta[1];
      DStheta2 = DStheta[2];
      DStheta4 = DStheta[3];
      DSdtheta0 = DSdtheta[0];
      DSdtheta1 = DSdtheta[1];
      DSdtheta2 = DSdtheta[2];
      DSdtheta4 = DSdtheta[3];
      if((mu_>0)||(mu_<0)){
    DSthetaDbDot0 = (-forces[0]*len3*cos(DStheta1)-mu_*180/PI*DStheta1+forces[1]*len3*sin(DStheta1)-m3*g*0.5*len3*cos(DStheta0))/I3;
    lowerlegrot = (mu_*180/PI*DStheta1-k2*DStheta2 - forces[3]*len2*cos(DStheta2) + forces[2]*len2*sin(DStheta2)+m2*g*0.5*len2*sin(DStheta0+DStheta1))/I2;
       }
       else
       {
        DSthetaDbDot0 = (-forces[0]*len3*cos(DStheta1)+Tankle+forces[1]*len3*sin(DStheta1)-m3*g*0.5*len3*cos(DStheta0))/I3;
        lowerlegrot = (-Tankle-k2*DStheta2 - forces[3]*len2*cos(DStheta2) + forces[2]*len2*sin(DStheta2)+m2*g*0.5*len2*sin(DStheta0+DStheta1))/I2;    
       }
    DSthetaDbDot1 = (-DSthetaDbDot0+lowerlegrot);
    DStheta0 = DStheta0 + DSdtheta0 * deltaT;
    DStheta1 = DStheta1 + DSdtheta1 * deltaT;
    DSdtheta0 = DSdtheta0 + DSthetaDbDot0 * deltaT;
    DSdtheta1 = DSdtheta1 + DSthetaDbDot1 * deltaT;
    //initialize for solve double stance
    DSItheta0 = DStheta0;
    DSItheta1 = DStheta1;
    DSItheta2 = DStheta2;
    DSIdtheta0 = DSdtheta0;
    DSIdtheta1 = DSdtheta1;
    solvedoublestanceAFO();
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
    console.log(forces[7]);
    if (forces == 0)      
    {
      console.log('Doublestance: forces all zero');
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
        console.log('Doublestance: solve success - Force');
        return;
      }
      if(DStheta[0] > PI/2)
      {
        console.log('Doublestance: solve success - Foot Angle');
        return;        
      }
      if(DStheta[0]+DStheta[1]-DStheta[2] >temphip)
      {
        console.log('Doublestance: solve success - Hip Angle');
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
    }

}
  function Doublestance(DStheta, DSdtheta, Tankle, Thip, Tknee, T1){
      forces = solveleg(DStheta, DSdtheta, Tankle, Thip, Tknee);
      if (forces == 0)      return;
      index = 0;
      var temphip = PI/2;
      for (var i = 0; i < (time_-T1); i = i + deltaT) {
        DStheta0 = DStheta[0];
        DStheta1 = DStheta[1];
        DStheta2 = DStheta[2];
        DStheta4 = DStheta[3];
        DSdtheta0 = DSdtheta[0];
        DSdtheta1 = DSdtheta[1];
        DSdtheta2 = DSdtheta[2];
        DSdtheta4 = DSdtheta[3];
      DSthetaDbDot0 = (-forces[0]*len3*cos(DStheta1)+Tankle+forces[1]*len3*sin(DStheta1)-m3*g*0.5*len3*cos(DStheta0))/I3;
      lowerlegrot = (-Tankle-k2*DStheta2 - forces[3]*len2*cos(DStheta2) + forces[2]*len2*sin(DStheta2)+m2*g*0.5*len2*sin(DStheta0+DStheta1))/I2;
      DSthetaDbDot1 = (-DSthetaDbDot0+lowerlegrot);
      DStheta0 = DStheta0 + DSdtheta0 * deltaT;
      DStheta1 = DStheta1 + DSdtheta1 * deltaT;
      DSdtheta0 = DSdtheta0 + DSthetaDbDot0 * deltaT;
      DSdtheta1 = DSdtheta1 + DSthetaDbDot1 * deltaT;
      //initialize for solve double stance
      DSItheta0 = DStheta0;
      DSItheta1 = DStheta1;
      DSItheta2 = DStheta2;
      DSIdtheta0 = DSdtheta0;
      DSIdtheta1 = DSdtheta1;
      solvedoublestanceAFO();
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
      forces = solveleg(DStheta, DSdtheta, Tankle, Thip, Tknee);
      //console.log(forces);
      console.log(forces[7]);
      if (forces == 0)      
      {
        console.log('Doublestance: forces all zero');
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
        console.log('Doublestance: solve success - Force');
        return;
      }
      if(DStheta[0] > PI/2)
      {
        console.log('Doublestance: solve success - Foot Angle');
        return;        
      }
      if(DStheta[0]+DStheta[1]-DStheta[2] >temphip)
      {
        console.log('Doublestance: solve success - Hip Angle');
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

  function calculateSW(){
   
    var t = 2;
     timeArray = [];
    theta1Array = [];
    theta2Array = [];
     theta3Array = [];
    theta4Array = [];
     thetaDot1Array = [];
    thetaDot2Array = [];
     thetaDot3Array = [];
     thetaDot4Array = [];
     thetaDbDot1Array = [];
    thetaDbDot2Array = [];
     thetaDbDot3Array = [];
     thetaDbDot4Array =[];
      //double pendulum Right First
      var theta1 = theta0_1*PI/180.0;
      var theta2 = theta0_2*PI/180.0;
      var theta3 = theta2 + PI/2;
      theta5 = theta0_5*PI/180;
      var thetaDot1 = thetaDot0_1*PI/180.0;
      var thetaDot2 = thetaDot0_2*PI/180.0;
      var thetaDot3 = 0;
      var thetaDoubleDot1;
      var thetaDoubleDot2;
      var thetaDoubleDot3;
      var index = 0;
      for (var i = 0; i < t; i = i + deltaT) {
        var TMtheta2 = theta1+theta2;
        var TMthetaDot2 = thetaDot1+thetaDot2;
        thetaDoubleDot1 = doublePend_getThetaDoubleDot_1(theta1, TMtheta2, thetaDot1, TMthetaDot2, k_1, k_2);
        TMthetaDoubleDot2 = doublePend_getThetaDoubleDot_2(theta1, TMtheta2, thetaDot1, TMthetaDot2, thetaDoubleDot1, k_2);
        theta1 = theta1 + thetaDot1 * deltaT;
        theta2 = theta2 + thetaDot2 * deltaT;
        // theta3 = theta3 + thetaDot3 * deltaT;
        theta3 = theta2 + PI/2; // Hard-coded
        thetaDoubleDot2 = - thetaDoubleDot1+TMthetaDoubleDot2;
        thetaDot1 = thetaDot1 + thetaDoubleDot1 * deltaT;
        thetaDot2 = thetaDot2 + thetaDoubleDot2 * deltaT;
        thetaDot3 = thetaDot3 + thetaDoubleDot3 * deltaT;
        timeArray[index] = i;
        theta1Array[index] = theta1;
        theta2Array[index] = theta2;
        thetaDot2Array[index] = thetaDot2;
        thetaDbDot2Array[index] = thetaDoubleDot2;
        theta3Array[index] = theta3;
        thetaDot1Array[index] = thetaDot1;
        thetaDot3Array[index] = thetaDot3;
        thetaDbDot1Array[index] = thetaDoubleDot1;
        thetaDbDot3Array[index] = thetaDoubleDot3;
  
        index = index + 1;
      }
      //inverted pendulum
      var theta4 =  PI - theta0_4*PI/180.0;
      var theta4Dot = thetaDot0_4*PI/180.0;
      var theta4DoubleDot;
      var index = 0;
      for (var i = 0; i < t; i = i + deltaT) {
        theta4DoubleDot = singlePend_getThetaDoubleDot(theta4, theta4Dot);
        theta4 = theta4 + theta4Dot * deltaT;
        theta4Dot = theta4Dot + theta4DoubleDot * deltaT;
        //timeArray[index] = i;
        theta4Array[index] = theta4;
        thetaDot4Array[index] = theta4Dot;
        thetaDbDot4Array[index] = theta4DoubleDot;
        index = index + 1;
      }
      var T1 = calculateSwingHeel(t/deltaT);
      /* alert(theta4Array);
      alert(theta4Array[T1/deltaT]);
      alert((PI-theta4Array[T1/deltaT])/PI*180); */
      var VEC = [T1, round((PI-theta4Array[T1/deltaT])/PI*180*100)/100, round(thetaDot4Array[T1/deltaT]/PI*180*100)/100, 
      round(theta1Array[T1/deltaT]/PI*180*100)/100, round(thetaDot1Array[T1/deltaT]/PI*180*100)/100, 
      round(theta2Array[T1/deltaT]/PI*180*100)/100, round(thetaDot2Array[T1/deltaT]/PI*180*100)/100];
      return VEC;
  }
