import Head from 'next/head';
import { Amatic_SC } from 'next/font/google';
import Layout from '@/components/Layout';
import MultijugadorMenu from '@/components/MultijugadorMenu';

const amaticFont = Amatic_SC({ subsets: ['latin'], weight: ['700'] });

export default function MultijugadorMenuPage() {
  return (
    <>
      <Head>
        <title>Juego del ahorcado | Multijugador</title>
        <meta name='description' content='Juego del ahorcado para el proyecto de compiladores' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <div className={`${amaticFont.className}`}>
          <MultijugadorMenu />
        </div>
      </Layout>
    </>
  );
}
