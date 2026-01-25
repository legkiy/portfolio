import { NextIntlClientProvider } from 'next-intl';
import './globals.css';
import { ThemeProvider } from './theme-provider';

type Props = {
  children: React.ReactNode;
};

const ConfigProvider = ({ children }: Props) => {
  return (
    <ThemeProvider attribute="class" enableSystem>
      <NextIntlClientProvider>{children}</NextIntlClientProvider>
    </ThemeProvider>
  );
};

export default ConfigProvider;
