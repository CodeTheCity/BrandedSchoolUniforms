import "../styles/globals.css";

import Nav from "../components/Nav";
import Provider from "../components/Provider";

export const metadata = {
  title: "Branded School Uniforms",
  description: "Find the best deals on branded school uniforms. We compare prices from different sources to help you save money.",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
      <Provider>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
