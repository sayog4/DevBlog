import { ApolloProvider } from '@apollo/client'
import withApollo from '../lib/withApollo'
import NProgress from 'nprogress'
import Router from 'next/router'

import Layout from '../components/Layout'

import '../styles/bootstrap.min.css'
import '../styles/globals.css'
import '../node_modules/nprogress/nprogress.css'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routerChangeError', () => NProgress.done())

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}

MyApp.getInitialProps = async function({ Component, ctx }) {
  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  pageProps.query = ctx.query
  return { pageProps }
}

export default withApollo(MyApp)
