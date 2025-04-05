# Ntyle.js


**Ntyle.js** é uma biblioteca JavaScript leve, modular e sem frescura, projetada para transformar a forma como você lida com estilos e temas na web. Chega de folhas de estilo engessadas e mudanças manuais de classe — aqui o poder está no código.

> "O estilo sob seu controle. Literalmente."

#  Características

- Inicialização Simplificada
- Configuração Flexível
- Suporte a Múltiplos Temas
- Reatividade na Manipulação de Estilos

---

#### 1. **constructor()**

**Para que serve:**  
Inicializa uma instância do Ntyle com todas as estruturas internas necessárias para manipulação de estilos, temas e reatividade.

**Argumentos:**  
Nenhum

**Retorno:**  
Instância do `Ntyle`

**Exemplo:**
```javascript
const nty = new Ntyle();
```

---

#### 2. **ntyle(config)**

**Para que serve:**  
Configura a instância com uma paleta de cores inicial e callback de debug.

**Argumentos:**  
- `config.paleta` *(objeto)*: Paleta de tokens de cor  
- `config.color` *(string)*: Cor padrão (opcional)  
- `config.debug` *(function)*: Callback para debug/log

**Retorno:**  
Instância do `Ntyle`

**Exemplo:**
```javascript
nty.ntyle({
  paleta: { primario: '#f00', secundario: '#0f0' },
  debug: console.log
});
```

---

#### 3. **definirTemas(temasObj, temaInicial)**

**Para que serve:**  
Define múltiplos temas com paletas distintas.

**Argumentos:**  
- `temasObj` *(objeto)*: Objetos de paletas com nomes-chave  
- `temaInicial` *(string)*: Nome do tema a ativar

**Retorno:**  
Instância do `Ntyle`

**Exemplo:**
```javascript
nty.definirTemas({
  claro: { primario: '#000', secundario: '#fff' },
  escuro: { primario: '#fff', secundario: '#000' }
}, 'claro');
```

---

#### 4. **setarTema(nomeTema)**

**Para que serve:**  
Troca o tema ativo e atualiza todos os estilos aplicados.

**Argumentos:**  
- `nomeTema` *(string)*: Nome do tema definido anteriormente

**Retorno:**  
Instância do `Ntyle`

**Exemplo:**
```javascript
nty.setarTema('escuro');
```

---

#### 5. **add(nome, estiloObj)**

**Para que serve:**  
Define um novo estilo com propriedades estáticas ou dinâmicas.

**Argumentos:**  
- `nome` *(string)*: Nome do estilo (classe)  
- `estiloObj` *(objeto)*: Objeto com propriedades CSS. Pode conter funções reativas.

**Retorno:**  
Instância do `Ntyle`

**Exemplo:**
```javascript
nty.add('btn', {
  backgroundColor: () => 'primario',
  padding: '10px'
});
```

---

#### 6. **$(seletor, estilos)**

**Para que serve:**  
Aplica os estilos definidos diretamente nos elementos DOM.

**Argumentos:**  
- `seletor` *(string)*: Seletor CSS  
- `estilos` *(array)*: Lista de nomes de estilo a aplicar

**Retorno:**  
Instância do `Ntyle`

**Exemplo:**
```javascript
nty.$('.btn', ['btn']);
```

---

#### 7. **render(estilos)**

**Para que serve:**  
Gera e injeta um `<style>` com as classes CSS no `<head>` da página.

**Argumentos:**  
- `estilos` *(array)*: Lista de nomes de estilos para renderizar como CSS puro

**Retorno:**  
Instância do `Ntyle`

**Exemplo:**
```javascript
nty.render(['btn']);
```

---

#### 8. **update()**

**Para que serve:**  
Reavalia todos os estilos dinâmicos e atualiza os elementos no DOM com novos valores.

**Argumentos:**  
Nenhum

**Retorno:**  
Instância do `Ntyle`

**Exemplo:**
```javascript
window.addEventListener('resize', () => nty.update());
```

---

#### 9. **watch(trigger, callback)**

**Para que serve:**  
Observa eventos como `resize` ou `theme`, e executa uma função (normalmente `update`).

**Argumentos:**  
- `trigger` *(string)*: `'resize'`, `'theme'` ou evento customizado  
- `callback` *(function)*: Função a ser executada no evento

**Retorno:**  
Instância do `Ntyle`

**Exemplo:**
```javascript
nty.watch('resize', () => nty.update());
```

---

#### 10. **destroy()**

**Para que serve:**  
Remove todos os watchers registrados anteriormente, útil para limpeza e evitar vazamento de memória.

**Argumentos:**  
Nenhum

**Retorno:**  
Instância do `Ntyle`

**Exemplo:**
```javascript
nty.destroy();
```

---

#### 11. **posicao(elemento, x, y)**

**Para que serve:**  
Aplica `transform: translate(x, y)` em um elemento manualmente.

**Argumentos:**  
- `elemento` *(HTMLElement)*: Elemento do DOM  
- `x` *(number)*: Posição X em pixels  
- `y` *(number)*: Posição Y em pixels

**Retorno:**  
Instância do `Ntyle`

**Exemplo:**
```javascript
const box = document.querySelector('#box');
nty.posicao(box, 100, 50);
```