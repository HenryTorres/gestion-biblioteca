import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const rpcError = exception.getError();

    const normalized = this.normalizeRpcError(rpcError);

    return response.status(normalized.status).json(normalized);
  }

  private normalizeRpcError(rpcError: any) {
    // Caso 1: objeto correcto
    if (
      rpcError &&
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      return {
        status: this.ensureValidStatus(rpcError.status),
        message: String(rpcError.message),
      };
    }

    // Caso 2: error es un string (devolvemos 400 por convención)
    if (typeof rpcError === 'string') {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: rpcError,
      };
    }

    // Caso 3: error inesperado o estructura inválida
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Unexpected RPC error',
    };
  }

  private ensureValidStatus(status: any): number {
    if (typeof status === 'number' && status >= 100 && status < 600) {
      return status;
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
