const nty = new Ntyle();

// Define paletas para diferentes partes do dia
nty.definirTemas({
  dia: {
    ceu: '#87CEEB', // azul claro
    sol: '#FFD700', // amarelo sol
    montanha: '#556B2F', // verde oliva
    grama: '#2ECC71' // verde vivo
  },
  noite: {
    ceu: '#2c3e50', // azul escuro
    sol: 'white', // laranja suave
    montanha: '#2d3436', // cinza escuro
    grama: '#27ae60' // verde escuro
  }
}, getPeriodo());

function getPeriodo() {
  const hora = new Date().getHours();
  return hora >= 6 && hora < 18 ? 'dia' : 'noite';
}

// Estilo do cenário geral
nty.add('cenario', {
  width: '100%',
  height: '100vh',
  backgroundColor: () => 'ceu',
  position: 'relative',
  overflow: 'hidden'
});

// Estilo do sol
nty.add('sol', {
  width: '100px',
  height: '100px',
  backgroundColor: () => 'sol',
  borderRadius: '50%',
  position: 'absolute',
  top: '50px',
  left: '50%',
  transform: 'translateX(-50%)',
  boxShadow: '0 0 30px rgba(255, 215, 0, 0.7)'
});

// Montanha
nty.add('montanha', {
  width: '0',
  height: '0',
  borderLeft: '150px solid transparent',
  borderRight: '150px solid transparent',
  borderBottom: () => `150px solid ${nty.themes[nty.mytheme].montanha}`,
  position: 'absolute',
  bottom: '100px',
  left: '50%',
  transform: 'translateX(-50%)'
});

// Gramado
nty.add('gramado', {
  width: '100%',
  height: '100px',
  backgroundColor: () => 'grama',
  position: 'absolute',
  bottom: '0'
});

// Aplica os estilos
nty.$('.cenario', ['cenario']);
nty.$('.sol', ['sol']);
nty.$('.montanha', ['montanha']);
nty.$('.gramado', ['gramado']);

// Renderiza tudo
nty.render(['cenario', 'sol', 'montanha', 'gramado']);

// Atualiza ao mudar de hora (a cada minuto)
setInterval(() => {
  const periodo = getPeriodo();
  nty.setarTema(periodo);
  nty.update();
}, 60000);