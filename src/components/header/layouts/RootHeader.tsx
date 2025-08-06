import Header from '../Header';
import PageTitle from '../PageTitle';
import TopSearch from '../TopSearch';
import TopAI from '../TopAI';
import Dropdown from '../Dropdown';

interface RootHeaderProps {
  className?: string;
}

const RootHeader = ({ className }: RootHeaderProps) => {
  const dropdownItems = [
    { label: 'Settings', onClick: () => console.log('Settings') },
    { label: 'Help', onClick: () => console.log('Help') },
    { label: 'Sign out', onClick: () => console.log('Sign out') },
  ];

  return (
    <Header
      left={<PageTitle title="ennablDocs" variant="h2" />}
      right={
        <>
          <TopAI />
          <TopSearch />
          <Dropdown items={dropdownItems} />
        </>
      }
      className={className}
    />
  );
};

export default RootHeader;