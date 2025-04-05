const nty = new Ntyle();

// Configura uma paleta simples
nty.ntyle({
  paleta: {
    pequeno: '#e74c3c', // vermelho
    grande: '#3498db' // azul claro
  }
});

// Define estilo reativo para .alerta
nty.add('alerta', {
  padding: '20px',
  color: '#fff',
  fontWeight: () => window.innerWidth < 768 ? 'bold' : 'normal',
  backgroundColor: () => window.innerWidth < 768 ? 'pequeno' : 'grande',
  borderRadius: '6px',
  textAlign: 'center',
  transition: 'all 0.3s ease'
});

// Aplica estilo na div
nty.$('.alerta', ['alerta']);

// Renderiza
nty.render(['alerta']);

// Reage ao redimensionamento da janela
nty.watch('resize', () => nty.update());