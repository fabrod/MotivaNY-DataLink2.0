import React from 'react';
import {ThemeProvider} from 'emotion-theming';

const theme = {
  common: {
    borderBottom: {borderBottom: '1px solid #eee'},
  },
  colors: {
    faded: '#666',
    fadedExtra: '#888',
    background: '#3895d3',
  },
};

export default props => <ThemeProvider theme={theme} {...props} />;
