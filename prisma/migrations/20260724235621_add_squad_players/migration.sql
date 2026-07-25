-- CreateTable
CREATE TABLE "squad_players" (
    "userId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "squad_players_pkey" PRIMARY KEY ("userId","playerId")
);

-- AddForeignKey
ALTER TABLE "squad_players" ADD CONSTRAINT "squad_players_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "squad_players" ADD CONSTRAINT "squad_players_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;
