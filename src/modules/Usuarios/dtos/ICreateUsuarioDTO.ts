interface ICreateUsuarioDTO {
    nome: string;

    tipoId: number;

    email: string;

    senha: string;

    usuarioLogado?: {
        id: number;
        tipoId: number;
    };
}

export default ICreateUsuarioDTO;
