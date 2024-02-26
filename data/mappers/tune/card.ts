export default function (tune) {
  return {
    id: tune.id,
    databaseTunes: tune.databaseTunes.map(databaseTune => ({
      databaseId: databaseTune.databaseId,
      databaseTuneId: databaseTune.databaseTuneId,
      url: databaseTune.url,
    })),
    tuneNames: tune.tuneNames.map(tuneName => tuneName.name),
    tuneTags: tune.tuneTags.map(tuneTag => tuneTag.tag.name),
    favorites: tune.userTunes.reduce((sum, userTune) => {
      if (userTune.isFavorite) {
        return sum + 1
      }
      return sum
    }, 0),
    plays: tune.userTunes.reduce((sum, userTune) => {
      if (userTune.status === 0) {
        return sum + 1
      }
      return sum
    }, 0),
    wantsToPlay: tune.userTunes.reduce((sum, userTune) => {
      if (userTune.status === 1) {
        return sum + 1
      }
      return sum
    }, 0),
  }
}