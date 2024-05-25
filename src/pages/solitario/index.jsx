import Head from 'next/head';
import { Amatic_SC } from 'next/font/google';
import Solitario from '@/components/Solitario';
import Layout from '@/components/Layout';
import { getWord } from '@/services/sql/getWord';

const amaticFont = Amatic_SC({ subsets: ['latin'], weight: ['700'] });

export default function SolitarioPage({ initialWord }) {
  return (
    <>
      <Head>
        <title>Juego del ahorcado | Solitario</title>
        <meta name='description' content='Juego del ahorcado para el proyecto de compiladores' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <div className={`${amaticFont.className}`}>
          <Solitario initialWord={initialWord} />
        </div>
      </Layout>
    </>
  );
}



export const getServerSideProps = async () => {
  const initialWord = await getWord();

  if (!initialWord) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      initialWord,
    },
  };
};
