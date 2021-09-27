import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);
// import es from 'vuetify/src/locale/es'
export default new Vuetify({
  theme: { 
    // dark: true,
    themes: {
      dark: {
        primary: '#13B6C7',
        accent: '#DDCA3D',
        secondary: '#F26E6F',
        success: '#6EF26E',
        info: '#0083B4',
        warning: '#C7775B',
        error: '#FF5252',
        darken1: '#212121',
        darken2: '#424242',
      },
      light: {
        primary: '#008191',
        accent: '#DDCA3D',
        secondary: '#F26E6F',
        success: '#6EF26E',
        info: '#0083B4',
        warning: '#C7775B',
        error: '#FF5252',
        darken1: '#929292',
        darken2: '#E0E0E0',
      }
    } 
  },
  
});
