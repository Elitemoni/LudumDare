function hey(){
  if (Date.now() - epoch > 4000){
    console.log('hey');
    epoch = Date.now();
  }
}

let epoch = Date.now();
setInterval(hey, 100);