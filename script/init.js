window.addEventListener("touchstart", touchHandler, true);
window.addEventListener("touchmove", touchHandler, true);
window.addEventListener("touchend", touchHandler, true);
window.addEventListener("touchcancel", touchHandler, true);

onresize=function(){
	pantalla()
	actualizar()
}

onload=function(){
	cargaOpciones()
	//init()
	pantalla()
	botondia.style.display="none"
	botondia.disabled=true;
	creaAscidiasIniciales()
	//cargaMenu()
	//actualizar()
}



//////// variables !? ////////
var colElegidas=[]
var originales=[]
var calcs=["calc(50% - 2.5cm - 5.05cm + 0.5cm)","calc(50% - 2.5cm + 0.5cm)","calc(50% - 2.5cm + 5.05cm + 0.5cm)"]
var posluz={x:0, y:0}
var lista=[];
var start=new Date()
var ascidia_coord
var renacuajo_coord
var pagante
var ascidia_lado
var ascidia_bradius
var casilla_lado
var tablero_padding
var renacuajo_lado
var renacuajo_bradius
var renacuajo_avance
var sufijo
var casilla_coord
var turno=1
var compraActiva=false
var arrastrando=false
//////////////////////////////

function touchHandler(event){
    if(event.touches.length > 1){
        event.preventDefault()
        event.stopPropagation()
	}
}

function init(){
	for(let i=0;i<4;i++){
		originales.push(ascBasicas[i])
		originales[i].coste="cualquiera"
		originales[i].clase=0
	}

	var numeros=[]

	
	//console.log(+document.formacion.selectorAscidias.value)
	if(+document.formacion.selectorAscidias.value==0)
		//shuffle(ascEspeciales)
		numeros=[0,1,2,3,4,5]

	if(+document.formacion.selectorAscidias.value==1){
		numeros=[0,1,2,3,4,5]
		shuffle(numeros)
	}

	if(+document.formacion.selectorAscidias.value==2){
		numeros=[6,7,8,9,10,11]
		shuffle(numeros)
	}

	if(+document.formacion.selectorAscidias.value==3){
		numeros=[0,1,2,3,4,5,6,7,8,9,10,11]
		shuffle(numeros)		
	}
		
	originales.push(ascEspeciales[numeros[0]])
	originales[4].coste=[1,0,0]
	originales[4].clase=1

	originales.push(ascEspeciales[numeros[1]])
	originales[5].coste=[2,0,0]
	originales[5].clase=1
	
	originales.push(ascEspeciales[numeros[2]])
	originales[6].coste=[3,0,0]
	originales[6].clase=1
	
	originales.push(ascEspeciales[numeros[3]])
	originales[7].coste=[0,1,0]
	originales[7].clase=1
	
	originales.push(ascEspeciales[numeros[4]])
	originales[8].coste=[0,2,0]
	originales[8].clase=1
	
	originales.push(ascEspeciales[numeros[5]])
	originales[9].coste=[0,0,1]
	originales[9].clase=1
	
	shuffle(colonias)
}

function pantalla(){
	if(window.innerWidth>window.innerHeight){
		document.body.classList.remove("vertical")
		document.body.classList.add("horizontal")
	}
	else{
		document.body.classList.remove("horizontal")		
		document.body.classList.add("vertical")
	}
}

function actualizar(){
	for(var i=0;i<lista.length;i++){
		
		// lista[i].dom.classList.remove("top0", "top1", "top2", "left0", "left1", "left2")
		// lista[i].dom.classList.add("top"+lista[i].posy, "left"+lista[i].posx)
		
		// lista[i].dom.firstChild.style.transform="rotate("+lista[i].dir*90+"deg)";
		
		var parcial=0
		var total=lista[i].renacuajos[0].length+lista[i].renacuajos[1].length+lista[i].renacuajos[2].length

		total=6000/total
		
		for(var k=0;k<=2;k++)
			for(var j=0;j<lista[i].renacuajos[k].length;j++){
			
				lista[i].renacuajos[k][j].classList.remove("top0", "top1", "top2", "left0", "left1", "left2")
				lista[i].renacuajos[k][j].classList.add("top"+lista[i].posy, "left"+lista[i].posx)
				
				lista[i].renacuajos[k][j].style.animationDelay=parcial-lista[i].renacuajos[k][j].start-6000+"ms"
				parcial+=total
			}
	}
}

var quienArrastro=null

