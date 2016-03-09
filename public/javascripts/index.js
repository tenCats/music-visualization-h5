//create a selector
function $(s){
  return document.querySelectorAll(s);
}

//random
function random(m, n){
  return Math.round(Math.random()*(n - m) + m);
}

//start a new song
function restart(id){
  startOffset = 0;
  startTime = 0;

  clearInfo();
  setInfo(id);
  
  loadSong(id);

  setCover(id);
  changePlayIcon();
  
  strength = 0;
  strCount = 0;

}

//play after pause
function start(id){
  loadSong(id);

}


box = $('.painter')[0];
//get
function resize(){
  height = box.clientHeight;
  width = box.clientWidth;
  canvas.height = height;
  canvas.width = width;
}

//先调用 再赋值给window的resize
window.onresize = resize;

//total: total number of songs in the songlist
//idNow: current select song
//isPlay: if the music is being played, boolean
/*
You may have an idNow, but you are not playing, you can switch
to the next song on the songlist, so we use idNow to control 'next'
and 'latest' button, but use ifPlay to control the 'play' button

We use loadSong(id) to play the song.
*/
var total = data.songs.length;
var idNow = null;
var isPlay = true;
var startOffset = 0;
var startTime = 0;
var playing = false;

var cover = $('#cover')[0];

/*
------* web auido api init *------
*/
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();
var analyser = audioContext.createAnalyser();
analyser.fftSize = 64 * 2;//64 bins
var gainNode = audioContext.createGain();

analyser.connect(gainNode);
gainNode.connect(audioContext.destination);
var source = null;


var progressbar = $('.progressing')[0];


/*
info
-------* info *-------
the bar above progress bar
*/
var ti = $('#ti')[0];
var ar = $('#ar')[0];
var wl = $('#wl')[0];
var wm = $('#wm')[0];

function clearInfo(){
  ti.innerHTML = '';
  ar.innerHTML = '';
  wl.innerHTML = '';
  wm.innerHTML = '';
}
function setInfo(id){
  ti.innerHTML = data.songs[id];
  if(data.ar[id]){
    ar.innerHTML = data.ar[id];}
  if(data.wl[id]){
    wl.innerHTML = 'wl: ' + data.wl[id];}
  if(data.wm[id]){
    wm.innerHTML = 'wm: ' + data.wm[id];} 
}


/*
-------* statues *--------
*/
var icons = $('.my-col > .glyphicon');
var iconPlay = icons[3];

function changePlayIcon(){
  if(isPlay){
    iconPlay.classList.remove('glyphicon-play');
    iconPlay.classList.add('glyphicon-pause');
  }else{
    iconPlay.classList.remove('glyphicon-pause');
    iconPlay.classList.add('glyphicon-play');
  }
}

function changeLikeIcon(){
  
}

/*
songlist bar
-------* *-------
*/
var songlistView = $('#songlist')[0];
songlistView.setAttribute('style', 'display: none;');
var songs = $('#songlist .item');

//选择歌曲
function sltSong(){
  for(var i=0; i<songs.length; i++){
    songs[i].onclick = function(){
      for(var j=0; j<songs.length; j++){
        songs[j].className = 'item';
      }
      this.className = 'item item-selected';
      
      idNow = this.getAttribute('value') - 0;
      
      
      restart(idNow);
      
      songlistView.style.display = 'none';
      controls[6].classList.remove('selected');
    };
  }  
}

var songBuffer;

//GET buffer using 
//An XMLHttpRequest is used to load data into a buffer from the audio file. 
function loadSong(id){
  var getBuffer = new XMLHttpRequest();
  getBuffer.open('GET', '/media/'+id+'.mp3');
  getBuffer.responseType = 'arraybuffer';
  getBuffer.onload = function(){
    audioContext.decodeAudioData(getBuffer.response, function(buffer){
      songBuffer = buffer;
      play(songBuffer);
    }, function(err){
      console.log(err);
    });
  };
  getBuffer.send();
}


