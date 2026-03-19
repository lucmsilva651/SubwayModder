import { createI18n } from 'vue-i18n'


const getBrowserLanguage = () => {
  const userLang = navigator.language || navigator.userLanguage; 
  return userLang.split('-')[0]; 
};

const i18n = createI18n({
  locale: getBrowserLanguage() || 'en',
  // locale: getBrowserLanguage() || 'en',
  globalInjection: true,
  fallbackLocale: 'en',
  legacy: false,
  messages: {
    en: {
      message: {
        selectHack: 'Select your hack',
        hacksBtn: 'Hacks',
        texturesBtn: 'Textures',
        moneyInf: 'Infinite coins',
        keysInf: 'Infinite keys',
        multInf: 'Multiplier and max upgrades',
        sourceCode: 'Source code on GitHub',
        hovInf: 'Infinite hoverboard',
        hdsInf: 'Infinite headstart',
        scrbInf: 'Infinite score booster',
        downloadWallet: 'Download coins & items',
        howToUse: 'How to use the file',
        step1: 'Download the JSON file — it will already have the correct name',
        step2: 'On your device, navigate to the {path} folder',
        step3: 'Paste the file into the folder and confirm the replacement when prompted',
        downloadBtn: 'Download',
        cancelBtn: 'Cancel',
        textures: 'Textures',
        hacks: 'Hacks',
        about: 'About'
      }
    },
    es: {
      message: {
        selectHack: 'Selecciona tu hack',
        hacksBtn: 'Hacks',
        moneyInf: 'Monedas infinitas',
        keysInf: 'Llaves infinitas',
        multInf: 'Multiplicador y mejoras máx',
        sourceCode: 'Código fuente en GitHub',
        hovInf: 'Hoverboard infinito',
        hdsInf: 'Headstart infinito',
        scrbInf: 'Score booster infinito',
        downloadWallet: 'Descargar monedas y objetos',
        howToUse: 'Cómo usar el archivo',
        step1: 'Descarga el archivo JSON — ya vendrá con el nombre correcto',
        step2: 'En tu dispositivo, navega hasta la carpeta {path}',
        step3: 'Pega el archivo en la carpeta y confirma la sustitución cuando se te pida',
        downloadBtn: 'Descargar',
        cancelBtn: 'Cancelar',
        textures: 'Texturas',
        hacks: 'Hacks',
        about: 'Acerca de'
      }
    },
    pt: {
      message: {
        selectHack: 'Selecione seu hack',
        hacksBtn: 'Hacks',
        moneyInf: 'Moedas infinitas',
        keysInf: 'Chaves infinitas',
        multInf: 'Multiplicador e melhorias max',
        hovInf: 'Hoverboard infinito',
        hdsInf: 'Headstart infinito',
        scrbInf: 'Score booster infinito',
        sourceCode: 'Código fonte no GitHub',
        downloadWallet: 'Baixar moedas e itens',
        howToUse: 'Como usar o arquivo',
        step1: 'Baixe o arquivo JSON — ele já virá com o nome correto',
        step2: 'No seu dispositivo, navegue até a pasta {path}',
        step3: 'Cole o arquivo na pasta e confirme a substituição quando solicitado',
        downloadBtn: 'Baixar',
        cancelBtn: 'Cancelar',
        textures: 'Texturas',
        hacks: 'Hacks',
        about: 'Sobre'
      }
    }
  }
})

export default i18n;