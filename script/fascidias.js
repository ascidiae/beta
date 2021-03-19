function basica(t){
	if(poblacion(t)>6){
		purga(t)
	}

	else{
		cria(t,0)
		setTimeout(function(){empujaTodo(t, 0, 1)},250);
	}
	
	finHabilidad()
}

function mariensis(t){
	if(poblacion(t)>6){
		purga(t)
	}

	else{
		cria(t,0)
		cria(t,0)
		setTimeout(function(){empuja(t, 0, 1)},250);
		setTimeout(function(){empuja(t, 0, 2)},250);
	}

	finHabilidad()
}

function chromatica(t){
	if(poblacion(t)>6){
		purga(t)
		finHabilidad()
	}
	
	else{
		if(t.renacuajos[0].length>=2 && t.renacuajos[1].length>=2){
			menuChromatica(t)
			return
		}

		if(t.renacuajos[0].length>=2 && t.renacuajos[1].length<2){
			chromatica_1(t)
			return
		}

		if(t.renacuajos[1].length>=2 && t.renacuajos[0].length<2){
			chromatica_2(t)
			return
		}
		
		if(t.renacuajos[0].length<2 && t.renacuajos[1].length<2){
			finHabilidad();
			return
		}
	}
}

function chromatica_1(t){
	consume(t,0)
	consume(t,0)
	cria(t, 1)
	setTimeout(function(){empuja(t, 1, 1)},250)

	finHabilidad()
}

function chromatica_2(t){
	consume(t,1)
	consume(t,1)
	cria(t, 2)
	setTimeout(function(){empuja(t, 2, 1)},250)

	finHabilidad()
}

function menuChromatica(t){
	while(ventana.firstChild)
		ventana.removeChild(ventana.lastChild);

	ventana.classList.add("activa")

	var icono1=document.createElement("img")
	var icono2=document.createElement("img")
	icono1.src="img/ico/menosnn.png"
	icono2.src="img/ico/menostt.png"
	ventana.appendChild(icono1)
	ventana.appendChild(icono2)

	icono1.onclick=icono1.ontouchstart=function(){chromatica_1(t);ventana.classList.remove("activa")}
	icono2.onclick=icono2.ontouchstart=function(){chromatica_2(t);ventana.classList.remove("activa")}
}

function porta(t){
	if(poblacion(t)>6){
		purga(t)
	}
	else{
		empujaTodo(t, 0, 1)
		empujaTodo(t, 1, 1)
		empujaTodo(t, 2, 1)
	}
	finHabilidad()
}

function habilis(t){
	if(poblacion(t)>6)
		purga(t)

	if(poblacion(t)>0){
		menuHabilis(t)
		return
	}  

	finHabilidad()
}

function menuHabilis(t){
	//console.log("meHa",t)
	
	pagante=t
	
	while (ventana.firstChild)
		ventana.removeChild(ventana.lastChild);

	ventana.classList.add("activa")

	var icono1=document.createElement("img")
	var icono2=document.createElement("img")
	var icono3=document.createElement("img")
	var icono4=document.createElement("img")
	var icono5=document.createElement("img")

	icono1.src="img/ico/mover.png"
	icono2.src="img/ico/girar.png"
	icono3.src="img/ico/poner.png"
	icono4.src="img/ico/colonia.png"
	icono5.src="img/ico/dormir.png"

	ventana.appendChild(icono1)
	ventana.appendChild(icono2)
	ventana.appendChild(icono3)
	ventana.appendChild(icono4)
	ventana.appendChild(icono5)

	icono1.onclick=icono1.ontouchstart=function(){mover(t)}
	icono2.onclick=icono2.ontouchstart=function(){girar(t)}
	icono3.onclick=icono3.ontouchstart=function(){comprar(t)}
	//icono4.onclick=icono4.ontouchstart=comprarColonia
	icono5.onclick=icono5.ontouchstart=dormir
}

function limpida(t){
	if(poblacion(t)>6){
		purga(t)
	}
	else{
		if(t.renacuajos[0].length>0 && t.renacuajos[1].length>0){
			consume(t,0)
			consume(t,1)
			cria(t, 1)
			cria(t, 2)
			setTimeout(function(){empuja(t, 1, 1)},250)
			setTimeout(function(){empuja(t, 2, 1)},250)
		}
	}
	
	finHabilidad()
}

function magnus(t){
	if(poblacion(t)>6){
		purga(t)
	}
	else
		if(t.renacuajos[0].length>=3){
			consume(t,0)
			consume(t,0)
			consume(t,0)
			cria(t, 2)
			setTimeout(function(){empuja(t,  2, 1)},250)
		}
  
	finHabilidad()
}

function rostellaria(t){
	if(poblacion(t)>6){
		purga(t)
	}
	else
		if(t.renacuajos[0].length>=2){
			consume(t,0)
			consume(t,0)
			cria(t, 1)    
			cria(t, 1)
			setTimeout(function(){empuja(t,  1, 1)},250)
			setTimeout(function(){empuja(t,  1, 2)},250)
		}
	
	finHabilidad()
}

function sverk(t){
	if(poblacion(t)>6){
		purga(t)
	}
	else
		if(poblacion(t)>0){
			let temp=finHabilidad
			finHabilidad=function(){
				setTimeout(
					function(){if(poblacion(t)>0) menuHabilis(t); finHabilidad=temp}
				,125)
			}
     
			menuHabilis(t)
			return
		}
    
	finHabilidad()
}

function vikenti(t){
	if(poblacion(t)>6){
		purga(t)
	}
	else{
		if(t.renacuajos[0].length<2)
			cria(t,0)
		else{
			menuVikenti(t)
			return
		}
    }
	
	finHabilidad()
}

function menuVikenti(t){
	while (ventana.firstChild)
		ventana.removeChild(ventana.lastChild);

	ventana.classList.add("activa")

	var icono1=document.createElement("img")
	var icono2=document.createElement("img")
	icono1.src="img/ico/masn.png"
	icono2.src="img/ico/menosnn.png"
	ventana.appendChild(icono1)
	ventana.appendChild(icono2)
  
	icono1.onclick=function(){
		cria(t,0)
		finHabilidad()
		ventana.classList.remove("activa")
	}
	
	icono2.onclick=function(){
		consume(t,0)
		consume(t,0)
		cria(t, 1)
		setTimeout(function(){empuja(t, 1, 1)},250)
		finHabilidad()
		ventana.classList.remove("activa")
	}
}
