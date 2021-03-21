function toggleFullScreen() {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  }
  else {
    cancelFullScreen.call(doc);
  }
}

function empiezaArrastre(coste,e){
	//console.log(coste)
	//console.log(e)
	if(!compraActiva) return
  
	arrastrando=true
	var t=e
	if(e.touches)
		t=e.touches[0]
	
	var i=t.target.tipo

	ayudante.tipo=i;
	ayudante.direc=0;
	ayudante.setAttribute("direccion", 0)
	ayudante.rot=0
	
	ayudante.style.transform=""
	ayudante.src=originales[i].img
	ayudante.fasey=t.clientY-t.target.clientY
	ayudante.fasex=t.clientX-t.target.clientX
	
	ayudante.onclick=ayudante.ontouchstart=function(){
		//console.log(ayudante.direc)
		ayudante.direc++
		ayudante.direc=((ayudante.direc%4)+4)%4
		ayudante.setAttribute("direccion", ayudante.direc)
		//console.log(ayudante.getAttribute("direccion"))
	}

	
	document.onmousemove=document.ontouchmove=moverAyudante
	document.onmouseup=document.ontouchend=function(e){colocarAyudante(coste,e)}
	document.onmouseleave=document.ontouchcancel=finAyudante

	ayudante.posx=-1
	ayudante.posy=-1

	actualizar()
}

function colocarAyudante(coste, e){
	arrastrando=false
	e.preventDefault()
	if(e.touches && e.touches.length>0)
		return
	
	if(ayudante.posx>=0 && ayudante.posy>=0){
		botondia.value="✓"
		botondia.disabled=false
		botondia.onclick=botondia.ontouchstart=function(){
			ayudante.classList.remove("activo")
			botondia.disabled=true
			setTimeout(function(){botondia.value="▶"},500)
			creaAscidia(ayudante.tipo, ayudante.posx, ayudante.posy, ayudante.direc)
			
			//// cobros
			
			if(coste=="cualquiera"){
				var d0=pagante.renacuajos[0].length>0
				var d1=pagante.renacuajos[1].length>0
				var d2=pagante.renacuajos[2].length>0
				if(d0+d1+d2>1){ //mas de un color disponible, montar ventana
					
					while (ventana.firstChild)
						ventana.removeChild(ventana.lastChild);

					ventana.classList.add("activa")

					var icono1=document.createElement("img")
					var icono2=document.createElement("img")
					var icono3=document.createElement("img")
					
					icono1.src="img/ico/n.png"
					icono2.src="img/ico/t.png"
					icono3.src="img/ico/b.png"

					if(d0) ventana.appendChild(icono1)
					if(d1) ventana.appendChild(icono2)
					if(d2) ventana.appendChild(icono3)

					icono1.onclick=icono1.ontouchstart=function(){consume(pagante,0); ventana.classList.remove("activa");finHabilidad()}
					icono2.onclick=icono2.ontouchstart=function(){consume(pagante,1); ventana.classList.remove("activa");finHabilidad()}
					icono3.onclick=icono3.ontouchstart=function(){consume(pagante,2); ventana.classList.remove("activa");finHabilidad()}

				}
				else{ //un solo color, cobrarlo
					if(d0) consume(pagante,0)
					if(d1) consume(pagante,1)
					if(d2) consume(pagante,2)
					finHabilidad()
				}
				
			}
				
			else{
				for(var i=0;i<coste.length;i++)
					for(var j=0;j<coste[i];j++)
						consume(pagante,i)
				finHabilidad()		
			}
			
			///////////
			
			actualizar()
			botondia.onclick=botondia.ontouchstart=dia
			document.onmousemove=document.ontouchmove=null
			document.onmouseup=document.ontouchend=null
			document.onmouseleave=document.ontouchcancel=null
			contraventana.onclick=contraventana.ontouchstart=null
			quitarFiltros()
			
			compraActiva=false
			//finHabilidad()
		}
    
		actualizar()
	}
}

function finAyudante(e){
	e.preventDefault()
	
	ayudante.classList.remove("activo")
	
	document.onmousemove=document.ontouchmove=null
	document.onmouseup=document.ontouchend=null
	document.onmouseleave=document.ontouchcancel=null
	
}

