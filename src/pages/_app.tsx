import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
//@ts-ignore
import cookieCutter from "cookie-cutter";
import { ReactQueryDevtools } from "react-query-devtools";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
const queryClient = new QueryClient();

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { LogoutRounded } from "@mui/icons-material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const { pathname, push } = useRouter();
  const onExit = () => {
    cookieCutter.set("@userData", "", { expires: new Date(0) });
    push("/login");
  };

  if (pathname.search("login") < 0) {
    return (
      <>
        <ReactQueryDevtools initialIsOpen={false} />
        <span onClick={onExit} className="button-back-container dark">
          <LogoutRounded />
        </span>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </QueryClientProvider>
      </>
    );
  }
  return <Component {...pageProps} />;
}
