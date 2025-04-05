class Ntyle {
  constructor() {
    this.styles = {};
    this.palette = {};
    this.themes = {}; // Todas as paletas
    this.mytheme = ''; // Qual está ativa agora
    this.color = 'gray';
    this.elem = null;
    this._debugFn = null;
    
  }
  
  depurar(msg = '', data = null) {
    if (typeof this._debugFn === 'function') {
      this._debugFn(msg, data);
    } else {
      console.debug(`[Ntyle DEBUG]: ${msg}`, data || '');
    }
  }
  
  ntyle(config = {}) {
    const { paleta, color, debug } = config;
    
    if (paleta) this.palette = paleta;
    if (color) this.color = color;
    if (debug) this._debugFn = debug;
    
    return this;
  }
  
  add(name, styleObj) {
    this.styles[name] = {};
    this._dynamicStyles = this._dynamicStyles || {};
    
    this._dynamicStyles[name] = {}; // Guarda as funções originais
    
    for (const [key, value] of Object.entries(styleObj)) {
      const raw = typeof value === 'function' ? value : () => value;
      
      this._dynamicStyles[name][key] = raw;
      
      // Avalia o valor agora
      let evaluated = raw();
      
      // Interpola da paleta, se aplicável
      if (typeof evaluated === 'string' && this.palette[evaluated]) {
        evaluated = this.palette[evaluated];
      }
      
      this.styles[name][key] = evaluated;
    }
    
    return this;
  }
  
  $(seletor, styleNames) {
    const elements = document.querySelectorAll(seletor);
    styleNames.forEach((styleName) => {
      if (this.styles[styleName]) {
        elements.forEach((el) => {
          Object.assign(el.style, this.styles[styleName]);
        });
      } else {
        this.depurar(`Estilo "${styleName}" não encontrado.`);
      }
    });
    return this;
  }
  
  watch(trigger, callback) {
    this._watchers = this._watchers || [];
    
    this._watchers.push({ trigger, callback });
    
    // Se for algo reconhecível, já conecta
    if (trigger === 'resize') {
      window.addEventListener('resize', callback);
    }
    
    if (trigger === 'theme') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener('change', callback);
    }
    
    return this;
  }
  
  destroy() {
    if (!this._watchers) return;
    
    this._watchers.forEach(({ trigger, callback }) => {
      if (trigger === 'resize') {
        window.removeEventListener('resize', callback);
      }
      
      if (trigger === 'theme') {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        mq.removeEventListener('change', callback);
      }
    });
    
    this._watchers = [];
  }
  
  definirTemas(temasObj, temaInicial = null) {
    this.themes = temasObj;
    
    if (temaInicial && this.themes[temaInicial]) {
      this.setarTema(temaInicial);
    }
    
    return this;
  }
  
  setarTema(nomeTema) {
    if (!this.themes[nomeTema]) {
      this.depurar(`Tema "${nomeTema}" não encontrado.`, this.themes);
      return this;
    }
    
    this.palette = this.themes[nomeTema];
    this.mytheme = nomeTema;
    this.update();
    
    this.depurar(`Tema alterado para: ${nomeTema}`);
    return this;
  }
  
  update() {
    if (!this._dynamicStyles) return this;
    
    for (const [styleName, props] of Object.entries(this._dynamicStyles)) {
      const newStyle = {};
      for (const [key, fn] of Object.entries(props)) {
        let value = fn();
        if (typeof value === 'string' && this.palette[value]) {
          value = this.palette[value];
        }
        newStyle[key] = value;
      }
      this.styles[styleName] = newStyle;
      
      // Reaplica no DOM
      document.querySelectorAll(`.${styleName}`).forEach((el) => {
        Object.assign(el.style, newStyle);
      });
    }
    
    this.depurar('Estilos atualizados dinamicamente.');
    return this;
  }
  
  render(styleNames) {
    const styleTag = document.createElement('style');
    let css = '';
    styleNames.forEach((styleName) => {
      if (this.styles[styleName]) {
        const styleRules = Object.entries(this.styles[styleName])
          .map(([key, value]) => `${key}: ${value};`)
          .join(' ');
        css += `.${styleName} { ${styleRules} } `;
      } else {
        this.depurar(`Estilo "${styleName}" não encontrado para renderização.`);
      }
    });
    styleTag.innerHTML = css;
    document.head.appendChild(styleTag);
    return this;
  }
  
  posicao(elem, x = 0, y = 0) {
    if (!elem || !elem.style) {
      this.depurar('Elemento inválido passado para posicao()', elem);
      return;
    }
    this.depurar(`Aplicando translate(${x}px, ${y}px) ao elemento`, elem);
    elem.style.transform = `translate(${x}px, ${y}px)`;
    return this;
  }
}