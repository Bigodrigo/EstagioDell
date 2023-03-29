import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import React, { useState, useEffect } from "react"
import { getMessaging, getToken } from "firebase/messaging";
import { useCon } from "../components/context/Context";
import { useRouter } from 'next/router';
import { Button, Modal } from 'flowbite-react';
import  Cidade  from "../components/cidade"

export default function Home() {

  const router = useRouter();

  const [show, setShow] = useState(false);

  const [current, setCurrent] = useState(0);
  return (

    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p><b>Bem-vindo!!</b> Aqui você pode selecionar duas cidades e um tamanho de caminhão!</p>
        <p>Por favor! Habilite o console (F12 no Chrome) para uma melhor experiência! Algumas funções não foram finalizadas e pode ser necessário clicar novamente nos botões!</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
       <Cidade />
      </section>
    </Layout>
  );
}