function creaAscidiasIniciales(){
	
	
	var a=document.createElement("div")
	a.classList.add("ascidia")
	var img1=document.createElement("img")
	var img2=document.createElement("img")
	img1.src=ascProprias[0].img;
	img1.setAttribute("posx",-1);
	img1.setAttribute("posy",-1);
	img1.classList.add("inicialbasica")
	a.appendChild(img1)
	var temp={
		habilidad:ascProprias[0].habilidad,
		posx:-1,
		posy:-1,
		dir:0,
		renacuajos:[[],[],[]],
		dom:a,
		img:img1
	}
	img1.padre=temp
	lista.push(temp)
	ascidias.appendChild(a)

	a=document.createElement("div")
	a.classList.add("ascidia")
	img2=document.createElement("img")
	img2.src=ascProprias[1].img;
	img2.setAttribute("posx",-1);
	img2.setAttribute("posy",-1);
	img2.classList.add("inicialhabilis")
	a.appendChild(img2)
	temp={
		habilidad:ascProprias[1].habilidad,
		posx:-1,
		posy:-1,
		dir:0,
		renacuajos:[[],[],[]],
		dom:a,
		img:img2
	}
	img2.padre=temp
	lista.push(temp)
	ascidias.appendChild(a)
	
	img1.onmousedown=img1.ontouchstart=img2.onmousedown=img2.ontouchstart=function(e){
		e.preventDefault()
		e.stopPropagation()

		if(e.touches)
			quienArrastro=e.touches[0].target
		else
			quienArrastro=e.target
			
		lista[0].img.onmouseup=lista[0].img.ontouchend=lista[1].img.onmouseup=lista[1].img.ontouchend=function(){
			e.preventDefault()
			e.stopPropagation()
			var t=e
			if(e.touches)
				t=e.touches[0]
			
			//console.log("entro aqui")
			if(quienArrastro.moviendo)
				quienArrastro.moviendo=false
			else{
				
			quienArrastro.padre.dir++
			quienArrastro.padre.dir=((quienArrastro.padre.dir%4)+4)%4
			quienArrastro.setAttribute("direccion", quienArrastro.padre.dir)
			}
			
		}
		
		document.onmousemove=document.ontouchmove=function(e){
			
			e.preventDefault()
			e.stopPropagation()
			var t=e
			if(e.touches)
				t=e.touches[0]
			//console.log("mueve", t.target)
			quienArrastro.moviendo=true
				
			var l=Math.min(window.innerWidth, window.innerHeight)*.3
			var f=Math.min(window.innerWidth, window.innerHeight)/20
			//console.log(t.clientX, t.clientY)
			for(var i=0;i<3;i++)
				for(var j=0;j<3;j++)
					if(buscaAscidia(i,j)<0)
					if(t.clientX>=(f+i*l) && t.clientX<(f+(i+1)*l) && t.clientY>=(f+j*l) && t.clientY<(f+(j+1)*l)){
						if(window.navigator.vibrate)
							window.navigator.vibrate(100)
						/*ayudante.classList.add("activo")
						ayudante.style.top=1.5*f+j*l+"px"
						ayudante.style.left=1.5*f+i*l+"px"*/
						//console.log(quienArrastro, quienArrastro.padre)
						quienArrastro.setAttribute("posx", i)
						quienArrastro.setAttribute("posy", j)
						quienArrastro.padre.posx=i
						quienArrastro.padre.posy=j
						quienArrastro.classList.remove("inicialbasica", "inicialhabilis")
						quienArrastro.colocada=true
						//ayudante.posx=i
						//ayudante.posy=j
						return
					}
		}
		document.onmouseup=document.ontouchend=function(){
			document.onmousemove=document.ontouchmove=null
			lista[0].img.moviendo=lista[1].img.moviendo=false
			if(lista[0].img.colocada && lista[1].img.colocada){
				botondia.style.display=null
				botondia.onclick=botondia.ontouchstart=function(){
					botondia.value="▶"
					lista[0].img.onmousedown=lista[0].img.ontouchstart=lista[1].img.onmousedown=lista[1].img.ontouchstart=null
					lista[0].img.onmouseup=lista[0].img.ontouchend=lista[1].img.onmouseup=lista[1].img.ontouchend=null
					document.onmouseup=document.ontouchend=null
					botondia.onclick=botondia.ontouchstart=dia
					console.log("dia activado")
				}
				botondia.disabled=false
				
				//console.log("las dos, activa el boton!") //al activar el boton quitar img1.ontouchstart, img1.onmousedown, img2..., img2..., document mouseup, document touchend
			}
		}
	}
}



