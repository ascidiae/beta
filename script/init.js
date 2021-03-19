window.addEventListener("touchstart", touchHandler, true);
window.addEventListener("touchmove", touchHandler, true);
window.addEventListener("touchend", touchHandler, true);
window.addEventListener("touchcancel", touchHandler, true);

onresize=function(){
	pantalla()
	actualizar()
}

onload=function(){
	init()
	pantalla()
	creaAscidiasIniciales()
	cargaMenu()
	actualizar()
}

//////// variables !? ////////

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

	shuffle(ascEspeciales)

	originales.push(ascEspeciales[0])
	originales[4].coste=[1,0,0]
	originales[4].clase=1

	originales.push(ascEspeciales[1])
	originales[5].coste=[2,0,0]
	originales[5].clase=1
	
	originales.push(ascEspeciales[2])
	originales[6].coste=[3,0,0]
	originales[6].clase=1
	
	originales.push(ascEspeciales[3])
	originales[7].coste=[0,1,0]
	originales[7].clase=1
	
	originales.push(ascEspeciales[4])
	originales[8].coste=[0,2,0]
	originales[8].clase=1
	
	originales.push(ascEspeciales[5])
	originales[9].coste=[0,0,1]
	originales[9].clase=1
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

function creaAscidiasIniciales(){
	var a=document.createElement("div")
	a.classList.add("ascidia")
	var img=document.createElement("img")
	img.src=ascProprias[0].img;
	img.setAttribute("posx",0);
	img.setAttribute("posy",0);
	a.appendChild(img)
	var temp={
		habilidad:ascProprias[0].habilidad,
		posx:0,
		posy:0,
		dir:0,
		renacuajos:[[],[],[]],
		dom:a,
		img:img
	}
	lista.push(temp)
	ascidias.appendChild(a)

	a=document.createElement("div")
	a.classList.add("ascidia")
	img=document.createElement("img")
	img.src=ascProprias[1].img;
	img.setAttribute("posx",1);
	img.setAttribute("posy",0);
	a.appendChild(img)
	temp={
		habilidad:ascProprias[1].habilidad,
		posx:1,
		posy:0,
		dir:0,
		renacuajos:[[],[],[]],
		dom:a,
		img:img
	}
	lista.push(temp)
	ascidias.appendChild(a)
}

function cargaMenu(){
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
	
	
}

function quitarFiltros(){
	var cc=document.getElementsByClassName("contenedorCompra")
	//console.log(t)
	for(var i=0;i<cc.length;i++){
		cc[i].imagen.onmousedown=cc[i].imagen.ontouchstart=null;
		cc[i].style.filter=""
	}
}
