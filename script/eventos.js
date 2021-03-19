function empiezaArrastre(coste,e){
	console.log(coste)
	console.log(e)
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
	
	ayudante.onclick=function(){
		//console.log(ayudante.direc)
		ayudante.direc++
		ayudante.direc=((ayudante.direc%4)+4)%4
		ayudante.setAttribute("direccion", ayudante.direc)
		//console.log(ayudante.getAttribute("direccion"))
	}
	
	contraventana.onclick=function(e){
		e.stopPropagation()
		e.preventDefault()
		document.onmouseup=null
		document.onmouseleave=null
		document.onmousemove=null
		ayudante.classList.remove("activo")
		
		botondia.value="×3"
		botondia.disabled=false
		
		botondia.onclick=function(){
			botondia.disabled=true
			botondia.value="▶"
			botondia.onclick=dia
			ventana.classList.add("activa")
			ayudante.onclick=null
			contraventana.onclick=null
			document.onmousemove=null
			document.onmouseup=null
			document.onmouseleave=null
			quitarFiltros()
		}
		
	}
	
	document.onmousemove=moverAyudante
	document.onmouseup=function(e){colocarAyudante(coste,e)}
	document.onmouseleave=finAyudante

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
		botondia.onclick=function(){
			ayudante.classList.remove("activo")
			botondia.disabled=true
			botondia.value="▶"
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

					icono1.onclick=function(){consume(pagante,0); ventana.classList.remove("activa");finHabilidad()}
					icono2.onclick=function(){consume(pagante,1); ventana.classList.remove("activa");finHabilidad()}
					icono3.onclick=function(){consume(pagante,2); ventana.classList.remove("activa");finHabilidad()}

				}
				else{ //un solo color, cobrarlo
					if(d0) consume(pagante,0)
					if(d1) consume(pagante,1)
					if(d2) consume(pagante,2)
					finHabilidad()
				}
				
			}
				
			else
				for(var i=0;i<coste.length;i++)
					for(var j=0;j<coste[i];j++)
						consume(pagante,i)
			
			///////////
			
			actualizar()
			botondia.onclick=dia
			document.onmousemove=null
			document.onmouseup=null
			document.onmouseleave=null
			contraventana.onclick=null
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
	
	document.onmousemove=null
	document.onmouseup=null
	document.onmouseleave=null
	
}

function moverAyudante(e){
  
	var t=e
	if(e.touches)
		t=e.touches[0]
	else
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

function girar(){
	ventana.classList.remove("activa")
  
	for(let i=0;i<lista.length;i++){
		lista[i].dom.onclick=function(e){
			
			e.stopPropagation()
			ayudante.style=""
			ayudante.classList.add("ascidia")
			ayudante.posx=lista[i].posx
			ayudante.posy=lista[i].posy
			ayudante.setAttribute("posy",lista[i].posy)
			ayudante.setAttribute("posx",lista[i].posx)
			
			ayudante.classList.add("activo")
			ayudante.src=lista[i].img.src;
			
			ayudante.direc=lista[i].dir+1
			ayudante.setAttribute("direccion",ayudante.direc)
		
			botondia.value="✓"
			botondia.disabled=false
			botondia.onclick=function(){
				
				e.stopPropagation()
				ayudante.classList.remove("activo")
				botondia.disabled=true
				botondia.value="▶"
				lista[i].dir=ayudante.direc
				lista[i].img.setAttribute("direccion", lista[i].dir)
				botondia.onclick=dia
        
				for(var j=0;j<lista.length;j++)
					lista[j].dom.onclick=null
				
				document.onclick=null
				ayudante.onclick=null
				actualizar()
				finHabilidad()

			}
		}
	}
	
	ayudante.onclick=function(e){
		e.stopPropagation()
		ayudante.direc=(ayudante.direc+1)%4
		ayudante.setAttribute("direccion",ayudante.direc)

		botondia.value="✓"
		botondia.disabled=false
		botondia.onclick=function(){
			
			e.stopPropagation()
			ayudante.classList.remove("activo")
			botondia.disabled=true
			botondia.value="▶"
			lista[buscaAscidia(ayudante.posx, ayudante.posy)].dir=ayudante.direc
			lista[buscaAscidia(ayudante.posx, ayudante.posy)].img.setAttribute("direccion", ayudante.direc)
			botondia.onclick=dia
	
			for(var j=0;j<lista.length;j++)
				lista[j].dom.onclick=null
			
			document.onclick=null
			ayudante.onclick=null
			actualizar()
			finHabilidad()

		}

	}
	
	document.onclick=function(e){
		e.stopPropagation()
		botondia.value="×1"
		botondia.disabled=false
		botondia.onclick=function(){
			ayudante.classList.remove("activo")
			ventana.classList.add("activa")
			ayudante.onclick=null
			document.onclick=null
			botondia.disabled=true
			botondia.value="▶"
			botondia.onclick=dia

			for(let i=0;i<lista.length;i++)
				lista[i].dom.onclick=null
		}
	}
}

function mover(){
	ventana.classList.remove("activa")
	
	for(let i=0;i<lista.length;i++){
		lista[i].dom.onmousedown=function(e){
			arrastrando=true
			e.stopPropagation()
			e.preventDefault()
			ayudante.originx=lista[i].posx
			ayudante.originy=lista[i].posy
			ayudante.style=""
			ayudante.setAttribute("direccion", lista[i].dir)
			ayudante.classList.add("ascidia")
			ayudante.setAttribute("posy",lista[i].posy)
			ayudante.setAttribute("posx",lista[i].posx)
			
			ayudante.classList.add("activo")
			ayudante.src=lista[i].img.src;
			
			botondia.value="✓"
			botondia.disabled=false
			botondia.onclick=function(){
				var temp=lista[i]
				e.stopPropagation()
				ayudante.classList.remove("activo")
				botondia.disabled=true
				botondia.value="▶"
				if(buscaAscidia(ayudante.posx, ayudante.posy)>=0){
					quitaAscidia(ayudante.posx, ayudante.posy)
					
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
				botondia.onclick=dia
        
				for(var j=0;j<lista.length;j++)
					lista[j].dom.onmousedown=null
				
				document.onmousemove=null
				document.onmouseup=null
				contraventana.onclick=null
				
				actualizar()
				finHabilidad()
			}
		}
	}
	
	document.onmousemove=function(e){
		if(!arrastrando) return
		//console.log("move")
		//e.stopPropagation()
		//console.log(e)
		var t=e
			if(e.touches)
		t=e.touches[0]
		
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
					
					ayudante.classList.add("activo")
					ayudante.style.top=1.5*f+j*l+"px"
					ayudante.style.left=1.5*f+i*l+"px"
					ayudante.posx=i
					ayudante.posy=j
					return
				}
	}
	
	document.onmouseup=function(e){
		//console.log("up")
		arrastrando=false;
		e.stopPropagation()
		e.preventDefault()
		
	}
	
	contraventana.onclick=function(){
		//if(arrastrando) return
		//console.log(e.target)
		//e.stopPropagation()
		botondia.value="×2"
		botondia.disabled=false
		ayudante.classList.remove("activo")
		botondia.onclick=function(){
			botondia.disabled=true
			botondia.value="▶"
			botondia.onclick=dia
			ventana.classList.add("activa")
			ayudante.onclick=null
			contraventana.onclick=null
			document.onmousemove=null
			document.onmouseup=null
			for(let i=0;i<lista.length;i++)
				lista[i].dom.onmousedown=null
		}
	}
	contraventana.onclick()
}
