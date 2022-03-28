export interface IWordContext {
  decade: number,
  setGivenDecade: (decade: number) => void
  setRandomWordByDecade: (decade: number) => any[],
  startContext: () => void
}