function moverAyudante(e){
  
	var t=e
	if(e.touches)
		t=e.touches[0]
	
	e.preventDefault()
	

	if(!e.touches || e.touches.length==1){
		if(!e.touches && !arrastrando) return
	
		var l=Math.min(window.innerWidth, window.innerHeight)*.3
		var f=Math.min(window.innerWidth, window.innerHeight)/20
		
		for(var i=0;i<3;i++)
			for(var j=0;j<3;j++)
				if(t.clientX>=(f+i*l) && t.clientX<(f+(i+1)*l) && t.clientY>=(f+j*l) && t.clientY<(f+(j+1)*l)){
					ayudante.classList.add("activo")
					ayudante.style.top=1.5*f+j*l+"px"
					ayudante.style.left=1.5*f+i*l+"px"
					ayudante.posx=i
					ayudante.posy=j
					return
				}
	}
  
	ayudante.classList.remove("activo")	
	ayudante.posx=-1
	ayudante.posy=-1
}

function girar(t){
	ventana.classList.remove("activa")
	//console.log("girando")
	for(let i=0;i<lista.length;i++){
		lista[i].dom.onclick=lista[i].dom.ontouchstart=function(e){
			
			e.stopPropagation()
			ayudante.style=""
			ayudante.classList.add("ascidia")
			ayudante.posx=lista[i].posx
			ayudante.posy=lista[i].posy
			ayudante.setAttribute("posy",lista[i].posy)
			ayudante.setAttribute("posx",lista[i].posx)
			
			ayudante.classList.add("activo")
			ayudante.src=lista[i].img.src;
			
			ayudante.direc=lista[i].dir
			ayudante.setAttribute("direccion",ayudante.direc)
		
			botondia.value="✓"
			botondia.disabled=false
			botondia.onclick=botondia.ontouchstart=function(){
				
				
				console.log("a comprar")
				pagaAccion()
				
				////////
				
				e.stopPropagation()
				ayudante.classList.remove("activo")
				botondia.disabled=true
				setTimeout(function(){botondia.value="▶"},500)
				lista[i].dir=ayudante.direc
				lista[i].img.setAttribute("direccion", lista[i].dir)
				botondia.onclick=botondia.ontouchstart=dia
        
				for(var j=0;j<lista.length;j++)
					lista[j].dom.onclick=lista[j].dom.ontouchstart=null
				
				document.onclick=document.ontouchstart=null
				ayudante.onclick=ayudante.ontouchstart=null
				actualizar()
				//finHabilidad()

			}
		}
	}
	
	ayudante.onclick=ayudante.ontouchstart=function(e){
		e.stopPropagation()
		e.preventDefault()
		ayudante.direc=(ayudante.direc+1)%4
		ayudante.setAttribute("direccion",ayudante.direc)

		botondia.value="✓"
		botondia.disabled=false
		botondia.onclick=botondia.ontouchstart=function(e,t){
			
			pagaAccion()
			
			e.stopPropagation()
			ayudante.classList.remove("activo")
			botondia.disabled=true
			setTimeout(function(){botondia.value="▶"},500)
			lista[buscaAscidia(ayudante.posx, ayudante.posy)].dir=ayudante.direc
			lista[buscaAscidia(ayudante.posx, ayudante.posy)].img.setAttribute("direccion", ayudante.direc)
			botondia.onclick=botondia.ontouchstart=dia
	
			for(var j=0;j<lista.length;j++)
				lista[j].dom.onclick=lista[j].dom.ontouchstart=null
			
			document.onclick=document.ontouchstart=null
			ayudante.onclick=ayudante.ontouchstart=null
			actualizar()
			//finHabilidad()

		}

	}
	
	document.onclick=document.ontouchstart=function(e){
		e.stopPropagation()
		botondia.value="×"
		botondia.disabled=false
		botondia.onclick=botondia.ontouchstart=function(){
			ayudante.classList.remove("activo")
			ventana.classList.add("activa")
			ayudante.onclick=ayudante.ontouchstart=null
			document.onclick=document.ontouchstart=null
			botondia.disabled=true
			setTimeout(function(){botondia.value="▶"},500)
			botondia.onclick=botondia.ontouchstart=dia

			for(let i=0;i<lista.length;i++)
				lista[i].dom.onclick=lista[i].dom.ontouchstart=null
		}
	}
}

