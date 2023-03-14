export enum MediaQuery {
  AboveMediumScreenWidth = "(min-width: 1060px)",
  BelowMediumScreenWidth = "(max-width: 1060px)",
  BelowSmallScreenWidth = "(max-width: 640px)",
  BelowSmallScreenHeight = "(max-height: 640px)",
}

export default {
  AboveMediumScreenWidth: (): MediaQuery => MediaQuery.AboveMediumScreenWidth,
  BelowSmallScreenWidth: (): MediaQuery => MediaQuery.BelowSmallScreenWidth,
  BelowSmallScreenHeight: (): MediaQuery => MediaQuery.BelowSmallScreenHeight,
  BelowMediumScreenWidth: (): MediaQuery => MediaQuery.BelowMediumScreenWidth,
};
