import React from 'react';
import {KSPage} from './KSPage';
import { Title, Button, Brand, Level, LevelItem, Grid, GridItem } from '@patternfly/react-core';
import logo from '../imgs/Scout_Cloud2.png';
import {Link} from 'react-router-dom';
import {ChatBot} from '../components/ChatBot'


const MainTop = (

    <div className="ks-main__top ks-header">
        <div className="ks-main__top__head">
            <Brand src={logo} alt=""></Brand>
            <Title size="4xl">KScout.io</Title>
            <Title size="2xl" headingLevel="h2">Discover the Possibilities of Serverless Apps</Title>
        </div>
        <div className="ks-main__top__buttons">
            <Level gutter="lg">
                <LevelItem>
                    <Link to="/apps"><Button className="ks-main__top__buttons__links">Explore Apps</Button></Link>
                </LevelItem>
                <LevelItem>
                    <Link to="/learn"><Button className="ks-main__top__buttons__links">Learn More</Button></Link>
                </LevelItem>
            </Level>
        </div>
    </div>
);

const MainMid = (
    <div className="ks-main__mid">
        <Title size="4xl">About KScout.io</Title>
        <Title size="xl" className="ks-main__mid__description">KScout.io is a smart hub for community contributed serverless apps.</Title>
        
        <div className="ks-main__mid__info">
            <div className="ks-main__mid__info__sec">
                <Title className="ks-main__mid__info__sec__title" size="xl">Want to get started with serverless architecture?</Title>
                <div className="ks-main__mid__info__sec__content"><a href="/learn">Our documentation</a> has everything you need to get started writing and deploying your own serverless apps.</div>
            </div>
            <div className="ks-main__mid__info__sec">
                <Title className="ks-main__mid__info__sec__title" size="xl">Want to explore serverless apps written by others?</Title> 
                <div className="ks-main__mid__info__sec__content"><a href="/apps">Our hub</a> features apps written in various languages and using a multitude of different features.</div>
            </div>
            <Title size="xl">Explore apps, see their source code, and deploy them directly to your own cluster, all from KScout.io.</Title>
        </div>

        <ChatBot/>
        
    </div>
    
);
    


const sections = [
    {component: MainTop, isFilled: false, noPadding: true},
    {component: MainMid, isFilled: true, noPadding: true}
]


export const Main =  (props: {}) => {return (<KSPage components={sections}></KSPage>);}