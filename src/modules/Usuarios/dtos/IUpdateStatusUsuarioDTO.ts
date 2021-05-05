interface IUpdateStatusUsuarioDTO {
    id: number;

    status: boolean;

    usuarioLogado?: {
        id: number;
        tipoId: number;
    };
}

export default IUpdateStatusUsuarioDTO;
