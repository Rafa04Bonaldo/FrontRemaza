import { Cliente } from '../endereco';

export class ClienteSerializer {
    fromJson(json: any): Cliente {

      const cliente = new Cliente();
      cliente.idcliente = json.idcliente;
      cliente.nomeCliente = json.nomeCliente;
      cliente.tpConsorcioCliente = json.tpConsorcioCliente;
      cliente.telefoneCliente = json.telefoneCliente;
      cliente.motivoContatoCliente = json.motivoContatoCliente;
      cliente.desejoFlagCliente = json.desejoFlagCliente;
      cliente.cepCliente = json.cepCliente;
      cliente.municipioCliente = json.municipioCliente;
      cliente.ufCliente = json.ufCliente;
      cliente.logradouroCliente = json.logradouroCliente;
      cliente.numCliente = json.numCliente;
      cliente.dtAtendimentoCliente = json.dtAtendimentoCliente;
      cliente.horarioAtendimentoCliente = json.horarioAtendimentoCliente;

      return cliente;
    }
  
    toJson(cliente: Cliente): any {
      return {
        idcliente: cliente.idcliente,
        nomeCliente: cliente.nomeCliente,
        tpConsorcioCliente: cliente.tpConsorcioCliente,
        telefoneCliente: cliente.telefoneCliente,
        motivoContatoCliente: cliente.motivoContatoCliente,
        desejoFlagCliente: cliente.desejoFlagCliente,
        cepCliente: cliente.cepCliente,
        municipioCliente: cliente.municipioCliente,
        ufCliente: cliente.ufCliente,
        logradouroCliente: cliente.logradouroCliente,
        numCliente: cliente.numCliente,
        dtAtendimentoCliente: cliente.dtAtendimentoCliente,
        horarioAtendimentoCliente: cliente.horarioAtendimentoCliente 
      };
    }
  }