function mover(){
	ventana.classList.remove("activa")
	
	for(let i=0;i<lista.length;i++){
		lista[i].dom.onmousedown=lista[i].dom.ontouchstart=function(e){
			//botondia.style.background="red"
			arrastrando=true
			//e.stopPropagation()
			//e.preventDefault()
			ayudante.originx=lista[i].posx
			ayudante.originy=lista[i].posy
			ayudante.style=""
			ayudante.setAttribute("direccion", lista[i].dir)
			ayudante.classList.add("ascidia")
			ayudante.setAttribute("posy",lista[i].posy)
			ayudante.setAttribute("posx",lista[i].posx)
			//ayudante.classList.remove("activo")
			//ayudante.classList.add("activo")
			ayudante.src=lista[i].img.src;
			
			botondia.value="×"
			botondia.disabled=false
			ayudante.classList.remove("activo")
			botondia.onclick=botondia.ontouchstart=function(){
				botondia.disabled=true
				setTimeout(function(){botondia.value="▶"},500)
				botondia.onclick=botondia.ontouchstart=dia
				ventana.classList.add("activa")
				ayudante.onclick=ayudante.ontouchstart=null
				contraventana.onclick=contraventana.ontouchstart=null
				document.onmousemove=document.ontouchmove=null
				document.onmouseup=document.ontouchend=null
				for(let i=0;i<lista.length;i++)
					lista[i].dom.onmousedown=lista[i].dom.ontouchstart=null
			}
			
			// botondia.value="✓"
			// botondia.disabled=false
			// botondia.onclick=botondia.ontouchstart=function(){
				// pagaAccion()
				// var temp=lista[i]
				// //e.stopPropagation()
				// ayudante.classList.remove("activo")
				// botondia.disabled=true
				// setTimeout(function(){botondia.value="▶"},500)
				// console.log(ayudante.posx, ayudante.posy, buscaAscidia(ayudante.posx, ayudante.posy))
				// if(buscaAscidia(ayudante.posx, ayudante.posy)>=0){
					// quitaAscidia(buscaAscidia(ayudante.posx, ayudante.posy))
					
				// }
				// temp.posx=ayudante.posx
				// temp.posy=ayudante.posy
				// temp.img.setAttribute("posx", temp.posx)
				// temp.img.setAttribute("posy", temp.posy)
				// for(var j=0;j<2;j++)
					// for(var k=0;k<temp.renacuajos[j].length;k++){
						// temp.renacuajos[j][k].setAttribute("posx", temp.posx)
						// temp.renacuajos[j][k].setAttribute("posy", temp.posy)
					// }
				// botondia.onclick=botondia.ontouchstart=dia
        
				// for(var j=0;j<lista.length;j++)
					// lista[j].dom.onmousedown=lista[j].dom.ontouchstart=null
				
				// document.onmousemove=document.ontouchmove=null
				// document.onmouseup=document.ontouchend=null
				// contraventana.onclick=contraventana.ontouchstart=null
				
				// actualizar()
				// //finHabilidad()
			// }
		}
	}
	
	document.onmousemove=document.ontouchmove=function(e){
		//console.log("te gusta el mueve mueve")
		if(!arrastrando) return
		//console.log("move")
		//e.stopPropagation()
		//console.log(e)
		var t=e
			if(e.touches)
		t=e.touches[0]
		e.stopPropagation()
		e.preventDefault()
		
		var l=Math.min(window.innerWidth, window.innerHeight)*.3
		var f=Math.min(window.innerWidth, window.innerHeight)/20
		
		for(var i=0;i<3;i++)
			for(var j=0;j<3;j++)
				if(
				(i==ayudante.originx && j==ayudante.originy-1) || //arriba
				(i==ayudante.originx+1 && j==ayudante.originy) || //derecha
				(i==ayudante.originx && j==ayudante.originy+1) || //abajo
				(i==ayudante.originx-1 && j==ayudante.originy)) //izq
				if(t.clientX>=(f+i*l) && t.clientX<(f+(i+1)*l) && t.clientY>=(f+j*l) && t.clientY<(f+(j+1)*l)){
					console.log(e.target)
					ayudante.classList.add("activo")
					ayudante.style.top=1.5*f+j*l+"px"
					ayudante.style.left=1.5*f+i*l+"px"
					ayudante.posx=i
					ayudante.posy=j
					
					botondia.value="✓"
					botondia.disabled=false
					botondia.onclick=botondia.ontouchstart=function(){
						pagaAccion()
						var temp=lista[buscaAscidia(e.target.getAttribute("posx"), e.target.getAttribute("posy"))]
						console.log(temp)
						//e.stopPropagation()
						ayudante.classList.remove("activo")
						botondia.disabled=true
						setTimeout(function(){botondia.value="▶"},500)
						//console.log(ayudante.posx, ayudante.posy, buscaAscidia(ayudante.posx, ayudante.posy))
						if(buscaAscidia(ayudante.posx, ayudante.posy)>=0){
							//console.log(buscaAscidia(ayudante.posx, ayudante.posy))
							quitaAscidia(buscaAscidia(ayudante.posx, ayudante.posy))
							
						}
						temp.posx=ayudante.posx
						temp.posy=ayudante.posy
						temp.img.setAttribute("posx", temp.posx)
						temp.img.setAttribute("posy", temp.posy)
						for(var j=0;j<2;j++)
							for(var k=0;k<temp.renacuajos[j].length;k++){
								temp.renacuajos[j][k].setAttribute("posx", temp.posx)
								temp.renacuajos[j][k].setAttribute("posy", temp.posy)
							}
						botondia.onclick=botondia.ontouchstart=dia
				
						for(var j=0;j<lista.length;j++)
							lista[j].dom.onmousedown=lista[j].dom.ontouchstart=null
						
						document.onmousemove=document.ontouchmove=null
						document.onmouseup=document.ontouchend=null
						contraventana.onclick=contraventana.ontouchstart=null
						
						actualizar()
						//finHabilidad()
					}
		
					return
				}
	}
	
	document.onmouseup=document.ontouchend=function(e){
		//console.log("up")
		arrastrando=false;
		e.stopPropagation()
		e.preventDefault()
		
	}
	
	contraventana.onclick=contraventana.ontouchstart=function(){
		//if(arrastrando) return
		//console.log(e.target)
		//e.stopPropagation()
		botondia.value="×"
		botondia.disabled=false
		ayudante.classList.remove("activo")
		botondia.onclick=botondia.ontouchstart=function(){
			botondia.disabled=true
			setTimeout(function(){botondia.value="▶"},500)
			botondia.onclick=botondia.ontouchstart=dia
			ventana.classList.add("activa")
			ayudante.onclick=ayudante.ontouchstart=null
			contraventana.onclick=contraventana.ontouchstart=null
			document.onmousemove=document.ontouchmove=null
			document.onmouseup=document.ontouchend=null
			for(let i=0;i<lista.length;i++)
				lista[i].dom.onmousedown=lista[i].dom.ontouchstart=null
		}
	}
	contraventana.onclick()
}


