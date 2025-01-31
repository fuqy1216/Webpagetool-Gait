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

  
function calculateThetaAFO(t, Final) {
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
    ENDT2 = 0;
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
      //double pendulum Right First
      var theta1 = theta0_1*PI/180.0;
      var theta2 = theta0_2*PI/180.0;
      var theta3 = theta2 + PI/2;
      var theta5 = theta0_5*PI/180;
      var thetaDot1 = thetaDot0_1*PI/180.0;
      var thetaDot2 = thetaDot0_2*PI/180.0;
      var thetaDot3 = 0;
      var thetaDoubleDot1;
      var thetaDoubleDot2;
      var thetaDoubleDot3;
      var index = 0;
      for (var i = 0; i < t; i = i + deltaT) {
        TMtheta2 = theta1+theta2;
        TMthetaDot2 = thetaDot1+thetaDot2;
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
      T1 = calculateSwingHeel(t/deltaT);
      console.log(T1);
      T1stswing = T1;
    //double stance phase, need to define T
    timeArray = timeArray.slice(0,T1/deltaT);
    theta1Array = theta1Array.slice(0,T1/deltaT);
    theta2Array = theta2Array.slice(0,T1/deltaT);
    theta3Array = theta3Array.slice(0,T1/deltaT);
    theta4Array = theta4Array.slice(0,T1/deltaT);
    thetaDot1Array = thetaDot1Array.slice(0,T1/deltaT);
    thetaDot2Array = thetaDot2Array.slice(0,T1/deltaT);
    thetaDot3Array = thetaDot3Array.slice(0,T1/deltaT);
    thetaDot4Array = thetaDot4Array.slice(0,T1/deltaT);
    thetaDbDot1Array = thetaDbDot1Array.slice(0,T1/deltaT);
    thetaDbDot2Array = thetaDbDot2Array.slice(0,T1/deltaT);
    thetaDbDot3Array = thetaDbDot3Array.slice(0,T1/deltaT);
    thetaDbDot4Array = thetaDbDot4Array.slice(0,T1/deltaT);
    //calculate theta0
    DStheta0Array[0] = 0;
    DSthetaDot0Array[0] = PI - thetaDot4Array[T1/deltaT - 1];
    DStheta1Array[0] = PI - theta4Array[T1/deltaT - 1];
    DSthetaDot1Array[0] = 0;
    //DStheta4Array[0] = theta1Array[T1/deltaT - 1];
    //DSthetaDot4Array[0] = thetaDot1Array[T1/deltaT - 1];
    DStheta2Array[0] = 0;
    DSItheta0 = DStheta0Array[0];
    DSItheta1 = DStheta1Array[0];
    DSItheta2 = DStheta2Array[0];
    DSIdtheta0 = DSthetaDot0Array[0];
    DSIdtheta1 = DSthetaDot1Array[0];
    
    solvedoublestanceAFO();
    //DStheta2Array[0] = initial.theta2;
    DStheta4Array[0] = DSItheta4;
    DSthetaDot2Array[0] = DSIdtheta2;
    DSthetaDot4Array[0] = DSIdtheta4;

    //corrisponding to trigger double stance
    DStheta = [DStheta0Array[0], DStheta1Array[0], DStheta2Array[0], DStheta4Array[0]];
    DSdtheta = [DSthetaDot0Array[0], DSthetaDot1Array[0], DSthetaDot2Array[0], DSthetaDot4Array[0]];
    Doublestance(DStheta, DSdtheta, T23, k_7, k_8);

    DStheta0Array;
    //for trim purpose
    DSthetainit = [DStheta0Array[0], DStheta1Array[0], DStheta2Array[0], DStheta4Array[0]];
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
    interRatio = 4;
    //interpolation
    DStheta0ArrayV = DataProcess(arrayX, DStheta0ArrayM, interRatio);
    DStheta1ArrayV = DataProcess(arrayX, DStheta1ArrayM, interRatio);
    DStheta2ArrayV = DataProcess(arrayX, DStheta2ArrayM, interRatio);
    DStheta4ArrayV = DataProcess(arrayX, DStheta4ArrayM, interRatio);
    DStheta0ArrayV = [DSthetainit[0]].concat(DStheta0ArrayV);
    DStheta1ArrayV = [DSthetainit[1]].concat(DStheta1ArrayV);
    DStheta2ArrayV = [DSthetainit[2]].concat(DStheta2ArrayV);
    DStheta4ArrayV = [DSthetainit[3]].concat(DStheta4ArrayV);
    for(var i = 0; i < DStheta0ArrayV.length; i = i + 1){
     if(DStheta2ArrayV[i] > theta0_2/180*PI)
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
    console.log('Finish interpolation');
    //Length for swing+stance
    length1 = T1/deltaT;
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
    length2 = DStheta0ArrayM.length * interRatio - (interRatio-1)+1;
    interT = [];
    for (var i = 0; i < 2*(T1/deltaT + DStheta0ArrayM.length * interRatio - (interRatio-1)+1); i = i + 1){
      interT[i] = i * deltaT;
    }    
    //Correct Hip angle
    for (var i = 0; i < length1; i = i + 1){
      theta4Array[i] = theta4Array[i] - PI;
     }
     for (var i = 0; i < length1; i = i + 1){
      theta1Array[i] = -theta1Array[i];
     }
     //Correct DSKnee angle
     for (var i = 0; i < length2; i = i + 1){
      if (DStheta2ArrayV[i] < 0)
      DStheta2ArrayV[i] = 0;
     }
    //Ankle during stnace
    anklestance = [];
    for (var i = 0; i < length1; i = i + 1){
     anklestance[i] = -theta4Array[i];
    }
    //later hip during DS
    latterhip = [];
    for (var i = 0; i < length2; i = i + 1){
      latterhip[i] = -(DStheta0ArrayV[i] + DStheta1ArrayV[i] - DStheta2ArrayV[i]);
     }   
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
        Kneezero2[i] = 5*theta5/(length2)*(i-length2/5*4);
        }
        for (var i = 0; i < length1; i = i + 1){
          Kneezero1[i] = (theta5 - 4*theta5/length1*i); 
          if(Kneezero1[i]< 0)
          Kneezero1[i] = 0;
          anklestance[i] = anklestance[i]+Kneezero1[i];
          }
          //shrink knee and hip angle during double stance

     if(0){
       Ratioknee = theta2Array[0]/DStheta2ArrayV[DStheta2ArrayV.length-1];
       Ratiohip = theta1Array[0]/latterhip[latterhip.length-1];
       //Ratiohip1 = theta4Array[0]/DStheta4ArrayV[DStheta4ArrayV.length-1];
       Ratioankle = ankleswing[0]/DStheta1ArrayV[DStheta1ArrayV.length-1];
           for (var i = 0; i < length2; i = i + 1){
             DStheta2ArrayV[i] = DStheta2ArrayV[i] * (1 + (i+1)*(Ratioknee - 1)/length2);
             latterhip[i] = latterhip[i] * (1 + (i+1)*(Ratiohip - 1)/length2);
            // DStheta4ArrayV[i] = DStheta4ArrayV[i] * (1 + (i+1)*(Ratiohip1 - 1)/length2);
             DStheta1ArrayV[i] = DStheta1ArrayV[i] * (1 + (i+1)*(Ratioankle - 1)/length2);
            }
           }
          // alert(latterhip);
           if(1){
            for (var i = 0; i < length2; i = i + 1){
              latterhip[i] = -latterhip[i]/5;
              DStheta4ArrayV[i] = -DStheta4ArrayV[i]/5;
              }
             // alert(latterhip);
             elevatehip = theta4Array[theta4Array.length-1] - latterhip[0];
             //alert('elevatehip: '+elevatehip);
             //alert('theta4end: '+theta4Array[theta4Array.length-1]);
             diffknee = theta2Array[0]-DStheta2ArrayV[DStheta2ArrayV.length-1];
             diffhip = theta1Array[0]-latterhip[latterhip.length-1]-elevatehip;
            // alert('diffhip: '+diffhip);
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
                  elevatehip = theta1Array[theta1Array.length-1] - DStheta4ArrayV[0];
                  //diffknee = Kneezero1[0]-Kneezero2[Kneezero2.length-1];
                  diffhip = theta4Array[0]-DStheta4ArrayV[DStheta4ArrayV.length-1]-elevatehip;
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
//left and right ankle dorsi +/plantar -
intertheta1 =  anklestance.concat(DStheta1ArrayV);
intertheta6 = ankleswing.concat(Anklezero2);
//console.log(intertheta6);
//left and right knee

intertheta2 = Kneezero1.concat(DStheta2ArrayV);
//console.log('DStheta2ArrayV-1st'+ DStheta2ArrayV);
intertheta5 = theta2Array.concat(Kneezero2);
//correct knee angle
for  (var i = 0; i < intertheta2.length; i = i + 1){
  if (intertheta2[i] < 0)  intertheta2[i] = 0;
  if (intertheta5[i] < 0)  intertheta5[i] = 0;
 }   
//left and right hip
intertheta3 = theta4Array.concat(latterhip);
//alert(latterhip);
//alert(theta1Array[theta1Array.length-1]+'vs'+DStheta4ArrayV[0]);
intertheta4 = theta1Array.concat(DStheta4ArrayV);

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

       //double pendulum Left Second
       var Tolerance = 1.1;
       var theta1SEC = -intertheta3[intertheta3.length-1];
       var theta2SEC = intertheta2[intertheta2.length-1];
       var theta3SEC = theta2SEC + PI/2;
       var theta5SEC= intertheta5[intertheta5.length-1];
       var thetaDot1SEC = (latterhip[latterhip.length-1] - latterhip[latterhip.length-2])/deltaT;
       var thetaDot2SEC = DSthetaDot2Array[DSthetaDot2Array.length-1]; //same as the other leg
       var thetaDot3SEC = 0;
       var thetaDoubleDot1SEC;
       var thetaDoubleDot2SEC;
       var thetaDoubleDot3SEC;
       var indexSEC = 0;
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
         timeArray[indexSEC] = i;
         theta1Array[indexSEC] = theta1SEC;
         theta2Array[indexSEC] = theta2SEC;
            thetaDot2Array[indexSEC] = thetaDot2SEC;
            thetaDbDot2Array[indexSEC] = thetaDoubleDot2SEC;
          theta3Array[indexSEC] = theta3SEC;
          thetaDot1Array[indexSEC] = thetaDot1SEC;
          thetaDot3Array[indexSEC] = thetaDot3SEC;
          thetaDbDot1Array[indexSEC] = thetaDoubleDot1SEC;
          thetaDbDot3Array[indexSEC] = thetaDoubleDot3SEC;
    
          indexSEC = indexSEC + 1;
        }
       //inverted pendulum
       var theta4SEC =   intertheta4[intertheta4.length-1];
       var theta4DotSEC = DSthetaDot4Array[DSthetaDot4Array.length-1];
       var theta4DoubleDotSEC;
       var indexSEC = 0;
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
        //if( abs(180 - theta4SEC/PI*180) > 0)
        //{
        //  theta4SEC = PI + (PI - theta4SEC);
        //}
       // console.log('theta4SEC' + theta4SEC);
       for (var i = 0; i < t; i = i + deltaT) {
         theta4DoubleDotSEC = singlePendAFO_getThetaDoubleDot(theta4SEC, theta4DotSEC);
         theta4SEC = theta4SEC + theta4DotSEC * deltaT;
         theta4DotSEC = theta4DotSEC + theta4DoubleDotSEC * deltaT;
         //timeArray[index] = i;
         theta4Array[indexSEC] = theta4SEC;
         thetaDot4Array[indexSEC] = theta4DotSEC;
         thetaDbDot4Array[indexSEC] = theta4DoubleDotSEC;
         indexSEC = indexSEC + 1;
       }
       T1 = calculateSwingHeel(t/deltaT);
       console.log(T1);
       if(T1 < 50)
       {
         T1 = (T1stswing+T1)/2;
       }
       length3 = math.floor(T1/deltaT);
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
     timeArray = timeArray.slice(0,length3);
     theta1Array = theta1Array.slice(0,length3);
     theta2Array = theta2Array.slice(0,length3);
     theta3Array = theta3Array.slice(0,length3);
     theta4Array = theta4Array.slice(0,length3);
     thetaDot1Array = thetaDot1Array.slice(0,length3);
     thetaDot2Array = thetaDot2Array.slice(0,length3);
     thetaDot3Array = thetaDot3Array.slice(0,length3);
     thetaDot4Array = thetaDot4Array.slice(0,length3);
     thetaDbDot1Array = thetaDbDot1Array.slice(0,length3);
     thetaDbDot2Array = thetaDbDot2Array.slice(0,length3);
     thetaDbDot3Array = thetaDbDot3Array.slice(0,length3);
     thetaDbDot4Array = thetaDbDot4Array.slice(0,length3);
     //calculate theta0
     DStheta0Array[0] = 0;
     DSthetaDot0Array[0] = thetaDot4Array[length3 - 1];
     DStheta1Array[0] = theta4Array[length3 - 1];
     DSthetaDot1Array[0] = 0;
     //DStheta4Array[0] = theta1Array[T1/deltaT - 1];
     //DSthetaDot4Array[0] = thetaDot1Array[T1/deltaT - 1];
     DStheta2Array[0] = 0;
     DSItheta0 = DStheta0Array[0];
     DSItheta1 = DStheta1Array[0];
     DSItheta2 = DStheta2Array[0];
     DSIdtheta0 = DSthetaDot0Array[0];
     DSIdtheta1 = DSthetaDot1Array[0];
     
     solvedoublestanceAFO();
     //DStheta2Array[0] = initial.theta2;
     DStheta4Array[0] = DSItheta4;
     DSthetaDot2Array[0] = DSIdtheta2;
     DSthetaDot4Array[0] = DSIdtheta4;
 
     //corrisponding to trigger double stance
     DStheta = [DStheta0Array[0], DStheta1Array[0], DStheta2Array[0], DStheta4Array[0]];
     DSdtheta = [DSthetaDot0Array[0], DSthetaDot1Array[0], DSthetaDot2Array[0], DSthetaDot4Array[0]];
     DoublestanceAFO(DStheta, DSdtheta, T13, k_3,k_4);
     DStheta0Array;
     //for trim purpose
     DSthetainit = [DStheta0Array[0], DStheta1Array[0], DStheta2Array[0], DStheta4Array[0]];
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
/*      if(DStheta0Array.length < 8)
     interRatio = 20;
     else */
     interRatio = 4;
     //interpolation
     if(DStheta0Array.length == 1){
      DStheta0ArrayV = DStheta0Array;
      DStheta1ArrayV = DStheta1Array;
      DStheta2ArrayV = DStheta2Array;
      DStheta4ArrayV = DStheta4Array;
      length4 = DStheta0Array.length * interRatio - (interRatio-1);
     }
     else{
      DStheta0ArrayV = DataProcess(arrayX, DStheta0ArrayM, interRatio);
      DStheta1ArrayV = DataProcess(arrayX, DStheta1ArrayM, interRatio);
      DStheta2ArrayV = DataProcess(arrayX, DStheta2ArrayM, interRatio);
      DStheta4ArrayV = DataProcess(arrayX, DStheta4ArrayM, interRatio);
      DStheta0ArrayV = [DSthetainit[0]].concat(DStheta0ArrayV);
      DStheta1ArrayV = [DSthetainit[1]].concat(DStheta1ArrayV);
      DStheta2ArrayV = [DSthetainit[2]].concat(DStheta2ArrayV);
      DStheta4ArrayV = [DSthetainit[3]].concat(DStheta4ArrayV);
      length4 = DStheta0ArrayM.length * interRatio - (interRatio-1)+1;
     }
     //Length for swing+stance
    
     //ankle for swing+stance
      
     //Length for Doublestance

     console.log(length1 + ',' + length2 + ',' + length3 + ',' + length4);
     T1 = length1;
     T2 = length2;
     T3 = length3;
     T4 = length4;
     /*      interT = [];
     for (var i = 0; i < 2*(T1/deltaT + DStheta0ArrayM.length * interRatio - (interRatio-1)+1); i = i + 1){
      interT[i] = i * deltaT;
    }     */
     //Correct Hip angle
     for (var i = 0; i < length3; i = i + 1){
       theta4Array[i] = theta4Array[i];
      }
      for (var i = 0; i < length3; i = i + 1){
       theta1Array[i] = -theta1Array[i];
      }
      //Correct DSKnee angle
      for (var i = 0; i < length4; i = i + 1){
       if (DStheta2ArrayV[i] < 0)
       DStheta2ArrayV[i] = 0;
      }
     //Ankle during stnace
     anklestance = [];
     for (var i = 0; i < length3; i = i + 1){
      anklestance[i] = -theta4Array[i];
     }
     //later hip during DS
     latterhip = [];
     for (var i = 0; i < length4; i = i + 1){
       latterhip[i] = (DStheta0ArrayV[i] + DStheta1ArrayV[i] - DStheta2ArrayV[i]);
      }   
     //console.log('Begain to Concat');
    //shrink knee and hip angle during double stance
        Kneezero1 = [];
        Kneezero2 = [];
        Anklezero2 = [];
    //knee bending at LTO and LHS
    for (var i = 0; i < length4; i = i + 1){
      if(i < length4/5*4){
        Kneezero2[i] = 0;
      continue;}
    Kneezero2[i] = 5*theta5SEC/(length4)*(i-length4/5*4);
    }
    for (var i = 0; i < length3; i = i + 1){
      Kneezero1[i] = (theta5SEC - 4*theta5SEC/length3*i); 
      if(Kneezero1[i]< 0)
      Kneezero1[i] = 0;
      anklestance[i] = anklestance[i]+Kneezero1[i];
      }
   if(0){
     Ratioknee = theta2Array[0]/DStheta2ArrayV[DStheta2ArrayV.length-1];
     Ratiohip = theta1Array[0]/latterhip[latterhip.length-1];
     //Ratiohip1 = theta4Array[0]/DStheta4ArrayV[DStheta4ArrayV.length-1];
     Ratioankle = ankleswing[0]/DStheta1ArrayV[DStheta1ArrayV.length-1];
         for (var i = 0; i < length2; i = i + 1){
           DStheta2ArrayV[i] = DStheta2ArrayV[i] * (1 + (i+1)*(Ratioknee - 1)/length2);
           latterhip[i] = latterhip[i] * (1 + (i+1)*(Ratiohip - 1)/length2);
          // DStheta4ArrayV[i] = DStheta4ArrayV[i] * (1 + (i+1)*(Ratiohip1 - 1)/length2);
           DStheta1ArrayV[i] = DStheta1ArrayV[i] * (1 + (i+1)*(Ratioankle - 1)/length2);
          }
         }
         
                   //hip1 start with stance
                   Realdiffhip1 = theta1Array[0] - latterhip[latterhip.length-1];
                   //hip2 start with swing
                   Realdiffhip2 = abs(theta4Array[0]) - abs(DStheta4ArrayV[DStheta4ArrayV.length-1]);
                   Realdiffknee = theta2Array[0] - DStheta2ArrayV[DStheta2ArrayV.length-1];
          if(1){
          for (var i = 0; i < length4; i = i + 1){
            latterhip[i] = latterhip[i]/5;
            DStheta4ArrayV[i] = DStheta4ArrayV[i]/5;
            }
           elevatehip = theta4Array[theta4Array.length-1] - latterhip[0];
           diffknee = theta2Array[0]-DStheta2ArrayV[DStheta2ArrayV.length-1];
           diffhip = theta1Array[0]-latterhip[latterhip.length-1]-elevatehip;
           //Ratiohip1 = theta4Array[0]/DStheta4ArrayV[DStheta4ArrayV.length-1];
           diffankle = ankleswing[0]-DStheta1ArrayV[DStheta1ArrayV.length-1];

               for (var i = 0; i < length4; i = i + 1){
                                   //adjust based on polynomial with order of 2
                  /*
                 DStheta2ArrayV[i] = DStheta2ArrayV[i] + diffknee * ((pow(i,2)+2*i+1)/pow(length4,2));
                 latterhip[i] = latterhip[i] + elevatehip + diffhip * ((pow(i,2)+2*i+1)/pow(length4,2));
                // DStheta4ArrayV[i] = DStheta4ArrayV[i] * (1 + (i+1)*(Ratiohip1 - 1)/length2);
                 DStheta1ArrayV[i] = DStheta1ArrayV[i] + diffankle * ((pow(i,2)+2*i+1)/pow(length4,2));
                                   */
                 //adjust based on linear correction
                 DStheta2ArrayV[i] = DStheta2ArrayV[i] + diffknee * ((i+1)/length4);
                 latterhip[i] = latterhip[i] + elevatehip + diffhip * ((i+1)/length4);
                // DStheta4ArrayV[i] = DStheta4ArrayV[i] * (1 + (i+1)*(Ratiohip1 - 1)/length2);
                 DStheta1ArrayV[i] = DStheta1ArrayV[i] + diffankle * ((i+1)/length4);
                }
                elevatehip = theta1Array[theta1Array.length-1] - DStheta4ArrayV[0];
                //diffknee = Kneezero1[0]-Kneezero2[Kneezero2.length-1];
                diffhip = theta4Array[0]-DStheta4ArrayV[DStheta4ArrayV.length-1]-elevatehip;
                //Ratiohip1 = theta4Array[0]/DStheta4ArrayV[DStheta4ArrayV.length-1];
                diffankle = anklestance[0]-Kneezero2[Kneezero2.length-1];
                for (var i = 0; i < length4; i = i + 1){
                                     //adjust based on polynomial with order of 2
                  /*
                   //Kneezero2[i] = Kneezero2[i] + diffknee * ((pow(i,2)+2*i+1)/pow(length2,2));
                 //Kneezero2[i] = Kneezero2[i] + diffknee * ((pow(i,2)+2*i+1)/pow(length2,2));
                 DStheta4ArrayV[i] = DStheta4ArrayV[i] + elevatehip + diffhip * ((pow(i,2)+2*i+1)/pow(length4,2));
                // DStheta4ArrayV[i] = DStheta4ArrayV[i] * (1 + (i+1)*(Ratiohip1 - 1)/length2);
                Anklezero2[i] = Kneezero2[i] + diffankle * ((pow(i,2)+2*i+1)/pow(length4,2));
                  */
                   //adjust based on polynomial with linear
                  //Kneezero2[i] = Kneezero2[i] + diffknee * ((pow(i,2)+2*i+1)/pow(length2,2));
                  DStheta4ArrayV[i] = DStheta4ArrayV[i] + elevatehip + diffhip * ((i+1)/length4);
                 // DStheta4ArrayV[i] = DStheta4ArrayV[i] * (1 + (i+1)*(Ratiohip1 - 1)/length2);
                 Anklezero2[i] = Kneezero2[i] + diffankle *  ((i+1)/length4);
                }
               }



    //alert("Length for 6: "+intertheta6.length+"\n Length for 1" + intertheta1.length);
//left and right ankle dorsi +/plantar -
    intertheta1 =  intertheta1.concat(ankleswing, Anklezero2);
    intertheta6 = intertheta6.concat(anklestance, DStheta1ArrayV);
    //console.log(intertheta6);
    //left and right knee
    //alert("Length for 6: "+intertheta6.length+"\n Last element" + intertheta6[intertheta6.length-1]);
    intertheta2 = intertheta2.concat(theta2Array, Kneezero2);
    
    intertheta5 = intertheta5.concat(Kneezero1, DStheta2ArrayV);
    //correct knee angle
    for  (var i = 0; i < intertheta2.length; i = i + 1){
      if (intertheta2[i] < 0)  intertheta2[i] = 0;
      if (intertheta5[i] < 0)  intertheta5[i] = 0;
     }   
    //left and right hip
    intertheta3 = intertheta3.concat(theta1Array, DStheta4ArrayV);
    intertheta4 = intertheta4.concat(theta4Array, latterhip);
    /*for (var i = 0; i < intertheta2.length; i = i + 1){
      if (intertheta2[i] < 0)
      intertheta2[i] = 0;
      }
    for (var i = 0; i < intertheta4.length; i = i + 1){
      if (intertheta4[i] < 0)
      intertheta4[i] = 0;
      }*/
    /*interRatio = 0.1;
    console.log('Raw');
    intertheta1V = DataProcess(interT, intertheta1, interRatio);
    intertheta2V = DataProcess(interT, intertheta2, interRatio);
    intertheta3V = DataProcess(interT, intertheta3, interRatio);
    intertheta4V = DataProcess(interT, intertheta4, interRatio);
    intertheta5V = DataProcess(interT, intertheta5, interRatio);
    intertheta6V = DataProcess(interT, intertheta6, interRatio);
    interRatio = 10;
    NewT = NewarrayX;
    console.log('Clear');
    Finaltheta1 = DataProcess(NewT, intertheta1V, interRatio);
    Finaltheta2 = DataProcess(NewT, intertheta2V, interRatio);
    Finaltheta3 = DataProcess(NewT, intertheta3V, interRatio);
    Finaltheta4 = DataProcess(NewT, intertheta4V, interRatio);
    Finaltheta5 = DataProcess(NewT, intertheta5V, interRatio);
    Finaltheta6 = DataProcess(NewT, intertheta6V, interRatio);
    FinalT = NewT;
    Drawplot(FinalT, Finaltheta1, 'scatter');*/
    for (var i = 0; i < intertheta1.length; i = i + 1){
      intertheta1[i] = intertheta1[i] / PI*180;
      intertheta2[i] = intertheta2[i] / PI*180;
      intertheta3[i] = intertheta3[i] / PI*180;
      intertheta4[i] = intertheta4[i] / PI*180;
      intertheta5[i] = intertheta5[i] / PI*180;
      intertheta6[i] = intertheta6[i] / PI*180;
     }
     //alert("Length for 6: "+intertheta6.length+"\n Last element" + intertheta6[intertheta6.length-1]);
     intertheta13 = intertheta1;
     intertheta23 = intertheta2;
     intertheta33 = intertheta3;
     intertheta43 = intertheta4;
     intertheta53 = intertheta5;
     intertheta63 = intertheta6;
     var interTsec = [];
     var interThir = [];
     interT = [];
     for (var i = 0; i < intertheta13.length; i = i + 1){
       interT[i] = i * deltaT;
     }    
     //console.log('424');
    for(var i = 0; i < interT.length; i = i + 1){
     interTsec[i] = interT[i]+interT[interT.length-1]+deltaT;
     interThir[i] = interT[i] + 2*(interT[interT.length-1]+deltaT);
    }
    //console.log('429');
     interT3 = interT;
     interTV = [];
     intertheta1V = [];
     intertheta2V = [];
     intertheta3V = [];
     intertheta4V = [];
     intertheta5V = [];
     intertheta6V = [];
     interratio = 5;
     for (var i = 0; i < intertheta13.length; i = i + interratio){
      interTV[i/interratio] = interT3[i];
      intertheta1V[i/interratio] = intertheta13[i];
      intertheta2V[i/interratio] = intertheta23[i];
      intertheta3V[i/interratio] = intertheta33[i];
      intertheta4V[i/interratio] = intertheta43[i];
      intertheta5V[i/interratio] = intertheta53[i];
      intertheta6V[i/interratio] = intertheta63[i];
     }
     //console.log('448');
    var NewTA = [];
    var NewT = [];
    interRatio = 5;
    if(0){
    intertheta1V = DataProcess(interTV, intertheta1V, interRatio);
    intertheta2V = DataProcess(interTV, intertheta2V, interRatio);
    intertheta3V = DataProcess(interTV, intertheta3V, interRatio);
    intertheta4V = DataProcess(interTV, intertheta4V, interRatio);
    intertheta5V = DataProcess(interTV, intertheta5V, interRatio);
    intertheta6V = DataProcess(interTV, intertheta6V, interRatio);
    NewTA = NewarrayX;
    }
    else{
    NewTA = interTV;
    }
    for (var i = 0; i < NewTA.length; i = i + 1){
    NewTA[i] = NewTA[i]*2;
    }
    /*for (var i = 0; i < NewarrayX.length; i = i + 1){
    NewT[i] = NewarrayX[i] - interT[interT.length -1];
    }*/
    //slice data for plotting
    if(Final){
     TotalT = NewTA.length;
    NewTA.splice(NewTA.length-T4/(T1+T2+T3+T4)*TotalT,T4/(T1+T2+T3+T4)*TotalT);
    NewTA.splice(NewTA.length-(T3+T2)/(T1+T2+T3+T4)*TotalT,T2/(T1+T2+T3+T4)*TotalT+1);
    //alert(NewTA);
    intertheta1V.splice(intertheta1V.length-T4/(T1+T2+T3+T4)*TotalT,T4/(T1+T2+T3+T4)*TotalT+1);
    intertheta1V = intertheta1V.concat(intertheta1V[0]);
    intertheta1V.splice(intertheta1V.length-(T3+T2)/(T1+T2+T3+T4)*TotalT,T2/(T1+T2+T3+T4)*TotalT+1);
    intertheta2V.splice(intertheta2V.length-T4/(T1+T2+T3+T4)*TotalT,T4/(T1+T2+T3+T4)*TotalT+1);
    intertheta2V = intertheta2V.concat(intertheta2V[0]);
    intertheta2V.splice(intertheta2V.length-(T3+T2)/(T1+T2+T3+T4)*TotalT,T2/(T1+T2+T3+T4)*TotalT+1);
    //intertheta3V.splice(intertheta3V.length-T4/(T1+T2+T3+T4)*TotalT,T4/(T1+T2+T3+T4)*TotalT+1);
    //intertheta3V = intertheta3V.concat(intertheta3V[0]);
    //intertheta3V.splice(intertheta3V.length-(T3+T2)/(T1+T2+T3+T4)*TotalT,T2/(T1+T2+T3+T4)*TotalT+1);
    //intertheta4V.splice(intertheta4V.length-T4/(T1+T2+T3+T4)*TotalT,T4/(T1+T2+T3+T4)*TotalT+1);
    //intertheta4V = intertheta4V.concat(intertheta4V[0]);
    //intertheta4V.splice(intertheta4V.length-(T3+T2)/(T1+T2+T3+T4)*TotalT,T2/(T1+T2+T3+T4)*TotalT+1);
    intertheta5V.splice(intertheta5V.length-T4/(T1+T2+T3+T4)*TotalT,T4/(T1+T2+T3+T4)*TotalT+1);
    intertheta5V = intertheta5V.concat(intertheta5V[0]);
    intertheta5V.splice(intertheta5V.length-(T3+T2)/(T1+T2+T3+T4)*TotalT,T2/(T1+T2+T3+T4)*TotalT+1);
    intertheta6V.splice(intertheta6V.length-T4/(T1+T2+T3+T4)*TotalT,T4/(T1+T2+T3+T4)*TotalT+1);
    intertheta6V = intertheta6V.concat(intertheta6V[0]);
    intertheta6V.splice(intertheta6V.length-(T3+T2)/(T1+T2+T3+T4)*TotalT,T2/(T1+T2+T3+T4)*TotalT+1);
    intertheta1V = ProcessDSphasedata(NewTA, intertheta1V);
    intertheta2V = ProcessDSphasedata(NewTA, intertheta2V);
    //intertheta3V = ProcessDSphasedata(NewTA, intertheta3V);
    //intertheta4V = ProcessDSphasedata(NewTA, intertheta4V);
    intertheta5V = ProcessDSphasedata(NewTA, intertheta5V);
    intertheta6V = ProcessDSphasedata(NewTA, intertheta6V);
    var num = 0;
    for(i = 0;i<NewTA[NewTA.length-1];i=i+0.01)
    {
      NewT[num] = i;
      num = num + 1;
    }
    }
    else{
      NewT = NewTA;
    }
    if(Final){
      alert(NewT);
    //plot
    var trace1 = {
      x: NewT,
      y: intertheta6V,
      name: 'Left Ankle Angle',
      type: 'scatter',
  line: {shape: 'spline',dash: 'solid',
  width: 2}  
    };
    
    var trace2 = {
      x: NewT,
      y: intertheta5V,
      name: 'Left Knee Angle',
      type: 'scatter',
  line: {shape: 'spline',dash: 'solid',
  width: 2}  
    };

    var trace3 = {
      x: NewT,
      y: intertheta4V,
      name: 'Left Hip Angle',
      type: 'scatter',
  line: {shape: 'spline',dash: 'solid',
  width: 2}   
    };
    var trace4 = {
      x: NewT,
      y: intertheta1V,
      name: 'Right Ankle Angle',
      type: 'scatter',
  line: {shape: 'spline',dash: 'dashdot',
  width: 1}   
    };
    
    var trace5 = {
      x: NewT,
      y: intertheta2V,
      name: 'Right Knee Angle',
      type: 'scatter',
  line: {shape: 'spline',dash: 'dashdot',
  width: 1}   
    };

    var trace6 = {
      x: NewT,
      y: intertheta3V,
      name: 'Right Hip Angle',
      type: 'scatter',
  line: {shape: 'spline',dash: 'dashdot',
  width: 1}      
    };
    
    var data = [trace1, trace2, trace3, trace4, trace5, trace6];
    
    var layout = {
        xaxis: {
          title: 'Time (Second)',
          range: [0, 2*interT[interT.length -1]]
        },
        yaxis: {
          title: 'Angle (Degree)'
        }
      };

    Plotly.newPlot('myDiv', data, layout); 
    }
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
      drawTheta2 = theta2Array[drawIndex] + PI/2;
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
      if(((drawTheta2-PI/2)/PI*180<15)&&(drawIndex>10)&&((SwingHeel[drawIndex] < -2) &&(SwingHeel[drawIndex] < SwingHeel[drawIndex-1]) &&(drawIndex > 0))){
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
        theta4DoubleDot = singlePendAFO_getThetaDoubleDot(theta4, theta4Dot);
        theta4 = theta4 + theta4Dot * deltaT;
        theta4Dot = theta4Dot + theta4DoubleDot * deltaT;
        //timeArray[index] = i;
        theta4Array[index] = theta4;
        thetaDot4Array[index] = theta4Dot;
        thetaDbDot4Array[index] = theta4DoubleDot;
        index = index + 1;
      }
      var T1 = calculateSwingHeel(t/deltaT);
      return T1;
  }

  function calculateST(T1, Final){
    var VEC = [];
    var t = 2;
    ENDT2 = 0;
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
    DStheta0ArrayV = [];
    DStheta1ArrayV = [];
    DStheta2ArrayV = [];
    DStheta4ArrayV = [];
    T1stswing = T1;
    //double stance phase, need to define T
    timeArrayDS = timeArray.slice(0,T1/deltaT);
    theta1ArrayDS = theta1Array.slice(0,T1/deltaT);
    theta2ArrayDS = theta2Array.slice(0,T1/deltaT);
    theta3ArrayDS = theta3Array.slice(0,T1/deltaT);
    theta4ArrayDS = theta4Array.slice(0,T1/deltaT);
    thetaDot1ArrayDS = thetaDot1Array.slice(0,T1/deltaT);
    thetaDot2ArrayDS = thetaDot2Array.slice(0,T1/deltaT);
    thetaDot3ArrayDS = thetaDot3Array.slice(0,T1/deltaT);
    thetaDot4ArrayDS = thetaDot4Array.slice(0,T1/deltaT);
    thetaDbDot1ArrayDS = thetaDbDot1Array.slice(0,T1/deltaT);
    thetaDbDot2ArrayDS = thetaDbDot2Array.slice(0,T1/deltaT);
    thetaDbDot3ArrayDS = thetaDbDot3Array.slice(0,T1/deltaT);
    thetaDbDot4ArrayDS = thetaDbDot4Array.slice(0,T1/deltaT);
    //calculate theta0
    DStheta0Array[0] = 0;
    DSthetaDot0Array[0] = thetaDot4ArrayDS[T1/deltaT - 1];
    DStheta1Array[0] = PI - theta4ArrayDS[T1/deltaT - 1];
    DSthetaDot1Array[0] = 0;
    //DStheta4Array[0] = theta1Array[T1/deltaT - 1];
    //DSthetaDot4Array[0] = thetaDot1Array[T1/deltaT - 1];
    DStheta2Array[0] = 0;
    DSItheta0 = DStheta0Array[0];
    DSItheta1 = DStheta1Array[0];
    DSItheta2 = DStheta2Array[0];
    DSIdtheta0 = DSthetaDot0Array[0];
    DSIdtheta1 = DSthetaDot1Array[0];
    
    solvedoublestanceAFO();
    //DStheta2Array[0] = initial.theta2;
    DStheta4Array[0] = DSItheta4;
    DSthetaDot2Array[0] = abs(DSIdtheta2);
    DSthetaDot4Array[0] = DSIdtheta4;

    //corrisponding to trigger double stance
    DStheta = [DStheta0Array[0], DStheta1Array[0], DStheta2Array[0], DStheta4Array[0]];
    DSdtheta = [DSthetaDot0Array[0], DSthetaDot1Array[0], DSthetaDot2Array[0], DSthetaDot4Array[0]];
    //alert(DStheta);
    //alert(DSdtheta);
    //alert(T1stswing)
    //alert("DStheta: "+DStheta+"\nDSdtheta: "+DSdtheta+"\nT23: "+T23+"\nk_7: "+k_7+"\nk_8: "+k_8+"\nT1stswing: "+T1stswing);
    Doublestance(DStheta, DSdtheta, T23, k_7, k_8,T1stswing);

    DStheta0Array;
    //for trim purpose
    DSthetainit = [DStheta0Array[0], DStheta1Array[0], DStheta2Array[0], DStheta4Array[0]];
    if(DStheta0Array.length == 1)
    {
      length2 = 1;
      DStheta0ArrayV = DStheta0Array;
      DStheta1ArrayV = DStheta1Array;
      DStheta2ArrayV = DStheta2Array;
      DStheta4ArrayV = DStheta4Array;
    }
    else{
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
    interRatio = 4;
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
      console.log("The first DS has no length.");
      VEC = [9999,9999,9999];
      return VEC;
    }
    DStheta0ArrayV = [DSthetainit[0]].concat(DStheta0ArrayV);
    DStheta1ArrayV = [DSthetainit[1]].concat(DStheta1ArrayV);
    DStheta2ArrayV = [DSthetainit[2]].concat(DStheta2ArrayV);
    DStheta4ArrayV = [DSthetainit[3]].concat(DStheta4ArrayV);
    for(var i = 0; i < DStheta0ArrayV.length; i = i + 1){
     if(DStheta2ArrayV[i] > theta0_2/180*PI)
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
    length2 = DStheta0ArrayM.length * interRatio - (interRatio-1)+1;
  } 
    console.log('Finish interpolation');
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
    //Correct Hip angle
    for (var i = 0; i < length1; i = i + 1){
      theta4ArrayDS[i] = theta4ArrayDS[i] - PI;
     }
     for (var i = 0; i < length1; i = i + 1){
      theta1ArrayDS[i] = -theta1ArrayDS[i];
     }
     //Correct DSKnee angle
     for (var i = 0; i < length2; i = i + 1){
      if (DStheta2ArrayV[i] < 0)
      DStheta2ArrayV[i] = 0;
     }
    //Ankle during stnace
    anklestance = [];
    for (var i = 0; i < length1; i = i + 1){
     anklestance[i] = -theta4ArrayDS[i];
    }
    //later hip during DS
    latterhip = [];
    for (var i = 0; i < length2; i = i + 1){
      latterhip[i] = -(DStheta0ArrayV[i] + DStheta1ArrayV[i] - DStheta2ArrayV[i]);
     }   
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
        Kneezero2[i] = 5*theta5/(length2)*(i-length2/5*4);
        }
        for (var i = 0; i < length1; i = i + 1){
          Kneezero1[i] = (theta5 - 4*theta5/length1*i); 
          if(Kneezero1[i]< 0)
          Kneezero1[i] = 0;
          anklestance[i] = anklestance[i]+Kneezero1[i];
          }
          //shrink knee and hip angle during double stance
      VEC[1] = -DStheta4ArrayV[DStheta4ArrayV.length - 1] + Kneezero2[Kneezero2.length - 1];
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
          // alert(latterhip);
           if(1){
            for (var i = 0; i < length2; i = i + 1){
              latterhip[i] = -latterhip[i]/5;
              DStheta4ArrayV[i] = -DStheta4ArrayV[i]/5;
              }
             // alert(latterhip);
             elevatehip = theta4ArrayDS[theta4ArrayDS.length-1] - latterhip[0];
             //alert('elevatehip: '+elevatehip);
             //alert('theta4end: '+theta4Array[theta4Array.length-1]);
             diffknee = theta2ArrayDS[0]-DStheta2ArrayV[DStheta2ArrayV.length-1];
             diffhip = theta1ArrayDS[0]-latterhip[latterhip.length-1]-elevatehip;
            // alert('diffhip: '+diffhip);
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
intertheta4 = theta1ArrayDS.concat(DStheta4ArrayV);

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

       //double pendulum Left Second
       var Tolerance = 1.1;
       var theta1SEC = -intertheta3[intertheta3.length-1];
       var theta2SEC = intertheta2[intertheta2.length-1];
       var theta3SEC = theta2SEC + PI/2;
       var theta5SEC= intertheta5[intertheta5.length-1];
       var thetaDot1SEC = (latterhip[latterhip.length-1] - latterhip[latterhip.length-2])/deltaT;
       var thetaDot2SEC = DSthetaDot2Array[DSthetaDot2Array.length-1]; //same as the other leg
       var thetaDot3SEC = 0;
       var thetaDoubleDot1SEC;
       var thetaDoubleDot2SEC;
       var thetaDoubleDot3SEC;
       var indexSEC = 0;
       if(1){
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
      }
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
       var theta4SEC =   intertheta4[intertheta4.length-1];
       var theta4DotSEC = DSthetaDot4Array[DSthetaDot4Array.length-1];
       var theta4DoubleDotSEC;
       var indexSEC = 0;
       if(1){
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
      }
        //if( abs(180 - theta4SEC/PI*180) > 0)
        //{
        //  theta4SEC = PI + (PI - theta4SEC);
        //}
       // console.log('theta4SEC' + theta4SEC);
       for (var i = 0; i < t; i = i + deltaT) {
         theta4DoubleDotSEC = singlePendAFO_getThetaDoubleDot(theta4SEC, theta4DotSEC);
         theta4SEC = theta4SEC + theta4DotSEC * deltaT;
         theta4DotSEC = theta4DotSEC + theta4DoubleDotSEC * deltaT;
         //timeArray[index] = i;
         theta4ArrayDS[indexSEC] = theta4SEC;
         thetaDot4ArrayDS[indexSEC] = theta4DotSEC;
         thetaDbDot4ArrayDS[indexSEC] = theta4DoubleDotSEC;
         indexSEC = indexSEC + 1;
       }
       SECT1 = calculateSwingHeel(t/deltaT);
       console.log(SECT1);
       if(SECT1 < 0.1)
       {
         SECT1 = (T1stswing+T1)/2;
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
     timeArrayDS = timeArray.slice(0,length3);
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
     //calculate theta0
     DStheta0Array[0] = 0;
     DSthetaDot0Array[0] = thetaDot4ArrayDS[length3 - 1];
     DStheta1Array[0] = theta4ArrayDS[length3 - 1];
     DSthetaDot1Array[0] = 0;
     //DStheta4Array[0] = theta1Array[T1/deltaT - 1];
     //DSthetaDot4Array[0] = thetaDot1Array[T1/deltaT - 1];
     DStheta2Array[0] = 0;
     DSItheta0 = DStheta0Array[0];
     DSItheta1 = DStheta1Array[0];
     DSItheta2 = DStheta2Array[0];
     DSIdtheta0 = DSthetaDot0Array[0];
     DSIdtheta1 = DSthetaDot1Array[0];
     
     solvedoublestanceAFO();
     //DStheta2Array[0] = initial.theta2;
     DStheta4Array[0] = DSItheta4;
     DSthetaDot2Array[0] = DSIdtheta2;
     DSthetaDot4Array[0] = DSIdtheta4;
 
     //corrisponding to trigger double stance
     DStheta = [DStheta0Array[0], DStheta1Array[0], DStheta2Array[0], DStheta4Array[0]];
     DSdtheta = [DSthetaDot0Array[0], DSthetaDot1Array[0], DSthetaDot2Array[0], DSthetaDot4Array[0]];
     DoublestanceAFO(DStheta, DSdtheta, T13, k_3,k_4);
     DStheta0Array;
     //for trim purpose
     DSthetainit = [DStheta0Array[0], DStheta1Array[0], DStheta2Array[0], DStheta4Array[0]];
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
/*      if(DStheta0Array.length < 8)
     interRatio = 20;
     else */
     interRatio = 4;
     //interpolation
     if(DStheta0Array.length == 1){
      DStheta0ArrayV = DStheta0Array;
      DStheta1ArrayV = DStheta1Array;
      DStheta2ArrayV = DStheta2Array;
      DStheta4ArrayV = DStheta4Array;
      length4 = DStheta0Array.length * interRatio - (interRatio-1);
     }
     else{
      DStheta0ArrayV = DataProcess(arrayX, DStheta0ArrayM, interRatio);
      DStheta1ArrayV = DataProcess(arrayX, DStheta1ArrayM, interRatio);
      DStheta2ArrayV = DataProcess(arrayX, DStheta2ArrayM, interRatio);
      DStheta4ArrayV = DataProcess(arrayX, DStheta4ArrayM, interRatio);
      DStheta0ArrayV = [DSthetainit[0]].concat(DStheta0ArrayV);
      DStheta1ArrayV = [DSthetainit[1]].concat(DStheta1ArrayV);
      DStheta2ArrayV = [DSthetainit[2]].concat(DStheta2ArrayV);
      DStheta4ArrayV = [DSthetainit[3]].concat(DStheta4ArrayV);
      length4 = DStheta0ArrayM.length * interRatio - (interRatio-1)+1;
     }
     //Length for swing+stance
    
     //ankle for swing+stance
      
     //Length for Doublestance

     //alert(length1 + ',' + length2 + ',' + length3 + ',' + length4);
     LenT1 = length1;
     T2 = length2;
     T3 = length3;
     T4 = length4;
     VEC[0] = [T2+T3+T4];
     /*      interT = [];
     for (var i = 0; i < 2*(T1/deltaT + DStheta0ArrayM.length * interRatio - (interRatio-1)+1); i = i + 1){
      interT[i] = i * deltaT;
    }     */
     //Correct Hip angle
     for (var i = 0; i < length3; i = i + 1){
       theta4ArrayDS[i] = theta4ArrayDS[i];
      }
      for (var i = 0; i < length3; i = i + 1){
       theta1ArrayDS[i] = -theta1ArrayDS[i];
      }
      //Correct DSKnee angle
      for (var i = 0; i < length4; i = i + 1){
       if (DStheta2ArrayV[i] < 0)
       DStheta2ArrayV[i] = 0;
      }
     //Ankle during stnace
     anklestance = [];
     for (var i = 0; i < length3; i = i + 1){
      anklestance[i] = -theta4ArrayDS[i];
     }
     //later hip during DS
     latterhip = [];
     for (var i = 0; i < length4; i = i + 1){
       latterhip[i] = (DStheta0ArrayV[i] + DStheta1ArrayV[i] - DStheta2ArrayV[i]);
      }   
     //console.log('Begain to Concat');
    //shrink knee and hip angle during double stance
        Kneezero1 = [];
        Kneezero2 = [];
        Anklezero2 = [];
    //knee bending at LTO and LHS
    for (var i = 0; i < length4; i = i + 1){
      if(i < length4/5*4){
        Kneezero2[i] = 0;
      continue;}
    Kneezero2[i] = 5*theta5SEC/(length4)*(i-length4/5*4);
    }
    for (var i = 0; i < length3; i = i + 1){
      Kneezero1[i] = (theta5SEC - 4*theta5SEC/length3*i); 
      if(Kneezero1[i]< 0)
      Kneezero1[i] = 0;
      anklestance[i] = anklestance[i]+Kneezero1[i];
      }
      VEC[2] = -latterhip[latterhip.length-1] + DStheta2ArrayV[DStheta2ArrayV.length-1];
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
         
                   //hip1 start with stance
                   Realdiffhip1 = theta1ArrayDS[0] - latterhip[latterhip.length-1];
                   //hip2 start with swing
                   Realdiffhip2 = abs(theta4ArrayDS[0]) - abs(DStheta4ArrayV[DStheta4ArrayV.length-1]);
                   Realdiffknee = theta2ArrayDS[0] - DStheta2ArrayV[DStheta2ArrayV.length-1];
                   
          if(Final){
           // alert("line 2128");
          for (var i = 0; i < length4; i = i + 1){
            latterhip[i] = latterhip[i]/5;
            DStheta4ArrayV[i] = DStheta4ArrayV[i]/5;
            }
           elevatehip = theta4ArrayDS[theta4ArrayDS.length-1] - latterhip[0];
           diffknee = theta2ArrayDS[0]-DStheta2ArrayV[DStheta2ArrayV.length-1];
           diffhip = theta1ArrayDS[0]-latterhip[latterhip.length-1]-elevatehip;
           //Ratiohip1 = theta4Array[0]/DStheta4ArrayV[DStheta4ArrayV.length-1];
           diffankle = ankleswing[0]-DStheta1ArrayV[DStheta1ArrayV.length-1];

               for (var i = 0; i < length4; i = i + 1){
                                   //adjust based on polynomial with order of 2
                  /*
                 DStheta2ArrayV[i] = DStheta2ArrayV[i] + diffknee * ((pow(i,2)+2*i+1)/pow(length4,2));
                 latterhip[i] = latterhip[i] + elevatehip + diffhip * ((pow(i,2)+2*i+1)/pow(length4,2));
                // DStheta4ArrayV[i] = DStheta4ArrayV[i] * (1 + (i+1)*(Ratiohip1 - 1)/length2);
                 DStheta1ArrayV[i] = DStheta1ArrayV[i] + diffankle * ((pow(i,2)+2*i+1)/pow(length4,2));
                                   */
                 //adjust based on linear correction
                 DStheta2ArrayV[i] = DStheta2ArrayV[i] + diffknee * ((i+1)/length4);
                 latterhip[i] = latterhip[i] + elevatehip + diffhip * ((i+1)/length4);
                // DStheta4ArrayV[i] = DStheta4ArrayV[i] * (1 + (i+1)*(Ratiohip1 - 1)/length2);
                 DStheta1ArrayV[i] = DStheta1ArrayV[i] + diffankle * ((i+1)/length4);
                }
                elevatehip = theta1ArrayDS[theta1ArrayDS.length-1] - DStheta4ArrayV[0];
                //diffknee = Kneezero1[0]-Kneezero2[Kneezero2.length-1];
                diffhip = theta4ArrayDS[0]-DStheta4ArrayV[DStheta4ArrayV.length-1]-elevatehip;
                //Ratiohip1 = theta4Array[0]/DStheta4ArrayV[DStheta4ArrayV.length-1];
                diffankle = anklestance[0]-Kneezero2[Kneezero2.length-1];
                for (var i = 0; i < length4; i = i + 1){
                                     //adjust based on polynomial with order of 2
                  /*
                   //Kneezero2[i] = Kneezero2[i] + diffknee * ((pow(i,2)+2*i+1)/pow(length2,2));
                 //Kneezero2[i] = Kneezero2[i] + diffknee * ((pow(i,2)+2*i+1)/pow(length2,2));
                 DStheta4ArrayV[i] = DStheta4ArrayV[i] + elevatehip + diffhip * ((pow(i,2)+2*i+1)/pow(length4,2));
                // DStheta4ArrayV[i] = DStheta4ArrayV[i] * (1 + (i+1)*(Ratiohip1 - 1)/length2);
                Anklezero2[i] = Kneezero2[i] + diffankle * ((pow(i,2)+2*i+1)/pow(length4,2));
                  */
                   //adjust based on polynomial with linear
                  //Kneezero2[i] = Kneezero2[i] + diffknee * ((pow(i,2)+2*i+1)/pow(length2,2));
                  DStheta4ArrayV[i] = DStheta4ArrayV[i] + elevatehip + diffhip * ((i+1)/length4);
                 // DStheta4ArrayV[i] = DStheta4ArrayV[i] * (1 + (i+1)*(Ratiohip1 - 1)/length2);
                 Anklezero2[i] = Kneezero2[i] + diffankle *  ((i+1)/length4);
                }
               }


               
    //alert("Length for 6: "+intertheta6.length+"\n Length for 1" + intertheta1.length);
//left and right ankle dorsi +/plantar -
    intertheta1 =  intertheta1.concat(ankleswing, Anklezero2);
    intertheta6 = intertheta6.concat(anklestance, DStheta1ArrayV);
    //console.log(intertheta6);
    //left and right knee
    //alert("Length for 6: "+intertheta6.length+"\n Last element" + intertheta6[intertheta6.length-1]);
    intertheta2 = intertheta2.concat(theta2ArrayDS, Kneezero2);
    
    intertheta5 = intertheta5.concat(Kneezero1, DStheta2ArrayV);
    //correct knee angle
    for  (var i = 0; i < intertheta2.length; i = i + 1){
      if (intertheta2[i] < 0)  intertheta2[i] = 0;
      if (intertheta5[i] < 0)  intertheta5[i] = 0;
     }   
    //left and right hip
    intertheta3 = intertheta3.concat(theta1ArrayDS, DStheta4ArrayV);
    intertheta4 = intertheta4.concat(theta4ArrayDS, latterhip);
    /*for (var i = 0; i < intertheta2.length; i = i + 1){
      if (intertheta2[i] < 0)
      intertheta2[i] = 0;
      }
    for (var i = 0; i < intertheta4.length; i = i + 1){
      if (intertheta4[i] < 0)
      intertheta4[i] = 0;
      }*/
    /*interRatio = 0.1;
    console.log('Raw');
    intertheta1V = DataProcess(interT, intertheta1, interRatio);
    intertheta2V = DataProcess(interT, intertheta2, interRatio);
    intertheta3V = DataProcess(interT, intertheta3, interRatio);
    intertheta4V = DataProcess(interT, intertheta4, interRatio);
    intertheta5V = DataProcess(interT, intertheta5, interRatio);
    intertheta6V = DataProcess(interT, intertheta6, interRatio);
    interRatio = 10;
    NewT = NewarrayX;
    console.log('Clear');
    Finaltheta1 = DataProcess(NewT, intertheta1V, interRatio);
    Finaltheta2 = DataProcess(NewT, intertheta2V, interRatio);
    Finaltheta3 = DataProcess(NewT, intertheta3V, interRatio);
    Finaltheta4 = DataProcess(NewT, intertheta4V, interRatio);
    Finaltheta5 = DataProcess(NewT, intertheta5V, interRatio);
    Finaltheta6 = DataProcess(NewT, intertheta6V, interRatio);
    FinalT = NewT;
    Drawplot(FinalT, Finaltheta1, 'scatter');*/
    for (var i = 0; i < intertheta1.length; i = i + 1){
      intertheta1[i] = intertheta1[i] / PI*180;
      intertheta2[i] = intertheta2[i] / PI*180;
      intertheta3[i] = intertheta3[i] / PI*180;
      intertheta4[i] = intertheta4[i] / PI*180;
      intertheta5[i] = intertheta5[i] / PI*180;
      intertheta6[i] = intertheta6[i] / PI*180;
     }
     //alert("Length for 6: "+intertheta6.length+"\n Last element" + intertheta6[intertheta6.length-1]);
     intertheta13 = intertheta1;
     intertheta23 = intertheta2;
     intertheta33 = intertheta3;
     intertheta43 = intertheta4;
     intertheta53 = intertheta5;
     intertheta63 = intertheta6;
     var interTsec = [];
     var interThir = [];
     interT = [];
     for (var i = 0; i < intertheta13.length; i = i + 1){
       interT[i] = i * deltaT;
     }    
     //console.log('424');
    for(var i = 0; i < interT.length; i = i + 1){
     interTsec[i] = interT[i]+interT[interT.length-1]+deltaT;
     interThir[i] = interT[i] + 2*(interT[interT.length-1]+deltaT);
    }
    //console.log('429');
     interT3 = interT;
     interTV = [];
     intertheta1V = [];
     intertheta2V = [];
     intertheta3V = [];
     intertheta4V = [];
     intertheta5V = [];
     intertheta6V = [];
     interratio = 5;
     for (var i = 0; i < intertheta13.length; i = i + interratio){
      interTV[i/interratio] = interT3[i];
      intertheta1V[i/interratio] = intertheta13[i];
      intertheta2V[i/interratio] = intertheta23[i];
      intertheta3V[i/interratio] = intertheta33[i];
      intertheta4V[i/interratio] = intertheta43[i];
      intertheta5V[i/interratio] = intertheta53[i];
      intertheta6V[i/interratio] = intertheta63[i];
     }
     //console.log('448');
    var NewTA = [];
    var NewT = [];
    interRatio = 5;
    if(0){
    intertheta1V = DataProcess(interTV, intertheta1V, interRatio);
    intertheta2V = DataProcess(interTV, intertheta2V, interRatio);
    intertheta3V = DataProcess(interTV, intertheta3V, interRatio);
    intertheta4V = DataProcess(interTV, intertheta4V, interRatio);
    intertheta5V = DataProcess(interTV, intertheta5V, interRatio);
    intertheta6V = DataProcess(interTV, intertheta6V, interRatio);
    NewTA = NewarrayX;
    }
    else{
    NewTA = interTV;
    }
    for (var i = 0; i < NewTA.length; i = i + 1){
    NewTA[i] = NewTA[i]*2;
    }
    /*for (var i = 0; i < NewarrayX.length; i = i + 1){
    NewT[i] = NewarrayX[i] - interT[interT.length -1];
    }*/
    //slice data for plotting

    if(Final){
     // alert("line 2292");
     // alert("line 2284 in leg solver");
     TotalT = NewTA.length;
    NewTA.splice(NewTA.length-T4/(LenT1+T2+T3+T4)*TotalT,T4/(LenT1+T2+T3+T4)*TotalT);
    NewTA.splice(NewTA.length-(T3+T2)/(LenT1+T2+T3+T4)*TotalT,T2/(LenT1+T2+T3+T4)*TotalT+1);
    //alert(NewTA);
    //alert("line 2289 in leg solver");
    intertheta1V.splice(intertheta1V.length-T4/(LenT1+T2+T3+T4)*TotalT,T4/(LenT1+T2+T3+T4)*TotalT+1);
    intertheta1V = intertheta1V.concat(intertheta1V[0]);
    intertheta1V.splice(intertheta1V.length-(T3+T2)/(LenT1+T2+T3+T4)*TotalT,T2/(LenT1+T2+T3+T4)*TotalT+1);
    intertheta2V.splice(intertheta2V.length-T4/(LenT1+T2+T3+T4)*TotalT,T4/(LenT1+T2+T3+T4)*TotalT+1);
    intertheta2V = intertheta2V.concat(intertheta2V[0]);
    intertheta2V.splice(intertheta2V.length-(T3+T2)/(LenT1+T2+T3+T4)*TotalT,T2/(LenT1+T2+T3+T4)*TotalT+1);
    //intertheta3V.splice(intertheta3V.length-T4/(T1+T2+T3+T4)*TotalT,T4/(T1+T2+T3+T4)*TotalT+1);
    //intertheta3V = intertheta3V.concat(intertheta3V[0]);
    //intertheta3V.splice(intertheta3V.length-(T3+T2)/(T1+T2+T3+T4)*TotalT,T2/(T1+T2+T3+T4)*TotalT+1);
    //intertheta4V.splice(intertheta4V.length-T4/(T1+T2+T3+T4)*TotalT,T4/(T1+T2+T3+T4)*TotalT+1);
    //intertheta4V = intertheta4V.concat(intertheta4V[0]);
    //intertheta4V.splice(intertheta4V.length-(T3+T2)/(T1+T2+T3+T4)*TotalT,T2/(T1+T2+T3+T4)*TotalT+1);
    intertheta5V.splice(intertheta5V.length-T4/(LenT1+T2+T3+T4)*TotalT,T4/(LenT1+T2+T3+T4)*TotalT+1);
    intertheta5V = intertheta5V.concat(intertheta5V[0]);
    intertheta5V.splice(intertheta5V.length-(T3+T2)/(LenT1+T2+T3+T4)*TotalT,T2/(LenT1+T2+T3+T4)*TotalT+1);
    intertheta6V.splice(intertheta6V.length-T4/(LenT1+T2+T3+T4)*TotalT,T4/(LenT1+T2+T3+T4)*TotalT+1);
    intertheta6V = intertheta6V.concat(intertheta6V[0]);
    intertheta6V.splice(intertheta6V.length-(T3+T2)/(LenT1+T2+T3+T4)*TotalT,T2/(LenT1+T2+T3+T4)*TotalT+1);
    //alert("line 2308 in leg solver");
    //intertheta1V = ProcessDSphasedata(NewTA, intertheta1V);
    //intertheta2V = ProcessDSphasedata(NewTA, intertheta2V);
    //intertheta3V = ProcessDSphasedata(NewTA, intertheta3V);
    //intertheta4V = ProcessDSphasedata(NewTA, intertheta4V);
    //intertheta5V = ProcessDSphasedata(NewTA, intertheta5V);
    //intertheta6V = ProcessDSphasedata(NewTA, intertheta6V);
    //alert("line 2313 in leg solver");
    var num = 0;
    for(i = 0;i<NewTA[NewTA.length-1];i=i+0.01)
    {
      NewT[num] = i;
      num = num + 1;
    }
    alert(NewT);
     //plot
     var trace1 = {
      x: NewT,
      y: intertheta6V,
      name: 'Left Ankle Angle',
      type: 'scatter',
  line: {shape: 'spline',dash: 'solid',
  width: 2}  
    };
    
    var trace2 = {
      x: NewT,
      y: intertheta5V,
      name: 'Left Knee Angle',
      type: 'scatter',
  line: {shape: 'spline',dash: 'solid',
  width: 2}  
    };

    var trace3 = {
      x: NewT,
      y: intertheta4V,
      name: 'Left Hip Angle',
      type: 'scatter',
  line: {shape: 'spline',dash: 'solid',
  width: 2}   
    };
    var trace4 = {
      x: NewT,
      y: intertheta1V,
      name: 'Right Ankle Angle',
      type: 'scatter',
  line: {shape: 'spline',dash: 'dashdot',
  width: 1}   
    };
    
    var trace5 = {
      x: NewT,
      y: intertheta2V,
      name: 'Right Knee Angle',
      type: 'scatter',
  line: {shape: 'spline',dash: 'dashdot',
  width: 1}   
    };

    var trace6 = {
      x: NewT,
      y: intertheta3V,
      name: 'Right Hip Angle',
      type: 'scatter',
  line: {shape: 'spline',dash: 'dashdot',
  width: 1}      
    };
    
    var data = [trace1, trace2, trace3, trace4, trace5, trace6];
    
    var layout = {
        xaxis: {
          title: 'Time (Second)',
          range: [0, 2*interT[interT.length -1]]
        },
        yaxis: {
          title: 'Angle (Degree)'
        }
      };

    Plotly.newPlot('myDiv', data, layout); 
    }
    else{
      NewT = NewTA;
    }
    
  return VEC;
  }