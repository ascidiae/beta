function corriente(){
	if(posluz.y%2)
		if(posluz.x==0)
			posluz.y++
		else
			posluz.x--
	else
		if(posluz.x==2)
			posluz.y++
		else
			posluz.x++
		

	if(posluz.y==3)
		resetluz()
	else{
		luz.setAttribute("posx",posluz.x)
		luz.setAttribute("posy",posluz.y)
		setTimeout(dia,250);		
	}
}

function resetluz(){
	posluz={x:0, y:0}
	luz.style.opacity=0;
	turno++;
	setTimeout(function(){
		luz.setAttribute("posx",0)
		luz.setAttribute("posy",0)
		botondia.onclick=botondia.ontouchstart=dia;
		botondia.disabled=false;
	}, 500);
}

//var primeravez=true

function dia(){
	botondia.onclick=botondia.ontouchstart=null;
	//if(botondia.disabled) return
	//var elem=document.body;
	//if(primeravez){
		//toggleFullScreen()
	
	/*if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.webkitRequestFullscreen) { 
		elem.webkitRequestFullscreen();
	} else if (elem.msRequestFullscreen) { 
		elem.msRequestFullscreen();
	}
		primeravez=false
	} */
	console.log("dia funcionando")
	luz.style.opacity=1;

	var actual=buscaAscidia(posluz.x, posluz.y)

	if(actual!=-1)
		lista[actual].habilidad()
	else
		finHabilidad();
}

function finHabilidad(){
	setTimeout(corriente, 500);
	botondia.disabled=true;
}


