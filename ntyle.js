class Ntyle {
  constructor(elemento, { estrutura = [], color = 'gray'}) {
    this.elem = document.getElementById(elemento);
    this.poligonos = estrutura;
    this.color = color;
  }
  
  depurar() {}
  
  posicao(x, y) {
    this.depurar();
    this.elem.style.transform = 'translate('+x+'px,'+y+'px)';
  }
  
  estrutura() {
    this.depurar();
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    this.elem.appendChild(canvas);
    
    // Definição do polígono como uma lista de pontos [x, y]
    const pontos = this.poligonos;
    
    ctx.strokeStyle = this.color; // Cor da linha
    ctx.lineWidth = 3; // Espessura
    ctx.stroke(); // Desenha a linha
    

      if (pontos.length < 2) return; // Precisa de pelo menos dois pontos
      
      ctx.beginPath();
      ctx.moveTo(pontos[0][0], pontos[0][1]); // Vai para o primeiro ponto
      
      // Percorre os pontos e cria linhas entre eles
      for (let i = 1; i < pontos.length; i++) {
        ctx.lineTo(pontos[i][0], pontos[i][1]);
      }

      ctx.closePath(); // Fecha o polígono
      ctx.strokeStyle = 'black'; // Cor da borda
      ctx.lineWidth = 2; // Espessura da linha
      ctx.fillStyle = this.color; // Cor de preenchimento
      ctx.fill(); // Preenche o polígono
      ctx.stroke(); // Desenha as bordas
    
    
    
    return this.elem
      .appendChild(document.createElement("canvas"))
      .getContext("2d");
  }
}