/*
effect bar
-------* *-------
*/
var effectlistView = $('#effectlist')[0];
effectlistView.setAttribute('style', 'display: none;');

//effect div
var effectCtls = $('#effectlist > .effect');
//show cover
effectCtls[0].addEventListener('click', function(){
  canvas.setAttribute('style', 'display: none');
  cover.setAttribute('style', 'display:');
  for(var i=0; i<effectCtls.length; i++){
    effectCtls[i].classList.remove('selected');
  }
  this.classList.add('selected');
});
effectCtls[1].addEventListener('click', function(){
  canvas.setAttribute('style', 'display:');
  cover.setAttribute('style', 'display: none');
  for(var i=0; i<effectCtls.length; i++){
    effectCtls[i].classList.remove('selected');
  }
  this.classList.add('selected');
  
  type=1;
});
effectCtls[2].addEventListener('click', function(){
  canvas.setAttribute('style', 'display:');
  cover.setAttribute('style', 'display: none');
  for(var i=0; i<effectCtls.length; i++){
    effectCtls[i].classList.remove('selected');
  }
  this.classList.add('selected');
  type=8;
});
//show circle
effectCtls[3].addEventListener('click', function(){
  canvas.setAttribute('style', 'display:');
  cover.setAttribute('style', 'display: none');
  for(var i=0; i<effectCtls.length; i++){
    effectCtls[i].classList.remove('selected');
  }
  this.classList.add('selected');
  
  type=3;
});
effectCtls[4].addEventListener('click', function(){
  canvas.setAttribute('style', 'display:');
  cover.setAttribute('style', 'display: none');
  for(var i=0; i<effectCtls.length; i++){
    effectCtls[i].classList.remove('selected');
  }
  this.classList.add('selected');
  
  type=5;
});

effectCtls[5].addEventListener('click', function(){
  canvas.setAttribute('style', 'display:');
  cover.setAttribute('style', 'display: none');
  for(var i=0; i<effectCtls.length; i++){
    effectCtls[i].classList.remove('selected');
  }
  this.classList.add('selected');
  
  type=6;
});

effectCtls[6].addEventListener('click', function(){
  canvas.setAttribute('style', 'display:');
  cover.setAttribute('style', 'display: none');
  for(var i=0; i<effectCtls.length; i++){
    effectCtls[i].classList.remove('selected');
  }
  this.classList.add('selected');
  
  type=7;
});

effectCtls[7].addEventListener('click', function(){
  canvas.setAttribute('style', 'display:');
  cover.setAttribute('style', 'display: none');
  for(var i=0; i<effectCtls.length; i++){
    effectCtls[i].classList.remove('selected');
  }
  this.classList.add('selected');
  
  type=2;
});
effectCtls[8].addEventListener('click', function(){
  canvas.setAttribute('style', 'display:');
  cover.setAttribute('style', 'display: none');
  for(var i=0; i<effectCtls.length; i++){
    effectCtls[i].classList.remove('selected');
  }
  this.classList.add('selected');
  
  type=10;
});
effectCtls[9].addEventListener('click', function(){
  canvas.setAttribute('style', 'display:');
  cover.setAttribute('style', 'display: none');
  for(var i=0; i<effectCtls.length; i++){
    effectCtls[i].classList.remove('selected');
  }
  this.classList.add('selected');
  
  type=11;
});

/*
navi bar
-------* *-------
*/
var controls = $('.my-col');

//navi -> effect list bar
controls[0].addEventListener('click', function(){
  if(effectlistView.style.display == 'none'){
    effectlistView.style.display = '';
    this.classList.add('selected');
    
    songlistView.style.display = 'none';
    controls[6].classList.remove('selected');

  }else{
    effectlistView.style.display = 'none';
    this.classList.remove('selected');
  }
},false);

//volume down
controls[1].addEventListener('click', function(){
  volumeDown();
},false);