function pagaAccion(){
	
	var d0=pagante.renacuajos[0].length>0
	var d1=pagante.renacuajos[1].length>0
	var d2=pagante.renacuajos[2].length>0
	if(d0+d1+d2>1){ //mas de un color disponible, montar ventana
		//console.log("multicolor")
		while (ventana.firstChild)
			ventana.removeChild(ventana.lastChild);

		ventana.classList.add("activa")

		var icono1=document.createElement("img")
		var icono2=document.createElement("img")
		var icono3=document.createElement("img")
		
		icono1.src="img/ico/n.png"
		icono2.src="img/ico/t.png"
		icono3.src="img/ico/b.png"

		if(d0) ventana.appendChild(icono1)
		if(d1) ventana.appendChild(icono2)
		if(d2) ventana.appendChild(icono3)

		icono1.onclick=icono1.ontouchstart=function(){consume(pagante,0); ventana.classList.remove("activa");finHabilidad()}
		icono2.onclick=icono2.ontouchstart=function(){consume(pagante,1); ventana.classList.remove("activa");finHabilidad()}
		icono3.onclick=icono3.ontouchstart=function(){consume(pagante,2); ventana.classList.remove("activa");finHabilidad()}

	}
	else{ //un solo color, cobrarlo
		//console.log("un color")
		if(d0) consume(pagante,0)
		if(d1) consume(pagante,1)
		if(d2) consume(pagante,2)
		finHabilidad()
	}
}