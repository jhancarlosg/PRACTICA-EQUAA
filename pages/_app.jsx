import Header from '../components/Header'
import '../styles/globals.css'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider, useSelector } from 'react-redux'
import { createStore } from 'redux'
import reducersApp from '../redux/reducers'
import GlobalAlert from '../components/GlobalAlert';
let store = createStore(reducersApp)

function MyApp(props) {
  //if (typeof window != "undefined") console.log(Component, pageProps, props);
  return <Provider store={store}>
      <AppInner {...props}/>
  </Provider>
}

const AppInner = ({ Component, pageProps, ...props }) => {
  const state = useSelector((state)=>state);
  const alert = useSelector((state)=>state.alert);
  return <>
    <Head>
      <title>{Component.title} - Practicas EQUAA</title>
    </Head>
    {alert && <GlobalAlert {...alert} />}
    <Header />
    <Component {...pageProps} />
  </>
}

export default MyApp
