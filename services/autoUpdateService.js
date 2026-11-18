/**
 * ANTI-FEED AI — Auto Update Service (services/autoUpdateService.js)
 * Executa rotina em segundo plano de coleta e curadoria periódica no backend,
 * garantindo notícias sempre atuais independentemente de navegação do usuário.
 */

const { curateNewsEdition } = require('./newsCurationService');

let intervalHandle = null;
let lastAutoUpdate = null;
const DEFAULT_INTERVAL_MINUTES = 60; // A cada 60 minutos

function startPeriodicAutoUpdate(intervalMinutes = DEFAULT_INTERVAL_MINUTES) {
  if (intervalHandle) {
    clearInterval(intervalHandle);
  }

  const ms = intervalMinutes * 60 * 1000;
  console.log(`[AutoUpdate] Rotina programada ativada a cada ${intervalMinutes} minutos.`);

  intervalHandle = setInterval(async () => {
    try {
      console.log(`[AutoUpdate] Executando ciclo de curadoria periódica...`);
      const edition = await curateNewsEdition(['tecnologia', 'economia', 'automobilismo', 'mundo', 'politica']);
      lastAutoUpdate = {
        timestamp: new Date().toISOString(),
        totalCount: edition.totalCount,
        categories: edition.categoriesRenewed
      };
      console.log(`[AutoUpdate] Ciclo concluído com sucesso. ${edition.totalCount} matérias atualizadas.`);
    } catch (err) {
      console.error(`[AutoUpdate] Erro na rotina periódica:`, err.message);
    }
  }, ms);
}

function stopPeriodicAutoUpdate() {
  if (intervalHandle) {
    clearInterval(intervalHandle);
    intervalHandle = null;
    console.log('[AutoUpdate] Rotina periódica desativada.');
  }
}

function getAutoUpdateStatus() {
  return {
    active: !!intervalHandle,
    lastRun: lastAutoUpdate
  };
}

module.exports = {
  startPeriodicAutoUpdate,
  stopPeriodicAutoUpdate,
  getAutoUpdateStatus
};