function cargaMenu(){
	init()
	for(let i=0;i<originales.length;i++){
		var contenedor=document.createElement("div")
		contenedor.classList.add("contenedorCompra")
		contenedor.index=i
		if(originales[i].clase==0)
			contenedor.classList.add("basica")
		else
			if(originales[i].clase==1)
				contenedor.classList.add("especial")
    
		var coste=document.createElement("div")
		coste.classList.add("costeCompra")
		if(originales[i].coste=="cualquiera"){
			var renacua=document.createElement("div")
			renacua.classList.add("renacuajo")
			renacua.classList.add("negronaranjablanco")
			coste.appendChild(renacua)
		}
		else{
			for(var j=0;j<originales[i].coste[0];j++){
				var renacua=document.createElement("div")
				renacua.classList.add("renacuajo")
				renacua.classList.add("negro")
				coste.appendChild(renacua)
			}
		
			for(var j=0;j<originales[i].coste[1];j++){
				var renacua=document.createElement("div")
				renacua.classList.add("renacuajo")
				renacua.classList.add("naranja")
				coste.appendChild(renacua)
			}
      
			for(var j=0;j<originales[i].coste[2];j++){
				var renacua=document.createElement("div")
				renacua.classList.add("renacuajo")
				renacua.classList.add("blanco")
				coste.appendChild(renacua)
			}
		}
    
		var img=document.createElement("img")
		img.src=originales[i].img
		img.tipo=i
		contenedor.imagen=img
		//img.onmousedown=empiezaArrastre
		//img.ontouchstart=empiezaArrastre
		footer.appendChild(contenedor)
		contenedor.appendChild(coste)
		contenedor.appendChild(img)
	}
	
	var indexColonia=document.formacion.selectorColonias.value
	
	if(cantidadColonias.value>0 && cantidadColonias.value<=10)
		cantidadColonias.value=Math.floor(cantidadColonias.value)
	else
		cantidadColonias.value=3
		
	//console.log(indexColonia)
	
	shuffle(multiColonias[indexColonia])
	
	for(let i=0;i<cantidadColonias.value;i++) // 3 colonias
		colonias.push({
			imagen:multiColonias[indexColonia][i].imagen, 
			coste:[multiColonias[indexColonia][i].coste[0],multiColonias[indexColonia][i].coste[1],multiColonias[indexColonia][i].coste[2]]})
	
	for(let i=0;i<cantidadColonias.value;i++){ //3 colonias
		var contenedor=document.createElement("div")
		contenedor.classList.add("contenedorColonia")
		contenedor.index=i;
		var img=document.createElement("img")
		img.src=colonias[i].imagen
		footer.appendChild(contenedor)
		contenedor.appendChild(img)
/*		if(i==1){			
			var conseguido=document.createElement("span")
			conseguido.classList.add("conseguido")
			conseguido.textContent=123
			contenedor.appendChild(conseguido)
			contenedor.classList.add("comprado")
		}*/
	}
	
	var div=document.createElement("div")
	div.classList.add("separador")
	div.textContent="."
	footer.appendChild(div)
	
	if("scrollTo" in footer)
		if(window.innerWidth>window.innerHeight)
			footer.scrollTo(0, footer.scrollHeight/2 - footer.offsetHeight/2)
		else  
			footer.scrollTo(footer.scrollWidth/2 - footer.offsetWidth/2, 0)
}

function compraAscidia(t){
	pagante=t
	var cc=document.getElementsByClassName("contenedorCompra")
	//console.log(t)
	for(let i=0;i<cc.length;i++){
		//console.log(originales[cc[i].index].coste)
		
		if(originales[cc[i].index].coste=="cualquiera")
			cc[i].imagen.onmousedown=cc[i].imagen.ontouchstart=function(e){empiezaArrastre(originales[cc[i].index].coste,e)}
		else
			if(originales[cc[i].index].coste[0]<=t.renacuajos[0].length && originales[cc[i].index].coste[1]<=t.renacuajos[1].length && originales[cc[i].index].coste[2]<=t.renacuajos[2].length)
				cc[i].imagen.onmousedown=cc[i].imagen.ontouchstart=function(e){empiezaArrastre(originales[cc[i].index].coste,e)}
			else
				cc[i].style.filter="brightness(75%) grayscale(100%)"
		
	}
	
	compraActiva=true;
	
	contraventana.onclick=contraventana.ontouchstart=function(e){
		e.stopPropagation()
		e.preventDefault()
		document.onmouseup=document.ontouchend=null
		document.onmouseleave=document.ontouchcancel=null
		document.onmousemove=document.ontouchmove=null
		ayudante.classList.remove("activo")
		
		botondia.value="×"
		botondia.disabled=false
		
		botondia.onclick=botondia.ontouchstart=function(){
			botondia.disabled=true
			setTimeout(function(){botondia.value="▶"},500)
			botondia.onclick=botondia.ontouchstart=dia
			ventana.classList.add("activa")
			ayudante.onclick=ayudante.ontouchstart=null
			contraventana.onclick=contraventana.ontouchstart=null
			document.onmousemove=document.ontouchmove=null
			document.onmouseup=document.ontouchend=null
			document.onmouseleave=document.ontouchcancel=null
			quitarFiltros()
		}
		
	}

	
}

function quitarFiltros(){
	var cc=document.getElementsByClassName("contenedorCompra")
	//console.log(t)
	for(var i=0;i<cc.length;i++){
		cc[i].imagen.onmousedown=cc[i].imagen.ontouchstart=null;
		cc[i].style.filter=""
	}
}

function go(){
	guardaOpciones()
	intro.style.display="none"
	juego.style.display=null
	cargaMenu()
	actualizar()
}


function guardaOpciones(){
	localStorage.setItem("dif", document.formacion.selectorColonias.value)
	localStorage.setItem("asc", document.formacion.selectorAscidias.value)
}

function cargaOpciones(){
	var dif=localStorage.getItem("dif")
	var asc=localStorage.getItem("asc")
	if(dif) 
		document.formacion.selectorColonias.value=dif
	else
		document.formacion.selectorColonias.value=0
	if(asc) 
		document.formacion.selectorAscidias.value=asc
	else
		document.formacion.selectorAscidias.value=0
}