//earlier song
controls[2].addEventListener('click', function(){
  if(idNow!=null){
    songs[idNow].classList.remove('item-selected');

    idNow = (total + idNow-1) % total;
    songs[idNow].classList.add('item-selected');

    restart(idNow);
    isPlay = true;
    changePlayIcon();
  }
},false);

//navi -> play
//only pause and restart from where the song has been paused
controls[3].addEventListener('click', function(){
  if(idNow!=null){
    isPlay = !isPlay;
    changePlayIcon();
    if(isPlay){
      start(idNow);
    }else{
      pause();
    }
  }
},false);

//next song
controls[4].addEventListener('click', function(){
  if(idNow!=null){
    songs[idNow].classList.remove('item-selected');

    idNow = (idNow+1) % total;
    songs[idNow].classList.add('item-selected');

    restart(idNow);
    isPlay = true;
    changePlayIcon();
  }
  
},false);

//volume up
controls[5].addEventListener('click', function(){
  volumeUp();
},false);

//navi -> songlist bar

controls[6].addEventListener('click', function(){
  if(songlistView.style.display == 'none'){
    songlistView.style.display = '';
    this.classList.add('selected');
    
    effectlistView.style.display = 'none';
    controls[0].classList.remove('selected');
    sltSong();
  }else{
    songlistView.style.display = 'none';
    this.classList.remove('selected');
  }
},false);

/*
canvas
-------* content *-------
*/
var canvas = $('#canvas')[0];
var ctx = canvas.getContext('2d');
var type = 0;
var type2_circle=[];
var strength = 0;
var strCount = 0;

