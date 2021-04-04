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
	
	var coloniable=false
	for(var i=0;i<cantidadColonias.value;i++) 
		if(!colonias[i].comprada && colonias[i].coste[0]<=pagante.renacuajos[0].length && colonias[i].coste[1]<=pagante.renacuajos[1].length && colonias[i].coste[2]<=pagante.renacuajos[2].length)
			coloniable=true
	if(coloniable)
		ventana.appendChild(icono4)
	ventana.appendChild(icono5)

	icono1.onclick=icono1.ontouchstart=function(){mover(t)}
	icono2.onclick=icono2.ontouchstart=function(){girar(t)}
	icono3.onclick=icono3.ontouchstart=function(){comprar(t)}
	icono4.onclick=icono4.ontouchstart=comprarColonia
	icono5.onclick=icono5.ontouchstart=dormir
}

function chordata(t){
	if(poblacion(t)>6){
		purga(t)
	}
	else{
		if(poblacion(t)>=1)
			if(t.renacuajos[2].length>0){
				menuChordata(t)//menu	
				return
			}
			else{
				menuHabilis(t)
				return
			}
	}
	finHabilidad()
}

function menuChordata(t){
	while (ventana.firstChild)
		ventana.removeChild(ventana.lastChild);

	ventana.classList.add("activa")

	var icono1=document.createElement("img")
	var icono2=document.createElement("img")
	icono1.src="img/ico/pensar.png"
	icono2.src="img/ico/menosb.png"
	ventana.appendChild(icono1)
	ventana.appendChild(icono2)
  
	icono1.onclick=function(){
		ventana.classList.remove("activa")
		menuHabilis(t)
		//finHabilidad()
	}
	
	icono2.onclick=function(){
		consume(t,2)
		cria(t, 0)
		finHabilidad()
		ventana.classList.remove("activa")
	}
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
					function(){
						finHabilidad=temp;
						if(poblacion(t)>0)
							menuHabilis(t);
						else
						finHabilidad()
					}
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

function arctica(t){
	if(poblacion(t)>6){
		purga(t)
	}
	else{
		if(t.renacuajos[2].length>=1){
			menuArctica(t)
			return
		}
    }
	
	finHabilidad()
}

function menuArctica(t){
	while (ventana.firstChild)
		ventana.removeChild(ventana.lastChild);

	ventana.classList.add("activa")

	var icono1=document.createElement("img")
	var icono2=document.createElement("img")
	icono1.src="img/ico/masnnt.png"
	icono2.src="img/ico/masntt.png"
	ventana.appendChild(icono1)
	ventana.appendChild(icono2)
  
	icono1.onclick=function(){
		consume(t,2)
		cria(t,0)
		cria(t,0)
		cria(t,1)
		setTimeout(function(){empuja(t, 0, 1)},250)
		setTimeout(function(){empuja(t, 0, 1)},250)
		setTimeout(function(){empuja(t, 1, 1)},250)
		finHabilidad()
		ventana.classList.remove("activa")
	}
	
	icono2.onclick=function(){
		consume(t,2)
		cria(t, 0)
		cria(t, 1)
		cria(t, 1)
		setTimeout(function(){empuja(t, 0, 1)},250)
		setTimeout(function(){empuja(t, 1, 1)},250)
		setTimeout(function(){empuja(t, 1, 1)},250)
		finHabilidad()
		ventana.classList.remove("activa")
	}
}

function iota(t){
	if(poblacion(t)>6){
		purga(t)
	}
	else{
		if(t.renacuajos[1].length>=1){
			menuIota(t)
			return
		}
    }
	
	finHabilidad()
}
			
function menuIota(t){
	
	while (ventana.firstChild)
		ventana.removeChild(ventana.lastChild);

	ventana.classList.add("activa")

	var icono1=document.createElement("img")
	var icono2=document.createElement("img")
	var icono3=document.createElement("img")
	icono1.src="img/ico/masnn.png"
	icono2.src="img/ico/masnt.png"
	icono3.src="img/ico/mastt.png"
	ventana.appendChild(icono1)
	ventana.appendChild(icono2)
	ventana.appendChild(icono3)
  
	icono1.onclick=function(){
		consume(t,1)
		cria(t,0)
		cria(t,0)
		setTimeout(function(){empuja(t, 0, 1)},250)
		setTimeout(function(){empuja(t, 0, 1)},250)
		finHabilidad()
		ventana.classList.remove("activa")
	}
	
	icono2.onclick=function(){
		consume(t,1)
		cria(t, 0)
		cria(t, 1)
		setTimeout(function(){empuja(t, 0, 1)},250)
		setTimeout(function(){empuja(t, 1, 1)},250)
		finHabilidad()
		ventana.classList.remove("activa")
	}

	icono3.onclick=function(){
		consume(t,1)
		cria(t, 1)
		cria(t, 1)
		setTimeout(function(){empuja(t, 1, 1)},250)
		setTimeout(function(){empuja(t, 1, 1)},250)
		finHabilidad()
		ventana.classList.remove("activa")
	}
}

function turbida(t){
	if(poblacion(t)>6){
		purga(t)
	}
	else{
		if(t.renacuajos[1].length>=3){
			menuTurbida(t)
			return
		}
    }
	
	finHabilidad()
}
			
function menuTurbida(t){
	
	while (ventana.firstChild)
		ventana.removeChild(ventana.lastChild);

	ventana.classList.add("activa")

	var icono1=document.createElement("img")
	var icono2=document.createElement("img")
	var icono3=document.createElement("img")
	icono1.src="img/ico/masnn.png"
	icono2.src="img/ico/masnb.png"
	icono3.src="img/ico/masbb.png"
	ventana.appendChild(icono1)
	ventana.appendChild(icono2)
	ventana.appendChild(icono3)
  
	icono1.onclick=function(){
		consume(t,1)
		consume(t,1)
		consume(t,1)
		cria(t,0)
		cria(t,0)
		setTimeout(function(){empuja(t, 0, 1)},250)
		setTimeout(function(){empuja(t, 0, 1)},250)
		finHabilidad()
		ventana.classList.remove("activa")
	}
	
	icono2.onclick=function(){
		consume(t,1)
		consume(t,1)
		consume(t,1)
		cria(t, 0)
		cria(t, 2)
		setTimeout(function(){empuja(t, 0, 1)},250)
		setTimeout(function(){empuja(t, 2, 1)},250)
		finHabilidad()
		ventana.classList.remove("activa")
	}

	icono3.onclick=function(){
		consume(t,1)
		consume(t,1)
		consume(t,1)
		cria(t, 2)
		cria(t, 2)
		setTimeout(function(){empuja(t, 2, 1)},250)
		setTimeout(function(){empuja(t, 2, 1)},250)
		finHabilidad()
		ventana.classList.remove("activa")
	}
}

function retinens(t){
	if(poblacion(t)>6){
		purga(t)
	}
	else{
		menuRetinens(t)
		return
    }
	
	finHabilidad()
}

function menuRetinens(t){
	
	while (ventana.firstChild)
		ventana.removeChild(ventana.lastChild);

	ventana.classList.add("activa")

	var icono1=document.createElement("img")
	var icono2=document.createElement("img")

	icono1.src="img/ico/masnn.png"
	icono2.src="img/ico/empujatodo.png"

	ventana.appendChild(icono1)
	ventana.appendChild(icono2)
  
	icono1.onclick=function(){
		cria(t,0)
		cria(t,0)
		finHabilidad()
		ventana.classList.remove("activa")
	}
	
	icono2.onclick=function(){
		//setTimeout(function(){empuja(t, 0, 1)},250)
		empujaTodo(t, 0, 1)
		empujaTodo(t, 1, 1)
		empujaTodo(t, 2, 1)
		finHabilidad()
		ventana.classList.remove("activa")
	}
}

function collectiva(t){
	if(poblacion(t)>6){
		purga(t)
	}
	else{
		if(t.renacuajos[0].length>=3){
			menuCollectiva(t)
			return
		}
		else{
			for(var i=t.renacuajos[0].length;i>0;i--){
				consume(t,0)
			}
		}
    }
	
	finHabilidad()
}
	
function menuCollectiva(t){
	
	while (ventana.firstChild)
		ventana.removeChild(ventana.lastChild);

	ventana.classList.add("activa")

	var icono1=document.createElement("img")
	var icono2=document.createElement("img")

	icono1.src="img/ico/menosnnn.png"
	icono2.src="img/ico/menostodon.png"

	ventana.appendChild(icono1)
	ventana.appendChild(icono2)
  
	icono1.onclick=function(){
		consume(t,0)
		consume(t,0)
		consume(t,0)
		cria(t,1)
		cria(t,2)
		setTimeout(function(){empuja(t, 1, 1)},250)
		setTimeout(function(){empuja(t, 2, 1)},250)
		finHabilidad()
		ventana.classList.remove("activa")
	}
	
	icono2.onclick=function(){
		//setTimeout(function(){empuja(t, 0, 1)},250)
		for(var i=t.renacuajos[0].length;i>0;i--){
				consume(t,0)
			}
		finHabilidad()
		ventana.classList.remove("activa")
	}
}

function arlecchina(t){
	if(poblacion(t)>6){
		purga(t)
	}
	else{
		if(t.renacuajos[0].length>=1 && t.renacuajos[1].length>=1 && t.renacuajos[2].length>=1){
			cria(t,0)
			cria(t,1)
			cria(t,2)
			setTimeout(function(){empuja(t, 0, 1)},250)
			setTimeout(function(){empuja(t, 1, 1)},250)
			setTimeout(function(){empuja(t, 2, 1)},250)
		}
    }
	
	finHabilidad()
}

function massiva(t){
	if(poblacion(t)>6){
		purga(t)
	}
	else{
		if(t.renacuajos[0].length>=6){
			menuMassiva(t)
			return
		}
    }
	
	finHabilidad()
}

function menuMassiva(t){
	while (ventana.firstChild)
		ventana.removeChild(ventana.lastChild);

	ventana.classList.add("activa")

	var icono1=document.createElement("img")
	var icono2=document.createElement("img")

	icono1.src="img/ico/mast.png"
	icono2.src="img/ico/masb.png"

	ventana.appendChild(icono1)
	ventana.appendChild(icono2)
  
	icono1.onclick=function(){
		cria(t,1)
		setTimeout(function(){empuja(t, 1, 1)},250)
		finHabilidad()
		ventana.classList.remove("activa")
	}
	
	icono2.onclick=function(){
		cria(t,2)
		setTimeout(function(){empuja(t, 2, 1)},250)
		finHabilidad()
		ventana.classList.remove("activa")
	}
	
}

function serrata(t){
	if(poblacion(t)>6){
		purga(t)
	}
	else{
		cria(t,0)
		cria(t,0)
		setTimeout(function(){empuja(t, 0, 0)},250)
		setTimeout(function(){empuja(t, 0, 2)},250)
	}
	
	finHabilidad()
	
}

function scalena(t){
	if(poblacion(t)>6){
		purga(t)
	}
	else{
		if(t.renacuajos[0].length>=3){
			consume(t,0)
			cria(t,1)
			
			setTimeout(function(){empuja(t, 1, 1)},250)
			
		}
	}
	
	finHabilidad()
	
}

function xerocephalica(t){
	if(poblacion(t)>6){
		purga(t)
	}
	else{
		if(t.renacuajos[0].length>=1 && t.renacuajos[1].length>=1){
			
			cria(t,2)
			
			
			empujaTodo(t, 0, 1)
			empujaTodo(t, 1, 1)
			empujaTodo(t, 2, 1)

		}
	}
	
	finHabilidad()
	
}

function stator(t){
	if(poblacion(t)>6){
		purga(t)
	}
	else{
		if(t.renacuajos[2].length>=1){
			menuStator(t)
			return
		}
		else{
			cria(t,0)
			
			setTimeout(function(){empuja(t, 0, 1)},250)
			
		}
			
	}
	finHabilidad()
}

function menuStator(t){
	while (ventana.firstChild)
		ventana.removeChild(ventana.lastChild);

	ventana.classList.add("activa")

	var icono1=document.createElement("img")
	var icono2=document.createElement("img")

	icono1.src="img/ico/masn.png"
	icono2.src="img/ico/mast.png"

	ventana.appendChild(icono1)
	ventana.appendChild(icono2)
  
	icono1.onclick=function(){
		cria(t,0)
		setTimeout(function(){empuja(t, 0, 1)},250)
		finHabilidad()
		ventana.classList.remove("activa")
	}
	
	icono2.onclick=function(){
		cria(t,1)
		setTimeout(function(){empuja(t, 1, 1)},250)
		finHabilidad()
		ventana.classList.remove("activa")
	}
	
}