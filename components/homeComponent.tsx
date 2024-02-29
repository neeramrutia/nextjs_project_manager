import { Card, Image, Text, Badge, Button, Group, Container, Title, TextInput, Anchor  } from '@mantine/core';
import { Grid  } from '@mantine/core';
import { useState } from 'react';
import { FooterLinks } from './footer/footer';
import { Link } from 'tabler-icons-react';
import { HeroText } from './footer/headerforHome';
import { FeaturesGrid } from './footer/FeaturesGrid';
export default function Home() {
  return (
        <>
        <HeroText/>
        <FeaturesGrid/>
        <FooterLinks/>
  </>
    
  );
}