function draw(arr){
  var w = canvas.width
  var h = canvas.height;
  var delta = canvas.width / arr.length;
//  ctx.clearRect(0,0,w,h);
  if(type==1){
    ctx.clearRect(0,0,w,h);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1;

    for(var i=0; i<1024 && i<arr.length; i++){
      ctx.beginPath();
      ctx.moveTo(delta*i, h);
      ctx.lineTo(delta*i, h-arr[i]*1.0/255*h);
      ctx.stroke();
    }
  }
  if(type==2){
    console.log('strength'+strength);
    ctx.clearRect(0,0,w,h);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1;
    
    var delta = width/2/32;
    
    var sum = 0;
    //32 circles;
    for(var i=0; i<arr.length; i++){
      sum += arr[i];
    }
    sum /= arr.length;
    console.log('sum'+sum);
    
    if(strength == 0){
      strength = sum;  
    }
    console.log('str 2 ' +strength);
    //do anime
    type2_circle[type2_circle.length-1] = 0;
    for(var i=type2_circle.length; i>-1; i--){
      
      if(type2_circle[i] == 1 && i != (type2_circle.length-1)){
        type2_circle[i] = 0;
        type2_circle[i+1] = 1; 
      }
    }
    
    console.log(type2_circle);
    
    if(strength < sum && (sum-strength)> 0.08 *sum){
      type2_circle[0] = 1;
    }
//    if(150 <= sum){
//      type2_circle[0] = 1;
//    }
//    
    
    for(var i=0; i<type2_circle.length; i++){
      if(type2_circle[i] == 1){
        ctx.beginPath();
        ctx.arc(w/2,h/2,delta*(1+i),0,Math.PI*2,true);
        ctx.stroke();
      }
    }
    strCount ++;
    if(strength > sum){
      strength = (strCount*strength + sum * 2 ) / (strCount+2);
    }else{
      strength = (strCount*strength + sum * 2 ) / (strCount+2);
    }
  }
  if(type==3){
    ctx.clearRect(0,0,w,h);
    ctx.lineWidth = 1;

    var a=0;
    for(var i=0; i<3; i++){
      a += arr[i];
    }
    a = 1.0*a/(3*255);

    for(var i=2; i<32 && i<arr.length; i++){
      ctx.beginPath();
      ctx.strokeStyle = 'RGBA(255,255,255,' + a +')';
      a = (arr[i*2]+arr[i*2+1])*1.0/255/2;
  //    a = arr[i]*1.0/255;
      a = a*a;
      ctx.arc(w/2,h/2,delta*i,0,Math.PI*2,true);
      ctx.stroke();
    }
  }
  if(type==5){
    var r1=w*0.05,
        d = (width/2-r1)/3,
        delta = Math.PI*2/arr.length,
        phase1 = -Math.PI/4,
        phase2 = 0,
        phase3 = Math.PI/4;
  
    ctx.clearRect(0,0,w,h);
    ctx.lineWidth = d;
    
    ctx.strokeStyle = 'RGBA(246, 202, 91, 0.3)';
    ctx.beginPath();
    ctx.arc(w/2,h/2,2.5*d+r1,phase1-0.01,phase1,false);
    ctx.closePath();
    ctx.stroke();
    
    ctx.strokeStyle = 'RGBA(246, 202, 91, 0.6)';
    ctx.beginPath();
    ctx.arc(w/2,h/2,1.5*d+r1,phase2-0.02,phase2,false);
    ctx.closePath();
    ctx.stroke();
    
    ctx.strokeStyle = 'RGBA(246, 202, 91, 0.9)';
    ctx.beginPath();
    ctx.arc(w/2,h/2,0.5*d+r1,phase3-0.03,phase3,false);
    ctx.closePath();
    ctx.stroke();
    
    for(var i=0; i<arr.length;i++){
      var r2 = Math.pow(arr[i]*1.0/(255), 0.5)*(width/2 -r1);
      
      ctx.beginPath();
      if(r2>2*d){
        
        var begin=delta*i+phase1;
        var end=delta*i+0.6*delta+phase1;
        
        ctx.beginPath();
//        ctx.fillStyle = 'RGBA(255,255,255, 0.3)';
//        ctx.moveTo(w/2,h/2);
        ctx.arc(w/2,h/2,(r2-2*d)/2+2*d+r1,begin,end,false);
//        ctx.moveTo(w/2,h/2);
//        ctx.arc(w/2,h/2,2*d+r1,begin,end,false);
        ctx.closePath();
//        ctx.fill('evenodd');
        
        ctx.strokeStyle = 'RGBA(255,255,255, 0.3)';
        ctx.lineWidth = r2-2*d;
        ctx.stroke();
        
      }else if(r2>d){
        var begin=delta*i+phase2;
        var end=delta*i+0.6*delta+phase2;
        
        ctx.beginPath();
//        ctx.fillStyle = 'RGBA(255,255,255, 0.6)';
//        ctx.moveTo(w/2,h/2);
        ctx.arc(w/2,h/2,(r2-d)/2 +d+r1,begin,end,false);
//        ctx.moveTo(w/2,h/2);
//        ctx.arc(w/2,h/2,d+r1,begin,end,false);
        ctx.closePath();
//        ctx.fill('evenodd');
        
        ctx.strokeStyle = 'RGBA(255,255,255, 0.6)';
        ctx.lineWidth = r2-d;
        ctx.stroke();
      }else if(r2>0){
        var begin=delta*i+phase3;
        var end=delta*i+0.6*delta+phase3;
        
        ctx.beginPath();
//        ctx.fillStyle = 'RGBA(255,255,255, 0.9)';
//        ctx.moveTo(w/2,h/2);
        ctx.arc(w/2,h/2,r2/2+r1,begin,end,false);
//        ctx.moveTo(w/2,h/2);
//        ctx.arc(w/2,h/2,r1,begin,end,false);
        ctx.closePath();
//        ctx.fill('evenodd');
        
        ctx.strokeStyle = 'RGBA(255,255,255, 0.9)';
        ctx.lineWidth = r2;
        ctx.stroke();
      }
    }
  }
  if(type==6){
    ctx.clearRect(0,0,w,h);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1;

    ctx.beginPath();
    for(var i=0; i<1024 && i<arr.length; i++){
      if(i==0){
        ctx.moveTo(delta*i, 0.5*h);
      }else{
        ctx.lineTo(delta*i, 0.5*h-arr[i]*1.0/255*h *0.5);
      }
    }
    ctx.stroke();
    
    ctx.beginPath();
    for(var i=0; i<1024 && i<arr.length; i++){
      if(i==0){
        ctx.moveTo(delta*i, 0.5*h);
      }else{
        ctx.lineTo(delta*i, 0.5*h+arr[i]*1.0/255*h *0.5);
      }
    }
    ctx.stroke();
    
    for(var i=0; i<1024 && i<arr.length; i++){
      ctx.beginPath();
      ctx.moveTo(delta*i, 0);
      ctx.lineTo(delta*i, 0.5*h-arr[i]*1.0/255*h *0.5);
      ctx.stroke();
    }
    for(var i=0; i<1024 && i<arr.length; i++){
      ctx.beginPath();
      ctx.moveTo(delta*i, h);
      ctx.lineTo(delta*i, 0.5*h+arr[i]*1.0/255*h *0.5);
      ctx.stroke();
    }
  }
  if(type==7){
    ctx.clearRect(0,0,w,h);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1;

    ctx.beginPath();
    for(var i=0; i<1024 && i<arr.length; i++){
      if(i==0){
        ctx.moveTo(delta*i, h);
      }else{
        ctx.lineTo(delta*i, h-arr[i]*1.0/255*h);
      }
    }
    ctx.stroke();
    
    
    for(var i=0; i<1024 && i<arr.length; i++){
      ctx.beginPath();
      ctx.moveTo(delta*i, 0);
      ctx.lineTo(delta*i, h-arr[i]*1.0/255*h);
      ctx.stroke();
    }
  }
  if(type==8){
    var r1=w*0.05;
    ctx.clearRect(0,0,w,h);
    ctx.beginPath();
    ctx.strokeStyle = "#FFF";
    ctx.arc(w/2,h/2,r1,0,Math.PI*2,true);
    ctx.closePath();
    ctx.stroke();
    var delta = Math.PI*2/arr.length;
    
    for(var i=0; i<arr.length;i++){
      var r2 = Math.pow(arr[i]*1.0/(255), 0.5)*(width/2 -r1);

      var d = (width/2-r1)/3;
      ctx.beginPath();
      if(r2>2*d){
        var phase = 0;;
        var begin=delta*i+phase;
        var end=delta*i+0.6*delta+phase;
        
        ctx.beginPath();
        ctx.fillStyle = 'RGBA(255,255,255, 0.3)';
        ctx.moveTo(w/2,h/2);
        ctx.arc(w/2,h/2,r2+r1,begin,end,false);
        ctx.moveTo(w/2,h/2);
        ctx.arc(w/2,h/2,2*d+r1,begin,end,false);
        ctx.closePath();
        ctx.fill('evenodd');
        
        ctx.beginPath();
        ctx.fillStyle = 'RGBA(255,255,255, 0.6)';
        ctx.moveTo(w/2,h/2);
        ctx.arc(w/2,h/2,2*d+r1,begin,end,false);
        ctx.moveTo(w/2,h/2);
        ctx.arc(w/2,h/2,d+r1,begin,end,false);
        ctx.closePath();
        ctx.fill('evenodd');
        
        ctx.beginPath();
        ctx.fillStyle = 'RGBA(255,255,255, 0.9)';
        ctx.moveTo(w/2,h/2);
        ctx.arc(w/2,h/2,d+r1,begin,end,false);
        ctx.moveTo(w/2,h/2);
        ctx.arc(w/2,h/2,r1,begin,end,false);
        ctx.closePath();
        ctx.fill('evenodd');
        
      }else if(r2>d){
        var phase =0;
        var begin=delta*i+phase;
        var end=delta*i+0.6*delta+phase;
        
        ctx.beginPath();
        ctx.fillStyle = 'RGBA(255,255,255, 0.6)';
        ctx.moveTo(w/2,h/2);
        ctx.arc(w/2,h/2,r2+r1,begin,end,false);
        ctx.moveTo(w/2,h/2);
        ctx.arc(w/2,h/2,d+r1,begin,end,false);
        ctx.closePath();
        ctx.fill('evenodd');
        
        ctx.beginPath();
        ctx.fillStyle = 'RGBA(255,255,255, 0.9)';
        ctx.moveTo(w/2,h/2);
        ctx.arc(w/2,h/2,d+r1,begin,end,false);
        ctx.moveTo(w/2,h/2);
        ctx.arc(w/2,h/2,r1,begin,end,false);
        ctx.closePath();
        ctx.fill('evenodd');
        
        
      }else{
        var phase = 0;
        var begin=delta*i+phase;
        var end=delta*i+0.6*delta+phase;
        
        ctx.beginPath();
        ctx.fillStyle = 'RGBA(255,255,255, 0.9)';
        ctx.moveTo(w/2,h/2);
        ctx.arc(w/2,h/2,r2+r1,begin,end,false);
        ctx.moveTo(w/2,h/2);
        ctx.arc(w/2,h/2,r1,begin,end,false);
        ctx.closePath();
        ctx.fill('evenodd');
      }
    }
  }else if(type==10){
    ctx.clearRect(0,0,w,h);
    var r1=w*0.05,
        d = (width/2-r1)/3,
        delta = Math.PI*2/arr.length,
        phase1 = -Math.PI/4,
        phase2 = 0,
        phase3 = Math.PI/4;
    
    for(var i=0; i<arr.length;i++){
      var r2 = Math.pow(arr[i]*1.0/(255), 0.5)*(width/2 -r1);
      
      ctx.beginPath();
      if(r2>2*d){
        
        var begin=delta*i+phase1;
        var end=delta*i+delta+phase1;
        
        ctx.beginPath();
        ctx.arc(w/2,h/2,(r2-2*d)/2+2*d+r1,begin,end,false);
        ctx.closePath();
        
        ctx.strokeStyle = 'RGBA(255,255,255, 0.3)';
        ctx.lineWidth = r2-2*d;
        ctx.stroke();
        
      }else if(r2>d){
        var begin=delta*i+phase2;
        var end=delta*i+delta+phase2;
        
        ctx.beginPath();
        ctx.arc(w/2,h/2,(r2-d)/2 +d+r1,begin,end,false);
        ctx.closePath();
        
        ctx.strokeStyle = 'RGBA(255,255,255, 0.6)';
        ctx.lineWidth = r2-d;
        ctx.stroke();
      }else if(r2>0){
        var begin=delta*i+phase3;
        var end=delta*i+delta+phase3;
        
        ctx.beginPath();
        ctx.arc(w/2,h/2,r2/2+r1,begin,end,false);
        ctx.closePath();
        
        ctx.strokeStyle = 'RGBA(255,255,255, 0.9)';
        ctx.lineWidth = r2;
        ctx.stroke();
      }
    }
  }else if(type==11){
    ctx.clearRect(0,0,w,h);
    var r1=w*0.05,
        d = (width/2-r1)/3,
        delta = Math.PI*2/arr.length,
        phase1 = 0,
        phase2 = 0,
        phase3 = 0;
    
    var rd = 2.5*d;
    
    for(var i=0; i<arr.length;i++){
      var r2 = Math.pow(arr[i]*1.0/(255), 0.5)*(width/2 -r1);
      
      ctx.beginPath();
      if(r2>2*d){
        
        var begin=delta*i+phase1;
        var end=delta*i+delta+phase1;
        
        ctx.beginPath();
        ctx.arc(w/2,h/2,rd,begin,end,false);
        ctx.closePath();
        
        ctx.strokeStyle = 'RGBA(255,255,255, 0.3)';
        ctx.lineWidth = r2-2*d;
        ctx.stroke();
        
      }else if(r2>d){
        var begin=delta*i+phase2;
        var end=delta*i+delta+phase2;
        
        ctx.beginPath();
//        ctx.arc(w/2,h/2,2.8*d/2+d+r1,begin,end,false);
        ctx.arc(w/2,h/2,rd,begin,end,false);
        ctx.closePath();
        
        ctx.strokeStyle = 'RGBA(255,255,255, 0.6)';
        ctx.lineWidth = r2-d;
        ctx.stroke();
      }else if(r2>0){
        var begin=delta*i+phase3;
        var end=delta*i+delta+phase3;
        
        ctx.beginPath();
//        ctx.arc(w/2,h/2,2.8*d/2+r1,begin,end,false);
        ctx.arc(w/2,h/2,rd,begin,end,false);
        ctx.closePath();
        
        ctx.strokeStyle = 'RGBA(255,255,255, 0.9)';
        ctx.lineWidth = r2;
        ctx.stroke();
      }
    }
  }
}

