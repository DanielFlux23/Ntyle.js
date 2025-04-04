 class Ntyle {
  constructor() {
    this.styles={};
  }
  
  depurar() {}
  
  ntyle(config) {
    if (config.paleta) {
      this.palette = config.paleta;
    }
  }
  
    // Adiciona um novo estilo com propriedades dinâmicas
  add(name, styleObj) {
    this.styles[name] = Object.entries(styleObj).reduce((acc, [key, value]) => {
      acc[key] = typeof value === 'function' ? value() : value;
      return acc;
    }, {});
    return this;
  }
  
  // Aplica estilos a elementos do DOM com uma determinada classe
  $(className, styleNames) {
    const elements = document.querySelectorAll(className);
    styleNames.forEach((styleName) => {
      if (this.styles[styleName]) {
        elements.forEach((el) => {
          Object.assign(el.style, this.styles[styleName]);
        });
      }
    });
    return this;
  }
  
  // Renderiza os estilos no DOM injetando um <style> no <head>
  render(styleNames) {
    const styleTag = document.createElement('style');
    let css = '';
    styleNames.forEach((styleName) => {
      if (this.styles[styleName]) {
        const styleRules = Object.entries(this.styles[styleName])
          .map(([key, value]) => `${key}: ${value};`)
          .join(' ');
        css += `.${styleName} { ${styleRules} } `;
      }
    });
    styleTag.innerHTML = css;
    document.head.appendChild(styleTag);
  }
  
  posicao(x, y) {
    this.depurar();
    this.elem.style.transform = 'translate('+x+'px,'+y+'px)';
  }
  
  estrutura(elemento, { estrutura = [], color = 'gray'}) {
    this.depurar();
    const elem = document.getElementById(elemento);
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    elem.appendChild(canvas);
    
    // Definição do polígono como uma lista de pontos [x, y]
    const pontos = estrutura;
    
    ctx.strokeStyle = color; // Cor da linha
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
    
    
    
    return elem
      .appendChild(document.createElement("canvas"))
      .getContext("2d");
  }
}