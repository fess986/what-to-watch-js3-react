import {configureStore} from '@reduxjs/toolkit';

import {reducer} from './reduser';

export const store = configureStore({reducer});