var visual = function(){

  var arr = new Uint8Array(analyser.frequencyBinCount);
  
  requestAnimationFrame = window.requestAnimationFrame || 
                          window.webkitRequestAnimationFrame ||
                          window.mozRequestAnimationFrame;
  
  for(var i=0; i<32; i++){
    type2_circle.push(0);
  }

  var frames = 0;
  
  progressbar.style.width='0%';
  var wi = 0;
  function animate(){
    if(playing){
      wi = ((startOffset + audioContext.currentTime - startTime)/source.buffer.duration * 100)%100;
      
      progressbar.style.width=wi+'%';
    }
    
    analyser.getByteFrequencyData(arr);
    draw(arr);

    progressbar.style.width=wi+"%";
    
    requestAnimationFrame(animate);
  }
  animate();
}




/*
cover
-------* cover *-------
*/
function setCover(id){
  var img = $('.cd-cover')[0];
  img.src = '/images/' + data.cover[id] + '.jpg';
  
  if(img.width < img.height){
    img.style.width="100%";
    img.style.height="";
  }else{
    img.style.height="100%";
    img.style.width="";
  }
}

/*
music web audio api
-------* web audio api *-------
*/

function play(buffer){
  startTime = audioContext.currentTime;
  if(isPlay!=null && isPlay == true){
    source && source[source.stop ? "stop" : "noteOff"](0);
  }
  
  var playIt = audioContext.createBufferSource();
  playIt.buffer = buffer;
  playIt.loop = true;
  playIt.connect(analyser);
  playIt.start(0, startOffset % buffer.duration);
  
  isPlay = true;
  source = playIt;
  
  playing = true;
}

