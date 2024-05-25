import Head from 'next/head';
import { Amatic_SC } from 'next/font/google';
import Layout from '@/components/Layout';
import { decrypt } from '@/services/dcrypt';
import Solitario from '@/components/Solitario';

const amaticFont = Amatic_SC({ subsets: ['latin'], weight: ['700'] });

export default function IdMultiplayerPage({ decryptedWord }) {
  return (
    <>
      <Head>
        <title>Juego del ahorcado | Invitación</title>
        <meta name='description' content='Juego del ahorcado para el proyecto de compiladores' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <div className={`${amaticFont.className}`}>
          <Solitario initialWord={decryptedWord} />
        </div>
      </Layout>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  const decryptedWord = decrypt(id);

  if (!decryptedWord) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      decryptedWord,
    },
  };
};
