import { createSelector } from 'reselect';

export const selectAppSettings = state => state.appsettings;

export const selectAppTheme = createSelector(
   [selectAppSettings],
   appsettings => appsettings.theme
);
