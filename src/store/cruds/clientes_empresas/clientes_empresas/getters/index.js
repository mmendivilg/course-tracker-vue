export default {
    getClientesEmpresas: state => state.clientes_empresas,
    getClienteEmpresaLogotipo: (state) => (id) => {
        return state.clientes_empresas_logotipos[id] ? state.clientes_empresas_logotipos[id] : null
    },
}