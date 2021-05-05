interface IUpdateUsuarioDTO {
    id: number;

    nome: string;

    tipoId: number;

    usuarioLogado?: {
        id: number;
        tipoId: number;
    };
}

export default IUpdateUsuarioDTO;
