const nty = new Ntyle();

nty.definirTemas({
  claro: {
    primario: '#000',
    secundario: '#ff'
  },
  escuro: {
    primario: '#fff',
    secundario: '#000'
  }
}, 'claro');

nty.add('texto', {
  color: () => 'primario',
  backgroundColor: () => 'secundario',
  padding: () => window.innerWidth < 600 ? '10px' : '20px'
}).$('div', ['texto']);

nty.watch('resize', () => nty.update());
nty.watch('theme', () => {
  const modo = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro';
  nty.setarTema(modo);
});