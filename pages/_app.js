import "mapbox-gl/dist/mapbox-gl.css";

import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

import Layout from "../components/layout";

function MyApp({ Component, pageProps }) {
  // Create a client
  const queryClient = new QueryClient();
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

export default MyApp;