function pause(){
  source.stop();
  playing = false;

  startOffset += audioContext.currentTime - startTime;
}

function volumeDown(){
  if(gainNode.gain.value > 0.09)
    gainNode.gain.value -= 0.1;
}

function volumeUp(){
  if(gainNode.gain.value < 2)
    gainNode.gain.value += 0.1;
}

/**/

function loadOnce(){
//to unmute Web Audio API
  var getBuffer = new XMLHttpRequest();
  getBuffer.open('GET', '/media/open.m4a');
  getBuffer.responseType = 'arraybuffer';
  getBuffer.onload = function(){
    audioContext.decodeAudioData(getBuffer.response, function(buffer){
      
      source && source[source.stop ? "stop" : "noteOff"](0);
      
      var playIt = audioContext.createBufferSource();
      playIt.buffer = buffer;
      playIt.connect(audioContext.destination);
      
      source = playIt;
    }, function(err){
      console.log(err);
    });
  };
  getBuffer.send();
}

loadOnce();
/* welcome */
var wel = $('#welcome-cir')[0];
var welcome = $('#welcome')[0];
var text = $('#welcome-text')[0];

wel.addEventListener('click', function(){
  source.start(0);
  startTime = audioContext.currentTime;
//  welcome.setAttribute('style', 'display: none');
  welcome.classList.add('diss');
  wel.setAttribute('style','-webkit-animation: rotating 20s linear infinite;');
  text.style.opacity = 0;
  
  window.setTimeout(function(){welcome.setAttribute('style', 'display: none')}, 8000);
}, false);


/* init */

resize();
gainNode.gain.value = 0.6;
visual();
setCover(0);