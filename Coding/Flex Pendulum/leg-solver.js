loadScript('math-solver.js', function() {
    //alert('script ready!'); 
  });
  loadScript('js-solver.js', function() {
    //alert('script ready!'); 
  });
function solvedoublestance(){
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
      a24 = [
        [-len1*sin(DSItheta0+DSItheta1-DSItheta2), (len1+len2+len5-Radius)*sin(DSItheta4)],
        [len1*cos(DSItheta0+DSItheta1-DSItheta2), -(len1+len2+len5-Radius)*cos(DSItheta4)-Radius]
      ];
      b24 = [
          -math.pow((math.pow(len3,2)+math.pow(len5,2)),0.5)*DSIdtheta0*cos(DSItheta0+Toeangle)+len2*(DSIdtheta0+DSIdtheta1)*sin(DSItheta0+DSItheta1)+len1*(DSIdtheta0+DSIdtheta1)*sin(DSItheta0+DSItheta1-DSItheta2),
          math.pow((math.pow(len3,2)+math.pow(len5,2)),0.5)*DSIdtheta0*sin(DSItheta0+Toeangle)+len2*(DSIdtheta0+DSIdtheta1)*cos(DSItheta0+DSItheta1)-len1*(DSIdtheta0+DSIdtheta1)*cos(DSItheta0+DSItheta1-DSItheta2)
    ];
    result24 = math.multiply(math.inv(a24),b24);
    console.log(b24);
    DSIdtheta2 = result24[0];
    DSIdtheta4 = result24[1];
  }
  
  
  function solveleg(theta, dtheta) {
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
  T3 = 100;
  k1 = 10*180/PI;
  k2 = 10*180/PI;
  m = 42.8;
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
    console.log("forces calculation error");
    return 0;
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
  }
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

  
function calculateTheta(t) {
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
      //double pendulum
      var theta1 = theta0_1*PI/180.0;
      var theta2 = theta0_2*PI/180.0;
      var theta3 = theta2 + PI/2;
      var thetaDot1 = thetaDot0_1*PI/180.0;
      var thetaDot2 = thetaDot0_2*PI/180.0;
      var thetaDot3 = 0;
      var thetaDoubleDot1;
      var thetaDoubleDot2;
      var thetaDoubleDot3;
      var index = 0;
      for (var i = 0; i < t; i = i + deltaT) {
        thetaDoubleDot1 = triplePend_getThetaDoubleDot_1(theta1, theta2, thetaDot1, thetaDot2);
        thetaDoubleDot2 = triplePend_getThetaDoubleDot_2(theta1, theta2, thetaDot1, thetaDot2);
        thetaDoubleDot3 = triplePend_getThetaDoubleDot_3(theta1, theta2, thetaDot1, thetaDot2);
        theta1 = theta1 + thetaDot1 * deltaT;
        theta2 = theta2 + thetaDot2 * deltaT;
        // theta3 = theta3 + thetaDot3 * deltaT;
        theta3 = theta2 + PI/2; // Hard-coded
        thetaDot1 = thetaDot1 + thetaDoubleDot1 * deltaT;
        thetaDot2 = thetaDot2 + thetaDoubleDot2 * deltaT;
        thetaDot3 = thetaDot3 + thetaDoubleDot3 * deltaT;
        timeArray[index] = i;
        theta1Array[index] = theta1;
        theta2Array[index] = theta2;
        if (theta2Array[index]-theta1Array[index] < 0){
          theta2Array[index] = theta1Array[index];
          thetaDot2Array[index] = thetaDot1;
          thetaDbDot2Array[index] = thetaDoubleDot1;
        }else{
          thetaDot2Array[index] = thetaDot2;
          thetaDbDot2Array[index] = thetaDoubleDot2;
        }
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
    
    solvedoublestance();
    //DStheta2Array[0] = initial.theta2;
    DStheta4Array[0] = DSItheta4;
    DSthetaDot2Array[0] = DSIdtheta2;
    DSthetaDot4Array[0] = DSIdtheta4;

    //corrisponding to trigger double stance
    DStheta = [DStheta0Array[0], DStheta1Array[0], DStheta2Array[0], DStheta4Array[0]];
    DSdtheta = [DSthetaDot0Array[0], DSthetaDot1Array[0], DSthetaDot2Array[0], DSthetaDot4Array[0]];
    Doublestance(DStheta, DSdtheta);
  }

  function calculateSwingHeel(index) {
           //stance side
           SwingToe = [];
           SwingHeel = [];
           var LandingT = 0;
           for (var drawIndex = 0; drawIndex < index; drawIndex = drawIndex + 1) {
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
      if((SwingHeel[drawIndex] < 0) &&(SwingHeel[drawIndex] < SwingHeel[drawIndex-1]) &&(drawIndex > 0)){
      LandingT = drawIndex * deltaT;
      return LandingT;
           }
          
    }
        return LandingT;
  }

  function Doublestance(DStheta, DSdtheta){
      forces = solveleg(DStheta, DSdtheta);
      if (forces == 0)      return;
      index = 0;
      for (var i = 0; i < (time_-T1); i = i + deltaT) {
        DStheta0 = DStheta[0];
        DStheta1 = DStheta[1];
        DStheta2 = DStheta[2];
        DStheta4 = DStheta[3];
        DSdtheta0 = DSdtheta[0];
        DSdtheta1 = DSdtheta[1];
        DSdtheta2 = DSdtheta[2];
        DSdtheta4 = DSdtheta[3];
      DSthetaDbDot0 = (-forces[0]*len3*cos(DStheta1)+T3+forces[1]*len3*sin(DStheta1)-m3*g*0.5*len3*cos(DStheta0))/I3;
      lowerlegrot = (-T3-k2*DStheta2 - forces[3]*len2*cos(DStheta2) + forces[2]*len2*sin(DStheta2)+m2*g*0.5*len2*sin(DStheta0+DStheta1))/I2;
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
      solvedoublestance();
      //DStheta2 = initial.theta2;
      DStheta4 = DSItheta4;
      DSdtheta2 = DSIdtheta2;
      DSdtheta4 = DSIdtheta4;
      DStheta2 = DStheta2 + DSdtheta2 * deltaT;
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
      forces = solveleg(DStheta, DSdtheta);
      console.log(forces);
      if (forces == 0)      return;
      if((forces[7]<0)||(DStheta[0] > PI/2))     
      {
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
      }

  }