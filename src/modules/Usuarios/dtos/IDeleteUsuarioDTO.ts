interface IDeleteUsuarioDTO {
    id: number;

    usuarioLogado: {
        id: number;
        tipoId: number;
    };
}

export default IDeleteUsuarioDTO;
