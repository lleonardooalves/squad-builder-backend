import { PrismaClient, Prisma, Position, Form } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Dados de exemplo baseados na Série A do Brasileirão (aproximação ~2025).
 * ATENÇÃO: elenco/clubes mudam a cada janela e os atributos são fictícios (pra demo).
 * Ajuste conforme necessário. As imagens usam placeholder (placehold.co) com as iniciais.
 */

type RawPlayer = {
  name: string;
  team: string;
  position: Position;
  price: number;
  rating: number;
  form: Form;
  attributes: Prisma.InputJsonValue;
};

const rawPlayers: RawPlayer[] = [
  // ---------------- Goleiros (GK) ----------------
  {
    name: 'Weverton',
    team: 'Palmeiras',
    position: 'GK',
    price: 45,
    rating: 84,
    form: 'normal',
    attributes: {
      reflexes: 85,
      handling: 83,
      diving: 84,
      positioning: 85,
      kicking: 80,
    },
  },
  {
    name: 'Agustín Rossi',
    team: 'Flamengo',
    position: 'GK',
    price: 42,
    rating: 83,
    form: 'hot',
    attributes: {
      reflexes: 84,
      handling: 82,
      diving: 83,
      positioning: 84,
      kicking: 78,
    },
  },
  {
    name: 'John Victor',
    team: 'Botafogo',
    position: 'GK',
    price: 40,
    rating: 82,
    form: 'hot',
    attributes: {
      reflexes: 83,
      handling: 80,
      diving: 84,
      positioning: 81,
      kicking: 79,
    },
  },
  {
    name: 'Hugo Souza',
    team: 'Corinthians',
    position: 'GK',
    price: 38,
    rating: 82,
    form: 'hot',
    attributes: {
      reflexes: 84,
      handling: 81,
      diving: 83,
      positioning: 82,
      kicking: 75,
    },
  },
  {
    name: 'Fábio',
    team: 'Fluminense',
    position: 'GK',
    price: 30,
    rating: 83,
    form: 'normal',
    attributes: {
      reflexes: 83,
      handling: 84,
      diving: 82,
      positioning: 85,
      kicking: 76,
    },
  },
  {
    name: 'Cássio',
    team: 'Cruzeiro',
    position: 'GK',
    price: 25,
    rating: 81,
    form: 'normal',
    attributes: {
      reflexes: 82,
      handling: 82,
      diving: 80,
      positioning: 83,
      kicking: 74,
    },
  },

  // ---------------- Defensores (DEF) ----------------
  {
    name: 'Gustavo Gómez',
    team: 'Palmeiras',
    position: 'DEF',
    price: 55,
    rating: 85,
    form: 'hot',
    attributes: { pace: 74, passing: 78, fin: 55, dribbling: 68, defense: 88 },
  },
  {
    name: 'Murilo',
    team: 'Palmeiras',
    position: 'DEF',
    price: 48,
    rating: 82,
    form: 'normal',
    attributes: { pace: 80, passing: 76, fin: 45, dribbling: 70, defense: 84 },
  },
  {
    name: 'Piquerez',
    team: 'Palmeiras',
    position: 'DEF',
    price: 52,
    rating: 83,
    form: 'hot',
    attributes: { pace: 85, passing: 80, fin: 52, dribbling: 78, defense: 82 },
  },
  {
    name: 'Léo Ortiz',
    team: 'Flamengo',
    position: 'DEF',
    price: 50,
    rating: 83,
    form: 'normal',
    attributes: { pace: 75, passing: 80, fin: 55, dribbling: 70, defense: 85 },
  },
  {
    name: 'Léo Pereira',
    team: 'Flamengo',
    position: 'DEF',
    price: 46,
    rating: 82,
    form: 'normal',
    attributes: { pace: 76, passing: 75, fin: 50, dribbling: 68, defense: 84 },
  },
  {
    name: 'Ayrton Lucas',
    team: 'Flamengo',
    position: 'DEF',
    price: 48,
    rating: 82,
    form: 'hot',
    attributes: { pace: 86, passing: 79, fin: 58, dribbling: 79, defense: 80 },
  },
  {
    name: 'Alexander Barboza',
    team: 'Botafogo',
    position: 'DEF',
    price: 40,
    rating: 81,
    form: 'normal',
    attributes: { pace: 77, passing: 74, fin: 48, dribbling: 66, defense: 83 },
  },
  {
    name: 'Vitão',
    team: 'Internacional',
    position: 'DEF',
    price: 44,
    rating: 81,
    form: 'hot',
    attributes: { pace: 80, passing: 76, fin: 46, dribbling: 70, defense: 83 },
  },
  {
    name: 'Arboleda',
    team: 'São Paulo',
    position: 'DEF',
    price: 42,
    rating: 82,
    form: 'normal',
    attributes: { pace: 76, passing: 75, fin: 50, dribbling: 66, defense: 84 },
  },
  {
    name: 'Alan Franco',
    team: 'São Paulo',
    position: 'DEF',
    price: 38,
    rating: 80,
    form: 'normal',
    attributes: { pace: 78, passing: 76, fin: 45, dribbling: 70, defense: 82 },
  },
  {
    name: 'Cacá',
    team: 'Corinthians',
    position: 'DEF',
    price: 34,
    rating: 79,
    form: 'cold',
    attributes: { pace: 77, passing: 72, fin: 44, dribbling: 65, defense: 81 },
  },
  {
    name: 'Junior Alonso',
    team: 'Atlético-MG',
    position: 'DEF',
    price: 40,
    rating: 81,
    form: 'normal',
    attributes: { pace: 79, passing: 75, fin: 46, dribbling: 68, defense: 83 },
  },
  {
    name: 'Thiago Silva',
    team: 'Fluminense',
    position: 'DEF',
    price: 35,
    rating: 84,
    form: 'hot',
    attributes: { pace: 70, passing: 82, fin: 52, dribbling: 74, defense: 87 },
  },
  {
    name: 'Kannemann',
    team: 'Grêmio',
    position: 'DEF',
    price: 28,
    rating: 80,
    form: 'cold',
    attributes: { pace: 72, passing: 74, fin: 45, dribbling: 64, defense: 83 },
  },
  {
    name: 'Fabricio Bruno',
    team: 'Cruzeiro',
    position: 'DEF',
    price: 42,
    rating: 81,
    form: 'normal',
    attributes: { pace: 78, passing: 76, fin: 48, dribbling: 68, defense: 83 },
  },

  // ---------------- Meio-campistas (MID) ----------------
  {
    name: 'Richard Ríos',
    team: 'Palmeiras',
    position: 'MID',
    price: 70,
    rating: 84,
    form: 'hot',
    attributes: { pace: 80, passing: 84, fin: 72, dribbling: 85, defense: 78 },
  },
  {
    name: 'Raphael Veiga',
    team: 'Palmeiras',
    position: 'MID',
    price: 58,
    rating: 83,
    form: 'normal',
    attributes: { pace: 74, passing: 86, fin: 80, dribbling: 83, defense: 60 },
  },
  {
    name: 'Maurício',
    team: 'Palmeiras',
    position: 'MID',
    price: 45,
    rating: 80,
    form: 'normal',
    attributes: { pace: 82, passing: 80, fin: 74, dribbling: 82, defense: 58 },
  },
  {
    name: 'Gerson',
    team: 'Flamengo',
    position: 'MID',
    price: 60,
    rating: 84,
    form: 'hot',
    attributes: { pace: 78, passing: 85, fin: 74, dribbling: 83, defense: 80 },
  },
  {
    name: 'Arrascaeta',
    team: 'Flamengo',
    position: 'MID',
    price: 65,
    rating: 86,
    form: 'hot',
    attributes: { pace: 78, passing: 88, fin: 82, dribbling: 89, defense: 58 },
  },
  {
    name: 'De la Cruz',
    team: 'Flamengo',
    position: 'MID',
    price: 62,
    rating: 84,
    form: 'normal',
    attributes: { pace: 80, passing: 85, fin: 76, dribbling: 85, defense: 74 },
  },
  {
    name: 'Marlon Freitas',
    team: 'Botafogo',
    position: 'MID',
    price: 38,
    rating: 79,
    form: 'normal',
    attributes: { pace: 76, passing: 80, fin: 68, dribbling: 76, defense: 78 },
  },
  {
    name: 'Alan Patrick',
    team: 'Internacional',
    position: 'MID',
    price: 48,
    rating: 82,
    form: 'hot',
    attributes: { pace: 75, passing: 84, fin: 78, dribbling: 84, defense: 62 },
  },
  {
    name: 'Oscar',
    team: 'São Paulo',
    position: 'MID',
    price: 45,
    rating: 82,
    form: 'normal',
    attributes: { pace: 74, passing: 86, fin: 78, dribbling: 86, defense: 56 },
  },
  {
    name: 'Rodrigo Garro',
    team: 'Corinthians',
    position: 'MID',
    price: 55,
    rating: 83,
    form: 'hot',
    attributes: { pace: 74, passing: 86, fin: 78, dribbling: 85, defense: 58 },
  },
  {
    name: 'Gustavo Scarpa',
    team: 'Atlético-MG',
    position: 'MID',
    price: 48,
    rating: 82,
    form: 'hot',
    attributes: { pace: 76, passing: 85, fin: 80, dribbling: 83, defense: 62 },
  },
  {
    name: 'Ganso',
    team: 'Fluminense',
    position: 'MID',
    price: 30,
    rating: 80,
    form: 'normal',
    attributes: { pace: 66, passing: 86, fin: 72, dribbling: 83, defense: 52 },
  },
  {
    name: 'Jhon Arias',
    team: 'Fluminense',
    position: 'MID',
    price: 52,
    rating: 82,
    form: 'hot',
    attributes: { pace: 82, passing: 83, fin: 76, dribbling: 86, defense: 64 },
  },
  {
    name: 'Matheus Pereira',
    team: 'Cruzeiro',
    position: 'MID',
    price: 50,
    rating: 82,
    form: 'hot',
    attributes: { pace: 76, passing: 84, fin: 79, dribbling: 85, defense: 58 },
  },
  {
    name: 'Everton Ribeiro',
    team: 'Bahia',
    position: 'MID',
    price: 35,
    rating: 80,
    form: 'normal',
    attributes: { pace: 74, passing: 83, fin: 74, dribbling: 84, defense: 60 },
  },

  // ---------------- Atacantes (ATT) ----------------
  {
    name: 'Flaco López',
    team: 'Palmeiras',
    position: 'ATT',
    price: 55,
    rating: 82,
    form: 'hot',
    attributes: { pace: 84, passing: 74, fin: 83, dribbling: 80, defense: 40 },
  },
  {
    name: 'Pedro',
    team: 'Flamengo',
    position: 'ATT',
    price: 60,
    rating: 84,
    form: 'normal',
    attributes: { pace: 80, passing: 75, fin: 87, dribbling: 78, defense: 42 },
  },
  {
    name: 'Bruno Henrique',
    team: 'Flamengo',
    position: 'ATT',
    price: 45,
    rating: 82,
    form: 'hot',
    attributes: { pace: 86, passing: 74, fin: 82, dribbling: 82, defense: 44 },
  },
  {
    name: 'Everton Cebolinha',
    team: 'Flamengo',
    position: 'ATT',
    price: 44,
    rating: 81,
    form: 'normal',
    attributes: { pace: 85, passing: 76, fin: 78, dribbling: 85, defense: 38 },
  },
  {
    name: 'Igor Jesus',
    team: 'Botafogo',
    position: 'ATT',
    price: 48,
    rating: 80,
    form: 'hot',
    attributes: { pace: 83, passing: 72, fin: 80, dribbling: 78, defense: 45 },
  },
  {
    name: 'Enner Valencia',
    team: 'Internacional',
    position: 'ATT',
    price: 40,
    rating: 81,
    form: 'normal',
    attributes: { pace: 79, passing: 74, fin: 82, dribbling: 78, defense: 42 },
  },
  {
    name: 'Lucas Moura',
    team: 'São Paulo',
    position: 'ATT',
    price: 42,
    rating: 82,
    form: 'normal',
    attributes: { pace: 84, passing: 78, fin: 80, dribbling: 87, defense: 40 },
  },
  {
    name: 'Luciano',
    team: 'São Paulo',
    position: 'ATT',
    price: 35,
    rating: 79,
    form: 'normal',
    attributes: { pace: 78, passing: 74, fin: 80, dribbling: 78, defense: 42 },
  },
  {
    name: 'Yuri Alberto',
    team: 'Corinthians',
    position: 'ATT',
    price: 55,
    rating: 82,
    form: 'hot',
    attributes: { pace: 85, passing: 73, fin: 84, dribbling: 80, defense: 40 },
  },
  {
    name: 'Memphis Depay',
    team: 'Corinthians',
    position: 'ATT',
    price: 58,
    rating: 84,
    form: 'hot',
    attributes: { pace: 80, passing: 82, fin: 85, dribbling: 86, defense: 45 },
  },
  {
    name: 'Hulk',
    team: 'Atlético-MG',
    position: 'ATT',
    price: 45,
    rating: 84,
    form: 'hot',
    attributes: { pace: 78, passing: 80, fin: 88, dribbling: 80, defense: 46 },
  },
  {
    name: 'Germán Cano',
    team: 'Fluminense',
    position: 'ATT',
    price: 32,
    rating: 80,
    form: 'cold',
    attributes: { pace: 70, passing: 72, fin: 85, dribbling: 74, defense: 38 },
  },
  {
    name: 'Kaio Jorge',
    team: 'Cruzeiro',
    position: 'ATT',
    price: 52,
    rating: 81,
    form: 'hot',
    attributes: { pace: 82, passing: 74, fin: 83, dribbling: 80, defense: 42 },
  },
  {
    name: 'Pablo Vegetti',
    team: 'Vasco',
    position: 'ATT',
    price: 40,
    rating: 80,
    form: 'normal',
    attributes: { pace: 74, passing: 72, fin: 84, dribbling: 74, defense: 44 },
  },
];

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

const players: Prisma.PlayerCreateManyInput[] = rawPlayers.map(
  (player, index) => ({
    id: String(index + 1),
    image: `https://placehold.co/200x200/1e293b/ffffff?text=${initials(player.name)}`,
    ...player,
  }),
);

async function main() {
  // Limpa antes pra tornar o seed repetível (idempotente).
  // ATENÇÃO: por causa do onDelete: Cascade, isto também apaga favoritos e squads
  // que referenciam esses jogadores. Ok em desenvolvimento; cuidado em produção.
  await prisma.player.deleteMany();
  await prisma.player.createMany({ data: players });

  console.log(`Seed concluído: ${players.length} jogadores inseridos.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
