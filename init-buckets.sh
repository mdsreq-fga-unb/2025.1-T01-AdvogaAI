#!/bin/sh

# Espera o MinIO estar pronto antes de continuar.
# O comando `mc alias set` irá falhar até que o serviço MinIO esteja acessível.
# O loop `until` continua tentando até que o comando tenha sucesso.

until /usr/bin/mc alias set myminio http://minio:9000 minioadmin minioadmin; do
    echo "Aguardando o serviço MinIO..."
    sleep 1
done

# Cria o bucket se ele não existir.
/usr/bin/mc mb myminio/advogaai --ignore-existing

# Define a política de acesso do bucket para 'download'.
# Isso permite que os arquivos sejam lidos publicamente via URL, o que é útil para desenvolvimento.
# Para produção, você pode querer uma política mais restrita.
/usr/bin/mc policy set download myminio/advogaai


echo "Bucket 'advogaai' criado com sucesso com política de acesso público."

exit 0