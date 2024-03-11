import { Game } from '../hooks/useGames';
import { Card, CardBody, Heading, Image, HStack } from '@chakra-ui/react';
import PlatformIconList from './PlatformIconList';
import CriticScore from './CriticScore';
import GetCroppedImageUrl from '../services/image-url';

interface Props {
    game: Game;
}

const GameCard = ({ game } : Props) => {
  return (
    <Card>
        <Image src={GetCroppedImageUrl(game.background_image)} />
        <CardBody>
            <HStack justifyContent='space-between' marginBottom={3}>
              <PlatformIconList platforms={game.parent_platforms.map(p => p.platform)}></PlatformIconList>
              <CriticScore score={game.metacritic}></CriticScore>
            </HStack>
            <Heading fontSize="2xl">{game.name}</Heading>
        </CardBody>
    </Card>
  )
} 

export default GameCard