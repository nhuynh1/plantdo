import React, { useContext } from 'react';
import AuthContext from '../contexts/auth-context'
import Loading from '../components/Loading';
import { Login as LoginButton } from './Buttons';

import '../styles/LandingPage.css';

const LandingPage = () => {
    const { loadingAuth } = useContext(AuthContext);

    if(loadingAuth) {
        return <Loading />
    }

    return (
        <div className="LandingPage">
            <div className="LandingPage__cta">
                <h1 className="LandingPage__cta-title">Task Management tool inspired by Bullet Journaling and cactuses</h1>
                <LoginButton />
                <img
                    alt="Screen capture of Plant-Do app"
                    className="LandingPage__splash-image"
                    src={process.env.PUBLIC_URL + '/plantdo.png'} />
            </div>
            <div className="LandingPage__features">
                <div className="LandingPage__content-container">
                    <h2 className="LandingPage__features-title">Features</h2>
                    <ul className="LandingPage_features-list">
                        <li className="LandingPage_feature-item">
                            <img
                                alt=""
                                className="LandingPage_feature-icon"
                                src={process.env.PUBLIC_URL + '/simple.svg'} />
                            <h3 className="LandingPage_feature-title">Simple</h3>
                            <p className="LandingPage_feature-description">As simple as the original Bullet Journal; no fancy doodles or stickers—just a few cactuses</p>
                        </li>
                        <li className="LandingPage_feature-item">
                            <img
                                className="LandingPage_feature-icon"
                                alt=""
                                src={process.env.PUBLIC_URL + '/migration.svg'} />
                            <h3 className="LandingPage_feature-title">Migration</h3>
                            <p className="LandingPage_feature-description">Unlike a Bullet Journal you won’t have to re-write previous tasks to migrate them—I made a button for that</p>
                        </li>
                        <li className="LandingPage_feature-item">
                            <img
                                className="LandingPage_feature-icon"
                                alt=""
                                src={process.env.PUBLIC_URL + '/cactus.svg'} />
                            <h3 className="LandingPage_feature-title">Cactus</h3>
                            <p className="LandingPage_feature-description">Complete a task and a cute cactus appears in the sand. The cactus image comes from Twitter’s open source emojis project</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="LandingPage_team">
                <div className="LandingPage__content-container LandingPage_team-content">
                    <div className="LandingPage_team-text">
                        <h3 className="LandingPage_team-title">Plant-Do is a Nancy Huynh project</h3>
                        <p className="LandingPage_team-description">Coding is the best way to learn to code and I wanted to learn front-end development with React</p>
                        <p className="LandingPage_team-description">If you need help with a project contact me: <a href="mailto:hire@nancyhuynh.com">hire@nancyhuynh.com</a></p>
                    </div>
                    <img
                        alt=""
                        src={process.env.PUBLIC_URL + '/nhuynh1.png'} />
                </div>

            </div>
            <div className="LandingPage__footer">
                <a
                    aria-label="Nancy Huynh's Github"
                    href="https://github.com/nhuynh1">
                    <img
                        className="LandingPage__footer-icon"
                        alt=""
                        src={process.env.PUBLIC_URL + '/github.svg'} />
                </a>
                <a
                    aria-label="Nancy Huynh's Linkedin"
                    href="https://www.linkedin.com/in/contactnancyhuynh/">
                    <img
                        className="LandingPage__footer-icon"
                        alt=""
                        src={process.env.PUBLIC_URL + '/linkedin.svg'} />
                </a>
                <p className="LandingPage__footer-text">Nancy Huynh 2020</p>
                <p className="LandingPage__footer-text">Made in Toronto, Canada</p>
            </div>
        </div>
    )
}

export default LandingPage;