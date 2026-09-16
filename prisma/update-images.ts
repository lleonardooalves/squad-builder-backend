import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { players } from './seed';

const prisma = new PrismaClient();

/**
 * Atualiza apenas o campo `image` dos jogadores já existentes no banco.
 *
 * Existe porque o seed apaga a tabela antes de recriar, e o `onDelete: Cascade`
 * levaria junto os favoritos e os times de todos os usuários. Este script só
 * escreve em uma coluna e não remove nada, então é seguro rodar em produção.
 *
 * Uso:
 *   npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/update-images.ts
 */
async function main() {
  let updated = 0;

  for (const player of players) {
    const result = await prisma.player.updateMany({
      where: { id: player.id },
      data: { image: player.image },
    });

    updated += result.count;
  }

  console.log(`Imagens atualizadas: ${updated} de ${players.length} jogadores.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
