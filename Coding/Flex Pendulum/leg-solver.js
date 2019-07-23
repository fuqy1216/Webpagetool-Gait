loadScript('math-solver.js', function() {
    //alert('script ready!'); 
  });
  loadScript('js-solver.js', function() {
    //alert('script ready!'); 
  });
function solvedoublestance(){
    LegSolver = new Solver({
      l1: 'l1',
      l2: 'l2',
      l3: 'l3',
      l4: 'l4',
      theta0: 'theta0',
      theta1: 'theta1',
      theta2: 'theta2',
      dtheta0: 'dtheta0',
      dtheta1: 'dtheta1',
      Radius: 'Radius',
      Toeangle: 'atan(l4/l3)',
      theta4: 'acos((l3*sin(theta0) + l4*cos(theta0) + l2*cos(theta0+theta1) + l1*cos(theta0+theta1-theta2) - Radius)/(l2+l1+l4-Radius))',
      dtheta4: '-((l3^2+l4^2)^0.5*dtheta0*cos(theta0+Toeangle) - l2*(dtheta0+dtheta1)*sin(theta0+theta1) - l1*(dtheta0+dtheta1-dtheta2)*sin(theta0+theta1-theta2))/(l1+l2+l4-Radius)/sin(theta4)',
      dtheta2: '-(-(l3^2+l4^2)^0.5*dtheta0*sin(theta0+Toeangle) - l2*(dtheta0+dtheta1)*cos(theta0+theta1) - (l1+l2+l4-Radius)*dtheta4*cos(theta4)-Radius*dtheta4)/l1/cos(theta0+theta1-theta2)-dtheta0-dtheta1'
    })
    Fsolve = LegSolver.solve({
      l1: '1',
      l2: '1',
      l3: '0.1',
      l4: '0.3',
      theta0: '2',
      theta1: '4',
      theta2: '5',
      dtheta0: '10',
      dtheta1: '20',
      Radius: '0.2'
      })   
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
  k1 = 10;
  k2 = 10;
  m = 123;
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
  /*a = [
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]
  ]*/
  //b = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  
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
    DStheta2Array = [];
    DSthetaDot2Array = [];
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
    DSthetaDot0Array[0] = thetaDot4Array[T1/deltaT - 1];
    DStheta1Array[0] = 3/2*PI - theta4Array[T1/deltaT - 1];
    DSthetaDot1Array[0] = 0;
    //Doublestance();
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