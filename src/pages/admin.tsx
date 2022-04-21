import { FormEvent, useEffect, useState } from "react";

import siteMetadata from "@data/siteMetadata";
import Button from "@packages/react/Button/Button";
import Heading from "@packages/react/Heading/Heading";
import Text from "@packages/react/Text/Text";
import HeadSeo from "src/components/HeadSeo";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { CheckboxIndicator } from "@radix-ui/react-checkbox";
import { Checkbox, LoginBox, Label, ToastContent } from "src/styles/admin";
import { Check, XCircle } from "react-feather";

import axios from "axios";
import { Toast } from "src/components/Toast";

type adminDataType = {
  _id: string;
  username: string;
};

const Admin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [openSignToast, setOpenSignToast] = useState(false);
  const [loginData, setLoginData] = useState({});

  useEffect(() => {
    const persistedData = localStorage.getItem("@portfolio:adminData");
    if (persistedData) setLoginData(JSON.parse(persistedData));
  }, []);

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();

    axios
      .post("/api/admins", { username, password, rememberMe })
      .then(admin => {
        const data: adminDataType = admin.data;
        if (data) {
          if (rememberMe) {
            localStorage.setItem(
              "@portfolio:adminData",
              JSON.stringify({ id: data._id, username: data.username })
            );
          }
          setLoginData(data);
        } else setOpenSignToast(true);
      })
      .catch(error => {
        throw new Error(error);
      });
  }

  return (
    <LazyMotion features={domAnimation}>
      <HeadSeo
        title="Erik Gabriel | Admin Panel"
        description="Painel de configurações e informações do administrador"
        canonicalUrl={siteMetadata.siteUrl}
        ogTwitterImage={siteMetadata.siteLogoSquare}
        ogImageUrl={siteMetadata.siteLogo}
        ogType="website"
      />
      {Object.entries(loginData).length !== 0 ? (
        <>
          <h1>Admin Panel</h1>
        </>
      ) : (
        <LoginBox>
          <m.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div>
              <Heading>Login</Heading>
              <Text>Bem-vindo ao painel do administrador</Text>
            </div>
            <form onSubmit={handleSignIn}>
              <div>
                <div>
                  <Label htmlFor="username">Nome de Usuário</Label>
                  <input
                    type="text"
                    id="username"
                    placeholder="Digite o nome de usuário"
                    onChange={e => setUsername(e.target.value)}
                    autoComplete="off"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Senha</Label>
                  <input
                    type="password"
                    id="password"
                    maxLength={20}
                    minLength={6}
                    placeholder="Digite a senha"
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Checkbox
                    id="remember-me"
                    onClick={() => {
                      setRememberMe(!rememberMe);
                    }}
                  >
                    <CheckboxIndicator>
                      <Check size={10} />
                    </CheckboxIndicator>
                  </Checkbox>
                  <Label htmlFor="remember-me">Lembrar-se de mim</Label>
                </div>
                <Button type="submit">Entrar</Button>
              </div>
            </form>
          </m.div>
        </LoginBox>
      )}
      <Toast open={openSignToast} setOpen={setOpenSignToast} duration={3000}>
        <ToastContent css={{ backgroundColor: "$negative_dark" }}>
          <div>
            <XCircle size={25} />
          </div>
          <div>
            <Heading size="sm">Erro!</Heading>
            <Text size="sm">
              Nome de usuário ou senha incorretos! Tente novamente.
            </Text>
          </div>
        </ToastContent>
      </Toast>
    </LazyMotion>
  );
};

export default Admin;
