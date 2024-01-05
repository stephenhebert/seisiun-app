export function theSessionDotOrgTuneToTuneCard(tune) {
  return {
    // TODO: enum
    databaseId: 0,
    databaseTuneId: tune.id,
    names: [
      tune.name,
      ...(tune.alias ? [tune.alias] : [])
    ],
    tags: [tune.type],
    url: tune.url,
  }
}