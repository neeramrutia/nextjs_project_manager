import { ThemeIcon, Text, Title, Container, SimpleGrid, rem, Tooltip } from '@mantine/core';
import { IconGauge, IconCookie, IconUser, IconMessage2, IconLock } from '@tabler/icons-react';
import classes from '../../public/FeaturesGrid.module.css';
import { IconBrandReact , IconBrandPython , IconBrandNextjs , IconBrandGatsby , IconBrandJavascript , IconBrandTypescript , IconBrandDjango, IconBrandVue , IconBrandAngular , IconBrandGraphql , IconBrandAndroid , IconBrandAws , IconBrandAzure , IconBrandNodejs , IconBrandNuxt , IconBrandThreejs} from '@tabler/icons-react';
const COLORS = ["#6BD731" , "#C02ADF" , "#5474B4" , "#2BDD66" , "#D9D02F" , "cyan" , "teal","#1F32C4" , "#7B2EDA"]
const getRandomColor = ()=>{
  return COLORS[Math.floor(Math.random()*COLORS.length)];
}
export const MOCKDATA = [
  {
    icon: IconGauge,
    title: 'Extreme performance',
    description:
      'This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit',
  },
  {
    icon: IconUser,
    title: 'Privacy focused',
    description:
      'People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma',
  },
  {
    icon: IconCookie,
    title: 'No third parties',
    description:
      'They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves',
  },
  {
    icon: IconLock,
    title: 'Secure by default',
    description:
      'Although it still can’t fly, its jumping power is outstanding, in Alola the mushrooms on Paras don’t grow up quite right',
  },
  {
    icon: IconMessage2,
    title: '24/7 Support',
    description:
      'Rapidash usually can be seen casually cantering in the fields and plains, Skitty is known to chase around after its own tail',
  },
];

interface FeatureProps {
  icon: React.FC<any>;
  title: React.ReactNode;
  description: React.ReactNode;
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <div>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Icon style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      </ThemeIcon>
      <Text mt="sm" mb={7}>
        {title}
      </Text>
      <Text size="sm" c="dimmed" lh={1.6}>
        {description}
      </Text>
    </div>
  );
}

export function FeaturesGrid() {
  const features = MOCKDATA.map((feature, index) => <Feature {...feature} key={index} />);

  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title}>Discover Innovations in Every Tech Field.</Title>

      <Container size={560} p={0}>
        <Tooltip label={"react"} transitionProps={{ transition: 'skew-up', duration: 300 }}>
        <IconBrandReact
        style={{ width: rem(60), height: rem(60) , margin : "5px"}}
        stroke={1.5}
        color={getRandomColor()}
        />
        </Tooltip>
        <Tooltip label={"python"} transitionProps={{ transition: 'skew-up', duration: 300 }}>
        <IconBrandPython
        style={{ width: rem(60), height: rem(60) , margin : "5px"}}
        stroke={1.5}
        color={getRandomColor()}
        />
        </Tooltip>
        <Tooltip label={"Nextjs"} transitionProps={{ transition: 'skew-up', duration: 300 }}>
        <IconBrandNextjs
        style={{ width: rem(60), height: rem(60) , margin : "5px"}}
        stroke={1.5}
        color={getRandomColor()}
        />
        </Tooltip>
        <Tooltip label={"Angular"} transitionProps={{ transition: 'skew-up', duration: 300 }}>
        <IconBrandAngular
        style={{ width: rem(60), height: rem(60) , margin : "5px"}}
        stroke={1.5}
        color={getRandomColor()}
        />
        </Tooltip>
        <Tooltip label={"Django"} transitionProps={{ transition: 'skew-up', duration: 300 }}>
        <IconBrandDjango
        style={{ width: rem(60), height: rem(60) , margin : "5px"}}
        stroke={1.5}
        color={getRandomColor()}
        />
        </Tooltip>
        <Tooltip label={"Gatsby"} transitionProps={{ transition: 'skew-up', duration: 300 }}>
        <IconBrandGatsby
        style={{ width: rem(60), height: rem(60) , margin : "5px"}}
        stroke={1.5}
        color={getRandomColor()}
        />
        </Tooltip>
        <Tooltip label={"Javascript"} transitionProps={{ transition: 'skew-up', duration: 300 }}>
        <IconBrandJavascript
        style={{ width: rem(60), height: rem(60) , margin : "5px"}}
        stroke={1.5}
        color={getRandomColor()}
        />
        </Tooltip>
        <Tooltip label={"Typescript"} transitionProps={{ transition: 'skew-up', duration: 300 }}>
        <IconBrandTypescript
        style={{ width: rem(60), height: rem(60) , margin : "5px"}}
        stroke={1.5}
        color={getRandomColor()}
        />
        </Tooltip>
        <Tooltip label={"Vue"} transitionProps={{ transition: 'skew-up', duration: 300 }}>
        <IconBrandVue
        style={{ width: rem(60), height: rem(60) , margin : "5px"}}
        stroke={1.5}
        color={getRandomColor()}
        />
        </Tooltip>
        <Tooltip label={"Graphql"} transitionProps={{ transition: 'skew-up', duration: 300 }}>
        <IconBrandGraphql
        style={{ width: rem(60), height: rem(60) , margin : "5px"}}
        stroke={1.5}
        color={getRandomColor()}
        />
        </Tooltip>
        <Tooltip label={"Android"} transitionProps={{ transition: 'skew-up', duration: 300 }}>
        <IconBrandAndroid
        style={{ width: rem(60), height: rem(60) , margin : "5px"}}
        stroke={1.5}
        color={getRandomColor()}
        />
        </Tooltip>
        <Tooltip label={"AWS"} transitionProps={{ transition: 'skew-up', duration: 300 }}>
        <IconBrandAws
        style={{ width: rem(60), height: rem(60) , margin : "5px"}}
        stroke={1.5}
        color={getRandomColor()}
        />
        </Tooltip>
        <Tooltip label={"Azure"} transitionProps={{ transition: 'skew-up', duration: 300 }}>
        <IconBrandAzure
        style={{ width: rem(60), height: rem(60) , margin : "5px"}}
        stroke={1.5}
        color={getRandomColor()}
        />
        </Tooltip>
        <Tooltip label={"Nuxt"} transitionProps={{ transition: 'skew-up', duration: 300 }}>
        <IconBrandNuxt
        style={{ width: rem(60), height: rem(60) , margin : "5px"}}
        stroke={1.5}
        color={getRandomColor()}
        />
        </Tooltip>
        <Tooltip label={"Nodejs"} transitionProps={{ transition: 'skew-up', duration: 300 }}>
        <IconBrandNodejs
        style={{ width: rem(60), height: rem(60) , margin : "5px"}}
        stroke={1.5}
        color={getRandomColor()}
        />
        </Tooltip>
        <Tooltip label={"Threejs"} transitionProps={{ transition: 'skew-up', duration: 300 }}>
        <IconBrandThreejs
        style={{ width: rem(60), height: rem(60) , margin : "5px"}}
        stroke={1.5}
        color={getRandomColor()}
        />
        </Tooltip>
      </Container>

      <SimpleGrid
        mt={60}
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: 'xl', md: 50 }}
        verticalSpacing={{ base: 'xl', md: 50 }}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}