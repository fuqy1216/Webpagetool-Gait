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
/*   loadScript('smooth.js', function() {
    //alert('script ready!'); 
  }); */
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
  T3 = 140;
  k1 = -20*180/PI;
  k2 = 20*180/PI;
 // k1 = 10;
 // k2 = 10;
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
      var theta5 = theta0_5*PI/180;
      var thetaDot1 = thetaDot0_1*PI/180.0;
      var thetaDot2 = thetaDot0_2*PI/180.0;
      var thetaDot3 = 0;
      var thetaDoubleDot1;
      var thetaDoubleDot2;
      var thetaDoubleDot3;
      var index = 0;
      for (var i = 0; i < t; i = i + deltaT) {
        thetaDoubleDot1 = doublePend_getThetaDoubleDot_1(theta1, theta2, thetaDot1, thetaDot2);
        thetaDoubleDot2 = doublePend_getThetaDoubleDot_2(theta1, theta2, thetaDot1, thetaDot2, thetaDoubleDot1);
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
      console.log(T1);
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
    //var p = [];

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
    arrayX = [];
    for (var i = 0; i < DStheta0ArrayM.length; i = i + 1){
      arrayX[i] = i * deltaT;
    }
    interRatio = 10;
    //interpolation
    DStheta0ArrayV = DataProcess(arrayX, DStheta0ArrayM, interRatio);
    DStheta1ArrayV = DataProcess(arrayX, DStheta1ArrayM, interRatio);
    DStheta2ArrayV = DataProcess(arrayX, DStheta2ArrayM, interRatio);
    DStheta4ArrayV = DataProcess(arrayX, DStheta4ArrayM, interRatio);
    DStheta0ArrayV = [DSthetainit[0]].concat(DStheta0ArrayV);
    DStheta1ArrayV = [DSthetainit[1]].concat(DStheta1ArrayV);
    DStheta2ArrayV = [DSthetainit[2]].concat(DStheta2ArrayV);
    DStheta4ArrayV = [DSthetainit[3]].concat(DStheta4ArrayV);
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
    length2 = DStheta0ArrayM.length * interRatio - (interRatio-1)+1;
    (zero2 = []).length = length2;
    zero2.fill(0);
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
      if(1){
            for (var i = 0; i < length2; i = i + 1){
              latterhip[i] = latterhip[i]/5;
              DStheta4ArrayV[i] = DStheta4ArrayV[i]/5;
              }
            elevatehip = theta4Array[theta4Array.length-1] - latterhip[0];
            diffknee = theta2Array[0]-DStheta2ArrayV[DStheta2ArrayV.length-1];
            diffhip = theta1Array[0]-latterhip[latterhip.length-1]-elevatehip;
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
//left and right ankle dorsi +/plantar -
    intertheta1 =  anklestance.concat(DStheta1ArrayV, ankleswing, Anklezero2);
    intertheta6 = ankleswing.concat(Anklezero2, anklestance, DStheta1ArrayV);
    //console.log(intertheta6);
    //left and right knee

    intertheta2 = Kneezero1.concat(DStheta2ArrayV, theta2Array, Kneezero2);
    
    intertheta5 = theta2Array.concat(Kneezero2, Kneezero1, DStheta2ArrayV);
    //correct knee angle
    for  (var i = 0; i < intertheta2.length; i = i + 1){
      if (intertheta2[i] < 0)  intertheta2[i] = 0;
      if (intertheta5[i] < 0)  intertheta5[i] = 0;
     }   
    //left and right hip
    intertheta3 = theta4Array.concat(latterhip, theta1Array, DStheta4ArrayV);
    intertheta4 = theta1Array.concat(DStheta4ArrayV, theta4Array, latterhip);
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
     intertheta13 = intertheta1.concat(intertheta1,intertheta1);
     intertheta23 = intertheta2.concat(intertheta2,intertheta2);
     intertheta33 = intertheta3.concat(intertheta3,intertheta3);
     intertheta43 = intertheta4.concat(intertheta4,intertheta4);
     intertheta53 = intertheta5.concat(intertheta5,intertheta5);
     intertheta63 = intertheta6.concat(intertheta6,intertheta6);
     interTsec = [];
     interThir = [];
     //console.log('424');
    for(var i = 0; i < interT.length; i = i + 1){
     interTsec[i] = interT[i]+interT[interT.length-1]+deltaT;
     interThir[i] = interT[i] + 2*(interT[interT.length-1]+deltaT);
    }
    //console.log('429');
     interT3 = interT.concat(interTsec, interThir);
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
     NewT = [];
    /*  Ratio = 2;
     Smooth.METHOD_CUBIC = 'cubic';
     var s = Smooth(intertheta1V);
     console.log('Doing interpolation 1/6');
     for (var i = 0; i < intertheta1V.length*Ratio; i = i + 1){
      intertheta1V[i] = s(i/Ratio);
      }
      console.log('Finishing interpolation 1/6');
     var s = Smooth(intertheta2V);
     for (var i = 0; i < intertheta1V.length*Ratio; i = i + 1){
      intertheta2V[i] = s(i/Ratio);
      }
     var s = Smooth(intertheta3V);
     for (var i = 0; i < intertheta1V.length*Ratio; i = i + 1){
      intertheta3V[i] = s(i/Ratio);
      }
     var s = Smooth(intertheta4V);
     for (var i = 0; i < intertheta1V.length*Ratio; i = i + 1){
      intertheta4V[i] = s(i/Ratio);
      }
     var s = Smooth(intertheta5V);
     for (var i = 0; i < intertheta1V.length*Ratio; i = i + 1){
      intertheta5V[i] = s(i/Ratio);
      }
     var s = Smooth(intertheta6V);
     for (var i = 0; i < intertheta1V.length*Ratio; i = i + 1){
     intertheta6V[i] = s(i/Ratio);
     } */
    
    interRatio = 1;
    if(0){
    intertheta1V = DataProcess(interTV, intertheta1V, interRatio);
    intertheta2V = DataProcess(interTV, intertheta2V, interRatio);
    intertheta3V = DataProcess(interTV, intertheta3V, interRatio);
    intertheta4V = DataProcess(interTV, intertheta4V, interRatio);
    intertheta5V = DataProcess(interTV, intertheta5V, interRatio);
    intertheta6V = DataProcess(interTV, intertheta6V, interRatio);
    NewT = NewarrayX;
    }
    else{
    NewT = interTV;
    }
    for (var i = 0; i < NewT.length; i = i + 1){
    NewT[i] = NewT[i]*2;
    }
    /*for (var i = 0; i < NewarrayX.length; i = i + 1){
    NewT[i] = NewarrayX[i] - interT[interT.length -1];
    }*/
    var trace1 = {
      x: NewT,
      y: intertheta1V,
      name: 'Left Ankle Angle',
      type: 'scatter',
  line: {shape: 'spline',dash: 'solid',
  width: 2}  
    };
    
    var trace2 = {
      x: NewT,
      y: intertheta2V,
      name: 'Left Knee Angle',
      type: 'scatter',
  line: {shape: 'spline',dash: 'solid',
  width: 2}  
    };

    var trace3 = {
      x: NewT,
      y: intertheta3V,
      name: 'Left Hip Angle',
      type: 'scatter',
  line: {shape: 'spline',dash: 'solid',
  width: 2}   
    };
    var trace4 = {
      x: NewT,
      y: intertheta6V,
      name: 'Right Ankle Angle',
      type: 'scatter',
  line: {shape: 'spline',dash: 'dashdot',
  width: 1}   
    };
    
    var trace5 = {
      x: NewT,
      y: intertheta5V,
      name: 'Right Knee Angle',
      type: 'scatter',
  line: {shape: 'spline',dash: 'dashdot',
  width: 1}   
    };

    var trace6 = {
      x: NewT,
      y: intertheta4V,
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
      if((SwingHeel[drawIndex] < -1) &&(SwingHeel[drawIndex] < SwingHeel[drawIndex-1]) &&(drawIndex > 0)){
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
      forces = solveleg(DStheta, DSdtheta);
      //console.log(forces);
      if (forces == 0)      
      {
        console.log('Doublestance: forces all zero');
        return;}
      if((forces[7]<0)||(DStheta[0] > PI/2))     
      {
        console.log('Doublestance: solve success');
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

  function DataProcess(marrayX, marrayY, minterRatio){
    console.log('Doing interpolation');
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
