import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentModelsRepository } from '../repositories/document-models.repository';
import { ClientsRepository } from 'src/client/repositories/clients.repository';

@Injectable()
export class DocumentoService {
  constructor(
    private readonly documentModelsRepository: DocumentModelsRepository,
    private readonly clienteRepository: ClientsRepository,
  ) {}

  private resolvePath(obj: unknown, path: string): unknown {
    return path.split('.').reduce((o: unknown, key: string) => {
      if (o !== null && typeof o === 'object' && key in o) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (o as Record<string, unknown>)[key];
      }
      return undefined;
    }, obj);
  }

  async gerarValoresDocumento(
    modeloId: string,
    clienteId: string,
    userId: string,
  ) {
    const modeloComTags = await this.documentModelsRepository.findModeloComTags(
      modeloId,
      userId,
    );

    if (!modeloComTags) {
      throw new NotFoundException(
        'Modelo de documento não encontrado ou você não tem permissão para acessá-lo.',
      );
    }

    const clienteResult =
      await this.clienteRepository.getPessoaFisicaByIdAndUserId(
        clienteId,
        userId,
      );

    if (!clienteResult) {
      throw new NotFoundException(
        'Cliente (Pessoa Física) não encontrado ou você não tem permissão para acessá-lo.',
      );
    }

    const cliente = clienteResult;

    const valoresResolvidos: Record<string, unknown> = {};

    for (const campo of modeloComTags.tagsDoSistema) {
      const tag = campo.tagSistema;
      const [origem, ...pathParts] = tag.origemDados.split('.');
      const dataPath = pathParts.join('.'); // "endereco.cidade"

      let valor: unknown = `[Tag ${tag.chave} inválida]`;

      if (origem === 'PessoaFisica') {
        const valorEncontrado = this.resolvePath(cliente, dataPath);
        valor =
          valorEncontrado !== undefined && valorEncontrado !== null
            ? valorEncontrado
            : '';
      }

      valoresResolvidos[tag.chave] = valor;
    }

    return valoresResolvidos;
  }
}
