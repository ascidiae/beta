function cria(t, color){
	//console.log(t)
	var c=["negro", "naranja", "blanco"]
	var temp=document.createElement("div")

	temp.classList.add("renacuajo")
	temp.classList.add(c[color])
	
	//console.log(temp)
	temp.setAttribute("posx", t.posx)
	temp.setAttribute("posy", t.posy)
	
	temp.start=new Date()-start
	temp.start=temp.start%6000
	temp.style.animationDelay=-temp.start+"ms"

	renacuajos.appendChild(temp)
	t.renacuajos[color].push(temp)
	actualizar();
}

function buscaAscidia(x, y){
	for(var i=0;i<lista.length;i++)
		if(lista[i].posx==x && lista[i].posy==y)
			return i
	return -1;
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function poblacion(t){
	return t.renacuajos[0].length+t.renacuajos[1].length+t.renacuajos[2].length
}

function purga(t){
	for(let j=0; j<=2; j++)
		for(var i=t.renacuajos[j].length-1; i>=0; i--)
			consume(t, j)
}

function consume(t, color){
	var temp=t.renacuajos[color].pop()
	temp.classList.add("morir")
	setTimeout(function(){temp.remove()},250)
}

function dormir(){
	ventana.classList.remove("activa")
	finHabilidad()
}

function comprar(t){
	ventana.classList.remove("activa")
    compraAscidia(t);
}

function empujaTodo(t, color, dir){
	for(let i=t.renacuajos[color].length-1; i>=0; i--)
		empuja(t, color, dir)
}

function empuja(t, color, dir){
	var destino=dir+t.dir
	
	destino=((destino%4)+4)%4

	var objetivo
	
	if(destino==0) objetivo=buscaAscidia(t.posx, t.posy-1)
	if(destino==1) objetivo=buscaAscidia(t.posx+1, t.posy)
	if(destino==2) objetivo=buscaAscidia(t.posx, t.posy+1)
	if(destino==3) objetivo=buscaAscidia(t.posx-1, t.posy)

	if(objetivo==-1)
		consume(t, color)
	else{
		var rena=t.renacuajos[color].pop()
		rena.setAttribute("posx", lista[objetivo].posx)
		rena.setAttribute("posy", lista[objetivo].posy)
		lista[objetivo].renacuajos[color].push(rena)
		actualizar();
	}
}

function creaAscidia(tipo, posx, posy, dir){
	if(buscaAscidia(posx, posy)>-1)
		quitaAscidia(buscaAscidia(posx,posy))
	
	var a=document.createElement("div")
	a.classList.add("ascidia")
	var img=document.createElement("img")
	img.src=originales[tipo].img;
	img.setAttribute("posx",posx);
	img.setAttribute("posy",posy);
	img.setAttribute("direccion",dir);
	
	a.appendChild(img)
	
	var temp={
		habilidad:originales[tipo].habilidad,
		posx:posx,
		posy:posy,
		dir:dir,
		renacuajos:[[],[],[]],
		dom:a,
		img:img
	}
	lista.push(temp)
	ascidias.appendChild(a)
}

function quitaAscidia(index){
	purga(lista[index])
	lista[index].dom.remove()
	lista.splice(index,1)
}

