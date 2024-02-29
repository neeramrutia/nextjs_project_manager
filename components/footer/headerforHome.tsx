import { Title, Text, Button, Container } from '@mantine/core';
// import { Dots } from './Dots';
import classes from '../../public/HeroText.module.css';
import Typewriter from 'typewriter-effect';
export function HeroText() {
  return (
    <Container className={classes.wrapper} size={1400}>
      <div className={classes.inner}>
        <Title className={classes.title}>

          
          <Text component="span" className={classes.highlight} inherit>
          <Typewriter
          options={{
            strings: ['Project Catalog', 'Innovation Showcase' , 'Emerging Technologies Spotlight'],
            autoStart: true,
            loop: true,
          }}
        />
          </Text>{' '}
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
          Discover, Collaborate, Innovate: Your Gateway to Cutting-Edge Projects!
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button mt={'lg'} className={classes.control} size="lg" variant="default" color="gray">
            Contact admin to add project
          </Button>
          <Button mt={'lg'} className={classes.control} size="lg">
            View Catalog
          </Button>
        </div>
      </div>
    </Container>
  );
}