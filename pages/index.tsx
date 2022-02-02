import React from 'react';
import { Container, Heading } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const BarcodeScannerComponent = dynamic(() => import('react-qr-barcode-scanner'), {
  ssr: false,
});

const IndexPage = () => {
  const [data, setData] = React.useState<string>('');

  return (
    <Container marginTop={10}>
      <Heading as="h1" size="2xl">
        Covid Check
      </Heading>
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(_, result) => {
          if (result) {
            setData(result.getText());
          }
        }}
      />
      <p>{data}</p>
    </Container>
  );
};

export default IndexPage;
