
import { Metadata } from 'next';
import PayUserClient from './PayUserClient';


type Props = {
  params: { raizTag: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Raiz Payment for ${params.raizTag}`,
  };
}

export default function PayUserPage() {
  return <PayUserClient />;
}
